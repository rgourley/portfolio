"use client";

import { useState } from "react";
import { WorkItem } from "@/lib/content";
import WorkForm from "./WorkForm";
import { Plus, Edit, Trash2 } from "lucide-react";

interface WorkManagerProps {
  workItems: WorkItem[];
  onUpdate: () => void;
}

export default function WorkManager({ workItems, onUpdate }: WorkManagerProps) {
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this work item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/work/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
      } else {
        alert("Failed to delete work item");
      }
    } catch (error) {
      console.error("Error deleting work item:", error);
      alert("Error deleting work item");
    }
  };

  const handleEdit = (work: WorkItem) => {
    setEditingWork(work);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingWork(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingWork(null);
  };

  // If showing form, render it full page
  if (showForm) {
    return (
      <WorkForm
        work={editingWork}
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
        <h2 className="text-2xl font-semibold">Work Items</h2>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Work Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workItems.map((work) => (
          <div
            key={work.slug}
            className="glass p-6 rounded-lg border border-foreground/10"
          >
            {work.image && (
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
            <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
              {work.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(work)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(work.slug)}
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

