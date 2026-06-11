import { NextResponse } from "next/server";
import { createBlog, getAllBlogs } from "@/lib/blogs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase();
  const status = searchParams.get("status");
  const category = searchParams.get("category")?.trim();

  try {
    const blogs = (await getAllBlogs()).filter((blog) => {
      const matchesQuery =
        !q ||
        [blog.title, blog.excerpt, blog.category, blog.author, blog.slug]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return (
        matchesQuery &&
        (status === "draft" || status === "published" || status === "archived" ? blog.status === status : true) &&
        (!category || blog.category === category)
      );
    });
    const counts = {
      total: blogs.length,
      published: blogs.filter((blog) => blog.status === "published").length,
      draft: blogs.filter((blog) => blog.status === "draft").length,
      archived: blogs.filter((blog) => blog.status === "archived").length
    };
    return NextResponse.json({ blogs, counts });
  } catch (error) {
    console.error("[api-admin-blogs-get]", error);
    return NextResponse.json({ error: "Unable to load blogs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await createBlog(body);

    if (!result.ok) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    return NextResponse.json({ blog: result.blog }, { status: 201 });
  } catch (error) {
    console.error("[api-admin-blogs-post]", error);
    return NextResponse.json({ error: "Unable to save blog." }, { status: 500 });
  }
}
