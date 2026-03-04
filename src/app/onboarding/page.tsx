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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#FFF8F0" }}>
      <div className="w-full max-w-md">
        <div className="text-center" style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "var(--font-gaegu), cursive",
              fontSize: 36,
              fontWeight: 700,
              color: "#2B2D42",
              marginBottom: 8,
            }}
          >
            Who&apos;s the artist?
          </h1>
          <p style={{ fontSize: 14, color: "#6C757D" }}>
            Tell us about your kid so we can personalize their gallery.
          </p>
        </div>

        <div
          style={{
            padding: 32,
            border: "3px solid #2B2D42",
            borderRadius: 12,
            background: "#F5E6D3",
            boxShadow: "4px 4px 0px #2B2D42",
          }}
        >
          {/* Name */}
          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="child-name"
              style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#2B2D42", marginBottom: 8 }}
            >
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
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "2px solid #2B2D42",
                background: "#fff",
                fontSize: 16,
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Age */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#2B2D42", marginBottom: 8 }}>
              How old? <span style={{ fontWeight: 400, color: "#ADB5BD" }}>(optional)</span>
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(age === a ? null : a)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    border: "2px solid",
                    borderColor: age === a ? "#7B2D8E" : "#2B2D42",
                    background: age === a ? "rgba(123,45,142,0.15)" : "#fff",
                    color: age === a ? "#7B2D8E" : "#2B2D42",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar letter */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#2B2D42", marginBottom: 8 }}>
              Pick an avatar letter
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {AVATAR_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setAvatar(e)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: "2px solid",
                    borderColor: avatar === e ? "#06D6A0" : "#2B2D42",
                    background: avatar === e ? "rgba(6,214,160,0.15)" : "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-gaegu), cursive",
                    transition: "all 0.15s",
                    color: "#2B2D42",
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p style={{ fontSize: 14, color: "#E63946", fontWeight: 600, marginBottom: 16 }}>{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!name.trim() || loading}
            style={{
              width: "100%",
              padding: "14px 28px",
              borderRadius: 8,
              border: "2px solid #2B2D42",
              background: "#E63946",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "var(--font-gaegu), cursive",
              cursor: name.trim() && !loading ? "pointer" : "not-allowed",
              opacity: name.trim() && !loading ? 1 : 0.5,
              transition: "all 0.15s",
              boxShadow: "3px 3px 0px #2B2D42",
            }}
          >
            {loading ? "Adding..." : "Let's Go"}
          </button>

          <button
            onClick={() => router.push("/create")}
            style={{
              display: "block",
              width: "100%",
              marginTop: 12,
              padding: "10px",
              background: "transparent",
              border: "none",
              fontSize: 14,
              color: "#6C757D",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
