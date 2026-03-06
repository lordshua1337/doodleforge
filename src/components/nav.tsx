"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth/session-context";

const NAV_LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/vault", label: "Vault" },
  { href: "/guess", label: "Guess" },
  { href: "/advice", label: "Advice" },
  { href: "/pricing", label: "Pricing" },
];

const MAGNET_COLORS = ["#E63946", "#457B9D", "#FFD166", "#06D6A0", "#7B2D8E", "#E63946"];

const MOBILE_TABS = [
  {
    href: "/gallery",
    label: "Gallery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
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
  const { user, credits, loading, signOut } = useSession();

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "?";
  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "";

  return (
    <>
      {/* Desktop top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-bar">
        <div className="nav-inner">
          {/* Logo -- hand-written style */}
          <Link href="/" className="nav-logo-link">
            <Image
              src="/doodie-logo.png"
              alt="Doodie"
              width={160}
              height={52}
              className="nav-logo-img"
              priority
            />
          </Link>

          {/* Desktop magnet links */}
          <div className="hidden md:flex nav-links">
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href;
              const color = MAGNET_COLORS[i % MAGNET_COLORS.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active ? "nav-link-active" : ""}`}
                  style={active ? {
                    background: color,
                    transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
                  } : undefined}
                >
                  {link.label}
                  {link.href === "/create" && user && !loading && (
                    <span
                      className="nav-credit-badge"
                      style={{ background: credits > 0 ? "#06D6A0" : "#E63946" }}
                    >
                      {credits >= 999 ? "UNL" : credits}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex nav-auth-area">
            {!loading && user ? (
              <>
                <div className="nav-user-info">
                  <div className="nav-avatar">{userInitial}</div>
                  <span className="nav-username">{displayName}</span>
                </div>
                <button onClick={() => signOut()} className="nav-signout">
                  Sign Out
                </button>
              </>
            ) : !loading ? (
              <Link href="/auth" className="nav-signin">
                Sign In
              </Link>
            ) : null}
            <Link href="/create" className="nav-cta-btn">
              MAKE A DOODIE
            </Link>
          </div>
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
