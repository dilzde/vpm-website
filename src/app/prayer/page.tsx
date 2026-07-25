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
      <div className="bg-[var(--color-mist)] min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4 max-w-md mx-auto bg-white p-8 md:p-12 rounded-[var(--radius-lg)] shadow-sm border border-[var(--color-line)]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-500 mb-6 border-8 border-green-50/50">
            <CheckCircle size={36} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-3">
            Request Received
          </h1>
          <p className="text-base text-[var(--color-slate)] mb-8 leading-relaxed">
            Thank you for sharing your prayer request with us. Our team of
            intercessors will be praying for you. God bless you.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", category: "", request: "", isPrivate: true });
            }}
            className="w-full px-6 py-3.5 text-sm font-bold tracking-wide uppercase bg-[var(--color-blue-500)] text-white rounded-[var(--radius-md)]
                       hover:bg-[var(--color-blue-700)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Let Us Pray With You
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold mb-4">Prayer Request</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Share your prayer needs with us. Our team of intercessors will
            stand with you in faith.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] shadow-sm" id="prayer-form">
              <div>
                <label htmlFor="prayer-name" className="block text-sm font-bold text-[var(--color-ink)] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="prayer-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-base border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-[var(--color-mist)] text-[var(--color-ink)]
                             focus:outline-none focus:border-[var(--color-blue-500)] focus:ring-1 focus:ring-[var(--color-blue-500)] transition-all placeholder:text-[var(--color-slate)]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="prayer-category" className="block text-sm font-bold text-[var(--color-ink)] mb-2">
                  Category
                </label>
                <select
                  id="prayer-category"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 text-base border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-[var(--color-mist)] text-[var(--color-ink)]
                             focus:outline-none focus:border-[var(--color-blue-500)] focus:ring-1 focus:ring-[var(--color-blue-500)] transition-all appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                >
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prayer-request" className="block text-sm font-bold text-[var(--color-ink)] mb-2">
                  Prayer Request
                </label>
                <textarea
                  id="prayer-request"
                  required
                  rows={5}
                  value={form.request}
                  onChange={(e) => setForm({ ...form, request: e.target.value })}
                  className="w-full px-4 py-3 text-base border border-[var(--color-line)] rounded-[var(--radius-sm)] bg-[var(--color-mist)] text-[var(--color-ink)]
                             focus:outline-none focus:border-[var(--color-blue-500)] focus:ring-1 focus:ring-[var(--color-blue-500)] transition-all placeholder:text-[var(--color-slate)] resize-y"
                  placeholder="How can we pray for you?"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="prayer-private"
                      type="checkbox"
                      checked={form.isPrivate}
                      onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                      className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-blue-500)] focus:ring-[var(--color-blue-500)]"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="prayer-private" className="font-medium text-[var(--color-ink)]">Keep this private</label>
                    <p className="text-[var(--color-slate)] text-xs mt-0.5">Only the intercessory team will see this request.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-line)]">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 text-sm font-bold tracking-wide uppercase bg-[var(--color-blue-500)] text-white rounded-[var(--radius-md)]
                             hover:bg-[var(--color-blue-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)] shadow-sm"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} strokeWidth={2} />
                      Submit Prayer Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
