"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useTransition } from "react";

type BlogFiltersProps = {
  categories: string[];
  tags: string[];
};

export function BlogFilters({ categories, tags }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function update(name: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(name, value);
    else next.delete(name);
    next.delete("page");
    startTransition(() => router.push(`/blogs?${next.toString()}`));
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    update("q", String(data.get("q") || "").trim());
  }

  return (
    <div className="blog-filters" aria-busy={pending}>
      <form onSubmit={onSearch} className="blog-search">
        <input
          name="q"
          type="search"
          placeholder="Search articles..."
          defaultValue={searchParams.get("q") || ""}
        />
        <button className="btn btn-navy" type="submit">Search</button>
      </form>
      <select value={searchParams.get("category") || ""} onChange={(e) => update("category", e.target.value)}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select value={searchParams.get("tag") || ""} onChange={(e) => update("tag", e.target.value)}>
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
}
