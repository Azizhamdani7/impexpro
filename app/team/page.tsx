import type { Metadata } from "next";
import { HtmlContent } from "@/components/HtmlContent";
import { teamHtml } from "@/lib/pageContent";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata.team;

export default function TeamPage() {
  return <HtmlContent html={teamHtml} />;
}
