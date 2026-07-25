import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Prayer Support | VPM International",
  description: "Get in touch with Voice of the Potter's Messengers International. Contact our pastoral leadership via phone, WhatsApp, email, or visit our Githurai sanctuary.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold mb-4">
            Contact VPM Ministry
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            We are always rejoicing to connect with believers, intercessors, and partners across the nations. Reach out to our pastoral desk through any channel below.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-lg p-8 space-y-6">
            <h2 className="font-serif text-2xl text-[var(--color-navy-900)] font-semibold border-b border-[var(--color-line)] pb-4">
              Direct Pastoral Lines
            </h2>

            <div className="space-y-5">
              <a href="tel:0759265819" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-md bg-[var(--color-paper)] text-[var(--color-accent)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-sans text-[var(--color-slate)]">General Enquiries & Counselling</p>
                  <p className="text-base font-sans font-bold text-[var(--color-navy-900)] group-hover:text-[var(--color-accent)] transition-colors">
                    0759265819
                  </p>
                </div>
              </a>

              <a href="https://wa.me/254759265819" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-md bg-[var(--color-paper)] text-[var(--color-accent)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="text-xs font-sans text-[var(--color-slate)]">Instant WhatsApp Desk</p>
                  <p className="text-base font-sans font-bold text-[var(--color-navy-900)] group-hover:text-[var(--color-accent)] transition-colors">
                    Chat on WhatsApp
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-[var(--color-paper)] text-[var(--color-accent)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-sans text-[var(--color-slate)]">Email Desk</p>
                  <p className="text-base font-sans font-bold text-[var(--color-navy-900)]">
                    vpminternational2@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-[var(--color-paper)] text-[var(--color-accent)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-sans text-[var(--color-slate)]">Main Altar Location</p>
                  <p className="text-base font-sans font-bold text-[var(--color-navy-900)]">
                    Githurai 45, Off Thika Superhighway, Nairobi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Service Timetable (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[var(--color-line)] rounded-lg p-8">
            <h2 className="font-serif text-2xl text-[var(--color-navy-900)] font-semibold border-b border-[var(--color-line)] pb-4 mb-6">
              Gathering Hours
            </h2>

            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-start gap-3 p-3 rounded bg-[var(--color-paper)] border border-[var(--color-line)]">
                <Clock size={16} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--color-navy-900)]">Sunday Worship Service</p>
                  <p className="text-xs text-[var(--color-slate)]">9:00 AM – 1:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded bg-[var(--color-paper)] border border-[var(--color-line)]">
                <Clock size={16} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--color-navy-900)]">Wednesday Midweek Service</p>
                  <p className="text-xs text-[var(--color-slate)]">5:30 PM – 7:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded bg-[var(--color-paper)] border border-[var(--color-line)]">
                <Clock size={16} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--color-navy-900)]">Friday Intercessory Vigil</p>
                  <p className="text-xs text-[var(--color-slate)]">9:00 PM – 4:00 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
