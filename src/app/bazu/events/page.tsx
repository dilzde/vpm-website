"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2, Calendar,
  Clock, MapPin, Wifi, WifiOff, ImageIcon, Upload, Eye, EyeOff, RotateCcw,
} from "lucide-react";
import { fetchAllEvents, saveEvent, removeEvent, uploadPosterFile } from "./actions";
import type { SiteEvent } from "@/lib/event-types";

const EMPTY: Omit<SiteEvent, "id"> = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  isOnline: false,
  active: true,
  order: 0,
  posterUrl: null,
  posterStoragePath: null,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SiteEvent | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchAllEvents();
      setEvents(data);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to load events from GitHub." });
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
      order: events.length,
    });
    setIsNew(true);
  };

  const openEdit = (ev: SiteEvent) => {
    setEditing({ ...ev });
    setIsNew(false);
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingPoster(true);
    setStatusMsg(null);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const res = await uploadPosterFile(base64, file.name);
        if (res.ok) {
          setEditing((prev) => (prev ? { ...prev, posterUrl: res.url, posterStoragePath: res.storagePath } : prev));
          setStatusMsg({ type: "success", text: "Poster uploaded to GitHub." });
        } else {
          setStatusMsg({ type: "error", text: res.error });
        }
        setUploadingPoster(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to process image file." });
      setUploadingPoster(false);
    }
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      setStatusMsg({ type: "error", text: "Event title is required." });
      return;
    }
    startTransition(async () => {
      const idToSave = isNew ? null : editing.id;
      const { id: _, ...payload } = editing;
      const res = await saveEvent(idToSave, payload);
      if (res.ok) {
        setStatusMsg({ type: "success", text: isNew ? "Event added successfully!" : "Event updated!" });
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
      const res = await removeEvent(id);
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Event deleted." });
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleToggleActive = (ev: SiteEvent) => {
    startTransition(async () => {
      const { id, ...rest } = ev;
      const res = await saveEvent(id, { ...rest, active: !ev.active });
      if (res.ok) {
        await load();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Events Management</h1>
          <p className="text-sm text-slate-500">
            Manage church gatherings, vigils, conferences, and revival schedules.
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
            Add Event
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

      {loading ? (
        <div className="text-center py-16">
          <Loader2 size={32} className="animate-spin text-sky-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Loading events from GitHub...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-cloud border border-line rounded-lg">
          <Calendar size={40} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No events found</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">Add your first gathering to display on the public website.</p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className={`border rounded-lg p-5 bg-white transition-all shadow-xs flex flex-col justify-between ${
                ev.active ? "border-line" : "border-line/60 bg-slate-50/50 opacity-75"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${ev.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                      {ev.active ? "Active" : "Hidden"}
                    </span>
                    {ev.isOnline && (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-50 text-sky-700 flex items-center gap-1">
                        <Wifi size={11} /> Online Stream
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(ev)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      title={ev.active ? "Hide event" : "Show event"}
                    >
                      {ev.active ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      onClick={() => openEdit(ev)}
                      className="p-1.5 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors"
                      title="Edit event"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id, ev.title)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete event"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 text-base mb-1">{ev.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{ev.description}</p>

                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{ev.date || "Date TBA"}</span>
                    {ev.time && <span className="text-slate-400">• {ev.time}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-slate-400" />
                    <span className="truncate">{ev.location || "Location TBA"}</span>
                  </div>
                </div>
              </div>

              {ev.posterUrl && (
                <div className="mt-4 pt-3 border-t border-line flex items-center gap-3">
                  <img src={ev.posterUrl} alt="Poster preview" className="w-12 h-12 object-cover rounded border border-line" />
                  <span className="text-xs text-slate-400">Custom poster attached</span>
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
                {isNew ? "Add New Event" : "Edit Event"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title *</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. Sunday Worship Service"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Details about the gathering..."
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time</label>
                  <input
                    type="text"
                    value={editing.time}
                    onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                    placeholder="e.g. 9:00 AM – 1:00 PM"
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={editing.location}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  placeholder="e.g. VPM Githurai Main Altar"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.isOnline}
                    onChange={(e) => setEditing({ ...editing, isOnline: e.target.checked })}
                    className="rounded text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-xs font-medium text-slate-700">Online Live Stream Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.active}
                    onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                    className="rounded text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-xs font-medium text-slate-700">Active (Visible on Website)</span>
                </label>
              </div>

              {/* Event Poster Upload */}
              <div className="pt-2 border-t border-line">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Poster Image</label>
                <div className="flex items-center gap-3">
                  {editing.posterUrl ? (
                    <div className="flex items-center gap-3">
                      <img src={editing.posterUrl} alt="Poster" className="w-16 h-16 object-cover rounded border border-line" />
                      <button
                        type="button"
                        onClick={() => setEditing({ ...editing, posterUrl: null, posterStoragePath: null })}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove Poster
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handlePosterUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingPoster}
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-line rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {uploadingPoster ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                        {uploadingPoster ? "Uploading to GitHub..." : "Upload Poster"}
                      </button>
                    </div>
                  )}
                </div>
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
                disabled={isPending || uploadingPoster}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:opacity-50 transition-colors shadow-sm"
              >
                {isPending && <Loader2 size={13} className="animate-spin" />}
                {isNew ? "Create Event" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
