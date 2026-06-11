import { HtmlContent } from "@/components/HtmlContent";
import { homeHtml } from "@/lib/pageContent";

const servicesMarker = "<!-- ═══ SERVICES ═══ -->";

export function About() {
  
  return <HtmlContent html={homeHtml.split(servicesMarker)[0]} />;
}
