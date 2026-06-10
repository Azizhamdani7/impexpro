"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Blog } from "@/lib/blog-shared";
import { formatDate } from "@/lib/blog-shared";

type AdminBlogsTableProps = {
  blogs: Blog[];
};

export function AdminBlogsTable({ blogs }: AdminBlogsTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [deleting, setDeleting] = useState("");

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        [blog.title, blog.excerpt, blog.category, blog.author, blog.slug].join(" ").toLowerCase().includes(q);
      return matchesQuery && (!status || blog.status === status);
    });
  }, [blogs, query, status]);

  async function remove(id: string) {
    if (!window.confirm("Delete this blog permanently?")) return;
    setDeleting(id);
    const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    setDeleting("");
    if (response.ok) router.refresh();
  }

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search blogs..." />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <Link className="btn btn-gold" href="/admin/blogs/new">Create Blog</Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <strong>{blog.title}</strong>
                  <span>{blog.slug}</span>
                </td>
                <td><span className={`status-pill ${blog.status}`}>{blog.status}</span></td>
                <td>{blog.category}</td>
                <td>{formatDate(blog.updatedAt)}</td>
                <td>
                  <div className="admin-actions">
                    {blog.status === "published" ? <Link href={`/blogs/${blog.slug}`}>Preview</Link> : null}
                    <Link href={`/admin/blogs/edit/${blog.id}`}>Edit</Link>
                    <button type="button" onClick={() => remove(blog.id)} disabled={deleting === blog.id}>
                      {deleting === blog.id ? "Deleting" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={5}>No blogs found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
