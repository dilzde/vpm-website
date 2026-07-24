"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const CATEGORIES = [
  "Healing",
  "Financial Breakthrough",
  "Family",
  "Deliverance",
  "Guidance",
  "Thanksgiving",
  "Other",
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

    // In production, this calls submitPrayerRequest from firestore.ts
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-sky-50 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-4">
            <CheckCircle size={32} strokeWidth={1.75} />
          </div>
          <h1 className="text-xl font-serif font-bold text-slate-800 mb-2">
            Prayer Request Submitted
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you for sharing your prayer request with us. Our team of
            intercessors will be praying for you. God bless you.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", category: "", request: "", isPrivate: true });
            }}
            className="mt-6 px-5 py-2.5 text-sm font-medium bg-sky-500 text-white rounded-md
                       hover:bg-sky-400 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Prayer Request</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Share your prayer needs with us. Our team of intercessors will
            stand with you in faith.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-5" id="prayer-form">
              <div>
                <label htmlFor="prayer-name" className="block text-xs font-medium text-slate-800 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="prayer-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-line rounded-md bg-white text-slate-800
                             focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="prayer-category" className="block text-xs font-medium text-slate-800 mb-1.5">
                  Category
                </label>
                <select
                  id="prayer-category"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-line rounded-md bg-white text-slate-800
                             focus:outline-none focus:border-sky-500 transition-colors"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prayer-request" className="block text-xs font-medium text-slate-800 mb-1.5">
                  Your Prayer Request
                </label>
                <textarea
                  id="prayer-request"
                  required
                  rows={6}
                  value={form.request}
                  onChange={(e) => setForm({ ...form, request: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-line rounded-md bg-white text-slate-800
                             focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  placeholder="Share your prayer request…"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="prayer-private"
                  checked={form.isPrivate}
                  onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                  className="w-4 h-4 rounded border-line text-sky-500 focus:ring-sky-500"
                />
                <label htmlFor="prayer-private" className="text-xs text-slate-600">
                  Keep my request private (visible only to prayer team)
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium
                           bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                id="prayer-submit"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send size={16} strokeWidth={1.75} />
                    Submit Prayer Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
