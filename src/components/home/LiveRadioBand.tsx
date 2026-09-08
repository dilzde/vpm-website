"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Radio, Calendar, Video, Volume2, ExternalLink } from "lucide-react";
import { getLiveStatus, YouTubeVideo } from "@/lib/youtube";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";
import type { LivestreamConfig } from "@/lib/livestream-types";

export default function LiveRadioBand({
  initialLivestreamConfig,
}: {
  initialLivestreamConfig?: LivestreamConfig | null;
}) {
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null);
  const [radioConfig, setRadioConfig] = useState<LivestreamConfig | null>(initialLivestreamConfig || null);
  const { isPlaying, toggle } = useRadioPlayer();

  useEffect(() => {
    getLiveStatus().then(setLiveVideo).catch(console.error);
    if (initialLivestreamConfig) {
      setRadioConfig(initialLivestreamConfig);
    }
  }, [initialLivestreamConfig]);

  return (
    <section
      className="w-full bg-[var(--color-surface)] text-[var(--color-ink)] py-8 sm:py-10 md:py-14 border-b border-[var(--color-line)] relative overflow-hidden"
      id="live-radio-band"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sleek Broadcast Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[var(--color-line)]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#1B5299] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Ministry Broadcast Center</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] tracking-tight mt-0.5">
              Live Sanctuary Stream &amp; 24/7 Radio
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              24/7 On Air
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Column: Live TV or Service Schedule (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#D5E3F0] rounded-2xl p-4 sm:p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                {liveVideo ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-live)] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Live Sanctuary Broadcast</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B5299] text-white text-xs font-sans font-bold uppercase tracking-wider">
                    <Calendar size={13} className="text-white" />
                    <span>Next Gathering Schedule</span>
                  </div>
                )}
                <span className="text-xs font-mono font-bold text-[#1B5299]">Asriel TV</span>
              </div>

              {liveVideo ? (
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[var(--color-ink)] mb-3 leading-snug line-clamp-1">
                    {liveVideo.title}
                  </h3>
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-[var(--color-line)] shadow-inner">
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
                <div className="space-y-3 py-1">
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0A1D36] leading-snug">
                    Sunday Divine Worship &amp; Prophetic Service
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[var(--color-slate)] leading-relaxed">
                    Join Prophet Dr. Samo Mtishiby live from Nairobi Ministry Headquarters (Family Bank Building, Mlolongo) or stream online across nations.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                      <p className="text-[11px] font-sans font-bold text-[#1B5299] uppercase tracking-wider">
                        Sunday Divine Service
                      </p>
                      <p className="text-base font-sans font-extrabold text-[#0A1D36] mt-0.5">
                        8:30 AM – 4:00 PM
                      </p>
                      <p className="text-[11px] text-[var(--color-slate)] mt-0.5 font-sans">
                        Worship, Prophetic Ministry &amp; Deliverance
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-line)]">
                      <p className="text-[11px] font-sans font-bold text-[#1B5299] uppercase tracking-wider">
                        Wednesday Checking
                      </p>
                      <p className="text-base font-sans font-extrabold text-[#0A1D36] mt-0.5">
                        11:00 AM – 3:00 PM
                      </p>
                      <p className="text-[11px] text-[var(--color-slate)] mt-0.5 font-sans">
                        Personal Prophetic Counseling &amp; Prayer
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[var(--color-line)] mt-4 flex items-center justify-between text-xs font-sans text-[var(--color-slate)]">
              <span className="flex items-center gap-1.5 font-bold text-[#0A1D36]">
                <Video size={14} className="text-[#1B5299]" />
                <span>Broadcasting to Nations</span>
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#1B5299]">Global Channels</span>
            </div>
          </div>

          {/* Right Column: Expertly Arranged Asriel Radio Player Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D5E3F0] rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col justify-between">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-line)]/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1B5299] text-white flex items-center justify-center font-bold shadow-xs">
                  <Radio size={18} />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-extrabold text-[#0A1D36] leading-none">Asriel Radio</h3>
                  <span className="text-[10px] font-mono font-bold text-[#1B5299] uppercase tracking-wider block mt-0.5">
                    24/7 Live Stream
                  </span>
                </div>
              </div>

              {/* Animated Audio Waveform */}
              <div className="flex items-end gap-1 h-4">
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse" : "h-1.5"}`} />
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-75" : "h-1.5"}`} />
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-4 animate-pulse delay-150" : "h-1.5"}`} />
                <span className={`w-1 bg-[#1B5299] rounded-full transition-all duration-300 ${isPlaying ? "h-2 animate-pulse delay-100" : "h-1.5"}`} />
              </div>
            </div>

            {/* Central Compact Player Box */}
            <div className="my-3 relative rounded-xl overflow-hidden flex flex-col justify-between items-center p-5 text-center text-white bg-gradient-to-br from-[#0F2540] via-[#163152] to-[#0A1628] shadow-md min-h-[220px]">
              
              {/* Radio Station Logo in the Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <div className="absolute w-44 h-44 rounded-full bg-[#29A3E4]/15 blur-2xl animate-pulse" />
                {radioConfig?.radioLogoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={radioConfig.radioLogoUrl}
                    alt="Asriel Radio Logo"
                    className="w-36 h-36 object-contain opacity-20 filter contrast-125"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0F2540]/60 to-[#0A1628]/90" />
              </div>

              {/* Top Details */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[9px] font-sans font-extrabold text-[#62B4EE] uppercase tracking-widest mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29A3E4] animate-pulse" />
                  NOW BROADCASTING 24/7
                </span>
                <h4 className="font-sans text-base sm:text-lg font-extrabold !text-white tracking-tight leading-snug">
                  Anointed Preaching &amp; Worship
                </h4>
                <p className="text-[11px] text-white/80 font-sans mt-0.5">
                  Global Voice of the Potter&apos;s Messengers
                </p>
              </div>

              {/* Center Play/Pause Button */}
              <div className="relative z-10 my-3 flex flex-col items-center">
                <div className="relative group">
                  {isPlaying && (
                    <>
                      <span className="absolute -inset-2 rounded-full bg-[#29A3E4]/40 animate-ping opacity-75" />
                      <span className="absolute -inset-4 rounded-full bg-[#29A3E4]/20 animate-pulse" />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => toggle()}
                    className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#0F2540] hover:bg-[#29A3E4] hover:text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    aria-label={isPlaying ? "Pause Radio" : "Play Radio"}
                  >
                    {isPlaying ? (
                      <Pause size={24} className="fill-current" />
                    ) : (
                      <Play size={24} className="ml-1 fill-current" />
                    )}
                  </button>
                </div>
                <span className="text-[10px] font-sans font-bold !text-white uppercase tracking-wider mt-2">
                  {isPlaying ? "Live Broadcast On Air" : "Tap to Listen Live"}
                </span>
              </div>

              {/* Bottom Stream Status */}
              <div className="relative z-10 w-full flex items-center justify-between text-[11px] !text-white pt-2.5 border-t border-white/15">
                <span className="flex items-center gap-1.5 font-medium !text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Zeno.fm Live
                </span>
                <span className="font-mono text-[10px] font-semibold text-[#62B4EE]">
                  HD Audio
                </span>
              </div>

            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-[#D5E3F0] flex items-center justify-between text-xs font-sans text-[var(--color-slate)]">
              <span className="flex items-center gap-1.5 font-semibold text-[#0A1D36]">
                <Volume2 size={14} className="text-[#1B5299]" />
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
