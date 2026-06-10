import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BlogCard } from "@/components/BlogCard";
import { BlogFilters } from "@/components/BlogFilters";
import { PageHero } from "@/components/PageHero";
import { BLOG_PAGE_SIZE, getPublishedBlogs } from "@/lib/blogs";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs | Impex-Pro Business Consultant",
  description:
    "Read expert import-export, customs, freight forwarding, business registration, tax, legal, and global trade insights from Impex-Pro."
};

type BlogsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function value(params: Record<string, string | string[] | undefined>, key: string) {
  const item = params[key];
  return Array.isArray(item) ? item[0] || "" : item || "";
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams;
  const q = value(params, "q").toLowerCase();
  const category = value(params, "category");
  const tag = value(params, "tag");
  const page = Math.max(1, Number(value(params, "page") || 1));
  const blogs = await getPublishedBlogs();

  const categories = Array.from(new Set(blogs.map((blog) => blog.category))).sort();
  const tags = Array.from(new Set(blogs.flatMap((blog) => blog.tags))).sort();
  const filtered = blogs.filter((blog) => {
    const searchMatch =
      !q ||
      [blog.title, blog.excerpt, blog.category, blog.author, blog.content, ...blog.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return searchMatch && (!category || blog.category === category) && (!tag || blog.tags.includes(tag));
  });

  const featured = filtered[0];
  const rest = filtered.slice(featured ? 1 : 0);
  const totalPages = Math.max(1, Math.ceil(rest.length / BLOG_PAGE_SIZE));
  const paginated = rest.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

  return (
    <>
      <PageHero
        page="Blogs"
        title={<>Trade Insights &amp; <em>Business Guidance</em></>}
        description="Actionable articles for importers, exporters, startups, and growing businesses navigating global trade."
      />
      <section className="section blog-listing">
        <div className="blog-head">
          <div>
            <div className="section-tag">Knowledge Center</div>
            <h1 className="section-title">Latest <em>Articles</em></h1>
          </div>
          <Link className="btn btn-outline-gold" href="/contact">Ask an Expert</Link>
        </div>

        <Suspense fallback={null}>
          <BlogFilters categories={categories} tags={tags} />
        </Suspense>

        {!featured ? (
          <div className="blog-empty">
            <h2>No published blogs yet.</h2>
            <p>New trade insights will appear here once they are published from the admin dashboard.</p>
          </div>
        ) : (
          <>
            <div className="featured-wrap">
              <BlogCard blog={featured} featured />
            </div>
            <div className="blog-grid">
              {paginated.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            {totalPages > 1 ? (
              <div className="blog-pagination">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const next = new URLSearchParams();
                  if (q) next.set("q", q);
                  if (category) next.set("category", category);
                  if (tag) next.set("tag", tag);
                  next.set("page", String(pageNumber));
                  return (
                    <Link
                      key={pageNumber}
                      className={page === pageNumber ? "active" : ""}
                      href={`/blogs?${next.toString()}`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </>
        )}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Impex-Pro Blog",
            url: `${site.url}/blogs`
          })
        }}
      />
    </>
  );
}
