"use client";

import Link from "next/link";
import { useState } from "react";
import { PageTransition } from "@/components/page-transition";

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
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.04)",
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
    color: "#FF6B6B",
    bg: "rgba(255,107,107,0.03)",
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
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.04)",
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
            opacity: 0.06,
            pointerEvents: "none",
            maskImage: "linear-gradient(135deg, transparent 20%, black 50%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 20%, black 50%, transparent 90%)",
          }}
        />

        <div className="d-hero mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sunny">
              Pricing
            </p>
            <h1
              className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Cheaper than <span className="text-rainbow">art school</span>.
            </h1>
            <p className="mx-auto max-w-md text-text-secondary" style={{ fontSize: 16, lineHeight: 1.7 }}>
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
              <h2
                className="mb-3 text-2xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Side by side.
              </h2>
              <p className="text-text-secondary" style={{ fontSize: 14 }}>
                Because tables are easier than reading three cards and doing math in your head.
              </p>
            </div>
            <div className="neu-card" style={{ overflow: "hidden", padding: 0 }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                      <th style={{ textAlign: "left", padding: "16px 20px", color: "#6B7280", fontWeight: 500, fontSize: 13 }}>Feature</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", color: "#60A5FA", fontWeight: 700 }}>The Dip</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", color: "#FF6B6B", fontWeight: 700 }}>The Binge</th>
                      <th style={{ textAlign: "center", padding: "16px 12px", color: "#A78BFA", fontWeight: 700 }}>The Addiction</th>
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
                      <tr key={row.feature} style={{ borderBottom: i < 8 ? "1px solid rgba(229,231,235,0.5)" : "none" }}>
                        <td style={{ padding: "12px 20px", color: "#4B5563", fontWeight: 500 }}>{row.feature}</td>
                        <td style={{ padding: "12px 12px", textAlign: "center", color: row.dip === "--" ? "#D1D5DB" : "#4B5563" }}>{row.dip}</td>
                        <td style={{ padding: "12px 12px", textAlign: "center", color: row.binge === "--" ? "#D1D5DB" : "#4B5563", fontWeight: row.binge !== "--" && row.binge !== row.dip ? 600 : 400 }}>{row.binge}</td>
                        <td style={{ padding: "12px 12px", textAlign: "center", color: row.addiction === "--" ? "#D1D5DB" : "#4B5563", fontWeight: row.addiction !== "--" ? 600 : 400 }}>{row.addiction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div
            className="neu-card mb-24 mx-auto max-w-2xl text-center"
            style={{ padding: "40px 32px", border: "1px solid rgba(52,211,153,0.2)" }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(52,211,153,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: "var(--font-dm-serif)",
                color: "#1A1A2E",
              }}
            >
              Not impressed? Money back.
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280", maxWidth: 480, margin: "0 auto" }}>
              If the AI turns your kid&apos;s masterpiece into something that looks worse than
              the original (unlikely, but we respect your standards), we&apos;ll refund you. No
              questions asked. Within 7 days. We&apos;re that confident.
            </p>
          </div>

          {/* Accent divider */}
          <div className="d-divider-gradient" style={{ marginBottom: 64 }} />

          {/* FAQ */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lavender">
                FAQ
              </p>
              <h2
                className="mb-4 text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Questions you probably have.
              </h2>
              <p className="text-text-secondary">
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
          <div className="mt-24 text-center" style={{ position: "relative" }}>
            {/* Drawing accent behind CTA */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                height: 300,
                backgroundImage: "url(/drawings-1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.04,
                borderRadius: 24,
                pointerEvents: "none",
              }}
            />
            <h2
              className="mb-4 text-3xl font-extrabold"
              style={{ fontFamily: "var(--font-dm-serif)", position: "relative" }}
            >
              Still reading? Just <span className="text-coral">make a doodie</span>.
            </h2>
            <p className="mb-8 text-text-secondary" style={{ position: "relative" }}>
              It takes 30 seconds. Your kid will think they&apos;re Picasso. You&apos;ll have art you actually want to frame.
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
      className={`neu-card d-card-hover d-gradient-border ${tier.popular ? "d-gradient-border-visible" : ""}`}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        overflow: "visible",
        "--gb-from": tier.color,
        "--gb-to": tier.popular ? "#F472B6" : tier.color + "88",
        transform: tier.popular ? "scale(1.03)" : undefined,
      } as React.CSSProperties}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div
          style={{
            position: "absolute",
            top: -1,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${tier.color}, #F472B6)`,
            borderRadius: "20px 20px 0 0",
          }}
        />
      )}

      {/* Drawing accent on popular card */}
      {tier.popular && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 200,
            height: 200,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom right",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Card header with accent bg */}
      <div style={{ padding: "32px 32px 24px", background: tier.bg }}>
        {tier.popular && (
          <span
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: tier.color,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Most Popular
          </span>
        )}
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>
          {tier.name}
        </h3>
        <p style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic", marginBottom: 20 }}>
          {tier.tagline}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em", color: "#1A1A2E" }}>
            {tier.price}
          </span>
          {tier.period && (
            <span style={{ fontSize: 15, color: "#9CA3AF", fontWeight: 500 }}>
              {tier.period}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "20px 32px 0" }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6B7280" }}>{tier.desc}</p>
      </div>

      {/* Features */}
      <div style={{ padding: "20px 32px", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tier.features.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: 14, color: "#4B5563" }}>{f}</span>
            </div>
          ))}
          {tier.notIncluded.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span style={{ fontSize: 14, color: "#9CA3AF", textDecoration: "line-through" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "16px 32px 32px" }}>
        <button
          onClick={handleCheckout}
          className={tier.popular ? "glow-cta" : ""}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
            border: tier.popular ? "none" : "2px solid #E5E7EB",
            background: tier.popular ? `linear-gradient(135deg, ${tier.color}, #F472B6)` : "#fff",
            color: tier.popular ? "#fff" : "#1A1A2E",
            boxShadow: tier.popular ? `0 4px 16px ${tier.color}33` : "none",
            fontFamily: "inherit",
          }}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { readonly question: string; readonly answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="neu-card"
      style={{
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
          padding: "20px 28px",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <span style={{ paddingRight: 16, fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>
          {question}
        </span>
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
        <div style={{ padding: "0 28px 24px", borderTop: "1px solid rgba(229,231,235,0.5)" }}>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6B7280", paddingTop: 20 }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
