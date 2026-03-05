import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="d-footer-elevated d-footer-mobile-pad relative z-10">
      <div className="footer-container">
        {/* Top: logo + tagline + CTA */}
        <div className="footer-top">
          <Image
            src="/doodie-logo.png"
            alt="Doodie"
            width={140}
            height={46}
            className="footer-logo-img"
          />
          <p className="footer-tagline">
            Your kid&apos;s art is bad. We fix that. You hang it up. Grandma cries. Everyone wins.
          </p>
          <Link href="/create" className="d-btn-primary">
            MAKE A DOODIE
          </Link>
        </div>

        {/* Link columns in craft card */}
        <div className="footer-card">
          <div className="footer-grid-inner footer-grid">
            <div>
              <p className="footer-section-head d-eyebrow-red">Product</p>
              <div className="footer-link-list">
                <FooterLink href="/create">Create</FooterLink>
                <FooterLink href="/gallery">Gallery</FooterLink>
                <FooterLink href="/vault">Vault</FooterLink>
                <FooterLink href="/advice">Advice</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
              </div>
            </div>

            <div>
              <p className="footer-section-head d-eyebrow-blue">Features</p>
              <div className="footer-link-list">
                <FooterLink href="/create">AI Transform</FooterLink>
                <FooterLink href="/vault">Digital Vault</FooterLink>
                <FooterLink href="/pricing">Physical Prints</FooterLink>
                <FooterLink href="/advice">Parenting Tips</FooterLink>
              </div>
            </div>

            <div>
              <p className="footer-section-head d-eyebrow-purple">Company</p>
              <div className="footer-link-list">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
                <FooterLink href="#">Terms</FooterLink>
                <FooterLink href="#">Privacy</FooterLink>
              </div>
            </div>

            <div>
              <p className="footer-section-head d-eyebrow-green">Follow the Chaos</p>
              <div className="footer-social-list">
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
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Doodie. All rights reserved.
          </p>
          <p className="footer-slogan">
            Turning parental guilt into wall art since 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { readonly href: string; readonly children: React.ReactNode }) {
  return (
    <Link href={href} className="footer-link">
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
