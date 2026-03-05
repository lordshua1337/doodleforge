"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/session-context";

const STYLES = [
  { id: "oil", name: "Oil Painting", desc: "Classic museum vibes", color: "#E63946" },
  { id: "watercolor", name: "Watercolor", desc: "Soft and dreamy", color: "#457B9D" },
  { id: "anime", name: "Anime", desc: "Studio-quality animation", color: "#7B2D8E" },
  { id: "cyberpunk", name: "Cyberpunk", desc: "Neon-soaked future", color: "#457B9D" },
  { id: "pop-art", name: "Pop Art", desc: "Bold and colorful", color: "#FFD166" },
  { id: "pixel", name: "Pixel Art", desc: "8-bit nostalgia", color: "#06D6A0" },
  { id: "ghibli", name: "Studio Ghibli", desc: "Miyazaki magic", color: "#E63946" },
  { id: "realistic", name: "Photorealistic", desc: "Uncanny valley territory", color: "#457B9D" },
  { id: "stained-glass", name: "Stained Glass", desc: "Cathedral window vibes", color: "#7B2D8E" },
  { id: "cartoon", name: "Cartoon", desc: "Saturday morning energy", color: "#FFD166" },
  { id: "pencil-sketch", name: "Pencil Sketch", desc: "Refined graphite look", color: "#6C757D" },
  { id: "fantasy", name: "Fantasy Epic", desc: "Lord of the Rings energy", color: "#06D6A0" },
];

const LOADING_MESSAGES = [
  "Mixing colors...",
  "Teaching the AI what 'good art' means...",
  "Consulting with Bob Ross...",
  "Adding happy little trees...",
  "Applying the style...",
  "Almost there...",
  "Making it gallery-worthy...",
  "Final touches...",
];

type Step = "upload" | "style" | "generating" | "result";

