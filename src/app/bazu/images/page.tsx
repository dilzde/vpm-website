"use client";

import React, { useState, useRef, useCallback, useEffect, useTransition } from "react";
import {
  Upload, Trash2, Image as ImageIcon, CheckCircle, AlertCircle,
  Loader2, Eye, EyeOff, Plus, X, Sparkles, Pencil,
} from "lucide-react";
import {
  fetchAllImages,
  uploadAndRegisterImage,
  updateImageMeta,
  deleteImage,
} from "./actions";
import type { SiteImage } from "@/lib/image-types";

/* ─── Slot config ────────────────────────────────────────────────── */
const SLOTS: { key: SiteImage["slot"]; label: string; desc: string; color: string }[] = [
  { key: "hero",     label: "Hero Section",  desc: "Home page main carousel — auto-rotates every 5s",      color: "bg-violet-500" },
  { key: "gallery",  label: "Photo Gallery", desc: "Horizontal gallery strip on home page",                  color: "bg-sky-500" },
  { key: "about",    label: "About Page",    desc: "Ministry photos shown on the About page",                color: "bg-emerald-500" },
  { key: "branches", label: "Branches",      desc: "Church location images on the Branches page",            color: "bg-amber-500" },
  { key: "media",    label: "Media Banner",  desc: "Media page top banner carousel",                         color: "bg-rose-500" },
];

interface UploadItem {
  id: string;
  file: File;
  preview: string;
  progress: "pending" | "compressing" | "uploading" | "done" | "error";
  error?: string;
  caption: string;
}

