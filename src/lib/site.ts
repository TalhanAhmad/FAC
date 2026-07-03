export const siteConfig = {
  name: "Food Allergy Certified",
  tagline: "The standard of care starts here.",
  email: "info@foodallergycertified.com",
  url: "https://foodallergycertified.com",
};

export type NavLink = {
  label: string;
  href: string;
  /** Highlighted (pink) in the design, e.g. the Blog link. */
  accent?: boolean;
};

export const mainNav: NavLink[] = [
  { label: "For Directors", href: "/for-directors" },
  { label: "For Parents", href: "/for-parents" },
  { label: "Certification", href: "/certification" },
  { label: "Amber's Story", href: "/ambers-story" },
  { label: "Directory", href: "/directory" },
  { label: "Blog", href: "/blog", accent: true },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "For Directors", href: "/for-directors" },
    { label: "For Parents", href: "/for-parents" },
    { label: "The Certification", href: "/certification" },
    { label: "Amber's Story", href: "/ambers-story" },
  ],
  freeResources: [
    { label: "Allergy Statistics", href: "/#stats" },
    { label: "Safety Guidelines", href: "/certification#process" },
    { label: "Certification Process", href: "/certification#process" },
  ],
};

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/foodallergycertified", icon: "facebook" },
  { label: "TikTok", href: "https://www.tiktok.com/@foodallergycertified", icon: "tiktok" },
  { label: "Instagram", href: "https://www.instagram.com/foodallergycertified", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/food-allergy-certified/", icon: "linkedin" },
] as const;
