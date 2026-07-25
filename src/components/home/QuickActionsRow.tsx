"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Play, Pause, Radio, Video } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

export default function QuickActionsRow() {
  const { isPlaying, toggle } = useRadioPlayer();

  return (
    <section className="bg-[var(--color-surface)] py-8 border-b border-[var(--color-line)]" id="quick-actions-row">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Action 1: Contact Us */}
          <Link
            href="/contact"
            className="bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] rounded-[var(--radius-eight)] p-5 flex items-center gap-4 shadow-xs hover:scale-[1.01] transition-all group"
          >
            <div className="w-12 h-12 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-white flex items-center justify-center font-bold shrink-0 transition-colors">
              <PhoneCall size={22} />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[var(--color-ink)] leading-snug">
                Contact Us
              </h3>
              <p className="text-xs font-sans text-[var(--color-slate)]">
                Reach our pastoral desk & branches
              </p>
            </div>
          </Link>

          {/* Action 2: Watch Sermons */}
          <Link
            href="/media"
            className="bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] rounded-[var(--radius-eight)] p-5 flex items-center gap-4 shadow-xs hover:scale-[1.01] transition-all group"
          >
            <div className="w-12 h-12 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-white flex items-center justify-center font-bold shrink-0 transition-colors">
              <Video size={22} />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-[var(--color-ink)] leading-snug">
                Watch Sermons
              </h3>
              <p className="text-xs font-sans text-[var(--color-slate)]">
                Explore Asriel TV & sermon archive
              </p>
            </div>
          </Link>

          {/* Action 3: Listen to Our Radio (IN-PLACE TOGGLE §D) */}
          <button
            type="button"
            onClick={() => toggle()}
            className="bg-white border border-[var(--color-line)] hover:border-[var(--color-ink)] rounded-[var(--radius-eight)] p-5 flex items-center gap-4 shadow-xs hover:scale-[1.01] transition-all text-left w-full cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-[var(--radius-eight)] flex items-center justify-center font-bold shrink-0 transition-colors ${
              isPlaying ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]" : "bg-[var(--color-surface-alt)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-white"
            }`}>
              {isPlaying ? <Pause size={22} /> : <Radio size={22} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-bold text-base text-[var(--color-ink)] leading-snug">
                  {isPlaying ? "Playing Asriel Radio" : "Listen to Our Radio"}
                </h3>
                {isPlaying && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-live)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-live)]"></span>
                  </span>
                )}
              </div>
              <p className="text-xs font-sans text-[var(--color-slate)]">
                {isPlaying ? "Click to pause global stream" : "Click to stream Zeno FM live in-page"}
              </p>
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}
