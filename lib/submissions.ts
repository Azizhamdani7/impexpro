import { randomUUID } from "node:crypto";
import { getSubmissionsCollection } from "@/lib/mongodb";

export type SubmissionStatus = "unread" | "read" | "replied";

export type SubmissionThreadItem = {
  id: string;
  direction: "incoming" | "outgoing";
  from?: string;
  to?: string;
  subject?: string;
  message: string;
  createdAt: string;
  deliveryStatus?: "sent" | "failed";
};

export type ContactSubmission = {
  id: string;
  formType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  trade?: string;
  message: string;
  sourcePage?: string;
  userAgent?: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  thread?: SubmissionThreadItem[];
};

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const DUPLICATE_WINDOW_MS = 10 * 60_000;

function clean(value: unknown, max = 1000) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

function emailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidEmail(email: string) {
  return emailValid(email);
}

export function defaultReplySubject(submission: ContactSubmission) {
  const service = submission.service ? ` - ${submission.service}` : "";
  return `Re: Your Impex-Pro Inquiry${service}`;
}

export function normalizeSubmissionThread(submission: ContactSubmission): SubmissionThreadItem[] {
  if (Array.isArray(submission.thread) && submission.thread.length) {
    return [...submission.thread].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return [
    {
      id: `${submission.id}-incoming`,
      direction: "incoming",
      from: "customer",
      to: "admin",
      subject: defaultReplySubject(submission).replace(/^Re:\s*/i, ""),
      message: submission.message,
      createdAt: submission.createdAt
    }
  ];
}

export async function getSubmissions() {
  const collection = await getSubmissionsCollection();
  return collection.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getSubmission(id: string) {
  const collection = await getSubmissionsCollection();
  return collection.findOne({ id });
}

export async function createSubmission(input: Record<string, unknown>, userAgent?: string) {
  const nowMs = Date.now();
  const email = clean(input.email, 180).toLowerCase();
  const message = clean(input.message, 5000);
  const honeypot = clean(input.website, 200);
  const key = `${email}:${message.slice(0, 120)}`;
  const last = recentSubmissions.get(key);
  const errors: Record<string, string> = {};

  if (honeypot) errors.form = "Submission rejected.";
  if (last && nowMs - last < RATE_LIMIT_WINDOW_MS) errors.form = "Please wait a moment before submitting again.";
  if (!clean(input.name, 180)) errors.name = "Name is required.";
  if (!email || !emailValid(email)) errors.email = "A valid email is required.";
  if (!message) errors.message = "Message is required.";

  if (Object.keys(errors).length) {
    return { ok: false as const, errors };
  }

  const collection = await getSubmissionsCollection();
  const duplicateSince = new Date(nowMs - DUPLICATE_WINDOW_MS).toISOString();
  const duplicate = await collection.findOne({
    email,
    message,
    createdAt: { $gte: duplicateSince }
  });
  if (duplicate) {
    return { ok: false as const, errors: { form: "This message was already submitted recently." } };
  }

  const now = new Date().toISOString();
  const submission: ContactSubmission = {
    id: randomUUID(),
    formType: clean(input.type, 80) || "contact",
    name: clean(input.name, 180),
    email,
    phone: clean(input.phone, 80) || undefined,
    company: clean(input.company, 180) || undefined,
    service: clean(input.service, 180) || undefined,
    trade: clean(input.trade, 180) || undefined,
    message,
    sourcePage: clean(input.sourcePage, 500) || undefined,
    userAgent,
    status: "unread",
    createdAt: now,
    updatedAt: now,
    thread: [
      {
        id: randomUUID(),
        direction: "incoming",
        from: "customer",
        to: "admin",
        subject: defaultReplySubject({
          id: "",
          formType: clean(input.type, 80) || "contact",
          name: clean(input.name, 180),
          email,
          message,
          service: clean(input.service, 180) || undefined,
          status: "unread",
          createdAt: now,
          updatedAt: now
        }),
        message,
        createdAt: now
      }
    ]
  };

  await collection.insertOne(submission);
  recentSubmissions.set(key, nowMs);
  return { ok: true as const, submission };
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  const collection = await getSubmissionsCollection();
  const updatedAt = new Date().toISOString();
  const result = await collection.findOneAndUpdate(
    { id },
    { $set: { status, updatedAt } },
    { returnDocument: "after" }
  );
  return result;
}

export async function addSubmissionReply(id: string, reply: { subject: string; body: string }) {
  const collection = await getSubmissionsCollection();
  const existing = await collection.findOne({ id });
  if (!existing) return null;
  const now = new Date().toISOString();
  const thread = normalizeSubmissionThread(existing);
  const updated: ContactSubmission = {
    ...existing,
    status: "replied",
    updatedAt: now,
    thread: [
      ...thread,
      {
        id: randomUUID(),
        direction: "outgoing",
        from: "admin",
        to: existing.email,
        subject: clean(reply.subject, 240) || defaultReplySubject(existing),
        message: clean(reply.body, 8000),
        createdAt: now,
        deliveryStatus: "sent"
      }
    ]
  };

  await collection.updateOne({ id }, { $set: updated });
  return updated;
}

export async function deleteSubmission(id: string) {
  const collection = await getSubmissionsCollection();
  const result = await collection.deleteOne({ id });
  return result.deletedCount > 0;
}
