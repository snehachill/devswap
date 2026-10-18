import "./globals.css";
import { auth } from "@/auth";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/src/components/navbar";

const spaceGrotesk = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const inter = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-text",
  display: "swap",
});
const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${inter.variable} ${jetMono.variable}`}>
      <body className="antialiased">
        <Navbar session={session} />
        <main>{children}</main>
      </body>
    </html>
  );
}
