"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Play, Pause, Heart } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-navy-900)] text-white shadow-md border-b border-[var(--color-line-dark)] h-[64px] lg:h-[76px] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark (Part B) */}
        <Link
          href="/"
          className="flex items-center gap-3 group text-white hover:opacity-95 transition-opacity"
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
          <span className="font-sans font-bold tracking-tight text-lg sm:text-xl text-white hidden sm:inline-block">
            VPM International
          </span>
        </Link>

        {/* Center-Right: Nav Links & Far-Right CTA Controls (Part B) */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Nav Links with 2px Gold Active Underline */}
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-sans font-medium uppercase tracking-[0.03em] relative py-1 transition-colors ${
                    active ? "text-white" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-gold-500)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Far Right Controls (Separated by 24px gap) */}
          <div className="flex items-center gap-4 pl-6 border-l border-white/15">
            
            {/* Docked Radio Quick-Access Control Pill */}
            <button
              type="button"
              onClick={() => toggle()}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-[var(--color-line-dark)] text-xs font-sans text-white transition-all cursor-pointer"
              aria-label={isPlaying ? "Pause Live Radio" : "Play Live Radio"}
            >
              {isPlaying ? (
                <>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-gold-500)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-gold-500)]"></span>
                  </span>
                  <Pause size={12} className="fill-white" />
                  <span className="font-semibold">Playing Radio</span>
                </>
              ) : (
                <>
                  <Play size={12} className="fill-white ml-0.5" />
                  <span className="font-medium">Live Radio</span>
                </>
              )}
            </button>

            {/* Solid Gold Pill Button (Give) */}
            <Link
              href="/give"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-sans font-bold text-[var(--color-ink)] bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-700)] rounded-full transition-all shadow-sm"
              id="give-cta"
            >
              <Heart size={14} className="fill-current" />
              <span>Give</span>
            </Link>

          </div>

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="lg:hidden p-2 text-white/90 hover:text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Slide-In Panel (Part B) */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[64px] z-50 bg-[var(--color-navy-900)] text-white lg:hidden flex flex-col px-6 py-8 overflow-y-auto">
          
          {/* Top Quick Controls in Mobile Panel */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/15 mb-6">
            <button
              type="button"
              onClick={() => {
                toggle();
                setMobileOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-sans font-semibold text-white"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? "Pause Radio" : "Play Radio Stream"}</span>
            </button>

            <Link
              href="/give"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-sans font-bold text-[var(--color-ink)] bg-[var(--color-gold-500)] rounded-full shrink-0"
            >
              <Heart size={16} className="fill-current" />
              <span>Give</span>
            </Link>
          </div>

          {/* Mobile Nav Links (Stacked 20px, 24px gap) */}
          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl font-sans font-bold tracking-wide uppercase transition-colors ${
                    active ? "text-[var(--color-gold-500)]" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

        </div>
      )}
    </header>
  );
}
