import type { Metadata } from "next";
import { HtmlContent } from "@/components/HtmlContent";
import { servicesHtml } from "@/lib/pageContent";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata.services;

export default function ServicesPage() {
  return <HtmlContent html={servicesHtml} />;
}
