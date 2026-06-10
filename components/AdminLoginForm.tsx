"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: form.get("password")
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError([data.error, data.setup].filter(Boolean).join(" "));
        return;
      }

      router.push(searchParams.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Unable to reach the login service. Check that the Next.js server is running, then try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-login-card" onSubmit={submit}>
      <div className="admin-login-mark">IP</div>
      <div className="section-tag">Secure Admin</div>
      <h1>Blog CMS Login</h1>
      <p>Manage published articles, drafts, SEO metadata, and blog performance content.</p>
      {error ? <div className="form-msg error">{error}</div> : null}
      <div className="form-group">
        <label htmlFor="admin-password">Password</label>
        <input id="admin-password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
