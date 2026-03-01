import type { Metadata } from "next";
import { Geist_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DoodleBg } from "@/components/doodle-bg";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doodie | Fridge Art. Gallery Upgrade.",
  description:
    "Upload your kid's drawing. Our AI transforms it into gallery-worthy art. Prints, canvas, posters -- real art from real imagination.",
  keywords: [
    "kids art",
    "AI art",
    "children drawings",
    "art prints",
    "custom prints",
    "AI image generation",
    "kids doodles",
    "art transformation",
  ],
  openGraph: {
    title: "Doodie | Fridge Art. Gallery Upgrade.",
    description:
      "Upload your kid's drawing. AI turns it into real art. Frame it. Hang it. Make grandparents cry.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FAFAFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <DoodleBg />
        <Nav />
        <main className="relative z-10 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
