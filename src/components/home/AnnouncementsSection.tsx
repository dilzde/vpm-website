import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    id: "1",
    date: "THIS SUNDAY",
    title: "Prophetic Service & Deliverance",
    subtitle: "Join us for morning worship, foundational teaching, and powerful intercession.",
    time: "9:00 AM – 1:00 PM",
  },
  {
    id: "2",
    date: "MIDWEEK",
    title: "Wednesday Teaching & Prayer",
    subtitle: "Deep dive into scripture and territorial prayer at our Githurai sanctuary.",
    time: "5:30 PM – 7:30 PM",
  },
  {
    id: "3",
    date: "MONTHLY",
    title: "Night of Deliverance & Healing",
    subtitle: "Overnight prayer vigil seeking God's supernatural breakthrough.",
    time: "9:00 PM – 4:00 AM",
  },
];

export default function AnnouncementsSection() {
  return (
    <section
      className="bg-[var(--color-cream)] text-[var(--color-ink)] py-16 md:py-24 border-b border-[var(--color-line)]"
      id="announcements-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-terracotta)] uppercase block mb-2">
              Ministry Updates
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy-900)] font-semibold">
              Gatherings & Announcements
            </h2>
          </div>
          <Link
            href="/events"
            className="text-sm font-sans font-semibold text-[var(--color-terracotta)] hover:underline mt-4 md:mt-0 transition-colors"
          >
            View all events →
          </Link>
        </div>

        {/* Compact Info-Cards Row (Reference 5 Pattern + Terracotta Blended Badges) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-2">
          {ANNOUNCEMENTS.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-lg bg-white border border-[var(--color-line)] flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--color-cream)] border border-[var(--color-terracotta)]/30 mb-4">
                  <Calendar size={13} className="text-[var(--color-terracotta)]" />
                  <span className="text-xs font-sans font-bold text-[var(--color-terracotta)] tracking-wider">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-navy-900)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans mb-4">
                  {item.subtitle}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--color-line)] text-xs font-sans font-semibold text-[var(--color-navy-700)]">
                {item.time}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
