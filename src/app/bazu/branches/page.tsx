"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2, MapPin,
  Phone, Globe, Eye, EyeOff, RotateCcw, Star,
} from "lucide-react";
import { fetchAllBranches, saveBranch, removeBranch } from "./actions";
import type { Branch } from "@/lib/branch-types";

const EMPTY: Omit<Branch, "id"> = {
  name: "",
  region: "",
  location: "",
  phone: "",
  mapsUrl: "",
  badge: "",
  isFeatured: false,
  active: true,
  order: 0,
};

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchAllBranches();
      setBranches(data);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to load branches from GitHub." });
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
      order: branches.length,
    });
    setIsNew(true);
  };

  const openEdit = (branch: Branch) => {
    setEditing({ ...branch });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      setStatusMsg({ type: "error", text: "Branch name is required." });
      return;
    }
    startTransition(async () => {
      const idToSave = isNew ? null : editing.id;
      const { id: _, ...payload } = editing;
      const res = await saveBranch(idToSave, payload);
      if (res.ok) {
        setStatusMsg({ type: "success", text: isNew ? "Branch added successfully!" : "Branch updated!" });
        setEditing(null);
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    startTransition(async () => {
      const res = await removeBranch(id);
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Branch deleted." });
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleToggleActive = (branch: Branch) => {
    startTransition(async () => {
      const { id, ...rest } = branch;
      const res = await saveBranch(id, { ...rest, active: !branch.active });
      if (res.ok) {
        await load();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Branches Management</h1>
          <p className="text-sm text-slate-500">
            Manage church sanctuary locations, ministry headquarters, and regional worship centres.
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
            Add Branch
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
          <p className="text-sm text-slate-500">Loading branches from GitHub...</p>
        </div>
      ) : branches.length === 0 ? (
        <div className="text-center py-16 bg-cloud border border-line rounded-lg">
          <MapPin size={40} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No branches found</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">Add your sanctuary locations to display on the branches directory.</p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            <Plus size={16} />
            Add Branch
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`border rounded-lg p-5 bg-white transition-all shadow-xs flex flex-col justify-between ${
                branch.active ? "border-line" : "border-line/60 bg-slate-50/50 opacity-75"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${branch.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                      {branch.active ? "Active" : "Hidden"}
                    </span>
                    {branch.isFeatured && (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 flex items-center gap-1">
                        <Star size={11} className="fill-current" /> Featured HQ
                      </span>
                    )}
                    {branch.badge && (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-50 text-sky-700">
                        {branch.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(branch)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      title={branch.active ? "Hide branch" : "Show branch"}
                    >
                      {branch.active ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      onClick={() => openEdit(branch)}
                      className="p-1.5 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors"
                      title="Edit branch"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id, branch.name)}
                      disabled={isPending}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete branch"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 text-base mb-1">{branch.name}</h3>
                <p className="text-xs text-slate-500 font-medium mb-3">{branch.region}</p>

                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    <span>{branch.location}</span>
                  </div>
                  {branch.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-slate-400 shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  )}
                  {branch.mapsUrl && (
                    <div className="flex items-center gap-2">
                      <Globe size={13} className="text-slate-400 shrink-0" />
                      <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline truncate">
                        Google Maps link
                      </a>
                    </div>
                  )}
                </div>
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
                {isNew ? "Add New Branch" : "Edit Branch"}
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Branch Name *</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="e.g. VPM Nairobi (HQ)"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Region</label>
                  <input
                    type="text"
                    value={editing.region}
                    onChange={(e) => setEditing({ ...editing, region: e.target.value })}
                    placeholder="e.g. Nairobi, Coast, Western"
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editing.badge || ""}
                    onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                    placeholder="e.g. Ministry Headquarters, Mother Church"
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Physical Location Address</label>
                <input
                  type="text"
                  value={editing.location}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  placeholder="e.g. Family Bank Tower, Mlolongo, Nairobi"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editing.phone}
                    onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                    placeholder="e.g. +254 794 731 831"
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Order Priority</label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Google Maps URL</label>
                <input
                  type="url"
                  value={editing.mapsUrl}
                  onChange={(e) => setEditing({ ...editing, mapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.isFeatured}
                    onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })}
                    className="rounded text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-xs font-medium text-slate-700">Feature as Top Headquarter Card</span>
                </label>
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
                {isNew ? "Create Branch" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
