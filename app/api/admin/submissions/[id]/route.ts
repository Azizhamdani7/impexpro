import { NextResponse } from "next/server";
import { deleteSubmission, getSubmission, updateSubmissionStatus } from "@/lib/submissions";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const submission = await getSubmission(id);
  if (!submission) return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  return NextResponse.json({ submission });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const status = body.status === "read" || body.status === "replied" || body.status === "unread" ? body.status : null;
  if (!status) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  const submission = await updateSubmissionStatus(id, status);
  if (!submission) return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  return NextResponse.json({ submission });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const deleted = await deleteSubmission(id);
  if (!deleted) return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
