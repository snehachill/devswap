import { getPublicSiteUrl } from "@/src/lib/siteUrl";

const siteUrl = getPublicSiteUrl();

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/user/", "/api/", "/chats"],
    },
    ...(siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() } : {}),
  };
}
