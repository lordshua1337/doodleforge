"use client";

import Link from "next/link";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/page-transition";

const GALLERY_ITEMS = [
  {
    original: "Crayon stick figures under a yellow sun",
    transformed: "Renaissance-style family portrait with golden hour lighting",
    style: "Oil Painting",
    artist: "Emma, age 5",
    kidSays: "That's our family!",
    parentSays: "Why does everyone have 3 arms?",
    color: "#FF6B6B",
  },
  {
    original: "Green blob with legs and teeth",
    transformed: "Majestic dinosaur in a prehistoric jungle landscape",
    style: "Photorealistic",
    artist: "Liam, age 4",
    kidSays: "RAWR it's a T-Rex!",
    parentSays: "Looks more like a melting pickle",
    color: "#69F0AE",
  },
  {
    original: "Blue and red house with smoke from chimney",
    transformed: "Cozy cottage in watercolor with autumn trees",
    style: "Watercolor",
    artist: "Sophia, age 6",
    kidSays: "That's where we live!",
    parentSays: "Since when is our roof a triangle?",
    color: "#64B5F6",
  },
  {
    original: "Cat with triangle ears and whiskers",
    transformed: "Elegant anime cat character with sparkle effects",
    style: "Anime",
    artist: "Noah, age 5",
    kidSays: "It's Mr. Whiskers!",
    parentSays: "Mr. Whiskers looks... haunted",
    color: "#F48FB1",
  },
  {
    original: "Rainbow with clouds on both sides",
    transformed: "Neon-lit rainbow over a cyberpunk cityscape",
    style: "Cyberpunk",
    artist: "Olivia, age 3",
    kidSays: "Pretty colors!",
    parentSays: "It's a stripe collection, not a rainbow",
    color: "#B388FF",
  },
  {
    original: "Spaceship with fire coming out the bottom",
    transformed: "8-bit pixel art rocket launch with star field",
    style: "Pixel Art",
    artist: "Jackson, age 7",
    kidSays: "Going to Mars!",
    parentSays: "That's a pencil with flames",
    color: "#FFD54F",
  },
  {
    original: "Tree with a bird and flowers",
    transformed: "Enchanted forest scene with magical creatures",
    style: "Studio Ghibli",
    artist: "Ava, age 4",
    kidSays: "A magic forest!",
    parentSays: "The bird is bigger than the tree",
    color: "#FFAB91",
  },
  {
    original: "Dad with really long arms and tiny legs",
    transformed: "Bold pop art portrait with halftone dots",
    style: "Pop Art",
    artist: "Ethan, age 5",
    kidSays: "That's you Daddy!",
    parentSays: "I need to process this emotionally",
    color: "#FF6B6B",
  },
  {
    original: "Fish swimming in wavy water",
    transformed: "Underwater oil painting with bioluminescent sea life",
    style: "Oil Painting",
    artist: "Isabella, age 6",
    kidSays: "Nemo's friend!",
    parentSays: "That fish has existential dread in its eyes",
    color: "#64B5F6",
  },
];

const PASTEL_BGS = [
  "bg-coral/5", "bg-mint/5", "bg-sky/5",
  "bg-bubblegum/5", "bg-lavender/5", "bg-sunny/5",
  "bg-peach/5", "bg-coral/5", "bg-sky/5",
];

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="relative z-10 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          {/* Header */}
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-coral">
              The Wall of Shame
            </p>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Guess what they <span className="text-coral">drew</span>.
            </h1>
            <p className="mx-auto max-w-lg text-text-secondary">
              Every masterpiece below started as a child&apos;s drawing.
              The parents submitted them. We transformed them. We all had a good laugh.
            </p>
          </div>

          {/* Gallery Grid */}
          <StaggerContainer>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY_ITEMS.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="group overflow-hidden rounded-2xl border-2 border-border bg-background transition-all hover:border-border-hover hover:shadow-lg d-card-hover">
                    {/* Image placeholder */}
                    <div className={`relative aspect-square ${PASTEL_BGS[i]} flex items-center justify-center overflow-hidden`}>
                      <div className="text-center p-8 transition-transform group-hover:scale-[1.02]">
                        <p className="mb-3 text-sm font-medium text-text-secondary">
                          {item.transformed}
                        </p>
                        <div
                          className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.style}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="border-t border-border p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wide">Original:</p>
                        <p className="text-xs text-text-muted">{item.artist}</p>
                      </div>
                      <p className="text-sm text-text-secondary italic mb-3">
                        &ldquo;{item.original}&rdquo;
                      </p>

                      {/* Fun commentary */}
                      <div className="space-y-2 pt-3 border-t border-border">
                        <div className="flex gap-2 items-start">
                          <span className="flex-shrink-0 h-5 w-5 rounded-full bg-sunny/20 flex items-center justify-center text-[9px] font-bold text-sunny">K</span>
                          <p className="text-xs text-foreground">&ldquo;{item.kidSays}&rdquo;</p>
                        </div>
                        <div className="flex gap-2 items-start">
                          <span className="flex-shrink-0 h-5 w-5 rounded-full bg-lavender/20 flex items-center justify-center text-[9px] font-bold text-lavender">P</span>
                          <p className="text-xs text-text-muted italic">&ldquo;{item.parentSays}&rdquo;</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Your kid&apos;s doodle could be <span className="text-coral">next</span>.
            </h2>
            <p className="mb-6 text-text-secondary">
              Submit their drawing. We&apos;ll transform it. Everyone wins.
            </p>
            <Link
              href="/create"
              className="d-btn-primary glow-cta"
            >
              Make A Doodie &rarr;
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
