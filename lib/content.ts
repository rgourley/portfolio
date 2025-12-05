import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export interface WorkItem {
  slug: string;
  title: string;
  description: string;
  content: string;
  contentHtml?: string;
  image?: string;
  gallery?: string[];
  tags: string[];
  featured: boolean;
  date: string;
  client?: string;
  year?: string;
  order?: number;
  role?: string;
  timeline?: string;
  platform?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  contentHtml?: string;
  date: string;
  tags: string[];
  image?: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// Work items
export function getAllWork(): WorkItem[] {
  const workDir = path.join(contentDirectory, "work");
  if (!fs.existsSync(workDir)) {
    return [];
  }
  
  const files = fs.readdirSync(workDir);
  const workItems = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(workDir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      
      return {
        slug: file.replace(".md", ""),
        title: data.title || "",
        description: data.description || "",
        content,
        image: data.image,
        gallery: data.gallery || [],
        tags: data.tags || [],
        featured: data.featured || false,
        date: data.date || "",
        client: data.client,
        year: data.year,
        order: data.order !== undefined ? data.order : 999,
        role: data.role,
        timeline: data.timeline,
        platform: data.platform,
      } as WorkItem;
    });
  
  return workItems.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.order !== undefined && b.order !== undefined) {
      if (a.order !== b.order) return a.order - b.order;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getWorkBySlug(slug: string): Promise<WorkItem | null> {
  const workDir = path.join(contentDirectory, "work");
  const filePath = path.join(workDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markdownToHtml(content);
  
  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    content,
    contentHtml,
    image: data.image,
    gallery: data.gallery || [],
    tags: data.tags || [],
    featured: data.featured || false,
    date: data.date || "",
    client: data.client,
    year: data.year,
    order: data.order !== undefined ? data.order : 999,
    role: data.role,
    timeline: data.timeline,
    platform: data.platform,
  } as WorkItem;
}

export function getFeaturedWork(): WorkItem[] {
  return getAllWork()
    .filter((work) => work.featured)
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        if (a.order !== b.order) return a.order - b.order;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 4);
}

// Blog posts
export function getAllBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, "blog");
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      
      return {
        slug: file.replace(".md", ""),
        title: data.title || "",
        description: data.description || "",
        content,
        date: data.date || "",
        tags: data.tags || [],
        image: data.image,
      } as BlogPost;
    });
  
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const blogDir = path.join(contentDirectory, "blog");
  const filePath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markdownToHtml(content);
  
  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    content,
    contentHtml,
    date: data.date || "",
    tags: data.tags || [],
    image: data.image,
  } as BlogPost;
}

// Content management functions
export function saveWorkItem(work: Omit<WorkItem, "content"> & { content?: string }): void {
  const workDir = path.join(contentDirectory, "work");
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir, { recursive: true });
  }
  
  const frontmatter = `---
title: "${work.title}"
description: "${work.description}"
date: "${work.date}"
tags: ${JSON.stringify(work.tags)}
featured: ${work.featured}
${work.order !== undefined ? `order: ${work.order}` : ""}
${work.image ? `image: "${work.image}"` : ""}
${work.gallery && work.gallery.length > 0 ? `gallery: ${JSON.stringify(work.gallery)}` : ""}
${work.client ? `client: "${work.client}"` : ""}
${work.year ? `year: "${work.year}"` : ""}
---

${work.content || ""}
`;
  
  const filePath = path.join(workDir, `${work.slug}.md`);
  fs.writeFileSync(filePath, frontmatter);
}

export function saveBlogPost(post: Omit<BlogPost, "content"> & { content?: string }): void {
  const blogDir = path.join(contentDirectory, "blog");
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  const frontmatter = `---
title: "${post.title}"
description: "${post.description}"
date: "${post.date}"
tags: ${JSON.stringify(post.tags)}
${post.image ? `image: "${post.image}"` : ""}
---
${post.content ? `\n${post.content}` : ""}
`;
  
  const filePath = path.join(blogDir, `${post.slug}.md`);
  fs.writeFileSync(filePath, frontmatter);
}

export function deleteWorkItem(slug: string): void {
  const workDir = path.join(contentDirectory, "work");
  const filePath = path.join(workDir, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function deleteBlogPost(slug: string): void {
  const blogDir = path.join(contentDirectory, "blog");
  const filePath = path.join(blogDir, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

