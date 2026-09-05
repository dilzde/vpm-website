import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Flame, Heart, Shield, Target, Users } from "lucide-react";
import PlaceholderCongregation from "@/components/placeholders/PlaceholderCongregation";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";
import LiveCarouselImage from "@/components/LiveCarouselImage";

export const metadata: Metadata = {
  title: "About Us & Prophet Dr. Samo Mtishiby | VPM International",
  description:
    "Learn about Voice of the Potter's Messengers, our prophetic lineage, intercessory prayer mission, and foundational values under the leadership of Prophet Dr. Samo Mtishiby.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20 space-y-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Entry: Voice of Prophetic Hero (§5 & §G) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-[var(--color-line)]">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block">
              MINISTRY ORIGINS & VISION
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-tight tracking-tight">
              Where Prophecies Come to Life
            </h1>
            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              Voice of the Potter&apos;s Messengers (VPM International) is a kingdom movement founded and led by <strong>Prophet Dr. Samo Mtishiby</strong>, rooted in intercessory prayer, the uncompromised Word of God, and territorial evangelism across Kenya and the world.
            </p>
            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              From our headquarters in Kisumu to our main sanctuary at Family Bank, Mlolongo and our growing network of branches, we remain devoted to equipping believers to walk in the fullness of God&apos;s power and prophetic purpose. For over 15 years, VPM International has stood as a beacon of hope, faith, and spiritual awakening.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="w-full h-[360px] sm:h-[420px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-xl)] relative">
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

        {/* 2. Transition: Core Foundations Feature Cards (§L) */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="font-sans text-3xl font-extrabold text-[var(--color-ink)]">
              Core Principles of VPM
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: Jesus Christ */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Flame size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                01. Jesus Christ
              </h3>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Christ is the center and foundation of everything we do.
              </p>
            </div>

            {/* Pillar 2: Prophetic Revelation (FEATURED SOLID LIME CARD §9 Emphasis) */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] border border-[var(--color-accent)] shadow-md space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-accent-ink)] text-[var(--color-accent)] flex items-center justify-center font-bold">
                <Shield size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-accent-ink)]">
                02. Prophetic Revelation
              </h3>
              <p className="text-xs text-[var(--color-accent-ink)]/90 font-sans leading-relaxed font-medium">
                The Prophet has been graced to know and share the deeper secrets found in God&apos;s Word.
              </p>
            </div>

            {/* Pillar 3: Love */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Heart size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                03. Love
              </h3>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                We are called to love God and love one another above all else.
              </p>
            </div>

            {/* Pillar 4: The Word of God */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Target size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                04. The Word of God
              </h3>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                We stand on the uncompromised truth of Scripture in all teaching and ministry.
              </p>
            </div>

          </div>
        </div>



        {/* 4. Anchor Band: Global Presence */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <div className="w-12 h-12 rounded-full bg-white text-[#0B0F17] flex items-center justify-center mb-4 font-bold shadow-md">
            <Users size={22} />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3 text-white">
            Connect With Our Ministry Family
          </h2>
          <p className="text-white/85 text-base max-w-xl mb-6 font-sans">
            Whether in person at our Nairobi (Mlolongo) sanctuary, Kisumu HQ, or joining remotely via Asriel Radio, you are welcome.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0B0F17] font-sans font-bold text-sm hover:bg-[#FAF7F2] hover:scale-105 transition-all shadow-xl"
            >
              <span>Explore Branch Locations</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
