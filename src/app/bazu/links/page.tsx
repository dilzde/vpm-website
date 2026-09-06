"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Pencil,
  CheckCircle,
  X,
  Loader2,
  Globe,
  Link2,
  Eye,
  EyeOff,
  Share2,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  subscribeSocialLinks,
  upsertSocialLink,
  deleteSocialLink,
  type SocialLink,
} from "@/lib/firestore";
import { renderSocialIcon } from "@/components/common/SocialIcons";

const ICON_OPTIONS = [
  { value: "website", label: "Website", style: "bg-[#0F2540] text-white" },
  { value: "radio", label: "Radio Stream", style: "bg-[#6B21A8] text-white" },
  { value: "youtube", label: "YouTube", style: "bg-[#DC2626] text-white" },
  { value: "tiktok", label: "TikTok", style: "bg-[#09090B] text-white" },
  { value: "instagram", label: "Instagram", style: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white" },
  { value: "facebook", label: "Facebook", style: "bg-[#1877F2] text-white" },
  { value: "x", label: "X (Twitter)", style: "bg-black text-white" },
  { value: "whatsapp", label: "WhatsApp", style: "bg-[#16A34A] text-white" },
  { value: "default", label: "Other / Generic Link", style: "bg-[#5B9BD5] text-white" },
];

const DEFAULT_LINKS: Omit<SocialLink, "id">[] = [
  { label: "VPM International Website", url: "https://vpminternational.org", icon: "website", description: "Our official ministry website", active: true, order: 0 },
  { label: "Asriel Radio Live", url: "https://asrielradio.com", icon: "radio", description: "24/7 prophetic radio stream", active: true, order: 1 },
  { label: "YouTube Channel", url: "https://youtube.com/@vpminternational", icon: "youtube", description: "Sermons, revivals & live broadcasts", active: true, order: 2 },
  { label: "TikTok", url: "https://tiktok.com/@vpminternational", icon: "tiktok", description: "Short prophetic clips & highlights", active: true, order: 3 },
  { label: "Instagram", url: "https://instagram.com/vpminternational", icon: "instagram", description: "Ministry moments & announcements", active: true, order: 4 },
  { label: "X (Twitter)", url: "https://x.com/vpminternational", icon: "x", description: "", active: true, order: 5 },
  { label: "WhatsApp", url: "https://wa.me/254759265819", icon: "whatsapp", description: "Join our community", active: true, order: 6 },
];

const EMPTY: Omit<SocialLink, "id"> = {
  label: "",
  url: "",
  icon: "website",
  description: "",
  active: true,
  order: 0,
};

export default function AdminLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SocialLink> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seededOnce = false;
    const unsub = subscribeSocialLinks((data) => {
      setLinks(data);
      setLoading(false);

      // If Firestore has 0 links, auto-seed with standard 7 default links once so the admin immediately sees existing links
      if (data.length === 0 && !seededOnce) {
        seededOnce = true;
        (async () => {
          for (const l of DEFAULT_LINKS) {
            await upsertSocialLink(null, l);
          }
        })();
      }
    });
    return () => unsub();
  }, []);

  const seedDefaults = async () => {
    if (!confirm("This will load the 7 official VPM links into the database. Continue?")) return;
    setSeeding(true);
    try {
      for (const l of DEFAULT_LINKS) {
        await upsertSocialLink(null, l);
      }
    } finally {
      setSeeding(false);
    }
  };

  const openNew = () => {
    setEditing({ ...EMPTY, order: links.length });
    setIsNew(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const openEdit = (l: SocialLink) => {
    setEditing({ ...l });
    setIsNew(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.label?.trim() || !editing.url?.trim()) {
      alert("Please provide both a Link Title (Label) and a valid URL.");
      return;
    }

    setSaving(true);
    try {
      await upsertSocialLink(isNew ? null : (editing.id ?? null), {
        label: editing.label.trim(),
        url: editing.url.trim(),
        icon: editing.icon ?? "website",
        description: editing.description?.trim() ?? "",
        active: editing.active ?? true,
        order: editing.order ?? links.length,
      });
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save link. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (l: SocialLink) => {
    const ok = confirm(`Are you sure you want to delete "${l.label}" from the directory?\n\nThis will remove it from the public /links page.`);
    if (!ok) return;
    try {
      await deleteSocialLink(l.id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete link.");
    }
  };

  const toggleActive = async (l: SocialLink) => {
    try {
      await upsertSocialLink(l.id, { ...l, active: !l.active });
    } catch (err) {
      console.error(err);
    }
  };

  const getIconStyle = (iconKey?: string) => {
    const found = ICON_OPTIONS.find((o) => o.value === iconKey);
    return found ? found.style : "bg-[#0F2540] text-white";
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl">
      
      {/* ── Top Header Banner ── */}
      <div className="bg-[#0B0F17] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#62B4EE] uppercase tracking-wider">
            <Share2 size={14} />
            <span>Public Directory Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Link Directory (/links)
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
            Manage, add, and delete links displayed on the public{" "}
            <Link href="/links" target="_blank" className="text-[#62B4EE] underline font-bold hover:text-white">
              vpm-website.vercel.app/links
            </Link>{" "}
            page. Any changes you make here are updated in real time.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#29A3E4] hover:bg-[#1E87C2] text-white font-extrabold text-sm rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            id="add-link-btn"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Add New Link</span>
          </button>

          <button
            type="button"
            onClick={seedDefaults}
            disabled={seeding}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full border border-white/20 transition-all disabled:opacity-50"
            title="Restore default 7 ministry links"
          >
            {seeding ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* ── Quick Live URL Strip ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[var(--color-line)] rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-alt)] flex items-center justify-center text-[#1B5299] shrink-0 font-bold">
            <Globe size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--color-slate)] uppercase tracking-wider">
              Public Linktree Address
            </p>
            <p className="text-sm font-mono font-bold text-[var(--color-ink)]">
              /links
            </p>
          </div>
        </div>

        <Link
          href="/links"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-surface-alt)] hover:bg-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] transition-colors self-start sm:self-auto"
        >
          <span>Open Public /links Page</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* ── Edit / Add Link Form ── */}
      {editing && (
        <div
          ref={formRef}
          className="bg-white border-2 border-[#29A3E4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-line)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#29A3E4]/15 text-[#29A3E4] flex items-center justify-center font-bold">
                {isNew ? <Plus size={20} strokeWidth={2.5} /> : <Pencil size={18} />}
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[var(--color-ink)]">
                  {isNew ? "Add New Link to Directory" : `Edit Link: ${editing.label || "Link Details"}`}
                </h2>
                <p className="text-xs text-[var(--color-slate)]">
                  Fill in the details below. This will appear immediately on the /links page.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEditing(null)}
              className="p-2 rounded-full hover:bg-[var(--color-surface-alt)] text-[var(--color-slate)] transition-colors"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Title / Label */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1.5">
                  Link Title (Label) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editing.label ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p!, label: e.target.value }))}
                  placeholder="e.g. YouTube Channel or Facebook Page"
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[#29A3E4] focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Platform Icon */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1.5">
                  Platform Icon
                </label>
                <select
                  value={editing.icon ?? "website"}
                  onChange={(e) => setEditing((p) => ({ ...p!, icon: e.target.value }))}
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[#29A3E4] focus:bg-white transition-all font-medium"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination URL */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1.5">
                  Destination URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={editing.url ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p!, url: e.target.value }))}
                  placeholder="https://youtube.com/@vpminternational or https://..."
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl px-4 py-3 text-sm font-mono text-[var(--color-ink)] focus:outline-none focus:border-[#29A3E4] focus:bg-white transition-all"
                />
              </div>

              {/* Short Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1.5">
                  Short Subtitle / Description (Optional)
                </label>
                <input
                  type="text"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing((p) => ({ ...p!, description: e.target.value }))}
                  placeholder="e.g. Join our community or Watch Sunday service live"
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[#29A3E4] focus:bg-white transition-all"
                />
              </div>

              {/* Active Toggle */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editing.active ?? true}
                    onChange={(e) => setEditing((p) => ({ ...p!, active: e.target.checked }))}
                    className="w-5 h-5 rounded text-[#29A3E4] focus:ring-[#29A3E4] cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-bold text-[var(--color-ink)] block">
                      Active (Visible on public /links page)
                    </span>
                    <span className="text-xs text-[var(--color-slate)] block">
                      Uncheck to temporarily hide this link without deleting it.
                    </span>
                  </div>
                </label>
              </div>

            </div>

            {/* Form Buttons */}
            <div className="pt-4 border-t border-[var(--color-line)] flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0B0F17] hover:bg-[#1F2937] text-white font-extrabold text-sm rounded-full transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                <span>{saving ? "Saving Link..." : "Save Link"}</span>
              </button>

              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-6 py-3.5 border border-[var(--color-line)] hover:border-[var(--color-ink)] text-[var(--color-ink)] text-sm font-bold rounded-full transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Section Title & Links Counter ── */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--color-ink)]">
            Existing Directory Links ({links.length})
          </h2>
          <p className="text-xs text-[var(--color-slate)] mt-0.5">
            Each link below has dedicated <strong className="text-[var(--color-ink)]">Edit</strong> and <strong className="text-red-600">Delete</strong> buttons.
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5299] hover:underline"
        >
          <Plus size={14} />
          <span>Add another link</span>
        </button>
      </div>

      {/* ── Links Cards List ── */}
      {loading ? (
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-12 text-center text-[var(--color-slate)]">
          <Loader2 size={32} className="animate-spin mx-auto mb-3 text-[#29A3E4]" />
          <p className="font-bold text-sm">Loading directory links from database...</p>
        </div>
      ) : links.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[var(--color-line)] rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-alt)] flex items-center justify-center text-[var(--color-slate)] mx-auto">
            <Link2 size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-[var(--color-ink)]">No Links In Database Yet</h3>
            <p className="text-xs text-[var(--color-slate)] max-w-sm mx-auto">
              Click below to immediately load the 7 official VPM ministry links or create your own custom link.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={seedDefaults}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0F17] hover:bg-[#1F2937] text-white font-bold text-sm rounded-full transition-all shadow-md"
            >
              <Sparkles size={16} />
              <span>Load 7 Default Links</span>
            </button>
            <button
              type="button"
              onClick={openNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#29A3E4] hover:bg-[#1E87C2] text-white font-bold text-sm rounded-full transition-all shadow-md"
            >
              <Plus size={16} />
              <span>Add Custom Link</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, idx) => {
            const iconBg = getIconStyle(link.icon);

            return (
              <div
                key={link.id}
                className={`bg-white border border-[var(--color-line)] hover:border-[#29A3E4] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all ${
                  !link.active ? "opacity-60 bg-[var(--color-surface)]" : ""
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                  <span className="text-xs font-mono font-bold text-[var(--color-slate)]/60 w-5 text-center hidden sm:inline">
                    {idx + 1}
                  </span>

                  {/* Platform Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {renderSocialIcon(link.icon, 22)}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sans font-extrabold text-base text-[var(--color-ink)] truncate">
                        {link.label}
                      </h3>

                      {link.active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Visible on /links
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold border border-gray-200">
                          Hidden
                        </span>
                      )}
                    </div>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#1B5299] hover:underline truncate max-w-full"
                    >
                      <span className="truncate">{link.url}</span>
                      <ExternalLink size={12} className="shrink-0" />
                    </a>

                    {link.description && (
                      <p className="text-xs text-[var(--color-slate)] line-clamp-1 font-sans">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons (BIG, EXPLICIT, UNMISTAKABLE) */}
                <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--color-line)] shrink-0 self-end sm:self-center">
                  
                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEdit(link)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:border-[#0B0F17] transition-all cursor-pointer shadow-xs"
                    title={`Edit ${link.label}`}
                  >
                    <Pencil size={14} className="text-[#1B5299]" />
                    <span>Edit</span>
                  </button>

                  {/* Toggle Visibility Button */}
                  <button
                    type="button"
                    onClick={() => toggleActive(link)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      link.active
                        ? "bg-white hover:bg-gray-50 text-[var(--color-slate)] border-[var(--color-line)]"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}
                    title={link.active ? "Hide from public view" : "Show in public directory"}
                  >
                    {link.active ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span className="hidden md:inline">{link.active ? "Hide" : "Show"}</span>
                  </button>

                  {/* Delete Button (PROMINENT RED DANGER STYLE) */}
                  <button
                    type="button"
                    onClick={() => handleDelete(link)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title={`Delete ${link.label}`}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>

                </div>
              </div>
            );
          })}

          {/* ── Prominent Bottom "+ Add Another Link" Button Box ── */}
          <button
            type="button"
            onClick={openNew}
            className="w-full py-5 rounded-2xl border-2 border-dashed border-[var(--color-line)] hover:border-[#29A3E4] hover:bg-[#29A3E4]/5 text-[var(--color-slate)] hover:text-[#1B5299] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
          >
            <Plus size={18} />
            <span>+ Add Another Link to Directory</span>
          </button>
        </div>
      )}

    </div>
  );
}
