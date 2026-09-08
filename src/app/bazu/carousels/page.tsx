"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2, Eye,
  EyeOff, RotateCcw, Sliders, ExternalLink,
} from "lucide-react";
import { fetchCarouselSlides, saveCarouselSlide, removeCarouselSlide } from "./actions";
import type { CarouselSlide } from "@/lib/carousel-types";

const EMPTY: Omit<CarouselSlide, "id"> = {
  slot: "support",
  title: "",
  body: "",
  ctaLabel: "",
  ctaLink: "",
  active: true,
  order: 0,
};

export default function AdminCarouselsPage() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [filter, setFilter] = useState<"all" | "support" | "booking" | "home">("all");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CarouselSlide | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchCarouselSlides();
      setSlides(data);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to load carousel slides from GitHub." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing({
      id: "",
      ...EMPTY,
      slot: filter === "all" ? "support" : filter,
      order: slides.length,
    });
    setIsNew(true);
  };

  const openEdit = (slide: CarouselSlide) => {
    setEditing({ ...slide });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      setStatusMsg({ type: "error", text: "Title is required." });
      return;
    }
    startTransition(async () => {
      const idToSave = isNew ? null : editing.id;
      const { id: _, ...payload } = editing;
      const res = await saveCarouselSlide(idToSave, payload);
      if (res.ok) {
        setStatusMsg({ type: "success", text: isNew ? "Slide added!" : "Slide updated!" });
        setEditing(null);
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    startTransition(async () => {
      const res = await removeCarouselSlide(id);
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Slide deleted." });
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleToggleActive = (slide: CarouselSlide) => {
    startTransition(async () => {
      const { id, ...rest } = slide;
      const res = await saveCarouselSlide(id, { ...rest, active: !slide.active });
      if (res.ok) {
        await load();
      }
    });
  };

  const items = slides.filter((s) => filter === "all" || s.slot === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Carousel Slides</h1>
          <p className="text-sm text-slate-500">
            Configure dynamic cards, booking prompts, and call-to-action sliders.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md border border-line transition-colors"
            title="Reload from GitHub"
          >
            <RotateCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Slide
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded-md text-sm font-medium flex items-center justify-between ${
            statusMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-xs underline ml-4">Dismiss</button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(["all", "support", "booking", "home"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
              filter === f
                ? "bg-sky-500 text-white border-sky-500 shadow-xs"
                : "bg-cloud text-slate-600 border-line hover:border-sky-300"
            }`}
          >
            {f === "all" ? "All Slots" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 size={32} className="animate-spin text-sky-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Loading carousel slides from GitHub...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-cloud border border-line rounded-lg">
          <Sliders size={40} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No slides found in this slot</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">Add a slide to display in this carousel slot.</p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            <Plus size={16} />
            Add Slide
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((slide) => (
            <div
              key={slide.id}
              className={`border rounded-lg p-5 bg-white transition-all shadow-xs flex flex-col justify-between ${
                slide.active ? "border-line" : "border-line/60 bg-slate-50/50 opacity-75"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${slide.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                      {slide.active ? "Active" : "Hidden"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-50 text-sky-700 uppercase">
                      {slide.slot}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(slide)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      title={slide.active ? "Hide slide" : "Show slide"}
                    >
                      {slide.active ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      onClick={() => openEdit(slide)}
                      className="p-1.5 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors"
                      title="Edit slide"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id, slide.title)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete slide"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 text-base mb-1">{slide.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{slide.body}</p>
              </div>

              {slide.ctaLabel && (
                <div className="pt-3 border-t border-line flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-600 flex items-center gap-1">
                    Button: &quot;{slide.ctaLabel}&quot;
                  </span>
                  {slide.ctaLink && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <ExternalLink size={12} /> {slide.ctaLink}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-line shadow-xl max-w-lg w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h2 className="text-lg font-bold text-slate-800">
                {isNew ? "Add Carousel Slide" : "Edit Carousel Slide"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Slot Placement</label>
                  <select
                    value={editing.slot}
                    onChange={(e) => setEditing({ ...editing, slot: e.target.value as CarouselSlide["slot"] })}
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="support">Support / Giving</option>
                    <option value="booking">Booking / Sessions</option>
                    <option value="home">Home Highlights</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Slide Title *</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. Support the Mission"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Body Text</label>
                <textarea
                  rows={3}
                  value={editing.body}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  placeholder="Slide description or message..."
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Button Label</label>
                  <input
                    type="text"
                    value={editing.ctaLabel}
                    onChange={(e) => setEditing({ ...editing, ctaLabel: e.target.value })}
                    placeholder="e.g. Give Now"
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Button Link URL</label>
                  <input
                    type="text"
                    value={editing.ctaLink || ""}
                    onChange={(e) => setEditing({ ...editing, ctaLink: e.target.value })}
                    placeholder="e.g. /give or https://..."
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.active}
                    onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                    className="rounded text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-xs font-medium text-slate-700">Active (Visible)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:opacity-50 transition-colors shadow-sm"
              >
                {isPending && <Loader2 size={13} className="animate-spin" />}
                {isNew ? "Create Slide" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
