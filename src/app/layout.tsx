import type { Metadata } from "next";
import { Geist_Mono, Nunito, Gaegu, Caveat, Fredoka } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { KidProvider } from "@/lib/kid-context";
import { SessionProvider } from "@/lib/auth/session-context";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["600", "700"],
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
        className={`${nunito.variable} ${gaegu.variable} ${caveat.variable} ${fredoka.variable} ${geistMono.variable} font-sans antialiased`}
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
