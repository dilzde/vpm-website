"use client";

import React, { useState, useTransition } from "react";
import { Send, CheckCircle, ShieldCheck, Heart, Loader2 } from "lucide-react";
import { submitPublicPrayer } from "./actions";

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Healing & Deliverance");
  const [request, setRequest] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !request.trim()) return;

    setError(null);
    startTransition(async () => {
      const res = await submitPublicPrayer({
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        category,
        request: request.trim(),
        isPrivate,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(res.error || "Failed to submit petition. Please try again.");
      }
    });
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setRequest("");
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
            INTERCESSORY ALTAR
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-4 tracking-tight">
            Prayer Sanctuary & Counselling
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Submit your prayer requests and burden to Apostle Asriel and the VPM intercessory prayer team. Every request is kept strictly confidential and covered in daily intercession.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Prayer Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 sm:p-8 shadow-[var(--shadow-card)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center mx-auto font-bold">
                  <CheckCircle size={32} />
                </div>
                <h2 className="font-sans text-2xl font-bold text-[var(--color-ink)]">
                  Prayer Request Received
                </h2>
                <p className="text-sm text-[var(--color-slate)] font-sans max-w-md mx-auto leading-relaxed">
                  Your petition has been logged confidentially and passed to Apostle Asriel and our intercessory team. We stand with you in faith.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[var(--color-navy-900)] text-white font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Submit Another Petition
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <h2 className="font-sans text-xl font-bold text-[var(--color-ink)] border-b border-[var(--color-line)] pb-3">
                  Confidential Prayer Request
                </h2>

                {error && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-ink)] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-ink)] uppercase mb-1">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07XX XXX XXX"
                      className="w-full px-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-ink)] uppercase mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-ink)] uppercase mb-1">
                    Prayer Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
                  >
                    <option>Healing & Deliverance</option>
                    <option>Family & Marriage</option>
                    <option>Financial Breakthrough</option>
                    <option>Spiritual Growth & Anointing</option>
                    <option>General Intercession</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-ink)] uppercase mb-1">
                    Your Prayer Petition *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Share your prayer needs or burdens..."
                    className="w-full px-4 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm focus:outline-none focus:border-[var(--color-ink)]"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--color-slate)]">
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="rounded border-[var(--color-line)] text-sky-600 focus:ring-0"
                    />
                    <span>Keep strictly confidential between me and the pastoral team</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-sm hover:scale-102 disabled:opacity-50 transition-all shadow-xs cursor-pointer"
                >
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  <span>{isPending ? "Submitting Petition..." : "Submit Confidential Petition"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Side Sanctuary Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-3">
                <ShieldCheck size={20} className="text-[var(--color-ink)]" />
                <h3 className="font-sans font-bold text-base text-[var(--color-ink)]">Confidentiality Assured</h3>
              </div>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                All petitions submitted are strictly private and read only by Apostle Asriel and designated intercessory team members.
              </p>
            </div>

            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-3">
                <Heart size={20} className="text-[var(--color-accent)]" />
                <h3 className="font-sans font-bold text-base text-[var(--color-ink)]">Daily Altar Covering</h3>
              </div>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Our 24/7 prayer warriors lift every petition continuously before the Throne of Grace at our main sanctuary altar.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
