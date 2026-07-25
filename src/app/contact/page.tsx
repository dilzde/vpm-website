import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
  title: "Contact Us | VPM International",
  description: "Get in touch with VPM International. Contact us via phone, email, or visit one of our branches.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Get In Touch
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold mb-4">Contact Us</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            We&apos;d love to hear from you. Reach out through any of the
            channels below.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact info & Service Hours */}
            <div className="space-y-6">
              <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Reach Us</h2>
                <div className="space-y-5">
                  <a href="tel:+254794731831" className="flex items-center gap-4 text-base font-medium text-[var(--color-slate)] hover:text-[var(--color-blue-500)] transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-mist)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-blue-100)] transition-colors">
                      <Phone size={20} strokeWidth={2} className="text-[var(--color-blue-500)]" />
                    </div>
                    +254 794 731 831
                  </a>
                  <a href="https://wa.me/254794731831" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-base font-medium text-[var(--color-slate)] hover:text-[var(--color-blue-500)] transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-mist)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-blue-100)] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-blue-500)]"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </div>
                    Chat on WhatsApp
                  </a>
                  <div className="flex items-center gap-4 text-base font-medium text-[var(--color-slate)]">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-mist)] flex items-center justify-center shrink-0">
                      <MapPin size={20} strokeWidth={2} className="text-[var(--color-blue-500)]" />
                    </div>
                    Mlolongo, Machakos, Kenya
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Service Hours</h2>
                <div className="space-y-4">
                  {[
                    { day: "Sunday", time: "9:00 AM - 1:00 PM" },
                    { day: "Tuesday", time: "8:30 PM - 10:30 PM" },
                    { day: "Friday", time: "8:30 PM - 10:00 PM" }
                  ].map((service) => (
                    <div key={service.day} className="flex items-center gap-4 text-base font-medium text-[var(--color-slate)]">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-mist)] flex items-center justify-center shrink-0">
                        <Clock size={18} strokeWidth={2} className="text-[var(--color-blue-500)]" />
                      </div>
                      <div>
                        <span className="font-bold text-[var(--color-ink)] mr-2">{service.day}:</span>
                        {service.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Follow Us</h2>
                <div className="flex items-center gap-4">
                  {[
                    { label: "YouTube", href: "https://www.youtube.com/@AsrielTV", icon: YouTubeIcon },
                    { label: "Facebook", href: "https://www.facebook.com/vpminternational", icon: FacebookIcon },
                    { label: "Instagram", href: "https://www.instagram.com/vpminternational", icon: InstagramIcon },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-mist)] text-[var(--color-slate)] hover:bg-[var(--color-blue-500)] hover:text-white transition-colors"
                      aria-label={s.label}>
                      <s.icon size={22} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-20 h-20 bg-[var(--color-blue-100)] rounded-full flex items-center justify-center mb-6">
                <Phone size={36} strokeWidth={2} className="text-[var(--color-blue-500)]" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--color-ink)] mb-4">Need Help?</h2>
              <p className="text-base text-[var(--color-slate)] mb-10 max-w-sm leading-relaxed">
                Start a conversation with us now. We are here to pray with you and support you.
              </p>
              
              <div className="w-full max-w-xs space-y-4">
                <a href="https://wa.me/254794731831" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-6 py-4 text-base font-bold bg-[#25D366] text-white rounded-[var(--radius-md)] hover:bg-[#20bd5a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  Message on WhatsApp
                </a>
                
                <Link href="/prayer" className="flex items-center justify-center gap-3 w-full px-6 py-4 text-base font-bold bg-[var(--color-mist)] text-[var(--color-ink)] rounded-[var(--radius-md)] hover:bg-[var(--color-blue-100)] hover:text-[var(--color-blue-700)] transition-colors shadow-sm">
                  Submit Prayer Request
                </Link>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--color-line)]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-[var(--color-slate)] uppercase tracking-widest font-semibold">or</span>
                  </div>
                </div>

                <a href="tel:+254794731831" className="flex items-center justify-center gap-3 w-full px-6 py-4 text-base font-bold bg-[var(--color-blue-500)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-blue-700)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)] shadow-sm">
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
