"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload, Trash2, Image as ImageIcon, CheckCircle, AlertCircle,
  Loader2, Eye, EyeOff, GripVertical, Sparkles, Plus, X,
} from "lucide-react";
import {
  getAllCarouselImagesForSlot,
  addCarouselImage,
  deleteCarouselImage,
  toggleCarouselImageActive,
  updateCarouselImageCaption,
  subscribeCarouselImages,
  type CarouselSlot,
  type CarouselImage,
} from "@/lib/firestore";
import { uploadCarouselImage } from "@/lib/uploadImage";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { storage } from "@/lib/firebase";

/* ─── Slot config ────────────────────────────────────────────────── */
const SLOTS: { key: CarouselSlot; label: string; desc: string; color: string }[] = [
  { key: "hero",     label: "Hero Section",  desc: "Home page main carousel — auto-rotates every 5 s", color: "bg-violet-500" },
  { key: "gallery",  label: "Photo Gallery", desc: "Horizontal gallery strip above footer on home page", color: "bg-sky-500" },
  { key: "about",    label: "About Page",    desc: "Ministry photos shown on the About page",           color: "bg-emerald-500" },
  { key: "branches", label: "Branches",      desc: "Church location images on the Branches page",       color: "bg-amber-500" },
  { key: "media",    label: "Media Banner",  desc: "Media page top banner carousel",                    color: "bg-rose-500" },
];

/* ─── Upload state per file ──────────────────────────────────────── */
interface UploadItem {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

export default function AdminImagesPage() {
  const [activeSlot, setActiveSlot] = useState<CarouselSlot>("hero");
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [draggingOver, setDraggingOver] = useState(false);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Real-time subscription (includes inactive for admin view) */
  useEffect(() => {
    setImages([]);
    // Admin needs all images, so use a custom query
    const unsub = subscribeCarouselImages(activeSlot, (imgs) => setImages(imgs));
    // Also load inactive via one-time fetch and merge
    getAllCarouselImagesForSlot(activeSlot).then((all) => {
      setImages(all);
    });
    return () => unsub();
  }, [activeSlot]);

  /* ─ File processing ─────────────────────────────────────────────── */
  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const accepted = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!accepted.length) return;

