import React from "react";

export default function HeartbeatBand() {
  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] py-20 border-b border-[var(--color-line)]"
      id="heartbeat-section"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block">
          OUR HEARTBEAT
        </span>

        <blockquote className="font-sans text-2xl sm:text-3xl md:text-4xl text-[var(--color-ink)] font-bold leading-snug max-w-4xl mx-auto">
          &ldquo;Our heartbeat is to share the Word of God, the secrets found within it, and the love of Christ with our community and all those around us.&rdquo;
        </blockquote>

        <p className="text-xs font-sans font-bold text-[var(--color-slate)] tracking-wider uppercase">
          — Voice of the Potter&apos;s Messengers Ministry
        </p>
      </div>
    </section>
  );
}
