import React from "react";
import { Image, Megaphone, Layers, GitBranch, Radio, MessageCircle } from "lucide-react";
import Link from "next/link";

const ADMIN_CARDS = [
  { label: "Site Images", href: "/admin/images", icon: Image, desc: "Manage all image slots across the site" },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone, desc: "Add, edit, and reorder announcements" },
  { label: "Carousels", href: "/admin/carousels", icon: Layers, desc: "Manage support & booking carousel slides" },
  { label: "Branches", href: "/admin/branches", icon: GitBranch, desc: "Add, edit, and reorder branches" },
  { label: "Live Status", href: "/admin/livestream", icon: Radio, desc: "Toggle livestream status" },
  { label: "Prayer Inbox", href: "/admin/prayers", icon: MessageCircle, desc: "View and manage prayer requests" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADMIN_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-cloud border border-line rounded-md p-5 hover:border-sky-200 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-sky-50 group-hover:bg-sky-100 transition-colors">
                <card.icon size={18} strokeWidth={1.75} className="text-sky-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-800">{card.label}</h2>
            </div>
            <p className="text-xs text-slate-600">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
