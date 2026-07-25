import React from "react";

export default function HeartbeatBand() {
  return (
    <section
      className="bg-[var(--color-cream)] text-[var(--color-ink)] py-18 md:py-24 border-b border-[var(--color-line)]"
      id="heartbeat-section"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase block mb-4">
          Our Heartbeat
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--color-navy-900)] leading-relaxed font-normal">
          &ldquo;We are called to awaken nations through intercessory prayer, proclaim the uncompromised Word, and build communities anchored in faith.&rdquo;
        </h2>
      </div>
    </section>
  );
}
