import type { Metadata } from "next";
import { HtmlContent } from "@/components/HtmlContent";
import { aboutHtml } from "@/lib/pageContent";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata.about;

export default function AboutPage() {
  return <HtmlContent html={aboutHtml} />;
}
