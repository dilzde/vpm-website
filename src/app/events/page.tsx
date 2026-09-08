import React from "react";
import { Metadata } from "next";
import { Calendar, Clock, MapPin, Wifi, ImageIcon } from "lucide-react";
import { getEvents } from "@/lib/events.server";
import type { SiteEvent } from "@/lib/event-types";

export const metadata: Metadata = {
  title: "Events & Gatherings | VPM International",
  description: "Join us for prophetic worship, all-night prayer vigils, and revival conferences across Kenya.",
};

export default async function EventsPage() {
  const events = await getEvents(true);

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Ministry Calendar
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-4 tracking-tight">
            Upcoming Gatherings
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Join us for powerful worship services, all-night prayer vigils, prophetic revival conferences, and nationwide kingdom gatherings.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-8">
            <Calendar size={48} className="text-[var(--color-slate)] mx-auto mb-4 opacity-50" />
            <h3 className="font-sans text-xl font-bold text-[var(--color-ink)]">No Scheduled Gatherings</h3>
            <p className="text-sm text-[var(--color-slate)] font-sans mt-2">
              Please check back soon or tune in to Asriel Radio for live daily services.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] overflow-hidden shadow-[var(--shadow-card)] flex flex-col justify-between transition-all hover:border-[var(--color-accent)]"
              >
                {ev.posterUrl && (
                  <div className="w-full h-48 bg-slate-100 overflow-hidden relative">
                    <img
                      src={ev.posterUrl}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {ev.isOnline && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          <Wifi size={11} /> Online Stream
                        </span>
                      )}
                    </div>

                    <h2 className="font-sans text-xl font-bold text-[var(--color-ink)] tracking-tight mb-2">
                      {ev.title}
                    </h2>
                    <p className="text-sm text-[var(--color-slate)] font-sans line-clamp-3 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-line)] space-y-2 text-xs font-sans text-[var(--color-ink)]">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[var(--color-accent)] shrink-0" />
                      <span className="font-semibold">{ev.date}</span>
                    </div>
                    {ev.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[var(--color-slate)] shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                    )}
                    {ev.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[var(--color-slate)] shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
