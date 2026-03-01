import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-extrabold text-white">
                D
              </span>
              <span className="text-base font-bold text-foreground">DoodleForge</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Fridge art. Gallery upgrade.
              <br />
              Turn scribbles into heirlooms.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Product
            </div>
            <div className="space-y-3">
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
            <div className="space-y-3">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Follow Us
            </div>
            <div className="space-y-3">
              <FooterLink href="#">Instagram</FooterLink>
              <FooterLink href="#">TikTok</FooterLink>
              <FooterLink href="#">X (Twitter)</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} DoodleForge. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Where kid art gets the respect it deserves.
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
