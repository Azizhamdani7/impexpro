"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AppError]", error);
  }, [error]);

  return (
    <main className="app-error-page">
      <section className="app-error-card">
        <div className="section-tag">Something Went Wrong</div>
        <h1>We could not load this page.</h1>
        <p>
          The website is still available. Please retry the page or return to the home
          page while the issue is logged.
        </p>
        <div className="cta-btns">
          <button type="button" className="btn btn-gold" onClick={reset}>
            Try Again
          </button>
          <Link className="btn btn-outline-gold" href="/">
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
