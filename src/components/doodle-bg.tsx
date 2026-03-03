"use client";

import { useEffect, useRef } from "react";

// 20 doodle shapes with varied styles for a rich, premium feel.
// Each has randomized animation properties for organic movement.
const DOODLES = [
  // Stars
  { top: "4%", left: "3%", size: 44, color: "#F59E0B", rotate: 12, dur: 18, delay: 0, svg: `<path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>` },
  { top: "62%", left: "88%", size: 38, color: "#FF6B35", rotate: -15, dur: 22, delay: 3, svg: `<path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>` },
  // Hearts
  { top: "18%", left: "92%", size: 40, color: "#8B5CF6", rotate: 15, dur: 20, delay: 1, svg: `<path d="M12 21C12 21 3 13.5 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.8 3.8 12 5C12.2 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 13.5 12 21 12 21Z" stroke="currentColor" stroke-width="2" fill="none"/>` },
  { top: "78%", left: "8%", size: 36, color: "#8B5CF6", rotate: -10, dur: 24, delay: 5, svg: `<path d="M12 21C12 21 3 13.5 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.8 3.8 12 5C12.2 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 13.5 12 21 12 21Z" stroke="currentColor" stroke-width="2" fill="none"/>` },
  // Squiggles
  { top: "10%", left: "45%", size: 52, color: "#FF6B35", rotate: -20, dur: 16, delay: 2, svg: `<path d="M2 12c4-8 8 8 12 0s8 8 12 0" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>` },
  { top: "55%", left: "2%", size: 48, color: "#FF6B35", rotate: 10, dur: 21, delay: 7, svg: `<path d="M2 12c4-8 8 8 12 0s8 8 12 0" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>` },
  // Clouds
  { top: "3%", left: "68%", size: 50, color: "#818CF8", rotate: 0, dur: 25, delay: 4, svg: `<path d="M6 19a4 4 0 01-1-7.9 5 5 0 019.9-1A4.5 4.5 0 0120 15a3 3 0 01-3 3H6z" stroke="currentColor" stroke-width="2" fill="none"/>` },
  { top: "42%", left: "95%", size: 46, color: "#818CF8", rotate: 5, dur: 19, delay: 8, svg: `<path d="M6 19a4 4 0 01-1-7.9 5 5 0 019.9-1A4.5 4.5 0 0120 15a3 3 0 01-3 3H6z" stroke="currentColor" stroke-width="2" fill="none"/>` },
  // Suns
  { top: "30%", left: "5%", size: 42, color: "#FF6B35", rotate: 0, dur: 14, delay: 1, svg: `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 1v3M12 21v3M1 12h3M21 12h3M4.2 4.2l2 2M17.8 17.8l2 2M4.2 19.8l2-2M17.8 6.2l2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  { top: "85%", left: "55%", size: 38, color: "#F59E0B", rotate: 15, dur: 23, delay: 6, svg: `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 1v3M12 21v3M1 12h3M21 12h3M4.2 4.2l2 2M17.8 17.8l2 2M4.2 19.8l2-2M17.8 6.2l2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  // Spirals
  { top: "68%", left: "15%", size: 44, color: "#8B5CF6", rotate: -10, dur: 17, delay: 3, svg: `<path d="M12 12c0-1.1.9-2 2-2s2 .9 2 2-.9 3-3 3-4-.9-4-3c0-2.8 2.2-5 5-5s5 2.2 5 5c0 3.9-3.1 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>` },
  { top: "25%", left: "80%", size: 40, color: "#8B5CF6", rotate: 20, dur: 20, delay: 9, svg: `<path d="M12 12c0-1.1.9-2 2-2s2 .9 2 2-.9 3-3 3-4-.9-4-3c0-2.8 2.2-5 5-5s5 2.2 5 5c0 3.9-3.1 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>` },
  // Flowers
  { top: "48%", left: "40%", size: 42, color: "#10B981", rotate: 25, dur: 22, delay: 2, svg: `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  { top: "92%", left: "30%", size: 36, color: "#10B981", rotate: -5, dur: 15, delay: 10, svg: `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  // Zigzags
  { top: "38%", left: "60%", size: 46, color: "#818CF8", rotate: 25, dur: 18, delay: 4, svg: `<path d="M2 4l5 8-5 8M10 4l5 8-5 8M18 4l5 8-5 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` },
  // Arrows
  { top: "72%", left: "72%", size: 40, color: "#FF6B35", rotate: -25, dur: 21, delay: 6, svg: `<line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="12 5 19 12 12 19" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` },
  // Diamonds
  { top: "15%", left: "25%", size: 34, color: "#F59E0B", rotate: 45, dur: 19, delay: 11, svg: `<rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>` },
  { top: "58%", left: "50%", size: 30, color: "#FF6B35", rotate: 30, dur: 16, delay: 8, svg: `<rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>` },
  // Crosses
  { top: "88%", left: "82%", size: 32, color: "#8B5CF6", rotate: 0, dur: 23, delay: 5, svg: `<line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
  { top: "5%", left: "15%", size: 28, color: "#8B5CF6", rotate: 45, dur: 17, delay: 12, svg: `<line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
];

export function DoodleBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax: subtle translateY offset based on scroll position
  useEffect(() => {
    let rafId: number;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        container.style.transform = `translateY(${scrollY * 0.03}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="doodle-bg" ref={containerRef} aria-hidden="true">
      {DOODLES.map((d, i) => {
        // Alternate between float and spin animations
        const animName = i % 3 === 0 ? "doodleSpin" : "doodleFloat";
        const opacity = 0.04 + (i % 5) * 0.01; // 0.04 to 0.08

        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={i >= 14 ? "doodle-hide-mobile" : ""}
            style={{
              position: "absolute",
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              transform: `rotate(${d.rotate}deg)`,
              opacity,
              color: d.color,
              animation: `${animName} ${d.dur}s ease-in-out ${d.delay}s infinite alternate`,
              willChange: "transform",
            }}
            dangerouslySetInnerHTML={{ __html: d.svg }}
          />
        );
      })}
    </div>
  );
}
