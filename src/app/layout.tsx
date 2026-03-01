import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DoodleBg } from "@/components/doodle-bg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DoodleForge | Bring Your Kid's Imagination to Life",
  description:
    "Your kid drew something beautiful (to them). Upload it and our AI transforms it into actual art worth framing. Prints, canvas, posters -- the works.",
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
    title: "DoodleForge | Bring Your Kid's Imagination to Life",
    description:
      "Upload your kid's drawing. AI turns it into real art. Frame it. Hang it. Pretend they're a prodigy.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FFF9F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} font-sans antialiased`}
      >
        <DoodleBg />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
