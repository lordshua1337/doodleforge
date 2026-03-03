"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Getting Started",
    question: "How does Doodie work?",
    answer:
      "Upload a photo of your kid's drawing, pick an art style (oil painting, anime, watercolor, etc.), and our AI transforms it into professional-looking art while keeping the original composition. The whole process takes about 15-30 seconds.",
  },
  {
    category: "Getting Started",
    question: "Do I need to create an account?",
    answer:
      "Nope. You can make a Doodie right now without signing up. We only need an account if you want to save drawings to the Vault or order prints. Even then, it takes 10 seconds.",
  },
  {
    category: "Getting Started",
    question: "What kind of drawings work best?",
    answer:
      "Anything a kid drew. Crayon, marker, pencil, paint -- all good. The clearer the photo, the better the result. Try to get decent lighting and avoid shadows on the paper. Pro tip: white paper with dark lines works best.",
  },
  {
    category: "The Art",
    question: "Does the AI change my kid's drawing?",
    answer:
      "The AI preserves your kid's composition, characters, and layout. It applies the style (brushstrokes, colors, lighting) but keeps the \"what\" the same. If your kid drew a cat, you get a cat -- just a much fancier one. If the output doesn't look like what your kid drew, we've failed.",
  },
  {
    category: "The Art",
    question: "What art styles are available?",
    answer:
      "Currently 12: Oil Painting, Watercolor, Anime, Cyberpunk, Pop Art, Pixel Art, Studio Ghibli, Photorealistic, Stained Glass, Cartoon, Pencil Sketch, and Fantasy Epic. We're adding more regularly. Each style produces dramatically different results from the same drawing.",
  },
  {
    category: "The Art",
    question: "Can I try multiple styles on the same drawing?",
    answer:
      "Yes! Upload once, then go back and pick a different style. See your kid's dinosaur as an oil painting, then as anime, then as cyberpunk. Different vibes, same adorable source material.",
  },
  {
    category: "The Art",
    question: "What resolution are the images?",
    answer:
      "Quick drafts generate at 512x512. When you hit 'Forge Final,' you get a high-resolution version suitable for printing up to 16x20 inches. The download button always gives you the highest resolution available.",
  },
  {
    category: "Vault & Storage",
    question: "What is the Vault?",
    answer:
      "The Vault is your kid's permanent digital art archive. Scan and store any drawing -- even ones you don't transform. It organizes everything by child and date, so you can see their artistic growth over time. Think of it as a digital fridge that never runs out of magnets.",
  },
  {
    category: "Vault & Storage",
    question: "How many drawings can I store?",
    answer:
      "Free accounts store up to 50 drawings. Pro accounts get unlimited storage. Storing drawings is free and doesn't use any credits -- we want you to save everything.",
  },
  {
    category: "Prints & Gifts",
    question: "Can I order a physical print?",
    answer:
      "Yes! We offer framed prints, posters, greeting card sets, photo books, and gift bundles. Everything is printed on premium materials and ships in 5-7 business days. The framed prints make genuinely impressive gifts.",
  },
  {
    category: "Prints & Gifts",
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the US. International shipping is coming soon. In the meantime, you can always download the high-res image and use a local print service.",
  },
  {
    category: "Privacy & Safety",
    question: "Is my kid's art safe?",
    answer:
      "Absolutely. We never share, sell, or use your child's drawings for anything other than generating their art. Images are processed and deleted from our servers within 24 hours unless you save them to the Vault. We're COPPA compliant and take kid privacy seriously.",
  },
  {
    category: "Privacy & Safety",
    question: "Do you use my kid's drawings to train AI?",
    answer:
      "No. Full stop. Your kid's drawings are processed through our AI model to generate the transformation, then deleted. We do not use uploaded images to train, fine-tune, or improve any AI model. Your kid's art belongs to your kid.",
  },
  {
    category: "Pricing",
    question: "Is it free?",
    answer:
      "You get free credits to try it out. After that, we have affordable plans starting at a few bucks a month. Honestly, if it saves you from buying one overpriced art print as a gift, it's already paid for itself.",
  },
  {
    category: "Pricing",
    question: "What if I don't like the result?",
    answer:
      "Try a different style -- sometimes watercolor hits different than oil painting. If you're still not happy, the credit is not consumed for results you don't save. We'd rather you try again than walk away disappointed.",
  },
  {
    category: "The Art",
    question: "What's the difference between a draft and a final?",
    answer:
      "Drafts are quick previews generated in about 5 seconds at a smaller resolution. They're great for trying different styles to see what you like. Once you find the one, hit 'Forge Final' to get the full high-resolution version suitable for printing. Drafts don't use your final credits.",
  },
  {
    category: "Getting Started",
    question: "Can I use a photo of a drawing from years ago?",
    answer:
      "Yes! Dig through those kitchen drawers, closet bins, and grandma's fridge collection. Old drawings work great as long as the photo is reasonably clear. We've successfully transformed decade-old crayon drawings that were basically just faded lines on crumpled paper.",
  },
  {
    category: "Prints & Gifts",
    question: "Are the prints actually good quality?",
    answer:
      "Museum-quality. We use archival inks on premium paper and canvas. The framed options come with real glass and solid wood frames. These aren't novelty items -- they're actual art prints that look incredible on a wall. Multiple customers have told us guests assume they hired an artist.",
  },
  {
    category: "Privacy & Safety",
    question: "Can my kid use the app directly?",
    answer:
      "DoodleForge is a parent-facing app. Kids don't create accounts or log in. They do the fun part (drawing) on paper, and you handle the digital magic. This keeps everything simple and COPPA-compliant. That said, kids absolutely love watching the transformation happen on screen.",
  },
];

