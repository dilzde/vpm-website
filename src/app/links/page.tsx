"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { subscribeSocialLinks, type SocialLink } from "@/lib/firestore";
import { renderSocialIcon } from "@/components/common/SocialIcons";

const ICON_STYLES: Record<string, string> = {
  website:   "bg-[#0F2540] text-white",
  radio:     "bg-[#6B21A8] text-white",
  youtube:   "bg-[#DC2626] text-white",
  tiktok:    "bg-[#09090B] text-white",
  instagram: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
  x:         "bg-black text-white",
  whatsapp:  "bg-[#16A34A] text-white",
  default:   "bg-[#5B9BD5] text-white",
};

/* ─── Default links shown before Firestore loads ───────────────── */
const DEFAULT_LINKS: SocialLink[] = [
  { id: "1", label: "VPM International Website", url: "https://vpminternational.org", icon: "website", description: "Our official ministry website", active: true, order: 0 },
  { id: "2", label: "Asriel Radio Live", url: "https://asrielradio.com", icon: "radio", description: "24/7 prophetic radio stream", active: true, order: 1 },
  { id: "3", label: "YouTube Channel", url: "https://youtube.com/@vpminternational", icon: "youtube", description: "Sermons, revivals & live broadcasts", active: true, order: 2 },
  { id: "4", label: "TikTok", url: "https://tiktok.com/@vpminternational", icon: "tiktok", description: "Short prophetic clips & highlights", active: true, order: 3 },
  { id: "5", label: "Instagram", url: "https://instagram.com/vpminternational", icon: "instagram", description: "Ministry moments & announcements", active: true, order: 4 },
  { id: "6", label: "X (Twitter)", url: "https://x.com/vpminternational", icon: "x", description: "", active: true, order: 5 },
  { id: "7", label: "WhatsApp", url: "https://wa.me/254759265819", icon: "whatsapp", description: "Join our community", active: true, order: 6 },
];

export default function LinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const unsub = subscribeSocialLinks((data) => {
      // Ensure X has no description, and ensure WhatsApp defaults to 'Join our community'
      const sanitized = data.map((l) => {
        if (l.icon === "x") return { ...l, description: "" };
        if (l.icon === "whatsapp" && (!l.description || l.description === "Join our prayer & fellowship group")) {
          return { ...l, description: "Join our community" };
        }
        return l;
      });
      setLinks(sanitized.filter((l) => l.active));
    });
    return () => unsub();
  }, []);

  const displayLinks = links.length > 0 ? links : DEFAULT_LINKS;

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#0D1B2A] flex flex-col items-center justify-between px-4 py-12 sm:py-16">

      <div className="w-full max-w-md flex flex-col items-center">

        {/* ── Logo Container (Natural, unclipped, sitting well on cream) ── */}
        <div className="w-32 h-32 mb-2 flex items-center justify-center">
          <Image
            src="/vpm_logo.png"
            alt="VPM International"
            width={128}
            height={128}
            priority
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
        </div>

        {/* ── Title & Ministry Info ── */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#0D1B2A] tracking-tight">
            VPM International
          </h1>
          <p className="text-sm font-sans font-medium text-[#5A6F8C] mt-1">
            Voice of the Potter&apos;s Messengers Ministry
          </p>
        </div>

        {/* ── Social Links Stack ── */}
        <div className="w-full space-y-3">
          {displayLinks.map((link) => {
            const iconStyle = ICON_STYLES[link.icon] ?? ICON_STYLES.default;
            const hasDescription = Boolean(link.description && link.description.trim().length > 0);

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 w-full p-4 rounded-2xl bg-white border border-[#E8E2D6] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(15,37,64,0.08)] hover:border-[#5B9BD5] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Platform Icon Box */}
                <div
                  className={`w-11 h-11 rounded-xl ${iconStyle} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {renderSocialIcon(link.icon, 22)}
                </div>

                {/* Text (Title + Description only, no badges next to title) */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-sans font-bold text-[15px] text-[#0D1B2A] group-hover:text-[#1A3A6B] transition-colors truncate">
                    {link.label}
                  </p>
                  {hasDescription && (
                    <p className="text-[#64748B] text-xs font-sans mt-0.5 truncate">
                      {link.description}
                    </p>
                  )}
                </div>

                {/* Clean Arrow Indicator */}
                <ExternalLink
                  size={16}
                  className="text-[#94A3B8] group-hover:text-[#1A3A6B] transition-colors shrink-0"
                />
              </a>
            );
          })}
        </div>

        {/* ── Inspiring Scripture Banner ── */}
        <div className="w-full mt-8 p-4 rounded-2xl bg-white/60 border border-[#E8E2D6] text-center">
          <p className="text-xs text-[#C8861A] font-sans font-bold tracking-wider uppercase mb-1">
            Jeremiah 18:2-4
          </p>
          <p className="text-[#64748B] text-xs font-sans italic leading-relaxed">
            &ldquo;Arise, and go down to the potter&apos;s house, and there I will cause thee to hear my words.&rdquo;
          </p>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="text-center mt-10">
        <p className="text-[#94A3B8] text-xs font-sans">
          © {new Date().getFullYear()} Voice of the Potter&apos;s Messengers Ministry International
        </p>
      </div>

    </div>
  );
}
