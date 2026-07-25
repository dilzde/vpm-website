"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-surface)]/85 backdrop-blur-md text-[var(--color-ink)] border-b border-[var(--color-line)] h-[72px] flex items-center transition-all">
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

        {/* Center-Right: Nav Links & Give CTA */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Nav Links with 2px Lime Active Underline */}
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

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="lg:hidden p-2 text-[var(--color-ink)] focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Slide-In Panel */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] z-50 bg-[var(--color-surface)] text-[var(--color-ink)] lg:hidden flex flex-col px-6 py-8 overflow-y-auto">
          
          <div className="pb-6 border-b border-[var(--color-line)] mb-6">
            <Link
              href="/give"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 w-full py-3 text-sm font-sans font-bold text-[var(--color-accent-ink)] bg-[var(--color-accent)] rounded-full"
            >
              <Heart size={16} className="fill-current" />
              <span>Give</span>
            </Link>
          </div>

          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl font-sans font-bold tracking-wide uppercase transition-colors ${
                    active ? "text-[var(--color-ink)] underline decoration-[var(--color-accent)] decoration-4" : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
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