const CATEGORIES = [...new Set(FAQ_ITEMS.map((item) => item.category))];

const CATEGORY_COLORS: Record<string, string> = {
  "Getting Started": "#FF6B6B",
  "The Art": "#A78BFA",
  "Vault & Storage": "#60A5FA",
  "Prints & Gifts": "#34D399",
  "Privacy & Safety": "#FBBF24",
  Pricing: "#F472B6",
};

function FaqAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="neu-card"
      style={{
        padding: 0,
        overflow: "hidden",
        marginBottom: 12,
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div
            style={{
              height: 3,
              width: 3,
              borderRadius: "50%",
              background: CATEGORY_COLORS[item.category] || "#9CA3AF",
              flexShrink: 0,
            }}
          />
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>
            {item.question}
          </h3>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div
        style={{
          maxHeight: isOpen ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div
          style={{
            padding: "0 24px 20px",
            fontSize: 14,
            lineHeight: 1.7,
            color: "#6B7280",
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? FAQ_ITEMS.filter((item) => item.category === activeCategory)
    : FAQ_ITEMS;

  return (
    <PageTransition>
      <div className="relative z-10 min-h-screen">
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 350,
            height: 350,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "top right",
            opacity: 0.05,
            pointerEvents: "none",
            maskImage:
              "linear-gradient(135deg, transparent 15%, black 50%, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(135deg, transparent 15%, black 50%, transparent 90%)",
          }}
        />

        <div className="d-hero mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
              Questions
            </p>
            <h1
              className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Things people <span className="text-coral">ask us</span>.
            </h1>
            <p className="mx-auto max-w-lg text-text-secondary">
              Usually right after they see what we did to their kid&apos;s
              drawing. Relax. We can explain everything.
            </p>
          </div>

          {/* Accent divider below header */}
          <div className="d-divider-gradient" style={{ marginBottom: 32 }} />

          {/* Category filter */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <button
              onClick={() => {
                setActiveCategory(null);
                setOpenIndex(null);
              }}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                border: "1px solid",
                borderColor: activeCategory === null ? "#1A1A2E" : "#E5E7EB",
                background: activeCategory === null ? "#1A1A2E" : "#fff",
                color: activeCategory === null ? "#fff" : "#6B7280",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(activeCategory === cat ? null : cat);
                  setOpenIndex(null);
                }}
                style={{
                  padding: "6px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  border: "1px solid",
                  borderColor:
                    activeCategory === cat
                      ? CATEGORY_COLORS[cat]
                      : "#E5E7EB",
                  background:
                    activeCategory === cat
                      ? `${CATEGORY_COLORS[cat]}10`
                      : "#fff",
                  color:
                    activeCategory === cat
                      ? CATEGORY_COLORS[cat]
                      : "#6B7280",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div>
            {filtered.map((item, i) => (
              <FaqAccordion
                key={item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* Accent divider */}
          <div className="d-divider-gradient" style={{ marginTop: 48, marginBottom: 48 }} />

          {/* CTA */}
          <div className="mt-8 text-center d-section-alt" style={{ padding: "48px 24px", borderRadius: 20 }}>
            <h2
              className="mb-4 text-2xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Still have questions?{" "}
              <span className="text-coral">Good.</span>
            </h2>
            <p className="mb-6 text-text-secondary">
              The best way to understand Doodie is to try it. Upload a
              drawing and see what happens.
            </p>
            <Link href="/create" className="d-btn-primary glow-cta">
              Make A Doodie &rarr;
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
