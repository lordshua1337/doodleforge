"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useSession } from "@/lib/auth/session-context";

type Gender = "boy" | "girl" | null;

type KidProfile = {
  readonly kidName: string;
  readonly kidAge: number | null;
  readonly kidGender: Gender;
  readonly hasSetup: boolean;
  readonly childId: string | null; // Supabase child ID when authenticated
};

type KidContextValue = {
  readonly profile: KidProfile;
  readonly setProfile: (name: string, age: number | null, gender: Gender) => void;
  readonly clearProfile: () => void;
  readonly showSetup: boolean;
  readonly setShowSetup: (show: boolean) => void;
};

const STORAGE_KEY = "doodie-kid-profile";

const DEFAULT_PROFILE: KidProfile = {
  kidName: "",
  kidAge: null,
  kidGender: null,
  hasSetup: false,
  childId: null,
};

const KidContext = createContext<KidContextValue | null>(null);

function loadLocalProfile(): KidProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PROFILE;
    const parsed = JSON.parse(stored);
    return {
      kidName: typeof parsed.kidName === "string" ? parsed.kidName : "",
      kidAge: typeof parsed.kidAge === "number" ? parsed.kidAge : null,
      kidGender: parsed.kidGender === "boy" || parsed.kidGender === "girl" ? parsed.kidGender : null,
      hasSetup: typeof parsed.hasSetup === "boolean" ? parsed.hasSetup : false,
      childId: typeof parsed.childId === "string" ? parsed.childId : null,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveLocalProfile(profile: KidProfile): void {
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
  const { user } = useSession();

  // Load kid data: from Supabase if authenticated, localStorage as fallback
  useEffect(() => {
    if (user) {
      // Try loading from Supabase
      fetch("/api/children")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const kids = data?.children ?? [];
          if (kids.length > 0) {
            const kid = kids[0]; // Use first child
            const next: KidProfile = {
              kidName: kid.name ?? "",
              kidAge: kid.age ?? null,
              kidGender: null, // Gender not stored in children table
              hasSetup: true,
              childId: kid.id,
            };
            setProfileState(next);
            saveLocalProfile(next);
          } else {
            // Authenticated but no children -- load local
            const stored = loadLocalProfile();
            setProfileState(stored);
            if (!stored.hasSetup) setShowSetup(true);
          }
          setMounted(true);
        })
        .catch(() => {
          // Fallback to localStorage
          const stored = loadLocalProfile();
          setProfileState(stored);
          if (!stored.hasSetup) setShowSetup(true);
          setMounted(true);
        });
    } else {
      // Not authenticated -- use localStorage
      const stored = loadLocalProfile();
      setProfileState(stored);
      if (!stored.hasSetup) setShowSetup(true);
      setMounted(true);
    }
  }, [user]);

  const setProfile = useCallback((name: string, age: number | null, gender: Gender) => {
    const next: KidProfile = {
      kidName: name.trim(),
      kidAge: age,
      kidGender: gender,
      hasSetup: true,
      childId: profile.childId,
    };
    setProfileState(next);
    saveLocalProfile(next);
    setShowSetup(false);
  }, [profile.childId]);

  const clearProfile = useCallback(() => {
    setProfileState(DEFAULT_PROFILE);
    saveLocalProfile(DEFAULT_PROFILE);
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

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "boy", label: "Boy" },
  { value: "girl", label: "Girl" },
  { value: null, label: "Skip" },
];

function SetupModal({
  onComplete,
  onSkip,
}: {
  readonly onComplete: (name: string, age: number | null, gender: Gender) => void;
  readonly onSkip: () => void;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender>(null);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onComplete(name, age, gender);
  };

  return (
    <div className="kid-setup-overlay">
      <div className="kid-setup-modal">
        <div className="kid-setup-header">
          <div className="kid-setup-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

          <div className="kid-setup-field">
            <label className="kid-setup-label">
              Boy or girl? <span style={{ fontWeight: 400, color: "#9CA3AF" }}>(optional -- for pronouns)</span>
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {GENDER_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setGender(gender === opt.value ? null : opt.value)}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "2px solid",
                    borderColor: gender === opt.value ? "#8B5CF6" : "#E5E7EB",
                    background: gender === opt.value ? "rgba(139,92,246,0.06)" : "#fff",
                    color: gender === opt.value ? "#8B5CF6" : "#6B7280",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {opt.label}
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
