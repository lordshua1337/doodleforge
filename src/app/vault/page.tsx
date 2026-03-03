import Link from "next/link";

const VAULT_COLORS = ["#FF6B6B", "#60A5FA", "#A78BFA", "#34D399", "#FBBF24", "#F472B6", "#FB923C"];
const VAULT_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const VAULT_ITEMS = [
  { name: "Monday blob", date: "March 1, 2025", kid: "Emma, age 5" },
  { name: "Tuesday scribble", date: "March 2, 2025", kid: "Emma, age 5" },
  { name: "Wednesday... cat?", date: "March 3, 2025", kid: "Emma, age 5" },
  { name: "Thursday masterpiece", date: "March 4, 2025", kid: "Liam, age 4" },
  { name: "Friday abstract", date: "March 5, 2025", kid: "Liam, age 4" },
  { name: "Saturday surprise", date: "March 6, 2025", kid: "Emma, age 5" },
  { name: "Sunday special", date: "March 7, 2025", kid: "Liam, age 4" },
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function VaultPage() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="d-hero" style={{ paddingBottom: 60 }}>
        <div className="d-blob" style={{ top: "10%", left: "10%", width: 400, height: 400, background: "rgba(167,139,250,0.07)" }} />
        <div className="d-blob" style={{ bottom: "10%", right: "10%", width: 350, height: 350, background: "rgba(96,165,250,0.07)" }} />

        {/* Drawing decoration - top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "top right",
            opacity: 0.05,
            pointerEvents: "none",
            maskImage: "linear-gradient(135deg, transparent 15%, black 45%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 15%, black 45%, transparent 85%)",
          }}
        />

        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-lavender">The Vault</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            Stop throwing away memories.<br />
            <span style={{ color: "#6B7280" }}>You monster.</span>
          </h1>
          <p className="d-body-lg" style={{ maxWidth: 560, margin: "0 auto 16px" }}>
            Every parent has a drawer. The drawer is full. The guilt is real.
            You know you&apos;ve thrown away drawings when they weren&apos;t looking.
          </p>
          <p className="d-body-sm" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            The Vault stores every single drawing your kid makes -- digitally, forever, organized by kid and date.
            Scan it in 2 seconds. Close the drawer. Never feel bad about the recycling bin again.
          </p>
          <Link href="/create" className="d-btn-primary glow-cta">Make A Doodie &rarr;</Link>
        </div>
      </section>

      {/* Accent divider */}
      <div className="d-divider-gradient" />

      {/* Features + Mock */}
      <div className="d-section d-section-surface" style={{ position: "relative" }}>
        {/* Drawing accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 250,
            height: 300,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom left",
            opacity: 0.04,
            pointerEvents: "none",
            maskImage: "linear-gradient(45deg, transparent 10%, black 40%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(45deg, transparent 10%, black 40%, transparent 90%)",
          }}
        />
        <div className="d-container" style={{ position: "relative" }}>
          <div className="d-grid d-grid-2" style={{ alignItems: "center" }}>
            {/* Features */}
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
                <li className="d-check-item"><Check /> Unlimited scans. Free forever. No excuse.</li>
                <li className="d-check-item"><Check /> Organized by kid, date, and &ldquo;what were they thinking&rdquo;</li>
                <li className="d-check-item"><Check /> One-tap transform any stored drawing later</li>
                <li className="d-check-item"><Check /> Share vault with grandparents who &ldquo;want to see everything&rdquo;</li>
                <li className="d-check-item"><Check /> Growth timeline -- see how their art evolves</li>
                <li className="d-check-item"><Check /> One-tap download everything as a ZIP</li>
              </ul>
              <Link href="/create" className="d-btn-primary glow-cta">Start Hoarding Digitally &rarr;</Link>
            </div>

            {/* Vault Mock UI -- neumorphic */}
            <div className="neu-card" style={{ padding: 32 }}>
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>This Week&apos;s Drawings</p>
                <p style={{ fontSize: 12, color: "#9CA3AF" }}>7 scanned, 0 in the trash. Progress.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {VAULT_ITEMS.map((item, i) => (
                  <div key={item.name} className="neu-card-inset" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, background: VAULT_COLORS[i % VAULT_COLORS.length] }}>
                      {VAULT_DAYS[i]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: "#9CA3AF" }}>{item.date} -- {item.kid}</p>
                    </div>
                    <span className="d-pill d-pill-green">Saved</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Tiers -- neumorphic */}
      <div className="d-section" style={{ position: "relative" }}>
        {/* Drawing accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            width: 300,
            height: 350,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            opacity: 0.04,
            pointerEvents: "none",
            maskImage: "linear-gradient(270deg, transparent 5%, black 30%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(270deg, transparent 5%, black 30%, transparent 95%)",
          }}
        />
        <div className="d-container-md" style={{ position: "relative" }}>
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-sky">Storage tiers</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Keep everything. Forget nothing.</h2>
          </div>
          <div className="d-grid d-grid-3">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["50 drawings stored", "Organized by kid and date", "One-tap transform", "Basic sharing"],
                color: "#60A5FA",
                bg: "rgba(96,165,250,0.04)",
              },
              {
                name: "Pro",
                price: "$4.99",
                period: "/month",
                features: ["Unlimited storage", "Growth timeline view", "Family sharing (5 members)", "ZIP download export", "Priority support"],
                color: "#A78BFA",
                bg: "rgba(167,139,250,0.04)",
                popular: true,
              },
              {
                name: "Storage Pack",
                price: "$2.99",
                period: "one-time",
                features: ["100 additional drawings", "Stack with free tier", "Never expires", "One-time purchase"],
                color: "#34D399",
                bg: "rgba(52,211,153,0.04)",
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
                      background: `linear-gradient(90deg, ${tier.color}, #F472B6)`,
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
                      background: tier.popular ? `linear-gradient(135deg, ${tier.color}, #F472B6)` : "#fff",
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
        {/* Drawing accent behind CTA */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 300,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.04,
            borderRadius: 24,
            pointerEvents: "none",
          }}
        />
        <div className="d-container-sm d-center" style={{ position: "relative" }}>
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>
            Your kid made 200 drawings last year.<br />
            <span style={{ color: "#A78BFA" }}>How many do you still have?</span>
          </h2>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            Start scanning today. The Vault catches what the recycling bin missed.
          </p>
          <Link href="/create" className="d-btn-primary glow-cta">Make A Doodie &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
