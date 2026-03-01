"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold shadow-sm"
            style={{ background: "linear-gradient(135deg, #FF6B6B, #A78BFA, #60A5FA)", color: "#fff" }}
          >
            D
          </span>
          <span>Doodie</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/create">Create</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/create"
            className="nav-cta-btn"
          >
            Upload a Doodle
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-8 py-5 space-y-4">
          <Link href="/create" className="block text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Create</Link>
          <Link href="/gallery" className="block text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Gallery</Link>
          <Link href="/pricing" className="block text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link
            href="/create"
            className="nav-cta-btn mt-3 block text-center"
            onClick={() => setMobileOpen(false)}
          >
            Upload a Doodle
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-foreground hover:bg-surface-2"
    >
      {children}
    </Link>
  );
}
