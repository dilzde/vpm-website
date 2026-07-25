import React from "react";
import { Metadata } from "next";
import { Calendar, Clock, MapPin, Video, Sparkles } from "lucide-react";
import EVENTS from "@/lib/data/events.json";

export const metadata: Metadata = {
  title: "Events & Revival Gatherings | VPM International",
  description: "Upcoming conventions, healing revivals, prophetic services, and communion gatherings at Voice of the Potter's Messengers International.",
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-20 md:py-28 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--color-accent)]" />
            Gather With The Brethren In Christ
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Upcoming <span className="highlight-block">Conventions & Events</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Join us for powerful worship services, all-night prayer vigils, prophetic revival conferences, and nationwide kingdom gatherings.
          </p>
        </div>
      </section>

      {/* Events Editorial List Band */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {EVENTS.map((event) => {
                const eventDate = new Date(event.date);
                const month = eventDate.toLocaleDateString("en-US", { month: "short" });
                const day = eventDate.getDate();

                return (
                  <article key={event.id} className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-accent)] shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row items-stretch">
                      {/* Editorial Date Badge */}
                      <div className="sm:w-36 shrink-0 bg-[var(--color-navy-950)] text-white flex flex-row sm:flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-white/10 p-5 sm:p-6 group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                        <span className="text-xs font-mono font-bold text-[var(--color-accent)] group-hover:text-white uppercase tracking-widest mr-3 sm:mr-0 sm:mb-1 transition-colors">{month}</span>
                        <span className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">{day}</span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h2 className="text-2xl font-display font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">{event.title}</h2>
                            {event.isOnline && (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-green-700 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                                <Video size={13} />
                                <span>Online Livestream</span>
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-[var(--color-slate)] mt-4 pt-4 border-t border-[var(--color-line)]">
                            <span className="flex items-center gap-2.5 font-medium">
                              <Clock size={16} strokeWidth={2} className="text-[var(--color-navy-900)] shrink-0" />
                              <span>{event.time}</span>
                            </span>
                            <span className="flex items-center gap-2.5 font-medium">
                              <MapPin size={16} strokeWidth={2} className="text-[var(--color-navy-900)] shrink-0" />
                              <span>{event.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
