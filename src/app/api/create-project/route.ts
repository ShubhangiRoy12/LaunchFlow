import { NextResponse } from "next/server";
import { analyzeWebsite, WebsiteAnalysis } from "@/lib/websiteAnalysis";
import { analyzeProduct } from "@/services/ai/gemini.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string; websiteUrl?: string };
    const prompt = body.prompt?.trim();
    if (!prompt) {
      return NextResponse.json({ error: "prompt is required." }, { status: 400 });
    }

    let website: WebsiteAnalysis | undefined;
    if (body.websiteUrl?.trim()) {
      website = await analyzeWebsite(body.websiteUrl);
    }

    const analysis = await analyzeProduct(prompt, website);

    return NextResponse.json({
      ...analysis,
      website,
      remotionProps: {
        productName: analysis.productName,
        tagline: analysis.tagline,
        audience: analysis.audience,
        features: analysis.features,
        storyboard: analysis.storyboard,
        screenshot: website?.screenshot,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create project.",
      },
      { status: 500 },
    );
  }
}
