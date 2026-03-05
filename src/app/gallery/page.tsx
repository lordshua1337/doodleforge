"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { loadVault, saveVault, addToVault, type VaultState } from "@/lib/vault-data";

// Real forge from the database
interface CommunityForge {
  id: string;
  style: string;
  is_epic: boolean;
  result_url: string | null;
  created_at: string;
  drawings: { original_url: string } | null;
}

const GALLERY_ITEMS = [
  { original: "Crayon stick figures under a yellow sun", transformed: "Renaissance-style family portrait with golden hour lighting", style: "Oil Painting", artist: "Emma, age 5", kidSays: "That's our family!", parentSays: "Why does everyone have 3 arms?", color: "#E63946" },
  { original: "Green blob with legs and teeth", transformed: "Majestic dinosaur in a prehistoric jungle landscape", style: "Photorealistic", artist: "Liam, age 4", kidSays: "RAWR it's a T-Rex!", parentSays: "Looks more like a melting pickle", color: "#06D6A0" },
  { original: "Blue and red house with smoke from chimney", transformed: "Cozy cottage in watercolor with autumn trees", style: "Watercolor", artist: "Sophia, age 6", kidSays: "That's where we live!", parentSays: "Since when is our roof a triangle?", color: "#457B9D" },
  { original: "Cat with triangle ears and whiskers", transformed: "Elegant anime cat character with sparkle effects", style: "Anime", artist: "Noah, age 5", kidSays: "It's Mr. Whiskers!", parentSays: "Mr. Whiskers looks... haunted", color: "#7B2D8E" },
  { original: "Rainbow with clouds on both sides", transformed: "Neon-lit rainbow over a cyberpunk cityscape", style: "Cyberpunk", artist: "Olivia, age 3", kidSays: "Pretty colors!", parentSays: "It's a stripe collection, not a rainbow", color: "#457B9D" },
  { original: "Spaceship with fire coming out the bottom", transformed: "8-bit pixel art rocket launch with star field", style: "Pixel Art", artist: "Jackson, age 7", kidSays: "Going to Mars!", parentSays: "That's a pencil with flames", color: "#FFD166" },
  { original: "Tree with a bird and flowers", transformed: "Enchanted forest scene with magical creatures", style: "Studio Ghibli", artist: "Ava, age 4", kidSays: "A magic forest!", parentSays: "The bird is bigger than the tree", color: "#E63946" },
  { original: "Dad with really long arms and tiny legs", transformed: "Bold pop art portrait with halftone dots", style: "Pop Art", artist: "Ethan, age 5", kidSays: "That's you Daddy!", parentSays: "I need to process this emotionally", color: "#FFD166" },
  { original: "Fish swimming in wavy water", transformed: "Underwater oil painting with bioluminescent sea life", style: "Oil Painting", artist: "Isabella, age 6", kidSays: "Nemo's friend!", parentSays: "That fish has existential dread in its eyes", color: "#457B9D" },
  { original: "Princess with triangle dress and crown", transformed: "Elegant anime princess with sparkling tiara and flowing gown", style: "Anime", artist: "Charlotte, age 4", kidSays: "That's me when I grow up!", parentSays: "The crown is bigger than her head. Accurate.", color: "#7B2D8E" },
  { original: "Dog with really long body and short legs", transformed: "Photorealistic corgi puppy in a flower field", style: "Photorealistic", artist: "Mason, age 5", kidSays: "It's Biscuit!", parentSays: "Biscuit doesn't have 6 legs but okay", color: "#06D6A0" },
  { original: "Sun with sunglasses and a big smile", transformed: "Neon-drenched cyberpunk sun radiating over a chrome skyline", style: "Cyberpunk", artist: "Zoe, age 3", kidSays: "Happy sun!", parentSays: "That sun is having a better day than I am", color: "#457B9D" },
  { original: "Car with square wheels and exhaust smoke", transformed: "8-bit racing game screenshot with pixel perfect detail", style: "Pixel Art", artist: "Lucas, age 7", kidSays: "My race car goes so fast!", parentSays: "It has square wheels, it's going nowhere", color: "#06D6A0" },
  { original: "Butterfly with mismatched wings", transformed: "Art nouveau butterfly with stained glass wing patterns", style: "Watercolor", artist: "Mia, age 5", kidSays: "She's flying to a party!", parentSays: "One wing is a triangle, the other is a circle. This butterfly is not flying anywhere.", color: "#457B9D" },
  { original: "Monster under a bed with teeth everywhere", transformed: "Bold Warhol-style pop art monster portrait in electric colors", style: "Pop Art", artist: "Jack, age 6", kidSays: "This is what lives under my bed", parentSays: "Great, now I need therapy too", color: "#FFD166" },
  { original: "Heart with wings and a smiley face", transformed: "Cathedral window panel of a winged heart in deep ruby and gold glass", style: "Stained Glass", artist: "Lily, age 4", kidSays: "Love can fly!", parentSays: "The wings are... on the wrong side", color: "#7B2D8E" },
  { original: "Dog chasing a ball in the yard", transformed: "Saturday morning cartoon dog mid-leap with motion lines and star bursts", style: "Cartoon", artist: "Owen, age 6", kidSays: "Buster loves fetch!", parentSays: "That dog has 7 toes. I've counted.", color: "#E63946" },
  { original: "Self portrait with big eyes and tiny body", transformed: "Elegant graphite portrait study with refined shading and cross-hatching", style: "Pencil Sketch", artist: "Aria, age 5", kidSays: "That's me being fancy!", parentSays: "The head-to-body ratio suggests she's an alien", color: "#6C757D" },
  { original: "Castle with a dragon flying over it", transformed: "Epic fantasy citadel with a fire-breathing dragon soaring through storm clouds", style: "Fantasy Epic", artist: "Wyatt, age 7", kidSays: "The dragon protects the castle!", parentSays: "That's a lizard flying over a rectangle but go off king", color: "#06D6A0" },
];

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) { setCount(target); return; }
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function LightboxModal({
  index, displayIndex, onClose, onPrev, onNext, total, vault, onSaveToVault,
}: {
  index: number; displayIndex: number; onClose: () => void; onPrev: () => void; onNext: () => void;
  total: number; vault: VaultState | null; onSaveToVault: (index: number) => void;
}) {
  const item = GALLERY_ITEMS[index];
  const saved = vault ? vault.entries.some((e) => e.title === `Gallery: ${item.transformed}`) : false;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="d-lightbox-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label={`Gallery item ${displayIndex + 1} of ${total}`}>
      <button className="d-lightbox-nav d-lightbox-prev" onClick={onPrev} aria-label="Previous artwork">&#8249;</button>
      <button className="d-lightbox-nav d-lightbox-next" onClick={onNext} aria-label="Next artwork">&#8250;</button>

      <div className="d-lightbox-content" style={{ border: "3px solid #2B2D42", borderRadius: 12, background: "#FFF8F0", padding: 0, overflow: "hidden" }}>
        <button className="d-lightbox-close" onClick={onClose} aria-label="Close lightbox">&#x2715;</button>

        {/* Top visual area */}
        <div style={{ position: "relative", aspectRatio: "4/3", background: "#F5E6D3", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #2B2D42" }}>
          <div style={{ textAlign: "center", padding: 40 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#2B2D42", marginBottom: 16, lineHeight: 1.5, fontFamily: "var(--font-display)" }}>
              {item.transformed}
            </p>
            <span style={{ display: "inline-flex", borderRadius: 4, padding: "6px 18px", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#fff", background: item.color, border: "2px solid #2B2D42" }}>
              {item.style}
            </span>
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#ADB5BD" }}>The Original Drawing</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: "var(--font-display)" }}>{item.artist}</p>
            </div>
            <p style={{ fontSize: 15, color: "#6C757D", fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{item.original}&rdquo;</p>
          </div>

          <div style={{ borderTop: "2px solid #E5D5C3", paddingTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="d-bubble">
              <span className="d-bubble-avatar" style={{ background: "rgba(255,209,102,0.2)", color: "#B8860B" }}>K</span>
              <div>
                <p className="d-bubble-label" style={{ color: "#B8860B" }}>Kid Says</p>
                <p style={{ fontSize: 14, color: "#2B2D42", lineHeight: 1.5 }}>&ldquo;{item.kidSays}&rdquo;</p>
              </div>
            </div>
            <div className="d-bubble">
              <span className="d-bubble-avatar" style={{ background: "rgba(123,45,142,0.15)", color: "#7B2D8E" }}>P</span>
              <div>
                <p className="d-bubble-label" style={{ color: "#7B2D8E" }}>Parent Says</p>
                <p style={{ fontSize: 14, color: "#ADB5BD", fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{item.parentSays}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-lightbox-counter" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span>{displayIndex + 1} / {total}</span>
        <button
          onClick={(e) => { e.stopPropagation(); if (!saved) onSaveToVault(index); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
            borderRadius: 4, border: "2px solid #2B2D42", fontSize: 11, fontWeight: 700,
            cursor: saved ? "default" : "pointer", fontFamily: "var(--font-accent)",
            background: saved ? "rgba(6,214,160,0.2)" : "rgba(123,45,142,0.15)",
            color: saved ? "#06D6A0" : "#7B2D8E", transition: "all 0.2s",
          }}
        >
          {saved ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>In Vault</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save to Vault</>
          )}
        </button>
      </div>
    </div>
  );
}

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
  const [communityForges, setCommunityForges] = useState<CommunityForge[]>([]);

  useEffect(() => { setVault(loadVault()); }, []);

  // Fetch real community forges
  useEffect(() => {
    fetch("/api/forges?scope=community&limit=20")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.forges?.length) {
          setCommunityForges(data.forges);
        }
      })
      .catch(() => { /* silently fall back to hardcoded items */ });
  }, []);

  const handleSaveToVault = useCallback((index: number) => {
    const item = GALLERY_ITEMS[index];
    const current = loadVault();
    const updated = addToVault(current, {
      originalUrl: "",
      resultUrl: null,
      style: item.style,
      childName: item.artist,
      title: `Gallery: ${item.transformed}`,
      note: "",
      forgeId: null,
    });
    if (updated !== current) { saveVault(updated); setVault(updated); }
  }, []);

  const filteredItems = activeStyle ? GALLERY_ITEMS.filter((item) => item.style === activeStyle) : GALLERY_ITEMS;
  const filteredOriginalIndices = activeStyle
    ? GALLERY_ITEMS.reduce<number[]>((acc, item, i) => { if (item.style === activeStyle) acc.push(i); return acc; }, [])
    : GALLERY_ITEMS.map((_, i) => i);

  const openLightbox = useCallback((filteredIdx: number) => { setLightboxIndex(filteredOriginalIndices[filteredIdx]); }, [filteredOriginalIndices]);
  const closeLightbox = useCallback(() => { setLightboxIndex(null); }, []);
  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const ci = filteredOriginalIndices.indexOf(prev);
      return filteredOriginalIndices[ci <= 0 ? filteredOriginalIndices.length - 1 : ci - 1];
    });
  }, [filteredOriginalIndices]);
  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const ci = filteredOriginalIndices.indexOf(prev);
      return filteredOriginalIndices[ci >= filteredOriginalIndices.length - 1 ? 0 : ci + 1];
    });
  }, [filteredOriginalIndices]);

  return (
    <div className="relative z-10 min-h-screen">
      <div className="d-section" style={{ background: '#FFF8F0' }}>
      <div className="d-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="d-eyebrow d-eyebrow-red">The Wall of Shame</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 16 }}>
            Guess what they <span style={{ color: "#E63946" }}>drew</span>.
          </h1>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto" }}>
            Every masterpiece below started as a child&apos;s drawing.
            The parents submitted them. We transformed them. We all had a good laugh.
          </p>
        </div>

        {/* Stats bar */}
        <div className="d-stats-bar d-mb-xl">
          {[
            { value: 19, label: "Masterpieces", color: "#E63946" },
            { value: 12, label: "Art Styles", color: "#7B2D8E" },
            { value: 16, label: "Young Artists", color: "#06D6A0" },
            { value: 0, label: "Art Degrees Required", color: "#FFD166" },
          ].map((stat) => (
            <div key={stat.label} className="d-stats-bar-item">
              <p className="d-stats-bar-value" style={{ color: stat.color }}><CountUp target={stat.value} /></p>
              <p className="d-stats-bar-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Style Filter Pills */}
        <div className="d-flex d-mb-xl" style={{ flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          <button
            onClick={() => setActiveStyle(null)}
            className={`d-select-pill ${activeStyle === null ? 'd-select-pill-active' : ''}`}
          >
            All ({GALLERY_ITEMS.length})
          </button>
          {STYLE_FILTERS.map(({ style }) => {
            const count = GALLERY_ITEMS.filter((item) => item.style === style).length;
            const isActive = activeStyle === style;
            return (
              <button
                key={style}
                onClick={() => setActiveStyle(isActive ? null : style)}
                className={`d-select-pill ${isActive ? 'd-select-pill-active' : ''}`}
              >
                {style} ({count})
              </button>
            );
          })}
        </div>

        {/* Real Community Forges from DB */}
        {communityForges.length > 0 && !activeStyle && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <p className="d-eyebrow d-eyebrow-purple">Fresh From the Community</p>
              <h2 className="d-heading d-heading-sm" style={{ marginBottom: 8 }}>
                Real forges by real parents
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ marginBottom: 48 }}>
              {communityForges.map((forge) => (
                <div
                  key={forge.id}
                  className="d-shame-card"
                  style={{ cursor: "default" }}
                >
                  {forge.result_url ? (
                    <div className="d-shame-top" style={{ padding: 0, aspectRatio: "4/3", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={forge.result_url}
                        alt={`${forge.style} forge`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  ) : (
                    <div className="d-shame-top">
                      <p style={{ fontSize: 14, color: "#6C757D", fontFamily: "var(--font-accent)" }}>
                        Generating...
                      </p>
                    </div>
                  )}
                  <div className="d-shame-body" style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          borderRadius: 4,
                          padding: "4px 12px",
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: "var(--font-accent)",
                          color: "#fff",
                          background: forge.is_epic ? "#7B2D8E" : "#457B9D",
                          border: "2px solid #2B2D42",
                        }}
                      >
                        {forge.is_epic ? "EPIC" : forge.style}
                      </span>
                      <span style={{ fontSize: 11, color: "#ADB5BD", fontFamily: "var(--font-accent)" }}>
                        {new Date(forge.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-divider-gradient" style={{ marginBottom: 32 }} />
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2 className="d-heading d-heading-sm">
                Plus our curated favorites
              </h2>
            </div>
          </>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, i) => (
            <div
              key={item.artist + item.style}
              className="d-shame-card"
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.transformed} by ${item.artist}`}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } }}
              style={{ cursor: "pointer" }}
            >
              {/* Image placeholder */}
              <div className="d-shame-top">
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#6C757D", marginBottom: 12, fontFamily: "var(--font-accent)" }}>
                    {item.transformed}
                  </p>
                  <span style={{ display: "inline-flex", borderRadius: 4, padding: "4px 14px", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#fff", background: item.color, border: "2px solid #2B2D42" }}>
                    {item.style}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="d-shame-body">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#ADB5BD" }}>Original:</p>
                  <p style={{ fontSize: 12, color: "#ADB5BD", fontFamily: "var(--font-accent)" }}>{item.artist}</p>
                </div>
                <p style={{ fontSize: 14, color: "#6C757D", fontStyle: "italic", marginBottom: 12 }}>
                  &ldquo;{item.original}&rdquo;
                </p>

                <div style={{ borderTop: "2px solid #E5D5C3", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="d-bubble">
                    <span className="d-bubble-avatar" style={{ background: "rgba(255,209,102,0.2)", color: "#B8860B", width: 24, height: 24, fontSize: 9 }}>K</span>
                    <p style={{ fontSize: 12, color: "#2B2D42" }}>&ldquo;{item.kidSays}&rdquo;</p>
                  </div>
                  <div className="d-bubble">
                    <span className="d-bubble-avatar" style={{ background: "rgba(123,45,142,0.15)", color: "#7B2D8E", width: 24, height: 24, fontSize: 9 }}>P</span>
                    <p style={{ fontSize: 12, color: "#ADB5BD", fontStyle: "italic" }}>&ldquo;{item.parentSays}&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-divider-gradient" style={{ marginTop: 64, marginBottom: 16 }} />

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="d-heading d-heading-md" style={{ marginBottom: 12 }}>
            Your kid&apos;s doodle could be <span style={{ color: "#E63946" }}>next</span>.
          </h2>
          <p className="d-body" style={{ marginBottom: 24 }}>
            Submit their drawing. We&apos;ll transform it. Everyone wins.
          </p>
          <Link href="/create" className="d-btn-primary">
            MAKE A DOODIE
          </Link>
        </div>
      </div>
      </div>

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
    </div>
  );
}
