"use client";

import React from "react";
import { Plus, GripVertical, Pencil, Trash2, MapPin, Phone } from "lucide-react";

const SAMPLE_BRANCHES = [
  { id: "1", name: "VPM Nairobi (HQ)", region: "Nairobi", phone: "+254 759 265 819", active: true },
  { id: "2", name: "VPM Mombasa", region: "Coast", phone: "+254 700 000 002", active: true },
  { id: "3", name: "VPM Kisumu", region: "Western", phone: "+254 700 000 003", active: true },
  { id: "4", name: "VPM Nakuru", region: "Rift Valley", phone: "+254 700 000 004", active: true },
  { id: "5", name: "VPM Eldoret", region: "North Rift", phone: "+254 700 000 005", active: true },
];

export default function AdminBranchesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Branches</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors">
          <Plus size={14} strokeWidth={1.75} />
          Add Branch
        </button>
      </div>

      <div className="bg-cloud border border-line rounded-md overflow-hidden">
        <div className="divide-y divide-line">
          {SAMPLE_BRANCHES.map((branch) => (
            <div key={branch.id} className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50/50 transition-colors">
              <GripVertical size={14} strokeWidth={1.75} className="text-slate-600/30 cursor-grab shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{branch.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-sky-500">
                    <MapPin size={10} strokeWidth={1.75} />{branch.region}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-600/70">
                    <Phone size={10} strokeWidth={1.75} />{branch.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
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
