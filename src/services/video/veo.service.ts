import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";

export type VeoVideoResult = {
  id: string;
  state: string;
  model: string;
  remoteVideoUrl?: string;
  localVideoUrl?: string;
};

export async function generateVeoVideo(prompt: string): Promise<VeoVideoResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing in .env.local.");

  const model = process.env.VEO_MODEL || "veo-3.1-fast-generate-preview";
  const ai = new GoogleGenAI({ apiKey });

  let operation = await ai.models.generateVideos({
    model,
    prompt,
    config: {
      numberOfVideos: 1,
      aspectRatio: process.env.VEO_ASPECT_RATIO || "16:9",
      durationSeconds: Number(process.env.VEO_DURATION_SECONDS || 8),
      resolution: process.env.VEO_RESOLUTION || "720p",
      negativePrompt:
        "distorted text, unreadable letters, bad typography, low quality, blurry, warped UI, broken product design",
    },
  });

  const maxAttempts = Number(process.env.VEO_POLL_ATTEMPTS || 90);
  const delayMs = Number(process.env.VEO_POLL_DELAY_MS || 10000);

  for (let attempt = 0; attempt < maxAttempts && !operation.done; attempt += 1) {
    await delay(delayMs);
    operation = await ai.operations.getVideosOperation({ operation });
  }

  if (!operation.done) {
    throw new Error(`Veo generation timed out. Operation: ${operation.name || "unknown"}`);
  }

  if (operation.error) {
    throw new Error(`Veo generation failed: ${JSON.stringify(operation.error)}`);
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) {
    throw new Error(`Veo did not return a video URL. Operation: ${operation.name || "unknown"}`);
  }

  const localVideoUrl = await downloadVeoVideo(videoUri, apiKey, operation.name || "veo-video");

  return {
    id: operation.name || "veo-video",
    state: "completed",
    model,
    remoteVideoUrl: videoUri,
    localVideoUrl,
  };
}

async function downloadVeoVideo(videoUri: string, apiKey: string, operationName: string) {
  const separator = videoUri.includes("?") ? "&" : "?";
  const response = await fetch(`${videoUri}${separator}key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Veo video download failed: ${response.status} ${await response.text()}`);
  }

  const outputDir = path.join(process.cwd(), "public", "generated");
  await mkdir(outputDir, { recursive: true });

  const safeName = operationName.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "");
  const fileName = `veo-${safeName || Date.now()}.mp4`;
  await writeFile(path.join(outputDir, fileName), Buffer.from(await response.arrayBuffer()));

  return `/generated/${fileName}`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
