import React from "react";
import { Metadata } from "next";
import { Calendar, Clock, MapPin, Video, ExternalLink } from "lucide-react";
import EVENTS from "@/lib/data/events.json";

export const metadata: Metadata = {
  title: "Events | VPM International",
  description: "Upcoming events, conventions, and gatherings at VPM International.",
};

export default function EventsPage() {
  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Gather With Us
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold mb-4">Events</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Join us for worship services, prayer meetings, conventions, and
            special gatherings.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="space-y-4 md:space-y-6">
              {EVENTS.map((event) => {
                const eventDate = new Date(event.date);
                const month = eventDate.toLocaleDateString("en-US", { month: "short" });
                const day = eventDate.getDate();

                return (
                  <article key={event.id} className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-blue-300)] hover:shadow-md transition-all group">
                    <div className="flex flex-col sm:flex-row items-stretch">
                      {/* Date badge */}
                      <div className="sm:w-28 shrink-0 bg-[var(--color-mist)] flex flex-row sm:flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-[var(--color-line)] p-4 sm:p-6 group-hover:bg-[var(--color-blue-100)] transition-colors">
                        <span className="text-sm font-bold text-[var(--color-blue-500)] uppercase tracking-widest mr-2 sm:mr-0 sm:mb-1">{month}</span>
                        <span className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)]">{day}</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-6 sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-blue-500)] transition-colors">{event.title}</h2>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6">
                              <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-slate)]">
                                <Clock size={16} strokeWidth={2} className="text-[var(--color-blue-300)]" />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-slate)]">
                                <MapPin size={16} strokeWidth={2} className="text-[var(--color-blue-300)]" />
                                {event.location}
                              </span>
                              {event.isOnline && (
                                <span className="flex items-center gap-2 text-sm font-bold text-[var(--color-blue-500)] bg-[var(--color-blue-100)] px-3 py-1 rounded-[var(--radius-sm)]">
                                  <Video size={16} strokeWidth={2} />
                                  Online Available
                                </span>
                              )}
                            </div>
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
