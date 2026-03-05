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
      <div className="neu-card spark-skeleton">
        <div className="spark-skeleton-bar spark-skeleton-bar-sm" />
        <div className="spark-skeleton-bar spark-skeleton-bar-md" />
        <div className="spark-skeleton-bar spark-skeleton-bar-lg" />
      </div>
    );
  }

  const isActive = streak.currentStreak > 0;
  const nextMilestone = getNextMilestone(streak.currentStreak);
  const progress = streak.currentStreak / nextMilestone;

  return (
    <div className="neu-card spark-card-inner">
      {/* Milestone celebration overlay */}
      {milestone && (
        <div className="spark-milestone-overlay">
          <div className="spark-milestone-center">
            <div className="spark-milestone-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
              </svg>
            </div>
            <p className="spark-milestone-title">
              {MILESTONE_LABELS[milestone] || `${milestone}-Day Streak!`}
            </p>
            <p className="spark-milestone-sub">Keep creating!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="spark-header">
        <div className="spark-header-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
          </svg>
          <span className="d-eyebrow d-eyebrow-coral d-mb-0">
            Today&apos;s Spark
          </span>
          {!streak.completedToday && (
            <span className="d-pill d-pill-coral d-pill-xs">New</span>
          )}
        </div>

        {/* Streak badge */}
        <div className={`spark-streak-badge ${isActive ? "spark-streak-badge-active" : "spark-streak-badge-inactive"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
          </svg>
          {streak.currentStreak > 0 ? `${streak.currentStreak} day streak` : "Start a streak"}
        </div>
      </div>

      {/* Prompt */}
      <div className="spark-prompt-section">
        <p className="spark-prompt-text">{spark.prompt}</p>

        {/* Featured style */}
        <div className="spark-style-row">
          <div className="spark-style-icon" style={{ background: spark.styleColor }}>
            {spark.styleName.charAt(0)}
          </div>
          <div>
            <p className="spark-style-label-top">Featured Style</p>
            <p className="spark-style-label-name" style={{ color: spark.styleColor }}>
              {spark.styleName}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="spark-actions">
        {streak.completedToday ? (
          <div className="spark-done-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Done for today!
          </div>
        ) : (
          <button onClick={handleComplete} className="d-btn-primary spark-btn-sm">
            We Did It!
          </button>
        )}
        <button onClick={() => setShowPast(!showPast)} className="spark-toggle-btn">
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
            className={`spark-chevron-transition ${showPast ? "spark-chevron-open" : "spark-chevron-closed"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Past sparks log */}
      {showPast && (
        <div className="spark-past-list">
          {pastSparks.map((ps, i) => (
            <div
              key={i}
              className="spark-past-item"
              style={{ borderBottom: i < pastSparks.length - 1 ? "1px solid #F3F4F6" : "none" }}
            >
              <div className="spark-past-dot" style={{ background: ps.styleColor }} />
              <p className="spark-past-prompt">{ps.prompt}</p>
              <span className="spark-past-style">{ps.styleName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {streak.currentStreak > 0 && (
        <div className="spark-progress-section">
          <div className="spark-progress-labels">
            <span>{streak.totalDaysActive} sparks completed</span>
            <span>
              {nextMilestone - streak.currentStreak} to{" "}
              {MILESTONE_LABELS[nextMilestone] || `${nextMilestone}-day streak`}
            </span>
          </div>
          <div className="spark-progress-track">
            <div
              className="spark-progress-fill"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
