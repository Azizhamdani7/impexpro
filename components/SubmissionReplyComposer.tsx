"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SubmissionReplyComposerProps = {
  id: string;
  defaultSubject: string;
};

export function SubmissionReplyComposer({ id, defaultSubject }: SubmissionReplyComposerProps) {
  const router = useRouter();
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setNotice("");

    const response = await fetch(`/api/admin/submissions/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setNotice(data.error || "Reply could not be sent.");
      return;
    }

    setStatus("sent");
    setNotice("Reply sent and saved to the conversation.");
    setMessage("");
    router.refresh();
  }

  return (
    <form className="admin-reply-form" onSubmit={submit}>
      {notice ? (
        <div className={`form-msg ${status === "sent" ? "success" : "error"}`}>
          {notice}
        </div>
      ) : null}
      <div className="form-group">
        <label htmlFor="replySubject">Subject</label>
        <input
          id="replySubject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="replyMessage">Reply Message</label>
        <textarea
          id="replyMessage"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a professional reply to this inquiry..."
          required
        />
      </div>
      <button type="submit" className="form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending Reply..." : "Send Reply"}
      </button>
    </form>
  );
}