/** Compress an image client-side using canvas — returns base64 JPEG (no prefix). */
async function compressImage(file: File, maxWidthPx = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidthPx) {
        height = Math.round((height * maxWidthPx) / width);
        width = maxWidthPx;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      // Get base64 without the data URL prefix
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl.split(",")[1]);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function AdminImagesPage() {
  const [activeSlot, setActiveSlot] = useState<SiteImage["slot"]>("hero");
  const [allImages, setAllImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [draggingOver, setDraggingOver] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [feedback, setFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const slotImages = allImages
    .filter((img) => img.slot === activeSlot)
    .sort((a, b) => a.order - b.order);

  /* ── Load ── */
  const reload = () => {
    setLoading(true);
    fetchAllImages().then((imgs) => {
      setAllImages(imgs);
      setLoading(false);
    });
  };

  useEffect(() => { reload(); }, []);

  const ok = (msg: string) => { setFeedback({ msg, type: "success" }); setTimeout(() => setFeedback(null), 5000); };
  const fail = (msg: string) => { setFeedback({ msg, type: "error" }); setTimeout(() => setFeedback(null), 8000); };

  /* ── File processing ── */
  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const accepted = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!accepted.length) return;

      const newItems: UploadItem[] = accepted.map((file) => ({
        id: `${Date.now()}_${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: "pending",
        caption: "",
      }));
      setUploads((prev) => [...prev, ...newItems]);

      const currentCount = slotImages.length;

      for (let idx = 0; idx < newItems.length; idx++) {
        const item = newItems[idx];
        try {
          setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: "compressing" } : u));
          const base64 = await compressImage(item.file);

          setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: "uploading" } : u));
          const res = await uploadAndRegisterImage(
            activeSlot,
            base64,
            item.file.name,
            item.caption,
            currentCount + idx
          );

          if (res.ok) {
            setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: "done" } : u));
            setTimeout(() => {
              setUploads((prev) => prev.filter((u) => u.id !== item.id));
              URL.revokeObjectURL(item.preview);
            }, 2000);
            reload();
          } else {
            setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: "error", error: res.error } : u));
            fail(`Upload failed: ${res.error}`);
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, progress: "error", error: message } : u));
          fail(message);
        }
      }
    },
    [activeSlot, slotImages.length]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    processFiles(e.dataTransfer.files);
  };

  /* ── Toggle active / hide ── */
  const toggleActive = (img: SiteImage) => {
    startTransition(async () => {
      const res = await updateImageMeta(img.id, { ...img, active: !img.active });
      if (res.ok) {
        ok(img.active ? `Image hidden from site.` : `Image now visible on site.`);
        reload();
      } else {
        fail(res.error);
      }
    });
  };

  /* ── Delete ── */
  const handleDelete = (img: SiteImage) => {
    if (!confirm("Delete this image permanently? This cannot be undone.")) return;
    startTransition(async () => {
      const res = await deleteImage(img.id);
      if (res.ok) { ok("Image deleted."); reload(); }
      else fail(res.error);
    });
  };

  /* ── Caption save ── */
  const saveCaption = (img: SiteImage) => {
    startTransition(async () => {
      const res = await updateImageMeta(img.id, { ...img, caption: editCaption });
      if (res.ok) { ok("Caption updated."); setEditingId(null); reload(); }
      else fail(res.error);
    });
  };

  const slotInfo = SLOTS.find((s) => s.key === activeSlot)!;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 md:p-8 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Sparkles size={14} />
            GitHub-Hosted Images
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Site Images &amp; Carousels
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Upload images to any section. They are stored in your GitHub repo and appear on the live site after Vercel deploys (~30s).
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all shrink-0 shadow-lg"
        >
          <Plus size={16} />
          Upload Images
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />
      </div>

      {/* Slot Tabs */}
      <div className="flex flex-wrap gap-2">
        {SLOTS.map((slot) => (
          <button
            key={slot.key}
            onClick={() => setActiveSlot(slot.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeSlot === slot.key
                ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)] shadow-md"
                : "bg-white text-[var(--color-slate)] border-[var(--color-line)] hover:border-[var(--color-ink)]"
            }`}
          >
            {slot.label}
            <span className="ml-2 text-xs opacity-60">
              {activeSlot === slot.key ? slotImages.length : ""}
            </span>
          </button>
        ))}
      </div>

      {/* Slot info */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-sm text-[var(--color-slate)]">
        <span className={`w-3 h-3 rounded-full shrink-0 ${slotInfo.color}`} />
        <span><strong className="text-[var(--color-ink)]">{slotInfo.label}:</strong> {slotInfo.desc}</span>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-between ${
          feedback.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? <CheckCircle size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
            <span>{feedback.msg}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Upload Queue */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--color-slate)] uppercase tracking-wider">Uploading to GitHub…</p>
          {uploads.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-3 bg-white border border-[var(--color-line)] rounded-lg shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.preview} alt="" className="w-12 h-12 object-cover rounded-md shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--color-ink)] truncate">{u.file.name}</p>
                <p className="text-[11px] text-[var(--color-slate)] capitalize mt-0.5">
                  {u.progress === "compressing" ? "Compressing…" : u.progress === "uploading" ? "Uploading to GitHub…" : u.progress === "done" ? "Done ✓" : u.error ?? u.progress}
                </p>
                {u.progress === "error" && <p className="text-xs text-red-500 mt-0.5">{u.error}</p>}
              </div>
              {u.progress === "uploading" || u.progress === "compressing" ? <Loader2 size={16} className="text-[var(--color-accent)] animate-spin shrink-0" /> : null}
              {u.progress === "done" && <CheckCircle size={16} className="text-emerald-500 shrink-0" />}
              {u.progress === "error" && <AlertCircle size={16} className="text-red-500 shrink-0" />}
            </div>
          ))}
        </div>
      )}

      {/* Image Grid / Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={onDrop}
        className={`rounded-[var(--radius-lg)] transition-all ${draggingOver ? "ring-4 ring-[var(--color-accent)] ring-offset-2 bg-[var(--color-accent)]/5" : ""}`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-[var(--color-slate)]">
            <Loader2 size={32} className="animate-spin text-[var(--color-accent)]" />
            <p className="text-sm font-bold">Loading images from GitHub…</p>
          </div>
        ) : slotImages.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-4 py-24 border-2 border-dashed border-[var(--color-line)] rounded-[var(--radius-lg)] cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <ImageIcon size={28} className="text-[var(--color-slate)]" />
            </div>
            <div>
              <p className="font-bold text-[var(--color-ink)] text-base">Drop images here or click to upload</p>
              <p className="text-xs text-[var(--color-slate)] mt-1">PNG, JPG, WebP — they will be auto-compressed and stored in GitHub</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full">
              <Upload size={14} /> Choose Files
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Add more card */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-[var(--color-line)] rounded-[var(--radius-lg)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all text-[var(--color-slate)]"
            >
              <Plus size={24} />
              <span className="text-xs font-bold">Add More</span>
            </div>

            {slotImages.map((img) => (
              <div
                key={img.id}
                className={`relative rounded-[var(--radius-lg)] overflow-hidden border shadow-sm group ${img.active ? "border-[var(--color-line)]" : "border-[var(--color-line)] opacity-50"}`}
              >
                <div className="aspect-square relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption || `${activeSlot} image`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => toggleActive(img)}
                      disabled={isPending}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                      title={img.active ? "Hide from site" : "Show on site"}
                    >
                      {img.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(img)}
                      disabled={isPending}
                      className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                      title="Delete permanently"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {/* Badges */}
                  {!img.active && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Hidden
                    </div>
                  )}
                  <div className="absolute top-2 right-2 w-5 h-5 bg-black/60 text-white text-[10px] font-bold rounded flex items-center justify-center">
                    {img.order + 1}
                  </div>
                </div>

                {/* Caption */}
                <div className="bg-white px-2 py-1.5 border-t border-[var(--color-line)]">
                  {editingId === img.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") saveCaption(img); if (e.key === "Escape") setEditingId(null); }}
                        className="flex-1 text-xs border-b border-[var(--color-accent)] outline-none bg-transparent text-[var(--color-ink)] py-0.5"
                        placeholder="Add caption…"
                      />
                      <button onClick={() => saveCaption(img)} className="text-emerald-500"><CheckCircle size={12} /></button>
                      <button onClick={() => setEditingId(null)} className="text-[var(--color-slate)]"><X size={12} /></button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingId(img.id); setEditCaption(img.caption || ""); }}
                      className="w-full text-left text-[10px] text-[var(--color-slate)] hover:text-[var(--color-ink)] truncate transition-colors flex items-center gap-1"
                    >
                      <Pencil size={9} className="shrink-0" />
                      <span className="truncate">{img.caption || <span className="italic">+ caption</span>}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {slotImages.length > 0 && (
        <p className="text-xs text-[var(--color-slate)] text-center">
          {slotImages.filter((i) => i.active).length} of {slotImages.length} images visible on site •
          Hover over an image to hide or delete it •
          Images are auto-compressed before upload
        </p>
      )}

      {isPending && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0F17] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <Loader2 size={14} className="animate-spin" />
          <span>Saving to GitHub…</span>
        </div>
      )}
    </div>
  );
}
