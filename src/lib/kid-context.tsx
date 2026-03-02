"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type KidProfile = {
  readonly kidName: string;
  readonly kidAge: number | null;
  readonly hasSetup: boolean;
};

type KidContextValue = {
  readonly profile: KidProfile;
  readonly setProfile: (name: string, age: number | null) => void;
  readonly clearProfile: () => void;
  readonly showSetup: boolean;
  readonly setShowSetup: (show: boolean) => void;
};

const STORAGE_KEY = "doodie-kid-profile";

const DEFAULT_PROFILE: KidProfile = {
  kidName: "",
  kidAge: null,
  hasSetup: false,
};

const KidContext = createContext<KidContextValue | null>(null);

function loadProfile(): KidProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PROFILE;
    const parsed = JSON.parse(stored);
    return {
      kidName: typeof parsed.kidName === "string" ? parsed.kidName : "",
      kidAge: typeof parsed.kidAge === "number" ? parsed.kidAge : null,
      hasSetup: typeof parsed.hasSetup === "boolean" ? parsed.hasSetup : false,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile: KidProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage may be full or unavailable -- fail silently
  }
}

export function KidProvider({ children }: { readonly children: ReactNode }) {
  const [profile, setProfileState] = useState<KidProfile>(DEFAULT_PROFILE);
  const [showSetup, setShowSetup] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const stored = loadProfile();
    setProfileState(stored);
    if (!stored.hasSetup) {
      setShowSetup(true);
    }
    setMounted(true);
  }, []);

  const setProfile = useCallback((name: string, age: number | null) => {
    const next: KidProfile = {
      kidName: name.trim(),
      kidAge: age,
      hasSetup: true,
    };
    setProfileState(next);
    saveProfile(next);
    setShowSetup(false);
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(DEFAULT_PROFILE);
    saveProfile(DEFAULT_PROFILE);
  }, []);

  return (
    <KidContext.Provider value={{ profile, setProfile, clearProfile, showSetup, setShowSetup }}>
      {children}
      {mounted && showSetup && <SetupModal onComplete={setProfile} onSkip={() => setShowSetup(false)} />}
    </KidContext.Provider>
  );
}

export function useKid(): KidContextValue {
  const ctx = useContext(KidContext);
  if (!ctx) {
    throw new Error("useKid must be used within a KidProvider");
  }
  return ctx;
}

// -- Setup Modal --

const AGES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function SetupModal({
  onComplete,
  onSkip,
}: {
  readonly onComplete: (name: string, age: number | null) => void;
  readonly onSkip: () => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onComplete(name, age);
  };

  return (
    <div className="kid-setup-overlay">
      <div className="kid-setup-modal">
        <div className="kid-setup-header">
          <div className="kid-setup-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="kid-setup-title">Who&apos;s the artist?</h2>
          <p className="kid-setup-subtitle">
            Tell us about your kid so we can personalize the experience.
          </p>
        </div>

        <div className="kid-setup-body">
          <div className="kid-setup-field">
            <label className="kid-setup-label" htmlFor="kid-name">
              What&apos;s your kid&apos;s name?
            </label>
            <input
              id="kid-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Emma"
              className="kid-setup-input"
              maxLength={50}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) handleSubmit();
              }}
            />
          </div>

          <div className="kid-setup-field">
            <label className="kid-setup-label">
              How old are they?
            </label>
            <div className="kid-setup-ages">
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(age === a ? null : a)}
                  className={age === a ? "kid-age-btn kid-age-btn-active" : "kid-age-btn"}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="kid-setup-actions">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="kid-setup-submit"
          >
            Let&apos;s Go
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="kid-setup-skip"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
