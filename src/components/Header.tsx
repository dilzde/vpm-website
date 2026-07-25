"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Radio, Heart } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Media", href: "/media" },
  { label: "Radio", href: "/radio" },
  { label: "Events", href: "/events" },
  { label: "Branches", href: "/branches" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-[var(--color-navy-900)]/95 backdrop-blur-md border-b border-white/10 text-white shadow-md",
        scrolled ? "py-3.5" : "py-5",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group text-white hover:opacity-95 transition-all"
          id="header-logo"
        >
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white/10 p-1 rounded-lg border border-white/15 shadow-inner group-hover:border-[var(--color-accent)] transition-colors">
            <Image src="/vpm_logo.png" alt="VPM International Logo" width={36} height={36} className="object-contain" priority />
          </div>
          <span
            className={[
              "font-display font-extrabold tracking-tight transition-all duration-200 text-white",
              scrolled ? "text-lg" : "text-xl",
            ].join(" ")}
          >
            VPM International
          </span>
        </Link>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation" id="main-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-[var(--color-accent-hover)] rounded-md hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-3 pl-3 border-l border-white/15">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider
                         bg-white/10 text-slate-100 border border-white/20 rounded-[var(--radius-sm)] hover:bg-white/20 hover:border-white/30 transition-all"
              id="watch-live-cta"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-live)]"></span>
              </span>
              Watch Live
            </Link>
            <Link
              href="/give"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold tracking-wide
                         bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-hover)] 
                         shadow-[var(--shadow-accent)] transform hover:-translate-y-0.5 transition-all duration-200
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              id="give-cta"
            >
              <Heart size={15} className="fill-current" />
              Give
            </Link>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2.5 relative z-50 rounded-[var(--radius-sm)] text-slate-200 hover:bg-white/10 hover:text-white transition-colors
                     focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[var(--color-navy-900)] text-white lg:hidden overflow-y-auto border-t border-white/10 px-6 py-8 shadow-2xl">
          <nav className="flex flex-col gap-2 max-w-md mx-auto" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 text-lg text-slate-100 font-display font-bold rounded-lg hover:bg-white/10 hover:text-[var(--color-accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 pt-6 border-t border-white/15 flex flex-col gap-4">
              <Link
                href="/give"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-bold
                           bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-hover)] shadow-lg transition-all"
              >
                <Heart size={18} className="fill-current" />
                Give to Support
              </Link>
              <Link
                href="/media"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 text-sm font-bold uppercase tracking-wider
                           bg-white/10 text-slate-100 border border-white/20 rounded-[var(--radius-sm)] hover:bg-white/20 transition-all"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-live)]"></span>
                </span>
                Watch Live Stream
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
