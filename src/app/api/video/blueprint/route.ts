import { NextResponse } from "next/server";
import { EMPTY_INPUT, LaunchInput, buildReferences, createBlueprint } from "@/lib/launchflow";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LaunchInput>;
  const input: LaunchInput = {
    ...EMPTY_INPUT,
    ...body,
    references: buildReferences({ ...EMPTY_INPUT, ...body } as LaunchInput),
  };

  return NextResponse.json(createBlueprint(input));
}
