"use client";

import { ParentingAdvice } from "@/components/parenting-advice";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";

export default function AdvicePage() {
  return (
    <PageTransition>
      <div className="relative z-10 min-h-screen">
        {/* Drawing decoration - top right */}
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
            maskImage: "linear-gradient(135deg, transparent 15%, black 50%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 15%, black 50%, transparent 90%)",
          }}
        />

        {/* Hero */}
        <section className="d-hero" style={{ paddingBottom: 40 }}>
          <div className="d-blob" style={{ top: "10%", left: "20%", width: 400, height: 400, background: "rgba(129,140,248,0.07)" }} />
          <div className="d-blob" style={{ bottom: "10%", right: "15%", width: 350, height: 350, background: "rgba(139,92,246,0.06)" }} />

          <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <p className="d-eyebrow d-eyebrow-coral">Questionable parenting advice</p>
            <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
              We shouldn&apos;t be giving advice.<br />
              <span style={{ color: "#6B7280" }}>But here we are.</span>
            </h1>
            <p className="d-body-lg" style={{ maxWidth: 520, margin: "0 auto 16px" }}>
              Select your child&apos;s age. Scroll through 9 scenarios.
              Read advice from an art app with no qualifications.
            </p>
            <p className="d-body-sm" style={{ maxWidth: 400, margin: "0 auto" }}>
              Each card is personalized if you&apos;ve added your kid&apos;s name.
              Copy and send the good ones to your partner. Blame us for the bad ones.
            </p>
          </div>
        </section>

        {/* Accent divider */}
        <div className="d-divider-gradient" />

        {/* Stats bar */}
        <div className="d-container-md" style={{ paddingTop: 40, paddingBottom: 16 }}>
          <div className="neu-card" style={{ display: "flex", justifyContent: "center", gap: 48, padding: "24px 32px", flexWrap: "wrap" }}>
            {[
              { value: "9", label: "Scenarios", color: "#FF6B35" },
              { value: "11", label: "Ages Covered", color: "#8B5CF6" },
              { value: "99", label: "Advice Entries", color: "#10B981" },
              { value: "0", label: "Licensed Professionals", color: "#F59E0B" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: stat.color, fontFamily: "var(--font-mono, monospace)" }}>{stat.value}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advice Card Feed */}
        <div className="d-container-md" style={{ paddingBottom: 64 }}>
          <ParentingAdvice />
        </div>

        {/* Drawing decoration - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 0,
            width: 300,
            height: 300,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom left",
            opacity: 0.04,
            pointerEvents: "none",
            maskImage: "linear-gradient(315deg, transparent 10%, black 40%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(315deg, transparent 10%, black 40%, transparent 85%)",
          }}
        />

        {/* CTA */}
        <div className="d-section d-section-surface" style={{ position: "relative" }}>
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
          <div className="d-container-sm d-center" style={{ position: "relative" }}>
            <h2 className="d-heading d-heading-md" style={{ marginBottom: 24 }}>
              Done reading bad advice?<br />
              <span style={{ color: "#FF6B35" }}>Time to fix some art.</span>
            </h2>
            <p className="d-body" style={{ maxWidth: 420, margin: "0 auto 32px" }}>
              Upload a drawing. Pick a style. Let AI turn your kid&apos;s
              questionable artwork into something frame-worthy.
            </p>
            <Link href="/create" className="d-btn-primary glow-cta">Make A Doodie &rarr;</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
