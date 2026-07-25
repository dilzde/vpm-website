import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

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
  title: "Contact Us & Prayer Support | VPM International",
  description: "Get in touch with Voice of the Potter's Messengers International. Contact our pastoral leadership via phone, WhatsApp, email, or visit our Mlolongo revival center.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-20 md:py-28 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--color-accent)]" />
            Connect & Fellowship With Us
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Contact <span className="highlight-block">VPM Ministry</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            We are always rejoicing to connect with believers, intercessors, and partners across the nations. Reach out to our pastoral desk through any channel below.
          </p>
        </div>
      </section>

      {/* Contact Channels & Service Timings */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Reach & Service Timetable (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <h2 className="text-2xl font-display font-extrabold text-[var(--color-ink)] mb-6 tracking-tight border-b border-[var(--color-line)] pb-4">
                  Direct Pastoral Lines
                </h2>
                <div className="space-y-6">
                  <a href="tel:+254794731831" className="flex items-center gap-5 text-base font-sans font-medium text-[var(--color-slate)] hover:text-[var(--color-accent)] transition-colors group">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <Phone size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--color-slate)] uppercase">General Enquiries & Counselling</p>
                      <p className="text-lg font-display font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">+254 794 731 831</p>
                    </div>
                  </a>
                  <a href="https://wa.me/254794731831" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-base font-sans font-medium text-[var(--color-slate)] hover:text-[var(--color-accent)] transition-colors group">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <MessageSquare size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--color-slate)] uppercase">Instant Messaging & Support</p>
                      <p className="text-lg font-display font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">Chat directly on WhatsApp</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-5 text-base font-sans font-medium text-[var(--color-slate)]">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--color-slate)] uppercase">Sanctuary Headquarters Location</p>
                      <p className="text-lg font-display font-bold text-[var(--color-ink)]">Mlolongo, Machakos, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <h2 className="text-2xl font-display font-extrabold text-[var(--color-ink)] mb-6 tracking-tight border-b border-[var(--color-line)] pb-4">
                  Weekly Sanctuary Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { day: "Sunday Worship", time: "9:00 AM - 1:00 PM", desc: "Main prophetic gathering & testimony service." },
                    { day: "Tuesday Revival", time: "8:30 PM - 10:30 PM", desc: "Online & on-site midweek doctrinal preaching." },
                    { day: "Friday Vigil", time: "8:30 PM - 10:00 PM", desc: "Introit to spiritual warfare & intercessory prayers." }
                  ].map((service) => (
                    <div key={service.day} className="bg-white p-5 rounded-[var(--radius-md)] border border-[var(--color-line)] shadow-xs">
                      <Clock size={20} className="text-[var(--color-accent)] mb-3" />
                      <h4 className="text-base font-display font-extrabold text-[var(--color-ink)] mb-1">{service.day}</h4>
                      <span className="text-[11px] font-mono font-bold bg-[var(--color-mist)] text-[var(--color-navy-900)] px-2 py-0.5 rounded block mb-2">{service.time}</span>
                      <p className="text-xs text-[var(--color-slate)] font-sans leading-relaxed">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <h2 className="text-xl font-display font-extrabold text-[var(--color-ink)] mb-4 tracking-tight">Follow Ministry Broadcasts</h2>
                <div className="flex items-center gap-4">
                  {[
                    { label: "YouTube", href: "https://www.youtube.com/@AsrielTV", icon: YouTubeIcon },
                    { label: "Facebook", href: "https://www.facebook.com/vpminternational", icon: FacebookIcon },
                    { label: "Instagram", href: "https://www.instagram.com/vpminternational", icon: InstagramIcon },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-accent)] transition-all duration-200 shadow-sm"
                      aria-label={s.label}>
                      <s.icon size={22} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Help & Prayer Action Box (5 cols) */}
            <div className="lg:col-span-5 bg-[var(--color-navy-950)] text-white border border-white/15 rounded-[var(--radius-lg)] p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden sticky top-28">
              <div className="w-20 h-20 bg-white/10 text-[var(--color-accent)] rounded-[var(--radius-lg)] flex items-center justify-center mb-6 shadow-md">
                <Phone size={36} strokeWidth={2.2} />
              </div>
              <p className="text-[11px] font-mono text-[var(--color-accent)] uppercase tracking-widest mb-2">Pastoral Care Desk</p>
              <h2 className="text-3xl font-display font-extrabold text-white mb-4 tracking-tight">Need Urgent Prayer?</h2>
              <p className="text-sm font-sans text-slate-300 mb-10 max-w-sm leading-relaxed">
                Do not carry your burdens alone. Start a conversation with our anointed intercessory leads today. We are watching and praying 24/7.
              </p>
              
              <div className="w-full max-w-xs space-y-4">
                <a href="https://wa.me/254794731831" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-6 py-4 text-xs font-display font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-[var(--radius-sm)] transition-all shadow-lg transform hover:-translate-y-0.5">
                  <MessageSquare size={18} />
                  <span>Message on WhatsApp</span>
                </a>
                
                <Link href="/prayer" className="flex items-center justify-center gap-3 w-full px-6 py-4 text-xs font-display font-bold uppercase tracking-wider bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-[var(--radius-sm)] transition-all shadow-[var(--shadow-accent)] transform hover:-translate-y-0.5">
                  <span>Submit Prayer Request</span>
                </Link>

                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[11px]">
                    <span className="bg-[var(--color-navy-950)] px-3 text-slate-400 font-mono uppercase tracking-widest">or direct call</span>
                  </div>
                </div>

                <a href="tel:+254794731831" className="flex items-center justify-center gap-3 w-full px-6 py-4 text-xs font-display font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-[var(--radius-sm)] transition-all">
                  <span>Call +254 794 731 831</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

