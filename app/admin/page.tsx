"use client";

import { useState, useEffect } from "react";
import { WorkItem, BlogPost } from "@/lib/content";
import WorkManager from "@/components/admin/WorkManager";
import BlogManager from "@/components/admin/BlogManager";
import { Briefcase, BookOpen } from "lucide-react";

type Tab = "work" | "blog";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [workRes, blogRes] = await Promise.all([
        fetch("/api/work"),
        fetch("/api/blog"),
      ]);
      const work = await workRes.json();
      const blog = await blogRes.json();
      setWorkItems(work);
      setBlogPosts(blog);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-12 lg:px-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-foreground/60">
            Manage your work items and blog posts
          </p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("work")}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === "work"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Work
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === "blog"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Blog
          </button>
        </div>

        {activeTab === "work" && (
          <WorkManager
            workItems={workItems}
            onUpdate={fetchData}
          />
        )}
        {activeTab === "blog" && (
          <BlogManager
            blogPosts={blogPosts}
            onUpdate={fetchData}
          />
        )}
      </div>
    </div>
  );
}

