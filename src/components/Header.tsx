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
          className="flex items-center gap-2.5 text-slate-800 hover:text-sky-500 transition-colors"
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
              className="px-3 py-2 text-sm text-slate-600 hover:text-sky-500 rounded-md hover:bg-sky-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium
                         bg-sky-500 text-white rounded-full hover:bg-sky-400 transition-colors
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              id="watch-live-cta"
            >
              <Radio size={14} strokeWidth={1.75} />
              Watch Live
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-3 relative z-50 rounded-md text-slate-600 hover:bg-sky-50 transition-colors
                     focus-visible:outline-2 focus-visible:outline-sky-500"
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
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-white lg:hidden overflow-y-auto">
          <nav className="flex flex-col p-6 gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base text-slate-800 font-medium rounded-md hover:bg-sky-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-line">
              <Link
                href="/media"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 text-base font-medium
                           bg-sky-500 text-white rounded-full hover:bg-sky-400 transition-colors"
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
