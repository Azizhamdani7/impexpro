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
  const [updating, setUpdating] = useState("");

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

  async function updateStatus(blog: Blog, nextStatus: "draft" | "published") {
    setUpdating(blog.id);
    const response = await fetch(`/api/admin/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...blog,
        status: nextStatus
      })
    });
    setUpdating("");

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      window.alert(data.errors ? Object.values(data.errors).join("\n") : data.error || "Unable to update blog.");
      return;
    }

    router.refresh();
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
              <th>Published</th>
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
                <td>{formatDate(blog.publishedAt)}</td>
                <td>
                  <div className="admin-actions">
                    <Link href={blog.status === "published" ? `/blogs/${blog.slug}` : `/admin/blogs/preview/${blog.id}`}>
                      Preview
                    </Link>
                    <Link href={`/admin/blogs/edit/${blog.id}`}>Edit</Link>
                    {blog.status === "published" ? (
                      <button type="button" onClick={() => updateStatus(blog, "draft")} disabled={updating === blog.id}>
                        {updating === blog.id ? "Updating" : "Unpublish"}
                      </button>
                    ) : (
                      <button type="button" onClick={() => updateStatus(blog, "published")} disabled={updating === blog.id}>
                        {updating === blog.id ? "Updating" : "Publish"}
                      </button>
                    )}
                    <button className="danger-action" type="button" onClick={() => remove(blog.id)} disabled={deleting === blog.id}>
                      {deleting === blog.id ? "Deleting" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={6}>No blogs found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
