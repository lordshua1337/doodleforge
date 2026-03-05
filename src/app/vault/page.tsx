"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/session-context";
import {
  loadVault,
  saveVault,
  removeFromVault,
  hasLocalVaultEntries,
  wasVaultMigrated,
  migrateLocalVaultToDb,
  type VaultState,
  type VaultEntry,
  type DbVaultEntry,
} from "@/lib/vault-data";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06D6A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Date grouping helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getDateKey(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function formatDateLabel(dateKey: string): string {
  const d = new Date(dateKey + "T12:00:00");
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (dateKey === todayKey) return "Today";
  if (dateKey === yesterdayKey) return "Yesterday";

  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getDateParts(dateKey: string): { day: string; month: string } {
  const d = new Date(dateKey + "T12:00:00");
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

interface DateGroup<T> {
  readonly dateKey: string;
  readonly entries: readonly T[];
}

function groupByDate<T>(items: readonly T[], getDate: (item: T) => string): readonly DateGroup<T>[] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = getDateKey(getDate(item));
    const existing = groups.get(key);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  // Sort groups newest first
  return Array.from(groups.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([dateKey, entries]) => ({ dateKey, entries }));
}

// ---------------------------------------------------------------------------
// Timeline badge colors (cycles through DoodleForge palette)
// ---------------------------------------------------------------------------

const BADGE_COLORS = ["#E63946", "#7B2D8E", "#06D6A0", "#FFD166", "#457B9D"];

// ---------------------------------------------------------------------------
// DB-backed timeline card
// ---------------------------------------------------------------------------

function DbTimelineCard({
  entry,
  onRemove,
}: {
  entry: DbVaultEntry;
  onRemove: (id: string) => void;
}) {
  const forge = entry.forges;

  return (
    <div className="d-vault-timeline-card">
      {forge?.result_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={forge.result_url}
          alt={entry.title}
          className="d-vault-timeline-thumb"
        />
      )}
      <div className="d-vault-timeline-content">
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#2B2D42", marginBottom: 2, lineHeight: 1.4, fontFamily: "var(--font-display)" }}>
              {entry.title}
            </p>
            <p style={{ fontSize: 12, color: "#ADB5BD", fontFamily: "var(--font-accent)" }}>
              {forge?.style && <span style={{ textTransform: "capitalize" }}>{forge.style}</span>}
              {forge?.style && " -- "}
              {formatDate(entry.created_at)}
            </p>
          </div>
          <button
            onClick={() => onRemove(entry.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: 6,
              border: "2px solid #E63946",
              background: "rgba(230,57,70,0.08)",
              color: "#E63946",
              cursor: "pointer",
              fontSize: 12,
              flexShrink: 0,
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
            aria-label="Remove from vault"
          >
            &#x2715;
          </button>
        </div>

        {/* Status pills */}
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: "var(--font-accent)",
              background: "rgba(6,214,160,0.15)",
              color: "#06D6A0",
              border: "1px solid #06D6A0",
            }}
          >
            <Check /> Saved
          </span>
          {forge?.is_epic && (
            <span
              style={{
                display: "inline-flex",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "var(--font-accent)",
                background: "rgba(123,45,142,0.15)",
                color: "#7B2D8E",
                border: "1px solid #7B2D8E",
              }}
            >
              EPIC
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legacy localStorage timeline card
// ---------------------------------------------------------------------------

function LocalTimelineCard({
  entry,
  onRemove,
}: {
  entry: VaultEntry;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="d-vault-timeline-card">
      <div className="d-vault-timeline-content">
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#2B2D42", marginBottom: 2, lineHeight: 1.4, fontFamily: "var(--font-display)" }}>
              {entry.title}
            </p>
            <p style={{ fontSize: 12, color: "#ADB5BD", fontFamily: "var(--font-accent)" }}>
              {entry.artist} -- {formatDate(entry.savedAt)}
            </p>
          </div>
          <button
            onClick={() => onRemove(entry.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: 6,
              border: "2px solid #E63946",
              background: "rgba(230,57,70,0.08)",
              color: "#E63946",
              cursor: "pointer",
              fontSize: 12,
              flexShrink: 0,
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
            aria-label="Remove from vault"
          >
            &#x2715;
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 9,
              fontWeight: 700,
              fontFamily: "var(--font-accent)",
              background: "rgba(6,214,160,0.15)",
              color: "#06D6A0",
              border: "1px solid #06D6A0",
            }}
          >
            <Check /> Saved
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline renderer (generic -- works for both DB and local entries)
// ---------------------------------------------------------------------------

function VaultTimeline<T>({
  groups,
  renderCard,
  getKey,
}: {
  groups: readonly DateGroup<T>[];
  renderCard: (entry: T) => React.ReactNode;
  getKey: (entry: T) => string;
}) {
  return (
    <div className="d-vault-timeline">
      {groups.map((group, gi) => {
        const { day, month } = getDateParts(group.dateKey);
        const color = BADGE_COLORS[gi % BADGE_COLORS.length];

        return (
          <div key={group.dateKey} className="d-vault-date-group">
            <div className="d-vault-date-badge" style={{ background: color }}>
              <span className="d-vault-date-badge-day">{day}</span>
              <span className="d-vault-date-badge-month">{month}</span>
            </div>
            <p className="d-vault-date-label">{formatDateLabel(group.dateKey)}</p>
            <div className="d-vault-date-entries">
              {group.entries.map((entry) => (
                <div key={getKey(entry)}>{renderCard(entry)}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function VaultPage() {
  const { user, loading: authLoading } = useSession();
  const [vault, setVault] = useState<VaultState | null>(null);
  const [dbEntries, setDbEntries] = useState<DbVaultEntry[]>([]);
  const [loadingDb, setLoadingDb] = useState(false);
  const [migrating, setMigrating] = useState(false);

  const isAuthenticated = !!user;

  // Load vault data
  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated) {
      setLoadingDb(true);
      fetch("/api/vault")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          setDbEntries(data?.entries ?? []);
          setLoadingDb(false);

          // Trigger migration if localStorage has entries and not yet migrated
          if (hasLocalVaultEntries() && !wasVaultMigrated()) {
            setMigrating(true);
            migrateLocalVaultToDb().then(() => {
              setMigrating(false);
              // Reload DB entries after migration
              fetch("/api/vault")
                .then((res) => (res.ok ? res.json() : null))
                .then((data2) => setDbEntries(data2?.entries ?? []));
            });
          }
        })
        .catch(() => setLoadingDb(false));
    } else {
      setVault(loadVault());
    }
  }, [isAuthenticated, authLoading]);

  // Handlers
  const handleRemoveLocal = useCallback((entryId: string) => {
    setVault((prev) => {
      if (!prev) return prev;
      const updated = removeFromVault(prev, entryId);
      saveVault(updated);
      return updated;
    });
  }, []);

  const handleRemoveDb = useCallback(async (entryId: string) => {
    const res = await fetch(`/api/vault?id=${entryId}`, { method: "DELETE" });
    if (res.ok) {
      setDbEntries((prev) => prev.filter((e) => e.id !== entryId));
    }
  }, []);

  // Determine entries to display
  const localEntries = vault?.entries ?? [];
  const hasEntries = isAuthenticated ? dbEntries.length > 0 : localEntries.length > 0;
  const entryCount = isAuthenticated ? dbEntries.length : localEntries.length;
  const isLoading = authLoading || loadingDb;

  // Group entries by date for timeline
  const dbGroups = groupByDate(dbEntries, (e) => e.created_at);
  const localGroups = groupByDate([...localEntries].reverse(), (e) => e.savedAt);

  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="d-hero" style={{ paddingBottom: 60 }}>
        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-purple">The Vault</p>
          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            {hasEntries ? (
              <>
                Your saved drawings.<br />
                <span style={{ color: "#7B2D8E" }}>{entryCount} and counting.</span>
              </>
            ) : (
              <>
                Stop throwing away memories.<br />
                <span style={{ color: "#6C757D" }}>You monster.</span>
              </>
            )}
          </h1>
          <p className="d-body-lg" style={{ maxWidth: 560, margin: "0 auto 16px" }}>
            {hasEntries
              ? "Everything you've saved lives here. Organized by date, safe, and ready to transform."
              : "Every parent has a drawer. The drawer is full. The guilt is real. You know you've thrown away drawings when they weren't looking."}
          </p>
          {!hasEntries && (
            <p className="d-body-sm" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
              {isAuthenticated
                ? "Create a forge, then save it to your vault."
                : "Head to the Gallery, open any artwork, and tap \"Save to Vault\" to start collecting."}
            </p>
          )}
          <Link href={isAuthenticated ? "/create" : "/gallery"} className="d-btn-primary">
            {hasEntries ? (isAuthenticated ? "Create More" : "Browse Gallery") : "Start Saving"}
          </Link>
        </div>
      </section>

      <div className="d-divider-gradient" />

      {/* Migration banner */}
      {migrating && (
        <div className="d-banner d-banner-purple">
          <p className="d-body-sm" style={{ fontWeight: 600, color: "#7B2D8E" }}>
            Migrating your saved drawings to the cloud...
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="d-section" style={{ background: "#FFF8F0", textAlign: "center" }}>
          <p style={{ color: "#ADB5BD" }}>Loading your vault...</p>
        </div>
      )}

      {/* DB-backed entries (authenticated) -- Timeline layout */}
      {!isLoading && isAuthenticated && hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container-md">
            <div className="d-center d-mb-2xl">
              <p className="d-eyebrow d-eyebrow-blue">Your Collection</p>
              <h2 className="d-heading d-heading-md" style={{ marginBottom: 8 }}>
                {entryCount} {entryCount === 1 ? "drawing" : "drawings"} saved
              </h2>
            </div>

            <VaultTimeline
              groups={dbGroups}
              renderCard={(entry: DbVaultEntry) => (
                <DbTimelineCard entry={entry} onRemove={handleRemoveDb} />
              )}
              getKey={(entry: DbVaultEntry) => entry.id}
            />
          </div>
        </div>
      )}

      {/* LocalStorage entries (unauthenticated) -- Timeline layout */}
      {!isLoading && !isAuthenticated && hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container-md">
            <div className="d-center d-mb-2xl">
              <p className="d-eyebrow d-eyebrow-blue">Your Collection</p>
              <h2 className="d-heading d-heading-md" style={{ marginBottom: 8 }}>
                {entryCount} {entryCount === 1 ? "drawing" : "drawings"} saved
              </h2>
              <p className="d-body-sm" style={{ maxWidth: 480, margin: "8px auto 0" }}>
                <Link href="/auth" style={{ color: "#7B2D8E", fontWeight: 600 }}>Sign in</Link> to sync your vault across devices.
              </p>
            </div>

            <VaultTimeline
              groups={localGroups}
              renderCard={(entry: VaultEntry) => (
                <LocalTimelineCard entry={entry} onRemove={handleRemoveLocal} />
              )}
              getKey={(entry: VaultEntry) => entry.id}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container">
            <div className="d-grid d-grid-2" style={{ alignItems: "center" }}>
              <div>
                <h2 className="d-heading d-heading-md" style={{ marginBottom: 24 }}>
                  Everything saved. Nothing lost.
                </h2>
                <p className="d-body" style={{ marginBottom: 24 }}>
                  Scan any drawing in 2 seconds. No account needed to start. The Vault organizes
                  everything by kid, date, and whatever description you want to add. It&apos;s like iCloud Photos
                  but for crayon art and parental guilt.
                </p>
                <ul className="d-check-list" style={{ marginBottom: 32 }}>
                  <li className="d-check-item"><Check /> Save artwork from the gallery</li>
                  <li className="d-check-item"><Check /> Organized by artist and date</li>
                  <li className="d-check-item"><Check /> One-tap transform any stored drawing later</li>
                  <li className="d-check-item"><Check /> Growth timeline -- see how their art evolves</li>
                </ul>
                <Link href="/gallery" className="d-btn-primary">Browse the Gallery</Link>
              </div>

              {/* Mock timeline UI */}
              <div style={{ border: "3px solid #2B2D42", borderRadius: 8, padding: 32, background: "#FFFFFF", boxShadow: "4px 4px 0px #2B2D42" }}>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#2B2D42", marginBottom: 4, fontFamily: "var(--font-display)" }}>Your Vault</p>
                  <p style={{ fontSize: 12, color: "#ADB5BD" }}>Save artwork to see it here</p>
                </div>
                <div style={{ position: "relative", paddingLeft: 40 }}>
                  {/* Mini timeline line */}
                  <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #E63946, #7B2D8E, #06D6A0)", borderRadius: 999 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { name: "Monday blob", badge: "4", month: "Mar", color: "#E63946" },
                      { name: "Tuesday scribble", badge: "3", month: "Mar", color: "#7B2D8E" },
                      { name: "Wednesday... cat?", badge: "2", month: "Mar", color: "#06D6A0" },
                    ].map((item) => (
                      <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.5 }}>
                        <div style={{
                          position: "absolute",
                          left: -40 + 40,
                          marginLeft: -24,
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          background: item.color,
                          border: "2px solid #2B2D42",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          zIndex: 2,
                        }}>
                          <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1, fontFamily: "var(--font-display)" }}>{item.badge}</span>
                          <span style={{ fontSize: 6, fontWeight: 600, lineHeight: 1, fontFamily: "var(--font-display)" }}>{item.month}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0, marginLeft: 16 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)" }}>{item.name}</p>
                          <p style={{ fontSize: 12, color: "#ADB5BD" }}>Example -- Emma, age 5</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Storage Tiers */}
      <div className="d-section d-section-alt d-section-accented">
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-blue">Coming Soon</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Storage Tiers</h2>
          </div>
          <div className="d-grid d-grid-3">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["50 drawings stored", "Organized by kid and date", "One-tap transform", "Basic sharing"],
                color: "#457B9D",
              },
              {
                name: "Pro",
                price: "$4.99",
                period: "/month",
                features: ["Unlimited storage", "Growth timeline view", "Family sharing (5 members)", "ZIP download export", "Priority support"],
                color: "#E63946",
                popular: true,
              },
              {
                name: "Storage Pack",
                price: "$2.99",
                period: "one-time",
                features: ["100 additional drawings", "Stack with free tier", "Never expires", "One-time purchase"],
                color: "#06D6A0",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`d-pricing-card ${tier.popular ? "d-pricing-popular" : ""}`}
                style={{ overflow: "visible" }}
              >
                {tier.popular && (
                  <span className="d-popular-badge">Best Value</span>
                )}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#2B2D42", marginBottom: 8, fontFamily: "var(--font-display)" }}>{tier.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 40, fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)" }}>{tier.price}</span>
                    <span style={{ fontSize: 14, color: "#ADB5BD" }}>{tier.period}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: 14, color: "#2B2D42" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/create"
                  className={tier.popular ? "d-btn-primary d-btn-block" : "d-btn-secondary d-btn-block"}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="d-section" style={{ background: "#D4E8F0", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-sm d-center">
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>
            Your kid made 200 drawings last year.<br />
            <span style={{ color: "#7B2D8E" }}>How many do you still have?</span>
          </h2>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            Start saving today. The Vault catches what the recycling bin missed.
          </p>
          <Link href="/gallery" className="d-btn-primary">Browse Gallery</Link>
        </div>
      </div>
    </div>
  );
}
