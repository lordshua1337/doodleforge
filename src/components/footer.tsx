import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: "#FAFAFA",
        paddingBottom: 80,
      }}
    >
      {/* Gradient divider */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 5%, rgba(167,139,250,0.25) 30%, rgba(255,107,107,0.25) 50%, rgba(96,165,250,0.25) 70%, transparent 95%)",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 32px 0" }}>
        {/* Top: logo + tagline + CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span
              style={{
                display: "flex",
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                background: "linear-gradient(135deg, #FF6B6B, #A78BFA, #60A5FA)",
                color: "#fff",
                fontSize: 18,
                fontWeight: 800,
                boxShadow: "0 4px 16px rgba(255,107,107,0.2)",
              }}
            >
              D
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E" }}>Doodie</span>
          </div>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 380, lineHeight: 1.6, marginBottom: 28 }}>
            Your kid&apos;s art is bad. We fix that. You hang it up. Grandma cries. Everyone wins.
          </p>
          <Link
            href="/create"
            className="glow-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "12px 32px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF6B6B, #F472B6)",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(255,107,107,0.25)",
            }}
          >
            Make A Doodie &rarr;
          </Link>
        </div>

        {/* Link columns in neumorphic card */}
        <div className="neu-card" style={{ padding: "40px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
            }}
            className="footer-grid"
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#FF6B6B", marginBottom: 20 }}>
                Product
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="/create">Create</FooterLink>
                <FooterLink href="/gallery">Gallery</FooterLink>
                <FooterLink href="/vault">Vault</FooterLink>
                <FooterLink href="/advice">Advice</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#A78BFA", marginBottom: 20 }}>
                Features
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="/create">AI Transform</FooterLink>
                <FooterLink href="/vault">Digital Vault</FooterLink>
                <FooterLink href="/pricing">Physical Prints</FooterLink>
                <FooterLink href="/advice">Parenting Tips</FooterLink>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#60A5FA", marginBottom: 20 }}>
                Company
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
                <FooterLink href="#">Terms</FooterLink>
                <FooterLink href="#">Privacy</FooterLink>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#34D399", marginBottom: 20 }}>
                Follow the Chaos
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="#">Instagram</FooterLink>
                <FooterLink href="#">TikTok</FooterLink>
                <FooterLink href="#">X (Twitter)</FooterLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 32,
            padding: "0 8px",
          }}
        >
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>
            &copy; {new Date().getFullYear()} Doodie. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}>
            Turning parental guilt into wall art since 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { readonly href: string; readonly children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="footer-link"
    >
      {children}
    </Link>
  );
}
