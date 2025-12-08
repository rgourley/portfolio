"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/content";
import { X, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

// Import markdown editor styles
import "@uiw/react-md-editor/markdown-editor.css";

interface BlogFormProps {
  post: BlogPost | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BlogForm({ post, onClose, onSuccess }: BlogFormProps) {
  const [formData, setFormData] = useState({
    slug: post?.slug || "",
    title: post?.title || "",
    description: post?.description || "",
    content: post?.content || "",
    image: post?.image || "",
    tags: post?.tags?.join(", ") || "",
    date: post?.date || new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        ...formData,
        tags,
      };

      const url = post ? `/api/blog/${post.slug}` : "/api/blog";
      const method = post ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Error saving blog post");
    } finally {
      setLoading(false);
    }
  };

      return (
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2">
                {post ? "Edit Blog Post" : "Add Blog Post"}
              </h2>
              <p className="text-foreground/60">
                {post ? `Editing: ${post.title}` : "Create a new blog post"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
              Back to List
            </button>
          </div>
          
          <div className="glass rounded-2xl p-8 border border-foreground/10">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              rows={3}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Content (Markdown)</label>
              <button
                type="button"
                onClick={async () => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    
                    setUploading(true);
                    try {
                      const uploadFormData = new FormData();
                      uploadFormData.append("file", file);
                      
                      const response = await fetch("/api/upload", {
                        method: "POST",
                        body: uploadFormData,
                      });
                      
                      if (response.ok) {
                        const data = await response.json();
                        const imageMarkdown = `![${file.name}](${data.url})`;
                        const cursorPos = (document.querySelector('[data-color-mode] textarea') as HTMLTextAreaElement)?.selectionStart || formData.content.length;
                        const newContent = formData.content.slice(0, cursorPos) + imageMarkdown + formData.content.slice(cursorPos);
                        setFormData({ ...formData, content: newContent });
                      } else {
                        const error = await response.json();
                        alert(error.error || "Failed to upload image");
                      }
                    } catch (error) {
                      console.error("Error uploading image:", error);
                      alert("Error uploading image");
                    } finally {
                      setUploading(false);
                    }
                  };
                  input.click();
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors"
                disabled={uploading}
              >
                <ImageIcon className="w-4 h-4" />
                {uploading ? "Uploading..." : "Insert Image"}
              </button>
            </div>
            <div data-color-mode="dark">
              <MDEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value || "" })}
                preview="edit"
                hideToolbar={false}
                visibleDragbar={false}
                height={600}
              />
            </div>
            <style jsx global>{`
              .w-md-editor {
                background-color: var(--muted) !important;
                border: 1px solid var(--border) !important;
                border-radius: 0.5rem !important;
              }
              .w-md-editor-text-textarea {
                background-color: var(--muted) !important;
                color: var(--foreground) !important;
                font-family: var(--font-mono) !important;
              }
              .w-md-editor-text-pre {
                background-color: var(--muted) !important;
                color: var(--foreground) !important;
              }
              .w-md-editor-text {
                background-color: var(--muted) !important;
              }
              .w-md-editor-toolbar {
                background-color: var(--muted) !important;
                border-bottom: 1px solid var(--border) !important;
              }
              .w-md-editor-toolbar button {
                color: var(--foreground) !important;
              }
              .w-md-editor-toolbar button:hover {
                background-color: var(--background) !important;
              }
            `}</style>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Image URL or upload below"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    setUploading(true);
                    try {
                      const uploadFormData = new FormData();
                      uploadFormData.append("file", file);
                      
                      const response = await fetch("/api/upload", {
                        method: "POST",
                        body: uploadFormData,
                      });
                      
                      if (response.ok) {
                        const data = await response.json();
                        setFormData({ ...formData, image: data.url });
                      } else {
                        const error = await response.json();
                        alert(error.error || "Failed to upload image");
                      }
                    } catch (error) {
                      console.error("Error uploading image:", error);
                      alert("Error uploading image");
                    } finally {
                      setUploading(false);
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </label>
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-w-xs h-32 object-cover rounded-lg border border-border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Design, Product, UX"
            />
          </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Saving..." : post ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

