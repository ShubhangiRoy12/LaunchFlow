import { NextResponse } from "next/server";
import { generateVeoVideo } from "@/services/video/veo.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const result = await generateVeoVideo(prompt);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const quotaLimited = /429|RESOURCE_EXHAUSTED/i.test(message);
    return NextResponse.json(
      { error: quotaLimited ? "The video provider's generation limit has been reached. Please try again later or explore the sample videos." : "Video generation is temporarily unavailable. Please explore the sample videos or try again later." },
      { status: quotaLimited ? 429 : 503 },
    );
  }
}
