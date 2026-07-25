import React from "react";
import Link from "next/link";
import { Calendar, MessageCircle, Users } from "lucide-react";

export default function BookingCarousel() {
  const bookingFormUrl = process.env.NEXT_PUBLIC_BOOKING_FORM_URL || "#";

  const cards = [
    {
      title: "Book a Session",
      body: "Schedule a meeting or counseling session with our ministry team.",
      icon: Calendar,
      ctaLabel: "Book Now",
      ctaUrl: bookingFormUrl,
      external: true,
    },
    {
      title: "Request Prayer",
      body: "Share your prayer needs with us. Our team of intercessors will stand with you.",
      icon: MessageCircle,
      ctaLabel: "Submit Request",
      ctaUrl: "/prayer",
      external: false,
    },
    {
      title: "Join a Branch",
      body: "Find a VPM branch near you and connect with a community of believers.",
      icon: Users,
      ctaLabel: "Find a Branch",
      ctaUrl: "/branches",
      external: false,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24" id="booking-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Get Involved
          </p>
          <h2 className="text-3xl text-[var(--color-ink)]">Next Steps</h2>
        </div>

        {/* Mobile: scroll-snap, Desktop: 3-col grid */}
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex-none snap-start snap-always w-[85vw] sm:w-[50vw] md:w-auto bg-[var(--color-mist)] p-6 md:p-8 rounded-[var(--radius-lg)] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[var(--color-blue-100)] text-[var(--color-blue-500)] flex items-center justify-center mb-5 shadow-sm">
                  <card.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--color-slate)] mb-8">
                  {card.body}
                </p>
              </div>
              
              {card.external ? (
                <a
                  href={card.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-5 py-3 text-sm font-semibold
                             bg-[var(--color-blue-500)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-blue-700)] transition-colors w-full
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
                >
                  {card.ctaLabel}
                </a>
              ) : (
                <Link
                  href={card.ctaUrl}
                  className="flex items-center justify-center px-5 py-3 text-sm font-semibold
                             bg-[var(--color-blue-500)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-blue-700)] transition-colors w-full
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
                >
                  {card.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
