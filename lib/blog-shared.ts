export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogFormInput = Omit<Blog, "id" | "createdAt" | "updatedAt" | "publishedAt"> & {
  publishedAt?: string | null;
};

export type PublicBlog = Blog;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  }

  return [];
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date?: string | Date | null) {
  if (!date) return "Draft";
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Draft";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

export function formatDateTime(date?: string | Date | null) {
  if (!date) return "Draft";
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Draft";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(parsed);
}

export function excerptFromContent(content: string, max = 160) {
  const plain = content.replace(/[#*_>`-]/g, "").replace(/\s+/g, " ").trim();
  return plain.length > max ? `${plain.slice(0, max).trim()}...` : plain;
}
