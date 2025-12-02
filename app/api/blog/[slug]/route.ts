import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlug, saveBlogPost, deleteBlogPost } from "@/lib/content";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
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
      deleteBlogPost(oldSlug);
    }
    
    saveBlogPost({ ...body, slug: newSlug });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    deleteBlogPost(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

