"use client";

import Link from "next/link";
import { useState } from "react";

const TIERS = [
  {
    name: "The Dip",
    tagline: "Just testing the waters.",
    price: "$4.99",
    period: "",
    desc: "One drawing. One transformation. Just to see if we're legit. Spoiler: we are.",
    features: [
      "1 AI transformation",
      "4 art style options",
      "High-resolution download (4K)",
      "Print-ready file",
      "No watermark",
    ],
    notIncluded: ["Priority processing", "Commercial license", "API access"],
    cta: "Make A Doodie",
    priceId: "single",
    mode: "payment",
    popular: false,
    color: "#457B9D",
  },
  {
    name: "The Binge",
    tagline: "You will use all five in one sitting.",
    price: "$12.99",
    period: "",
    desc: "Five transformations for parents who can't stop. You know who you are. The fridge is already full.",
    features: [
      "5 AI transformations",
      "All 12 art styles",
      "High-resolution downloads (4K)",
      "Print-ready files",
      "No watermark",
      "Priority processing",
    ],
    notIncluded: ["Commercial license", "API access"],
    cta: "Yeah, This One",
    priceId: "pack",
    mode: "payment",
    popular: true,
    color: "#E63946",
  },
  {
    name: "The Addiction",
    tagline: "Your kid draws a lot. We get it.",
    price: "$29.99",
    period: "/mo",
    desc: "Unlimited everything. For the parent who has a problem and has accepted it. Welcome to the club.",
    features: [
      "Unlimited transformations",
      "All 12 art styles",
      "High-resolution downloads (4K)",
      "Print-ready files",
      "No watermark",
      "Priority processing",
      "Commercial license",
      "API access",
      "Early access to new styles",
    ],
    notIncluded: [],
    cta: "Make A Doodie",
    priceId: "unlimited",
    mode: "subscription",
    popular: false,
    color: "#7B2D8E",
  },
];

