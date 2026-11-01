import { NextResponse } from "next/server";
import { RenderRecord, getRenderRecord } from "@/lib/launchflow";

export async function POST(request: Request) {
  const body = (await request.json()) as { existing?: RenderRecord; isAdmin?: boolean };
  const record = getRenderRecord(Boolean(body.isAdmin), body.existing);

  if (!record.isAdmin && record.used >= record.limit) {
    return NextResponse.json(
      {
        allowed: false,
        record,
        message: "Daily render limit reached. You can generate 3 launch videos per day.",
      },
      { status: 429 },
    );
  }

  const updated: RenderRecord = {
    ...record,
    used: record.used + 1,
  };

  return NextResponse.json({
    allowed: true,
    record: updated,
    render: {
      id: `lf-${Date.now()}`,
      status: "ready",
      downloadUrl: "/api/video/download/mock",
      formats: ["16:9", "9:16", "1:1", "4:5"],
    },
  });
}
