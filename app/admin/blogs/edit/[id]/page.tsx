import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminChrome } from "@/components/AdminChrome";
import { BlogEditor } from "@/components/BlogEditor";
import { getBlogById } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Blog | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Editor</span>
          <h1>Edit Blog</h1>
        </div>
        <Link href="/admin/blogs" className="btn btn-outline-gold">Back to Blogs</Link>
      </div>
      <BlogEditor blog={blog} />
    </AdminChrome>
  );
}
