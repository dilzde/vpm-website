import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, ExternalLink, Globe, Compass } from "lucide-react";
import PlaceholderBranch from "@/components/placeholders/PlaceholderBranch";

export const metadata: Metadata = {
  title: "Branches & Sanctuary Locations | VPM International",
  description:
    "Find a Voice of the Potter's Messengers branch near you. Worship sanctuaries and communion gatherings across Kenya with contact details and directions.",
};

const BRANCHES = [
  { id: "kisumu-hq", name: "Kisumu Headquarters", region: "Kisumu", address: "Brightlight Building, Kisumu", phone: "+254 757 871 123", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.app.goo.gl/CzAQhusk4crKfLjHA", active: true },
  { id: "nairobi", name: "Nairobi Branch", region: "Nairobi", address: "Family Bank Bldg, Mlolongo", phone: "+254 794 731 831", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.app.goo.gl/XyRajWmu3kFt8h5K9", active: true },
  { id: "kisumu-branch", name: "Kisumu Branch", region: "Kisumu", address: "Nyamasaria Sanctuary", phone: "+254 720 408 630", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.google.com/?q=-0.091702,34.767956", active: true },
  { id: "siaya", name: "Siaya Branch", region: "Siaya", address: "Central Siaya Sanctuary", phone: "+254 794 731 831", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.google.com/?q=-0.303099,36.080026", active: true },
  { id: "machakos", name: "Machakos Branch", region: "Machakos", address: "Machakos Revival Center", phone: "+254 794 731 831", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.google.com/?q=-1.517683,37.263414", active: true },
];

export default function BranchesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Globe size={15} className="text-[var(--color-accent)]" />
            Worship in God&apos;s Presence
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            Our Ministry <span className="highlight-block">Branches</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            Find a Voice of the Potter&apos;s Messengers sanctuary near you. We have vibrant communities of believers gathering across Kenya for revival and fellowship.
          </p>
        </div>
      </section>

      {/* Main Content: Branches Grid & Architectural Showcase */}
      <section className="band-white py-16 md:py-24 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Illustrated Sanctuary Architecture Showcase */}
            <div className="bg-[var(--color-navy-950)] border border-white/15 rounded-[var(--radius-lg)] p-8 flex flex-col items-center justify-between overflow-hidden shadow-2xl relative min-h-[360px] group text-center">
              <div className="w-full relative z-10 my-auto py-4">
                <PlaceholderBranch />
              </div>
              <div className="relative z-20 bg-white/5 border border-white/10 p-6 rounded-[var(--radius-md)] backdrop-blur-md w-full">
                <Compass size={24} className="text-[var(--color-accent)] mx-auto mb-2" />
                <h4 className="text-base font-display font-bold text-white mb-1">Interactive Map Integration</h4>
                <p className="text-xs text-slate-300 font-sans">Google Maps GPS navigation coordinates available on all location cards.</p>
              </div>
            </div>

            {/* Editorial Branch Directory Cards */}
            {BRANCHES.map((branch) => (
              <article
                key={branch.id}
                className="bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 hover:border-[var(--color-accent)] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                        <MapPin size={22} strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-extrabold text-[var(--color-ink)] leading-tight mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                          {branch.name}
                        </h2>
                        <span className="text-[11px] font-mono font-bold text-[var(--color-navy-900)] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[var(--color-line)]">
                          {branch.region}
                        </span>
                      </div>
                    </div>
                    {branch.mapsUrl && branch.mapsUrl !== "#" && (
                      <a
                        href={branch.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-navy-900)] hover:bg-[var(--color-navy-900)] hover:text-white transition-all shadow-xs shrink-0"
                        aria-label={`Directions to ${branch.name}`}
                      >
                        <ExternalLink size={16} strokeWidth={2.2} />
                      </a>
                    )}
                  </div>

                  <div className="space-y-4 pt-4">
                    <p className="flex items-center gap-3 text-sm font-sans font-medium text-[var(--color-slate)]">
                      <MapPin size={16} className="text-[var(--color-navy-900)] shrink-0" />
                      <span>{branch.address}</span>
                    </p>
                    <p className="flex items-center gap-3 text-sm font-sans font-medium text-[var(--color-slate)]">
                      <Phone size={16} className="text-[var(--color-navy-900)] shrink-0" />
                      <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-[var(--color-accent)] transition-colors">
                        {branch.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-sm font-sans font-medium text-[var(--color-slate)]">
                      <Mail size={16} className="text-[var(--color-navy-900)] shrink-0" />
                      <a href={`mailto:${branch.email}`} className="hover:text-[var(--color-accent)] transition-colors truncate">
                        {branch.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--color-line)]">
                  <a
                    href={branch.mapsUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-5 py-3 text-xs font-display font-bold uppercase tracking-wider bg-white text-[var(--color-navy-900)] hover:bg-[var(--color-navy-900)] hover:text-white border border-[var(--color-line)] rounded-[var(--radius-sm)] transition-all shadow-xs"
                  >
                    <span>Get Navigation Directions</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

