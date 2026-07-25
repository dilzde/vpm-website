import React from "react";
import { Metadata } from "next";
import { Download, Smartphone, Monitor, Sparkles, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Get the App | VPM International",
  description: "Install the Voice of the Potter's Messengers app on your mobile or desktop device. Available as a lightning-fast progressive web app and on mobile stores.",
};

export default function AppPage() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-20 md:py-28 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Smartphone size={16} className="text-[var(--color-accent)]" />
            Take Ministry Everywhere You Go
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Install the <span className="highlight-block">VPM Mobile App</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Carry Voice of the Potter&apos;s Messengers with you daily. Install our official digital sanctuary app for instant 1-tap access to live radio, sermon archives, and urgent prayer support.
          </p>
        </div>
      </section>

      {/* Install Options Band */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Browser PWA install card */}
            <div className="bg-[var(--color-navy-950)] text-white border border-white/15 rounded-[var(--radius-lg)] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white flex items-center justify-center shadow-lg shrink-0">
                  <Monitor size={28} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">Install Directly From Browser</h2>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Instant zero-download PWA • Compatible with Chrome, Safari & Edge</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 font-sans leading-relaxed mb-8">
                You can install this entire portal as an application directly onto your smartphone, tablet, or PC desktop without visiting an app store! Look for the <strong className="text-[var(--color-accent)]">&quot;Add to Home Screen&quot;</strong> or <strong className="text-[var(--color-accent)]">&quot;Install&quot;</strong> button in your web browser&apos;s options menu.
              </p>
              <button
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-display font-bold uppercase tracking-wider
                           bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-[var(--radius-sm)]
                           transition-all duration-200 shadow-[var(--shadow-accent)] cursor-pointer"
                id="pwa-install-btn"
              >
                <Download size={18} strokeWidth={2.5} />
                <span>Install VPM Portal To Device</span>
              </button>
            </div>

            {/* Store badges */}
            {(appStoreUrl || playStoreUrl) ? (
              <div className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] flex items-center justify-center shrink-0">
                    <Smartphone size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-extrabold text-[var(--color-ink)]">Official Mobile Store Releases</h2>
                    <p className="text-xs font-mono text-[var(--color-slate)]">Native packages for Apple iOS and Android</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--color-line)]">
                  {appStoreUrl && (
                    <a
                      href={appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-display font-bold uppercase tracking-wider bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-accent)] rounded-[var(--radius-sm)] transition-colors shadow-sm"
                    >
                      <span>Apple App Store</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {playStoreUrl && (
                    <a
                      href={playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-display font-bold uppercase tracking-wider bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-accent)] rounded-[var(--radius-sm)] transition-colors shadow-sm"
                    >
                      <span>Google Play Store</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
