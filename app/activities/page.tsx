import type { Metadata } from "next";
import { HtmlContent } from "@/components/HtmlContent";
import { activitiesHtml } from "@/lib/pageContent";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata.activities;

export default function ActivitiesPage() {
  return <HtmlContent html={activitiesHtml} />;
}
