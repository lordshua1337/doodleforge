"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: "rgba(255,107,53,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#1A1A2E",
          marginBottom: 12,
        }}
      >
        Something went wrong
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#6B7280",
          maxWidth: 400,
          lineHeight: 1.6,
          marginBottom: 32,
        }}
      >
        The art gods are displeased. This is probably our fault, not your
        kid&apos;s drawing.
      </p>
      <button
        onClick={reset}
        className="d-btn-primary"
        style={{ cursor: "pointer" }}
      >
        Try Again
      </button>
    </div>
  );
}
