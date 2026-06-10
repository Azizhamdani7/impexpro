import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogContent } from "@/components/BlogContent";
import { formatDate, getPublishedBlogBySlug, getRelatedBlogs, readingTime } from "@/lib/blogs";
import { coverImageOrFallback } from "@/lib/images";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) return {};

  const title = blog.metaTitle || `${blog.title} | Impex-Pro Blog`;
  const description = blog.metaDescription || blog.excerpt;
  const url = blog.canonicalUrl || `${site.url}/blogs/${blog.slug}`;
  const image = coverImageOrFallback(blog.coverImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: blog.publishedAt || undefined,
      authors: [blog.author],
      tags: blog.tags,
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) notFound();

  const related = await getRelatedBlogs(blog);
  const url = blog.canonicalUrl || `${site.url}/blogs/${blog.slug}`;
  const image = coverImageOrFallback(blog.coverImage);

  return (
    <>
      <article className="blog-detail">
        <header className="blog-detail-hero">
          <div className="page-hero-bg-pattern" />
          <div className="blog-detail-inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <Link href="/blogs">Blogs</Link>
              <span className="breadcrumb-sep">›</span>
              <span>{blog.category}</span>
            </nav>
            <div className="blog-meta">
              <span>{blog.category}</span>
              <span>{formatDate(blog.publishedAt)}</span>
              <span>{readingTime(blog.content)} min read</span>
            </div>
            <h1>{blog.title}</h1>
            <p>{blog.excerpt}</p>
            <div className="blog-author">By {blog.author}</div>
          </div>
        </header>

        <div className="blog-cover">
          <Image src={image} alt={blog.title} fill sizes="100vw" priority />
        </div>

        <section className="blog-detail-body">
          <aside className="blog-share">
            <span>Share</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">in</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noreferrer">X</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">f</a>
          </aside>
          <div>
            <BlogContent content={blog.content} />
            <div className="blog-tags blog-detail-tags">
              {blog.tags.map((tag) => (
                <Link key={tag} href={`/blogs?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      {related.length ? (
        <section className="section related-blogs">
          <div className="section-tag">Related Articles</div>
          <h2 className="section-title">More <em>Insights</em></h2>
          <div className="blog-grid">
            {related.map((item) => (
              <BlogCard key={item.id} blog={item} />
            ))}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            description: blog.metaDescription || blog.excerpt,
            image,
            author: { "@type": "Person", name: blog.author },
            datePublished: blog.publishedAt || undefined,
            dateModified: blog.updatedAt,
            mainEntityOfPage: url,
            publisher: {
              "@type": "Organization",
              name: site.name,
              logo: `${site.url}/favicon/android-chrome-512x512.png`
            }
          })
        }}
      />
    </>
  );
}
