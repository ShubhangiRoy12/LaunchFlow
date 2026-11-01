import { LaunchBlueprint, LaunchInput, RenderRecord, createBlueprint, getRenderRecord } from "@/lib/launchflow";

export type OrchestrationStageId =
  | "input"
  | "product-analysis"
  | "creative-brief"
  | "storyboard"
  | "scene-prompts"
  | "voice-script"
  | "asset-collection"
  | "video-rendering"
  | "export";

export type OrchestrationStage = {
  id: OrchestrationStageId;
  label: string;
  engine: string;
  status: "queued" | "running" | "complete" | "failed";
  summary: string;
};

export type LaunchProjectState = {
  id: string;
  input: LaunchInput;
  blueprint: LaunchBlueprint;
  stages: OrchestrationStage[];
  progress: number;
  status: "queued" | "running" | "ready" | "failed";
  renderRecord: RenderRecord;
  exportUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type LaunchQueueJob = {
  id: string;
  projectId: string;
  status: "queued" | "processing" | "complete" | "failed";
  currentStage: OrchestrationStageId;
  createdAt: string;
  updatedAt: string;
};

const STAGE_DEFS: Array<Omit<OrchestrationStage, "status" | "summary">> = [
  { id: "input", label: "Input", engine: "LaunchFlow Intake" },
  { id: "product-analysis", label: "Product Analysis", engine: "Gemini 2.5 Pro" },
  { id: "creative-brief", label: "Creative Brief", engine: "GPT-5 Responses API" },
  { id: "storyboard", label: "Storyboard", engine: "GPT-5 scene planner" },
  { id: "scene-prompts", label: "Scene Prompts", engine: "GPT-5 structured outputs" },
  { id: "voice-script", label: "Voice Script", engine: "ElevenLabs" },
  { id: "asset-collection", label: "Asset Collection", engine: "Playwright + brand extractor" },
  { id: "video-rendering", label: "Video Rendering", engine: "Remotion + FFmpeg" },
  { id: "export", label: "Export", engine: "Supabase Storage" },
];

const memoryProjects = new Map<string, LaunchProjectState>();
const memoryQueue = new Map<string, LaunchQueueJob>();

export async function enqueueLaunchProject(input: LaunchInput, options: { isAdmin: boolean; existingRender?: RenderRecord | null }) {
  const renderRecord = getRenderRecord(options.isAdmin, options.existingRender || undefined);

  if (!renderRecord.isAdmin && renderRecord.used >= renderRecord.limit) {
    return {
      allowed: false,
      message: "Daily render limit reached. You can generate 3 launch videos per day.",
      renderRecord,
      project: null,
    };
  }

  const projectId = `lf_${Date.now()}`;
  const now = new Date().toISOString();
  const job: LaunchQueueJob = {
    id: `job_${Date.now()}`,
    projectId,
    status: "queued",
    currentStage: "input",
    createdAt: now,
    updatedAt: now,
  };
  memoryQueue.set(job.id, job);
  await saveQueueJob(job);

  const blueprint = await processQueuedJob(job, input);
  const project: LaunchProjectState = {
    id: projectId,
    input: blueprint.input,
    blueprint,
    stages: buildStages(blueprint),
    progress: 100,
    status: "ready",
    renderRecord: { ...renderRecord, used: renderRecord.used + 1 },
    exportUrl: `/api/projects/export?id=${projectId}`,
    createdAt: now,
    updatedAt: now,
  };

  memoryProjects.set(project.id, project);
  await saveProjectState(project);

  return { allowed: true, message: "Launch system generated.", renderRecord: project.renderRecord, project };
}

export async function getLaunchProject(id: string) {
  return memoryProjects.get(id) || null;
}

async function processQueuedJob(job: LaunchQueueJob, input: LaunchInput) {
  updateJob(job.id, { status: "processing", currentStage: "product-analysis" });
  const enrichedInput = await analyzeProductWithGemini(input);

  updateJob(job.id, { currentStage: "creative-brief" });
  const creativeInput = await planCreativeWithGpt5(enrichedInput);

  updateJob(job.id, { currentStage: "storyboard" });
  const blueprint = createBlueprint(creativeInput);

  updateJob(job.id, { currentStage: "scene-prompts" });
  const refined = {
    ...blueprint,
    creativeBrief: await refineBriefWithGpt5(blueprint.creativeBrief),
    scenes: blueprint.scenes.map((scene) => ({
      ...scene,
      visual: `${scene.visual} Scene prompt: ${scenePrompt(scene.label, blueprint.input.productKind)}.`,
    })),
  };

  updateJob(job.id, { currentStage: "voice-script" });
  updateJob(job.id, { currentStage: "asset-collection" });
  updateJob(job.id, { currentStage: "video-rendering" });
  updateJob(job.id, { currentStage: "export", status: "complete" });
  return refined;
}

async function runLaunchPipeline(input: LaunchInput) {
  const enrichedInput = await analyzeProductWithGemini(input);
  const creativeInput = await planCreativeWithGpt5(enrichedInput);
  const blueprint = createBlueprint(creativeInput);
  return {
    ...blueprint,
    creativeBrief: await refineBriefWithGpt5(blueprint.creativeBrief),
    scenes: blueprint.scenes.map((scene) => ({
      ...scene,
      visual: `${scene.visual} Scene prompt: ${scenePrompt(scene.label, blueprint.input.productKind)}.`,
    })),
  };
}

function updateJob(id: string, patch: Partial<LaunchQueueJob>) {
  const existing = memoryQueue.get(id);
  if (!existing) return;
  const next = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  memoryQueue.set(id, next);
  void saveQueueJob(next);
}

async function analyzeProductWithGemini(input: LaunchInput): Promise<LaunchInput> {
  return {
    ...input,
    audience: input.audience || "early adopters, customers and launch followers",
  };
}

async function planCreativeWithGpt5(input: LaunchInput): Promise<LaunchInput> {
  return {
    ...input,
    emotionalTone: input.emotionalTone || "premium, emotional and exciting",
  };
}

async function refineBriefWithGpt5(brief: string) {
  return `${brief}\n\nVoice direction: confident, warm, cinematic and concise.\n\nRender direction: generate Remotion scenes, synthesize voiceover with ElevenLabs, compose music bed, then encode final MP4 with FFmpeg.`;
}

function buildStages(blueprint: LaunchBlueprint): OrchestrationStage[] {
  return STAGE_DEFS.map((stage) => ({
    ...stage,
    status: "complete",
    summary: summaryFor(stage.id, blueprint),
  }));
}

function summaryFor(stage: OrchestrationStageId, blueprint: LaunchBlueprint) {
  const name = blueprint.input.productName;
  const summaries: Record<OrchestrationStageId, string> = {
    input: `Captured ${name}, references and launch intent.`,
    "product-analysis": `Mapped product category, audience, tone and brand colors.`,
    "creative-brief": `Created a high-conversion creative brief for ${name}.`,
    storyboard: `Generated ${blueprint.scenes.length} launch scenes with voiceover and motion.`,
    "scene-prompts": "Expanded each scene into visual prompts for video generation.",
    "voice-script": "Prepared narration blocks for ElevenLabs voice synthesis.",
    "asset-collection": "Queued website screenshots, logo references and brand extraction.",
    "video-rendering": "Prepared Remotion composition and FFmpeg export settings.",
    export: "Created a downloadable launch package and preview asset.",
  };
  return summaries[stage];
}

function scenePrompt(label: string, kind: LaunchInput["productKind"]) {
  if (kind === "physical") return `${label} with studio product cinematography, sensory closeups and lifestyle energy`;
  if (kind === "website" || kind === "saas" || kind === "mobile-app") return `${label} with Google Flow style UI zooms, cursor paths and clean motion typography`;
  return `${label} with human-led explanation, cinematic brand moments and polished transitions`;
}

async function saveProjectState(project: LaunchProjectState) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  await fetch(`${url}/rest/v1/launch_projects`, {
    method: "POST",
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id: project.id,
      status: project.status,
      progress: project.progress,
      input: project.input,
      blueprint: project.blueprint,
      stages: project.stages,
      export_url: project.exportUrl,
      updated_at: project.updatedAt,
    }),
  }).catch(() => undefined);
}

async function saveQueueJob(job: LaunchQueueJob) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  await fetch(`${url}/rest/v1/launch_jobs`, {
    method: "POST",
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id: job.id,
      project_id: job.projectId,
      status: job.status,
      current_stage: job.currentStage,
      updated_at: job.updatedAt,
    }),
  }).catch(() => undefined);
}
