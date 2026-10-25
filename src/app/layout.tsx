import type { Metadata } from "next";
import { Anton, Space_Grotesk, Space_Mono, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

/* Zine type system — all self-hosted at build time by next/font (no runtime
   request, no layout shift). Display = Anton (condensed, loud), body = Space
   Grotesk, labels/data = Space Mono, human accent = Caveat. */
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });
const caveat = Caveat({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: "WARK — Zine Portfolio",
  description:
    "The folded-zine portfolio of a designer & developer. A cut-and-paste, photocopied world with a booklet you open by scrolling.",
  metadataBase: new URL("https://wark-portfolio.vercel.app"),
  openGraph: {
    title: "WARK — Zine Portfolio",
    description: "A cut-and-paste, photocopied portfolio you open by scrolling.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${grotesk.variable} ${spaceMono.variable} ${caveat.variable}`}
    >
      <body className="grain">
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
