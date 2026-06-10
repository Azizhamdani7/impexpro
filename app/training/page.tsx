import type { Metadata } from "next";
import { HtmlContent } from "@/components/HtmlContent";
import { trainingHtml } from "@/lib/pageContent";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata.training;

export default function TrainingPage() {
  return <HtmlContent html={trainingHtml} />;
}
