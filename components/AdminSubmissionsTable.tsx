"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ContactSubmission } from "@/lib/submissions";
import { formatDate } from "@/lib/blog-shared";

export function AdminSubmissionsTable({ submissions }: { submissions: ContactSubmission[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return submissions.filter((submission) => {
      const matchesQuery =
        !q ||
        [submission.name, submission.email, submission.company, submission.service, submission.message]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesQuery && (!status || submission.status === status);
    });
  }, [query, status, submissions]);

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search submissions..." />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">All statuses</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Service</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((submission) => (
              <tr key={submission.id}>
                <td>
                  <strong>{submission.name}</strong>
                  <span>{submission.email}</span>
                </td>
                <td><span className={`status-pill ${submission.status}`}>{submission.status}</span></td>
                <td>{submission.service || submission.type}</td>
                <td>{formatDate(submission.createdAt)}</td>
                <td>
                  <div className="admin-actions">
                    <Link href={`/admin/submissions/${submission.id}`}>View</Link>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr><td colSpan={5}>No submissions found.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
