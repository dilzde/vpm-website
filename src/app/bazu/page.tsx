import React from "react";
import Link from "next/link";
import {
  ImageIcon,
  Megaphone,
  Layers,
  GitBranch,
  Radio,
  MessageCircle,
  Calendar,
  DollarSign,
  Share2,
} from "lucide-react";

const ADMIN_MODULES = [
  { label: "Site & Gallery Images", href: "/bazu/images", icon: ImageIcon, desc: "Manage interactive gallery photos above footer & ministry banners" },
  { label: "Announcements & News", href: "/bazu/announcements", icon: Megaphone, desc: "Add, edit, and reorder convention flyers & revival notices with importance tags" },
  { label: "Events & Gatherings", href: "/bazu/events", icon: Calendar, desc: "Add revival meetings, upload posters, and set dates, venues & livestream links" },
  { label: "Giving & Payment Methods", href: "/bazu/give", icon: DollarSign, desc: "Update M-Pesa Send Money, Missionary Till, PayPal, and Sendwave details" },
  { label: "Link Directory (/links)", href: "/bazu/links", icon: Share2, desc: "Add, edit, and delete social & ministry links for the public /links page" },
  { label: "Carousels & Section Bands", href: "/bazu/carousels", icon: Layers, desc: "Manage support the mission & booking slide bands" },
  { label: "Revival Branches", href: "/bazu/branches", icon: GitBranch, desc: "Add, update addresses, and reorder church fellowship locations" },
  { label: "Livestream Control", href: "/bazu/livestream", icon: Radio, desc: "Toggle live broadcast feeds from YouTube & Asriel Radio" },
  { label: "Prayer & Counselling Inbox", href: "/bazu/prayers", icon: MessageCircle, desc: "View confidential prayer submissions & support inquiries" },
];

export default function BazuDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-3xl font-extrabold text-[var(--color-ink)]">
          Ministry Management Desk
        </h1>
        <p className="text-sm text-[var(--color-slate)] font-sans mt-1">
          Welcome to the VPM International private content desk. Select a module below to manage live site content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADMIN_MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 space-y-3 hover:border-[var(--color-ink)] hover:scale-[1.01] transition-all shadow-[var(--shadow-card)] group"
            >
              <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-surface-alt)] text-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-white flex items-center justify-center font-bold transition-colors">
                <Icon size={20} />
              </div>
              <h2 className="font-sans font-bold text-lg text-[var(--color-ink)]">
                {mod.label}
              </h2>
              <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">
                {mod.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
