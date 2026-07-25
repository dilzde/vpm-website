import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Flame, Heart, Shield, Target, Users } from "lucide-react";
import PlaceholderCongregation from "@/components/placeholders/PlaceholderCongregation";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

export const metadata: Metadata = {
  title: "About Us & Apostle Asriel | VPM International",
  description:
    "Learn about Voice of the Potter's Messengers, our prophetic lineage, intercessory prayer mission, and foundational values under the leadership of Apostle Asriel.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20 space-y-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Entry: Voice of Prophetic Hero (§5 & §9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-12 border-b border-[var(--color-line)]">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block">
              MINISTRY ORIGINS & VISION
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-tight tracking-tight">
              Rebuilding Altars & Preparing Believers for Kingdom Harvest
            </h1>
            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              Voice of the Potter&apos;s Messengers (VPM International) is a dynamic prophetic and intercessory movement led by Apostle Asriel. Founded on intense prayer, territorial evangelism, and sound biblical doctrine, VPM exists to transform lives and establish God&apos;s altar across nations.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="w-full h-[360px] sm:h-[420px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-xl)] relative">
              <PlaceholderCongregation />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                  Potter&apos;s House Altar
                </span>
                <h3 className="font-sans text-xl font-bold">Githurai Sanctuary, Nairobi</h3>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Transition: Vision/Foundation Feature Cards (§9 Single Solid-Lime Featured Card) */}
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
            
            {/* Card 1: Standard White */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Flame size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                Fervent Prayer
              </h3>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Sustaining night and day intercession to dismantle spiritual strongholds and break territorial barriers.
              </p>
            </div>

            {/* Card 2: SINGLE SOLID LIME FEATURED CARD (§9 Emphasis Technique) */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] border border-[var(--color-accent)] shadow-md space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-accent-ink)] text-[var(--color-accent)] flex items-center justify-center font-bold">
                <Shield size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-accent-ink)]">
                Prophetic Word
              </h3>
              <p className="text-xs text-[var(--color-accent-ink)]/90 font-sans leading-relaxed font-medium">
                Proclaiming the uncompromised Word of God with clarity, divine revelation, and supernatural demonstration.
              </p>
            </div>

            {/* Card 3: Standard White */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Target size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                Territorial Altars
              </h3>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Planting vibrant local sanctuaries and fellowship centers to nurture communities across Kenya.
              </p>
            </div>

            {/* Card 4: Standard White */}
            <div className="p-6 rounded-[var(--radius-eight)] bg-white border border-[var(--color-line)] shadow-[var(--shadow-card)] space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] flex items-center justify-center font-bold">
                <Heart size={20} />
              </div>
              <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">
                Compassion Outreach
              </h3>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                Demonstrating Christ&apos;s love through practical benevolence, widow care, and community assistance.
              </p>
            </div>

          </div>
        </div>

        {/* 3. Context: Leadership Grid (Authentic Illustrated Placeholders §0 & §9) */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              PASTORAL LEADERSHIP
            </span>
            <h2 className="font-sans text-3xl font-extrabold text-[var(--color-ink)]">
              Ministry Presbytery & Shepherds
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
              <div className="h-48 w-full rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] relative border border-[var(--color-line)]">
                <PlaceholderSermon />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">Apostle Asriel</h3>
                <p className="text-xs text-[var(--color-slate)] font-sans">General Overseer & Founder</p>
              </div>
            </div>

            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
              <div className="h-48 w-full rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] relative border border-[var(--color-line)]">
                <PlaceholderSermon />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">VPM Pastoral Council</h3>
                <p className="text-xs text-[var(--color-slate)] font-sans">Regional Branch Presbytery</p>
              </div>
            </div>

            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-4 shadow-[var(--shadow-card)]">
              <div className="h-48 w-full rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] relative border border-[var(--color-line)]">
                <PlaceholderSermon />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)]">Intercessory Board</h3>
                <p className="text-xs text-[var(--color-slate)] font-sans">National Prayer Directors</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Anchor Band: Global Presence (§5 & §9) */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center mb-4 font-bold">
            <Users size={22} />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3">
            Connect With Our Ministry Family
          </h2>
          <p className="text-white/85 text-base max-w-xl mb-6 font-sans">
            Whether in person at our Kenya altars or joining remotely via Asriel Radio, you are welcome in our community of believers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-sm hover:scale-105 transition-all shadow-md"
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
