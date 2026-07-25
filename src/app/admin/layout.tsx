"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Image as ImageIcon, Megaphone, Layers, GitBranch, Radio, MessageCircle,
  LogOut, LayoutDashboard, Sparkles, Shield
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Site & Gallery Images", href: "/admin/images", icon: ImageIcon },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Carousels & Bands", href: "/admin/carousels", icon: Layers },
  { label: "Revival Branches", href: "/admin/branches", icon: GitBranch },
  { label: "Livestream Control", href: "/admin/livestream", icon: Radio },
  { label: "Prayer & Counselling Inbox", href: "/admin/prayers", icon: MessageCircle },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--color-mist)]">
      {/* Left nav Sidebar */}
      <aside className="w-64 bg-[var(--color-navy-950)] text-white border-r border-white/10 shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="p-2 bg-[var(--color-accent)] text-white rounded-[var(--radius-sm)]">
            <Shield size={20} strokeWidth={2.2} />
          </div>
          <div>
            <Link href="/admin" className="text-base font-display font-extrabold text-white block tracking-tight">
              VPM Ministry Admin
            </Link>
            <span className="text-[10px] font-mono text-[var(--color-accent)] uppercase tracking-widest">Pastoral Control Desk</span>
          </div>
        </div>
        <nav className="p-4 space-y-1 flex-1" aria-label="Admin navigation">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-display font-bold rounded-[var(--radius-sm)] uppercase tracking-wider transition-all duration-150 ${
                  active
                    ? "bg-[var(--color-accent)] text-white shadow-md"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={17} strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-slate-400 hover:bg-white/10 hover:text-white rounded-[var(--radius-sm)] transition-colors w-full cursor-pointer">
            <LogOut size={16} strokeWidth={2} />
            <span>Sign Out Portal</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-[var(--color-navy-950)] text-white border-b border-white/10 px-5 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[var(--color-accent)]" />
            <Link href="/admin" className="text-sm font-display font-extrabold tracking-tight text-white">VPM Ministry Admin</Link>
          </div>
          <Link href="/admin" className="text-xs font-mono font-bold text-[var(--color-accent)] uppercase">Menu</Link>
        </div>
        <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}

