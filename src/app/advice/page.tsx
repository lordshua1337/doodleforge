"use client";

import { ParentingAdvice } from "@/components/parenting-advice";
import Link from "next/link";

export default function AdvicePage() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="d-hero" style={{ paddingBottom: 40 }}>
        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-red">Questionable parenting advice</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            We shouldn&apos;t be giving advice.<br />
            <span style={{ color: "#6C757D" }}>But here we are.</span>
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

      <div className="d-divider-gradient" />

      {/* Stats bar */}
      <div className="d-container-md" style={{ paddingTop: 40, paddingBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 48,
            padding: "24px 32px",
            flexWrap: "wrap",
            border: "3px solid #2B2D42",
            borderRadius: 8,
            background: "#FFF8F0",
          }}
        >
          {[
            { value: "9", label: "Scenarios", color: "#E63946" },
            { value: "11", label: "Ages Covered", color: "#7B2D8E" },
            { value: "99", label: "Advice Entries", color: "#06D6A0" },
            { value: "0", label: "Licensed Professionals", color: "#FFD166" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: stat.color, fontFamily: "var(--font-display)" }}>{stat.value}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#ADB5BD", fontFamily: "var(--font-accent)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advice Card Feed */}
      <div className="d-container-md" style={{ paddingBottom: 64 }}>
        <ParentingAdvice />
      </div>

      {/* CTA */}
      <div className="d-section" style={{ background: "#D4E8F0", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-sm d-center">
          <h2 className="d-heading d-heading-md" style={{ marginBottom: 24 }}>
            Done reading bad advice?<br />
            <span style={{ color: "#E63946" }}>Time to fix some art.</span>
          </h2>
          <p className="d-body" style={{ maxWidth: 420, margin: "0 auto 32px" }}>
            Upload a drawing. Pick a style. Let AI turn your kid&apos;s
            questionable artwork into something frame-worthy.
          </p>
          <Link href="/create" className="d-btn-primary">MAKE A DOODIE</Link>
        </div>
      </div>
    </div>
  );
}
