"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  { category: "The Basics", question: "What even is Doodie?", answer: "Your kid draws something. You photograph it. We make it look like it belongs in a museum. Oil painting, anime, watercolor -- you pick the vibe. The whole thing takes about 15 seconds, which is roughly 14 seconds longer than your kid spent on the drawing." },
  { category: "The Basics", question: "Do I need an account?", answer: "Not to make your first Doodie, no. We give you free forges just for showing up. You only need an account if you want to save stuff to the Vault or order prints. Signing up takes 10 seconds. We timed it. Twice." },
  { category: "The Basics", question: "What drawings work best?", answer: "Literally anything a child has produced. Crayon on printer paper. Marker on a napkin. That one time they drew on the wall and you took a photo before scrubbing it off. Just get decent lighting and try not to include your thumb. White paper with dark lines is the sweet spot, but we're not picky." },
  { category: "The Basics", question: "Can I use old drawings?", answer: "Yes. Raid the kitchen drawer. Check behind the fridge. Dig through that bin in the closet you haven't opened since 2019. We've successfully transformed drawings so old the crayon had basically returned to dust. If you can photograph it, we can forge it." },
  { category: "The Art", question: "Does the AI change my kid's drawing?", answer: "It keeps the what and upgrades the how. Your kid's cat stays a cat -- it just becomes a cat that looks like it was painted by someone who went to art school and takes themselves very seriously. If the result doesn't look like what your kid drew, we've failed. And we don't like failing." },
  { category: "The Art", question: "How many styles are there?", answer: "12 regular styles plus EPIC mode (which is basically what happens when you let the AI have espresso). Oil Painting, Watercolor, Anime, Cyberpunk, Pop Art, Pixel Art, Studio Ghibli, Photorealistic, Stained Glass, Cartoon, Pencil Sketch, and Fantasy. We add more when we feel like it." },
  { category: "The Art", question: "Can I try multiple styles?", answer: "Upload once, forge as many times as you want. See your kid's dinosaur as a Monet, then as anime, then as a neon cyberpunk fever dream. Same scribble, wildly different vibes. This is where the addiction starts." },
  { category: "The Art", question: "What's the deal with EPIC mode?", answer: "EPIC is what happens when you remove the AI's restraint. Your kid's stick figure becomes a warrior in a lightning storm. Their crayon sun becomes a supernova. It costs 2 credits instead of 1 because honestly the results are absurd and we have to pay for all those extra pixels." },
  { category: "The Art", question: "Draft vs Final -- what's the difference?", answer: "Drafts are the appetizer. Quick, low-res, instant gratification. Finals are the main course -- full resolution, print-ready, frame-worthy. Drafts are for figuring out which style slaps. Finals are for making grandma cry." },
  { category: "The Vault", question: "What is the Vault?", answer: "A digital fridge with infinite magnets. Scan and store any drawing your kid makes -- even ones you don't transform. It organizes everything by kid and date so you can watch their art evolve from 'abstract blob' to 'slightly more intentional abstract blob' over the years." },
  { category: "The Vault", question: "How many drawings can I store?", answer: "Storing is free and doesn't use credits. We genuinely want you to scan everything. Every napkin doodle. Every homework margin masterpiece. Every drawing of 'the family' where Dad is suspiciously tiny." },
  { category: "Prints & Gifts", question: "Can I get a real print?", answer: "Yes, and they're actually good. Museum-quality paper, archival inks, real wood frames with real glass. These aren't fridge magnets (though we support that lifestyle too). Multiple people have told us their guests assumed they commissioned a professional artist. Nope. Just a 4-year-old with a crayon." },
  { category: "Prints & Gifts", question: "Do you ship internationally?", answer: "US only right now. We're working on it. In the meantime, you can download the high-res file and find a local printer. We won't be offended. Actually we will be a little offended but we'll get over it." },
  { category: "Privacy", question: "Is my kid's art safe?", answer: "Safer than it is on your fridge (which, let's be honest, is a war zone). We never share, sell, or use your kid's drawings for anything except making them look incredible. Images are processed and deleted within 24 hours unless you save them. We're COPPA compliant. We take this seriously even when we don't sound like it." },
  { category: "Privacy", question: "Do you train AI on my kid's art?", answer: "No. Absolutely not. Never. Your kid's drawings go through our AI, get transformed, and get deleted. We do not use them to train, fine-tune, or improve any model. Your kid's art belongs to your kid. This is the one question we don't joke about." },
  { category: "Privacy", question: "Can my kid use the app?", answer: "Doodie is a parent app. Kids do the fun part (drawing on actual paper like nature intended) and you handle the digital wizardry. This keeps everything COPPA-compliant and also means your kid can't accidentally buy 47 prints of their drawing of a 'snake' that is clearly just a line." },
  { category: "Money", question: "Is it free?", answer: "You get free credits to try it. After that, plans start at a few bucks. If it saves you from one overpriced Etsy art print as a birthday gift, it's already paid for itself. If it saves you from two, you're basically profiting. You're welcome." },
  { category: "Money", question: "What if the result is bad?", answer: "Try a different style. Seriously. Sometimes watercolor hits different than oil painting. Sometimes your kid's drawing of a 'horse' looks better as pixel art than photorealistic (because in photorealistic it looks like a cursed creature and nobody needs that). Credits aren't consumed for results you don't keep." },
];

const CATEGORIES = [...new Set(FAQ_ITEMS.map((item) => item.category))];

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
    <div className="d-accordion-item" onClick={onToggle} style={{ cursor: 'pointer' }}>
      <div className="d-accordion-header">
        <h3 className="d-heading" style={{ fontSize: 15, marginBottom: 0, flex: 1 }}>
          {item.question}
        </h3>
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
      <div className={`d-accordion-body ${isOpen ? 'd-accordion-body-open' : ''}`}>
        <div className="d-accordion-content d-body-sm">
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
      <div className="d-section" style={{ background: '#FFF8F0' }}>
      <div className="d-container-md">
        {/* Header */}
        <div className="d-center d-mb-xl">
          <p className="d-eyebrow d-eyebrow-purple">FAQ</p>
          <h1 className="d-heading d-heading-xl d-mb-sm">
            The Answers To <span style={{ color: "#E63946" }}>None</span> of Your Questions.
          </h1>
          <p className="d-body" style={{ maxWidth: 520 }}>
            You probably have real questions. These are the ones
            we felt like answering instead.
          </p>
        </div>

        <div className="d-divider-gradient d-mb-xl" />

        {/* Category filter */}
        <div className="d-flex d-mb-xl" style={{ flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          <button
            onClick={() => {
              setActiveCategory(null);
              setOpenIndex(null);
            }}
            className={`d-select-pill ${activeCategory === null ? 'd-select-pill-active' : ''}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(isActive ? null : cat);
                  setOpenIndex(null);
                }}
                className={`d-select-pill ${isActive ? 'd-select-pill-active' : ''}`}
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

        <div className="d-divider-gradient" style={{ margin: '48px 0' }} />

        {/* CTA */}
        <div className="craft-card d-center" style={{ padding: '48px 24px' }}>
          <h2 className="d-heading d-heading-md d-mb-sm">
            Still confused? <span style={{ color: "#E63946" }}>Perfect.</span>
          </h2>
          <p className="d-body d-mb-lg">
            Honestly the best way to understand Doodie is to just
            upload a drawing and watch what happens to it.
          </p>
          <Link href="/create" className="d-btn-primary">
            MAKE A DOODIE
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
