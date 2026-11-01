import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/websiteAnalysis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };
    const analysis = await analyzeWebsite(body.url || "");
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to analyze website.",
      },
      { status: 400 },
    );
  }
}
