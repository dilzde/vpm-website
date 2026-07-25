import React from "react";

const VALUES = [
  {
    number: "01",
    title: "Intercessory Prayer",
    description: "Sustaining a culture of fervent prayer and spiritual warfare for individuals, churches, and nations.",
  },
  {
    number: "02",
    title: "Prophetic Truth",
    description: "Proclaiming the uncompromised Word of God with clarity, conviction, and divine insight.",
  },
  {
    number: "03",
    title: "Territorial Evangelism",
    description: "Establishing strong local church altars and outreach centers across Kenya and beyond.",
  },
  {
    number: "04",
    title: "Kingdom Leadership",
    description: "Raising and equipping believers into mature disciples operating in spiritual authority.",
  },
];

export default function NumberedValues() {
  return (
    <section
      className="bg-[var(--color-cream)] text-[var(--color-ink)] py-16 md:py-24 border-b border-[var(--color-line)]"
      id="pillars-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase block mb-2">
            Pillars of Ministry
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-navy-900)] font-semibold">
            Our Core Foundations
          </h2>
        </div>

        {/* 4-Column Grid (Reference 1 pattern with Gold Digits) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((item) => (
            <div
              key={item.number}
              className="p-6 rounded-xl bg-white border border-[var(--color-line)] flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-[var(--color-gold-500)] block mb-3">
                  {item.number}
                </span>
                <h3 className="font-sans text-lg font-bold text-[var(--color-navy-900)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
