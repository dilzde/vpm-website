"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";
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
    <section className="bg-sky-50 py-16" id="booking-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl text-slate-800 mb-8">Get Involved</h2>

        <Carousel ariaLabel="Get Involved" autoPlay={0}>
          {cards.map((card, i) => (
            <div key={i} className="bg-cloud p-8 md:p-10 min-h-48 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-md bg-sky-50">
                    <card.icon size={20} strokeWidth={1.75} className="text-sky-500" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-800">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 max-w-prose mb-6">
                  {card.body}
                </p>
              </div>
              {card.external ? (
                <a
                  href={card.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium
                             bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors w-fit
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {card.ctaLabel}
                </a>
              ) : (
                <Link
                  href={card.ctaUrl}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium
                             bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors w-fit
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {card.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
