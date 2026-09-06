"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Radio, Calendar, Video, Volume2, ExternalLink } from "lucide-react";
import { getLiveStatus, YouTubeVideo } from "@/lib/youtube";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import { subscribeRadioConfig, type RadioConfig } from "@/lib/firestore";

export default function LiveRadioBand() {
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null);
  const [radioConfig, setRadioConfig] = useState<RadioConfig | null>(null);
  const { isPlaying, toggle } = useRadioPlayer();

  useEffect(() => {
    getLiveStatus().then(setLiveVideo).catch(console.error);
    const unsub = subscribeRadioConfig((cfg) => setRadioConfig(cfg));
    return () => unsub();
  }, []);

  return (
    <section
      className="w-full bg-[var(--color-surface)] text-[var(--color-ink)] py-14 md:py-20 border-b border-[var(--color-line)] relative"
      id="live-radio-band"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Live Sanctuary Status or Sunday Worship (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#D5E3F0] rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-card)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                {liveVideo ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-live)] text-white text-xs font-sans font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Live Now</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B5299] text-white text-xs font-sans font-bold uppercase tracking-wider">
                    <Calendar size={13} className="text-white" />
                    <span>Next Sanctuary Gathering</span>
                  </div>
                )}
                <span className="text-xs font-mono font-bold text-[#1B5299]">Asriel TV Broadcast</span>
              </div>

              {liveVideo ? (
                <div>
                  <h3 className="font-sans text-2xl font-bold text-[var(--color-ink)] mb-4 leading-tight">
                    {liveVideo.title}
                  </h3>
                  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[var(--color-line)]">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${liveVideo.videoId}?autoplay=1`}
                      title={liveVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0A1D36] leading-tight">
                    Sunday Worship &amp; Prophetic Word
                  </h3>
                  <p className="text-sm font-sans text-[var(--color-slate)] leading-relaxed max-w-lg">
                    Join us live from Nairobi Main Sanctuary (Family Bank, Mlolongo) for intercessory prayer, prophetic worship, and foundational preaching every Sunday at 8:30 AM.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                      <p className="text-xs font-sans font-bold text-[#1B5299] uppercase tracking-wider">
                        Official Sunday Service
                      </p>
                      <p className="text-lg font-sans font-extrabold text-[#0A1D36] mt-1">
                        8:30 AM – 4:00 PM
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                      <p className="text-xs font-sans font-bold text-[#1B5299] uppercase tracking-wider">
                        Prophetic Checking (Wed)
                      </p>
                      <p className="text-lg font-sans font-extrabold text-[#0A1D36] mt-1">
                        11:00 AM – 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[var(--color-line)] mt-6 flex items-center justify-between text-xs font-sans text-[var(--color-slate)]">
              <span className="flex items-center gap-1.5 font-bold text-[#0A1D36]">
                <Video size={14} className="text-[#1B5299]" />
                <span>Broadcasting to Nations</span>
              </span>
              <span className="font-mono font-semibold text-[#1B5299]">Channel A &amp; B</span>
            </div>
          </div>

          {/* Right Column: Prominent Full-Height Asriel Radio Player Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D5E3F0] rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-card)] flex flex-col justify-between h-full">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#1B5299] text-white flex items-center justify-center font-bold shadow-sm">
                  <Radio size={22} />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0A1D36] leading-none">Asriel Radio</h3>
                  <span className="text-[11px] font-mono font-bold text-[#1B5299] uppercase tracking-wider block mt-1">
                    24/7 Live Stream
                  </span>
                </div>
              </div>

              {/* Animated Audio Waveform */}
              <div className="flex items-end gap-1 h-5">
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-5 animate-pulse" : "h-2"}`} />
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-75" : "h-2"}`} />
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-6 animate-pulse delay-150" : "h-2"}`} />
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse delay-100" : "h-2"}`} />
              </div>
            </div>

            {/* Central Full-Space Radio Play Box with Radio Logo in Background */}
            <div className="flex-1 w-full my-4 relative rounded-2xl overflow-hidden flex flex-col justify-between items-center p-6 sm:p-8 text-center text-white bg-gradient-to-br from-[#0F2540] via-[#1A3A6B] to-[#0A1628] shadow-lg min-h-[310px] sm:min-h-[350px]">
              
              {/* Radio Station Logo in the Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <div className="absolute w-60 h-60 rounded-full bg-[#29A3E4]/20 blur-3xl animate-pulse" />
                {radioConfig?.radioLogoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={radioConfig.radioLogoUrl}
                    alt="Asriel Radio Logo"
                    className="w-52 h-52 sm:w-64 sm:h-64 object-contain opacity-25 filter contrast-125 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0F2540]/60 to-[#0A1628]/90" />
              </div>

              {/* Top Details */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[10px] font-sans font-extrabold text-[#62B4EE] uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29A3E4] animate-pulse" />
                  NOW BROADCASTING 24/7
                </span>
                <h4
                  className="font-sans text-xl sm:text-2xl font-extrabold !text-white tracking-tight leading-snug"
                  style={{ color: "#FFFFFF" }}
                >
                  Anointed Preaching &amp; Worship
                </h4>
                <p
                  className="text-xs !text-white font-sans mt-1"
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  Global Voice of the Potter&apos;s Messengers
                </p>
              </div>

              {/* Center Play/Pause Button Floating Directly Above Logo */}
              <div className="relative z-10 my-auto py-4 flex flex-col items-center">
                <div className="relative group">
                  {isPlaying && (
                    <>
                      <span className="absolute -inset-3 rounded-full bg-[#29A3E4]/40 animate-ping opacity-75" />
                      <span className="absolute -inset-6 rounded-full bg-[#29A3E4]/20 animate-pulse" />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => toggle()}
                    className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-[#0F2540] hover:bg-[#29A3E4] hover:text-white flex items-center justify-center shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    aria-label={isPlaying ? "Pause Radio" : "Play Radio"}
                  >
                    {isPlaying ? (
                      <Pause size={36} className="fill-current" />
                    ) : (
                      <Play size={36} className="ml-1.5 fill-current" />
                    )}
                  </button>
                </div>
                <span
                  className="text-xs font-sans font-bold !text-white uppercase tracking-widest mt-3"
                  style={{ color: "#FFFFFF" }}
                >
                  {isPlaying ? "Live Broadcast On Air" : "Tap to Listen Live"}
                </span>
              </div>

              {/* Bottom Stream Status */}
              <div
                className="relative z-10 w-full flex items-center justify-between text-xs !text-white pt-3 border-t border-white/20"
                style={{ color: "#FFFFFF" }}
              >
                <span
                  className="flex items-center gap-1.5 font-medium !text-white"
                  style={{ color: "#FFFFFF" }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Streaming live via Zeno.fm
                </span>
                <span
                  className="font-mono text-[11px] font-semibold !text-white"
                  style={{ color: "#FFFFFF" }}
                >
                  HD Audio
                </span>
              </div>

            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-[#D5E3F0] flex items-center justify-between text-xs font-sans text-[var(--color-slate)]">
              <span className="flex items-center gap-1.5 font-semibold text-[#0A1D36]">
                <Volume2 size={15} className="text-[#1B5299]" />
                <span>Continuous Stream</span>
              </span>
              <a
                href="https://asrielradio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-extrabold text-[#1B5299] hover:underline"
              >
                <span>asrielradio.com</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
