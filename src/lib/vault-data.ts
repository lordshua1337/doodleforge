// Digital Vault -- localStorage-based drawing storage with DB migration
// Tracks saved drawings and forges with timestamps and notes
// All operations are immutable -- returns new state

export interface VaultEntry {
  readonly id: string;
  readonly originalUrl: string;       // the kid's drawing (data URL or R2 URL)
  readonly resultUrl: string | null;   // the AI output (null = stored only, not forged)
  readonly style: string | null;       // which style was used (null = stored only)
  readonly childName: string;          // which kid made it
  readonly title: string;
  readonly note: string;
  readonly savedAt: string;            // ISO date
  readonly forgeId: string | null;     // link to DB forge record if signed in
}

export interface VaultState {
  readonly entries: readonly VaultEntry[];
}

// DB-backed vault entry from /api/vault
export interface DbVaultEntry {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  readonly display_order: number;
  readonly created_at: string;
  readonly forge_id: string | null;
  readonly forges: {
    readonly id: string;
    readonly style: string;
    readonly is_epic: boolean;
    readonly result_url: string | null;
    readonly created_at: string;
    readonly drawings: {
      readonly original_url: string;
      readonly file_name: string | null;
    } | null;
  } | null;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "doodie-vault";
const MIGRATION_KEY = "doodie-vault-migrated";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createVault(): VaultState {
  return { entries: [] };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence (fallback for unauthenticated users)
// ---------------------------------------------------------------------------

export function loadVault(): VaultState {
  if (typeof window === "undefined") return createVault();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createVault();
  try {
    return JSON.parse(raw) as VaultState;
  } catch {
    return createVault();
  }
}

export function saveVault(vault: VaultState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vault));
}

// ---------------------------------------------------------------------------
// Immutable operations (localStorage)
// ---------------------------------------------------------------------------

export function addToVault(
  vault: VaultState,
  entry: Omit<VaultEntry, "id" | "savedAt">
): VaultState {
  // Don't add duplicates by forgeId (if provided)
  if (entry.forgeId && vault.entries.some((e) => e.forgeId === entry.forgeId)) {
    return vault;
  }

  const newEntry: VaultEntry = {
    ...entry,
    id: `vault-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
  };

  return {
    ...vault,
    entries: [...vault.entries, newEntry],
  };
}

export function removeFromVault(
  vault: VaultState,
  entryId: string
): VaultState {
  return {
    ...vault,
    entries: vault.entries.filter((e) => e.id !== entryId),
  };
}

export function updateNote(
  vault: VaultState,
  entryId: string,
  note: string
): VaultState {
  return {
    ...vault,
    entries: vault.entries.map((e) =>
      e.id === entryId ? { ...e, note } : e
    ),
  };
}

export function isInVault(vault: VaultState, forgeId: string): boolean {
  return vault.entries.some((e) => e.forgeId === forgeId);
}

// ---------------------------------------------------------------------------
// DB migration -- migrate localStorage vault entries to Supabase
// ---------------------------------------------------------------------------

export function hasLocalVaultEntries(): boolean {
  if (typeof window === "undefined") return false;
  const vault = loadVault();
  return vault.entries.length > 0;
}

export function wasVaultMigrated(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(MIGRATION_KEY) === "true";
}

export function markVaultMigrated(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MIGRATION_KEY, "true");
}

export async function migrateLocalVaultToDb(): Promise<{ migrated: number; errors: number }> {
  const vault = loadVault();
  let migrated = 0;
  let errors = 0;

  for (const entry of vault.entries) {
    try {
      const res = await fetch("/api/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: entry.title || "Untitled drawing",
          forge_id: entry.forgeId,
        }),
      });

      if (res.ok || res.status === 409) {
        migrated++;
      } else {
        errors++;
      }
    } catch {
      errors++;
    }
  }

  if (errors === 0) {
    markVaultMigrated();
  }

  return { migrated, errors };
}
