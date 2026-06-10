import type { MetadataRoute } from "next";
import { getPublishedBlogs, type PublicBlog } from "@/lib/blogs";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/services", "/training", "/team", "/activities", "/contact", "/blogs"];
  let blogs: PublicBlog[] = [];

  try {
    blogs = await getPublishedBlogs();
  } catch (error) {
    console.error("[sitemap]", error);
  }

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.75
    })),
    ...blogs.map((blog: PublicBlog) => ({
      url: `${site.url}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
