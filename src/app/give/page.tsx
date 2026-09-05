"use client";

import React, { useEffect, useState } from "react";
import { Copy, Check, Heart, ShieldCheck, ArrowUpRight, Smartphone, Globe, Send } from "lucide-react";
import { subscribePaymentMethods, type PaymentMethod } from "@/lib/firestore";

const ICON_MAP: Record<string, React.ReactNode> = {
  mpesa:    <Smartphone size={20} />,
  till:     <Smartphone size={20} />,
  paypal:   <Globe size={20} />,
  sendwave: <Send size={20} />,
};

const DEFAULT_METHODS: PaymentMethod[] = [
  {
    id: "mpesa-send",
    label: "M-Pesa Send Money",
    type: "mpesa",
    value: "0759265819",
    instructions: "Open M-Pesa → Send Money → Enter number 0759265819 → Enter amount → Confirm with PIN",
    active: true,
    order: 0,
  },
  {
    id: "till",
    label: "M-Pesa Till (Missionary Work)",
    type: "till",
    value: "—",
    instructions: "Open M-Pesa → Lipa na M-Pesa → Buy Goods → Enter Till Number → Enter amount → Confirm",
    note: "Matthew 25:35-40",
    active: true,
    order: 1,
  },
  {
    id: "paypal",
    label: "PayPal",
    type: "paypal",
    value: "mtishiby@gmail.com",
    instructions: "Go to paypal.me or send to mtishiby@gmail.com — select 'Sending to a friend'",
    active: true,
    order: 2,
  },
  {
    id: "sendwave",
    label: "Sendwave",
    type: "sendwave",
    value: "+254 759 265 819",
    instructions: "Open Sendwave app → Send to Kenya → Enter +254759265819 (VPM International)",
    active: true,
    order: 3,
  },
];

export default function GivePage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribePaymentMethods((data) => {
      setMethods(data.length > 0 ? data : DEFAULT_METHODS);
    });
    return () => unsub();
  }, []);

  const copyValue = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const displayMethods = methods.length > 0 ? methods : DEFAULT_METHODS;

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
            KINGDOM STEWARDSHIP
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-4 tracking-tight">
            Financial Giving &amp; Offerings
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Your generous contributions directly support territorial church planting, gospel outreach broadcasts, and compassionate community relief across Kenya.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayMethods.filter(m => m.active).map((method) => (
            <div
              key={method.id}
              className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] p-6 sm:p-8 space-y-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-xl)] transition-all"
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-bold shadow-sm">
                  {ICON_MAP[method.type] ?? <Heart size={20} />}
                </div>
                <div>
                  <h2 className="font-sans text-lg font-bold text-[var(--color-ink)]">{method.label}</h2>
                  <p className="text-xs text-[var(--color-slate)] font-sans capitalize">{method.type.replace("-", " ")}</p>
                </div>
              </div>

              {/* Value + copy */}
              <div className="flex items-center justify-between p-4 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                <span className="font-mono text-xl font-extrabold text-[var(--color-ink)] tracking-wide">
                  {method.value}
                </span>
                <button
                  type="button"
                  onClick={() => copyValue(method.value, method.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
                >
                  {copied === method.id ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  {copied === method.id ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Instructions */}
              <div className="text-xs text-[var(--color-slate)] font-sans leading-relaxed p-3 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                {method.instructions}
              </div>

              {/* Scripture note for missionary/till */}
              {method.note && (
                <div className="p-3 rounded-[var(--radius-eight)] bg-[var(--color-navy-900)] border border-[var(--color-accent)]/20">
                  <p className="text-xs text-white/60 font-sans mb-1 font-bold uppercase tracking-wider">Scripture</p>
                  <a
                    href="https://www.bible.com/bible/compare/MAT.25.35-40"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans font-bold text-[var(--color-gold-500)] hover:text-[var(--color-gold-700)] flex items-center gap-1.5 transition-colors"
                  >
                    <span className="scripture-highlight">{method.note}</span>
                    <ArrowUpRight size={13} className="text-[var(--color-gold-500)]" />
                  </a>
                  <p className="text-xs text-white/70 font-sans italic mt-1">
                    &ldquo;For I was hungry and you gave me food… Truly I say to you, as you did it to one of the least of these my brothers, you did it to me.&rdquo;
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stewardship note */}
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-[var(--shadow-card)]">
          <ShieldCheck size={28} className="text-[var(--color-accent)] shrink-0 mt-1" />
          <div className="space-y-2">
            <h2 className="font-sans text-xl font-bold text-[var(--color-ink)]">Stewardship &amp; Integrity</h2>
            <p className="text-sm text-[var(--color-slate)] font-sans leading-relaxed">
              Every financial seed sown into VPM International is handled with accountability, oversight, and prayer. May the Lord bless and multiply every seed sown into His kingdom.
            </p>
            <p className="text-xs text-[var(--color-slate)] font-sans italic">
              &ldquo;Bring all the tithes into the storehouse, that there may be food in My house…&rdquo; — Malachi 3:10
            </p>
          </div>
        </div>

        {/* Anchor band */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3">
            Thank You for Partnering With Us
          </h2>
          <p className="text-white/85 text-base max-w-xl font-sans">
            May the Lord bless and multiply every seed sown into His kingdom.
          </p>
        </div>

      </div>
    </div>
  );
}
