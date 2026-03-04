"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadVault, saveVault, removeFromVault, type VaultState, type VaultEntry } from "@/lib/vault-data";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06D6A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function VaultCard({
  entry,
  onRemove,
}: {
  entry: VaultEntry;
  onRemove: (id: string) => void;
}) {
  const colors = ["#E63946", "#7B2D8E", "#06D6A0", "#FFD166", "#457B9D"];
  const color = colors[entry.galleryIndex % colors.length];

  return (
    <div
      style={{
        border: "3px solid #2B2D42",
        borderRadius: 8,
        background: "#FFF8F0",
        overflow: "hidden",
        transition: "transform 0.2s",
      }}
    >
      {/* Color bar */}
      <div style={{ height: 6, background: color }} />

      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#2B2D42", marginBottom: 4, lineHeight: 1.4, fontFamily: "var(--font-display)" }}>
              {entry.title}
            </p>
            <p style={{ fontSize: 12, color: "#ADB5BD", marginBottom: 8, fontFamily: "var(--font-accent)" }}>
              {entry.artist} -- Saved {formatDate(entry.savedAt)}
            </p>
          </div>
          <button
            onClick={() => onRemove(entry.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "2px solid #E63946",
              background: "rgba(230,57,70,0.08)",
              color: "#E63946",
              cursor: "pointer",
              fontSize: 14,
              flexShrink: 0,
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
            aria-label="Remove from vault"
          >
            &#x2715;
          </button>
        </div>

        {/* Status pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "var(--font-accent)",
            background: "rgba(6,214,160,0.15)",
            color: "#06D6A0",
            border: "1px solid #06D6A0",
          }}
        >
          <Check /> Saved
        </span>
      </div>
    </div>
  );
}

export default function VaultPage() {
  const [vault, setVault] = useState<VaultState | null>(null);

  useEffect(() => {
    setVault(loadVault());
  }, []);

  function handleRemove(entryId: string) {
    if (!vault) return;
    const updated = removeFromVault(vault, entryId);
    saveVault(updated);
    setVault(updated);
  }

  const entries = vault?.entries ?? [];
  const hasEntries = entries.length > 0;

  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="d-hero" style={{ paddingBottom: 60 }}>
        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-purple">The Vault</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            {hasEntries ? (
              <>
                Your saved drawings.<br />
                <span style={{ color: "#7B2D8E" }}>{entries.length} and counting.</span>
              </>
            ) : (
              <>
                Stop throwing away memories.<br />
                <span style={{ color: "#6C757D" }}>You monster.</span>
              </>
            )}
          </h1>
          <p className="d-body-lg" style={{ maxWidth: 560, margin: "0 auto 16px" }}>
            {hasEntries
              ? "Everything you've saved from the gallery lives here. Organized, safe, and ready to transform."
              : "Every parent has a drawer. The drawer is full. The guilt is real. You know you've thrown away drawings when they weren't looking."}
          </p>
          {!hasEntries && (
            <p className="d-body-sm" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
              Head to the Gallery, open any artwork, and tap &ldquo;Save to Vault&rdquo; to start collecting.
            </p>
          )}
          <Link href="/gallery" className="d-btn-primary">
            {hasEntries ? "Browse Gallery" : "Start Saving"}
          </Link>
        </div>
      </section>

      <div className="d-divider-gradient" />

      {/* Saved Items */}
      {hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container-md">
            <div className="d-center d-mb-2xl">
              <p className="d-eyebrow d-eyebrow-blue">Your Collection</p>
              <h2 className="d-heading d-heading-md" style={{ marginBottom: 8 }}>
                {entries.length} {entries.length === 1 ? "drawing" : "drawings"} saved
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {[...entries].reverse().map((entry) => (
                <VaultCard key={entry.id} entry={entry} onRemove={handleRemove} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container">
            <div className="d-grid d-grid-2" style={{ alignItems: "center" }}>
              <div>
                <h2 className="d-heading d-heading-md" style={{ marginBottom: 24 }}>
                  Everything saved. Nothing lost.
                </h2>
                <p className="d-body" style={{ marginBottom: 24 }}>
                  Scan any drawing in 2 seconds. No account needed to start. The Vault organizes
                  everything by kid, date, and whatever description you want to add. It&apos;s like iCloud Photos
                  but for crayon art and parental guilt.
                </p>
                <ul className="d-check-list" style={{ marginBottom: 32 }}>
                  <li className="d-check-item"><Check /> Save artwork from the gallery</li>
                  <li className="d-check-item"><Check /> Organized by artist and date</li>
                  <li className="d-check-item"><Check /> One-tap transform any stored drawing later</li>
                  <li className="d-check-item"><Check /> Growth timeline -- see how their art evolves</li>
                </ul>
                <Link href="/gallery" className="d-btn-primary">Browse the Gallery</Link>
              </div>

              {/* Mock UI */}
              <div style={{ border: "3px solid #2B2D42", borderRadius: 8, padding: 32, background: "#FFFFFF", boxShadow: "4px 4px 0px #2B2D42" }}>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#2B2D42", marginBottom: 4, fontFamily: "var(--font-display)" }}>Your Vault</p>
                  <p style={{ fontSize: 12, color: "#ADB5BD" }}>Save artwork to see it here</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Monday blob", "Tuesday scribble", "Wednesday... cat?"].map((name, i) => (
                    <div key={name} className="d-vault-row" style={{ opacity: 0.5 }}>
                      <div className="d-vault-day" style={{ background: ["#E63946", "#7B2D8E", "#06D6A0"][i] }}>
                        {["M", "T", "W"][i]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)" }}>{name}</p>
                        <p style={{ fontSize: 12, color: "#ADB5BD" }}>Example -- Emma, age 5</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Storage Tiers */}
      <div className="d-section d-section-alt d-section-accented">
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-blue">Coming Soon</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Storage Tiers</h2>
          </div>
          <div className="d-grid d-grid-3">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["50 drawings stored", "Organized by kid and date", "One-tap transform", "Basic sharing"],
                color: "#457B9D",
              },
              {
                name: "Pro",
                price: "$4.99",
                period: "/month",
                features: ["Unlimited storage", "Growth timeline view", "Family sharing (5 members)", "ZIP download export", "Priority support"],
                color: "#E63946",
                popular: true,
              },
              {
                name: "Storage Pack",
                price: "$2.99",
                period: "one-time",
                features: ["100 additional drawings", "Stack with free tier", "Never expires", "One-time purchase"],
                color: "#06D6A0",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`d-pricing-card ${tier.popular ? "d-pricing-popular" : ""}`}
                style={{ overflow: "visible" }}
              >
                {tier.popular && (
                  <span className="d-popular-badge">Best Value</span>
                )}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#2B2D42", marginBottom: 8, fontFamily: "var(--font-display)" }}>{tier.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 40, fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)" }}>{tier.price}</span>
                    <span style={{ fontSize: 14, color: "#ADB5BD" }}>{tier.period}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: 14, color: "#2B2D42" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/create"
                  className={tier.popular ? "d-btn-primary d-btn-block" : "d-btn-secondary d-btn-block"}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="d-section" style={{ background: "#D4E8F0", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-sm d-center">
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>
            Your kid made 200 drawings last year.<br />
            <span style={{ color: "#7B2D8E" }}>How many do you still have?</span>
          </h2>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            Start saving today. The Vault catches what the recycling bin missed.
          </p>
          <Link href="/gallery" className="d-btn-primary">Browse Gallery</Link>
        </div>
      </div>
    </div>
  );
}
