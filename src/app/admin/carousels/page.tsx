"use client";

import React, { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

type SlideItem = {
  id: string; slot: "support" | "booking"; title: string; body: string; ctaLabel: string; active: boolean; order: number;
};

const SAMPLE_SLIDES: SlideItem[] = [
  { id: "s1", slot: "support", title: "Support the Mission", body: "Give via M-Pesa.", ctaLabel: "Give Now", active: true, order: 0 },
  { id: "s2", slot: "support", title: "Why It Matters", body: "Fund outreach programs.", ctaLabel: "Learn More", active: true, order: 1 },
  { id: "b1", slot: "booking", title: "Book a Session", body: "Schedule a meeting.", ctaLabel: "Book Now", active: true, order: 0 },
  { id: "b2", slot: "booking", title: "Request Prayer", body: "Share your needs.", ctaLabel: "Submit", active: true, order: 1 },
];

export default function AdminCarouselsPage() {
  const [filter, setFilter] = useState<"all" | "support" | "booking">("all");
  const items = SAMPLE_SLIDES.filter(s => filter === "all" || s.slot === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Carousel Slides</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors">
          <Plus size={14} strokeWidth={1.75} />
          Add Slide
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-4">
        {(["all", "support", "booking"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              filter === f ? "bg-sky-500 text-white border-sky-500" : "bg-cloud text-slate-600 border-line hover:border-sky-200"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-cloud border border-line rounded-md overflow-hidden">
        <div className="divide-y divide-line">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50/50 transition-colors">
              <GripVertical size={14} strokeWidth={1.75} className="text-slate-600/30 cursor-grab shrink-0" />
              <span className="text-xs px-1.5 py-0.5 rounded bg-sky-50 text-sky-500 font-medium shrink-0">{item.slot}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                <p className="text-xs text-slate-600/70 truncate">{item.body}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button className={`p-1.5 rounded-md transition-colors ${item.active ? "text-sky-500" : "text-slate-600/30"}`}>
                  {item.active ? <Eye size={14} strokeWidth={1.75} /> : <EyeOff size={14} strokeWidth={1.75} />}
                </button>
                <button className="p-1.5 rounded-md text-slate-600 hover:bg-sky-50 transition-colors"><Pencil size={14} strokeWidth={1.75} /></button>
                <button className="p-1.5 rounded-md text-slate-600 hover:bg-live/10 hover:text-live transition-colors"><Trash2 size={14} strokeWidth={1.75} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
