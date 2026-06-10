import type { Metadata } from "next";
import Link from "next/link";
import { AdminChrome } from "@/components/AdminChrome";
import { BlogEditor } from "@/components/BlogEditor";

export const metadata: Metadata = {
  title: "Create Blog | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

export default function NewBlogPage() {
  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Editor</span>
          <h1>Create Blog</h1>
        </div>
        <Link href="/admin/blogs" className="btn btn-outline-gold">Back to Blogs</Link>
      </div>
      <BlogEditor />
    </AdminChrome>
  );
}
