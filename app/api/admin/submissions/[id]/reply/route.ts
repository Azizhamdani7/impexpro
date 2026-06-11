import { NextResponse } from "next/server";
import { sendSubmissionReply } from "@/lib/mail";
import {
  addSubmissionReply,
  defaultReplySubject,
  getSubmission,
  isValidEmail
} from "@/lib/submissions";

type Params = {
  params: Promise<{ id: string }>;
};

function clean(value: unknown, max = 8000) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const submission = await getSubmission(id);
    if (!submission) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    if (!submission.email || !isValidEmail(submission.email)) {
      return NextResponse.json({ error: "This submission does not have a valid recipient email." }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const subject = clean(body.subject, 240) || defaultReplySubject(submission);
    const message = clean(body.message);

    if (!message) {
      return NextResponse.json({ error: "Reply message is required." }, { status: 400 });
    }

    const delivery = await sendSubmissionReply(submission, { subject, body: message });

    if (!delivery.sent) {
      return NextResponse.json(
        { error: "Reply email could not be sent because SMTP is not configured." },
        { status: 503 }
      );
    }

    const updated = await addSubmissionReply(id, { subject, body: message });
    return NextResponse.json({ submission: updated });
  } catch (error) {
    console.error("[admin-submission-reply]", error);
    return NextResponse.json({ error: "Reply could not be sent right now." }, { status: 500 });
  }
}
