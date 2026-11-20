import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const errorsOf = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  return errors;
};

async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

test.describe("homepage", () => {
  test("renders every section with no console errors", async ({ page }) => {
    const errors = errorsOf(page);
    await page.goto("/");
    await expect(page).toHaveTitle(/DARZ/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Style isn't");
    for (const name of [
      "The Courtyard Edit",
      "Know the cloth before you touch it",
      "Lay it out. Swap a piece. See how it joins.",
      "Every room has its own light",
      "Four flat pieces become one kurta",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });

  test("has one h1, landmarks, a skip link and structured data", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toHaveCount(1);
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(ld ?? "{}")["@type"]).toBe("ClothingStore");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("never scrolls sideways at 390, 768 and 1440", async ({ page }) => {
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await scrollThrough(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `overflow at ${width}`).toBeLessThanOrEqual(0);
    }
  });

  test("all content becomes visible after scrolling", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    await page.waitForTimeout(900);
    const hidden = await page.$$eval("[data-assemble]", (els) =>
      els.filter((e) => !e.classList.contains("is-in")).map((e) => e.textContent?.slice(0, 40)),
    );
    expect(hidden).toEqual([]);
  });
});

test.describe("menu (pattern sheet)", () => {
  test("opens, traps focus in a dialog, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByRole("button", { name: "Menu" });
    await btn.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: /The Courtyard Edit/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(btn).toBeFocused();
  });

  test("links navigate to a working page and back", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: /Traditional/ }).click();
    await expect(page).toHaveURL(/\/collections\/traditional$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/traditional/i);
    await expect(page.locator("html")).not.toHaveAttribute("style", /overflow: hidden/);
    await page.getByRole("link", { name: "Back to the homepage" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("exhibition quick look", () => {
  test("requires a size, switches colour and size, adds to bag", async ({ page }) => {
    await page.goto("/");
    const cell = page.getByRole("button", { name: /Band-collar kurta, Rs 8,450\. Quick look/ });
    await cell.click();
    const dialog = page.getByRole("dialog", { name: "Band-collar kurta" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Select a size" }).click();
    await expect(dialog.getByRole("alert")).toHaveText(/Choose a size/);

    await dialog.getByRole("radio", { name: "Ash grey" }).click();
    await expect(dialog.getByText("Colour: Ash grey")).toBeVisible();

    await expect(dialog.getByRole("radio", { name: /XXL, sold out/ })).toBeDisabled();
    await dialog.getByRole("radio", { name: "M", exact: true }).click();
    await expect(dialog.getByRole("radio", { name: "M", exact: true })).toHaveAttribute("aria-checked", "true");
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("radio", { name: "L", exact: true })).toHaveAttribute("aria-checked", "true");

    await dialog.getByRole("button", { name: /Add to bag: Rs 8,450/ }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("status").filter({ hasText: "Added to bag" })).toContainText("Ash grey, L");
    await expect(page.getByRole("link", { name: "Bag, 1 item" })).toBeVisible();
    await expect(cell).toBeFocused();
  });

  test("low stock is announced", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Band-collar kurta, Rs 8,450/ }).click();
    const dialog = page.getByRole("dialog", { name: "Band-collar kurta" });
    await dialog.getByRole("radio", { name: /XL, only 2 left/ }).click();
    await expect(dialog.getByText("Only 2 left in XL")).toBeVisible();
  });

  test("bag survives a reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Walnut waistcoat/ }).click();
    const dialog = page.getByRole("dialog", { name: "Walnut waistcoat" });
    await dialog.getByRole("radio", { name: "M", exact: true }).click();
    await dialog.getByRole("button", { name: /Add to bag/ }).click();
    await page.reload();
    await expect(page.getByRole("link", { name: "Bag, 1 item" })).toBeVisible();
  });
});

