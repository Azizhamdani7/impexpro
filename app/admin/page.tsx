import type { Metadata } from "next";
import Link from "next/link";
import { AdminChrome } from "@/components/AdminChrome";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

export default async function AdminDashboardPage() {
  const blogs = await getAllBlogs();
  const total = blogs.length;
  const published = blogs.filter((blog) => blog.status === "published").length;
  const drafts = blogs.filter((blog) => blog.status === "draft").length;
  const recent = blogs.slice(0, 5);

  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Dashboard</span>
          <h1>Blog Statistics</h1>
        </div>
        <Link href="/admin/blogs/new" className="btn btn-gold">New Blog</Link>
      </div>
      <section className="admin-stats">
        <div><strong>{total}</strong><span>Total Blogs</span></div>
        <div><strong>{published}</strong><span>Published</span></div>
        <div><strong>{drafts}</strong><span>Drafts</span></div>
      </section>
      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Recent Updates</h2>
          <Link href="/admin/blogs">Manage all</Link>
        </div>
        <div className="admin-recent-list">
          {recent.map((blog) => (
            <Link key={blog.id} href={`/admin/blogs/edit/${blog.id}`}>
              <strong>{blog.title}</strong>
              <span className={`status-pill ${blog.status}`}>{blog.status}</span>
            </Link>
          ))}
          {!recent.length ? <p>No blogs yet. Create your first article to get started.</p> : null}
        </div>
      </section>
    </AdminChrome>
  );
}
