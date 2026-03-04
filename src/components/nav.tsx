"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/create", label: "Create" },
  { href: "/gallery", label: "Gallery" },
  { href: "/vault", label: "Vault" },
  { href: "/guess", label: "Guess" },
  { href: "/advice", label: "Advice" },
  { href: "/pricing", label: "Pricing" },
];

const MAGNET_COLORS = ["#E63946", "#457B9D", "#FFD166", "#06D6A0", "#7B2D8E", "#E63946"];

const MOBILE_TABS = [
  {
    href: "/",
    label: "Fridge",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/guess",
    label: "Guess",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    href: "/create",
    label: "Create",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    href: "/vault",
    label: "Vault",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    href: "/advice",
    label: "Advice",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop top bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "#FFF8F0",
          borderBottom: "3px solid #2B2D42",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
            padding: "0 32px",
          }}
        >
          {/* Logo -- hand-written style */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 0,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-gaegu), cursive",
                fontSize: 32,
                fontWeight: 700,
                color: "#2B2D42",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              DOODIE
            </span>
          </Link>

          {/* Desktop magnet links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 6 }}>
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href;
              const color = MAGNET_COLORS[i % MAGNET_COLORS.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "var(--font-gaegu), cursive",
                    color: active ? "#fff" : "#2B2D42",
                    background: active ? color : "transparent",
                    border: active ? "2px solid #2B2D42" : "2px solid transparent",
                    boxShadow: active ? "2px 2px 0px #2B2D42" : "none",
                    textDecoration: "none",
                    transition: "all 0.15s",
                    transform: active ? `rotate(${(i % 3 - 1) * 1.5}deg)` : "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA button */}
          <Link
            href="/create"
            className="nav-cta-btn"
          >
            MAKE A DOODIE
          </Link>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="mobile-tab-bar md:hidden" aria-label="Mobile navigation">
        {MOBILE_TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`mobile-tab ${active ? "mobile-tab-active" : ""}`}
            >
              <span className="mobile-tab-icon">{tab.icon}</span>
              <span className="mobile-tab-label">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
