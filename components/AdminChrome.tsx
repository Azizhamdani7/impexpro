"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/blogs/new", label: "New Blog" },
  { href: "/admin/submissions", label: "Submissions" }
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          <span>IP</span>
          <strong>Impex-Pro CMS</strong>
        </Link>
        <nav>
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={logout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
