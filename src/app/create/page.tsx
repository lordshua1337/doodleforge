"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";

const STYLES = [
  { id: "oil", name: "Oil Painting", desc: "Classic museum vibes", color: "#FF6B6B" },
  { id: "watercolor", name: "Watercolor", desc: "Soft and dreamy", color: "#64B5F6" },
  { id: "anime", name: "Anime", desc: "Studio-quality animation", color: "#F48FB1" },
  { id: "cyberpunk", name: "Cyberpunk", desc: "Neon-soaked future", color: "#B388FF" },
  { id: "pop-art", name: "Pop Art", desc: "Bold and colorful", color: "#FFD54F" },
  { id: "pixel", name: "Pixel Art", desc: "8-bit nostalgia", color: "#69F0AE" },
  { id: "ghibli", name: "Studio Ghibli", desc: "Miyazaki magic", color: "#FFAB91" },
  { id: "realistic", name: "Photorealistic", desc: "Uncanny valley territory", color: "#64B5F6" },
  { id: "stained-glass", name: "Stained Glass", desc: "Cathedral window vibes", color: "#CE93D8" },
  { id: "cartoon", name: "Cartoon", desc: "Saturday morning energy", color: "#FFB74D" },
  { id: "pencil-sketch", name: "Pencil Sketch", desc: "Refined graphite look", color: "#90A4AE" },
  { id: "fantasy", name: "Fantasy Epic", desc: "Lord of the Rings energy", color: "#A5D6A7" },
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
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle loading messages during generation
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
    setError(null);
  };

  return (
    <PageTransition>
      <div className="relative z-10 min-h-screen">
        {/* Drawing decoration - top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 350,
            height: 350,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "top right",
            opacity: 0.05,
            pointerEvents: "none",
            maskImage: "linear-gradient(135deg, transparent 15%, black 50%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 15%, black 50%, transparent 90%)",
          }}
        />
        {/* Drawing decoration - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 300,
            height: 300,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom left",
            opacity: 0.04,
            pointerEvents: "none",
            maskImage: "linear-gradient(315deg, transparent 10%, black 40%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(315deg, transparent 10%, black 40%, transparent 85%)",
          }}
        />

        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          {/* Progress -- neumorphic pills */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 48 }}>
            <ProgressDot active={step === "upload"} done={step !== "upload"} label="Upload" color="#FF6B6B" />
            <ProgressLine done={step !== "upload"} />
            <ProgressDot active={step === "style"} done={step === "generating" || step === "result"} label="Style" color="#64B5F6" />
            <ProgressLine done={step === "generating" || step === "result"} />
            <ProgressDot active={step === "generating" || step === "result"} done={step === "result"} label="Result" color="#69F0AE" />
          </div>

          {/* Upload Step */}
          {step === "upload" && (
            <div className="text-center">
              <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
                Drop the <span className="text-coral">doodle</span>.
              </h1>
              <p className="mb-10 text-text-secondary">
                Drag the drawing here, or click to browse. PNG, JPG, WebP. Max 10MB.
              </p>

              <div
                className="neu-card"
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
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderColor: dragActive ? "#FF6B6B" : "rgba(229,231,235,0.5)",
                  background: dragActive ? "rgba(255,107,107,0.03)" : "#fff",
                  transition: "all 0.25s ease",
                  transform: dragActive ? "scale(1.02)" : undefined,
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
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,107,107,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6B6B" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#1A1A2E" }}>
                      {dragActive ? "Drop it like it's hot" : "Drop your kid's art here"}
                    </p>
                    <p style={{ marginTop: 4, fontSize: 14, color: "#9CA3AF" }}>
                      or click to browse files
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <p style={{ marginTop: 16, fontSize: 14, color: "#FF6B6B" }}>{error}</p>
              )}
            </div>
          )}

          {/* Style Step */}
          {step === "style" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
                  Pick a <span className="text-sky">style</span>.
                </h1>
                <p className="text-text-secondary">
                  How do you want this masterpiece reborn?
                </p>
              </div>

              {/* Preview */}
              {preview && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                  <div className="neu-card" style={{ overflow: "hidden", padding: 0, position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview}
                      alt="Your kid's drawing"
                      style={{ width: 160, height: 160, objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", padding: 8 }}>
                      <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>The original</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Style Grid -- neumorphic */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 32 }} className="md:!grid-cols-4">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className="neu-card d-card-hover"
                    style={{
                      padding: 16,
                      textAlign: "left",
                      cursor: "pointer",
                      border: selectedStyle === s.id ? `2px solid ${s.color}` : "1px solid rgba(229,231,235,0.5)",
                      background: selectedStyle === s.id ? `${s.color}08` : "#fff",
                      transform: selectedStyle === s.id ? "scale(1.03)" : undefined,
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{ height: 3, width: 32, borderRadius: 999, marginBottom: 8, background: s.color }} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>{s.desc}</div>
                  </button>
                ))}
              </div>

              {error && (
                <p style={{ textAlign: "center", fontSize: 14, color: "#FF6B6B", marginBottom: 16 }}>{error}</p>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={() => {
                    setStep("upload");
                    setFile(null);
                    setPreview(null);
                  }}
                  style={{
                    borderRadius: 999,
                    border: "2px solid #E5E7EB",
                    padding: "12px 24px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#6B7280",
                    background: "#fff",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedStyle}
                  className="glow-cta"
                  style={{
                    borderRadius: 999,
                    border: "none",
                    padding: "12px 32px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg, #FF6B6B, #F472B6)",
                    cursor: selectedStyle ? "pointer" : "not-allowed",
                    fontFamily: "inherit",
                    opacity: selectedStyle ? 1 : 0.4,
                    boxShadow: "0 4px 16px rgba(255,107,107,0.25)",
                    transition: "all 0.2s",
                    animation: selectedStyle ? undefined : "none",
                  }}
                >
                  Make A Doodie &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Generating Step */}
          {step === "generating" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 64, paddingBottom: 64, textAlign: "center" }}>
              {/* Squares loader */}
              <div className="doodie-loader" style={{ marginBottom: 40 }}>
                {(["top", "bottom", "left", "right"] as const).map((dir) => (
                  <div key={dir} className={`doodie-loader-arm doodie-loader-${dir}`}>
                    <div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar"><div className="doodie-loader-bar" /></div></div></div></div></div>
                  </div>
                ))}
              </div>

              <h2 className="mb-2 text-2xl font-extrabold" style={{ fontFamily: "var(--font-dm-serif)" }}>
                Working on it...
              </h2>
              <p style={{ color: "#6B7280", marginBottom: 8 }}>
                {loadingMsg}
              </p>
              <p style={{ fontSize: 12, color: "#9CA3AF" }}>This usually takes 15-30 seconds.</p>

              {/* Paint stroke progress bar */}
              <div className="neu-card-inset" style={{ marginTop: 32, width: "100%", maxWidth: 280, padding: 8 }}>
                <div style={{ height: 4, width: "100%", borderRadius: 999, background: "#F3F4F6", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #FF6B6B, #A78BFA, #60A5FA)",
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
              <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
                <span className="text-mint">Ta-da!</span> Look at that.
              </h1>
              <p style={{ color: "#6B7280", marginBottom: 32 }}>
                From doodle to masterpiece. Frame-worthy if we do say so ourselves.
              </p>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 32 }} className="md:!flex-row md:!justify-center md:!gap-32">
                {/* Before */}
                {preview && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9CA3AF" }}>
                      Before
                    </div>
                    <div className="neu-card" style={{ overflow: "hidden", padding: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Original" style={{ width: 192, height: 192, objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                )}

                {/* Arrow */}
                <div style={{ color: "#FF6B6B" }}>
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
                  <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#34D399" }}>
                    After
                  </div>
                  <div className="neu-card" style={{ overflow: "hidden", padding: 0, border: "2px solid rgba(52,211,153,0.3)", boxShadow: "0 8px 30px rgba(52,211,153,0.1)" }}>
                    {resultUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={resultUrl} alt="Transformed" style={{ width: 192, height: 192, objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ width: 192, height: 192, display: "flex", alignItems: "center", justifyContent: "center", background: "#F3F4F6", fontSize: 12, color: "#9CA3AF" }}>
                        Preview unavailable
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }} className="sm:!flex-row sm:!justify-center">
                {resultUrl && (
                  <a
                    href={resultUrl}
                    download="doodie-art.png"
                    style={{
                      borderRadius: 999,
                      padding: "12px 32px",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                      background: "linear-gradient(135deg, #FF6B6B, #F472B6)",
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(255,107,107,0.25)",
                    }}
                  >
                    Download High-Res
                  </a>
                )}
                <Link
                  href="/pricing"
                  style={{
                    borderRadius: 999,
                    padding: "12px 32px",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#A78BFA",
                    background: "rgba(167,139,250,0.05)",
                    border: "2px solid rgba(167,139,250,0.3)",
                    textDecoration: "none",
                  }}
                >
                  Order a Print
                </Link>
                <button
                  onClick={handleReset}
                  className="glow-cta"
                  style={{
                    borderRadius: 999,
                    padding: "12px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FF6B6B",
                    background: "rgba(255,107,107,0.05)",
                    border: "2px solid rgba(255,107,107,0.3)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Make Another Doodie
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
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
        className={done || active ? "" : "neu-card-inset"}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          transition: "all 0.2s",
          background: done ? "#69F0AE" : active ? color : undefined,
          boxShadow: done || active ? `0 2px 8px ${done ? "rgba(52,211,153,0.3)" : `${color}33`}` : undefined,
        }}
      />
      <span style={{ fontSize: 10, fontWeight: active || done ? 600 : 500, color: active || done ? "#1A1A2E" : "#9CA3AF" }}>
        {label}
      </span>
    </div>
  );
}

function ProgressLine({ done }: { done: boolean }) {
  return (
    <div style={{ height: 1, width: 48, background: done ? "#34D399" : "#E5E7EB", transition: "background 0.2s" }} />
  );
}