export default function CreatePage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [forgeId, setForgeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { credits, refreshCredits } = useSession();

  // Check for Stripe success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
      refreshCredits();
      // Clean URL
      window.history.replaceState({}, "", "/create");
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [refreshCredits]);

  useEffect(() => {
    if (step !== "generating") return;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[idx]);
    }, 2500);
    return () => clearInterval(interval);
  }, [step]);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, or WebP).");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10MB.");
      return;
    }
    setError(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setStep("style");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleGenerate = async () => {
    if (!file || !selectedStyle) return;
    setStep("generating");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("style", selectedStyle);

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Generation failed" }));
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setResultUrl(data.imageUrl);
      setForgeId(data.forge_id ?? null);
      refreshCredits();
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setStep("style");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setPreview(null);
    setSelectedStyle(null);
    setResultUrl(null);
    setForgeId(null);
    setError(null);
  };

  return (
    <div className="relative z-10 min-h-screen">
      <div className="d-section" style={{ background: '#FFF8F0' }}>
      <div className="d-container-md">
        {/* Success banner after Stripe purchase */}
        {showSuccess && (
          <div className="d-alert d-alert-success d-mb-lg" style={{ textAlign: "center" }}>
            Credits added! You now have {credits >= 999 ? "unlimited" : credits} credits.
          </div>
        )}

        {/* Credit balance */}
        {credits > 0 && step === "upload" && (
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span className="d-badge-sm">
              Credits: {credits >= 999 ? "Unlimited" : credits}
            </span>
          </div>
        )}

        {/* Progress -- craft pills */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 48 }}>
          <ProgressDot active={step === "upload"} done={step !== "upload"} label="Upload" color="#E63946" />
          <ProgressLine done={step !== "upload"} />
          <ProgressDot active={step === "style"} done={step === "generating" || step === "result"} label="Style" color="#457B9D" />
          <ProgressLine done={step === "generating" || step === "result"} />
          <ProgressDot active={step === "generating" || step === "result"} done={step === "result"} label="Result" color="#06D6A0" />
        </div>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="text-center">
            <h1 className="d-heading d-heading-lg d-mb-sm">
              Drop the <span style={{ color: "#E63946" }}>doodle</span>.
            </h1>
            <p style={{ color: "#6C757D", marginBottom: 40 }}>
              Drag the drawing here, or click to browse. PNG, JPG, WebP. Max 10MB.
            </p>

            <div
              className={dragActive ? "upload-zone-drag" : "upload-zone-animated"}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              style={{
                maxWidth: 480,
                margin: "0 auto",
                padding: 64,
                cursor: "pointer",
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    background: "rgba(230,57,70,0.1)",
                    border: "2px solid #2B2D42",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E63946",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#2B2D42", fontFamily: "var(--font-display)", fontSize: 18 }}>
                    {dragActive ? "Drop it like it's hot" : "Drop your kid's art here"}
                  </p>
                  <p style={{ marginTop: 4, fontSize: 14, color: "#ADB5BD" }}>
                    or click to browse files
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <p className="d-alert d-alert-error d-mt-lg">{error}</p>
            )}
          </div>
        )}

        {/* Style Step */}
        {step === "style" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "#2B2D42",
                  marginBottom: 12,
                }}
              >
                Pick a <span style={{ color: "#457B9D" }}>style</span>.
              </h1>
              <p style={{ color: "#6C757D" }}>
                How do you want this masterpiece reborn?
              </p>
            </div>

            {/* Preview */}
            {preview && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                <div
                  style={{
                    overflow: "hidden",
                    border: "3px solid #2B2D42",
                    borderRadius: 8,
                    boxShadow: "4px 4px 0px #2B2D42",
                    transform: "rotate(-2deg)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Your kid's drawing"
                    style={{ width: 160, height: 160, objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            )}

            {/* Style Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 32 }} className="md:!grid-cols-4">
              {STYLES.map((s) => {
                const isSelected = selectedStyle === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    style={{
                      padding: 16,
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      borderRadius: 8,
                      border: isSelected ? `3px solid ${s.color}` : "3px solid #2B2D42",
                      background: isSelected ? `${s.color}15` : "#FFF8F0",
                      boxShadow: isSelected ? `3px 3px 0px ${s.color}` : "none",
                      transform: isSelected ? "translateY(-2px)" : undefined,
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ height: 4, width: 32, borderRadius: 2, marginBottom: 8, background: s.color }} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#2B2D42", marginBottom: 4, fontFamily: "var(--font-display)" }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#ADB5BD" }}>{s.desc}</div>
                  </button>
                );
              })}
            </div>

            {error && (
              <p className="d-alert d-alert-error d-mb-lg" style={{ textAlign: "center" }}>{error}</p>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <button
                onClick={() => {
                  setStep("upload");
                  setFile(null);
                  setPreview(null);
                }}
                className="d-btn-secondary"
                style={{ fontFamily: "inherit" }}
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={!selectedStyle}
                className="d-btn-primary"
                style={{
                  fontFamily: "inherit",
                  opacity: selectedStyle ? 1 : 0.4,
                  cursor: selectedStyle ? "pointer" : "not-allowed",
                }}
              >
                MAKE A DOODIE
              </button>
            </div>
          </div>
        )}

        {/* Generating Step */}
        {step === "generating" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 64, paddingBottom: 64, textAlign: "center" }}>
            <div className="doodie-loader" style={{ marginBottom: 40 }}>
              {(["top", "bottom", "left", "right"] as const).map((dir) => (
                <div key={dir} className={`doodie-loader-arm doodie-loader-${dir}`}>
                  <div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar" /></div></div></div></div></div>
                </div>
              ))}
            </div>

            <h2 className="d-heading d-heading-md d-mb-sm">
              Working on it...
            </h2>
            <p style={{ color: "#6C757D", marginBottom: 8, fontFamily: "var(--font-accent)", fontSize: 18 }}>
              {loadingMsg}
            </p>
            <p style={{ fontSize: 12, color: "#ADB5BD" }}>This usually takes 15-30 seconds.</p>

            {/* Progress bar */}
            <div className="d-progress-bar d-mt-xl" style={{ width: "100%", maxWidth: 280 }}>
              <div className="d-progress-bar-track">
                <div
                  style={{
                    height: "100%",
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #E63946, #FFD166, #457B9D, #06D6A0)",
                    animation: "paintStroke 25s ease-in-out forwards",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Result Step */}
        {step === "result" && (
          <div className="text-center result-reveal">
            <h1 className="d-heading d-heading-lg d-mb-sm">
              <span style={{ color: "#06D6A0" }}>Ta-da!</span> Look at that.
            </h1>
            <p style={{ color: "#6C757D", marginBottom: 32 }}>
              From doodle to masterpiece. Frame-worthy if we do say so ourselves.
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 32 }} className="md:!flex-row md:!justify-center md:!gap-32">
              {/* Before */}
              {preview && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#ADB5BD" }}>
                    Before
                  </div>
                  <div style={{ overflow: "hidden", border: "3px solid #2B2D42", borderRadius: 8, boxShadow: "3px 3px 0px #2B2D42" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Original" style={{ width: 192, height: 192, objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              )}

              {/* Arrow */}
              <div style={{ color: "#E63946" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden md:block">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:hidden">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>

              {/* After */}
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, fontFamily: "var(--font-accent)", color: "#06D6A0" }}>
                  After
                </div>
                <div style={{ overflow: "hidden", border: "3px solid #06D6A0", borderRadius: 8, boxShadow: "4px 4px 0px #2B2D42" }}>
                  {resultUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={resultUrl} alt="Transformed" style={{ width: 192, height: 192, objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: 192, height: 192, display: "flex", alignItems: "center", justifyContent: "center", background: "#F5E6D3", fontSize: 12, color: "#ADB5BD" }}>
                      Preview unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-btn-row">
              {resultUrl && (
                <a
                  href={resultUrl}
                  download="doodie-art.png"
                  className="d-btn-primary"
                >
                  Download High-Res
                </a>
              )}
              <Link
                href="/pricing"
                className="d-btn-secondary"
              >
                Order a Print
              </Link>
              <button
                onClick={handleReset}
                className="d-btn-secondary"
                style={{ fontFamily: "inherit" }}
              >
                Make Another Doodie
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

function ProgressDot({
  active,
  done,
  label,
  color,
}: {
  active: boolean;
  done: boolean;
  label: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: "2px solid #2B2D42",
          transition: "all 0.2s",
          background: done ? "#06D6A0" : active ? color : "#FFF8F0",
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: active || done ? 700 : 500,
          color: active || done ? "#2B2D42" : "#ADB5BD",
          fontFamily: "var(--font-accent)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressLine({ done }: { done: boolean }) {
  return (
    <div style={{ height: 3, width: 48, background: done ? "#06D6A0" : "#E5D5C3", borderRadius: 2, transition: "background 0.2s" }} />
  );
}
