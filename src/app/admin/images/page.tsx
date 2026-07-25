"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle, Sparkles } from "lucide-react";

// All image slots across the Voice of the Potter's Messengers site
const IMAGE_SLOTS = [
  { key: "hero", label: "Hero Section Banner", section: "Home Page" },
  { key: "gallery_1", label: "Interactive Photo 1 (Above Footer)", section: "Home Gallery" },
  { key: "gallery_2", label: "Interactive Photo 2 (Above Footer)", section: "Home Gallery" },
  { key: "gallery_3", label: "Interactive Photo 3 (Above Footer)", section: "Home Gallery" },
  { key: "gallery_4", label: "Interactive Photo 4 (Above Footer)", section: "Home Gallery" },
  { key: "gallery_5", label: "Interactive Photo 5 (Above Footer)", section: "Home Gallery" },
  { key: "gallery_6", label: "Interactive Photo 6 (Above Footer)", section: "Home Gallery" },
  { key: "about_main", label: "Primary Ministry Photo", section: "About Page" },
  { key: "about_secondary", label: "Revival Center Photo", section: "About Page" },
  { key: "branch_nairobi", label: "Nairobi Sanctuary", section: "Branches" },
  { key: "branch_mombasa", label: "Mombasa Branch", section: "Branches" },
  { key: "branch_kisumu", label: "Kisumu Fellowship", section: "Branches" },
  { key: "branch_nakuru", label: "Nakuru Revival Altar", section: "Branches" },
  { key: "branch_eldoret", label: "Eldoret Mission Centre", section: "Branches" },
  { key: "carousel_support_1", label: "Support Mission Slide 1", section: "Support Band" },
  { key: "carousel_booking_1", label: "Pastoral Counseling Banner", section: "Booking Band" },
];

export default function AdminImagesPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleUploadClick = (key: string) => {
    setSelectedSlot(key);
    alert(`Image slot "${key}" selected for update. In production, this opens the cloud media uploader.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 md:p-8 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-display font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Sparkles size={15} />
            Media & Gallery Control Portal
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">Site Images & Interactive Gallery</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-2">
            Upload pictures here to automatically populate the interactive horizontal gallery above the footer and ministry section banners. Note: The Home Photo Gallery is hidden until you upload pictures here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {IMAGE_SLOTS.map((slot) => {
          const isGallery = slot.section === "Home Gallery";
          return (
            <div key={slot.key} className={`bg-[var(--color-cloud)] border ${isGallery ? "border-[var(--color-accent)]/50 shadow-md" : "border-[var(--color-line)]"} rounded-[var(--radius-lg)] overflow-hidden transition-all duration-200 hover:shadow-xl group`}>
              {/* Image preview slot */}
              <div 
                onClick={() => handleUploadClick(slot.key)}
                className="aspect-video bg-[var(--color-navy-900)] text-white/50 flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200 group p-4 text-center relative"
              >
                {isGallery && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-[var(--color-navy-950)] rounded uppercase tracking-wider">
                    Gallery Slot
                  </span>
                )}
                <ImageIcon size={32} strokeWidth={1.5} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                  <Upload size={13} strokeWidth={2.2} />
                  Click To Upload Photo
                </span>
              </div>
              {/* Metadata */}
              <div className="px-4 py-3.5 border-t border-[var(--color-line)] bg-white flex flex-col justify-between">
                <div>
                  <p className="text-xs font-display font-extrabold text-[var(--color-ink)]">{slot.label}</p>
                  <span className="inline-block mt-1 text-[11px] font-mono font-medium text-[var(--color-slate)] bg-[var(--color-mist)] px-2 py-0.5 rounded">
                    {slot.section}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

