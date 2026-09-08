"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2,
  Smartphone, Globe, Send, Heart, Eye, EyeOff, DollarSign, AlertCircle, RotateCcw,
} from "lucide-react";
import { fetchPaymentMethods, savePaymentMethod, removePaymentMethod } from "./actions";
import type { PaymentMethod } from "@/lib/payment-methods.server";

const TYPE_OPTIONS = [
  { value: "mpesa",    label: "M-Pesa Send Money" },
  { value: "till",     label: "M-Pesa Till" },
  { value: "paypal",   label: "PayPal" },
  { value: "sendwave", label: "Sendwave" },
  { value: "bank",     label: "Bank Transfer" },
  { value: "other",    label: "Other" },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  mpesa:    <Smartphone size={16} />,
  till:     <Smartphone size={16} />,
  paypal:   <Globe size={16} />,
  sendwave: <Send size={16} />,
  other:    <Heart size={16} />,
};

const EMPTY: Omit<PaymentMethod, "id"> = {
  label: "", type: "mpesa", value: "", instructions: "", note: "", active: true, order: 0,
};

export default function AdminGivePage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<PaymentMethod> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [isPending, startTransition] = useTransition();

  const reload = () => {
    setLoading(true);
    fetchPaymentMethods().then((data) => {
      setMethods(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
  };

  useEffect(() => { reload(); }, []);

  const ok  = (msg: string) => { setFeedback({ msg, type: "success" }); setTimeout(() => setFeedback(null), 5000); };
  const fail = (msg: string) => { setFeedback({ msg, type: "error" });   setTimeout(() => setFeedback(null), 8000); };

  const openNew  = () => { setEditing({ ...EMPTY, order: methods.length }); setIsNew(true); };
  const openEdit = (m: PaymentMethod) => { setEditing({ ...m }); setIsNew(false); };

  const handleSave = () => {
    if (!editing?.label?.trim() || !editing.value?.trim()) {
      alert("Label and Value are required.");
      return;
    }
    setEditing(null);
    startTransition(async () => {
      const res = await savePaymentMethod(isNew ? null : (editing?.id ?? null), {
        label:        editing!.label!.trim(),
        type:         editing!.type ?? "other",
        value:        editing!.value!.trim(),
        instructions: editing!.instructions?.trim() ?? "",
        note:         editing!.note?.trim() ?? "",
        active:       editing!.active ?? true,
        order:        typeof editing!.order === "number" ? editing!.order : methods.length,
      });
      if (res.ok) { ok(isNew ? "Payment method added!" : "Payment method updated!"); reload(); }
      else fail(`Save failed: ${res.error}`);
    });
  };

  const handleDelete = (m: PaymentMethod) => {
    if (!confirm(`Delete "${m.label}"?`)) return;
    startTransition(async () => {
      const res = await removePaymentMethod(m.id);
      if (res.ok) { ok(`"${m.label}" removed.`); reload(); }
      else fail(res.error);
    });
  };

  const toggleActive = (m: PaymentMethod) => {
    startTransition(async () => {
      const res = await savePaymentMethod(m.id, { ...m, active: !m.active });
      if (res.ok) { ok(m.active ? `"${m.label}" hidden.` : `"${m.label}" visible.`); reload(); }
      else fail(res.error);
    });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <DollarSign size={14} /> Payment Methods
          </p>
          <h1 className="text-2xl font-extrabold text-white">Give &amp; Payment Methods</h1>
          <p className="text-xs text-slate-300 mt-1">
            Changes save to GitHub and go live on <strong className="text-[var(--color-accent)]">/give</strong> within seconds.
          </p>
        </div>
        <button
          onClick={openNew}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all disabled:opacity-60 shrink-0"
        >
          <Plus size={16} /> Add Method
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white border-2 border-[var(--color-accent)] rounded-[var(--radius-lg)] p-6 space-y-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-[var(--color-ink)]">
              {isNew ? "Add New Payment Method" : `Edit: ${editing.label || "Method"}`}
            </h2>
            <button onClick={() => setEditing(null)}><X size={18} className="text-[var(--color-slate)]" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1">Label *</label>
              <input
                value={editing.label ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p!, label: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="e.g. M-Pesa Send Money"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1">Type</label>
              <select
                value={editing.type ?? "other"}
                onChange={(e) => setEditing((p) => ({ ...p!, type: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]"
              >
                {TYPE_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1">Number / Email / Username *</label>
              <input
                value={editing.value ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p!, value: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="e.g. 0794731831"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1">Scripture Note (optional)</label>
              <input
                value={editing.note ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p!, note: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="e.g. Matthew 25:35-40"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-slate)] mb-1">Step-by-step Instructions</label>
              <textarea
                value={editing.instructions ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p!, instructions: e.target.value }))}
                rows={3}
                className="w-full border border-[var(--color-line)] rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-[var(--color-accent)]"
                placeholder="Step-by-step instructions for the donor..."
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.active ?? true}
                  onChange={(e) => setEditing((p) => ({ ...p!, active: e.target.checked }))}
                  className="w-4 h-4 accent-[var(--color-accent)]"
                />
                <span className="text-sm font-bold text-[var(--color-ink)]">Active (visible on Give page)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0F17] hover:bg-[#1F2937] text-white font-extrabold text-sm rounded-full transition-all disabled:opacity-50"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              {isPending ? "Saving…" : isNew ? "Add Method" : "Save Changes"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-3 border border-[var(--color-line)] rounded-full text-sm font-bold text-[var(--color-slate)] hover:border-[var(--color-ink)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-between shadow-xs animate-in fade-in ${
          feedback.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? <CheckCircle size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
            <span>{feedback.msg}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Methods list */}
      {loading ? (
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-12 text-center">
          <Loader2 size={32} className="animate-spin mx-auto mb-3 text-[var(--color-accent)]" />
          <p className="font-bold text-sm text-[var(--color-slate)]">Loading payment methods from GitHub…</p>
        </div>
      ) : methods.length === 0 && !editing ? (
        <div className="text-center py-20 text-[var(--color-slate)]">
          <DollarSign size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-bold">No payment methods yet</p>
          <p className="text-sm mt-1">Click "Add Method" to add one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[var(--color-ink)]">Payment Methods ({methods.length})</h2>
          </div>
          {methods.map((m) => (
            <div
              key={m.id}
              className={`bg-white border border-[var(--color-line)] hover:border-[var(--color-accent)] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-all ${!m.active ? "opacity-60" : ""}`}
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center shrink-0 shadow-sm">
                  {ICON_MAP[m.type] ?? <Heart size={16} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base text-[var(--color-ink)]">{m.label}</h3>
                    {!m.active && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold border border-gray-200">Hidden</span>
                    )}
                    {m.active && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Visible on /give
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-slate)] font-mono mt-0.5">{m.value}</p>
                  {m.note && <p className="text-xs text-amber-600 mt-0.5 font-semibold">{m.note}</p>}
                  {m.instructions && <p className="text-xs text-[var(--color-slate)] mt-0.5 line-clamp-1">{m.instructions}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--color-line)] shrink-0 self-end sm:self-center">
                <button
                  onClick={() => openEdit(m)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:border-[#0B0F17] transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Pencil size={14} className="text-[#1B5299]" /><span>Edit</span>
                </button>
                <button
                  onClick={() => toggleActive(m)}
                  disabled={isPending}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50 ${
                    m.active ? "bg-white text-[var(--color-slate)] border-[var(--color-line)]" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {m.active ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span className="hidden md:inline">{m.active ? "Hide" : "Show"}</span>
                </button>
                <button
                  onClick={() => handleDelete(m)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Trash2 size={14} /><span>Delete</span>
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={openNew}
            className="w-full py-5 rounded-2xl border-2 border-dashed border-[var(--color-line)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 text-[var(--color-slate)] hover:text-[#1B5299] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
          >
            <Plus size={18} /><span>+ Add Another Payment Method</span>
          </button>
        </div>
      )}

      {isPending && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0F17] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <Loader2 size={14} className="animate-spin" /><span>Saving to GitHub…</span>
        </div>
      )}
    </div>
  );
}
