import React from "react";
import Link from "next/link";
import { Heart, HandCoins, ShieldCheck } from "lucide-react";

export default function SupportCarousel() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";

  const slides = [
    {
      title: "Give via M-Pesa",
      body: `Use Till Number ${mpesaNumber}. Your generosity enables us to preach the Gospel and equip believers.`,
      icon: HandCoins,
      link: "/give",
    },
    {
      title: "Outreach & Missions",
      body: "Every contribution funds our outreach programs, radio broadcasts, and the training of new ministers.",
      icon: Heart,
      link: "/give",
    },
    {
      title: "Kingdom Integrity",
      body: "We manage resources faithfully, ensuring every seed sown goes directly into spreading the Word.",
      icon: ShieldCheck,
      link: "/give",
    },
  ];

  return (
    <section className="bg-[var(--color-cloud)] py-16 md:py-24" id="support-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Support the Mission
          </p>
          <h2 className="text-3xl text-[var(--color-ink)]">Partner with VPM</h2>
        </div>

        {/* Scroll-snap container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-none snap-start snap-always w-[85vw] sm:w-[45vw] md:w-[31.333%] bg-white p-6 md:p-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-mist)] text-[var(--color-blue-500)] flex items-center justify-center mb-6">
                <slide.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">
                {slide.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--color-slate)] mb-6 flex-1">
                {slide.body}
              </p>
              <Link
                href={slide.link}
                className="inline-flex items-center text-sm font-semibold text-[var(--color-blue-500)] hover:text-[var(--color-blue-700)] transition-colors mt-auto"
              >
                Learn how →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
