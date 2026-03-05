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

  return Array.from(groups.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([dateKey, entries]) => ({ dateKey, entries }));
}

// ---------------------------------------------------------------------------
// Timeline badge colors
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
  const hasResult = !!forge?.result_url;
  const originalUrl = forge?.drawings?.original_url;

  return (
    <div className="d-vault-timeline-card">
      {/* Show both original and result as thumbnails */}
      {originalUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={originalUrl}
          alt="Original drawing"
          className="d-vault-timeline-thumb"
        />
      )}
      {hasResult && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={forge.result_url!}
          alt={entry.title}
          className="d-vault-timeline-thumb"
        />
      )}
      <div className="d-vault-timeline-content">
        <div className="vault-card-header">
          <div className="vault-card-info">
            <p className="vault-card-title">{entry.title}</p>
            <p className="vault-card-meta">
              {forge?.style && <span className="vault-card-style">{forge.style}</span>}
              {forge?.style && " -- "}
              {formatDate(entry.created_at)}
            </p>
          </div>
          <button
            onClick={() => onRemove(entry.id)}
            className="vault-remove-btn"
            aria-label="Remove from vault"
          >
            &#x2715;
          </button>
        </div>

        <div className="vault-pills">
          <span className="vault-pill-saved">
            <Check /> Saved
          </span>
          {forge?.is_epic && (
            <span className="vault-pill-epic">EPIC</span>
          )}
          {!hasResult && (
            <span className="vault-pill-stored">Stored Only</span>
          )}
        </div>

        {/* Forge This button for stored-only entries */}
        {!hasResult && (
          <Link href="/create" className="vault-forge-btn">
            Forge This
          </Link>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legacy localStorage timeline card (now shows before/after)
// ---------------------------------------------------------------------------

function LocalTimelineCard({
  entry,
  onRemove,
}: {
  entry: VaultEntry;
  onRemove: (id: string) => void;
}) {
  const hasResult = !!entry.resultUrl;

  return (
    <div className="d-vault-timeline-card">
      {/* Original drawing thumbnail */}
      {entry.originalUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.originalUrl}
          alt="Original drawing"
          className="vault-local-thumb"
        />
      )}
      {/* AI result thumbnail */}
      {hasResult && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.resultUrl!}
          alt={entry.title}
          className="vault-local-thumb"
        />
      )}
      <div className="d-vault-timeline-content">
        <div className="vault-card-header">
          <div className="vault-card-info">
            <p className="vault-card-title">{entry.title}</p>
            <p className="vault-card-meta">
              {entry.style && <span className="vault-card-style">{entry.style}</span>}
              {entry.style && " -- "}
              {entry.childName && `${entry.childName} -- `}
              {formatDate(entry.savedAt)}
            </p>
          </div>
          <button
            onClick={() => onRemove(entry.id)}
            className="vault-remove-btn"
            aria-label="Remove from vault"
          >
            &#x2715;
          </button>
        </div>
        <div className="vault-pills">
          <span className="vault-pill-saved">
            <Check /> Saved
          </span>
          {!hasResult && (
            <span className="vault-pill-stored">Stored Only</span>
          )}
        </div>
        {!hasResult && (
          <Link href="/create" className="vault-forge-btn">
            Forge This
          </Link>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline renderer
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

  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated) {
      setLoadingDb(true);
      fetch("/api/vault")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          setDbEntries(data?.entries ?? []);
          setLoadingDb(false);

          if (hasLocalVaultEntries() && !wasVaultMigrated()) {
            setMigrating(true);
            migrateLocalVaultToDb().then(() => {
              setMigrating(false);
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

  const localEntries = vault?.entries ?? [];
  const hasEntries = isAuthenticated ? dbEntries.length > 0 : localEntries.length > 0;
  const entryCount = isAuthenticated ? dbEntries.length : localEntries.length;
  const isLoading = authLoading || loadingDb;

  const dbGroups = groupByDate(dbEntries, (e) => e.created_at);
  const localGroups = groupByDate([...localEntries].reverse(), (e) => e.savedAt);

  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="d-hero" style={{ paddingBottom: 60 }}>
        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="d-eyebrow d-eyebrow-purple">The Vault</p>
          <h1 className="d-heading d-heading-xl d-mb-md">
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
                ? "Create a forge or quick-scan a drawing to start your vault."
                : "Upload any drawing to start collecting. Free. Unlimited. No excuses."}
            </p>
          )}
          <Link href="/create" className="d-btn-primary">
            {hasEntries ? "Create More" : "Start Saving"}
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

      {/* DB-backed entries (authenticated) */}
      {!isLoading && isAuthenticated && hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container-md">
            <div className="d-center d-mb-2xl">
              <p className="d-eyebrow d-eyebrow-blue">Your Collection</p>
              <h2 className="d-heading d-heading-md d-mb-xs">
                {entryCount} {entryCount === 1 ? "drawing" : "drawings"} saved
              </h2>
              <p className="d-body-sm" style={{ color: "#06D6A0", fontWeight: 600 }}>
                Unlimited storage -- always free
              </p>
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

      {/* LocalStorage entries (unauthenticated) */}
      {!isLoading && !isAuthenticated && hasEntries && (
        <div className="d-section" style={{ background: "#FFF8F0" }}>
          <div className="d-container-md">
            <div className="d-center d-mb-2xl">
              <p className="d-eyebrow d-eyebrow-blue">Your Collection</p>
              <h2 className="d-heading d-heading-md d-mb-xs">
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
                <h2 className="d-heading d-heading-md d-mb-md">
                  Everything saved. Nothing lost.
                </h2>
                <p className="d-body d-mb-md">
                  Scan any drawing in 2 seconds. No account needed to start. The Vault organizes
                  everything by date and keeps it forever. It&apos;s like iCloud Photos
                  but for crayon art and parental guilt.
                </p>
                <ul className="d-check-list d-mb-lg">
                  <li className="d-check-item"><Check /> Unlimited free storage</li>
                  <li className="d-check-item"><Check /> Organized by date automatically</li>
                  <li className="d-check-item"><Check /> One-tap transform any stored drawing later</li>
                  <li className="d-check-item"><Check /> Before and after thumbnails for every forge</li>
                </ul>
                <Link href="/create" className="d-btn-primary">Upload a Drawing</Link>
              </div>

              {/* Mock timeline preview */}
              <div className="vault-mock-card">
                <div className="vault-mock-header">
                  <p className="vault-mock-title">Your Vault</p>
                  <p className="vault-mock-sub">Save artwork to see it here</p>
                </div>
                <div className="vault-mock-timeline">
                  <div className="vault-mock-line" />
                  <div className="vault-mock-items">
                    {[
                      { name: "Monday blob", badge: "4", month: "Mar", color: "#E63946" },
                      { name: "Tuesday scribble", badge: "3", month: "Mar", color: "#7B2D8E" },
                      { name: "Wednesday... cat?", badge: "2", month: "Mar", color: "#06D6A0" },
                    ].map((item) => (
                      <div key={item.name} className="vault-mock-item">
                        <div className="vault-mock-badge" style={{ background: item.color }}>
                          <span className="vault-mock-badge-day">{item.badge}</span>
                          <span className="vault-mock-badge-month">{item.month}</span>
                        </div>
                        <div className="vault-mock-item-text">
                          <p className="vault-mock-item-name">{item.name}</p>
                          <p className="vault-mock-item-desc">Example -- Emma, age 5</p>
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

      {/* Storage info -- replaces old "Storage Tiers" with unlimited free messaging */}
      <div className="d-section d-section-alt d-section-accented">
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-green">Free Forever</p>
            <h2 className="d-heading d-heading-lg d-mb-sm">Unlimited Storage</h2>
            <p className="d-body" style={{ maxWidth: 520, margin: "0 auto" }}>
              Store every drawing your kid ever makes. Free. No limits. No tiers.
              Credits are only for AI transformations -- storage is on us.
            </p>
          </div>
          <div className="d-grid d-grid-3">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ),
                title: "Unlimited Scans",
                desc: "Quick-scan any drawing to store it. No credits needed. Just capture and done.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#457B9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                ),
                title: "Before + After",
                desc: "Every forge saves the original drawing alongside the AI result. See the transformation.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Safe and Synced",
                desc: "Sign in to sync across devices. Your vault follows you everywhere. Nothing gets lost.",
              },
            ].map((item) => (
              <div key={item.title} className="d-card" style={{ textAlign: "center", padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  {item.icon}
                </div>
                <h3 className="d-heading d-heading-xs d-mb-xs">{item.title}</h3>
                <p className="d-body-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="d-section" style={{ background: "#D4E8F0", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-sm d-center">
          <h2 className="d-heading d-heading-lg d-mb-md">
            Your kid made 200 drawings last year.<br />
            <span style={{ color: "#7B2D8E" }}>How many do you still have?</span>
          </h2>
          <p className="d-body" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            Start saving today. The Vault catches what the recycling bin missed.
          </p>
          <Link href="/create" className="d-btn-primary">Upload a Drawing</Link>
        </div>
      </div>
    </div>
  );
}
