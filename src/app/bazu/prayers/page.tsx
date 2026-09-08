"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Heart, Clock, Globe, Smartphone, CheckCircle, Trash2,
  ShieldCheck, Loader2, RotateCcw, AlertCircle, Sparkles,
} from "lucide-react";
import { fetchAllPrayers, changePrayerStatus, removePrayer } from "./actions";
import type { PrayerRequest } from "@/lib/prayer-types";

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "prayed" | "answered">("all");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchAllPrayers();
      setPrayers(data);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to load prayer requests from GitHub." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = (id: string, newStatus: PrayerRequest["status"]) => {
    startTransition(async () => {
      const res = await changePrayerStatus(id, newStatus);
      if (res.ok) {
        setStatusMsg({ type: "success", text: `Prayer request marked as ${newStatus}.` });
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete prayer petition from "${name}"?`)) return;
    startTransition(async () => {
      const res = await removePrayer(id);
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Petition removed." });
        await load();
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const items = prayers.filter((p) => filter === "all" || p.status === filter);
  const pendingCount = prayers.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">Prayer Altar Inbox</h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Incoming prayer petitions and counselling requests submitted by believers worldwide.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-md border border-line transition-colors self-start sm:self-auto"
          title="Reload from GitHub"
        >
          <RotateCcw size={16} className={loading ? "animate-spin" : ""} />
        </button>
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
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "pending", "prayed", "answered"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
              filter === f
                ? "bg-sky-500 text-white border-sky-500 shadow-xs"
                : "bg-cloud text-slate-600 border-line hover:border-sky-300"
            }`}
          >
            {f === "all" ? "All Requests" : f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "pending" && pendingCount > 0 && ` (${pendingCount})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 size={32} className="animate-spin text-sky-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Loading prayer inbox from GitHub...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-cloud border border-line rounded-lg">
          <Heart size={40} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No prayer petitions in this category</h3>
          <p className="text-sm text-slate-500 mt-1">Petitions sent from the public website will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg p-5 bg-white transition-all shadow-xs flex flex-col justify-between ${
                item.status === "pending" ? "border-amber-300 ring-1 ring-amber-200" : "border-line"
              }`}
            >
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-50 text-sky-700">
                      {item.category}
                    </span>
                    {item.isPrivate && (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 flex items-center gap-1">
                        <ShieldCheck size={11} /> Confidential
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      item.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : item.status === "prayed"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 uppercase">
                      {item.source === "app" ? <Smartphone size={12} /> : <Globe size={12} />}
                      {item.source}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded border border-slate-100">
                  &ldquo;{item.request}&rdquo;
                </p>

                {(item.email || item.phone) && (
                  <div className="text-xs text-slate-500 flex items-center gap-4">
                    {item.email && <span>Email: {item.email}</span>}
                    {item.phone && <span>Phone: {item.phone}</span>}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {item.status === "pending" && (
                    <button
                      onClick={() => handleStatusChange(item.id, "prayed")}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
                    >
                      <CheckCircle size={13} /> Mark as Prayed
                    </button>
                  )}
                  {item.status !== "answered" && (
                    <button
                      onClick={() => handleStatusChange(item.id, "answered")}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <Sparkles size={13} /> Mark as Answered / Testimony
                    </button>
                  )}
                  {item.status !== "pending" && (
                    <button
                      onClick={() => handleStatusChange(item.id, "pending")}
                      disabled={isPending}
                      className="px-2.5 py-1.5 rounded text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      Revert to Pending
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  disabled={isPending}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete petition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
