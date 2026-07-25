"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ImageIcon,
  Megaphone,
  Layers,
  GitBranch,
  Radio,
  MessageCircle,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/bazu", icon: LayoutDashboard },
  { label: "Site & Gallery Images", href: "/bazu/images", icon: ImageIcon },
  { label: "Announcements", href: "/bazu/announcements", icon: Megaphone },
  { label: "Carousels & Bands", href: "/bazu/carousels", icon: Layers },
  { label: "Revival Branches", href: "/bazu/branches", icon: GitBranch },
  { label: "Livestream Control", href: "/bazu/livestream", icon: Radio },
  { label: "Prayer & Counselling Inbox", href: "/bazu/prayers", icon: MessageCircle },
];

export default function BazuLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)] flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-navy-900)] text-white border-r border-[var(--color-line-dark)] shrink-0 min-h-screen p-6 justify-between">
        <div className="space-y-8">
          <div>
            <span className="text-[10px] font-mono text-[var(--color-accent)] uppercase tracking-widest block mb-1">
              VPM INTERNAL DESK
            </span>
            <Link href="/bazu" className="text-xl font-sans font-extrabold text-white block tracking-tight">
              Bazu Management
            </Link>
          </div>

          <nav className="space-y-1" aria-label="Bazu Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-eight)] text-sm font-sans font-semibold transition-all ${
                    active
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-sans font-bold text-white/70 hover:text-white transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[var(--color-navy-900)] text-white p-4 flex items-center justify-between border-b border-white/10">
        <Link href="/bazu" className="text-sm font-sans font-extrabold tracking-tight text-white">
          Bazu Management
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {sidebarOpen && (
        <div className="md:hidden bg-[var(--color-navy-900)] text-white p-6 border-b border-white/10 space-y-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-eight)] text-sm font-sans font-semibold ${
                  active ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]" : "text-white/80"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
