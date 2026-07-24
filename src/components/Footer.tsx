import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Sermons & Media", href: "/media" },
  { label: "Radio", href: "/radio" },
  { label: "Events", href: "/events" },
  { label: "Branches", href: "/branches" },
  { label: "Support", href: "/give" },
  { label: "Prayer Request", href: "/prayer" },
  { label: "Get the App", href: "/app" },
];

/* Inline SVG social icons (Lucide doesn't include brand icons) */
interface IconProps { size?: number; strokeWidth?: number; className?: string; }
const YouTubeIcon = ({ size = 24, strokeWidth = 2, className = "" }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);
const FacebookIcon = ({ size = 24, strokeWidth = 2, className = "" }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ size = 24, strokeWidth = 2, className = "" }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@AsrielTV", icon: YouTubeIcon },
  { label: "Facebook", href: "https://www.facebook.com/vpminternational", icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/vpminternational", icon: InstagramIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white" role="contentinfo" id="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About blurb */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-md">
                <Image src="/vpm_logo.png" alt="VPM International Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-serif font-bold text-xl">VPM International</span>
            </div>
            <p className="text-sky-200/80 text-sm max-w-prose leading-relaxed">
              Voice of the Potter&apos;s Messengers Ministry — a ministry rooted in prayer,
              the prophetic word, and the transforming power of the Gospel. We are called
              to equip believers, raise intercessors, and spread the message of salvation
              across nations.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md bg-slate-800 text-sky-200
                             hover:bg-sky-500 hover:text-white transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-sky-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sky-200/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-sky-400 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-sky-200/80">
                <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
              <li>
                <a href="tel:+254759265819" className="flex items-center gap-2.5 text-sm text-sky-200/80 hover:text-white transition-colors">
                  <Phone size={16} strokeWidth={1.75} className="shrink-0" />
                  +254 759 265 819
                </a>
              </li>
              <li>
                <a href="mailto:info@vpminternational.org" className="flex items-center gap-2.5 text-sm text-sky-200/80 hover:text-white transition-colors">
                  <Mail size={16} strokeWidth={1.75} className="shrink-0" />
                  info@vpminternational.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/50">
          <p>&copy; {year} VPM International. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
