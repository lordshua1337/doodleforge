// Digital Vault -- localStorage-based drawing storage
// Tracks saved gallery items with timestamps and notes
// All operations are immutable -- returns new state

export interface VaultEntry {
  readonly id: string;
  readonly galleryIndex: number; // index into GALLERY_ITEMS
  readonly title: string;
  readonly artist: string;
  readonly note: string;
  readonly savedAt: string; // ISO date
}

export interface VaultState {
  readonly entries: readonly VaultEntry[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "doodie-vault";

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

function createVault(): VaultState {
  return { entries: [] };
}

// ---------------------------------------------------------------------------
// LocalStorage persistence
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
// Immutable operations
// ---------------------------------------------------------------------------

export function addToVault(
  vault: VaultState,
  galleryIndex: number,
  title: string,
  artist: string
): VaultState {
  // Don't add duplicates
  if (vault.entries.some((e) => e.galleryIndex === galleryIndex)) return vault;

  const entry: VaultEntry = {
    id: `vault-${Date.now()}-${galleryIndex}`,
    galleryIndex,
    title,
    artist,
    note: "",
    savedAt: new Date().toISOString(),
  };

  return {
    ...vault,
    entries: [...vault.entries, entry],
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

export function isInVault(vault: VaultState, galleryIndex: number): boolean {
  return vault.entries.some((e) => e.galleryIndex === galleryIndex);
}
