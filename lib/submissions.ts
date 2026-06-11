import { randomUUID } from "node:crypto";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";

export type SubmissionStatus = "unread" | "read" | "replied";

export type SubmissionThreadItem = {
  id: string;
  type: "incoming" | "outgoing";
  from: "customer" | "admin";
  to: "admin" | string;
  subject: string;
  body: string;
  createdAt: string;
  deliveryStatus?: "sent" | "failed";
};

export type ContactSubmission = {
  id: string;
  type: string;
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

const SUBMISSIONS_FILE = "submissions.json";
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
      type: "incoming",
      from: "customer",
      to: "admin",
      subject: defaultReplySubject(submission).replace(/^Re:\s*/i, ""),
      body: submission.message,
      createdAt: submission.createdAt
    }
  ];
}

export async function getSubmissions() {
  const submissions = await readJsonFile<ContactSubmission[]>(SUBMISSIONS_FILE, []);
  return submissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

async function saveSubmissions(submissions: ContactSubmission[]) {
  await writeJsonFile(SUBMISSIONS_FILE, submissions);
}

export async function getSubmission(id: string) {
  const submissions = await getSubmissions();
  return submissions.find((submission) => submission.id === id) || null;
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

  const submissions = await getSubmissions();
  const duplicate = submissions.find(
    (submission) =>
      submission.email.toLowerCase() === email &&
      submission.message === message &&
      nowMs - new Date(submission.createdAt).getTime() < DUPLICATE_WINDOW_MS
  );
  if (duplicate) {
    return { ok: false as const, errors: { form: "This message was already submitted recently." } };
  }

  const now = new Date().toISOString();
  const submission: ContactSubmission = {
    id: randomUUID(),
    type: clean(input.type, 80) || "contact",
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
        type: "incoming",
        from: "customer",
        to: "admin",
        subject: defaultReplySubject({
          id: "",
          type: clean(input.type, 80) || "contact",
          name: clean(input.name, 180),
          email,
          message,
          service: clean(input.service, 180) || undefined,
          status: "unread",
          createdAt: now,
          updatedAt: now
        }),
        body: message,
        createdAt: now
      }
    ]
  };

  await saveSubmissions([submission, ...submissions]);
  recentSubmissions.set(key, nowMs);
  return { ok: true as const, submission };
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);
  if (index < 0) return null;
  submissions[index] = { ...submissions[index], status, updatedAt: new Date().toISOString() };
  await saveSubmissions(submissions);
  return submissions[index];
}

export async function addSubmissionReply(id: string, reply: { subject: string; body: string }) {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);
  if (index < 0) return null;

  const now = new Date().toISOString();
  const existing = submissions[index];
  const thread = normalizeSubmissionThread(existing);
  const updated: ContactSubmission = {
    ...existing,
    status: "replied",
    updatedAt: now,
    thread: [
      ...thread,
      {
        id: randomUUID(),
        type: "outgoing",
        from: "admin",
        to: existing.email,
        subject: clean(reply.subject, 240) || defaultReplySubject(existing),
        body: clean(reply.body, 8000),
        createdAt: now,
        deliveryStatus: "sent"
      }
    ]
  };

  submissions[index] = updated;
  await saveSubmissions(submissions);
  return updated;
}

export async function deleteSubmission(id: string) {
  const submissions = await getSubmissions();
  const next = submissions.filter((submission) => submission.id !== id);
  if (next.length === submissions.length) return false;
  await saveSubmissions(next);
  return true;
}
