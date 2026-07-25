import React from "react";
import Link from "next/link";
import { Calendar, MessageCircle, Users } from "lucide-react";

export default function BookingCarousel() {
  const bookingFormUrl = process.env.NEXT_PUBLIC_BOOKING_FORM_URL || "https://docs.google.com/forms/d/e/1FAIpQLSeV2u-kux6Qjmizl1LvyobdnAUbbXy3GiAxrujW3jrK0geCXw/viewform";

  const cards = [
    {
      title: "Book a Ministry Session",
      body: "Schedule a dedicated prayer, mentoring, or pastoral counseling appointment with our anointed ministry team.",
      icon: Calendar,
      ctaLabel: "Schedule Now",
      ctaUrl: bookingFormUrl,
      external: true,
    },
    {
      title: "Submit Prayer Needs",
      body: "Share your prayer requests and praise reports with us. Our 24/7 intercessory prayer shield will stand with you in faith.",
      icon: MessageCircle,
      ctaLabel: "Request Prayer",
      ctaUrl: "/prayer",
      external: false,
    },
    {
      title: "Connect with a Branch",
      body: "Locate a Voice of the Potter's Messengers branch or communion group near you and fellowship in God's presence.",
      icon: Users,
      ctaLabel: "Find Locations",
      ctaUrl: "/branches",
      external: false,
    },
  ];

  return (
    <section className="band-white py-20 md:py-28 border-t border-b border-[var(--color-line)]" id="booking-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center sm:text-left">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-2">
            Take Your Next Step
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[var(--color-ink)] tracking-tight">
            Connect & <span className="highlight-block">Engage With Us</span>
          </h2>
        </div>

        {/* Mobile: scroll-snap, Desktop: 3-col grid */}
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex-none snap-start snap-always w-[85vw] sm:w-[50vw] md:w-auto bg-[var(--color-cloud)] p-8 md:p-10 rounded-[var(--radius-lg)] border border-[var(--color-line)] flex flex-col justify-between hover:border-[var(--color-accent)] transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                  <card.icon size={26} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-[var(--color-ink)] mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-[var(--color-slate)] mb-10 leading-relaxed font-sans">
                  {card.body}
                </p>
              </div>
              
              {card.external ? (
                <a
                  href={card.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-display font-bold uppercase tracking-wider
                             bg-[var(--color-navy-900)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent)] transition-all duration-200 w-full
                             shadow-sm hover:shadow-md"
                >
                  {card.ctaLabel} →
                </a>
              ) : (
                <Link
                  href={card.ctaUrl}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-display font-bold uppercase tracking-wider
                             bg-[var(--color-navy-900)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent)] transition-all duration-200 w-full
                             shadow-sm hover:shadow-md"
                >
                  {card.ctaLabel} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
