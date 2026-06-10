import type { Metadata } from "next";
import { AdminChrome } from "@/components/AdminChrome";
import { AdminSubmissionsTable } from "@/components/AdminSubmissionsTable";
import { getSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submissions | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <AdminChrome>
      <div className="admin-page-head">
        <div>
          <span>Inbox</span>
          <h1>Form Submissions</h1>
        </div>
      </div>
      <AdminSubmissionsTable submissions={submissions} />
    </AdminChrome>
  );
}
