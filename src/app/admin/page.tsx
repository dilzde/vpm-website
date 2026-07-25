import React from "react";
import { Image as ImageIcon, Megaphone, Layers, GitBranch, Radio, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const ADMIN_CARDS = [
  { label: "Site & Gallery Images", href: "/admin/images", icon: ImageIcon, desc: "Manage interactive gallery photos above footer & ministry banners" },
  { label: "Announcements & News", href: "/admin/announcements", icon: Megaphone, desc: "Add, edit, and reorder convention flyers & revival notices" },
  { label: "Carousels & Section Bands", href: "/admin/carousels", icon: Layers, desc: "Manage support the mission & booking slide bands" },
  { label: "Revival Branches", href: "/admin/branches", icon: GitBranch, desc: "Add, update addresses, and reorder church fellowship locations" },
  { label: "Livestream Control", href: "/admin/livestream", icon: Radio, desc: "Toggle live broadcast feeds from YouTube & Asriel Radio" },
  { label: "Prayer & Counselling Inbox", href: "/admin/prayers", icon: MessageCircle, desc: "View confidential prayer submissions & support inquiries" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-[var(--color-navy-950)] text-white p-8 rounded-[var(--radius-lg)] border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <Sparkles size={16} />
            Voice of the Potter&apos;s Messengers
          </p>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight mb-2">Pastoral Administration Dashboard</h1>
          <p className="text-sm font-sans text-slate-300 max-w-2xl leading-relaxed">
            Welcome to the centralized ministry control portal. Select a module below to update interactive homepage sections, audio streams, convention dates, and photo galleries in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADMIN_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--color-accent)] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white flex items-center justify-center transition-colors shadow-xs shrink-0">
                  <card.icon size={24} strokeWidth={2} />
                </div>
                <h2 className="text-lg font-display font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">{card.label}</h2>
              </div>
              <p className="text-xs font-sans text-[var(--color-slate)] leading-relaxed">{card.desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-[var(--color-line)] flex items-center justify-between text-[11px] font-mono font-bold text-[var(--color-navy-900)] group-hover:text-[var(--color-accent)] uppercase tracking-wider">
              <span>Access Module</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

