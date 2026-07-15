"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          background: "#faf6ef",
          color: "#2b241c",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            margin: "0 auto",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>
            We couldn&apos;t load this page
          </h1>
          <p style={{ marginTop: "1rem", color: "#8a7f6c" }}>
            Something went wrong loading the app. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              border: "1px solid #c1552c",
              background: "#c1552c",
              color: "#fff8f2",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
