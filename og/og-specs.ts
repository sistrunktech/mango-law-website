export type OgSpec = {
  route: string;
  key: string;
  prompt: string;
  width?: number;
  height?: number;
};

// Core pages for OG/hero generation. Tweak prompts as needed.
export const OG_SPECS: OgSpec[] = [
  {
    route: "/",
    key: "home",
    prompt:
      "Modern, authoritative criminal defense hero image for Mango Law in Delaware County, Ohio. Courthouse silhouette with warm mango-gold highlights on deep forest background, confident attorney presence, cinematic lighting, high detail, photo-real, 21:9 composition.",
    width: 1600,
    height: 900,
  },
  {
    route: "/criminal-defense-delaware-oh",
    key: "criminal-defense",
    prompt:
      "Criminal defense focus for Delaware County Ohio: courthouse interior, legal documents, scales of justice, warm mango-gold accent lighting on dark forest background, professional and serious tone, photo-real.",
  },
  {
    route: "/ovi-dui-defense-delaware-oh",
    key: "ovi-dui",
    prompt:
      "OVI / DUI defense in Delaware Ohio: blurred roadway at night, subtle police lights, attorney reviewing case file, warm mango-gold rim light, deep forest palette, photo-real, no faces.",
  },
  {
    route: "/drug-crime-lawyer-delaware-oh",
    key: "drug-crimes",
    prompt:
      "Drug crime defense visual: attorney desk with files, law books, subtle scales of justice, warm mango-gold accent light on deep forest background, calm and professional, photo-real.",
  },
  {
    route: "/practice-areas",
    key: "practice-areas",
    prompt:
      "Practice areas overview for a law firm: grid of elegant legal icons, courthouse silhouette, warm mango-gold gradient on dark forest background, clean and modern, photo-real.",
  },
  {
    route: "/contact",
    key: "contact",
    prompt:
      "Contact Mango Law hero: modern law office interior, welcoming front desk, warm mango-gold accent lighting, deep forest background, space for overlay text, photo-real.",
  },
];

// Blog image generation specs for editorial content
export const BLOG_IMAGE_SPECS = [
  {
    id: "holiday-ovi-enforcement-hero",
    route: "/blog/holiday-ovi-enforcement-ohio-delaware-dublin-columbus",
    model: "fal-ai/recraft-v3",
    prompt: `Editorial photograph, winter night scene on a rural Ohio highway.
      Shallow depth of field focusing on wet asphalt reflecting amber streetlight.
      Police vehicle visible but intentionally out of focus in deep background,
      creating tension without alarm. Color palette: deep blue-black shadows,
      warm amber highlights (#E8A33C), muted forest green undertones (#2F5F4F).
      Mood: contemplative, serious, not sensationalized.
      Style: documentary photography, 35mm film grain, cinematic aspect ratio 21:9.
      No visible faces, no explicit police confrontation, no flashing lights.`,
    negative_prompt: "cartoon, illustration, stock photo aesthetic, bright red and blue police lights, dramatic action, accident scene, mugshot, handcuffs visible, sensationalized",
    style: "realistic_image",
    aspect_ratio: "21:9",
    strength: 0.85,
  },
  // Add 6 more image specs here (enforcement-timeline, ovi-signs-checklist, etc.)
];
