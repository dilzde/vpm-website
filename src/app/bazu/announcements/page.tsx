"use client";

import React, { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

type AnnouncementItem = {
  id: string;
  headline: string;
  body: string;
  imageUrl?: string;
  active: boolean;
  order: number;
};

const SAMPLE_ANNOUNCEMENTS: AnnouncementItem[] = [
  { id: "1", headline: "Welcome to VPM International", body: "We are a ministry rooted in prayer.", active: true, order: 0 },
  { id: "2", headline: "Join Us in Prayer", body: "Submit your prayer request.", active: true, order: 1 },
  { id: "3", headline: "Annual Convention 2025", body: "Save the date for our annual gathering.", active: false, order: 2 },
];

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState(SAMPLE_ANNOUNCEMENTS);
  const [editing, setEditing] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, active: !i.active } : i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Announcements</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors">
          <Plus size={14} strokeWidth={1.75} />
          Add Announcement
        </button>
      </div>

      <div className="bg-cloud border border-line rounded-md overflow-hidden">
        <div className="divide-y divide-line">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50/50 transition-colors">
              <GripVertical size={14} strokeWidth={1.75} className="text-slate-600/30 cursor-grab shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{item.headline}</p>
                <p className="text-xs text-slate-600/70 truncate">{item.body}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => toggleActive(item.id)}
                  className={`p-1.5 rounded-md transition-colors ${item.active ? "text-sky-500 hover:bg-sky-50" : "text-slate-600/30 hover:bg-sky-50"}`}
                  aria-label={item.active ? "Deactivate" : "Activate"}
                >
                  {item.active ? <Eye size={14} strokeWidth={1.75} /> : <EyeOff size={14} strokeWidth={1.75} />}
                </button>
                <button className="p-1.5 rounded-md text-slate-600 hover:bg-sky-50 transition-colors" aria-label="Edit">
                  <Pencil size={14} strokeWidth={1.75} />
                </button>
                <button className="p-1.5 rounded-md text-slate-600 hover:bg-live/10 hover:text-live transition-colors" aria-label="Delete">
                  <Trash2 size={14} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
