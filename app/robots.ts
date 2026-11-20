import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

const site = siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site}/sitemap.xml`,
  };
}
