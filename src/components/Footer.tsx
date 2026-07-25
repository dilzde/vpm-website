import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy-900)] text-slate-300 border-t border-[var(--color-line-dark)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden relative flex items-center justify-center shrink-0">
                <Image
                  src="/vpm_logo.png"
                  alt="VPM Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-xl text-white">
                VPM International
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-sans">
              Voice of the Potter&apos;s Messengers. A prophetic and intercessory ministry dedicated to raising an army of believers for kingdom advancement.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-500)]">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Apostle Asriel</Link></li>
              <li><Link href="/media" className="hover:text-white transition-colors">Sermons & Media</Link></li>
              <li><Link href="/radio" className="hover:text-white transition-colors">Asriel Radio</Link></li>
              <li><Link href="/branches" className="hover:text-white transition-colors">Our Branches</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events & Conventions</Link></li>
            </ul>
          </div>

          {/* Col 3: Sanctuary Details */}
          <div className="space-y-3 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-500)]">
              Main Sanctuary
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[var(--color-gold-500)] shrink-0 mt-0.5" />
                <span>Githurai 45 Main Altar, Off Thika Superhighway, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[var(--color-gold-500)] shrink-0" />
                <a href="tel:0759265819" className="hover:text-white">0759265819</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[var(--color-gold-500)] shrink-0" />
                <a href="mailto:vpminternational2@gmail.com" className="hover:text-white truncate">vpminternational2@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Pastoral Support */}
          <div className="space-y-3 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-500)]">
              Need Prayer or Counselling?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our intercessory prayer team is available. Reach out directly for prayer requests, deliverance support, or guidance.
            </p>
            <div className="pt-2">
              <Link
                href="/prayer"
                className="inline-block px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white border border-white/20 transition-all"
              >
                Submit Prayer Request →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs font-sans text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Voice of the Potter&apos;s Messengers (VPM International). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/admin" className="hover:text-slate-300">Pastoral Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
