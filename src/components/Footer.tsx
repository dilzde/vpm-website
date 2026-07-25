import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Radio, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy-900)] text-white border-t border-[var(--color-line-dark)] font-sans">
      
      {/* Upper Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1: Ministry Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden relative flex items-center justify-center">
                <Image
                  src="/vpm_logo.png"
                  alt="VPM Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <span className="font-sans font-extrabold text-xl text-white tracking-tight">
                VPM International
              </span>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-sans">
              Voice of the Potter&apos;s Messengers Ministry, founded and led by <strong>Prophet Dr. Samo Mtishiby</strong>. A prophetic movement dedicated to prayer, biblical truth, and territorial awakening.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-white/80">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span>Broadcasting 24/7 on Asriel Radio & YouTube</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-white/75 font-medium">
              <li>
                <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">About Us & Vision</Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-[var(--color-accent)] transition-colors">Media Vault & Sermons</Link>
              </li>
              <li>
                <Link href="/radio" className="hover:text-[var(--color-accent)] transition-colors">Asriel Radio Live</Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-[var(--color-accent)] transition-colors">Sanctuary Branches</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[var(--color-accent)] transition-colors">Gatherings & Schedule</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Main Church Location & Contact (§O & User Instruction) (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-4">
              Main Church & Pastoral Desk
            </h4>

            <div className="p-4 rounded-[var(--radius-eight)] bg-white/5 border border-white/10 space-y-2.5 text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Nairobi Main Sanctuary</p>
                  <p className="text-white/70">Family Bank, Mlolongo, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone size={16} className="text-[var(--color-accent)] shrink-0" />
                <a href="tel:+254794731831" className="font-bold hover:underline text-white">
                  +254 794 731 831
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[var(--color-accent)] shrink-0" />
                <a href="mailto:vpminternational2@gmail.com" className="hover:underline text-white/80">
                  vpminternational2@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/give"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-xs hover:scale-105 transition-all"
              >
                <Heart size={14} className="fill-current" />
                <span>Share with VPM</span>
              </Link>
              <Link
                href="/radio"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all border border-white/20"
              >
                <Radio size={14} />
                <span>Listen Radio</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright Strip */}
      <div className="border-t border-white/10 py-6 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {currentYear} Voice of the Potter&apos;s Messengers Ministry (VPM International). All rights reserved.</p>
          <p className="text-[11px] font-mono text-white/40">Powering Prophetic Revival across Nations</p>
        </div>
      </div>

    </footer>
  );
}
