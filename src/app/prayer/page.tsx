"use client";

import React, { useState } from "react";
import { Send, CheckCircle, MessageCircle, ShieldCheck } from "lucide-react";

const CATEGORIES = [
  "Healing",
  "Financial Breakthrough",
  "Family & Marriage",
  "Deliverance",
  "Guidance & Wisdom",
  "Thanksgiving & Testimony",
  "Other Ministry Request",
];

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    request: "",
    isPrivate: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="band-white min-h-[70vh] flex items-center justify-center py-20">
        <div className="text-center px-6 max-w-lg mx-auto bg-[var(--color-cloud)] p-10 md:p-14 rounded-[var(--radius-lg)] shadow-xl border border-[var(--color-line)]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-navy-900)] text-[var(--color-accent)] mb-6 shadow-md">
            <CheckCircle size={40} strokeWidth={2.2} />
          </div>
          <h1 className="text-3xl font-display font-extrabold text-[var(--color-ink)] mb-4 tracking-tight">
            Prayer Request Received
          </h1>
          <p className="text-base text-[var(--color-slate)] mb-10 leading-relaxed font-sans">
            Thank you for entrusting us with your petition. Our 24/7 intercessory shield stands in faith with you before the throne of grace. Expect divine manifestation and testimony!
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", category: "", request: "", isPrivate: true });
            }}
            className="w-full px-8 py-4 text-xs font-display font-bold uppercase tracking-wider bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-accent)] rounded-[var(--radius-sm)] transition-all shadow-md cursor-pointer"
          >
            Submit Another Request →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <MessageCircle size={16} className="text-[var(--color-accent)]" />
            Let Us Stand In Intercession With You
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Prayer <span className="highlight-block">Request & Petitions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Share your prayer needs and praise reports with us. Our devoted intercessors are praying continuously for breaking chains and divine visitation.
          </p>
        </div>
      </section>

      {/* Main Form Content Band */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Intercessory Shield Note (5 cols) */}
            <div className="lg:col-span-5 space-y-6 bg-[var(--color-navy-950)] text-white p-8 sm:p-10 rounded-[var(--radius-lg)] border border-white/15 shadow-2xl">
              <div className="w-14 h-14 rounded-[var(--radius-md)] bg-white/10 text-[var(--color-accent)] flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-display font-extrabold text-white tracking-tight">
                Our Sacred Prayer Commitment
              </h3>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                At Voice of the Potter&apos;s Messengers International, we treat every prayer request with unconditional love, fervent intercession, and rigorous confidentiality.
              </p>
              <ul className="space-y-3 pt-4 border-t border-white/10 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <span>Prayed over daily by our pastoral watchmen.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <span>Completely secure and private upon request.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <span>Standing firm on God&apos;s prophetic promises.</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Editorial Form (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--color-cloud)] p-8 md:p-12 rounded-[var(--radius-lg)] border border-[var(--color-line)] shadow-md" id="prayer-form">
                <div>
                  <label htmlFor="prayer-name" className="block text-xs font-display font-bold uppercase tracking-wider text-[var(--color-ink)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="prayer-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-3.5 text-sm font-sans border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)]
                               focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder-[var(--color-slate)] shadow-xs"
                    placeholder="Enter your full name or initials"
                  />
                </div>

                <div>
                  <label htmlFor="prayer-category" className="block text-xs font-display font-bold uppercase tracking-wider text-[var(--color-ink)] mb-2">
                    Prayer Category
                  </label>
                  <select
                    id="prayer-category"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-5 py-3.5 text-sm font-sans border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)]
                               focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all shadow-xs"
                  >
                    <option value="" disabled>Select the nature of your petition...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="prayer-request" className="block text-xs font-display font-bold uppercase tracking-wider text-[var(--color-ink)] mb-2">
                    Prayer Request or Praise Report
                  </label>
                  <textarea
                    id="prayer-request"
                    required
                    rows={6}
                    value={form.request}
                    onChange={(e) => setForm({ ...form, request: e.target.value })}
                    className="w-full px-5 py-3.5 text-sm font-sans border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)]
                               focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder-[var(--color-slate)] resize-y shadow-xs leading-relaxed"
                    placeholder="Describe how our intercessors can join faith with you today..."
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="relative flex items-start">
                    <input
                      id="prayer-private"
                      type="checkbox"
                      checked={form.isPrivate}
                      onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                      className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-900)] focus:ring-[var(--color-accent)] accent-[var(--color-navy-900)] cursor-pointer"
                    />
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="prayer-private" className="font-display font-bold text-[var(--color-ink)] cursor-pointer">Keep this petition confidential</label>
                      <p className="text-[var(--color-slate)] text-xs mt-0.5 font-sans">Only our lead intercessory pastors will review this submission.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--color-line)]">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-3 w-full px-8 py-4 text-sm font-display font-bold uppercase tracking-wider
                               bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-[var(--radius-sm)]
                               transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--shadow-accent)] cursor-pointer transform hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <span className="inline-block w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} strokeWidth={2.5} />
                        <span>Submit Petition To Sanctuary</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
