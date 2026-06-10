import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminChrome } from "@/components/AdminChrome";
import { SubmissionActions } from "@/components/SubmissionActions";
import { formatDate } from "@/lib/blog-shared";
import { getSubmission } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submission Detail | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SubmissionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getSubmission(id);
  if (!submission) notFound();

  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Inbox</span>
          <h1>{submission.name}</h1>
        </div>
        <Link href="/admin/submissions" className="btn btn-outline-gold">Back to Submissions</Link>
      </div>
      <section className="admin-panel admin-detail">
        <div className="admin-detail-grid">
          <div><strong>Status</strong><span className={`status-pill ${submission.status}`}>{submission.status}</span></div>
          <div><strong>Email</strong><a href={`mailto:${submission.email}`}>{submission.email}</a></div>
          <div><strong>Phone</strong><span>{submission.phone || "-"}</span></div>
          <div><strong>Company</strong><span>{submission.company || "-"}</span></div>
          <div><strong>Service</strong><span>{submission.service || "-"}</span></div>
          <div><strong>Submitted</strong><span>{formatDate(submission.createdAt)}</span></div>
        </div>
        <div className="admin-message-box">{submission.message}</div>
        <SubmissionActions id={submission.id} />
      </section>
    </AdminChrome>
  );
}
