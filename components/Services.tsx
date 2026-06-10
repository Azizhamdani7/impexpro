import { HtmlContent } from "@/components/HtmlContent";
import { homeHtml } from "@/lib/pageContent";

const servicesMarker = "<!-- ═══ SERVICES ═══ -->";
const whyMarker = "<!-- ═══ WHY CHOOSE ═══ -->";

export function Services() {
  const [, afterServices] = homeHtml.split(servicesMarker);
  const [servicesHtml] = afterServices.split(whyMarker);
  return <HtmlContent html={`${servicesMarker}${servicesHtml}`} />;
}
