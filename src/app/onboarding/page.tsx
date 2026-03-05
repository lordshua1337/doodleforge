"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/session-context";

const AGES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const AVATAR_EMOJIS = ["P", "S", "R", "D", "A", "C", "B", "M"];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useSession();

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [avatar, setAvatar] = useState("P");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name.trim()) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          age,
          avatar_emoji: avatar,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Failed to add child" }));
        throw new Error(data.error || "Failed to add child");
      }

      router.push("/create");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative z-10 min-h-screen d-flex d-flex-center" style={{ padding: '0 16px' }}>
      <div style={{ width: '100%', maxWidth: 448 }}>
        <div className="d-center d-mb-xl">
          <h1 className="d-heading d-heading-lg d-mb-sm">
            Who&apos;s the artist?
          </h1>
          <p className="d-body-sm">
            Tell us about your kid so we can personalize their gallery.
          </p>
        </div>

        <div className="craft-card" style={{ transform: 'rotate(-0.5deg)' }}>
          {/* Name */}
          <div className="d-mb-lg">
            <label htmlFor="child-name" className="d-eyebrow d-mb-sm" style={{ display: 'block', marginBottom: 8 }}>
              Kid&apos;s name
            </label>
            <input
              id="child-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Emma"
              maxLength={50}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) handleSubmit();
              }}
              className="d-input"
            />
          </div>

          {/* Age */}
          <div className="d-mb-lg">
            <label className="d-eyebrow d-mb-sm" style={{ display: 'block', marginBottom: 8 }}>
              How old? <span className="d-body-sm" style={{ fontWeight: 400 }}>(optional)</span>
            </label>
            <div className="d-flex" style={{ flexWrap: 'wrap', gap: 8 }}>
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(age === a ? null : a)}
                  className={`d-select-pill ${age === a ? 'd-select-pill-active' : ''}`}
                  style={{ width: 40, height: 40, padding: 0, justifyContent: 'center' }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar letter */}
          <div className="d-mb-lg">
            <label className="d-eyebrow d-mb-sm" style={{ display: 'block', marginBottom: 8 }}>
              Pick an avatar letter
            </label>
            <div className="d-flex" style={{ flexWrap: 'wrap', gap: 8 }}>
              {AVATAR_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setAvatar(e)}
                  className={`d-select-pill ${avatar === e ? 'd-select-pill-active' : ''}`}
                  style={{ width: 44, height: 44, padding: 0, justifyContent: 'center', fontSize: 18 }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="d-alert d-alert-error d-mb-lg">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!name.trim() || loading}
            className="d-btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? "Adding..." : "Let's Go"}
          </button>

          <button
            onClick={() => router.push("/create")}
            className="d-eyebrow d-eyebrow-blue d-mt-lg"
            style={{
              display: 'block',
              width: '100%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              marginBottom: 0,
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
