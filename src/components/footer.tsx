import Link from "next/link";

export function Footer() {
  return (
    <footer className="d-footer-elevated relative z-10" style={{ paddingBottom: 80 }}>
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
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 36,
              fontWeight: 700,
              color: "#2B2D42",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            DOODIE
          </span>
          <p style={{ fontSize: 15, color: "#6C757D", maxWidth: 380, lineHeight: 1.6, marginBottom: 28 }}>
            Your kid&apos;s art is bad. We fix that. You hang it up. Grandma cries. Everyone wins.
          </p>
          <Link
            href="/create"
            className="d-btn-primary"
          >
            MAKE A DOODIE
          </Link>
        </div>

        {/* Link columns in craft card */}
        <div
          style={{
            background: "#FFF8F0",
            border: "3px solid #2B2D42",
            borderRadius: 8,
            padding: "40px 48px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
            }}
            className="footer-grid"
          >
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#E63946", marginBottom: 20 }}>
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
              <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#457B9D", marginBottom: 20 }}>
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
              <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#7B2D8E", marginBottom: 20 }}>
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
              <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#06D6A0", marginBottom: 20 }}>
                Follow the Chaos
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <SocialIcon href="#" label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </SocialIcon>
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
          <p style={{ fontSize: 12, color: "#ADB5BD" }}>
            &copy; {new Date().getFullYear()} Doodie. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "#ADB5BD", fontStyle: "italic", fontFamily: "var(--font-accent)" }}>
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

function SocialIcon({ href, label, children }: { readonly href: string; readonly label: string; readonly children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="d-social-icon"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
