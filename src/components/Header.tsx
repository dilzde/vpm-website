"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Radio, Play, Pause } from "lucide-react";
import { useRadioPlayer } from "@/lib/hooks/useRadioPlayer";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Media", href: "/media" },
  { label: "Radio", href: "/radio" },
  { label: "Branches", href: "/branches" },
  { label: "Events", href: "/events" },
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
          <span className="font-sans font-extrabold tracking-tight text-lg sm:text-xl text-[var(--color-ink)] hidden sm:inline-block">
            VPM International
          </span>
        </Link>

        {/* Center-Right: Desktop Nav Links & Give CTA */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Nav Links */}
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-sans font-semibold uppercase tracking-[0.03em] relative py-1 transition-colors ${
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

          {/* Solid Lime Pill Button (Give) */}
          <div className="pl-6 border-l border-[var(--color-line)]">
            <Link
              href="/give"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-sans font-bold text-[var(--color-accent-ink)] bg-[var(--color-accent)] hover:scale-105 rounded-full transition-all shadow-xs"
              id="give-cta"
            >
              <Heart size={14} className="fill-current" />
              <span>Give</span>
            </Link>
          </div>

        </div>

        {/* Android & Mobile Ultra-Responsive Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          id="mobile-menu-toggle"
          className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-[var(--color-ink)] flex items-center justify-center active:scale-95 touch-manipulation cursor-pointer shadow-xs"
        >
          {mobileOpen ? <X size={22} className="stroke-[2.5]" /> : <Menu size={22} className="stroke-[2.5]" />}
        </button>

      </div>

      {/* Android & Mobile Slide-In Fullscreen Panel */}
      {mobileOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 bottom-0 z-[100] bg-[var(--color-surface)] text-[var(--color-ink)] lg:hidden flex flex-col px-6 py-8 h-[calc(100dvh-72px)] overflow-y-auto shadow-2xl border-t border-[var(--color-line)]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          
          {/* Action CTAs */}
          <div className="pb-6 border-b border-[var(--color-line)] mb-6 space-y-3">
            <Link
              href="/give"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-base font-sans font-bold text-[var(--color-accent-ink)] bg-[var(--color-accent)] rounded-full shadow-md active:scale-98 transition-all"
            >
              <Heart size={18} className="fill-current" />
              <span>Give / Support Mission</span>
            </Link>

            {/* Quick Radio Play Toggle inside Mobile Menu */}
            <button
              type="button"
              onClick={() => toggle()}
              className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-[var(--color-navy-900)] text-white text-xs font-sans font-bold shadow-xs cursor-pointer active:scale-98 transition-all"
            >
              <span className="flex items-center gap-2">
                <Radio size={16} className="text-[var(--color-accent)]" />
                <span>Asriel Radio 24/7</span>
              </span>
              <span className="flex items-center gap-1 text-[var(--color-accent)] font-extrabold">
                {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
                <span>{isPlaying ? "Pause" : "Listen Live"}</span>
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl font-sans font-extrabold tracking-wide uppercase py-1 transition-colors flex items-center justify-between ${
                    active ? "text-[var(--color-ink)] font-black text-2xl" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

        </div>
      )}
    </header>
  );
}