      const newItems: UploadItem[] = accepted.map((file) => ({
        id: `${Date.now()}_${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "pending",
      }));

      setUploads((prev) => [...prev, ...newItems]);

      for (const item of newItems) {
        setUploads((prev) =>
          prev.map((u) => (u.id === item.id ? { ...u, status: "uploading" } : u))
        );
        try {
          const { url, storagePath } = await uploadCarouselImage(
            activeSlot,
            item.file,
            (pct) =>
              setUploads((prev) =>
                prev.map((u) => (u.id === item.id ? { ...u, progress: pct } : u))
              )
          );
          const order = images.length + newItems.indexOf(item);
          await addCarouselImage(activeSlot, url, storagePath, "", order);
          setUploads((prev) =>
            prev.map((u) =>
              u.id === item.id ? { ...u, status: "done", progress: 100 } : u
            )
          );
          // Remove done item from queue after 2 s
          setTimeout(() => {
            setUploads((prev) => prev.filter((u) => u.id !== item.id));
            URL.revokeObjectURL(item.preview);
          }, 2000);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setUploads((prev) =>
            prev.map((u) =>
              u.id === item.id ? { ...u, status: "error", error: message } : u
            )
          );
        }
      }
    },
    [activeSlot, images.length]
  );

  /* ─ Drag & drop ─────────────────────────────────────────────────── */
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    processFiles(e.dataTransfer.files);
  };

  /* ─ Delete from Storage + Firestore ─────────────────────────────── */
  const handleDelete = async (img: CarouselImage) => {
    if (!confirm("Delete this image permanently?")) return;
    try {
      if (img.storagePath) {
        await deleteObject(storageRef(storage, img.storagePath));
      }
      await deleteCarouselImage(img.id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ─ Caption save ─────────────────────────────────────────────────── */
  const saveCaption = async (id: string) => {
    await updateCarouselImageCaption(id, captionValue);
    setEditingCaption(null);
  };

  const slotInfo = SLOTS.find((s) => s.key === activeSlot)!;

  return (
    <div className="space-y-8 font-sans">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 md:p-8 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Sparkles size={14} />
            Real-Time Image Carousels
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Site Images &amp; Carousels
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Upload images to any section. They appear on the live site <strong className="text-white">instantly</strong> — no reload needed.
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

      {/* ── Slot Tabs ───────────────────────────────────────────────── */}
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
              {activeSlot === slot.key ? images.length : ""}
            </span>
          </button>
        ))}
      </div>

      {/* ── Slot info banner ────────────────────────────────────────── */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-sm text-[var(--color-slate)]">
        <span className={`w-3 h-3 rounded-full shrink-0 ${slotInfo.color}`} />
        <span><strong className="text-[var(--color-ink)]">{slotInfo.label}:</strong> {slotInfo.desc}</span>
      </div>

      {/* ── Upload Queue ────────────────────────────────────────────── */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--color-slate)] uppercase tracking-wider">Uploading…</p>
          {uploads.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-3 bg-white border border-[var(--color-line)] rounded-lg shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.preview} alt="" className="w-12 h-12 object-cover rounded-md shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--color-ink)] truncate">{u.file.name}</p>
                {u.status === "uploading" && (
                  <div className="mt-1.5 h-1.5 bg-[var(--color-line)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-accent)] rounded-full transition-all"
                      style={{ width: `${u.progress}%` }}
                    />
                  </div>
                )}
                {u.status === "error" && (
                  <p className="text-xs text-red-500 mt-0.5">{u.error}</p>
                )}
              </div>
              {u.status === "uploading" && <Loader2 size={16} className="text-[var(--color-accent)] animate-spin shrink-0" />}
              {u.status === "done" && <CheckCircle size={16} className="text-emerald-500 shrink-0" />}
              {u.status === "error" && <AlertCircle size={16} className="text-red-500 shrink-0" />}
            </div>
          ))}
        </div>
      )}

      {/* ── Drop Zone + Image Grid ───────────────────────────────────── */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={onDrop}
        className={`rounded-[var(--radius-lg)] transition-all ${draggingOver ? "ring-4 ring-[var(--color-accent)] ring-offset-2 bg-[var(--color-accent)]/5" : ""}`}
      >
        {images.length === 0 ? (
          /* Empty state — big drop zone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-4 py-24 border-2 border-dashed border-[var(--color-line)] rounded-[var(--radius-lg)] cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
              <ImageIcon size={28} className="text-[var(--color-slate)]" />
            </div>
            <div>
              <p className="font-bold text-[var(--color-ink)] text-base">Drop images here or click to upload</p>
              <p className="text-xs text-[var(--color-slate)] mt-1">PNG, JPG, WebP — multiple files allowed</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full">
              <Upload size={14} /> Choose Files
            </span>
          </div>
        ) : (
          /* Image grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Add more card */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-[var(--color-line)] rounded-[var(--radius-lg)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all text-[var(--color-slate)]"
            >
              <Plus size={24} />
              <span className="text-xs font-bold">Add More</span>
            </div>

            {images.map((img) => (
              <div
                key={img.id}
                className={`relative rounded-[var(--radius-lg)] overflow-hidden border shadow-sm group ${
                  img.active ? "border-[var(--color-line)]" : "border-[var(--color-line)] opacity-50"
                }`}
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
                      onClick={() => toggleCarouselImageActive(img.id, !img.active)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                      title={img.active ? "Hide from site" : "Show on site"}
                    >
                      {img.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(img)}
                      className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                      title="Delete permanently"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {/* Inactive badge */}
                  {!img.active && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Hidden
                    </div>
                  )}
                  {/* Order badge */}
                  <div className="absolute top-2 right-2 w-5 h-5 bg-black/60 text-white text-[10px] font-bold rounded flex items-center justify-center">
                    {img.order + 1}
                  </div>
                </div>

                {/* Caption editor */}
                <div className="bg-white px-2 py-1.5 border-t border-[var(--color-line)]">
                  {editingCaption === img.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        value={captionValue}
                        onChange={(e) => setCaptionValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") saveCaption(img.id); if (e.key === "Escape") setEditingCaption(null); }}
                        className="flex-1 text-xs border-b border-[var(--color-accent)] outline-none bg-transparent text-[var(--color-ink)] py-0.5"
                        placeholder="Add caption…"
                      />
                      <button onClick={() => saveCaption(img.id)} className="text-emerald-500"><CheckCircle size={12} /></button>
                      <button onClick={() => setEditingCaption(null)} className="text-[var(--color-slate)]"><X size={12} /></button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingCaption(img.id); setCaptionValue(img.caption || ""); }}
                      className="w-full text-left text-[10px] text-[var(--color-slate)] hover:text-[var(--color-ink)] truncate transition-colors"
                    >
                      {img.caption || <span className="italic">+ caption</span>}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {images.length > 0 && (
        <p className="text-xs text-[var(--color-slate)] text-center">
          {images.filter(i => i.active).length} of {images.length} images visible on site • Hover over an image to hide or delete it
        </p>
      )}
    </div>
  );
}
