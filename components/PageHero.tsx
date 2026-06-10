import Link from "next/link";
import type React from "react";

type PageHeroProps = {
  title: React.ReactNode;
  page: string;
  description: string;
};

export function PageHero({ title, page, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg-pattern" />
      <div className="page-hero-glow" />
      <div className="page-hero-content">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>{page}</span>
        </nav>
        <div className="section-tag">Impex-Pro Business Consultant</div>
        <h1>{title}</h1>
        <p className="page-hero-desc">{description}</p>
      </div>
    </section>
  );
}
