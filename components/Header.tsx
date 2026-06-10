"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href);

  return (
    <>
      <nav className={`navbar nav-enter ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="IMPEX-PRO Logo" width={150} height={55} priority />
          <div className="nav-logo-text">
            <span className="nav-brand">{site.brand}</span>
            <span className="nav-sub">{site.subtitle}</span>
          </div>
        </Link>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={isActive(item.href) ? "active" : ""}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className={`hamburger ${open ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link href="/contact" className="nav-cta">
            Get a Quote
          </Link>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="mob-cta" onClick={() => setOpen(false)}>
          Get a Quote
        </Link>
      </div>
    </>
  );
}
