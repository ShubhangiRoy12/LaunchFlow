export type ProductKind =
  | "saas"
  | "mobile-app"
  | "website"
  | "physical"
  | "commercial"
  | "ecommerce"
  | "creator"
  | "other";

export type ReferenceLink = {
  type: "website" | "figma" | "youtube" | "logo" | "assets";
  value: string;
};

export type LaunchInput = {
  founderName: string;
  productName: string;
  productKind: ProductKind;
  launchGoal: string;
  audience: string;
  prompt: string;
  websiteUrl: string;
  figmaUrl: string;
  youtubeUrl: string;
  logoName: string;
  brandColors: string;
  emotionalTone: string;
  includePresenter: boolean;
  includeCinematicProduct: boolean;
  includeWebsiteWalkthrough: boolean;
  references: ReferenceLink[];
};

export type LaunchScene = {
  id: number;
  label: string;
  duration: string;
  voiceover: string;
  visual: string;
  emotion: string;
  motion: string;
  color: string;
};

export type LaunchBlueprint = {
  input: LaunchInput;
  analysis: {
    category: string;
    audience: string;
    strategy: string;
    tone: string;
    platforms: string[];
    colors: string[];
    referenceSummary: string;
  };
  creativeBrief: string;
  scenes: LaunchScene[];
  motionStyles: string[];
  previewImage: string;
};

export type RenderRecord = {
  id: string;
  dateKey: string;
  used: number;
  limit: number;
  isAdmin: boolean;
};

export const EMPTY_INPUT: LaunchInput = {
  founderName: "",
  productName: "",
  productKind: "saas",
  launchGoal: "Product launch",
  audience: "",
  prompt: "",
  websiteUrl: "",
  figmaUrl: "",
  youtubeUrl: "",
  logoName: "",
  brandColors: "",
  emotionalTone: "Excited, confident and emotional",
  includePresenter: true,
  includeCinematicProduct: true,
  includeWebsiteWalkthrough: true,
  references: [],
};

export const PRODUCT_KIND_LABELS: Record<ProductKind, string> = {
  saas: "SaaS / AI tool",
  "mobile-app": "Mobile app",
  website: "Website or landing page",
  physical: "Physical product",
  commercial: "Commercial / service",
  ecommerce: "E-commerce store",
  creator: "Creator brand",
  other: "Other launch",
};

export const STORAGE_KEYS = {
  input: "launchflow.input",
  blueprint: "launchflow.blueprint",
  renders: "launchflow.renders",
  admin: "launchflow.admin",
};

export function buildReferences(input: LaunchInput): ReferenceLink[] {
  return [
    input.websiteUrl ? { type: "website", value: input.websiteUrl } : null,
    input.figmaUrl ? { type: "figma", value: input.figmaUrl } : null,
    input.youtubeUrl ? { type: "youtube", value: input.youtubeUrl } : null,
    input.logoName ? { type: "logo", value: input.logoName } : null,
  ].filter(Boolean) as ReferenceLink[];
}

