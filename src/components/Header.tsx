"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Radio, Play, Pause, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Branches", href: "/branches" },
  { label: "Media", href: "/media" },
  { label: "Radio", href: "/radio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isPlaying, toggle } = useRadioPlayer();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll on Android/iOS when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-surface)]/95 backdrop-blur-md text-[var(--color-ink)] border-b border-[var(--color-line)] h-[72px] flex items-center transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group text-[var(--color-ink)] hover:opacity-90 transition-opacity"
          id="header-logo"
        >
          <div className="w-10 h-10 overflow-hidden relative flex items-center justify-center shrink-0">
            <Image
              src="/vpm_logo.png"
              alt="VPM Logo"
              width={38}
              height={38}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold tracking-tight text-lg sm:text-xl text-[var(--color-ink)] leading-tight">
              VPM International
            </span>
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[var(--color-slate)] hidden sm:block">
              Voice of The Potter&apos;s Messengers
            </span>
          </div>
        </Link>

        {/* Center-Right: Desktop Nav Links & Give CTA */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          
          {/* Nav Links */}
          <nav className="flex items-center gap-5 xl:gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs xl:text-sm font-sans font-semibold uppercase tracking-[0.03em] relative py-1 transition-colors ${
                    active ? "text-[var(--color-ink)] font-bold" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--color-accent)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Area: Live Radio Quick Pill + Give Pill */}
          <div className="flex items-center gap-3 pl-4 border-l border-[var(--color-line)]">
            <button
              type="button"
              onClick={() => toggle()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer ${
                isPlaying
                  ? "bg-[#29A3E4] text-white border-[#29A3E4] shadow-sm"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-ink)] border-[var(--color-line)] hover:border-[#29A3E4]"
              }`}
              title={isPlaying ? "Pause Asriel Radio" : "Listen to Asriel Radio Live"}
            >
              <Radio size={13} className={isPlaying ? "text-white animate-pulse" : "text-[#29A3E4]"} />
              <span>{isPlaying ? "On Air" : "Radio"}</span>
              {isPlaying ? <Pause size={11} className="fill-current" /> : <Play size={11} className="fill-current ml-0.5" />}
            </button>

            <Link
              href="/give"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs xl:text-sm font-sans font-bold text-white bg-[#0B0F17] hover:bg-[#1F2937] hover:scale-105 rounded-full transition-all shadow-xs"
              id="give-cta"
            >
              <Heart size={13} className="fill-current" />
              <span>Give</span>
            </Link>
          </div>

        </div>

        {/* Mobile Action Hub (Radio Quick Pill + Hamburger) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            type="button"
            onClick={() => toggle()}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer ${
              isPlaying
                ? "bg-[#29A3E4] text-white border-[#29A3E4] shadow-xs"
                : "bg-[var(--color-surface-alt)] text-[var(--color-ink)] border-[var(--color-line)]"
            }`}
            aria-label={isPlaying ? "Pause Radio" : "Listen to Radio Live"}
          >
            <Radio size={13} className={isPlaying ? "text-white animate-pulse" : "text-[#29A3E4]"} />
            <span className="text-[11px] font-bold">{isPlaying ? "Live" : "Radio"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
            className="min-w-[42px] min-h-[42px] p-2 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-[var(--color-ink)] flex items-center justify-center active:scale-95 touch-manipulation cursor-pointer shadow-xs"
          >
            {mobileOpen ? <X size={20} className="stroke-[2.5]" /> : <Menu size={20} className="stroke-[2.5]" />}
          </button>
        </div>

      </div>

      {/* Android & Mobile Slide-In Fullscreen Panel */}
      {mobileOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 bottom-0 z-[100] bg-[var(--color-surface)] text-[var(--color-ink)] lg:hidden flex flex-col justify-between px-6 py-6 h-[calc(100dvh-72px)] overflow-y-auto shadow-2xl border-t border-[var(--color-line)]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div>
            {/* Action CTAs */}
            <div className="pb-5 border-b border-[var(--color-line)] mb-5 space-y-2.5">
              <Link
                href="/give"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-sans font-bold text-white bg-[#0B0F17] hover:bg-[#1F2937] rounded-full shadow-md active:scale-98 transition-all"
              >
                <Heart size={16} className="fill-current text-[#DC2626]" />
                <span>Give / Support Mission</span>
              </Link>

              {/* Quick Radio Play Toggle inside Mobile Menu */}
              <button
                type="button"
                onClick={() => toggle()}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-[var(--color-ink)] text-xs font-sans font-bold shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Radio size={15} className="text-[#29A3E4]" />
                  <span>Asriel Radio 24/7 Global Stream</span>
                </span>
                <span className="flex items-center gap-1 text-[#29A3E4] font-extrabold">
                  {isPlaying ? <Pause size={13} className="fill-[#29A3E4]" /> : <Play size={13} className="fill-[#29A3E4]" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col divide-y divide-[var(--color-line)]" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-sans font-bold tracking-wide uppercase py-3.5 transition-colors flex items-center justify-between ${
                      active ? "text-[#0B0F17] font-black" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <div className="flex items-center gap-2">
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                      )}
                      <ChevronRight size={16} className="text-[var(--color-slate)]/50" />
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Pastoral Desk Quick Contact Footer inside Mobile Menu */}
          <div className="pt-4 border-t border-[var(--color-line)] mt-4 space-y-2">
            <p className="text-[11px] font-sans font-bold text-[var(--color-slate)] uppercase tracking-wider">
              Pastoral Desk &amp; Inquiry
            </p>
            <div className="flex items-center justify-between text-xs font-sans text-[var(--color-ink)] font-bold">
              <a href="tel:+254794731831" className="flex items-center gap-1.5 hover:underline">
                <Phone size={13} className="text-[var(--color-accent)]" />
                <span>+254 794 731 831</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-xs text-[#1B5299] hover:underline"
              >
                Directions →
              </Link>
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
