"use client";

import { useState, useRef, useCallback } from "react";

interface ArtistPlaqueProps {
  readonly resultUrl: string;
  readonly styleName: string;
  readonly styleColor: string;
  readonly isEpic?: boolean;
}

const PLAQUE_WIDTH = 1080;
const PLAQUE_HEIGHT = 1350;
const PADDING = 60;
const ART_SIZE = PLAQUE_WIDTH - PADDING * 2;
const PLACARD_Y = PADDING + ART_SIZE + 40;

function formatDate(): string {
  const now = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function renderPlaque(
  canvas: HTMLCanvasElement,
  resultUrl: string,
  childName: string,
  title: string,
  styleName: string,
  styleColor: string,
  isEpic: boolean
): Promise<void> {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = PLAQUE_WIDTH;
  canvas.height = PLAQUE_HEIGHT;

  // Background -- warm gallery wall
  ctx.fillStyle = "#FFF8F0";
  ctx.fillRect(0, 0, PLAQUE_WIDTH, PLAQUE_HEIGHT);

  // Subtle paper texture via noise-like grain
  ctx.fillStyle = "rgba(43, 45, 66, 0.015)";
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * PLAQUE_WIDTH;
    const y = Math.random() * PLAQUE_HEIGHT;
    ctx.fillRect(x, y, 2, 2);
  }

  // Load and draw the artwork
  try {
    const img = await loadImage(resultUrl);

    // Frame border
    const frameInset = 8;
    ctx.fillStyle = "#2B2D42";
    roundRect(
      ctx,
      PADDING - frameInset - 4,
      PADDING - frameInset - 4,
      ART_SIZE + frameInset * 2 + 8,
      ART_SIZE + frameInset * 2 + 8,
      12
    );
    ctx.fill();

    // Inner frame
    ctx.fillStyle = "#FFFFFF";
    roundRect(
      ctx,
      PADDING - frameInset,
      PADDING - frameInset,
      ART_SIZE + frameInset * 2,
      ART_SIZE + frameInset * 2,
      8
    );
    ctx.fill();

    // Artwork -- cover-fit into square
    ctx.save();
    roundRect(ctx, PADDING, PADDING, ART_SIZE, ART_SIZE, 4);
    ctx.clip();

    const imgAspect = img.width / img.height;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (imgAspect > 1) {
      sw = img.height;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, PADDING, PADDING, ART_SIZE, ART_SIZE);
    ctx.restore();

    // EPIC badge
    if (isEpic) {
      const badgeX = PADDING + ART_SIZE - 140;
      const badgeY = PADDING + 16;
      ctx.fillStyle = "#7B2D8E";
      roundRect(ctx, badgeX, badgeY, 120, 36, 6);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 18px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("EPIC MODE", badgeX + 60, badgeY + 24);
    }
  } catch {
    // Fallback if image fails to load
    ctx.fillStyle = "#E5D5C3";
    roundRect(ctx, PADDING, PADDING, ART_SIZE, ART_SIZE, 8);
    ctx.fill();
    ctx.fillStyle = "#ADB5BD";
    ctx.font = "20px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Artwork", PLAQUE_WIDTH / 2, PADDING + ART_SIZE / 2);
  }

  // Museum placard
  const placardWidth = ART_SIZE * 0.7;
  const placardHeight = 120;
  const placardX = (PLAQUE_WIDTH - placardWidth) / 2;

  // Placard background
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  roundRect(ctx, placardX, PLACARD_Y, placardWidth, placardHeight, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Placard border
  ctx.strokeStyle = "#E5D5C3";
  ctx.lineWidth = 1;
  roundRect(ctx, placardX, PLACARD_Y, placardWidth, placardHeight, 8);
  ctx.stroke();

  // Style color accent line at top of placard
  ctx.fillStyle = styleColor;
  roundRect(ctx, placardX + 20, PLACARD_Y + 12, 40, 3, 2);
  ctx.fill();

  // Title or child name (primary text)
  const displayTitle = title.trim() || (childName.trim() ? `${childName.trim()}'s Art` : "Untitled");
  ctx.fillStyle = "#2B2D42";
  ctx.font = "bold 28px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(displayTitle, PLAQUE_WIDTH / 2, PLACARD_Y + 48, placardWidth - 40);

  // Style + date line
  const metaText = `${styleName} -- ${formatDate()}`;
  ctx.fillStyle = "#ADB5BD";
  ctx.font = "16px 'Inter', sans-serif";
  ctx.fillText(metaText, PLAQUE_WIDTH / 2, PLACARD_Y + 76, placardWidth - 40);

  // Artist credit (if child name provided and title is different)
  if (childName.trim() && title.trim()) {
    ctx.fillStyle = "#6C757D";
    ctx.font = "italic 15px 'Inter', sans-serif";
    ctx.fillText(`by ${childName.trim()}`, PLAQUE_WIDTH / 2, PLACARD_Y + 100, placardWidth - 40);
  }

  // Watermark
  ctx.fillStyle = "rgba(43, 45, 66, 0.25)";
  ctx.font = "13px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Made with Doodie", PLAQUE_WIDTH / 2, PLAQUE_HEIGHT - 24);
}

