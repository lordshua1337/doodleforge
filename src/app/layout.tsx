import type { Metadata } from "next";
import {
  Geist_Mono,
  Inter,
  Architects_Daughter,
  Just_Another_Hand,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { KidProvider } from "@/lib/kid-context";
import { SessionProvider } from "@/lib/auth/session-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-architects-daughter",
  subsets: ["latin"],
  weight: "400",
});

const justAnotherHand = Just_Another_Hand({
  variable: "--font-just-another-hand",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doodie | Your kid's art is bad. We fix that.",
  description:
    "Upload your kid's drawing. Our AI transforms it into art you'd actually hang. Stop lying about the blob on the fridge.",
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
    title: "Doodie | Your kid's art is bad. We fix that.",
    description:
      "Upload the scribble. Pick a style. Get real art. Hang it up. Take credit at Thanksgiving.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FFF8F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${architectsDaughter.variable} ${justAnotherHand.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SessionProvider>
          <KidProvider>
            <Nav />
            <main className="relative z-10" style={{ paddingTop: 72, paddingBottom: 80 }}>
              {children}
            </main>
            <Footer />
          </KidProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
