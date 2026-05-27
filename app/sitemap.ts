import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" },
    { url: "/book", priority: 0.8, changeFrequency: "weekly" },
  ];
}
