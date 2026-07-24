"use client";

import React from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

// All image slots on the site
const IMAGE_SLOTS = [
  { key: "hero", label: "Hero Section", section: "Home" },
  { key: "about_main", label: "About Photo", section: "About" },
  { key: "about_secondary", label: "Secondary Photo", section: "About" },
  { key: "branch_nairobi", label: "Nairobi Branch", section: "Branches" },
  { key: "branch_mombasa", label: "Mombasa Branch", section: "Branches" },
  { key: "branch_kisumu", label: "Kisumu Branch", section: "Branches" },
  { key: "branch_nakuru", label: "Nakuru Branch", section: "Branches" },
  { key: "branch_eldoret", label: "Eldoret Branch", section: "Branches" },
  { key: "announcement_1", label: "Announcement Slide 1", section: "Announcements" },
  { key: "announcement_2", label: "Announcement Slide 2", section: "Announcements" },
  { key: "announcement_3", label: "Announcement Slide 3", section: "Announcements" },
  { key: "carousel_support_1", label: "Support Slide 1", section: "Carousels" },
  { key: "carousel_booking_1", label: "Booking Slide 1", section: "Carousels" },
];

export default function AdminImagesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Site Images</h1>
        <p className="text-xs text-slate-600">Click any slot to upload an image</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {IMAGE_SLOTS.map((slot) => (
          <div key={slot.key} className="bg-cloud border border-line rounded-md overflow-hidden">
            {/* Image preview */}
            <div className="aspect-video bg-sky-50 flex items-center justify-center cursor-pointer hover:bg-sky-100 transition-colors group">
              <div className="text-center text-slate-600/40 group-hover:text-sky-500 transition-colors">
                <ImageIcon size={28} strokeWidth={1.5} className="mx-auto mb-1" />
                <span className="text-xs font-medium flex items-center gap-1 justify-center">
                  <Upload size={10} strokeWidth={1.75} />
                  Upload
                </span>
              </div>
            </div>
            {/* Info */}
            <div className="px-3 py-2.5 border-t border-line">
              <p className="text-xs font-medium text-slate-800">{slot.label}</p>
              <p className="text-xs text-slate-600/70">{slot.section}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
