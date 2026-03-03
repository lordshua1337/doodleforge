"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadVault, saveVault, removeFromVault, type VaultState, type VaultEntry } from "@/lib/vault-data";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
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
  const colors = ["#FF6B35", "#8B5CF6", "#10B981", "#F59E0B", "#818CF8"];
  const color = colors[entry.galleryIndex % colors.length];

  return (
    <div
      className="neu-card d-card-hover"
      style={{ padding: 0, overflow: "hidden" }}
    >
      {/* Color bar */}
      <div style={{ height: 4, background: color }} />

      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 4, lineHeight: 1.4 }}>
              {entry.title}
            </p>
            <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>
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
              borderRadius: 8,
              border: "none",
              background: "rgba(239,68,68,0.08)",
              color: "#EF4444",
              cursor: "pointer",
              fontSize: 14,
              flexShrink: 0,
              transition: "background 0.2s",
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
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 600,
            background: "rgba(16,185,129,0.1)",
            color: "#10B981",
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
        <div className="d-blob" style={{ top: "10%", left: "10%", width: 400, height: 400, background: "rgba(139,92,246,0.07)" }} />
        <div className="d-blob" style={{ bottom: "10%", right: "10%", width: 350, height: 350, background: "rgba(129,140,248,0.07)" }} />

        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-lavender">The Vault</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            {hasEntries ? (
              <>
                Your saved drawings.<br />
                <span style={{ color: "#8B5CF6" }}>{entries.length} and counting.</span>
              </>
            ) : (
              <>
                Stop throwing away memories.<br />
                <span style={{ color: "#6B7280" }}>You monster.</span>
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
          <Link href="/gallery" className="d-btn-primary glow-cta">
            {hasEntries ? "Browse Gallery" : "Start Saving"} &rarr;
          </Link>
        </div>
      </section>

      <div className="d-divider-gradient" />

      {/* Saved Items Timeline */}
      {hasEntries && (
        <div className="d-section d-section-surface" style={{ position: "relative" }}>
          <div className="d-container-md" style={{ position: "relative" }}>
            <div className="d-center d-mb-2xl">
              <p className="d-eyebrow d-eyebrow-sky">Your Collection</p>
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

      {/* Empty state with mock */}
      {!hasEntries && (
        <div className="d-section d-section-surface" style={{ position: "relative" }}>
          <div className="d-container" style={{ position: "relative" }}>
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
                <Link href="/gallery" className="d-btn-primary glow-cta">Browse the Gallery &rarr;</Link>
              </div>

              {/* Mock UI */}
              <div className="neu-card" style={{ padding: 32 }}>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>Your Vault</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF" }}>Save artwork to see it here</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Monday blob", "Tuesday scribble", "Wednesday... cat?"].map((name, i) => (
                    <div key={name} className="neu-card-inset" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, opacity: 0.5 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, background: ["#FF6B35", "#8B5CF6", "#10B981"][i] }}>
                        {["M", "T", "W"][i]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{name}</p>
                        <p style={{ fontSize: 12, color: "#9CA3AF" }}>Example -- Emma, age 5</p>
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
      <div className="d-section" style={{ position: "relative" }}>
        <div className="d-container-md" style={{ position: "relative" }}>
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-sky">Coming Soon</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Storage Tiers</h2>
          </div>
          <div className="d-grid d-grid-3">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["50 drawings stored", "Organized by kid and date", "One-tap transform", "Basic sharing"],
                color: "#818CF8",
                bg: "rgba(129,140,248,0.04)",
              },
              {
                name: "Pro",
                price: "$4.99",
                period: "/month",
                features: ["Unlimited storage", "Growth timeline view", "Family sharing (5 members)", "ZIP download export", "Priority support"],
                color: "#8B5CF6",
                bg: "rgba(139,92,246,0.04)",
                popular: true,
              },
              {
                name: "Storage Pack",
                price: "$2.99",
                period: "one-time",
                features: ["100 additional drawings", "Stack with free tier", "Never expires", "One-time purchase"],
                color: "#10B981",
                bg: "rgba(16,185,129,0.04)",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="neu-card d-card-hover"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: 0,
                  overflow: "hidden",
                  border: tier.popular ? `2px solid ${tier.color}` : undefined,
                  transform: tier.popular ? "scale(1.03)" : undefined,
                }}
              >
                {tier.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${tier.color}, #8B5CF6)`,
                      borderRadius: "20px 20px 0 0",
                    }}
                  />
                )}
                {tier.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      display: "inline-block",
                      padding: "4px 14px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      background: tier.color,
                      color: "#fff",
                    }}
                  >
                    Best Value
                  </span>
                )}
                <div style={{ padding: "32px 32px 24px", background: tier.bg }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>{tier.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 40, fontWeight: 800, color: "#1A1A2E" }}>{tier.price}</span>
                    <span style={{ fontSize: 14, color: "#9CA3AF" }}>{tier.period}</span>
                  </div>
                </div>
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
                  </div>
                </div>
                <div style={{ padding: "16px 32px 32px" }}>
                  <Link
                    href="/create"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      padding: "14px 0",
                      borderRadius: 14,
                      fontSize: 15,
                      fontWeight: 700,
                      textDecoration: "none",
                      border: tier.popular ? "none" : "2px solid #E5E7EB",
                      background: tier.popular ? `linear-gradient(135deg, ${tier.color}, #8B5CF6)` : "#fff",
                      color: tier.popular ? "#fff" : "#1A1A2E",
                      boxShadow: tier.popular ? `0 4px 16px ${tier.color}33` : "none",
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="d-section d-section-surface" style={{ position: "relative" }}>
        <div className="d-container-sm d-center" style={{ position: "relative" }}>
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>
            Your kid made 200 drawings last year.<br />
            <span style={{ color: "#8B5CF6" }}>How many do you still have?</span>
          </h2>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            Start saving today. The Vault catches what the recycling bin missed.
          </p>
          <Link href="/gallery" className="d-btn-primary glow-cta">Browse Gallery &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
