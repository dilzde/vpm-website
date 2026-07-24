import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with VPM International. Contact us via phone, email, or visit one of our branches.",
};

export default function ContactPage() {
  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Contact Us</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            We&apos;d love to hear from you. Reach out through any of the
            channels below.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info & Service Hours */}
            <div className="space-y-6">
              <div className="bg-cloud border border-line rounded-md p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Reach Us</h2>
                <div className="space-y-4">
                  <a href="tel:+254794731831" className="flex items-center gap-3 text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    <div className="p-2 rounded-md bg-sky-50"><Phone size={16} strokeWidth={1.75} className="text-sky-500" /></div>
                    +254 794 731 831
                  </a>
                  <a href="https://wa.me/254794731831" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    <div className="p-2 rounded-md bg-sky-50"><Phone size={16} strokeWidth={1.75} className="text-sky-500" /></div>
                    Chat on WhatsApp
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 rounded-md bg-sky-50"><MapPin size={16} strokeWidth={1.75} className="text-sky-500" /></div>
                    Mlolongo, Machakos, Kenya
                  </div>
                </div>
              </div>

              <div className="bg-cloud border border-line rounded-md p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Service Hours</h2>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong>Sunday:</strong> 9:00 AM - 1:00 PM</p>
                  <p><strong>Tuesday:</strong> 8:30 PM - 10:30 PM</p>
                  <p><strong>Friday:</strong> 8:30 PM - 10:00 PM</p>
                </div>
              </div>

              <div className="bg-cloud border border-line rounded-md p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Follow Us</h2>
                <div className="flex items-center gap-3">
                  {[
                    { label: "YouTube", href: "https://www.youtube.com/@AsrielTV", icon: YouTubeIcon },
                    { label: "Facebook", href: "https://www.facebook.com/vpminternational", icon: FacebookIcon },
                    { label: "Instagram", href: "https://www.instagram.com/vpminternational", icon: InstagramIcon },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-md border border-line text-slate-600 hover:bg-sky-50 hover:text-sky-500 transition-colors"
                      aria-label={s.label}>
                      <s.icon size={20} strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="bg-cloud border border-line rounded-md p-6 md:p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                <Phone size={32} strokeWidth={1.5} className="text-sky-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Need Help?</h2>
              <p className="text-slate-600 mb-8 max-w-sm">
                Start a conversation with us now. We are here to pray with you and support you.
              </p>
              
              <div className="w-full max-w-xs space-y-4">
                <a href="https://wa.me/254794731831" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-medium bg-[#25D366] text-white rounded-md hover:bg-[#20bd5a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]">
                  Message Us on WhatsApp
                </a>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-line"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-cloud px-2 text-slate-500">or</span>
                  </div>
                </div>

                <a href="tel:+254794731831" className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-medium bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