test.describe("style studio", () => {
  test("swaps, locks, shuffles, saves, shares and adds the look", async ({ page }) => {
    await page.goto("/#studio");
    const studio = page.locator("#studio");
    await expect(studio.getByText("Band-collar kurta, indigo")).toBeVisible();
    await studio.getByRole("button", { name: "Next top" }).click();
    await expect(studio.getByText("Band-collar kurta, ash grey")).toBeVisible();

    await studio.getByRole("button", { name: "Lock top" }).click();
    await expect(studio.getByRole("button", { name: "Next top" })).toBeDisabled();
    for (let i = 0; i < 4; i++) {
      await studio.getByRole("button", { name: "Shuffle unlocked pieces" }).click();
      await expect(studio.getByText("Band-collar kurta, ash grey")).toBeVisible();
    }

    await studio.getByRole("button", { name: /Pin to shortlist \(0\)/ }).click();
    await expect(studio.getByRole("button", { name: /Pinned \(1\)/ })).toBeVisible();
    await expect(studio.getByRole("list", { name: "Shortlist" }).getByRole("button")).toHaveCount(1);

    const wa = await studio.getByRole("link", { name: "Send on WhatsApp" }).getAttribute("href");
    expect(wa).toMatch(/^https:\/\/wa\.me\/\?text=.*look%3D\d+-\d+-\d+-\d+/);

    const total = await studio.locator("aside strong").textContent();
    expect(total).toMatch(/^Rs [\d,]+$/);
    const pieces = Number((await studio.getByText(/\d pieces/).first().textContent())?.match(/\d/)?.[0]);
    await studio.getByRole("button", { name: "Add the look to bag" }).click();
    await expect(page.getByRole("link", { name: new RegExp(`Bag, ${pieces} items`) })).toBeVisible();
  });

  test("a shared link rebuilds the exact look", async ({ page }) => {
    await page.goto("/?look=2-0-1-2#studio");
    const studio = page.locator("#studio");
    await expect(studio.getByText("Band-collar kurta, wheat")).toBeVisible();
    await expect(studio.getByText("Nothing over the top")).toBeVisible();
    await expect(studio.getByText("Pleated shalwar, bone")).toBeVisible();
    await expect(studio.getByText("Peshawari chappal, oxblood")).toBeVisible();
  });

  test("rejects a malformed look link", async ({ page }) => {
    const errors = errorsOf(page);
    await page.goto("/?look=99-x-1#studio");
    await expect(page.locator("#studio").getByText("Band-collar kurta, indigo")).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("rooms", () => {
  test("arrow buttons move the row (desktop) and cards link to rooms", async ({ page, isMobile }) => {
    await page.goto("/");
    const track = page.getByRole("list", { name: "Rooms" });
    await track.scrollIntoViewIfNeeded();
    if (!isMobile) {
      await page.setViewportSize({ width: 1100, height: 900 });
      await page.getByRole("button", { name: "Next room" }).click();
      await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(50);
    }
    await track.getByRole("link", { name: /Formal/ }).click();
    await expect(page).toHaveURL(/\/collections\/formal$/);
  });
});

test.describe("footer drop alerts", () => {
  test("validates the email and confirms", async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel("Drop alerts");
    await input.fill("not-an-email");
    await page.getByRole("button", { name: "Notify me" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Enter an email address" })).toBeVisible();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await input.fill("ali@example.com");
    await page.getByRole("button", { name: "Notify me" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Saved." })).toBeVisible();
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const scheme of ["light", "dark"] as const) {
    test(`homepage has no violations in ${scheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.goto("/");
      await scrollThrough(page);
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
    });
  }

  test("quick look and menu have no violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /Moss overshirt/ }).click();
    let r = await new AxeBuilder({ page }).include("dialog[open]").analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
    await page.keyboard.press("Escape");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("button", { name: "Menu" }).click();
    r = await new AxeBuilder({ page }).include("dialog[open]").analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe("resilience", () => {
  test("reduced motion shows everything without scrolling triggers", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const opacities = await page.$$eval("[data-assemble]", (els) => els.map((e) => getComputedStyle(e).opacity));
    expect(opacities.every((o) => o === "1")).toBe(true);
  });

  test("works without JavaScript", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const opacities = await page.$$eval("[data-assemble]", (els) => els.map((e) => getComputedStyle(e).opacity));
    expect(opacities.every((o) => o === "1")).toBe(true);
    await ctx.close();
  });
});

test.describe("seo files", () => {
  test("robots.txt, sitemap and icon are real files, not the placeholder page", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.headers()["content-type"]).toContain("text/plain");
    expect(await robots.text()).toContain("Sitemap:");
    const sitemap = await request.get("/sitemap.xml");
    expect(await sitemap.text()).toContain("<urlset");
    const icon = await request.get("/icon.svg");
    expect(icon.ok()).toBe(true);
  });
});
