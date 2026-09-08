"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2, Megaphone,
  Eye, EyeOff, RotateCcw, Calendar, Clock,
} from "lucide-react";
import { fetchAllAnnouncements, saveAnnouncement, removeAnnouncement } from "./actions";
import type { Announcement } from "@/lib/announcement-types";

const EMPTY: Omit<Announcement, "id"> = {
  headline: "",
  body: "",
  dateBadge: "",
  time: "",
  imageUrl: "",
  active: true,
  order: 0,
};

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAnnouncements();
      setItems(data);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to load announcements from GitHub." });
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
      order: items.length,
    });
    setIsNew(true);
  };

  const openEdit = (item: Announcement) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.headline.trim()) {
      setStatusMsg({ type: "error", text: "Headline is required." });
      return;
    }
    startTransition(async () => {
      const idToSave = isNew ? null : editing.id;
      const { id: _, ...payload } = editing;
      const res = await saveAnnouncement(idToSave, payload);
      if (res.ok) {
        setStatusMsg({ type: "success", text: isNew ? "Announcement added!" : "Announcement updated!" });
        setEditing(null);
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleDelete = (id: string, headline: string) => {
    if (!confirm(`Are you sure you want to delete "${headline}"?`)) return;
    startTransition(async () => {
      const res = await removeAnnouncement(id);
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Announcement deleted." });
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleToggleActive = (item: Announcement) => {
    startTransition(async () => {
      const { id, ...rest } = item;
      const res = await saveAnnouncement(id, { ...rest, active: !item.active });
      if (res.ok) {
        await load();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Announcements & News</h1>
          <p className="text-sm text-slate-500">
            Publish urgent church updates, revival notices, and gathering alerts across the site.
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
            Add Announcement
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
          <p className="text-sm text-slate-500">Loading announcements from GitHub...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-cloud border border-line rounded-lg">
          <Megaphone size={40} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No announcements yet</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">Post notices for the congregation.</p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            <Plus size={16} />
            Add Announcement
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg p-5 bg-white transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.active ? "border-line" : "border-line/60 bg-slate-50/50 opacity-75"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${item.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                    {item.active ? "Active" : "Hidden"}
                  </span>
                  {item.dateBadge && (
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700">
                      {item.dateBadge}
                    </span>
                  )}
                  {item.time && (
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock size={12} /> {item.time}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-800 text-base mb-1">{item.headline}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{item.body}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleToggleActive(item)}
                  disabled={isPending}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  title={item.active ? "Hide announcement" : "Show announcement"}
                >
                  {item.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors"
                  title="Edit announcement"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.headline)}
                  disabled={isPending}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete announcement"
                >
                  <Trash2 size={16} />
                </button>
              </div>
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
                {isNew ? "Add Announcement" : "Edit Announcement"}
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Headline *</label>
                <input
                  type="text"
                  value={editing.headline}
                  onChange={(e) => setEditing({ ...editing, headline: e.target.value })}
                  placeholder="e.g. Prophetic Service & Deliverance"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Body Text</label>
                <textarea
                  rows={3}
                  value={editing.body}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  placeholder="Details for the announcement..."
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date Badge</label>
                  <input
                    type="text"
                    value={editing.dateBadge || ""}
                    onChange={(e) => setEditing({ ...editing, dateBadge: e.target.value })}
                    placeholder="e.g. THIS SUNDAY, MIDWEEK"
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time</label>
                  <input
                    type="text"
                    value={editing.time || ""}
                    onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                    placeholder="e.g. 9:00 AM – 1:00 PM"
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
                {isNew ? "Create Announcement" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
