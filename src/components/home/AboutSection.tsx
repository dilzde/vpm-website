import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PlaceholderCongregation from "../placeholders/PlaceholderCongregation";

export default function AboutSection() {
  return (
    <section
      className="bg-[var(--color-surface-alt)] text-[var(--color-ink)] section-gap border-b border-[var(--color-line)]"
      id="about-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Image Collage (No generic video preview placeholders §B) */}
          <div className="lg:col-span-6 relative">
            <div className="w-full h-[360px] sm:h-[420px] rounded-[var(--radius-image)] overflow-hidden border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)] relative">
              <PlaceholderCongregation />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                  Prophet Dr. Samo Mtishiby
                </span>
                <h3 className="font-sans text-xl font-bold">General Overseer & Founder</h3>
              </div>
            </div>
          </div>

          {/* Right Column: Real Who We Are Copy (§G) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block">
              WHO WE ARE
            </span>

            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] leading-tight">
              A Ministry Rooted in Prophetic Truth & Prayer
            </h2>

            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              Voice of the Potter&apos;s Messengers (VPM International) is a kingdom movement founded and led by <strong>Prophet Dr. Samo Mtishiby</strong>, rooted in intercessory prayer, the uncompromised Word of God, and territorial evangelism across Kenya and the world.
            </p>

            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              From our headquarters in Kisumu to our growing network of branches including our main sanctuary at Family Bank, Mlolongo, we remain devoted to equipping believers to walk in the fullness of God&apos;s power and prophetic purpose. For over 15 years, VPM International has stood as a beacon of hope, faith, and spiritual awakening in Kenya and beyond.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[var(--color-ink)] hover:underline"
              >
                <span>Read Full Ministry Vision</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
