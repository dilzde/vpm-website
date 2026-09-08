import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, MapPin, Wifi, ArrowUpRight, Radio } from "lucide-react";
import { getEvents } from "@/lib/events.server";
import type { SiteEvent } from "@/lib/event-types";

export const metadata: Metadata = {
  title: "Events & Gatherings | VPM International",
  description: "Join us for prophetic worship, all-night prayer vigils, and revival conferences across Kenya.",
};

export default async function EventsPage() {
  const events = await getEvents(true);

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-[var(--color-line)]">
          <span className="text-xs font-sans font-bold tracking-widest text-[#1B5299] uppercase block mb-2">
            MINISTRY CALENDAR &amp; SCHEDULES
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-3 tracking-tight">
            Upcoming Gatherings
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Join us for prophetic worship services, mid-week prayer vigils, and nationwide revival conferences. All believers are welcome.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-8 max-w-xl mx-auto">
            <Calendar size={48} className="text-[var(--color-slate)] mx-auto mb-4 opacity-40" />
            <h3 className="font-sans text-xl font-bold text-[var(--color-ink)]">No Scheduled Gatherings</h3>
            <p className="text-sm text-[var(--color-slate)] font-sans mt-2 mb-6">
              Please check back soon or tune in to Asriel Radio for live daily services.
            </p>
            <Link
              href="/radio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-navy-900)] text-white text-xs font-bold"
            >
              <span>Tune into Asriel Radio</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => {
              // Parse date components safely
              const dateObj = ev.date ? new Date(ev.date) : null;
              const hasValidDate = dateObj && !isNaN(dateObj.getTime());
              const monthStr = hasValidDate
                ? dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
                : "DATE";
              const dayStr = hasValidDate
                ? dateObj.toLocaleDateString("en-US", { day: "2-digit" })
                : "TBA";

              return (
                <div
                  key={ev.id}
                  className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] overflow-hidden shadow-[var(--shadow-card)] flex flex-col justify-between transition-all hover:border-[var(--color-accent)] hover:shadow-md group"
                >
                  {ev.posterUrl && (
                    <div className="w-full h-48 bg-slate-100 overflow-hidden relative border-b border-[var(--color-line)]">
                      <img
                        src={ev.posterUrl}
                        alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-12 h-12 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-[var(--color-ink)] flex flex-col items-center justify-center font-sans shrink-0">
                            <span className="text-[10px] font-bold text-[#1B5299] leading-none uppercase">{monthStr}</span>
                            <span className="text-base font-extrabold leading-none mt-0.5">{dayStr}</span>
                          </span>
                          <div>
                            {ev.isOnline && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <Wifi size={10} /> Online Stream
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <h2 className="font-sans text-xl font-bold text-[var(--color-ink)] tracking-tight mb-2 leading-snug">
                        {ev.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--color-slate)] font-sans line-clamp-3 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-line)] space-y-2 text-xs font-sans text-[var(--color-ink)]">
                      {ev.time && (
                        <div className="flex items-center gap-2 text-[var(--color-slate)] font-medium">
                          <Clock size={14} className="text-[#29A3E4] shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                      )}
                      {ev.location && (
                        <div className="flex items-center gap-2 text-[var(--color-slate)] font-medium">
                          <MapPin size={14} className="text-[#29A3E4] shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        {ev.isOnline ? (
                          <Link
                            href="/radio"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5299] hover:underline"
                          >
                            <Radio size={12} />
                            <span>Stream Live on Radio</span>
                          </Link>
                        ) : (
                          <Link
                            href="/branches"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5299] hover:underline"
                          >
                            <span>View Sanctuary Branch →</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
