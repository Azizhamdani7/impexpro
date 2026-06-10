import { randomUUID } from "node:crypto";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";
import {
  parseTags,
  slugify,
  type Blog,
  type BlogFormInput,
  type BlogStatus,
  type PublicBlog
} from "@/lib/blog-shared";

export { excerptFromContent, formatDate, parseTags, readingTime, slugify } from "@/lib/blog-shared";
export type { Blog, BlogFormInput, BlogStatus, PublicBlog } from "@/lib/blog-shared";

export const BLOG_PAGE_SIZE = 6;
const BLOGS_FILE = "blogs.json";

function cleanText(value: unknown, max = 5000) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, max);
}

export function validateBlogInput(input: Partial<BlogFormInput>) {
  const errors: Record<string, string> = {};
  const title = cleanText(input.title, 180);
  const slug = slugify(cleanText(input.slug, 200) || title);
  const excerpt = cleanText(input.excerpt, 500);
  const content = cleanText(input.content, 100000);
  const category = cleanText(input.category, 80);
  const author = cleanText(input.author, 120);
  const status: BlogStatus = input.status === "published" ? "published" : "draft";
  const coverImage = cleanText(input.coverImage, 1000) || undefined;
  const metaTitle = cleanText(input.metaTitle, 180) || undefined;
  const metaDescription = cleanText(input.metaDescription, 300) || undefined;
  const canonicalUrl = cleanText(input.canonicalUrl, 1000) || undefined;
  const tags = parseTags(input.tags).slice(0, 20).map((tag) => tag.slice(0, 50));

  if (!title) errors.title = "Title is required.";
  if (!slug) errors.slug = "Slug is required.";
  if (!excerpt) errors.excerpt = "Excerpt is required.";
  if (!content) errors.content = "Content is required.";
  if (!category) errors.category = "Category is required.";
  if (!author) errors.author = "Author is required.";
  if (coverImage && !/^https?:\/\//.test(coverImage) && !coverImage.startsWith("/")) {
    errors.coverImage = "Cover image must be a public URL or a /public path.";
  }
  if (canonicalUrl && !/^https?:\/\//.test(canonicalUrl)) {
    errors.canonicalUrl = "Canonical URL must start with http:// or https://.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      author,
      status,
      metaTitle,
      metaDescription,
      canonicalUrl
    }
  };
}

export async function getAllBlogs() {
  const blogs = await readJsonFile<Blog[]>(BLOGS_FILE, []);
  return blogs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function saveAllBlogs(blogs: Blog[]) {
  await writeJsonFile(BLOGS_FILE, blogs);
}

export async function getPublishedBlogs(): Promise<PublicBlog[]> {
  const blogs = await getAllBlogs();
  return blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );
}

export async function getBlogById(id: string) {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.id === id) || null;
}

export async function getPublishedBlogBySlug(slug: string): Promise<PublicBlog | null> {
  const blogs = await getPublishedBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

export async function getRelatedBlogs(blog: PublicBlog, take = 3): Promise<PublicBlog[]> {
  const blogs = await getPublishedBlogs();
  return blogs
    .filter((item) => item.id !== blog.id)
    .filter((item) => item.category === blog.category || item.tags.some((tag) => blog.tags.includes(tag)))
    .slice(0, take);
}

export async function createBlog(input: Partial<BlogFormInput>) {
  const result = validateBlogInput(input);
  if (!result.ok) return { ok: false as const, errors: result.errors };

  const blogs = await getAllBlogs();
  if (blogs.some((blog) => blog.slug === result.data.slug)) {
    return { ok: false as const, errors: { slug: "This slug is already in use." } };
  }

  const now = new Date().toISOString();
  const blog: Blog = {
    id: randomUUID(),
    ...result.data,
    publishedAt: result.data.status === "published" ? now : null,
    createdAt: now,
    updatedAt: now
  };

  await saveAllBlogs([blog, ...blogs]);
  return { ok: true as const, blog };
}

export async function updateBlog(id: string, input: Partial<BlogFormInput>) {
  const result = validateBlogInput(input);
  if (!result.ok) return { ok: false as const, errors: result.errors };

  const blogs = await getAllBlogs();
  const index = blogs.findIndex((blog) => blog.id === id);
  if (index < 0) return { ok: false as const, status: 404, error: "Blog not found." };
  if (blogs.some((blog) => blog.id !== id && blog.slug === result.data.slug)) {
    return { ok: false as const, errors: { slug: "This slug is already in use." } };
  }

  const existing = blogs[index];
  const now = new Date().toISOString();
  const blog: Blog = {
    ...existing,
    ...result.data,
    publishedAt:
      result.data.status === "published" ? existing.publishedAt || now : null,
    updatedAt: now
  };

  blogs[index] = blog;
  await saveAllBlogs(blogs);
  return { ok: true as const, blog };
}

export async function deleteBlog(id: string) {
  const blogs = await getAllBlogs();
  const next = blogs.filter((blog) => blog.id !== id);
  if (next.length === blogs.length) return false;
  await saveAllBlogs(next);
  return true;
}
