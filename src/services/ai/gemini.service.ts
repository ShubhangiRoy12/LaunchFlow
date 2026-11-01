import { WebsiteAnalysis } from "@/lib/websiteAnalysis";

export type ProductAnalysis = {
  productName: string;
  tagline: string;
  audience: string;
  features: string[];
  storyboard: string[];
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function analyzeProduct(prompt: string, website?: WebsiteAnalysis): Promise<ProductAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in .env.local.");
  }

  const model = process.env.GEMINI_ANALYSIS_MODEL || "gemini-2.5-pro";
  const instruction = buildInstruction(prompt, website);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: instruction }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Gemini request failed: ${message}`);
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  return normalizeProductAnalysis(JSON.parse(extractJson(text)));
}

function buildInstruction(prompt: string, website?: WebsiteAnalysis) {
  return `
You are LaunchFlow AI, a premium product launch creative director.

Analyze the user product and return only valid JSON with this exact shape:
{
  "productName": "string",
  "tagline": "string",
  "audience": "string",
  "features": ["string", "string", "string", "string"],
  "storyboard": ["Hook", "Problem", "Solution", "Features", "CTA"]
}

Rules:
- Keep productName short and presentation-ready.
- Tagline must be clear and launch-video friendly.
- Features must be specific, not generic.
- Storyboard must contain 5-6 short scene names.

User prompt:
${prompt}

Website context:
${website ? JSON.stringify({
    title: website.title,
    description: website.description,
    headings: website.headings,
    content: website.content.slice(0, 3000),
    colors: website.colors,
    screenshot: website.screenshot,
  }) : "No website URL provided."}
`;
}

function extractJson(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first >= 0 && last > first) return trimmed.slice(first, last + 1);
  return trimmed;
}

function normalizeProductAnalysis(value: Partial<ProductAnalysis>): ProductAnalysis {
  return {
    productName: String(value.productName || "LaunchFlow Product").slice(0, 80),
    tagline: String(value.tagline || "Create Launch Videos Instantly").slice(0, 140),
    audience: String(value.audience || "Founders, creators and product teams").slice(0, 160),
    features: Array.isArray(value.features) ? value.features.map(String).slice(0, 6) : [],
    storyboard: Array.isArray(value.storyboard) ? value.storyboard.map(String).slice(0, 6) : ["Hook", "Problem", "Solution", "Features", "CTA"],
  };
}
