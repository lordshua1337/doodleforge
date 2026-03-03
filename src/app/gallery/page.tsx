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
  {
    original: "Princess with triangle dress and crown",
    transformed: "Elegant anime princess with sparkling tiara and flowing gown",
    style: "Anime",
    artist: "Charlotte, age 4",
    kidSays: "That's me when I grow up!",
    parentSays: "The crown is bigger than her head. Accurate.",
    color: "#F48FB1",
  },
  {
    original: "Dog with really long body and short legs",
    transformed: "Photorealistic corgi puppy in a flower field",
    style: "Photorealistic",
    artist: "Mason, age 5",
    kidSays: "It's Biscuit!",
    parentSays: "Biscuit doesn't have 6 legs but okay",
    color: "#FFAB91",
  },
  {
    original: "Sun with sunglasses and a big smile",
    transformed: "Neon-drenched cyberpunk sun radiating over a chrome skyline",
    style: "Cyberpunk",
    artist: "Zoe, age 3",
    kidSays: "Happy sun!",
    parentSays: "That sun is having a better day than I am",
    color: "#B388FF",
  },
  {
    original: "Car with square wheels and exhaust smoke",
    transformed: "8-bit racing game screenshot with pixel perfect detail",
    style: "Pixel Art",
    artist: "Lucas, age 7",
    kidSays: "My race car goes so fast!",
    parentSays: "It has square wheels, it's going nowhere",
    color: "#69F0AE",
  },
  {
    original: "Butterfly with mismatched wings",
    transformed: "Art nouveau butterfly with stained glass wing patterns",
    style: "Watercolor",
    artist: "Mia, age 5",
    kidSays: "She's flying to a party!",
    parentSays: "One wing is a triangle, the other is a circle. This butterfly is not flying anywhere.",
    color: "#64B5F6",
  },
  {
    original: "Monster under a bed with teeth everywhere",
    transformed: "Bold Warhol-style pop art monster portrait in electric colors",
    style: "Pop Art",
    artist: "Jack, age 6",
    kidSays: "This is what lives under my bed",
    parentSays: "Great, now I need therapy too",
    color: "#FFD54F",
  },
  {
    original: "Heart with wings and a smiley face",
    transformed: "Cathedral window panel of a winged heart in deep ruby and gold glass",
    style: "Stained Glass",
    artist: "Lily, age 4",
    kidSays: "Love can fly!",
    parentSays: "The wings are... on the wrong side",
    color: "#CE93D8",
  },
  {
    original: "Dog chasing a ball in the yard",
    transformed: "Saturday morning cartoon dog mid-leap with motion lines and star bursts",
    style: "Cartoon",
    artist: "Owen, age 6",
    kidSays: "Buster loves fetch!",
    parentSays: "That dog has 7 toes. I've counted.",
    color: "#FFB74D",
  },
  {
    original: "Self portrait with big eyes and tiny body",
    transformed: "Elegant graphite portrait study with refined shading and cross-hatching",
    style: "Pencil Sketch",
    artist: "Aria, age 5",
    kidSays: "That's me being fancy!",
    parentSays: "The head-to-body ratio suggests she's an alien",
    color: "#90A4AE",
  },
  {
    original: "Castle with a dragon flying over it",
    transformed: "Epic fantasy citadel with a fire-breathing dragon soaring through storm clouds",
    style: "Fantasy Epic",
    artist: "Wyatt, age 7",
    kidSays: "The dragon protects the castle!",
    parentSays: "That's a lizard flying over a rectangle but go off king",
    color: "#A5D6A7",
  },
];

