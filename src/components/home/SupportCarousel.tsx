"use client";

import React from "react";
import Carousel from "@/components/Carousel";
import { Heart, HandCoins } from "lucide-react";

export default function SupportCarousel() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";

  const slides = [
    {
      title: "Support the Mission",
      body: `Give via M-Pesa to ${mpesaNumber}. Your generosity enables us to preach the Gospel, equip believers, and support communities across Kenya and beyond.`,
      icon: HandCoins,
    },
    {
      title: "Why It Matters",
      body: "Every contribution funds outreach programs, radio broadcasts, convention events, and the training of new ministers in the Word.",
      icon: Heart,
    },
    {
      title: "Thank You",
      body: "Your faithful giving makes this ministry possible. May the Lord multiply your seed and bless every sacrifice you make for His kingdom.",
      icon: Heart,
    },
  ];

  return (
    <section className="bg-white py-16" id="support-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel ariaLabel="Support the Mission" autoPlay={7000}>
          {slides.map((slide, i) => (
            <div key={i} className="bg-cloud p-8 md:p-12 min-h-48 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-4">
                <slide.icon size={20} strokeWidth={1.75} className="text-sky-500" />
                <h3 className="text-lg md:text-xl font-serif font-bold text-slate-800">
                  {slide.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 max-w-prose">
                {slide.body}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
