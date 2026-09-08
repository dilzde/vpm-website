import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Flame, Heart, Shield, Target, Users, BookOpen, Clock, MapPin } from "lucide-react";
import PlaceholderCongregation from "@/components/placeholders/PlaceholderCongregation";
import LiveCarouselImage from "@/components/LiveCarouselImage";

export const metadata: Metadata = {
  title: "About Us & Prophet Dr. Samo Mtishiby | VPM International",
  description:
    "Learn about Voice of the Potter's Messengers, our prophetic lineage, intercessory prayer mission, and foundational values under the leadership of Prophet Dr. Samo Mtishiby.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-10 sm:py-16 md:py-20 space-y-16 sm:space-y-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* 1. Entry: Voice of Prophetic Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-12 border-b border-[var(--color-line)]">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block">
              MINISTRY ORIGINS &amp; VISION
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-tight tracking-tight">
              Where Prophecies Come to Life
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-slate)] font-sans leading-relaxed">
              Voice of the Potter&apos;s Messengers (VPM International) is a kingdom movement founded and led by <strong>Prophet Dr. Samo Mtishiby</strong>, rooted in intercessory prayer, the uncompromised Word of God, and territorial evangelism across Kenya and the world.
            </p>
            <p className="text-sm sm:text-base text-[var(--color-slate)] font-sans leading-relaxed">
              From our ministry headquarters at Family Bank, Mlolongo (Nairobi), to our mother church in Kisumu and our nationwide sanctuary network, we remain devoted to equipping believers to walk in the fullness of God&apos;s power and prophetic purpose.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-navy-900)] text-white text-xs sm:text-sm font-sans font-bold hover:bg-[#1B5299] transition-colors"
              >
                <span>Attend a Service</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/branches"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-ink)] text-xs sm:text-sm font-sans font-bold hover:bg-[var(--color-surface-alt)] transition-colors"
              >
                <span>Find a Sanctuary</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="w-full h-[320px] sm:h-[400px] md:h-[440px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-xl)] relative">
              <LiveCarouselImage
                slot="about"
                eyebrow="Prophet Dr. Samo Mtishiby"
                caption="General Overseer & Founder"
                fallback={
                  <>
                    <PlaceholderCongregation />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                        Prophet Dr. Samo Mtishiby
                      </span>
                      <h3 className="font-sans text-xl font-bold">General Overseer &amp; Founder</h3>
                    </div>
                  </>
                }
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* 2. Transition: Core Foundations Feature Cards */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-ink)]">
              Core Principles of VPM International
            </h2>
            <p className="text-sm text-[var(--color-slate)] font-sans mt-2">
              Four timeless pillars that anchor our worship, discipleship, and territorial mission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Jesus Christ */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                  <Flame size={20} />
                </div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                  01. Jesus Christ
                </h3>
                <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                  Christ is the center, head, and eternal cornerstone of all ministry teaching and worship.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[var(--color-slate)]">1 Cor 3:11</span>
            </div>

            {/* Pillar 2: Prophetic Revelation (Featured Highlight) */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-[#0F2540] text-white border border-[#29A3E4]/30 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[#29A3E4] text-white flex items-center justify-center font-bold">
                  <Shield size={20} />
                </div>
                <h3 className="font-sans text-lg font-bold text-white">
                  02. Prophetic Revelation
                </h3>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  The deeper mysteries of God&apos;s Word unveiled through prophetic grace for direction and breakthrough.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#62B4EE]">Amos 3:7</span>
            </div>

            {/* Pillar 3: Divine Love */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                  <Heart size={20} />
                </div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                  03. Divine Love
                </h3>
                <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                  Unconditional compassion expressed through charity, fellowship, and caring for the vulnerable.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[var(--color-slate)]">1 Cor 13:13</span>
            </div>

            {/* Pillar 4: The Word of God */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                  <Target size={20} />
                </div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                  04. The Word of God
                </h3>
                <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                  The uncompromised, living truth of Scripture as our sole authority in faith and life.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-[var(--color-slate)]">2 Tim 3:16</span>
            </div>
          </div>
        </div>

        {/* 3. The Journey & Ministry Pillars */}
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] p-6 sm:p-10 lg:p-12 shadow-[var(--shadow-card)] space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-sans font-bold tracking-widest text-[#1B5299] uppercase block mb-2">
              OVER 15 YEARS OF GRACE
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)]">
              An Anointed Commission to the Nations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[var(--color-line)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-ink)]">
                <Clock size={16} className="text-[#29A3E4]" />
                <span>24/7 Prophetic Prayer Altar</span>
              </div>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Continuous intercession for families, sickness, deliverance, and spiritual empowerment.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-ink)]">
                <BookOpen size={16} className="text-[#29A3E4]" />
                <span>Published Prophetic Literature</span>
              </div>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Author of acclaimed spiritual books available internationally on Amazon for deep spiritual knowledge.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-ink)]">
                <MapPin size={16} className="text-[#29A3E4]" />
                <span>Territorial Sanctuary Network</span>
              </div>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                Physical worship centres across Nairobi, Western, Coastal, and Rift Valley regions in Kenya.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Anchor Band: Connect with Ministry Family */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <div className="w-12 h-12 rounded-full bg-white text-[#0B0F17] flex items-center justify-center mb-4 font-bold shadow-md">
            <Users size={22} />
          </div>
          <h2
            className="font-sans text-2xl sm:text-3xl font-extrabold mb-3 !text-white"
            style={{ color: "#FFFFFF" }}
          >
            Connect With Our Ministry Family
          </h2>
          <p
            className="text-sm sm:text-base max-w-xl mb-6 font-sans !text-white"
            style={{ color: "rgba(255, 255, 255, 0.92)" }}
          >
            Whether in person at our Nairobi (Mlolongo) Headquarters, Kisumu Mother Church, or joining remotely via Asriel Radio, you are warmly invited.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0B0F17] font-sans font-bold text-sm hover:bg-[#FAF7F2] hover:scale-105 transition-all shadow-xl"
            >
              <span>Explore Branch Locations</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white font-sans font-bold text-sm hover:bg-white/20 transition-all"
            >
              <span>Contact Pastoral Desk</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
