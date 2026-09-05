"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { subscribeSocialLinks, type SocialLink } from "@/lib/firestore";
import { renderSocialIcon } from "@/components/common/SocialIcons";

const COLORS: Record<string, string> = {
  website:   "from-[#0F2540] to-[#1A3A6B]",
  radio:     "from-[#7B2D8B] to-[#5B1D6B]",
  youtube:   "from-[#FF0000] to-[#CC0000]",
  tiktok:    "from-[#010101] to-[#333]",
  instagram: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
  x:         "from-[#14171A] to-[#333]",
  whatsapp:  "from-[#25D366] to-[#128C7E]",
  default:   "from-[#5B9BD5] to-[#3A7FBD]",
};

/* ─── Default links shown before Firestore loads ───────────────── */
const DEFAULT_LINKS: SocialLink[] = [
  { id: "1", label: "VPM International Website", url: "https://vpminternational.org", icon: "website", description: "Our official ministry website", active: true, order: 0 },
  { id: "2", label: "Asriel Radio Live", url: "https://asrielradio.com", icon: "radio", description: "24/7 prophetic radio stream", active: true, order: 1 },
  { id: "3", label: "YouTube Channel", url: "https://youtube.com/@vpminternational", icon: "youtube", description: "Sermons, revivals & live broadcasts", active: true, order: 2 },
  { id: "4", label: "TikTok", url: "https://tiktok.com/@vpminternational", icon: "tiktok", description: "Short prophetic clips & highlights", active: true, order: 3 },
  { id: "5", label: "Instagram", url: "https://instagram.com/vpminternational", icon: "instagram", description: "Ministry moments & announcements", active: true, order: 4 },
  { id: "6", label: "X (Twitter)", url: "https://x.com/vpminternational", icon: "x", description: "Prophetic updates & prayer points", active: true, order: 5 },
  { id: "7", label: "WhatsApp Community", url: "https://wa.me/254759265819", icon: "whatsapp", description: "Join our prayer & fellowship group", active: true, order: 6 },
];

export default function LinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const unsub = subscribeSocialLinks((data) => {
      setLinks(data.filter((l) => l.active));
    });
    return () => unsub();
  }, []);

  const displayLinks = links.length > 0 ? links : DEFAULT_LINKS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F2540] to-[#1A3A6B] flex flex-col items-center px-4 py-12">
      {/* Head tag for noindex */}
      {/* Profile */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10">
          <Image
            src="/vpm_logo.png"
            alt="VPM International"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-white font-sans text-2xl font-extrabold tracking-tight">
            VPM International
          </h1>
          <p className="text-white/60 text-sm font-sans mt-1">
            Voice of the Potter's Messengers · A Prophetic Ministry
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="w-full max-w-md space-y-3">
        {displayLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-gradient-to-r ${COLORS[link.icon] ?? COLORS.default} text-white shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-all duration-200`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              {renderSocialIcon(link.icon)}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-sans font-bold text-base leading-tight">{link.label}</p>
              {link.description && (
                <p className="text-white/70 text-xs font-sans mt-0.5 truncate">{link.description}</p>
              )}
            </div>
            <ExternalLink size={16} className="text-white/50 group-hover:text-white transition-colors shrink-0" />
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="text-white/30 text-xs font-sans mt-12 text-center">
        © {new Date().getFullYear()} Voice of the Potter's Messengers International
      </p>
    </div>
  );
}
