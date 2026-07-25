"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Radio } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Media", href: "/media" },
  { label: "Radio", href: "/radio" },
  { label: "Events", href: "/events" },
  { label: "Give", href: "/give" },
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
        "sticky top-0 z-50 w-full transition-all duration-200",
        "bg-white/95 backdrop-blur-sm border-b border-line",
        scrolled ? "py-2" : "py-4",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-[var(--color-ink)] hover:text-[var(--color-blue-500)] transition-colors"
          id="header-logo"
        >
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden">
            <Image src="/vpm_logo.png" alt="VPM International Logo" width={40} height={40} className="object-contain" priority />
          </div>
          <span
            className={[
              "font-bold transition-all duration-200",
              scrolled ? "text-lg" : "text-xl",
            ].join(" ")}
          >
            VPM International
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation" id="main-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-[var(--color-slate)] hover:text-[var(--color-blue-500)] rounded-[var(--radius-sm)] hover:bg-[var(--color-mist)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-4">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold
                         bg-[var(--color-blue-500)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-blue-700)] transition-colors
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
              id="watch-live-cta"
            >
              <Radio size={14} strokeWidth={1.75} />
              Watch Live
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-3 relative z-50 rounded-[var(--radius-sm)] text-[var(--color-slate)] hover:bg-[var(--color-mist)] transition-colors
                     focus-visible:outline-2 focus-visible:outline-[var(--color-blue-500)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-white lg:hidden overflow-y-auto">
          <nav className="flex flex-col p-6 gap-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 text-base text-[var(--color-ink)] font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--color-mist)] hover:text-[var(--color-blue-500)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-6 border-t border-[var(--color-line)]">
              <Link
                href="/media"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-4 text-base font-semibold
                           bg-[var(--color-blue-500)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--color-blue-700)] transition-colors"
              >
                <Radio size={16} strokeWidth={1.75} />
                Watch Live
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
