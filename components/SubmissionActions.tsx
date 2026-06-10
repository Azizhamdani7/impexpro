"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmissionStatus } from "@/lib/submissions";

export function SubmissionActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState("");

  async function update(status: SubmissionStatus) {
    setLoading(status);
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    setLoading("");
    router.refresh();
  }

  async function remove() {
    if (!window.confirm("Delete this submission permanently?")) return;
    setLoading("delete");
    await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    router.push("/admin/submissions");
    router.refresh();
  }

  return (
    <div className="cta-btns admin-detail-actions">
      <button className="btn btn-outline-gold" type="button" onClick={() => update("read")} disabled={Boolean(loading)}>
        {loading === "read" ? "Updating..." : "Mark Read"}
      </button>
      <button className="btn btn-outline-gold" type="button" onClick={() => update("replied")} disabled={Boolean(loading)}>
        {loading === "replied" ? "Updating..." : "Mark Replied"}
      </button>
      <button className="btn btn-navy" type="button" onClick={remove} disabled={Boolean(loading)}>
        {loading === "delete" ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
