"use client";

import Link from "next/link";
import { useState } from "react";

const TIERS = [
  {
    name: "Single",
    price: "$4.99",
    period: "one-time",
    desc: "Test the waters. One drawing, one transformation.",
    features: [
      "1 AI transformation",
      "3 art style options",
      "High-resolution download (4K)",
      "Print-ready file",
      "No watermark",
    ],
    notIncluded: ["Priority processing", "Commercial license", "API access"],
    cta: "Buy Single",
    priceId: "single",
    mode: "payment",
    popular: false,
    color: "#64B5F6",
  },
  {
    name: "5-Pack",
    price: "$12.99",
    period: "one-time",
    desc: "For parents with multiple masterpieces to save.",
    features: [
      "5 AI transformations",
      "All 8 art styles",
      "High-resolution downloads (4K)",
      "Print-ready files",
      "No watermark",
      "Priority processing",
    ],
    notIncluded: ["Commercial license", "API access"],
    cta: "Buy 5-Pack",
    priceId: "pack",
    mode: "payment",
    popular: true,
    color: "#FF6B6B",
  },
  {
    name: "Unlimited",
    price: "$29.99",
    period: "/month",
    desc: "Your kid draws a lot. We get it.",
    features: [
      "Unlimited transformations",
      "All 8 art styles",
      "High-resolution downloads (4K)",
      "Print-ready files",
      "No watermark",
      "Priority processing",
      "Commercial license",
      "API access",
      "Early access to new styles",
    ],
    notIncluded: [],
    cta: "Subscribe",
    priceId: "unlimited",
    mode: "subscription",
    popular: false,
    color: "#B388FF",
  },
];

const FAQ = [
  {
    q: "How does it actually work?",
    a: "You upload a photo of your kid's drawing. Our AI analyzes the shapes, colors, and subject matter, then generates a professional artwork in your chosen style that interprets the same scene. It's not a filter -- it's a complete re-creation.",
  },
  {
    q: "What if my kid's drawing is really, really bad?",
    a: "That's kind of the whole point. The worse the original, the more dramatic the transformation. Some of our best results come from drawings that are essentially just scribbles. The AI is surprisingly good at finding meaning in chaos.",
  },
  {
    q: "Can I order physical prints?",
    a: "Yes! After transformation, you can order canvas prints, framed prints, or posters. They're museum-quality, fulfilled through our Etsy integration, and ship in 3-5 business days.",
  },
  {
    q: "Do you store my images?",
    a: "We process your image through the AI and return the result. We don't permanently store your originals or generated images on our servers. Download your results when they're ready.",
  },
  {
    q: "Can I use the generated art commercially?",
    a: "The Unlimited plan includes a commercial license. Single and 5-Pack users get personal use only.",
  },
  {
    q: "What art styles are available?",
    a: "Oil Painting, Watercolor, Anime, Cyberpunk, Pop Art, Pixel Art, Studio Ghibli, and Photorealistic. We're adding more regularly.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative z-10 min-h-screen pt-14">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sunny">
            Pricing
          </p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
            Cheaper than <span className="text-coral">art school</span>.
          </h1>
          <p className="mx-auto max-w-lg text-text-secondary">
            And infinitely more effective for your specific situation.
            Your kid&apos;s imagination, professionally rendered.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
              FAQ
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
              Questions you probably have.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <h2 className="mb-4 text-2xl font-extrabold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Still reading? Just <span className="text-coral">upload the drawing</span>.
          </h2>
          <p className="mb-6 text-text-secondary">
            It takes 30 seconds. Your kid will think they&apos;re an artist. You&apos;ll have art you actually want to frame.
          </p>
          <Link
            href="/create"
            className="inline-flex rounded-full bg-coral px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.03] shadow-sm shadow-coral/20"
          >
            Upload a Doodle &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ tier }: { tier: (typeof TIERS)[number] }) {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: tier.priceId,
          mode: tier.mode,
        }),
      });

      const data = await res.json();

      if (data.demo) {
        alert(
          "Stripe is not configured yet. Add your Stripe keys to .env.local to enable payments."
        );
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 p-8 transition-all ${
        tier.popular
          ? "scale-[1.02] shadow-lg"
          : "bg-surface hover:shadow-md"
      }`}
      style={{
        borderColor: tier.popular ? tier.color : undefined,
        backgroundColor: tier.popular ? `${tier.color}08` : undefined,
      }}
    >
      {tier.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: tier.color }}
        >
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-1 text-xl font-bold">{tier.name}</h3>
        <p className="text-sm text-text-muted">{tier.desc}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
        <span className="text-sm text-text-muted">{tier.period !== "one-time" ? tier.period : ""}</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
        {tier.notIncluded.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-text-muted line-through">
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0 text-text-muted"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        className={`w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
          tier.popular
            ? "text-white hover:opacity-90 shadow-sm"
            : "border-2 border-border text-foreground hover:bg-surface-2"
        }`}
        style={tier.popular ? { backgroundColor: tier.color } : undefined}
      >
        {tier.cta}
      </button>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border-2 border-border bg-surface overflow-hidden transition-all hover:border-border-hover">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <span className="pr-4 text-sm font-semibold">{question}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`flex-shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4">
          <p className="text-sm text-text-secondary leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
