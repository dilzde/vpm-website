import React from "react";
import { Metadata } from "next";
import { Calendar, Clock, MapPin } from "lucide-react";
import EVENTS from "@/lib/data/events.json";

export const metadata: Metadata = {
  title: "Events & Revival Gatherings | VPM International",
  description: "Upcoming conventions, healing revivals, prophetic services, and communion gatherings at Voice of the Potter's Messengers International.",
};

export default function EventsPage() {
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Ministry Calendar
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold mb-4">
            Upcoming Gatherings
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Join us for powerful worship services, all-night prayer vigils, prophetic revival conferences, and nationwide kingdom gatherings.
          </p>
        </div>

        {/* Compact Event Info-Cards Row (Reference 5 Pattern) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={event.id}
                className="bg-white border border-[var(--color-line)] rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--color-paper)] border border-[var(--color-line)] mb-4">
                    <Calendar size={13} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-sans font-bold text-[var(--color-accent)] tracking-wider uppercase">
                      {formattedDate}
                    </span>
                  </div>

                  <h2 className="font-sans text-xl font-bold text-[var(--color-navy-900)] mb-3">
                    {event.title}
                  </h2>

                  <p className="text-sm font-sans text-[var(--color-slate)] leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-line)] space-y-2 text-xs font-sans text-[var(--color-navy-700)]">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[var(--color-accent)]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[var(--color-accent)]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
