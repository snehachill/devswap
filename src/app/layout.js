import "./globals.css";
import { auth } from "@/auth";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Navbar from "@/src/components/navbar";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="antialiased font-sans">
        <Navbar session={session} />
        <main>{children}</main>
      </body>
    </html>
  );
}
