import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";
import { createSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const result = await createSubmission(body, request.headers.get("user-agent") || undefined);

    if (!result.ok) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    try {
      await sendContactEmail(result.submission);
    } catch (error) {
      console.error("[contact-email]", error);
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you. Your message has been sent successfully."
    });
  } catch (error) {
    console.error("[contact-submit]", error);
    return NextResponse.json({ error: "We could not send your message right now." }, { status: 500 });
  }
}
