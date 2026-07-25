import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | VPM International",
  description:
    "Get in touch with Voice of the Potter's Messengers. Contact our pastoral team, inquiry desk, or visit our main sanctuary in Githurai, Nairobi.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
            REACH OUT
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-4 tracking-tight">
            Contact & Pastoral Desk
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Have questions about services, branch locations, or radio broadcasts? Contact our office or visit our main altar in Githurai.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Contact Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 sm:p-8 space-y-6 shadow-[var(--shadow-card)]">
            <h2 className="font-sans text-xl font-bold text-[var(--color-ink)] border-b border-[var(--color-line)] pb-3">
              Githurai Main Sanctuary & Headquarters
            </h2>

            <div className="space-y-4 font-sans text-sm text-[var(--color-slate)]">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--color-ink)] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[var(--color-ink)]">Physical Address</p>
                  <p>Githurai 45, Off Thika Superhighway, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[var(--color-ink)] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[var(--color-ink)]">Telephone & WhatsApp</p>
                  <p>0759265819</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[var(--color-ink)] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[var(--color-ink)]">Official Email</p>
                  <p>vpminternational2@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[var(--color-ink)] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[var(--color-ink)]">Office Hours</p>
                  <p>Monday – Friday: 8:30 AM – 5:00 PM</p>
                  <p>Sunday Worship: 9:00 AM – 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-eight)] p-6 sm:p-8 space-y-4 shadow-[var(--shadow-xl)]">
            <div className="w-10 h-10 rounded-[var(--radius-eight)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center font-bold">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-sans text-xl font-bold">Direct WhatsApp Counselling</h3>
            <p className="text-xs text-white/85 font-sans leading-relaxed">
              Connect directly with our pastoral desk via WhatsApp for instant inquiries or prayer guidance.
            </p>
            <a
              href="https://wa.me/254759265819"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-sm hover:scale-105 transition-all shadow-xs"
            >
              <span>Message Pastoral Desk on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
