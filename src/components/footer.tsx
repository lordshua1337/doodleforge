import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-extrabold"
                style={{ background: "linear-gradient(135deg, #FF6B6B, #A78BFA, #60A5FA)", color: "#fff" }}
              >
                D
              </span>
              <span className="text-base font-bold text-foreground">Doodie</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Fridge art. Gallery upgrade.
              <br />
              Turn scribbles into heirlooms.
            </p>
          </div>

          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Product
            </div>
            <div className="space-y-3">
              <FooterLink href="/create">Create</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Company
            </div>
            <div className="space-y-3">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Follow Us
            </div>
            <div className="space-y-3">
              <FooterLink href="#">Instagram</FooterLink>
              <FooterLink href="#">TikTok</FooterLink>
              <FooterLink href="#">X (Twitter)</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-10 md:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Doodie. All rights reserved.
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
