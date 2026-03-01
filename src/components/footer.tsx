import Link from "next/link";

const LOGO_COLORS = [
  "#FF6B6B", "#FFD54F", "#69F0AE", "#64B5F6", "#B388FF",
  "#FFAB91", "#FF6B6B", "#F48FB1", "#64B5F6", "#69F0AE", "#FFD54F",
];

const LOGO_TEXT = "DoodleForge";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3 text-lg tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
              {LOGO_TEXT.split("").map((letter, i) => (
                <span key={i} className="inline-block font-bold" style={{ color: LOGO_COLORS[i] }}>
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Bring your kid&apos;s imagination to life.
              <br />
              One doodle at a time.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Product
            </div>
            <div className="space-y-2.5">
              <FooterLink href="/create">Create</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Company
            </div>
            <div className="space-y-2.5">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Follow the doodles
            </div>
            <div className="space-y-2.5">
              <FooterLink href="#">Instagram</FooterLink>
              <FooterLink href="#">TikTok</FooterLink>
              <FooterLink href="#">X (Twitter)</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} DoodleForge. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Made with crayons, imagination, and excellent AI.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-sm text-text-secondary transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
