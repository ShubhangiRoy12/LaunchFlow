import { NextResponse } from "next/server";
import { EMPTY_INPUT, LaunchInput, RenderRecord, buildReferences } from "@/lib/launchflow";
import { enqueueLaunchProject } from "@/lib/orchestration";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    input?: Partial<LaunchInput>;
    isAdmin?: boolean;
    renderRecord?: RenderRecord | null;
  };

  const input = {
    ...EMPTY_INPUT,
    ...body.input,
  } as LaunchInput;

  input.references = buildReferences(input);

  const result = await enqueueLaunchProject(input, {
    isAdmin: Boolean(body.isAdmin),
    existingRender: body.renderRecord || null,
  });

  return NextResponse.json(result, { status: result.allowed ? 200 : 429 });
}