const PASTEL_BGS = [
  "rgba(255,107,107,0.05)",
  "rgba(52,211,153,0.05)",
  "rgba(96,165,250,0.05)",
  "rgba(244,114,182,0.05)",
  "rgba(167,139,250,0.05)",
  "rgba(251,191,36,0.05)",
  "rgba(251,146,60,0.05)",
  "rgba(255,107,107,0.05)",
  "rgba(96,165,250,0.05)",
  "rgba(244,114,182,0.05)",
  "rgba(251,146,60,0.05)",
  "rgba(167,139,250,0.05)",
  "rgba(52,211,153,0.05)",
  "rgba(96,165,250,0.05)",
  "rgba(251,191,36,0.05)",
  "rgba(206,147,216,0.05)",
  "rgba(255,183,77,0.05)",
  "rgba(144,164,174,0.05)",
  "rgba(165,214,167,0.05)",
];

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="relative z-10 min-h-screen">
        {/* Drawing decoration - top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "top right",
            opacity: 0.05,
            pointerEvents: "none",
            maskImage: "linear-gradient(135deg, transparent 15%, black 45%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 15%, black 45%, transparent 85%)",
          }}
        />

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

          {/* Stats bar */}
          <div className="neu-card" style={{ display: "flex", justifyContent: "center", gap: 48, padding: "24px 32px", marginBottom: 40 }}>
            {[
              { value: "19", label: "Masterpieces", color: "#FF6B6B" },
              { value: "12", label: "Art Styles", color: "#A78BFA" },
              { value: "16", label: "Young Artists", color: "#34D399" },
              { value: "0", label: "Art Degrees Required", color: "#FBBF24" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: stat.color, fontFamily: "var(--font-mono, monospace)" }}>{stat.value}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Gallery Grid -- neumorphic cards */}
          <StaggerContainer>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY_ITEMS.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="neu-card d-card-hover" style={{ overflow: "hidden", padding: 0 }}>
                    {/* Image placeholder */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        background: PASTEL_BGS[i],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* Drawing texture accent */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: i % 2 === 0 ? "url(/drawings-1.png)" : "url(/drawings-2.png)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.06,
                          pointerEvents: "none",
                        }}
                      />
                      <div style={{ textAlign: "center", padding: 32, position: "relative" }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", marginBottom: 12 }}>
                          {item.transformed}
                        </p>
                        <span
                          style={{
                            display: "inline-flex",
                            borderRadius: 999,
                            padding: "4px 14px",
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#fff",
                            background: item.color,
                          }}
                        >
                          {item.style}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ borderTop: "1px solid rgba(229,231,235,0.5)", padding: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF" }}>Original:</p>
                        <p style={{ fontSize: 12, color: "#9CA3AF" }}>{item.artist}</p>
                      </div>
                      <p style={{ fontSize: 14, color: "#6B7280", fontStyle: "italic", marginBottom: 12 }}>
                        &ldquo;{item.original}&rdquo;
                      </p>

                      {/* Fun commentary */}
                      <div style={{ borderTop: "1px solid rgba(229,231,235,0.5)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                          <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#FBBF24" }}>K</span>
                          <p style={{ fontSize: 12, color: "#1A1A2E" }}>&ldquo;{item.kidSays}&rdquo;</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                          <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#A78BFA" }}>P</span>
                          <p style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}>&ldquo;{item.parentSays}&rdquo;</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Accent divider */}
          <div className="d-divider-gradient" style={{ marginTop: 64, marginBottom: 16 }} />

          {/* CTA */}
          <div className="mt-16 text-center" style={{ position: "relative" }}>
            {/* Drawing accent behind CTA */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                height: 250,
                backgroundImage: "url(/drawings-1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.04,
                borderRadius: 24,
                pointerEvents: "none",
              }}
            />
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-dm-serif)", position: "relative" }}>
              Your kid&apos;s doodle could be <span className="text-coral">next</span>.
            </h2>
            <p className="mb-6 text-text-secondary" style={{ position: "relative" }}>
              Submit their drawing. We&apos;ll transform it. Everyone wins.
            </p>
            <Link
              href="/create"
              className="d-btn-primary glow-cta"
              style={{ position: "relative" }}
            >
              Make A Doodie &rarr;
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
