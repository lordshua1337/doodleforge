"use client";

import { useState, useEffect } from "react";
import {
  loadStreak,
  completeToday,
  getReachedMilestone,
  getNextMilestone,
  MILESTONE_LABELS,
  type StreakState,
} from "@/lib/daily-streak";
import { getDailySpark, getRecentSparks, type DailySpark } from "@/lib/daily-spark";

export default function DailySparkCard() {
  const [streak, setStreak] = useState<StreakState | null>(null);
  const [spark, setSpark] = useState<DailySpark | null>(null);
  const [pastSparks, setPastSparks] = useState<DailySpark[]>([]);
  const [milestone, setMilestone] = useState<number | null>(null);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    setStreak(loadStreak());
    setSpark(getDailySpark());
    setPastSparks(getRecentSparks(7));
  }, []);

  function handleComplete() {
    if (!streak) return;
    const updated = completeToday(streak);
    setStreak(updated);

    const reached = getReachedMilestone(updated.currentStreak);
    if (reached) {
      setMilestone(reached);
      setTimeout(() => setMilestone(null), 3000);
    }
  }

  // SSR placeholder
  if (!streak || !spark) {
    return (
      <div className="neu-card" style={{ padding: 32, minHeight: 200 }}>
        <div style={{ height: 16, width: 120, background: "#F3F4F6", borderRadius: 8, marginBottom: 16 }} />
        <div style={{ height: 24, width: 260, background: "#F3F4F6", borderRadius: 8, marginBottom: 12 }} />
        <div style={{ height: 40, width: "100%", background: "#F3F4F6", borderRadius: 8 }} />
      </div>
    );
  }

  const isActive = streak.currentStreak > 0;
  const nextMilestone = getNextMilestone(streak.currentStreak);
  const progress = streak.currentStreak / nextMilestone;

  return (
    <div className="neu-card" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
      {/* Milestone celebration overlay */}
      {milestone && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,107,53,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          borderRadius: 16,
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
              </svg>
            </div>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#FF6B35" }}>
              {MILESTONE_LABELS[milestone] || `${milestone}-Day Streak!`}
            </p>
            <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Keep creating!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
          </svg>
          <span className="d-eyebrow d-eyebrow-coral" style={{ marginBottom: 0 }}>
            Today&apos;s Spark
          </span>
          {!streak.completedToday && (
            <span className="d-pill d-pill-coral" style={{ fontSize: 10, padding: "2px 8px" }}>New</span>
          )}
        </div>

        {/* Streak badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: 999,
          background: isActive ? "rgba(255,107,53,0.08)" : "#F3F4F6",
          fontSize: 12,
          fontWeight: 600,
          color: isActive ? "#FF6B35" : "#9CA3AF",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
          </svg>
          {streak.currentStreak > 0 ? `${streak.currentStreak} day streak` : "Start a streak"}
        </div>
      </div>

      {/* Prompt */}
      <div style={{ padding: "16px 24px 0" }}>
        <p style={{
          fontSize: "clamp(18px, 3vw, 24px)",
          fontWeight: 700,
          color: "#1A1A2E",
          lineHeight: 1.3,
          marginBottom: 12,
        }}>
          {spark.prompt}
        </p>

        {/* Featured style */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: spark.styleColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
          }}>
            {spark.styleName.charAt(0)}
          </div>
          <div>
            <p style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Featured Style
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: spark.styleColor }}>
              {spark.styleName}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div style={{ padding: "0 24px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {streak.completedToday ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#10B981", fontSize: 14, fontWeight: 600 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Done for today!
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="d-btn-primary"
            style={{ padding: "10px 24px", fontSize: 14 }}
          >
            We Did It!
          </button>
        )}
        <button
          onClick={() => setShowPast(!showPast)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            color: "#6B7280",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Past sparks
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: showPast ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Past sparks log */}
      {showPast && (
        <div style={{ borderTop: "1px solid #E5E7EB", padding: "12px 24px 16px" }}>
          {pastSparks.map((ps, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 0",
              borderBottom: i < pastSparks.length - 1 ? "1px solid #F3F4F6" : "none",
            }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ps.styleColor,
                flexShrink: 0,
              }} />
              <p style={{ fontSize: 13, color: "#6B7280", flex: 1 }}>{ps.prompt}</p>
              <span style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0 }}>{ps.styleName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {streak.currentStreak > 0 && (
        <div style={{ borderTop: "1px solid #E5E7EB", padding: "12px 24px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF", marginBottom: 6 }}>
            <span>{streak.totalDaysActive} sparks completed</span>
            <span>
              {nextMilestone - streak.currentStreak} to{" "}
              {MILESTONE_LABELS[nextMilestone] || `${nextMilestone}-day streak`}
            </span>
          </div>
          <div style={{ height: 6, background: "#F3F4F6", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, #FF6B35, #F59E0B)",
              width: `${Math.min(progress * 100, 100)}%`,
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
