import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminChrome } from "@/components/AdminChrome";
import { BlogContent } from "@/components/BlogContent";
import { coverImageOrFallback } from "@/lib/images";
import { formatDate, getBlogById, readingTime } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Preview | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

type PreviewBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PreviewBlogPage({ params }: PreviewBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();

  const image = coverImageOrFallback(blog.coverImage);

  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Preview</span>
          <h1>{blog.title}</h1>
        </div>
        <Link href={`/admin/blogs/edit/${blog.id}`} className="btn btn-outline-gold">Back to Editor</Link>
      </div>
      <article className="blog-detail admin-blog-preview">
        <header className="blog-detail-hero">
          <div className="blog-detail-inner">
            <div className="blog-meta">
              <span>{blog.category}</span>
              <span>{formatDate(blog.publishedAt || blog.updatedAt)}</span>
              <span>{readingTime(blog.content)} min read</span>
              <span className={`status-pill ${blog.status}`}>{blog.status}</span>
            </div>
            <h1>{blog.title}</h1>
            <p>{blog.excerpt || "Draft excerpt will appear here before publishing."}</p>
            <div className="blog-author">By {blog.author}</div>
          </div>
        </header>
        <div className="blog-cover">
          <Image src={image} alt={blog.title} fill sizes="100vw" priority />
        </div>
        <section className="blog-detail-body">
          <div />
          <div>
            {blog.content ? (
              <BlogContent content={blog.content} />
            ) : (
              <div className="admin-message-box">Draft content has not been added yet.</div>
            )}
          </div>
        </section>
      </article>
    </AdminChrome>
  );
}
