import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

const site = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site}/`, changeFrequency: "weekly", priority: 1 }];
}
