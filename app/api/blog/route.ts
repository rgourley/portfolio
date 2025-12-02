import { NextRequest, NextResponse } from "next/server";
import { getAllBlogPosts, saveBlogPost } from "@/lib/content";

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    saveBlogPost(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

