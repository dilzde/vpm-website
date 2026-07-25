"use client";

import React, { useState } from "react";
import { Send, CheckCircle, ShieldCheck } from "lucide-react";

const CATEGORIES = [
  "Healing & Restoration",
  "Financial Breakthrough",
  "Family & Marriage",
  "Deliverance & Freedom",
  "Guidance & Wisdom",
  "Thanksgiving & Testimony",
  "Other Intercessory Request",
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-[var(--color-paper)] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-lg mx-auto bg-white p-10 rounded-lg border border-[var(--color-line)]">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-paper)] text-[var(--color-accent)] mb-4 border border-[var(--color-line)]">
            <CheckCircle size={32} />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[var(--color-navy-900)] mb-3">
            Prayer Request Received
          </h1>
          <p className="text-sm text-[var(--color-slate)] mb-8 font-sans leading-relaxed">
            Thank you for entrusting us with your petition. Our intercessory altar stands in agreement with you before God&apos;s throne. Expect divine transformation!
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", category: "", request: "", isPrivate: true });
            }}
            className="w-full px-6 py-3 text-sm font-sans font-bold text-[var(--color-navy-900)] bg-[var(--color-accent)] rounded-full hover:brightness-110 transition-all cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Intercessory Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold mb-3">
            Request Prayer
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans max-w-xl mx-auto leading-relaxed">
            Share your prayer request confidentially with our intercessory team. We believe in the power of agreement and divine intervention.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-line)] rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="prayer-name" className="block text-xs font-sans font-bold text-[var(--color-navy-900)] uppercase mb-2">
              Your Name (Optional / Anonymous)
            </label>
            <input
              id="prayer-name"
              type="text"
              placeholder="e.g. Brother John or Anonymous"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 text-sm font-sans rounded-md bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label htmlFor="prayer-category" className="block text-xs font-sans font-bold text-[var(--color-navy-900)] uppercase mb-2">
              Select Category
            </label>
            <select
              id="prayer-category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full px-4 py-3 text-sm font-sans rounded-md bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="">Select prayer category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="prayer-request" className="block text-xs font-sans font-bold text-[var(--color-navy-900)] uppercase mb-2">
              Your Prayer Request Details
            </label>
            <textarea
              id="prayer-request"
              rows={5}
              required
              placeholder="Please describe your petition or testimony..."
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
              className="w-full px-4 py-3 text-sm font-sans rounded-md bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-[var(--color-slate)] bg-[var(--color-paper)] p-3 rounded border border-[var(--color-line)]">
            <ShieldCheck size={16} className="text-[var(--color-accent)] shrink-0" />
            <span>All prayer requests are kept strictly confidential with Apostle Asriel & intercessors.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-sans font-bold text-[var(--color-navy-900)] bg-[var(--color-accent)] rounded-full hover:brightness-110 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={16} />
            <span>{loading ? "Submitting Petition..." : "Submit Prayer Petition"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
