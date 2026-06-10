import { HtmlContent } from "@/components/HtmlContent";
import { homeHtml } from "@/lib/pageContent";

const whyMarker = "<!-- ═══ WHY CHOOSE ═══ -->";

export function HomeRemaining() {
  const [, rest] = homeHtml.split(whyMarker);
  return <HtmlContent html={`${whyMarker}${rest}`} />;
}
