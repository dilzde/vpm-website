import React from "react";
import { Metadata } from "next";
import { Calendar, Clock, MapPin, Video, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events, conventions, and gatherings at VPM International.",
};

// Placeholder events - in production, loaded from Firestore
const EVENTS = [
  { id: "1", title: "Sunday Worship Service", date: "2025-01-05T09:00:00", time: "9:00 AM", location: "VPM Nairobi", isOnline: true },
  { id: "2", title: "Mid-Week Prayer Meeting", date: "2025-01-08T18:00:00", time: "6:00 PM", location: "VPM Nairobi", isOnline: false },
  { id: "3", title: "Annual Convention 2025", date: "2025-02-14T08:00:00", time: "8:00 AM – 5:00 PM", location: "Nairobi Conference Center", isOnline: true },
  { id: "4", title: "Youth Revival Night", date: "2025-01-18T19:00:00", time: "7:00 PM", location: "VPM Mombasa", isOnline: false },
];

export default function EventsPage() {
  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Events</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Join us for worship services, prayer meetings, conventions, and
            special gatherings.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {EVENTS.map((event) => {
              const eventDate = new Date(event.date);
              const month = eventDate.toLocaleDateString("en-US", { month: "short" });
              const day = eventDate.getDate();

              return (
                <article key={event.id} className="bg-cloud border border-line rounded-md overflow-hidden hover:border-sky-200 transition-colors">
                  <div className="flex items-stretch">
                    {/* Date badge */}
                    <div className="w-20 shrink-0 bg-sky-50 flex flex-col items-center justify-center border-r border-line p-3">
                      <span className="text-xs font-medium text-sky-500 uppercase">{month}</span>
                      <span className="text-2xl font-bold text-slate-800">{day}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-sm font-semibold text-slate-800">{event.title}</h2>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                            <span className="flex items-center gap-1.5 text-xs text-slate-600">
                              <Clock size={12} strokeWidth={1.75} />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-600">
                              <MapPin size={12} strokeWidth={1.75} />
                              {event.location}
                            </span>
                            {event.isOnline && (
                              <span className="flex items-center gap-1.5 text-xs text-sky-500 font-medium">
                                <Video size={12} strokeWidth={1.75} />
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
      </section>
    </div>
  );
}
