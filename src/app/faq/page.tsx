"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  { category: "Getting Started", question: "How does Doodie work?", answer: "Upload a photo of your kid's drawing, pick an art style (oil painting, anime, watercolor, etc.), and our AI transforms it into professional-looking art while keeping the original composition. The whole process takes about 15-30 seconds." },
  { category: "Getting Started", question: "Do I need to create an account?", answer: "Nope. You can make a Doodie right now without signing up. We only need an account if you want to save drawings to the Vault or order prints. Even then, it takes 10 seconds." },
  { category: "Getting Started", question: "What kind of drawings work best?", answer: "Anything a kid drew. Crayon, marker, pencil, paint -- all good. The clearer the photo, the better the result. Try to get decent lighting and avoid shadows on the paper. Pro tip: white paper with dark lines works best." },
  { category: "The Art", question: "Does the AI change my kid's drawing?", answer: "The AI preserves your kid's composition, characters, and layout. It applies the style (brushstrokes, colors, lighting) but keeps the \"what\" the same. If your kid drew a cat, you get a cat -- just a much fancier one. If the output doesn't look like what your kid drew, we've failed." },
  { category: "The Art", question: "What art styles are available?", answer: "Currently 12: Oil Painting, Watercolor, Anime, Cyberpunk, Pop Art, Pixel Art, Studio Ghibli, Photorealistic, Stained Glass, Cartoon, Pencil Sketch, and Fantasy Epic. We're adding more regularly. Each style produces dramatically different results from the same drawing." },
  { category: "The Art", question: "Can I try multiple styles on the same drawing?", answer: "Yes! Upload once, then go back and pick a different style. See your kid's dinosaur as an oil painting, then as anime, then as cyberpunk. Different vibes, same adorable source material." },
  { category: "The Art", question: "What resolution are the images?", answer: "Quick drafts generate at 512x512. When you hit 'Forge Final,' you get a high-resolution version suitable for printing up to 16x20 inches. The download button always gives you the highest resolution available." },
  { category: "Vault & Storage", question: "What is the Vault?", answer: "The Vault is your kid's permanent digital art archive. Scan and store any drawing -- even ones you don't transform. It organizes everything by child and date, so you can see their artistic growth over time. Think of it as a digital fridge that never runs out of magnets." },
  { category: "Vault & Storage", question: "How many drawings can I store?", answer: "Free accounts store up to 50 drawings. Pro accounts get unlimited storage. Storing drawings is free and doesn't use any credits -- we want you to save everything." },
  { category: "Prints & Gifts", question: "Can I order a physical print?", answer: "Yes! We offer framed prints, posters, greeting card sets, photo books, and gift bundles. Everything is printed on premium materials and ships in 5-7 business days. The framed prints make genuinely impressive gifts." },
  { category: "Prints & Gifts", question: "Do you ship internationally?", answer: "Currently we ship within the US. International shipping is coming soon. In the meantime, you can always download the high-res image and use a local print service." },
  { category: "Privacy & Safety", question: "Is my kid's art safe?", answer: "Absolutely. We never share, sell, or use your child's drawings for anything other than generating their art. Images are processed and deleted from our servers within 24 hours unless you save them to the Vault. We're COPPA compliant and take kid privacy seriously." },
  { category: "Privacy & Safety", question: "Do you use my kid's drawings to train AI?", answer: "No. Full stop. Your kid's drawings are processed through our AI model to generate the transformation, then deleted. We do not use uploaded images to train, fine-tune, or improve any AI model. Your kid's art belongs to your kid." },
  { category: "Pricing", question: "Is it free?", answer: "You get free credits to try it out. After that, we have affordable plans starting at a few bucks a month. Honestly, if it saves you from buying one overpriced art print as a gift, it's already paid for itself." },
  { category: "Pricing", question: "What if I don't like the result?", answer: "Try a different style -- sometimes watercolor hits different than oil painting. If you're still not happy, the credit is not consumed for results you don't save. We'd rather you try again than walk away disappointed." },
  { category: "The Art", question: "What's the difference between a draft and a final?", answer: "Drafts are quick previews generated in about 5 seconds at a smaller resolution. They're great for trying different styles to see what you like. Once you find the one, hit 'Forge Final' to get the full high-resolution version suitable for printing. Drafts don't use your final credits." },
  { category: "Getting Started", question: "Can I use a photo of a drawing from years ago?", answer: "Yes! Dig through those kitchen drawers, closet bins, and grandma's fridge collection. Old drawings work great as long as the photo is reasonably clear. We've successfully transformed decade-old crayon drawings that were basically just faded lines on crumpled paper." },
  { category: "Prints & Gifts", question: "Are the prints actually good quality?", answer: "Museum-quality. We use archival inks on premium paper and canvas. The framed options come with real glass and solid wood frames. These aren't novelty items -- they're actual art prints that look incredible on a wall. Multiple customers have told us guests assume they hired an artist." },
  { category: "Privacy & Safety", question: "Can my kid use the app directly?", answer: "DoodleForge is a parent-facing app. Kids don't create accounts or log in. They do the fun part (drawing) on paper, and you handle the digital magic. This keeps everything simple and COPPA-compliant. That said, kids absolutely love watching the transformation happen on screen." },
];

