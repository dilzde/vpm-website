import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Sermons & Media", href: "/media" },
  { label: "Radio", href: "/radio" },
  { label: "Events", href: "/events" },
  { label: "Branches", href: "/branches" },
  { label: "Support & Give", href: "/give" },
  { label: "Prayer Request", href: "/prayer" },
  { label: "Get the App", href: "/app" },
];

/* Inline SVG social icons */
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
    <footer className="bg-[var(--color-navy-900)] text-white border-t border-white/10" role="contentinfo" id="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* About blurb */}
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white/10 p-1 rounded-lg border border-white/15 shadow-sm">
                <Image src="/vpm_logo.png" alt="VPM International Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">VPM International</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-prose font-sans">
              Voice of the Potter&apos;s Messengers Ministry — a prophetic global ministry rooted in fervent prayer,
              uncompromised truth, and the transforming power of the Gospel. Called
              to equip believers, raise revivalist intercessors, and broadcast salvation
              across the nations.
            </p>
            <div className="flex items-center gap-3.5 mt-8">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/5 border border-white/10 text-slate-300
                             hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
                  aria-label={s.label}
                >
                  <s.icon size={20} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xs tracking-widest text-[var(--color-accent)] uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-bold text-xs tracking-widest text-[var(--color-accent)] uppercase mb-6">
              Connect With Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                <Phone size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span>+254 794 731 831</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                <Mail size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <a href="mailto:info@vpminternational.org" className="hover:text-[var(--color-accent-hover)] transition-colors">
                  info@vpminternational.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {year} Voice of the Potter&apos;s Messengers Ministry. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
