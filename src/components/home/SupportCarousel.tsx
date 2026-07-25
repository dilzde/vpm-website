import React from "react";
import Link from "next/link";
import { Heart, HandCoins, ShieldCheck, ArrowRight } from "lucide-react";

export default function SupportCarousel() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";

  const pillars = [
    {
      title: "Give via M-Pesa",
      body: `Use Till Number ${mpesaNumber}. Your faithful generosity enables us to preach the uncompromised Gospel and equip believers globally.`,
      icon: HandCoins,
    },
    {
      title: "Outreach & Broadcasts",
      body: "Every seed sown directly fuels our 24/7 radio broadcasts, Asriel TV television transmission, and evangelistic missions across the nations.",
      icon: Heart,
    },
    {
      title: "Kingdom Integrity",
      body: "We steward kingdom financial resources with absolute transparency and faithfulness, ensuring every gift directly advances God's harvest.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="band-navy py-20 md:py-28 relative overflow-hidden" id="support-section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--color-accent)]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-white/5 border border-white/10 rounded-full mb-4">
            Support the Mission
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 tracking-tight">
            Partner in Spreading the <span className="highlight-block">Gospel of Revival</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Your faithful partnership empowers Voice of the Potter&apos;s Messengers Ministry to raise end-time intercessors, expand radio and media broadcasts, and disciple believers worldwide.
          </p>
        </div>

        {/* Structured Ministry Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-8 rounded-[var(--radius-lg)] flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                <pillar.icon size={28} strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Prominent Warm Amber Accent CTA */}
        <div className="text-center">
          <Link
            href="/give"
            className="inline-flex items-center gap-3 px-10 py-4 text-base font-display font-bold uppercase tracking-wider
                       bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-hover)] 
                       shadow-[var(--shadow-accent)] transform hover:-translate-y-1 transition-all duration-200"
          >
            Support & Partner With Us Today
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <p className="text-xs text-slate-400 mt-4 font-sans">
            M-Pesa Till Number: <strong className="text-white tracking-wider">{mpesaNumber}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
