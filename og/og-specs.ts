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
    id: 'holiday-ovi-enforcement-hero',
    route: '/blog/holiday-ovi-enforcement-ohio-delaware-dublin-columbus',
    model: 'fal-ai/recraft-v3',
    prompt: `Editorial photograph, winter night scene on a rural Ohio highway.
      Shallow depth of field focusing on wet asphalt reflecting amber streetlight.
      Police vehicle visible but intentionally out of focus in deep background,
      creating tension without alarm. Color palette: deep blue-black shadows,
      warm amber highlights (#E8A33C), muted forest green undertones (#2F5F4F).
      Mood: contemplative, serious, not sensationalized.
      Style: documentary photography, 35mm film grain, cinematic aspect ratio 21:9.
      No visible faces, no explicit police confrontation, no flashing lights.`,
    negative_prompt: 'cartoon, illustration, stock photo aesthetic, bright red and blue police lights, dramatic action, accident scene, mugshot, handcuffs visible, sensationalized',
    style: 'realistic_image',
    aspect_ratio: '21:9',
    strength: 0.85
  },
  {
    id: 'enforcement-timeline-2024',
    model: 'fal-ai/recraft-v3',
    prompt: `Minimal infographic timeline, horizontal format.
      Left side: "Dec 20" in bold sans-serif.
      Right side: "Jan 1" in bold sans-serif.
      Connecting element: elegant gradient line transitioning from forest green (#2F5F4F) to mango gold (#E8A33C).
      Small badge above line reading "SATURATION BLITZ".
      Background: warm off-white (#FAF9F7).
      Style: clean editorial design, Bloomberg/Economist data visualization aesthetic.
      No decorative elements, no 3D effects, no drop shadows.`,
    style: 'digital_illustration',
    aspect_ratio: '16:5'
  },
  {
    id: 'ovi-signs-checklist',
    model: 'fal-ai/recraft-v3',
    prompt: `Editorial illustration of a clipboard or notepad showing a partial checklist.
      Visible items in handwritten-style font: "Erratic lane changes", "Speed variation", "Delayed responses".
      Partial items fading at bottom suggesting more.
      Color palette: off-white paper (#FAF9F7), forest green ink (#2F5F4F),
      one item highlighted with mango gold marker stroke (#E8A33C).
      Style: sophisticated sketch illustration, New Yorker magazine aesthetic.
      Subtle paper texture, slight rotation for organic feel.
      No cartoon elements, no clip art style.`,
    style: 'digital_illustration',
    aspect_ratio: '4:5'
  },
  {
    id: 'ovi-penalty-comparison',
    model: 'fal-ai/recraft-v3',
    prompt: `Split-panel editorial infographic comparing two scenarios.
      Left panel: Dark/serious tone, header "First OVI Conviction".
      Key figures: "$1,500+ fines", "3 days – 6 months jail", "1-3 year license suspension".
      Right panel: Darker/more serious, header "Second OVI Conviction".
      Key figures: "$2,500+ fines", "10 days – 6 months jail", "1-7 year suspension".
      Design: clean data visualization style, minimal iconography.
      Color coding: Left uses mango gold (#E8A33C) accents, Right uses deeper amber.
      Background: brand black (#0A0A0A) with off-white (#FAF9F7) text.
      Typography: modern sans-serif, clear hierarchy.
      Style: Bloomberg Terminal / financial data aesthetic.`,
    style: 'digital_illustration',
    aspect_ratio: '16:9'
  },
  {
    id: 'checkpoint-map-illustration',
    model: 'fal-ai/recraft-v3',
    prompt: `Stylized map of Central Ohio showing Delaware, Dublin, Columbus area.
      Subtle topographic line pattern in background.
      Key highways (I-71, US-23, US-36) marked with thin lines.
      Small checkpoint icons (simple circles) at key intersections.
      Color palette: off-white base (#FAF9F7), forest green lines (#2F5F4F),
      mango gold accent points (#E8A33C).
      Style: editorial cartography, Monocle magazine aesthetic.
      No photorealistic elements, clean vector style.`,
    style: 'digital_illustration',
    aspect_ratio: '4:3'
  },
  {
    id: 'breathalyzer-scene',
    model: 'fal-ai/flux-pro',
    prompt: `Documentary-style photograph of a breathalyzer device on a neutral surface.
      Dramatic side lighting creating long shadows.
      Shallow depth of field, device slightly out of focus.
      Color grading: desaturated, cold blue-gray tones with warm amber highlight.
      Mood: serious, clinical, not sensationalized.
      No hands, no faces, no police uniforms visible.
      Style: evidence photography aesthetic, film grain.`,
    style: 'realistic_image',
    aspect_ratio: '3:2'
  },
  {
    id: 'courthouse-steps',
    model: 'fal-ai/flux-pro',
    prompt: `Photograph of Delaware County Courthouse exterior, Ohio.
      Early morning light, long shadows across stone steps.
      No people visible, focus on architecture.
      Color palette: warm stone tones, deep green foliage,
      mango-gold morning light (#E8A33C) catching edges.
      Style: architectural photography, medium format film aesthetic.
      Conveys gravitas and hope simultaneously.`,
    style: 'realistic_image',
    aspect_ratio: '16:9'
  }
];
