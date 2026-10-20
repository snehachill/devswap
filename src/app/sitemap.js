import { getPublicSiteUrl } from "@/src/lib/siteUrl";

const siteUrl = getPublicSiteUrl();

export default function sitemap() {
  if (!siteUrl) return [];

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
