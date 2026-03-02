"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/create", label: "Create" },
  { href: "/gallery", label: "Gallery" },
  { href: "/vault", label: "Vault" },
  { href: "/advice", label: "Advice" },
  { href: "/pricing", label: "Pricing" },
];

const MOBILE_TABS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/create",
    label: "Create",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    href: "/gallery",
    label: "Gallery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    href: "/vault",
    label: "Vault",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    href: "/advice",
    label: "Advice",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
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
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(229,231,235,0.6)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
            padding: "0 32px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                background: "linear-gradient(135deg, #FF6B6B, #A78BFA, #60A5FA)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 800,
                boxShadow: "0 2px 8px rgba(255,107,107,0.2)",
              }}
            >
              D
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E", letterSpacing: "-0.01em" }}>
              Doodie
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#1A1A2E" : "#6B7280",
                    background: active ? "rgba(243,244,246,0.8)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#1A1A2E";
                      e.currentTarget.style.background = "rgba(243,244,246,0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#6B7280";
                      e.currentTarget.style.background = "transparent";
                    }
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
            className="glow-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 28px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF6B6B, #F472B6)",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(255,107,107,0.25)",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            Make A Doodie
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
