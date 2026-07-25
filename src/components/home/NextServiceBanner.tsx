"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { getCurrentOrNextService, CurrentOrNextService } from "@/lib/data/schedule";

export default function NextServiceBanner() {
  const [scheduleState, setScheduleState] = useState<CurrentOrNextService | null>(null);

  useEffect(() => {
    setScheduleState(getCurrentOrNextService());
    const interval = setInterval(() => {
      setScheduleState(getCurrentOrNextService());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!scheduleState) return null;

  const { isHappeningNow, service, displayTime } = scheduleState;

  return (
    <div className="bg-[var(--color-surface-alt)] border-b border-[var(--color-line)] py-3 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-sans">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 ${
            isHappeningNow
              ? "bg-[var(--color-live)] text-white animate-pulse"
              : "bg-[var(--color-ink)] text-white"
          }`}>
            {isHappeningNow ? <Clock size={13} /> : <Calendar size={13} />}
            <span>{isHappeningNow ? "Happening Now" : "Coming Up Next"}</span>
          </div>

          <p className="text-[var(--color-ink)] font-medium">
            <strong className="font-bold text-[var(--color-ink)]">{service.title}</strong>
            <span className="mx-2 text-[var(--color-slate)]">•</span>
            <span className="text-[var(--color-slate)]">{displayTime}</span>
            <span className="hidden md:inline text-[var(--color-slate)] ml-2">({service.platform})</span>
          </p>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-ink)] hover:underline shrink-0"
        >
          <span>View Full Schedule</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