const FAQ = [
  {
    q: "How does it actually work?",
    a: "You upload a photo of your kid's drawing. Our AI analyzes the shapes, colors, and subject matter, then generates a professional artwork in your chosen style that preserves the same composition. It's not a filter -- it's a complete re-creation that keeps your kid's original vision intact. The stick figure stays a stick figure. It just looks like a stick figure painted by someone with a fine arts degree.",
  },
  {
    q: "What if my kid's drawing is really, really bad?",
    a: "That's literally the entire point of this product. The worse the original, the more dramatic the transformation. Some of our best results come from drawings that are essentially just crayon marks on a napkin. We've transformed a single brown dot into a stunning oil painting of a landscape. The AI is disturbingly good at finding meaning in complete chaos. Kind of like parenting.",
  },
  {
    q: "Can I order physical prints?",
    a: "Absolutely. After transformation, you can order museum-quality canvas prints, framed prints, or posters. They ship in 3-5 business days. They're the kind of thing guests will stare at and say 'wait, your kid drew that?' And you'll say yes, while conveniently leaving out the part where AI did 99% of the work.",
  },
  {
    q: "Do you store my images?",
    a: "We process your image and return the result. We don't permanently store originals on our servers. If you want to keep them forever (you do), that's what the Vault is for. Download your results when they're ready, or store them in the Vault so you never lose another masterpiece to a kitchen drawer purge.",
  },
  {
    q: "Can I use the generated art commercially?",
    a: "The Addiction plan (Unlimited) includes a full commercial license. Go wild. Print it on mugs, t-shirts, tote bags, whatever. Single and 5-Pack users get personal use only -- which covers framing, gifting to grandma, and using it as your phone wallpaper while pretending you're not crying.",
  },
  {
    q: "What art styles are available?",
    a: "Oil Painting, Watercolor, Anime, Cyberpunk, Pop Art, Pixel Art, Studio Ghibli, Photorealistic, Stained Glass, Cartoon, Pencil Sketch, and Fantasy Epic. Twelve styles, each tuned to preserve your kid's original composition while making it look like actual art. We're adding more regularly. If there's a style you want that we don't have yet, yell at us on Twitter.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative z-10 min-h-screen">
      <div className="d-hero mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="d-eyebrow d-eyebrow-yellow">Pricing</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 16 }}>
            Cheaper than <span className="text-rainbow">art school</span>.
          </h1>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto" }}>
            Also cheaper than therapy, framing supplies, and the lie you&apos;ve been living for the last 5 years.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-24 mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="d-heading d-heading-md" style={{ marginBottom: 8 }}>
              Side by side.
            </h2>
            <p className="d-body-sm">
              Because tables are easier than reading three cards and doing math in your head.
            </p>
          </div>
          <div style={{ overflow: "hidden", border: "3px solid #2B2D42", borderRadius: 8 }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "3px solid #2B2D42", background: "#F5E6D3" }}>
                    <th style={{ textAlign: "left", padding: "16px 20px", color: "#6C757D", fontWeight: 600, fontSize: 13 }}>Feature</th>
                    <th style={{ textAlign: "center", padding: "16px 12px", color: "#457B9D", fontWeight: 700, fontFamily: "var(--font-display)" }}>The Dip</th>
                    <th style={{ textAlign: "center", padding: "16px 12px", color: "#E63946", fontWeight: 700, fontFamily: "var(--font-display)" }}>The Binge</th>
                    <th style={{ textAlign: "center", padding: "16px 12px", color: "#7B2D8E", fontWeight: 700, fontFamily: "var(--font-display)" }}>The Addiction</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Transformations", dip: "1", binge: "5", addiction: "Unlimited" },
                    { feature: "Art Styles", dip: "4", binge: "All 12", addiction: "All 12" },
                    { feature: "4K Downloads", dip: "Yes", binge: "Yes", addiction: "Yes" },
                    { feature: "Print-Ready Files", dip: "Yes", binge: "Yes", addiction: "Yes" },
                    { feature: "Priority Processing", dip: "--", binge: "Yes", addiction: "Yes" },
                    { feature: "Commercial License", dip: "--", binge: "--", addiction: "Yes" },
                    { feature: "API Access", dip: "--", binge: "--", addiction: "Yes" },
                    { feature: "Early Access Styles", dip: "--", binge: "--", addiction: "Yes" },
                    { feature: "Price per Transform", dip: "$4.99", binge: "$2.60", addiction: "< $1" },
                  ].map((row, i) => (
                    <tr key={row.feature} style={{ borderBottom: i < 8 ? "1px solid #E5D5C3" : "none", background: i % 2 === 0 ? "#FFF8F0" : "#FFFFFF" }}>
                      <td style={{ padding: "12px 20px", color: "#2B2D42", fontWeight: 500 }}>{row.feature}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", color: row.dip === "--" ? "#E5D5C3" : "#2B2D42" }}>{row.dip}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", color: row.binge === "--" ? "#E5D5C3" : "#2B2D42", fontWeight: row.binge !== "--" && row.binge !== row.dip ? 600 : 400 }}>{row.binge}</td>
                      <td style={{ padding: "12px 12px", textAlign: "center", color: row.addiction === "--" ? "#E5D5C3" : "#2B2D42", fontWeight: row.addiction !== "--" ? 600 : 400 }}>{row.addiction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Money-back guarantee */}
        <div
          style={{
            padding: "40px 32px",
            border: "3px solid #06D6A0",
            borderRadius: 8,
            background: "#FFF8F0",
            boxShadow: "4px 4px 0px #06D6A0",
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto 64px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              background: "rgba(6,214,160,0.15)",
              border: "2px solid #2B2D42",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 12,
              fontFamily: "var(--font-display)",
              color: "#2B2D42",
            }}
          >
            Not impressed? Money back.
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6C757D", maxWidth: 480, margin: "0 auto" }}>
            If the AI turns your kid&apos;s masterpiece into something that looks worse than
            the original (unlikely, but we respect your standards), we&apos;ll refund you. No
            questions asked. Within 7 days. We&apos;re that confident.
          </p>
        </div>

        {/* Divider */}
        <div className="d-divider-gradient" style={{ marginBottom: 64 }} />

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="d-eyebrow d-eyebrow-purple">FAQ</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 12 }}>
              Questions you probably have.
            </h2>
            <p className="d-body">
              We anticipated your doubt. Here are answers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FAQ.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <h2 className="d-heading d-heading-md" style={{ marginBottom: 12 }}>
            Still reading? Just <span style={{ color: "#E63946" }}>make a doodie</span>.
          </h2>
          <p className="d-body" style={{ marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            It takes 30 seconds. Your kid will think they&apos;re Picasso. You&apos;ll have art you actually want to frame.
          </p>
          <Link href="/create" className="d-btn-primary">
            MAKE A DOODIE
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
      className={`d-pricing-card ${tier.popular ? "d-pricing-popular" : ""}`}
      style={{ overflow: "visible" }}
    >
      {/* Popular badge */}
      {tier.popular && (
        <span className="d-popular-badge">MOST POPULAR</span>
      )}

      {/* Card header */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#2B2D42", marginBottom: 4, fontFamily: "var(--font-display)" }}>
          {tier.name}
        </h3>
        <p style={{ fontSize: 13, color: "#ADB5BD", fontStyle: "italic", fontFamily: "var(--font-accent)", marginBottom: 20 }}>
          {tier.tagline}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", color: "#2B2D42", fontFamily: "var(--font-display)" }}>
            {tier.price}
          </span>
          {tier.period && (
            <span style={{ fontSize: 15, color: "#ADB5BD", fontWeight: 500 }}>
              {tier.period}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6C757D", marginBottom: 24 }}>{tier.desc}</p>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
        {tier.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 14, color: "#2B2D42" }}>{f}</span>
          </div>
        ))}
        {tier.notIncluded.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span style={{ fontSize: 14, color: "#ADB5BD", textDecoration: "line-through" }}>{f}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        className={tier.popular ? "d-btn-primary d-btn-block" : "d-btn-secondary d-btn-block"}
        style={{ fontFamily: "inherit" }}
      >
        {tier.cta}
      </button>
    </div>
  );
}

function FaqItem({ question, answer }: { readonly question: string; readonly answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "3px solid #2B2D42",
        borderRadius: 8,
        background: "#FFF8F0",
        overflow: "hidden",
        transition: "all 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <span style={{ paddingRight: 16, fontSize: 15, fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)" }}>
          {question}
        </span>
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
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.2s ease",
        }}
      >
        <div style={{ padding: "0 24px 24px", borderTop: "2px solid #E5D5C3" }}>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6C757D", paddingTop: 20 }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
