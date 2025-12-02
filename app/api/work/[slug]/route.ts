import { NextRequest, NextResponse } from "next/server";
import { getWorkBySlug, saveWorkItem, deleteWorkItem } from "@/lib/content";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const work = await getWorkBySlug(params.slug);
    if (!work) {
      return NextResponse.json({ error: "Work item not found" }, { status: 404 });
    }
    return NextResponse.json(work);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch work item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const oldSlug = params.slug;
    const newSlug = body.slug;
    
    // If slug changed, delete old file and create new one
    if (oldSlug !== newSlug) {
      deleteWorkItem(oldSlug);
    }
    
    saveWorkItem({ ...body, slug: newSlug });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update work item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    deleteWorkItem(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete work item" },
      { status: 500 }
    );
  }
}