const CATEGORIES = [...new Set(FAQ_ITEMS.map((item) => item.category))];

const CATEGORY_COLORS: Record<string, string> = {
  "Getting Started": "#E63946",
  "The Art": "#7B2D8E",
  "Vault & Storage": "#457B9D",
  "Prints & Gifts": "#06D6A0",
  "Privacy & Safety": "#FFD166",
  Pricing: "#E63946",
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
  const color = CATEGORY_COLORS[item.category] || "#ADB5BD";

  return (
    <div
      style={{
        border: "3px solid #2B2D42",
        borderRadius: 8,
        background: "#FFF8F0",
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
              height: 8,
              width: 8,
              borderRadius: 2,
              background: color,
              flexShrink: 0,
            }}
          />
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)" }}>
            {item.question}
          </h3>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2B2D42"
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
            color: "#6C757D",
            borderTop: "2px solid #E5D5C3",
            paddingTop: 16,
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
    <div className="relative z-10 min-h-screen">
      <div className="d-hero mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="d-eyebrow d-eyebrow-purple">Questions</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 16 }}>
            Things people <span style={{ color: "#E63946" }}>ask us</span>.
          </h1>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto" }}>
            Usually right after they see what we did to their kid&apos;s
            drawing. Relax. We can explain everything.
          </p>
        </div>

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
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              border: "2px solid #2B2D42",
              background: activeCategory === null ? "#2B2D42" : "#FFF8F0",
              color: activeCategory === null ? "#fff" : "#6C757D",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const color = CATEGORY_COLORS[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(isActive ? null : cat);
                  setOpenIndex(null);
                }}
                style={{
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  border: `2px solid ${isActive ? color : "#2B2D42"}`,
                  background: isActive ? `${color}20` : "#FFF8F0",
                  color: isActive ? color : "#6C757D",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            );
          })}
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

        <div className="d-divider-gradient" style={{ marginTop: 48, marginBottom: 48 }} />

        {/* CTA */}
        <div
          className="text-center d-section-alt"
          style={{ padding: "48px 24px", borderRadius: 8, border: "3px solid #2B2D42" }}
        >
          <h2 className="d-heading d-heading-md" style={{ marginBottom: 12 }}>
            Still have questions? <span style={{ color: "#E63946" }}>Good.</span>
          </h2>
          <p className="d-body" style={{ marginBottom: 24 }}>
            The best way to understand Doodie is to try it. Upload a
            drawing and see what happens.
          </p>
          <Link href="/create" className="d-btn-primary">
            MAKE A DOODIE
          </Link>
        </div>
      </div>
    </div>
  );
}
