"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { loadVault, saveVault, addToVault, isInVault, type VaultState } from "@/lib/vault-data";

const GALLERY_ITEMS = [
  {
    original: "Crayon stick figures under a yellow sun",
    transformed: "Renaissance-style family portrait with golden hour lighting",
    style: "Oil Painting",
    artist: "Emma, age 5",
    kidSays: "That's our family!",
    parentSays: "Why does everyone have 3 arms?",
    color: "#FF6B35",
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
    color: "#FF6B35",
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
  "rgba(255,107,53,0.05)",
  "rgba(16,185,129,0.05)",
  "rgba(129,140,248,0.05)",
  "rgba(139,92,246,0.05)",
  "rgba(139,92,246,0.05)",
  "rgba(251,191,36,0.05)",
  "rgba(251,146,60,0.05)",
  "rgba(255,107,53,0.05)",
  "rgba(129,140,248,0.05)",
  "rgba(139,92,246,0.05)",
  "rgba(251,146,60,0.05)",
  "rgba(139,92,246,0.05)",
  "rgba(16,185,129,0.05)",
  "rgba(129,140,248,0.05)",
  "rgba(251,191,36,0.05)",
  "rgba(206,147,216,0.05)",
  "rgba(255,183,77,0.05)",
  "rgba(144,164,174,0.05)",
  "rgba(165,214,167,0.05)",
];

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function LightboxModal({
  index,
  displayIndex,
  onClose,
  onPrev,
  onNext,
  total,
  vault,
  onSaveToVault,
}: {
  index: number;
  displayIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  total: number;
  vault: VaultState | null;
  onSaveToVault: (index: number) => void;
}) {
  const item = GALLERY_ITEMS[index];
  const saved = vault ? isInVault(vault, index) : false;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="d-lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery item ${displayIndex + 1} of ${total}`}
    >
      {/* Nav arrows */}
      <button
        className="d-lightbox-nav d-lightbox-prev"
        onClick={onPrev}
        aria-label="Previous artwork"
      >
        &#8249;
      </button>
      <button
        className="d-lightbox-nav d-lightbox-next"
        onClick={onNext}
        aria-label="Next artwork"
      >
        &#8250;
      </button>

      {/* Card */}
      <div className="d-lightbox-content neu-card" style={{ padding: 0, overflow: "hidden" }}>
        <button className="d-lightbox-close" onClick={onClose} aria-label="Close lightbox">
          &#x2715;
        </button>

        {/* Top visual area */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            background: PASTEL_BGS[index],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: index % 2 === 0 ? "url(/drawings-1.png)" : "url(/drawings-2.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.06,
              pointerEvents: "none",
            }}
          />
          <div style={{ textAlign: "center", padding: 40, position: "relative" }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#4B5563",
                marginBottom: 16,
                lineHeight: 1.5,
                fontFamily: "var(--font-dm-serif)",
              }}
            >
              {item.transformed}
            </p>
            <span
              style={{
                display: "inline-flex",
                borderRadius: 999,
                padding: "6px 18px",
                fontSize: 11,
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

        {/* Details */}
        <div style={{ padding: "24px 28px" }}>
          {/* Artist + original */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#9CA3AF",
                }}
              >
                The Original Drawing
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{item.artist}</p>
            </div>
            <p
              style={{
                fontSize: 15,
                color: "#6B7280",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              &ldquo;{item.original}&rdquo;
            </p>
          </div>

          {/* Commentary */}
          <div
            style={{
              borderTop: "1px solid rgba(229,231,235,0.5)",
              paddingTop: 20,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(251,191,36,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#F59E0B",
                }}
              >
                K
              </span>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#F59E0B",
                    marginBottom: 4,
                  }}
                >
                  Kid Says
                </p>
                <p style={{ fontSize: 14, color: "#1A1A2E", lineHeight: 1.5 }}>
                  &ldquo;{item.kidSays}&rdquo;
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(139,92,246,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#8B5CF6",
                }}
              >
                P
              </span>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#8B5CF6",
                    marginBottom: 4,
                  }}
                >
                  Parent Says
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "#9CA3AF",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{item.parentSays}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter + Save to Vault */}
      <div className="d-lightbox-counter" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span>{displayIndex + 1} / {total}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!saved) onSaveToVault(index);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 999,
            border: "none",
            fontSize: 11,
            fontWeight: 700,
            cursor: saved ? "default" : "pointer",
            fontFamily: "inherit",
            background: saved ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.15)",
            color: saved ? "#10B981" : "#8B5CF6",
            transition: "all 0.2s",
          }}
        >
          {saved ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              In Vault
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save to Vault
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Extract unique styles with their associated color
const STYLE_FILTERS = Array.from(
  GALLERY_ITEMS.reduce((map, item) => {
    if (!map.has(item.style)) map.set(item.style, item.color);
    return map;
  }, new Map<string, string>())
).map(([style, color]) => ({ style, color }));

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [vault, setVault] = useState<VaultState | null>(null);

  useEffect(() => {
    setVault(loadVault());
  }, []);

  const handleSaveToVault = useCallback((index: number) => {
    const item = GALLERY_ITEMS[index];
    const current = loadVault();
    const updated = addToVault(current, index, item.transformed, item.artist);
    if (updated !== current) {
      saveVault(updated);
      setVault(updated);
    }
  }, []);

  const filteredItems = activeStyle
    ? GALLERY_ITEMS.filter((item) => item.style === activeStyle)
    : GALLERY_ITEMS;

  // Map filtered index -> original GALLERY_ITEMS index for lightbox
  const filteredOriginalIndices = activeStyle
    ? GALLERY_ITEMS.reduce<number[]>((acc, item, i) => {
        if (item.style === activeStyle) acc.push(i);
        return acc;
      }, [])
    : GALLERY_ITEMS.map((_, i) => i);

  const openLightbox = useCallback((filteredIdx: number) => {
    setLightboxIndex(filteredOriginalIndices[filteredIdx]);
  }, [filteredOriginalIndices]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const currentFilteredIdx = filteredOriginalIndices.indexOf(prev);
      const newFilteredIdx = currentFilteredIdx <= 0
        ? filteredOriginalIndices.length - 1
        : currentFilteredIdx - 1;
      return filteredOriginalIndices[newFilteredIdx];
    });
  }, [filteredOriginalIndices]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const currentFilteredIdx = filteredOriginalIndices.indexOf(prev);
      const newFilteredIdx = currentFilteredIdx >= filteredOriginalIndices.length - 1
        ? 0
        : currentFilteredIdx + 1;
      return filteredOriginalIndices[newFilteredIdx];
    });
  }, [filteredOriginalIndices]);

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

        <div className="d-hero mx-auto max-w-6xl px-6">
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
          <div className="neu-card" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 48px", padding: "24px 32px", marginBottom: 40 }}>
            {[
              { value: 19, label: "Masterpieces", color: "#FF6B35" },
              { value: 12, label: "Art Styles", color: "#8B5CF6" },
              { value: 16, label: "Young Artists", color: "#10B981" },
              { value: 0, label: "Art Degrees Required", color: "#F59E0B" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: stat.color, fontFamily: "var(--font-mono, monospace)" }}><CountUp target={stat.value} /></p>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Style Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            <button
              onClick={() => setActiveStyle(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 999,
                padding: "8px 20px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.04em",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                background: activeStyle === null
                  ? "linear-gradient(135deg, #FF6B35, #8B5CF6)"
                  : "#fff",
                color: activeStyle === null ? "#fff" : "#6B7280",
                boxShadow: activeStyle === null
                  ? "0 2px 8px rgba(255,107,53,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              All ({GALLERY_ITEMS.length})
            </button>
            {STYLE_FILTERS.map(({ style, color }) => {
              const count = GALLERY_ITEMS.filter((item) => item.style === style).length;
              const isActive = activeStyle === style;
              return (
                <button
                  key={style}
                  onClick={() => setActiveStyle(isActive ? null : style)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 999,
                    padding: "8px 20px",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                    background: isActive ? color : "#fff",
                    color: isActive ? "#fff" : "#6B7280",
                    boxShadow: isActive
                      ? `0 2px 8px ${color}40`
                      : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {style} ({count})
                </button>
              );
            })}
          </div>

          {/* Gallery Grid -- neumorphic cards */}
          <StaggerContainer key={activeStyle ?? "all"}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, i) => (
                <StaggerItem key={item.artist + item.style}>
                  <div
                    className="neu-card d-card-hover"
                    style={{ overflow: "hidden", padding: 0, cursor: "pointer" }}
                    onClick={() => openLightbox(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${item.transformed} by ${item.artist}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(i);
                      }
                    }}
                  >
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
                          <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#F59E0B" }}>K</span>
                          <p style={{ fontSize: 12, color: "#1A1A2E" }}>&ldquo;{item.kidSays}&rdquo;</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                          <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#8B5CF6" }}>P</span>
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          index={lightboxIndex}
          displayIndex={filteredOriginalIndices.indexOf(lightboxIndex)}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          total={filteredItems.length}
          vault={vault}
          onSaveToVault={handleSaveToVault}
        />
      )}
    </PageTransition>
  );
}
