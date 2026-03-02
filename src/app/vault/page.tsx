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
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 60 }}>
        <div className="d-blob" style={{ top: "10%", left: "10%", width: 400, height: 400, background: "rgba(167,139,250,0.07)" }} />
        <div className="d-blob" style={{ bottom: "10%", right: "10%", width: 350, height: 350, background: "rgba(96,165,250,0.07)" }} />

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

      {/* Features + Mock */}
      <div className="d-section d-section-surface">
        <div className="d-container">
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

            {/* Vault Mock UI */}
            <div className="d-card d-card-sm">
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>This Week&apos;s Drawings</p>
                <p style={{ fontSize: 12, color: "#9CA3AF" }}>7 scanned, 0 in the trash. Progress.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {VAULT_ITEMS.map((item, i) => (
                  <div key={item.name} className="d-vault-row">
                    <div className="d-vault-day" style={{ background: VAULT_COLORS[i % VAULT_COLORS.length] }}>
                      {VAULT_DAYS[i]}
                    </div>
                    <div className="d-flex-1">
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

      {/* Storage Tiers */}
      <div className="d-section">
        <div className="d-container-md">
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
              },
              {
                name: "Pro",
                price: "$4.99",
                period: "/month",
                features: ["Unlimited storage", "Growth timeline view", "Family sharing (5 members)", "ZIP download export", "Priority support"],
                color: "#A78BFA",
                popular: true,
              },
              {
                name: "Storage Pack",
                price: "$2.99",
                period: "one-time",
                features: ["100 additional drawings", "Stack with free tier", "Never expires", "One-time purchase"],
                color: "#34D399",
              },
            ].map((tier) => (
              <div key={tier.name} className={`d-pricing-card ${"popular" in tier ? "d-pricing-popular" : ""}`}>
                {"popular" in tier && <div className="d-popular-badge">Best Value</div>}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>{tier.name}</h3>
                  <div>
                    <span style={{ fontSize: 36, fontWeight: 800, color: "#1A1A2E" }}>{tier.price}</span>
                    <span style={{ fontSize: 14, color: "#9CA3AF" }}>{tier.period}</span>
                  </div>
                </div>
                <ul className="d-check-list" style={{ flex: 1, marginBottom: 32 }}>
                  {tier.features.map((f) => (
                    <li key={f} className="d-check-item"><Check /> {f}</li>
                  ))}
                </ul>
                <Link href="/create" className={`d-btn-block ${"popular" in tier ? "d-btn-primary" : "d-btn-secondary"}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="d-section d-section-surface">
        <div className="d-container-sm d-center">
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
