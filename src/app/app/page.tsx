import React from "react";
import { Metadata } from "next";
import { Download, Smartphone, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Get the App | VPM International",
  description: "Install the Voice of the Potter's Messengers app on your mobile or desktop device. Available as a fast progressive web app.",
};

export default function AppPage() {
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Mobile Sanctuary Access
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold mb-4">
            Install VPM App
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans max-w-xl mx-auto leading-relaxed">
            Carry Voice of the Potter&apos;s Messengers with you daily. Install our official web application for 1-tap access to live radio, sermon archives, and prayer support.
          </p>
        </div>

        {/* PWA Card */}
        <div className="bg-white border border-[var(--color-line)] rounded-lg p-8 sm:p-10 text-left shadow-sm mb-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-[var(--color-line)] pb-6">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-paper)] text-[var(--color-accent)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
              <Monitor size={24} />
            </div>
            <div>
              <span className="text-xs font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider block">
                Progressive Web App
              </span>
              <h2 className="font-sans text-xl font-bold text-[var(--color-navy-900)]">
                Install Directly From Browser
              </h2>
            </div>
          </div>

          <p className="text-sm font-sans text-[var(--color-slate)] leading-relaxed">
            You can install this entire portal directly onto your smartphone, tablet, or desktop home screen! In your web browser&apos;s menu, select <strong className="text-[var(--color-navy-900)]">&quot;Add to Home Screen&quot;</strong> or <strong className="text-[var(--color-navy-900)]">&quot;Install App&quot;</strong>.
          </p>

          <div className="pt-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-sans font-bold text-[var(--color-navy-900)] bg-[var(--color-accent)] rounded-full hover:brightness-110 shadow-sm transition-all cursor-pointer"
            >
              <Download size={16} />
              <span>Add to Home Screen</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
