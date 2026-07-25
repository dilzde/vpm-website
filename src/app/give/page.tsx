"use client";

import React, { useState } from "react";
import { Copy, Check, Heart, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function GivePage() {
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const copyToClipboard = (text: string, isAccount: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAccount) {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedPaybill(true);
      setTimeout(() => setCopiedPaybill(false), 2000);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
            KINGDOM STEWARDSHIP
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-4 tracking-tight">
            Financial Giving & Offerings
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Your generous contributions directly support territorial church planting, gospel outreach broadcasts, and compassionate community relief across Kenya.
          </p>
        </div>

        {/* Giving Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* M-Pesa Official Paybill Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 sm:p-8 space-y-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-4">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Heart size={20} />
              </div>
              <div>
                <h2 className="font-sans text-xl font-bold text-[var(--color-ink)]">
                  M-Pesa Official Paybill
                </h2>
                <p className="text-xs text-[var(--color-slate)] font-sans">
                  Direct Mobile Money Transfer in Kenya
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Paybill Number */}
              <div className="p-4 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] border border-[var(--color-line)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-sans font-bold text-[var(--color-slate)] uppercase block">
                    Business / Paybill Number
                  </span>
                  <span className="font-mono text-2xl font-extrabold text-[var(--color-ink)]">
                    247247
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("247247", false)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-sans font-bold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedPaybill ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copiedPaybill ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Account Name */}
              <div className="p-4 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] border border-[var(--color-line)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-sans font-bold text-[var(--color-slate)] uppercase block">
                    Account Name / Reference
                  </span>
                  <span className="font-mono text-lg font-bold text-[var(--color-ink)]">
                    0759265819 (VPM Tithe)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("0759265819", true)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-sans font-bold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedAccount ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copiedAccount ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] text-xs text-[var(--color-slate)] font-sans space-y-1">
              <p className="font-bold text-[var(--color-ink)]">Quick Steps:</p>
              <p>1. Go to M-Pesa Menu → Lipa na M-Pesa → Paybill</p>
              <p>2. Enter Business Number <strong>247247</strong></p>
              <p>3. Enter Account Number <strong>0759265819</strong></p>
              <p>4. Enter Amount & PIN to confirm</p>
            </div>
          </div>

          {/* Stewardship Transparency Note (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 sm:p-8 space-y-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 border-b border-[var(--color-line)] pb-4">
              <ShieldCheck size={24} className="text-[var(--color-ink)]" />
              <h2 className="font-sans text-xl font-bold text-[var(--color-ink)]">
                Stewardship & Integrity
              </h2>
            </div>

            <p className="text-sm text-[var(--color-slate)] font-sans leading-relaxed">
              Every financial seed sown into VPM International is handled with accountability, oversight, and prayer.
            </p>

            <div className="p-4 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] border border-[var(--color-line)] space-y-2 text-xs font-sans text-[var(--color-slate)]">
              <p className="font-bold text-[var(--color-ink)]">Scriptural Foundation:</p>
              <p className="italic">
                &ldquo;Bring all the tithes into the storehouse, that there may be food in My house...&rdquo; — Malachi 3:10
              </p>
            </div>

            <div className="pt-2">
              <a
                href="tel:0759265819"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[var(--color-ink)] hover:underline"
              >
                <span>Inquire About Direct Bank Wire / Pastoral Audit</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Anchor Band: Give Impact Block */}
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
