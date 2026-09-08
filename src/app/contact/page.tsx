import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | VPM International",
  description:
    "Get in touch with Voice of the Potter's Messengers. Contact our ministry office, inquiry desk, or visit our headquarters in Nairobi or Kisumu.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-[var(--color-line)]">
          <span className="text-xs font-sans font-bold tracking-widest text-[#1B5299] uppercase block mb-2">
            CONTACT US &amp; INQUIRIES
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-3 tracking-tight">
            Contact &amp; Sanctuary Inquiries
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Have questions about services, prophetic counselling, sanctuary branches, or radio broadcasts? Reach out directly to Voice of the Potter&apos;s Messengers Ministry Office.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Headquarters & Locations (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] p-6 sm:p-8 space-y-6 shadow-[var(--shadow-card)]">
            <h2 className="font-sans text-xl font-bold text-[var(--color-ink)] border-b border-[var(--color-line)] pb-3">
              Ministry Sanctuaries &amp; Offices
            </h2>

            <div className="space-y-6 font-sans text-sm text-[var(--color-slate)]">
              {/* Nairobi HQ */}
              <div className="p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-line)] space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#1B5299] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5299] block">
                      Ministry Headquarters
                    </span>
                    <p className="font-extrabold text-[var(--color-ink)] text-base">Nairobi Altar</p>
                    <p className="text-xs text-slate-600 mt-0.5">Family Bank Tower, Mlolongo, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[var(--color-line)]">
                  <a
                    href="tel:+254794731831"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-ink)] hover:underline"
                  >
                    <Phone size={13} className="text-[#29A3E4]" />
                    <span>+254 794 731 831</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Family+Bank+Tower+Mlolongo+Nairobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5299] hover:underline ml-auto"
                  >
                    <span>Google Maps Directions</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Kisumu Mother Church */}
              <div className="p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-line)] space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#1B5299] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5299] block">
                      Mother Church
                    </span>
                    <p className="font-extrabold text-[var(--color-ink)] text-base">Kisumu Altar</p>
                    <p className="text-xs text-slate-600 mt-0.5">Brighlight, Kisumu, Kenya</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[var(--color-line)]">
                  <a
                    href="tel:+254757871123"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-ink)] hover:underline"
                  >
                    <Phone size={13} className="text-[#29A3E4]" />
                    <span>+254 757 871 123</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Kisumu+Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1B5299] hover:underline ml-auto"
                  >
                    <span>Google Maps Directions</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Office Hours & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#29A3E4] shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-[var(--color-ink)] text-xs uppercase tracking-wider">Office Hours</p>
                    <p className="text-xs text-slate-600 mt-0.5">Mon – Fri: 8:30 AM – 5:00 PM</p>
                    <p className="text-xs text-slate-600">Sunday Service: 8:30 AM – 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#29A3E4] shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-[var(--color-ink)] text-xs uppercase tracking-wider">Email Inquiry</p>
                    <a href="mailto:vpminternational2@gmail.com" className="text-xs text-slate-600 hover:underline">
                      vpminternational2@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Inquiries & Ministry Care (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-image)] p-6 sm:p-8 space-y-4 shadow-[var(--shadow-xl)]">
              <div className="w-11 h-11 rounded-full bg-[#29A3E4] text-white flex items-center justify-center font-bold">
                <MessageCircle size={22} />
              </div>
              <h3 className="font-sans text-xl font-bold text-white">Direct WhatsApp Inquiries</h3>
              <p className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed">
                Need spiritual guidance, ministry inquiries, or have personal matters to discuss? Message our ministry team directly on WhatsApp.
              </p>
              <a
                href="https://wa.me/254759265819"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white text-[#0B0F17] hover:bg-[#FAF7F2] font-sans font-bold text-sm hover:scale-[1.02] transition-all shadow-md"
              >
                <span>Message on WhatsApp</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--color-ink)] font-bold text-sm">
                <ShieldCheck size={18} className="text-[#1B5299]" />
                <span>Confidential Ministry Care</span>
              </div>
              <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                All inquiries and counseling appointments are kept in strict confidentiality under the leadership of Prophet Dr. Samo Mtishiby.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
