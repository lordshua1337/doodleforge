import type { Metadata } from "next";
import { Geist_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DoodleBg } from "@/components/doodle-bg";
import { KidProvider } from "@/lib/kid-context";

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
        <KidProvider>
          <DoodleBg />
          <Nav />
          <main className="relative z-10" style={{ paddingTop: 72, paddingBottom: 80 }}>
            {children}
          </main>
          <Footer />
        </KidProvider>
      </body>
    </html>
  );
}
