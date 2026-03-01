import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DoodleForge | Turn Your Kid's Art Into Masterpieces",
  description:
    "Your kid drew something. It's terrible. We'll fix it. AI-powered art transformation that turns children's drawings into gallery-worthy prints.",
  keywords: [
    "kids art",
    "AI art",
    "children drawings",
    "art prints",
    "custom prints",
    "AI image generation",
  ],
  openGraph: {
    title: "DoodleForge | Turn Your Kid's Art Into Masterpieces",
    description:
      "Your kid drew something. It's terrible. We'll fix it. AI-powered art transformation.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FF3B30",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
