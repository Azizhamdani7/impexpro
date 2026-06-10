import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Impex-Pro CMS",
  robots: { index: false, follow: false }
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
