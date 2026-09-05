"use client";

import React, { useEffect, useState } from "react";
import {
  Plus, Trash2, Pencil, CheckCircle, X, Loader2, GripVertical,
  Smartphone, Globe, Send, Heart, Eye, EyeOff, DollarSign,
} from "lucide-react";
import {
  subscribePaymentMethods,
  upsertPaymentMethod,
  deletePaymentMethod,
  type PaymentMethod,
} from "@/lib/firestore";

const TYPE_OPTIONS = [
  { value: "mpesa", label: "M-Pesa Send Money" },
  { value: "till", label: "M-Pesa Till" },
  { value: "paypal", label: "PayPal" },
  { value: "sendwave", label: "Sendwave" },
  { value: "bank", label: "Bank Transfer" },
  { value: "other", label: "Other" },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  mpesa: <Smartphone size={16} />,
  till: <Smartphone size={16} />,
  paypal: <Globe size={16} />,
  sendwave: <Send size={16} />,
  other: <Heart size={16} />,
};

const EMPTY: Omit<PaymentMethod, "id"> = {
  label: "", type: "mpesa", value: "", instructions: "", note: "", active: true, order: 0,
};

const DEFAULT_METHODS: Omit<PaymentMethod, "id">[] = [
  { label: "M-Pesa Send Money", type: "mpesa", value: "0759265819", instructions: "Open M-Pesa → Send Money → Enter 0759265819 → Amount → PIN", active: true, order: 0 },
  { label: "M-Pesa Till (Missionary Work)", type: "till", value: "Enter Till Number", instructions: "Open M-Pesa → Lipa na M-Pesa → Buy Goods → Till Number → Amount → PIN", note: "Matthew 25:35-40", active: true, order: 1 },
  { label: "PayPal", type: "paypal", value: "mtishiby@gmail.com", instructions: "Go to paypal.me or send to mtishiby@gmail.com — select 'Sending to a friend'", active: true, order: 2 },
  { label: "Sendwave", type: "sendwave", value: "+254 759 265 819", instructions: "Open Sendwave → Send to Kenya → Enter +254759265819 (VPM International)", active: true, order: 3 },
];

export default function AdminGivePage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [editing, setEditing] = useState<Partial<PaymentMethod> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    const unsub = subscribePaymentMethods(setMethods);
    return () => unsub();
  }, []);

  const seedDefaults = async () => {
    if (seeded) return;
    setSeeded(true);
    for (const m of DEFAULT_METHODS) {
      await upsertPaymentMethod(null, m);
    }
  };

  const openNew = () => { setEditing({ ...EMPTY, order: methods.length }); setIsNew(true); };
  const openEdit = (m: PaymentMethod) => { setEditing({ ...m }); setIsNew(false); };

  const handleSave = async () => {
    if (!editing?.label || !editing.value) return alert("Label and value are required.");
    setSaving(true);
    try {
      await upsertPaymentMethod(isNew ? null : (editing.id ?? null), {
        label: editing.label!, type: editing.type ?? "other", value: editing.value!,
        instructions: editing.instructions ?? "", note: editing.note ?? "",
        active: editing.active ?? true, order: editing.order ?? methods.length,
      });
      setEditing(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async (m: PaymentMethod) => {
    if (!confirm(`Delete "${m.label}"?`)) return;
    await deletePaymentMethod(m.id);
  };

  const toggleActive = (m: PaymentMethod) => upsertPaymentMethod(m.id, { ...m, active: !m.active });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-navy-950)] text-white p-6 rounded-[var(--radius-lg)] border border-white/10 shadow-xl">
        <div>
          <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <DollarSign size={14} /> Payment Methods
          </p>
          <h1 className="text-2xl font-extrabold text-white">Give &amp; Payment Methods</h1>
          <p className="text-xs text-slate-300 mt-1">Manage all giving channels shown on the Give page. Changes are live instantly.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {methods.length === 0 && (
            <button onClick={seedDefaults} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white font-bold text-sm rounded-full hover:bg-white/20 transition-all border border-white/20">
              Seed Defaults
            </button>
          )}
          <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-sm rounded-full hover:scale-105 transition-all">
            <Plus size={16} /> Add Method
          </button>
        </div>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-6 space-y-4 shadow-[var(--shadow-xl)]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-[var(--color-ink)]">{isNew ? "New Payment Method" : "Edit Method"}</h2>
            <button onClick={() => setEditing(null)}><X size={18} className="text-[var(--color-slate)]" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Label *</label>
              <input value={editing.label ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, label: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]" placeholder="e.g. M-Pesa Send Money" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Type</label>
              <select value={editing.type ?? "other"} onChange={(e) => setEditing((p) => ({ ...p!, type: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]">
                {TYPE_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Number / Email / Username *</label>
              <input value={editing.value ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, value: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-accent)]" placeholder="e.g. 0759265819" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Scripture Note (optional)</label>
              <input value={editing.note ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, note: e.target.value }))}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)]" placeholder="e.g. Matthew 25:35-40" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[var(--color-slate)] mb-1">Step-by-step Instructions</label>
              <textarea value={editing.instructions ?? ""} onChange={(e) => setEditing((p) => ({ ...p!, instructions: e.target.value }))} rows={3}
                className="w-full border border-[var(--color-line)] rounded-[var(--radius-eight)] px-3 py-2 text-sm resize-none focus:outline-none focus:border-[var(--color-accent)]" placeholder="Step-by-step instructions for the donor..." />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.active ?? true} onChange={(e) => setEditing((p) => ({ ...p!, active: e.target.checked }))} className="w-4 h-4 accent-[var(--color-accent)]" />
                <span className="text-sm">Active (visible on site)</span>
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

      {/* Methods list */}
      {methods.length === 0 && !editing ? (
        <div className="text-center py-20 text-[var(--color-slate)]">
          <DollarSign size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-bold">No payment methods yet</p>
          <p className="text-sm mt-1">Click "Seed Defaults" to load the preset methods, or add manually.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {methods.map((m) => (
            <div key={m.id} className={`bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-4 flex items-center gap-4 shadow-[var(--shadow-card)] ${!m.active ? "opacity-50" : ""}`}>
              <GripVertical size={16} className="text-[var(--color-slate)] shrink-0" />
              <div className="w-8 h-8 rounded-md bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center shrink-0">
                {ICON_MAP[m.type] ?? <Heart size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[var(--color-ink)] truncate">{m.label}</p>
                <p className="text-xs text-[var(--color-slate)] font-mono truncate">{m.value}</p>
                {m.note && <p className="text-xs text-[var(--color-gold-500)] mt-0.5">{m.note}</p>}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => openEdit(m)} className="p-1.5 rounded-md text-[var(--color-slate)] hover:bg-[var(--color-surface-alt)] transition-colors"><Pencil size={13} /></button>
                <button onClick={() => toggleActive(m)} className={`p-1.5 rounded-md transition-colors ${m.active ? "text-[var(--color-accent)]" : "text-[var(--color-slate)]"}`}>
                  {m.active ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => handleDelete(m)} className="p-1.5 rounded-md text-[var(--color-slate)] hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
