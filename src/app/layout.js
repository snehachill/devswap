import "./globals.css";
import { auth } from "@/auth";
import localFont from "next/font/local";
import Navbar from "@/src/components/navbar";

const siteUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL;
const siteTitle = "DevSwap | Learn and trade skills with developers";
const siteDescription = "Trade skills with developers. Teach what you know, learn something new, and grow together through thoughtful one-to-one skill swaps.";

export const metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: siteTitle,
    template: "%s | DevSwap",
  },
  description: siteDescription,
  applicationName: "DevSwap",
  keywords: [
    "skill exchange",
    "developer skill swap",
    "learn programming",
    "teach coding",
    "peer learning for developers",
    "developer community",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DevSwap",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DevSwap — learn and trade skills with developers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "400 800",
  variable: "--font-display",
  display: "swap",
});
const jetMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${jetMono.variable}`}>
      <body className="antialiased">
        <Navbar session={session} />
        <main>{children}</main>
      </body>
    </html>
  );
}
