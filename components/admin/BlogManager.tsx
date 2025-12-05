"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/content";
import BlogForm from "./BlogForm";
import { Plus, Edit, Trash2 } from "lucide-react";

interface BlogManagerProps {
  blogPosts: BlogPost[];
  onUpdate: () => void;
}

export default function BlogManager({ blogPosts, onUpdate }: BlogManagerProps) {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Error deleting blog post");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  // If showing form, render it full page
  if (showForm) {
    return (
      <BlogForm
        post={editingPost}
        onClose={handleClose}
        onSuccess={() => {
          handleClose();
          onUpdate();
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blog Posts</h2>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Blog Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            className="glass p-6 rounded-lg border border-foreground/10"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
              {post.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                className="px-4 py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