export default function ArtistPlaque({
  resultUrl,
  styleName,
  styleColor,
  isEpic = false,
}: ArtistPlaqueProps) {
  const [open, setOpen] = useState(false);
  const [childName, setChildName] = useState("");
  const [title, setTitle] = useState("");
  const [rendering, setRendering] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleRender = useCallback(async () => {
    if (!canvasRef.current) return;
    setRendering(true);
    try {
      await renderPlaque(
        canvasRef.current,
        resultUrl,
        childName,
        title,
        styleName,
        styleColor,
        isEpic
      );
      const url = canvasRef.current.toDataURL("image/png");
      setPreviewUrl(url);
    } catch {
      // Rendering failed silently -- user sees no preview
    } finally {
      setRendering(false);
    }
  }, [resultUrl, childName, title, styleName, styleColor, isEpic]);

  const handleShare = useCallback(async () => {
    if (!previewUrl) return;

    try {
      const res = await fetch(previewUrl);
      const blob = await res.blob();
      const file = new File([blob], "doodie-artist-plaque.png", { type: "image/png" });

      if (navigator.share) {
        await navigator.share({
          title: title || "Doodie Art",
          text: `Check out this ${styleName} masterpiece -- made with Doodie`,
          files: [file],
        });
      } else {
        // Fallback: download
        const a = document.createElement("a");
        a.href = previewUrl;
        a.download = "doodie-artist-plaque.png";
        a.click();
      }
    } catch {
      // User cancelled share or fallback failed
    }
  }, [previewUrl, title, styleName]);

  const handleDownload = useCallback(() => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "doodie-artist-plaque.png";
    a.click();
  }, [previewUrl]);

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          // Auto-render on open after a tick to let canvas mount
          setTimeout(() => {
            if (canvasRef.current) {
              renderPlaque(canvasRef.current, resultUrl, "", "", styleName, styleColor, isEpic)
                .then(() => {
                  if (canvasRef.current) {
                    setPreviewUrl(canvasRef.current.toDataURL("image/png"));
                  }
                })
                .catch(() => {});
            }
          }, 100);
        }}
        className="d-btn-secondary"
        style={{
          fontFamily: "inherit",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="8" y1="15" x2="8" y2="21" />
          <line x1="16" y1="15" x2="16" y2="21" />
        </svg>
        Artist Plaque
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(43, 45, 66, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        style={{
          background: "#FFF8F0",
          borderRadius: 16,
          border: "3px solid #2B2D42",
          boxShadow: "6px 6px 0px #2B2D42",
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 24,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#2B2D42", margin: 0 }}>
            Artist Plaque
          </h2>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ADB5BD",
              fontSize: 24,
              lineHeight: 1,
              padding: 4,
            }}
          >
            x
          </button>
        </div>

        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6C757D", marginBottom: 4 }}>
              Artist Name
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Your kid's name"
              maxLength={50}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "2px solid #E5D5C3",
                background: "#FFFFFF",
                fontFamily: "inherit",
                fontSize: 15,
                color: "#2B2D42",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6C757D", marginBottom: 4 }}>
              Title <span style={{ color: "#ADB5BD" }}>(optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name this masterpiece"
              maxLength={80}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "2px solid #E5D5C3",
                background: "#FFFFFF",
                fontFamily: "inherit",
                fontSize: 15,
                color: "#2B2D42",
                outline: "none",
              }}
            />
          </div>
          <button
            onClick={handleRender}
            disabled={rendering}
            className="d-btn-primary"
            style={{
              fontFamily: "inherit",
              opacity: rendering ? 0.6 : 1,
              cursor: rendering ? "wait" : "pointer",
            }}
          >
            {rendering ? "Rendering..." : previewUrl ? "Update Preview" : "Generate Plaque"}
          </button>
        </div>

        {/* Canvas (hidden, used for rendering) */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Preview */}
        {previewUrl && (
          <div style={{ marginBottom: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Artist Plaque preview"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "2px solid #E5D5C3",
              }}
            />
          </div>
        )}

        {/* Action buttons */}
        {previewUrl && (
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={handleShare}
              className="d-btn-primary"
              style={{ fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </button>
            <button
              onClick={handleDownload}
              className="d-btn-secondary"
              style={{ fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
