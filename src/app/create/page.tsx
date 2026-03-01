"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";

const STYLES = [
  { id: "oil", name: "Oil Painting", desc: "Classic museum vibes", color: "#FF6B6B" },
  { id: "watercolor", name: "Watercolor", desc: "Soft and dreamy", color: "#64B5F6" },
  { id: "anime", name: "Anime", desc: "Studio-quality animation", color: "#F48FB1" },
  { id: "cyberpunk", name: "Cyberpunk", desc: "Neon-soaked future", color: "#B388FF" },
  { id: "pop-art", name: "Pop Art", desc: "Bold and colorful", color: "#FFD54F" },
  { id: "pixel", name: "Pixel Art", desc: "8-bit nostalgia", color: "#69F0AE" },
  { id: "ghibli", name: "Studio Ghibli", desc: "Miyazaki magic", color: "#FFAB91" },
  { id: "realistic", name: "Photorealistic", desc: "Uncanny valley territory", color: "#64B5F6" },
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
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="relative z-10 min-h-screen pt-14">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Progress */}
        <div className="mb-12 flex items-center justify-center gap-2">
          <ProgressDot active={step === "upload"} done={step !== "upload"} label="Upload" color="#FF6B6B" />
          <ProgressLine done={step !== "upload"} />
          <ProgressDot active={step === "style"} done={step === "generating" || step === "result"} label="Style" color="#64B5F6" />
          <ProgressLine done={step === "generating" || step === "result"} />
          <ProgressDot active={step === "generating" || step === "result"} done={step === "result"} label="Result" color="#69F0AE" />
        </div>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="text-center">
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-fredoka)" }}>
              Drop the <span className="text-coral">doodle</span>.
            </h1>
            <p className="mb-10 text-text-secondary">
              Drag the drawing here, or click to browse. PNG, JPG, WebP. Max 10MB.
            </p>

            <div
              className={`relative mx-auto max-w-lg cursor-pointer rounded-2xl border-2 border-dashed p-16 transition-all ${
                dragActive
                  ? "border-coral bg-coral/5"
                  : "border-border hover:border-coral/30 hover:bg-surface"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
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
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coral/10 text-coral">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">
                    {dragActive ? "Drop it like it's hot" : "Drop your kid's art here"}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    or click to browse files
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-coral">{error}</p>
            )}
          </div>
        )}

        {/* Style Step */}
        {step === "style" && (
          <div>
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                Pick a <span className="text-sky">style</span>.
              </h1>
              <p className="text-text-secondary">
                How do you want this masterpiece reborn?
              </p>
            </div>

            {/* Preview */}
            {preview && (
              <div className="mb-8 flex justify-center">
                <div className="relative overflow-hidden rounded-xl border-2 border-border shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Your kid's drawing"
                    className="h-40 w-40 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-[10px] font-medium text-white/80">The original</p>
                  </div>
                </div>
              </div>
            )}

            {/* Style Grid */}
            <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    selectedStyle === s.id
                      ? "scale-[1.03] shadow-md"
                      : "border-border bg-surface hover:border-border-hover"
                  }`}
                  style={selectedStyle === s.id ? { borderColor: s.color, backgroundColor: `${s.color}08` } : undefined}
                >
                  <div className="mb-2 h-2 w-8 rounded-full" style={{ backgroundColor: s.color }} />
                  <div className="mb-1 text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-text-muted">{s.desc}</div>
                </button>
              ))}
            </div>

            {error && (
              <p className="mb-4 text-center text-sm text-coral">{error}</p>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setStep("upload");
                  setFile(null);
                  setPreview(null);
                }}
                className="rounded-full border-2 border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={!selectedStyle}
                className="rounded-full bg-coral px-8 py-3 text-sm font-bold text-white transition-all hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-coral/20"
              >
                Transform This &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Generating Step */}
        {step === "generating" && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-8 h-12 w-12 animate-spin rounded-full border-2 border-border border-t-coral" />
            <h2 className="mb-2 text-2xl font-extrabold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Working on it...
            </h2>
            <p className="text-text-secondary">
              Our AI is doing its thing. Hang tight.
            </p>
            <p className="mt-2 text-xs text-text-muted">This usually takes 15-30 seconds.</p>
          </div>
        )}

        {/* Result Step */}
        {step === "result" && (
          <div className="text-center">
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-fredoka)" }}>
              <span className="text-mint">Ta-da!</span> Look at that.
            </h1>
            <p className="mb-8 text-text-secondary">
              From doodle to masterpiece. Frame-worthy if we do say so ourselves.
            </p>

            <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
              {/* Before */}
              {preview && (
                <div className="text-center">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Before
                  </div>
                  <div className="overflow-hidden rounded-xl border-2 border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Original" className="h-48 w-48 object-cover" />
                  </div>
                </div>
              )}

              {/* Arrow */}
              <div className="text-coral">
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
              <div className="text-center">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-mint">
                  After
                </div>
                <div className="overflow-hidden rounded-xl border-2 border-mint/30">
                  {resultUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={resultUrl} alt="Transformed" className="h-48 w-48 object-cover" />
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center bg-surface-2 text-xs text-text-muted">
                      Preview unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {resultUrl && (
                <a
                  href={resultUrl}
                  download="doodleforge-art.png"
                  className="rounded-full bg-coral px-8 py-3 text-sm font-bold text-white transition-all hover:bg-accent-hover shadow-sm"
                >
                  Download High-Res
                </a>
              )}
              <Link
                href="/pricing"
                className="rounded-full border-2 border-lavender/30 bg-lavender/5 px-8 py-3 text-sm font-semibold text-lavender transition-all hover:bg-lavender/10"
              >
                Order a Print
              </Link>
              <button
                onClick={handleReset}
                className="rounded-full border-2 border-border px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
              >
                Do Another One
              </button>
            </div>
          </div>
        )}
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
  const bgColor = done ? "#69F0AE" : active ? color : undefined;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`h-3 w-3 rounded-full transition-all ${!done && !active ? "bg-border" : ""}`}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      />
      <span className={`text-[10px] font-medium ${active || done ? "text-foreground" : "text-text-muted"}`}>
        {label}
      </span>
    </div>
  );
}

function ProgressLine({ done }: { done: boolean }) {
  return (
    <div className={`h-px w-12 transition-colors ${done ? "bg-mint" : "bg-border"}`} />
  );
}
