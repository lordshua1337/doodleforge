import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3 text-lg font-bold tracking-tight">
              <span className="text-accent">D</span>oodleForge
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Your kid drew something. It&apos;s terrible.
              <br />
              We&apos;ll fix it.
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
              Follow the chaos
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
            &copy; {new Date().getFullYear()} DoodleForge. All rights reserved. Your kid&apos;s art isn&apos;t.
          </p>
          <p className="text-xs text-text-muted">
            Made with questionable taste and excellent AI.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-sm text-text-secondary transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
