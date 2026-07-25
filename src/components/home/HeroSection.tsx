import React from "react";
import Link from "next/link";
import { Play, MapPin, Radio } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";
import { getLiveStatus } from "@/lib/youtube";

export default async function HeroSection() {
  const liveVideo = await getLiveStatus();

  return (
    <section
      className="relative min-h-[88vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden band-navy py-16 md:py-24"
      id="hero-section"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-[var(--color-navy-700)]/30 blur-[150px] pointer-events-none" />
      
      {/* Subtle Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.05))] opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 z-10">
        
        {/* Left Content Area - Editorial 2-Line Headline */}
        <div className="w-full lg:w-12/23 flex flex-col items-start text-left space-y-7">
          {liveVideo ? (
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--color-live)]/15 border border-[var(--color-live)] shadow-[0_0_20px_rgba(226,76,76,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-live)] animate-live-pulse" />
              <span className="text-xs font-display font-bold tracking-wider text-white uppercase">
                Live Service in Progress
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-display font-bold tracking-wider text-[var(--color-accent)] uppercase">
                Voice of the Potter&apos;s Messengers
              </span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-display font-extrabold text-white leading-[1.15] tracking-tight">
            Equipping Believers,<br />
            <span className="highlight-block inline-block mt-1">Transforming Nations.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-sans font-normal">
            A dynamic prophetic and evangelistic ministry dedicated to intercessory prayer, foundational teachings, and releasing God&apos;s manifest power across the nations.
          </p>

          {/* Two Editorial CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3 w-full sm:w-auto">
            {liveVideo ? (
              <a
                href={`https://www.youtube.com/watch?v=${liveVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-9 py-4 text-base font-display font-bold uppercase tracking-wider
                           bg-[var(--color-live)] text-white rounded-[var(--radius-sm)] hover:bg-red-700 transition-all duration-200 
                           shadow-[0_4px_25px_rgba(226,76,76,0.4)] hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <Play size={18} className="fill-white" />
                <span>Join Live Service</span>
              </a>
            ) : (
              <Link
                href="/media"
                className="inline-flex items-center justify-center gap-3 px-9 py-4 text-base font-display font-bold uppercase tracking-wider
                           bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-hover)] 
                           transition-all duration-200 shadow-[var(--shadow-accent)] hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <Play size={18} className="fill-white" />
                <span>Watch Latest Sermons</span>
              </Link>
            )}

            <Link
              href="/branches"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-display font-bold uppercase tracking-wider
                         text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 
                         rounded-[var(--radius-sm)] transition-all duration-200 w-full sm:w-auto text-center"
            >
              <MapPin size={18} className="text-[var(--color-accent)]" />
              <span>Plan a Visit</span>
            </Link>
          </div>
        </div>

        {/* Right Visual Area - High-end Editorial Composition */}
        <div className="w-full lg:w-11/23 relative h-[420px] md:h-[540px] flex items-center justify-center mt-6 lg:mt-0">
          
          {/* Main Hero Media Frame */}
          <div className="w-full h-full rounded-[var(--radius-lg)] overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative group bg-[var(--color-navy-900)]">
            {liveVideo && liveVideo.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={liveVideo.thumbnail} alt="Live Service" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full">
                <PlaceholderCongregation />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/80 via-transparent to-transparent opacity-90" />
            
            {/* Bottom editorial caption inside image card */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-accent)] mb-1">Ministry Broadcast</p>
                <h3 className="text-lg font-display font-bold text-white leading-snug">Empowering the Body of Christ</h3>
              </div>
            </div>
          </div>

          {/* Floating High-Contrast Editorial Radio Tag */}
          <Link href="/radio" className="absolute -bottom-6 left-6 md:-left-6 z-20 px-6 py-4 rounded-[var(--radius-md)] bg-[var(--color-navy-950)]/95 backdrop-blur-xl border border-white/20 shadow-2xl hover:border-[var(--color-accent)] transition-all duration-300 group flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(217,119,6,0.4)] group-hover:scale-110 transition-transform">
              <Radio size={20} />
            </div>
            <div>
              <p className="text-[10px] font-display font-bold text-[var(--color-accent)] uppercase tracking-widest">Asriel Radio</p>
              <p className="text-sm font-bold font-display text-white">Streaming 24/7 Live</p>
            </div>
          </Link>

          {/* Floating Service Times Badge */}
          {!liveVideo && (
            <div className="absolute -top-5 right-6 md:-right-6 z-20 px-5 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-navy-950)]/95 backdrop-blur-xl border border-white/20 shadow-2xl">
               <p className="text-[10px] font-display font-bold text-[var(--color-accent)] uppercase tracking-widest mb-0.5">Next Service</p>
               <p className="text-base font-display font-bold text-white">Sunday at 9:00 AM</p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
