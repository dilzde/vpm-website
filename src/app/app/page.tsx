import React from "react";
import { Metadata } from "next";
import { Download, Smartphone, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Get the App",
  description: "Install the VPM International app on your device. Available as a web app and on mobile stores.",
};

export default function AppPage() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL;

  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Get the App</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Take VPM International with you everywhere. Install our app for
            quick access to sermons, radio, prayer requests, and more.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            {/* PWA install */}
            <div className="bg-cloud border border-line rounded-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-sky-50">
                  <Monitor size={20} strokeWidth={1.75} className="text-sky-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">Install from your browser</h2>
                  <p className="text-xs text-slate-600">Works on Chrome, Edge, Safari, and Firefox</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                You can install this website as an app directly from your browser.
                Look for the &quot;Install&quot; or &quot;Add to Home Screen&quot; option in your
                browser&apos;s menu.
              </p>
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                           bg-sky-500 text-white rounded-md hover:bg-sky-400 transition-colors"
                id="pwa-install-btn"
              >
                <Download size={16} strokeWidth={1.75} />
                Install App
              </button>
            </div>

            {/* Store badges — hidden until URLs are populated */}
            {(appStoreUrl || playStoreUrl) && (
              <div className="bg-cloud border border-line rounded-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-sky-50">
                    <Smartphone size={20} strokeWidth={1.75} className="text-sky-500" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">Download from App Stores</h2>
                    <p className="text-xs text-slate-600">Available on iOS and Android</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {appStoreUrl && (
                    <a
                      href={appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                                 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
                    >
                      App Store
                    </a>
                  )}
                  {playStoreUrl && (
                    <a
                      href={playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                                 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
                    >
                      Google Play
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
