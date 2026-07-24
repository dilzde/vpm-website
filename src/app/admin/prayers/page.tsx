"use client";

import React, { useState } from "react";
import { Heart, Clock, Globe, Smartphone, CheckCircle } from "lucide-react";

type PrayerItem = {
  id: string; name: string; category: string; request: string;
  source: "web" | "app"; status: "pending" | "prayed" | "answered";
  submittedAt: string;
};

const SAMPLE_PRAYERS: PrayerItem[] = [
  { id: "1", name: "Mary K.", category: "Healing", request: "Please pray for my mother who is in hospital.", source: "web", status: "pending", submittedAt: "2024-12-20" },
  { id: "2", name: "John O.", category: "Financial Breakthrough", request: "Praying for a job opportunity.", source: "app", status: "pending", submittedAt: "2024-12-19" },
  { id: "3", name: "Grace W.", category: "Family", request: "Pray for restoration in my marriage.", source: "web", status: "prayed", submittedAt: "2024-12-18" },
  { id: "4", name: "Peter M.", category: "Guidance", request: "Seeking direction for ministry.", source: "app", status: "pending", submittedAt: "2024-12-17" },
];

export default function AdminPrayersPage() {
  const [items, setItems] = useState(SAMPLE_PRAYERS);
  const [filter, setFilter] = useState<"all" | "pending" | "prayed">("all");

  const filtered = items.filter(i => filter === "all" || i.status === filter);

  const markPrayed = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, status: "prayed" as const } : i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Prayer Inbox</h1>
        <span className="text-xs text-slate-600">
          {items.filter(i => i.status === "pending").length} pending
        </span>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        {(["all", "pending", "prayed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              filter === f ? "bg-sky-500 text-white border-sky-500" : "bg-cloud text-slate-600 border-line hover:border-sky-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="bg-cloud border border-line rounded-md p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-slate-800">{item.name}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-sky-50 text-sky-500">{item.category}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-600/50">
                    {item.source === "web" ? <Globe size={10} strokeWidth={1.75} /> : <Smartphone size={10} strokeWidth={1.75} />}
                    {item.source}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.request}</p>
                <p className="text-xs text-slate-600/50 mt-2 flex items-center gap-1">
                  <Clock size={10} strokeWidth={1.75} />
                  {new Date(item.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="shrink-0">
                {item.status === "pending" ? (
                  <button
                    onClick={() => markPrayed(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                               bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors"
                  >
                    <Heart size={12} strokeWidth={1.75} />
                    Mark Prayed
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
                    <CheckCircle size={12} strokeWidth={1.75} />
                    Prayed for
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
