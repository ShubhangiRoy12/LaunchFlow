import { NextResponse } from "next/server";
import { getLaunchProject } from "@/lib/orchestration";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ project: null }, { status: 400 });

  const project = await getLaunchProject(id);
  return NextResponse.json({ project }, { status: project ? 200 : 404 });
}
