"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2, Calendar,
  Clock, MapPin, Wifi, WifiOff, ImageIcon, Upload, Eye, EyeOff, Sparkles,
} from "lucide-react";
import {
  subscribeAllEventsFirestore,
  addFirestoreEvent,
  updateFirestoreEvent,
  deleteFirestoreEvent,
  type FirestoreEvent,
} from "@/lib/firestore";
import { uploadCarouselImage } from "@/lib/uploadImage";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { storage } from "@/lib/firebase";

const EMPTY: Omit<FirestoreEvent, "id" | "createdAt"> = {
  title: "", description: "", date: "", time: "", location: "",
  isOnline: false, active: true, order: 0,
  posterUrl: undefined, posterStoragePath: undefined,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<FirestoreEvent[]>([]);
  const [editing, setEditing] = useState<Partial<FirestoreEvent> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeAllEventsFirestore(setEvents);
    return () => unsub();
  }, []);

  const openNew = () => {
    setEditing({ ...EMPTY });
    setIsNew(true);
  };

  const openEdit = (ev: FirestoreEvent) => {
    setEditing({ ...ev });
    setIsNew(false);
  };

  const handlePosterUpload = async (file: File) => {
    setUploadProgress(0);
    try {
      const { url, storagePath } = await uploadCarouselImage("gallery", file, setUploadProgress);
      setEditing((prev) => prev ? { ...prev, posterUrl: url, posterStoragePath: storagePath } : prev);
    } catch {
      alert("Poster upload failed. Please try again.");
    } finally {
      setUploadProgress(null);
    }
  };

  const removePoster = async () => {
    if (editing?.posterStoragePath) {
      try { await deleteObject(storageRef(storage, editing.posterStoragePath)); } catch { /* already gone */ }
    }
    setEditing((prev) => prev ? { ...prev, posterUrl: undefined, posterStoragePath: undefined } : prev);
  };

  const handleSave = async () => {
    if (!editing?.title || !editing.date) return alert("Title and date are required.");
    setSaving(true);
    try {
      const data = {
        title: editing.title ?? "",
        description: editing.description ?? "",
        date: editing.date ?? "",
        time: editing.time ?? "",
        location: editing.location ?? "",
        isOnline: editing.isOnline ?? false,
        active: editing.active ?? true,
        order: editing.order ?? events.length,
        posterUrl: editing.posterUrl ?? null,
        posterStoragePath: editing.posterStoragePath ?? null,
      };
      if (isNew) {
        await addFirestoreEvent(data as Omit<FirestoreEvent, "id">);
      } else {
        await updateFirestoreEvent(editing.id!, data);
      }
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ev: FirestoreEvent) => {
    if (!confirm(`Delete "${ev.title}"?`)) return;
    if (ev.posterStoragePath) {
      try { await deleteObject(storageRef(storage, ev.posterStoragePath)); } catch { /* gone */ }
    }
    await deleteFirestoreEvent(ev.id);
  };

  const toggleActive = (ev: FirestoreEvent) =>
    updateFirestoreEvent(ev.id, { active: !ev.active });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Sparkles size={14} /> Events Management
          </p>
          <h1 className="text-2xl font-extrabold text-white">Gatherings &amp; Events</h1>
          <p className="text-xs text-slate-300 mt-1">Add, edit, or remove events. Changes appear on the site instantly.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all shrink-0"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Edit / Add Form */}
      {editing && (
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-6 space-y-5 shadow-[var(--shadow-xl)]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-[var(--color-ink)]">{isNew ? "New Event" : "Edit Event"}</h2>
            <button onClick={() => setEditing(null)} className="text-[var(--color-slate)] hover:text-[var(--color-ink)]"><X size={18} /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Title *</label>
              <input value={editing.title ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, title: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-sans focus:outline-none focus:border-[var(--color-accent)]" placeholder="Event name" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Description</label>
              <textarea value={editing.description ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, description: e.target.value }))} rows={3}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-sans focus:outline-none focus:border-[var(--color-accent)] resize-none" placeholder="Event details..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Date *</label>
              <input type="date" value={editing.date ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, date: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-sans focus:outline-none focus:border-[var(--color-accent)]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Time</label>
              <input value={editing.time ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, time: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-sans focus:outline-none focus:border-[var(--color-accent)]" placeholder="e.g. 9:00 AM – 12:00 PM" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Location</label>
              <input value={editing.location ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, location: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-sans focus:outline-none focus:border-[var(--color-accent)]" placeholder="Venue / Online" />
            </div>
            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.isOnline ?? false} onChange={(e) => setEditing((p) => ({ ...p!, isOnline: e.target.checked }))} className="w-4 h-4 accent-[var(--color-accent)]" />
                <span className="text-sm font-sans text-[var(--color-ink)]">Online / Streaming</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.active ?? true} onChange={(e) => setEditing((p) => ({ ...p!, active: e.target.checked }))} className="w-4 h-4 accent-[var(--color-accent)]" />
                <span className="text-sm font-sans text-[var(--color-ink)]">Active (visible)</span>
              </label>
            </div>
          </div>

          {/* Poster upload */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-slate)] mb-2">Event Poster (optional)</label>
            {editing.posterUrl ? (
              <div className="relative w-40 h-40 rounded-[var(--radius-eight)] overflow-hidden border border-[var(--color-line)] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={editing.posterUrl} alt="poster" className="w-full h-full object-cover" />
                <button onClick={removePoster} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-40 rounded-[var(--radius-eight)] border-2 border-dashed border-[var(--color-line)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-accent)] transition-colors text-[var(--color-slate)]"
              >
                {uploadProgress !== null ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-xs">{uploadProgress}%</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={24} />
                    <span className="text-xs font-bold">Upload Poster</span>
                  </>
                )}
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handlePosterUpload(e.target.files[0])} />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              {saving ? "Saving…" : "Save Event"}
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 border border-[var(--color-line)] rounded-full text-sm font-bold text-[var(--color-slate)] hover:border-[var(--color-ink)] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      {events.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-slate)]">
          <Calendar size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-bold">No events yet</p>
          <p className="text-sm mt-1">Click "Add Event" to create your first gathering.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div key={ev.id} className={`bg-white border rounded-[var(--radius-image)] overflow-hidden shadow-[var(--shadow-card)] flex ${!ev.active ? "opacity-50" : ""} border-[var(--color-line)]`}>
              {/* Poster thumb */}
              <div className="w-24 h-auto bg-[var(--color-navy-900)] shrink-0 relative">
                {ev.posterUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={ev.posterUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full min-h-[80px] flex items-center justify-center">
                    <ImageIcon size={20} className="text-white/30" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                <div>
                  <p className="font-bold text-sm text-[var(--color-ink)] truncate">{ev.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-slate)]">
                    <span className="flex items-center gap-1"><Calendar size={11} />{ev.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-[var(--color-slate)]">
                    <MapPin size={11} />{ev.location}
                    {ev.isOnline && <span className="ml-1 text-[var(--color-live)] font-bold flex items-center gap-0.5"><Wifi size={10} /> Online</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <button onClick={() => openEdit(ev)} className="p-1.5 rounded-md text-[var(--color-slate)] hover:bg-[var(--color-surface-alt)] transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => toggleActive(ev)} className={`p-1.5 rounded-md transition-colors ${ev.active ? "text-[var(--color-accent)]" : "text-[var(--color-slate)]"}`} title={ev.active ? "Hide" : "Show"}>
                    {ev.active ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button onClick={() => handleDelete(ev)} className="p-1.5 rounded-md text-[var(--color-slate)] hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
