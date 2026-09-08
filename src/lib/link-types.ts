/**
 * Shared SocialLink type and default links constant.
 * This file has NO server-only imports — safe to use in both client and server code.
 */

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // "website" | "radio" | "amazon" | "youtube" | "tiktok" | "instagram" | "facebook" | "x" | "whatsapp" | "default"
  description?: string;
  active: boolean;
  order: number;
}

export const DEFAULT_LINKS: SocialLink[] = [
  {
    id: "vpm-website",
    label: "VPM International Website",
    url: "https://vpminternational.org",
    icon: "website",
    description: "Our official ministry website",
    active: true,
    order: 0,
  },
  {
    id: "asriel-radio",
    label: "Asriel Radio Live",
    url: "https://asrielradio.com",
    icon: "radio",
    description: "24/7 prophetic radio stream",
    active: true,
    order: 1,
  },
  {
    id: "amazon-books",
    label: "Prophet Dr. Samo Mtishiby Books",
    url: "https://www.amazon.com/s?i=digital-text&rh=p_27%3AProphet%2BDr%2BSamo%2BMtishiby&s=relevancerank&text=Prophet+Dr+Samo+Mtishiby&ref=dp_byline_sr_ebooks_1",
    icon: "amazon",
    description: "Deep spiritual knowledge & teachings on Amazon",
    active: true,
    order: 2,
  },
  {
    id: "youtube-channel",
    label: "YouTube Channel",
    url: "https://youtube.com/@vpminternational",
    icon: "youtube",
    description: "Sermons, revivals & live broadcasts",
    active: true,
    order: 3,
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://tiktok.com/@vpminternational",
    icon: "tiktok",
    description: "Short prophetic clips & highlights",
    active: true,
    order: 4,
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://instagram.com/vpminternational",
    icon: "instagram",
    description: "Ministry moments & announcements",
    active: true,
    order: 5,
  },
  {
    id: "x-twitter",
    label: "X (Twitter)",
    url: "https://x.com/vpminternational",
    icon: "x",
    description: "",
    active: true,
    order: 6,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/254759265819",
    icon: "whatsapp",
    description: "Join our community",
    active: true,
    order: 7,
  },
];
