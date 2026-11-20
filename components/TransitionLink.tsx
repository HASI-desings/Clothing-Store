"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

/* Page-to-page "cut in along a seam": wraps client navigation in the
   View Transitions API when available. Falls back to a normal navigation. */

type Navigate = (href: string) => void;
const Ctx = createContext<Navigate | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const resolver = useRef<(() => void) | null>(null);

  useEffect(() => {
    resolver.current?.();
    resolver.current = null;
  }, [pathname]);

  const navigate = useCallback<Navigate>(
    (href) => {
      const doc = document as Document & { startViewTransition?: (cb: () => Promise<void>) => unknown };
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!doc.startViewTransition || reduce) {
        router.push(href);
        return;
      }
      doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolver.current = resolve;
            router.push(href);
            window.setTimeout(resolve, 1200); // never hang the page if navigation stalls
          }),
      );
    },
    [router],
  );

  return <Ctx.Provider value={navigate}>{children}</Ctx.Provider>;
}

export function TransitionLink({
  href,
  children,
  onNavigate,
  ...rest
}: React.ComponentProps<typeof Link> & { href: string; onNavigate?: () => void }) {
  const navigate = useContext(Ctx);
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        rest.onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (href.startsWith("#") || href === pathname || !navigate) {
          onNavigate?.();
          return;
        }
        e.preventDefault();
        onNavigate?.();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
