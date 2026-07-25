import React from "react";
import Link from "next/link";
import { Play, MapPin, Radio } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";
import { getLiveStatus } from "@/lib/youtube";

export default async function HeroSection() {
  const liveVideo = await getLiveStatus();

  return (
    <section
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--color-mist)]"
      id="hero-section"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-blue-300)] opacity-20 blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-blue-500)] opacity-10 blur-[150px] pointer-events-none mix-blend-multiply" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col lg:flex-row items-center gap-12 z-10">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
          {liveVideo ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[var(--color-live)] shadow-[0_0_15px_rgba(226,76,76,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-live)] animate-live-pulse" />
              <span className="text-xs font-bold tracking-wider text-[var(--color-live)] uppercase">
                Live Now: {liveVideo.title}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[var(--color-line)] shadow-sm">
              <span className="text-xs font-bold tracking-wider text-[var(--color-blue-700)] uppercase">
                Welcome to VPM
              </span>
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-ink)] leading-[1.1] tracking-tight">
            Equipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-500)] to-sky-400">Believers</span>,<br />
            Transforming Nations.
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--color-slate)] max-w-lg leading-relaxed">
            Voice of the Potter&apos;s Messengers Ministry. A community of faith rooted in prayer, the prophetic word, and the undeniable power of the Gospel.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            {liveVideo ? (
              <a
                href={`https://www.youtube.com/watch?v=${liveVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-[var(--color-live)] rounded-full overflow-hidden transition-transform hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-live)]/30 w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                <Play size={20} className="relative z-10 fill-white" />
                <span className="relative z-10">Join Live Service</span>
              </a>
            ) : (
              <Link
                href="/media"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-[var(--color-blue-500)] rounded-full overflow-hidden transition-transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                <Play size={20} className="relative z-10 fill-white" />
                <span className="relative z-10">Watch Latest</span>
              </Link>
            )}

            <Link
              href="/branches"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[var(--color-ink)] bg-white/80 backdrop-blur-md border border-[var(--color-line)] rounded-full hover:bg-white hover:border-[var(--color-blue-300)] hover:text-[var(--color-blue-500)] transition-all hover:scale-105 shadow-sm w-full sm:w-auto"
            >
              <MapPin size={20} />
              Plan a Visit
            </Link>
          </div>
        </div>

        {/* Right Visual Area (Glassmorphism Cards) */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
          
          {/* Main Hero Image Frame */}
          <div className="absolute inset-0 md:inset-8 rounded-[2rem] overflow-hidden border border-white/40 shadow-2xl z-10">
            {liveVideo && liveVideo.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={liveVideo.thumbnail} alt="Live Service" className="w-full h-full object-cover" />
            ) : (
              <PlaceholderCongregation />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/60 via-transparent to-transparent" />
          </div>

          {/* Floating Glassmorphism Card 1 (Radio) */}
          <Link href="/radio" className="absolute -left-4 md:-left-12 bottom-12 z-20 w-64 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(30,43,58,0.1)] hover:scale-105 transition-transform group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-blue-500)] flex items-center justify-center text-white shrink-0 shadow-inner group-hover:bg-[var(--color-blue-700)] transition-colors">
                <Radio size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--color-blue-500)] uppercase tracking-wider group-hover:text-[var(--color-blue-700)]">Asriel FM</p>
                <p className="text-sm font-semibold text-[var(--color-ink)]">Streaming 24/7</p>
              </div>
            </div>
          </Link>

          {/* Floating Glassmorphism Card 2 (Service Times) */}
          {!liveVideo && (
            <div className="absolute -right-4 md:-right-8 top-16 z-20 w-56 p-5 rounded-2xl bg-[var(--color-navy-900)]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
               <p className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Next Service</p>
               <p className="text-lg font-bold text-white mb-2">Sunday Worship</p>
               <p className="text-sm text-sky-100/70">9:00 AM EAT</p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
