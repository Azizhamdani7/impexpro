import { siteConfig } from "@/lib/site-config";

export const site = {
  name: "Impex-Pro Business Consultant",
  brand: "IMPEX-PRO",
  subtitle: "Business Consultant",
  ...siteConfig
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/training", label: "Training" },
  { href: "/blogs", label: "Blogs" },
  { href: "/team", label: "Team" },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" }
];

export const heroSlides = [
  "/images/optimized/heroBg1.webp",
  "/images/optimized/heroBg.webp",
  "/images/optimized/heroBg2.webp",
  "/images/optimized/heroBg3.webp",
  "/images/optimized/heroBg4.webp",
  "/images/optimized/heroBg5.webp",
  "/images/optimized/heroBg6.webp"
];

export const pageMetadata = {
  home: {
    title: "Impex-Pro Business Consultant | One Window Solutions for Global Trade",
    description:
      "Impex-Pro empowers startups, exporters, and businesses with consultancy, customs clearance, freight forwarding, tax, legal, and training services."
  },
  about: {
    title: "About Us | Impex-Pro Business Consultant",
    description:
      "Learn about Impex-Pro Business Consultant, a trusted global trade partner providing one-window support for entrepreneurs, startups, and growing businesses."
  },
  services: {
    title: "Services | Impex-Pro Business Consultant",
    description:
      "Explore Impex-Pro services for customs clearance, freight forwarding, business registration, tax, legal, branding, and trade support."
  },
  training: {
    title: "Training & Development | Impex-Pro Business Consultant",
    description:
      "Practical import-export training, workshops, certifications, and mentorship programs for future traders and professionals."
  },
  team: {
    title: "Our Team | Impex-Pro Business Consultant",
    description:
      "Meet the Impex-Pro experts driving global trade, business consultancy, customs, freight, tax, legal, and training services."
  },
  activities: {
    title: "Activities | Impex-Pro Business Consultant",
    description:
      "Corporate activities, official engagements, events, workshops, and session highlights from Impex-Pro Business Consultant."
  },
  contact: {
    title: "Contact Us | Impex-Pro Business Consultant",
    description:
      "Contact Impex-Pro Business Consultant for trade consultancy, customs clearance, freight forwarding, training, and business support."
  }
};