export function createBlueprint(input: LaunchInput): LaunchBlueprint {
  const productName = input.productName || inferProductName(input.prompt) || "Your Product";
  const kind = PRODUCT_KIND_LABELS[input.productKind];
  const colors = parseColors(input.brandColors);
  const audience = input.audience || audienceFor(input.productKind);
  const referenceSummary = input.references.length
    ? input.references.map((ref) => `${ref.type}: ${ref.value}`).join(" | ")
    : "No optional references added yet.";

  const scenes: LaunchScene[] = [
    {
      id: 1,
      label: "Hook",
      duration: "0:04",
      voiceover: `${input.founderName ? `${input.founderName} built` : "You built"} something people should notice.`,
      visual: input.includePresenter
        ? "A founder or presenter opens on camera with a strong one-line promise."
        : "A bold kinetic typography hook lands over a premium gradient stage.",
      emotion: "Curious",
      motion: "Fast push-in with text pulse",
      color: colors[0],
    },
    {
      id: 2,
      label: "Problem",
      duration: "0:06",
      voiceover: `But explaining why ${productName} matters can take too long.`,
      visual: "Messy tasks, tabs, notes and decisions collapse into one clean path.",
      emotion: "Relatable",
      motion: "Quick cuts into smooth wipe",
      color: colors[1],
    },
    {
      id: 3,
      label: "Cinematic Reveal",
      duration: "0:05",
      voiceover: `Meet ${productName}.`,
      visual: input.includeCinematicProduct
        ? cinematicVisualFor(input.productKind, productName)
        : "The product name forms from animated particles and clean UI cards.",
      emotion: "Excited",
      motion: "Hero reveal, parallax light sweep",
      color: colors[2],
    },
    {
      id: 4,
      label: "Proof",
      duration: "0:08",
      voiceover: `Built for ${audience}, with a launch story that feels clear, premium and ready to share.`,
      visual: input.includeWebsiteWalkthrough
        ? "Website or app screens zoom through key features with cursor-guided motion."
        : "Benefit cards, product closeups and social proof move in sync with narration.",
      emotion: "Confident",
      motion: "UI flow zoom and staggered cards",
      color: colors[3],
    },
    {
      id: 5,
      label: "Emotional Payoff",
      duration: "0:06",
      voiceover: `The result feels ${input.emotionalTone.toLowerCase()}.`,
      visual: payoffVisualFor(input.productKind),
      emotion: "Inspiring",
      motion: "Slow-motion product moment into bright lift",
      color: colors[4],
    },
    {
      id: 6,
      label: "CTA",
      duration: "0:04",
      voiceover: `${productName}. Launch with momentum.`,
      visual: "Logo lockup, URL, platform export badges and final call-to-action.",
      emotion: "Energetic",
      motion: "Clean logo resolve",
      color: colors[0],
    },
  ];

  const creativeBrief = [
    `Create a 35-second launch video for ${productName}, a ${kind}.`,
    `Mandatory user prompt: ${input.prompt || "Explain the product clearly and make the launch feel premium."}`,
    `Audience: ${audience}. Goal: ${input.launchGoal}.`,
    `Tone: ${input.emotionalTone}.`,
    `References to consider: ${referenceSummary}`,
    `Storyboard direction: ${scenes.map((scene) => `${scene.label} - ${scene.visual}`).join(" ")}`,
    "Motion design: premium launch film, cinematic product reveals, UI zooms, kinetic text, natural human moments, clean typography and export-ready pacing.",
  ].join("\n\n");

  return {
    input: { ...input, productName, audience, references: buildReferences(input) },
    analysis: {
      category: kind,
      audience,
      strategy: strategyFor(input.productKind),
      tone: input.emotionalTone,
      platforms: ["YouTube", "LinkedIn", "Instagram Reels", "Product Hunt"],
      colors,
      referenceSummary,
    },
    creativeBrief,
    scenes,
    motionStyles: ["Google Flow UI zooms", "Cinematic product reveal", "Kinetic typography", "Human presenter cuts"],
    previewImage: makePreviewImage(productName, kind, colors),
  };
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getRenderRecord(isAdmin: boolean, existing?: RenderRecord): RenderRecord {
  const key = todayKey();
  if (!existing || existing.dateKey !== key) {
    return { id: crypto.randomUUID(), dateKey: key, used: 0, limit: isAdmin ? 999 : 3, isAdmin };
  }
  return { ...existing, limit: isAdmin ? 999 : 3, isAdmin };
}

function inferProductName(prompt: string) {
  const match = prompt.match(/(?:called|named|for)\s+([A-Z][A-Za-z0-9 ]{2,28})/);
  return match?.[1]?.trim();
}

function audienceFor(kind: ProductKind) {
  const map: Record<ProductKind, string> = {
    saas: "founders, operators and growth teams",
    "mobile-app": "mobile-first users and early adopters",
    website: "website visitors and online buyers",
    physical: "lifestyle buyers and retail customers",
    commercial: "local customers and business buyers",
    ecommerce: "online shoppers and brand fans",
    creator: "fans, subscribers and community members",
    other: "early customers and launch followers",
  };
  return map[kind];
}

function strategyFor(kind: ProductKind) {
  if (kind === "physical") return "Sensory storytelling with cinematic closeups and lifestyle proof.";
  if (kind === "website") return "UI-led walkthrough with benefits, trust and conversion moments.";
  if (kind === "commercial") return "Human-led explanation with service outcomes and local credibility.";
  if (kind === "ecommerce") return "Product desire, offer clarity and social-ready variants.";
  return "Problem-solution launch narrative with premium product-led proof.";
}

function cinematicVisualFor(kind: ProductKind, productName: string) {
  if (kind === "physical") return `${productName} rotates in a studio hero shot with ingredients, materials or details bursting around it.`;
  if (kind === "ecommerce") return "Product tiles float into a polished storefront with offer badges and customer moments.";
  if (kind === "website" || kind === "saas" || kind === "mobile-app") return "Screens flow through a Google-style motion path with cursor zooms and feature callouts.";
  return "Brand, product and customer outcome appear in a cinematic reveal sequence.";
}

function payoffVisualFor(kind: ProductKind) {
  if (kind === "physical") return "People use the product in a bright lifestyle scene with a fresh, satisfying reaction.";
  if (kind === "website" || kind === "saas") return "A clean dashboard shows the before and after: chaos becoming clarity.";
  return "Customers move from hesitation to delight while the product promise lands.";
}

function parseColors(raw: string) {
  const found = raw.match(/#[0-9a-fA-F]{6}/g);
  const defaults = ["#7C3AED", "#60A5FA", "#F472B6", "#F59E0B", "#10B981"];
  return [...(found || []), ...defaults].slice(0, 5);
}

function makePreviewImage(productName: string, category: string, colors: string[]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors[0]}"/>
      <stop offset="0.55" stop-color="${colors[1]}"/>
      <stop offset="1" stop-color="${colors[2]}"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="30" stdDeviation="35" flood-opacity="0.25"/></filter>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <circle cx="1030" cy="150" r="210" fill="#fff" opacity="0.18"/>
  <circle cx="180" cy="620" r="260" fill="#fff" opacity="0.14"/>
  <g filter="url(#shadow)">
    <rect x="260" y="160" width="760" height="400" rx="42" fill="#ffffff" opacity="0.92"/>
    <rect x="318" y="225" width="310" height="32" rx="16" fill="${colors[0]}" opacity="0.22"/>
    <rect x="318" y="292" width="500" height="28" rx="14" fill="#111827" opacity="0.12"/>
    <rect x="318" y="346" width="420" height="28" rx="14" fill="#111827" opacity="0.09"/>
    <rect x="318" y="430" width="210" height="58" rx="22" fill="${colors[2]}"/>
    <rect x="700" y="235" width="235" height="250" rx="32" fill="${colors[3]}" opacity="0.28"/>
    <circle cx="818" cy="360" r="62" fill="${colors[4]}" opacity="0.82"/>
  </g>
  <text x="640" y="105" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="700" fill="white">${escapeSvg(productName)}</text>
  <text x="640" y="622" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="500" fill="white" opacity="0.85">${escapeSvg(category)} launch film</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeSvg(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[char] || char));
}
