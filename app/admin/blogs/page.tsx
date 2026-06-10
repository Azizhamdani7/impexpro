import type { Metadata } from "next";
import { AdminBlogsTable } from "@/components/AdminBlogsTable";
import { AdminChrome } from "@/components/AdminChrome";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Blogs | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Content</span>
          <h1>Manage Blogs</h1>
        </div>
      </div>
      <AdminBlogsTable blogs={blogs} />
    </AdminChrome>
  );
}
