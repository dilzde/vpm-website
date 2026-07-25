import React from "react";

const CORE_FOUNDATIONS = [
  {
    number: "01",
    title: "Jesus Christ",
    body: "Christ is the center and foundation of everything we do.",
  },
  {
    number: "02",
    title: "Love",
    body: "We are called to love God and love one another above all else.",
  },
  {
    number: "03",
    title: "The Word of God",
    body: "We stand on the uncompromised truth of Scripture in all teaching and ministry.",
  },
  {
    number: "04",
    title: "Prophetic Revelation",
    body: "The Prophet has been graced to know and share the deeper secrets found in God's Word.",
  },
];

export default function NumberedValues() {
  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] section-gap border-b border-[var(--color-line)]"
      id="core-foundations"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
            CORE FOUNDATIONS
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl text-[var(--color-ink)] font-extrabold">
            What Drives Our Ministry
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_FOUNDATIONS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-3xl font-extrabold text-[var(--color-accent-ink)] opacity-80 block mb-2">
                  {pillar.number}
                </span>
                <h3 className="font-sans text-xl font-bold text-[var(--color-ink)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)] font-sans leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
