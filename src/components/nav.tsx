"use client";

import Link from "next/link";
import { useState } from "react";

const LOGO_COLORS = [
  "#FF6B6B", // D - coral
  "#FFD54F", // o - sunny
  "#69F0AE", // o - mint
  "#64B5F6", // d - sky
  "#B388FF", // l - lavender
  "#FFAB91", // e - peach
  "#FF6B6B", // F - coral
  "#F48FB1", // o - bubblegum
  "#64B5F6", // r - sky
  "#69F0AE", // g - mint
  "#FFD54F", // e - sunny
];

const LOGO_TEXT = "DoodleForge";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-1.5 text-xl tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
          {LOGO_TEXT.split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block font-bold"
              style={{ color: LOGO_COLORS[i], marginRight: letter === "e" && i === 5 ? "2px" : "0" }}
            >
              {letter}
            </span>
          ))}
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
            className="rounded-full bg-coral px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:scale-[1.03] active:scale-[0.98] shadow-sm"
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
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          <Link href="/create" className="block text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Create</Link>
          <Link href="/gallery" className="block text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Gallery</Link>
          <Link href="/pricing" className="block text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link
            href="/create"
            className="mt-2 block rounded-full bg-coral px-4 py-2.5 text-center text-sm font-semibold text-white"
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
      className="rounded-md px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
