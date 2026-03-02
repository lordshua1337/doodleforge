"use client";

import { ParentingAdvice } from "@/components/parenting-advice";
import Link from "next/link";

export default function AdvicePage() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 40 }}>
        <div className="d-blob" style={{ top: "10%", left: "20%", width: 400, height: 400, background: "rgba(96,165,250,0.07)" }} />
        <div className="d-blob" style={{ bottom: "10%", right: "15%", width: 350, height: 350, background: "rgba(244,114,182,0.06)" }} />

        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-sky">Terrible advice</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            We shouldn&apos;t be giving advice.<br />
            <span style={{ color: "#6B7280" }}>But here we are.</span>
          </h1>
          <p className="d-body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
            Select your child&apos;s age. Read the advice. Ignore it entirely.
            We are an art app, not licensed professionals.
          </p>
        </div>
      </section>

      {/* Parenting Advice Component */}
      <ParentingAdvice />

      {/* CTA */}
      <div className="d-section">
        <div className="d-container-sm d-center">
          <h2 className="d-heading d-heading-md" style={{ marginBottom: 24 }}>
            Done reading bad advice?<br />
            <span style={{ color: "#FF6B6B" }}>Time to fix some art.</span>
          </h2>
          <Link href="/create" className="d-btn-primary glow-cta">Make A Doodie &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
