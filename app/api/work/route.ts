import { NextRequest, NextResponse } from "next/server";
import { getAllWork, saveWorkItem } from "@/lib/content";

export async function GET() {
  try {
    const work = getAllWork();
    return NextResponse.json(work);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch work items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    saveWorkItem(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create work item" },
      { status: 500 }
    );
  }
}

