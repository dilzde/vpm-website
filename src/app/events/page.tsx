"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Wifi, ExternalLink, ImageIcon } from "lucide-react";
import { subscribeEventsFirestore, type FirestoreEvent } from "@/lib/firestore";
import STATIC_EVENTS from "@/lib/data/events.json";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline?: boolean;
  posterUrl?: string | null;
  posterStoragePath?: string | null;
  active?: boolean;
  order?: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<FirestoreEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeEventsFirestore((data) => {
      setEvents(data);
      setLoading(false);
    });
    // fallback: if Firestore returns nothing after 3s, use static data
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => { unsub(); clearTimeout(timer); };
  }, []);

  // Merge: show Firestore events if available, else fall back to static JSON
  const displayEvents: EventItem[] =
    events.length > 0
      ? events
      : (STATIC_EVENTS as unknown as EventItem[]);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] overflow-hidden animate-pulse">
                <div className="h-52 bg-[var(--color-mist)]" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-[var(--color-mist)] rounded w-1/3" />
                  <div className="h-5 bg-[var(--color-mist)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--color-mist)] rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.map((event) => {
              const eventDate = new Date(event.date);
              const formattedDate = !isNaN(eventDate.getTime())
                ? eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : event.date;

              const posterUrl = event.posterUrl;
              const isOnline = event.isOnline;

              return (
                <div
                  key={event.id || event.title}
                  className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-xl)] transition-all flex flex-col"
                >
                  {/* Poster / Header */}
                  <div className="relative w-full h-52 bg-[var(--color-navy-900)] overflow-hidden shrink-0">
                    {posterUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={posterUrl}
                        alt={`${event.title} poster`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-navy-900)] to-[var(--color-anchor-olive)]">
                        <ImageIcon size={32} className="text-white/30" />
                        <span className="text-xs text-white/40 font-sans font-bold uppercase tracking-wider">No Poster</span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Online badge */}
                    {isOnline && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-live)] text-white text-[10px] font-bold uppercase tracking-wider">
                        <Wifi size={11} /> Online
                      </div>
                    )}
                    {/* Date badge overlaying bottom of poster */}
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/20">
                      <Calendar size={12} className="text-[var(--color-accent)]" />
                      <span className="text-xs font-sans font-bold text-[var(--color-ink)] tracking-wider uppercase">
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="font-sans text-xl font-bold text-[var(--color-ink)] mb-2 leading-snug">
                        {event.title}
                      </h2>
                      <p className="text-sm font-sans text-[var(--color-slate)] leading-relaxed mb-4">
                        {event.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-line)] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-sans font-bold text-[var(--color-ink)]">
                        <Clock size={13} className="text-[var(--color-accent)] shrink-0" />
                        <span>{"time" in event ? event.time : ""}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-sans text-[var(--color-slate)]">
                        <MapPin size={13} className="text-[var(--color-accent)] shrink-0" />
                        <span>{"location" in event ? event.location : ""}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {displayEvents.length === 0 && !loading && (
          <div className="text-center py-24 text-[var(--color-slate)]">
            <Calendar size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-sans font-bold text-lg">No upcoming events scheduled</p>
            <p className="text-sm mt-1">Check back soon for new gatherings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
