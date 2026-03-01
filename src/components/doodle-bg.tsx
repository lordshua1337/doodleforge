"use client";

// Subtle crayon doodle decorations scattered across the background.
// Each doodle is a simple SVG shape drawn with a crayon-like stroke.
// They're fixed-position, low-opacity, and non-interactive.

const DOODLES = [
  // Star (top-left area)
  {
    top: "8%", left: "5%", rotate: 12, opacity: 0.07, color: "#FFD54F",
    svg: `<path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    size: 40,
  },
  // Squiggly line (top-right)
  {
    top: "12%", left: "88%", rotate: -20, opacity: 0.06, color: "#FF6B6B",
    svg: `<path d="M2 12c4-8 8 8 12 0s8 8 12 0" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    size: 50,
  },
  // Circle/sun (mid-left)
  {
    top: "35%", left: "3%", rotate: 0, opacity: 0.06, color: "#FFAB91",
    svg: `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 1v3M12 21v3M1 12h3M21 12h3M4.2 4.2l2 2M17.8 17.8l2 2M4.2 19.8l2-2M17.8 6.2l2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    size: 36,
  },
  // Heart (mid-right)
  {
    top: "45%", left: "92%", rotate: 15, opacity: 0.06, color: "#F48FB1",
    svg: `<path d="M12 21C12 21 3 13.5 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.8 3.8 12 5C12.2 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 13.5 12 21 12 21Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    size: 34,
  },
  // Spiral (bottom-left)
  {
    top: "72%", left: "6%", rotate: -10, opacity: 0.05, color: "#B388FF",
    svg: `<path d="M12 12c0-1.1.9-2 2-2s2 .9 2 2-.9 3-3 3-4-.9-4-3c0-2.8 2.2-5 5-5s5 2.2 5 5c0 3.9-3.1 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    size: 42,
  },
  // Zigzag (bottom-right)
  {
    top: "80%", left: "90%", rotate: 25, opacity: 0.05, color: "#64B5F6",
    svg: `<path d="M2 4l5 8-5 8M10 4l5 8-5 8M18 4l5 8-5 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    size: 38,
  },
  // Cloud (center-top)
  {
    top: "5%", left: "50%", rotate: 0, opacity: 0.04, color: "#64B5F6",
    svg: `<path d="M6 19a4 4 0 01-1-7.9 5 5 0 019.9-1A4.5 4.5 0 0120 15a3 3 0 01-3 3H6z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    size: 48,
  },
  // Little flower (bottom-center)
  {
    top: "88%", left: "45%", rotate: 20, opacity: 0.05, color: "#69F0AE",
    svg: `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    size: 36,
  },
];

export function DoodleBg() {
  return (
    <div className="doodle-bg" aria-hidden="true">
      {DOODLES.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            transform: `rotate(${d.rotate}deg)`,
            opacity: d.opacity,
            color: d.color,
          }}
          dangerouslySetInnerHTML={{ __html: d.svg }}
        />
      ))}
    </div>
  );
}
