type HtmlContentProps = {
  html: string;
};

const imageDimensions: Record<string, { width: number; height: number }> = {
  "/images/A large container ship.jpg": { width: 702, height: 1201 },
  "/images/AdobeStock_139828873_Preview.jpeg": { width: 579, height: 1000 },
  "/images/AdobeStock_374091439_Preview (1).jpeg": { width: 1000, height: 404 },
  "/images/Bilal_hafeez.webp": { width: 1110, height: 1280 },
  "/images/Branding_and_Support_Services.webp": { width: 735, height: 980 },
  "/images/Business_Consultancy.webp": { width: 735, height: 509 },
  "/images/Business_Registration.webp": { width: 480, height: 320 },
  "/images/Custome_clearance.webp": { width: 735, height: 700 },
  "/images/Freight_Forwarding___Logistics.webp": { width: 515, height: 382 },
  "/images/Haris_Saleem.webp": { width: 569, height: 720 },
  "/images/Sajid_mehmoo.webp": { width: 708, height: 765 },
  "/images/TCHP port in Vietnam#U2019s HCM City developing into major logistics centre.jpg": {
    width: 710,
    height: 473
  },
  "/images/Tax___Legal_Services.webp": { width: 500, height: 500 },
  "/images/aboutVisual.png": { width: 736, height: 491 },
  "/images/aboutVisual1.png": { width: 736, height: 926 },
  "/images/aboutVisual1.png.jpg": { width: 736, height: 1104 },
  "/images/haris.jpg": { width: 400, height: 425 },
  "/images/logo.png": { width: 500, height: 500 },
  "/images/malik_qasim.webp": { width: 988, height: 1280 },
  "/images/sehrish_sana_khalid.webp": { width: 1152, height: 2048 }
};

function normalizeAttributes(tag: string) {
  let nextTag = tag.replace(/\sloading="lazy"(?=[^>]*\sloading="lazy")/g, "");

  if (!/\sdecoding=/.test(nextTag)) {
    nextTag = nextTag.replace("<img", '<img decoding="async"');
  }

  if (!/\sloading=/.test(nextTag)) {
    nextTag = nextTag.replace("<img", '<img loading="lazy"');
  }

  const src = nextTag.match(/\ssrc="([^"]+)"/)?.[1];
  const dimensions = src ? imageDimensions[src] : undefined;
  if (dimensions) {
    if (!/\swidth=/.test(nextTag)) {
      nextTag = nextTag.replace("<img", `<img width="${dimensions.width}"`);
    }
    if (!/\sheight=/.test(nextTag)) {
      nextTag = nextTag.replace("<img", `<img height="${dimensions.height}"`);
    }
  }

  return nextTag;
}

function enhanceHtml(html: string) {
  return html
    .replace(/<img\b[^>]*>/g, normalizeAttributes)
    .replace(/<a\b(?=[^>]*target="_blank")(?![^>]*\srel=)([^>]*)>/g, '<a rel="noreferrer noopener"$1>');
}

export function HtmlContent({ html }: HtmlContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: enhanceHtml(html) }} />;
}
