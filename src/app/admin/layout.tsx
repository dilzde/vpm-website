"use client";

import React, { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Image, Megaphone, Layers, GitBranch, Radio, MessageCircle,
  LogOut, LayoutDashboard, ChevronRight,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Site Images", href: "/admin/images", icon: Image },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Carousels", href: "/admin/carousels", icon: Layers },
  { label: "Branches", href: "/admin/branches", icon: GitBranch },
  { label: "Live Status", href: "/admin/livestream", icon: Radio },
  { label: "Prayer Inbox", href: "/admin/prayers", icon: MessageCircle },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  // In production: check Firebase Auth + admin custom claim
  // For now, render the admin shell directly
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-sky-50">
      {/* Left nav */}
      <aside className="w-60 bg-white border-r border-line shrink-0 hidden lg:block">
        <div className="p-5 border-b border-line">
          <Link href="/admin" className="text-sm font-bold text-slate-800">
            VPM Admin
          </Link>
        </div>
        <nav className="p-2 space-y-0.5" aria-label="Admin navigation">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors ${
                  active
                    ? "bg-sky-50 text-sky-500 font-medium"
                    : "text-slate-600 hover:bg-sky-50 hover:text-slate-800"
                }`}
              >
                <item.icon size={16} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 mt-auto border-t border-line">
          <button className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:bg-sky-50 rounded-md transition-colors w-full">
            <LogOut size={16} strokeWidth={1.75} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-white border-b border-line px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-bold text-slate-800">VPM Admin</Link>
          {/* Mobile nav would go here */}
        </div>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
