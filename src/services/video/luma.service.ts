import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type LumaGeneration = {
  id: string;
  state?: "queued" | "dreaming" | "completed" | "failed";
  failure_reason?: string;
  assets?: {
    video?: string;
  };
};

const LUMA_BASE_URL = "https://api.lumalabs.ai/dream-machine/v1";

export type LumaVideoResult = {
  id: string;
  state: string;
  remoteVideoUrl?: string;
  localVideoUrl?: string;
};

export async function generateLumaVideo(prompt: string): Promise<LumaVideoResult> {
  const apiKey = process.env.LUMA_API_KEY;
  if (!apiKey) throw new Error("LUMA_API_KEY is missing in .env.local.");

  const created = await createGeneration(apiKey, prompt);
  const completed = await waitForGeneration(apiKey, created.id);

  if (completed.state !== "completed" || !completed.assets?.video) {
    throw new Error(completed.failure_reason || `Luma generation ended with state: ${completed.state}`);
  }

  const localVideoUrl = await downloadVideo(completed.assets.video, completed.id);

  return {
    id: completed.id,
    state: completed.state,
    remoteVideoUrl: completed.assets.video,
    localVideoUrl,
  };
}

async function createGeneration(apiKey: string, prompt: string): Promise<LumaGeneration> {
  const response = await fetch(`${LUMA_BASE_URL}/generations`, {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      model: process.env.LUMA_MODEL || "ray-flash-2",
      resolution: process.env.LUMA_RESOLUTION || "720p",
      duration: process.env.LUMA_DURATION || "5s",
      aspect_ratio: "16:9",
    }),
  });

  if (!response.ok) {
    throw new Error(`Luma create failed: ${await response.text()}`);
  }

  return response.json() as Promise<LumaGeneration>;
}

async function waitForGeneration(apiKey: string, id: string): Promise<LumaGeneration> {
  const maxAttempts = Number(process.env.LUMA_POLL_ATTEMPTS || 60);
  const delayMs = Number(process.env.LUMA_POLL_DELAY_MS || 10000);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const generation = await getGeneration(apiKey, id);
    if (generation.state === "completed" || generation.state === "failed") {
      return generation;
    }
    await delay(delayMs);
  }

  throw new Error(`Luma generation timed out. Generation id: ${id}`);
}

async function getGeneration(apiKey: string, id: string): Promise<LumaGeneration> {
  const response = await fetch(`${LUMA_BASE_URL}/generations/${id}`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Luma status failed: ${await response.text()}`);
  }

  return response.json() as Promise<LumaGeneration>;
}

async function downloadVideo(videoUrl: string, id: string) {
  const response = await fetch(videoUrl);
  if (!response.ok) {
    throw new Error(`Luma video download failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outputDir = path.join(process.cwd(), "public", "generated");
  await mkdir(outputDir, { recursive: true });

  const fileName = `luma-${id}.mp4`;
  await writeFile(path.join(outputDir, fileName), buffer);
  return `/generated/${fileName}`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
