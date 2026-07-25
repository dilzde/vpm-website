import React from "react";
import { Metadata } from "next";
import { Heart, Phone, Smartphone, CreditCard, Sparkles, Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Support the Mission | VPM International",
  description: "Partner with Voice of the Potter's Messengers International's mission through giving. M-Pesa till details and information about how your generosity fuels kingdom revival.",
};

export default function GivePage() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";
  const tillNumber = process.env.NEXT_PUBLIC_MPESA_TILL_NUMBER;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header Band */}
      <section className="band-navy py-20 md:py-28 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--color-accent)]" />
            Kingdom Stewardship & Partnering
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Partner with <span className="highlight-block">VPM Ministry</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Your generous giving enables us to take the Gospel to the nations, broadcast life-transforming prophetic worship, and sustain vital community revival across Kenya and beyond.
          </p>
        </div>
      </section>

      {/* Financial Alignment & M-Pesa Presentation Band */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Dignified M-Pesa Portal (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[var(--color-navy-950)] text-white border border-white/15 rounded-[var(--radius-lg)] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white flex items-center justify-center shadow-lg">
                      <Smartphone size={28} strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[var(--color-accent)] uppercase tracking-widest">Official Giving Portal</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">Give via M-Pesa</h2>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-6 backdrop-blur-md">
                    <p className="text-xs font-display font-bold uppercase tracking-wider text-slate-300 mb-2">M-Pesa Send Money</p>
                    <p className="text-3xl sm:text-4xl font-mono font-extrabold text-[var(--color-accent)] tracking-wider">{mpesaNumber}</p>
                    <p className="text-[11px] text-slate-400 mt-2 font-sans">Official ministry account line</p>
                  </div>

                  {tillNumber ? (
                    <div className="bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-6 backdrop-blur-md">
                      <p className="text-xs font-display font-bold uppercase tracking-wider text-slate-300 mb-2">Buy Goods Till</p>
                      <p className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-wider">{tillNumber}</p>
                      <p className="text-[11px] text-slate-400 mt-2 font-sans">Verified merchant till number</p>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-6 backdrop-blur-md flex flex-col justify-center">
                      <p className="text-xs font-display font-bold uppercase tracking-wider text-slate-300 mb-1">Direct Bank & Wire</p>
                      <p className="text-sm text-slate-300 leading-snug">For international bank telegraphic transfers, kindly reach out to our administration.</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-6">
                  <h3 className="text-xs font-display font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                    Simple M-Pesa Transfer Instructions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300 font-sans">
                    {[
                      "Open your M-Pesa App or Sim Tool",
                      "Select 'Send Money' option",
                      `Enter destination line: ${mpesaNumber}`,
                      "Enter your giving amount & PIN",
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 bg-white/5 p-3 rounded border border-white/5">
                        <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Kingdom Impact Areas (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 space-y-8 shadow-sm">
                <h3 className="text-xl font-display font-extrabold text-[var(--color-ink)] uppercase tracking-wider border-b border-[var(--color-line)] pb-4">
                  Where Your Giving Flows
                </h3>

                {[
                  { icon: Heart, title: "Spread the Gospel", body: "Your giving supports open-air revival crusades, intercessory conferences, and nationwide community evangelism across Kenya." },
                  { icon: Phone, title: "Radio Broadcasting", body: "Help sustain our continuous Asriel FM and Zeno audio transmissions, bringing teachings of deliverance to thousands daily." },
                  { icon: CreditCard, title: "Conventions & Outreach", body: "Fund dynamic national conventions, youth revivals, and benevolent outreach programs that bring hope and miracles to the afflicted." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <item.icon size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-[var(--color-ink)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[var(--color-slate)] font-sans leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-[var(--color-line)] text-center">
                  <p className="text-xs font-mono text-[var(--color-slate)] uppercase tracking-widest">
                    &ldquo;Give, and it will be given to you: good measure, pressed down, shaken together...&rdquo; — Luke 6:38
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

