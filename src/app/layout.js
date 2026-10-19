import "./globals.css";
import { auth } from "@/auth";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Navbar from "@/src/components/navbar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${jetMono.variable}`}>
      <body className="antialiased">
        <Navbar session={session} />
        <main>{children}</main>
      </body>
    </html>
  );
}
