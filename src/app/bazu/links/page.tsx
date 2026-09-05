"use client";

import React, { useEffect, useState } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2,
  Globe, Link2, Eye, EyeOff, GripVertical, Share2,
} from "lucide-react";
import {
  subscribeSocialLinks,
  upsertSocialLink,
  deleteSocialLink,
  type SocialLink,
} from "@/lib/firestore";
import { renderSocialIcon } from "@/components/common/SocialIcons";

const ICON_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "radio", label: "Radio" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "default", label: "Other" },
];

const DEFAULT_LINKS: Omit<SocialLink, "id">[] = [
  { label: "VPM International Website", url: "https://vpminternational.org", icon: "website", description: "Our official ministry website", active: true, order: 0 },
  { label: "Asriel Radio Live", url: "https://asrielradio.com", icon: "radio", description: "24/7 prophetic radio stream", active: true, order: 1 },
  { label: "YouTube Channel", url: "https://youtube.com/@vpminternational", icon: "youtube", description: "Sermons, revivals & live broadcasts", active: true, order: 2 },
  { label: "TikTok", url: "https://tiktok.com/@vpminternational", icon: "tiktok", description: "Short prophetic clips & highlights", active: true, order: 3 },
  { label: "Instagram", url: "https://instagram.com/vpminternational", icon: "instagram", description: "Ministry moments & announcements", active: true, order: 4 },
  { label: "X (Twitter)", url: "https://x.com/vpminternational", icon: "x", description: "", active: true, order: 5 },
  { label: "WhatsApp Community", url: "https://wa.me/254759265819", icon: "whatsapp", description: "Join our prayer & fellowship group", active: true, order: 6 },
];

const EMPTY: Omit<SocialLink, "id"> = {
  label: "", url: "", icon: "default", description: "", active: true, order: 0,
};

export default function AdminLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<Partial<SocialLink> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    const unsub = subscribeSocialLinks(setLinks);
    return () => unsub();
  }, []);

  const seedDefaults = async () => {
    if (seeded) return;
    setSeeded(true);
    for (const l of DEFAULT_LINKS) {
      await upsertSocialLink(null, l);
    }
  };

  const openNew = () => { setEditing({ ...EMPTY, order: links.length }); setIsNew(true); };
  const openEdit = (l: SocialLink) => { setEditing({ ...l }); setIsNew(false); };

  const handleSave = async () => {
    if (!editing?.label || !editing.url) return alert("Label and URL are required.");
    setSaving(true);
    try {
      await upsertSocialLink(isNew ? null : (editing.id ?? null), {
        label: editing.label!, url: editing.url!, icon: editing.icon ?? "default",
        description: editing.description ?? "", active: editing.active ?? true,
        order: editing.order ?? links.length,
      });
      setEditing(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async (l: SocialLink) => {
    if (!confirm(`Remove "${l.label}"?`)) return;
    await deleteSocialLink(l.id);
  };

  const toggleActive = (l: SocialLink) => upsertSocialLink(l.id, { ...l, active: !l.active });

  const linkPageUrl = typeof window !== "undefined" ? `${window.location.origin}/links` : "/links";

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Share2 size={14} /> Social Link Hub
          </p>
          <h1 className="text-2xl font-extrabold text-white">Link Directory (Linktree)</h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage social links at{" "}
            <a href="/links" target="_blank" className="underline text-[var(--color-accent)] hover:text-white transition-colors">/links</a>
            {" "}— changes are live instantly.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {links.length === 0 && (
            <button onClick={seedDefaults} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white font-bold text-sm rounded-full hover:bg-white/20 transition-all border border-white/20">
              Seed Defaults
            </button>
          )}
          <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all">
            <Plus size={16} /> Add Link
          </button>
        </div>
      </div>

      {/* Live preview URL */}
      <div className="flex items-center gap-3 p-4 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)]">
        <Globe size={16} className="text-[var(--color-accent)] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[var(--color-slate)] uppercase tracking-wider mb-0.5">Your Link Directory URL</p>
          <p className="text-sm font-mono text-[var(--color-ink)] truncate">{linkPageUrl}</p>
        </div>
        <a href="/links" target="_blank" className="text-xs font-bold text-[var(--color-accent)] hover:underline shrink-0">Open →</a>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-6 space-y-4 shadow-[var(--shadow-xl)]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-[var(--color-ink)]">{isNew ? "New Link" : "Edit Link"}</h2>
            <button onClick={() => setEditing(null)}><X size={18} className="text-[var(--color-slate)]" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Label *</label>
              <input value={editing.label ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, label: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]" placeholder="e.g. YouTube Channel" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Icon / Platform</label>
              <select value={editing.icon ?? "default"} onChange={(e) => setEditing((p) => ({ ...p!, icon: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]">
                {ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">URL *</label>
              <input value={editing.url ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, url: e.target.value }))} type="url"
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-accent)]" placeholder="https://..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Short Description (optional)</label>
              <input value={editing.description ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, description: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]" placeholder="e.g. Sermons, revivals & live broadcasts" />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.active ?? true} onChange={(e) => setEditing((p) => ({ ...p!, active: e.target.checked }))} className="w-4 h-4 accent-[var(--color-accent)]" />
                <span className="text-sm">Active (show on link page)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 border border-[var(--color-line)] rounded-full text-sm font-bold text-[var(--color-slate)] hover:border-[var(--color-ink)] transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Links list */}
      {links.length === 0 && !editing ? (
        <div className="text-center py-20 text-[var(--color-slate)]">
          <Link2 size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-bold">No links yet</p>
          <p className="text-sm mt-1">Click "Seed Defaults" to load preset links, or add manually.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((l) => {
            return (
              <div key={l.id} className={`bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-4 flex items-center gap-4 shadow-[var(--shadow-card)] ${!l.active ? "opacity-50" : ""}`}>
                <GripVertical size={16} className="text-[var(--color-slate)] shrink-0" />
                <div className="w-8 h-8 rounded-md bg-[var(--color-navy-900)] text-white flex items-center justify-center shrink-0">
                  {renderSocialIcon(l.icon, 16)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[var(--color-ink)] truncate">{l.label}</p>
                  <p className="text-xs text-[var(--color-slate)] font-mono truncate">{l.url}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => openEdit(l)} className="p-1.5 rounded-md text-[var(--color-slate)] hover:bg-[var(--color-surface-alt)] transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => toggleActive(l)} className={`p-1.5 rounded-md transition-colors ${l.active ? "text-[var(--color-accent)]" : "text-[var(--color-slate)]"}`}>
                    {l.active ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button onClick={() => handleDelete(l)} className="p-1.5 rounded-md text-[var(--color-slate)] hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
