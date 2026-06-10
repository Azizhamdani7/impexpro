import { NextResponse } from "next/server";
import { deleteBlog, getBlogById, updateBlog } from "@/lib/blogs";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json().catch(() => ({}));
    const result = await updateBlog(id, body);

    if (!result.ok) {
      if ("errors" in result) {
        return NextResponse.json({ errors: result.errors }, { status: 400 });
      }
      return NextResponse.json({ error: result.error }, { status: result.status || 400 });
    }

    return NextResponse.json({ blog: result.blog });
  } catch (error) {
    console.error("[api-admin-blog-put]", error);
    return NextResponse.json({ error: "Unable to update blog." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const deleted = await deleteBlog(id);
    if (!deleted) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api-admin-blog-delete]", error);
    return NextResponse.json({ error: "Unable to delete blog." }, { status: 500 });
  }
}
