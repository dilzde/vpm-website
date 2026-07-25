import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import PlaceholderBranch from "@/components/placeholders/PlaceholderBranch";

export const metadata: Metadata = {
  title: "Branches | VPM International",
  description:
    "Find a VPM International branch near you. Locations across Kenya with contact details and directions.",
};

// Sample branches
const BRANCHES = [
  { id: "kisumu-hq", name: "Kisumu Headquarters", region: "Kisumu", address: "Brighlight Kisumu", phone: "+254 757 871 123", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.app.goo.gl/CzAQhusk4crKfLjHA", active: true },
  { id: "nairobi", name: "Nairobi Branch", region: "Nairobi", address: "Family bank, Mlolongo", phone: "+254 794 731 831", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.app.goo.gl/XyRajWmu3kFt8h5K9", active: true },
  { id: "kisumu-branch", name: "Kisumu Branch", region: "Kisumu", address: "Nyamasaria", phone: "+254 720 408 630", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.google.com/?q=-0.091702,34.767956", active: true },
  { id: "siaya", name: "Siaya Branch", region: "Siaya", address: "Siaya", phone: "+254 794 731 831", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.google.com/?q=-0.303099,36.080026", active: true },
  { id: "machakos", name: "Machakos Branch", region: "Machakos", address: "Machakos", phone: "+254 794 731 831", email: "vpminternational2@gmail.com", mapsUrl: "https://maps.google.com/?q=-1.517683,37.263414", active: true },
];

export default function BranchesPage() {
  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Visit Us
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold mb-4">Our Branches</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Find a VPM International branch near you. We have communities
            of believers gathering across Kenya.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map placeholder */}
            <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] aspect-[4/3] flex flex-col items-center justify-center overflow-hidden shadow-sm md:row-span-2 lg:row-span-1 relative">
              <PlaceholderBranch />
              <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center">
                <div className="text-center text-[var(--color-slate)] p-6 bg-white border border-[var(--color-line)] rounded-[var(--radius-md)] shadow-sm">
                  <MapPin size={24} strokeWidth={2} className="mx-auto mb-2 text-[var(--color-blue-500)]" />
                  <span className="text-sm font-bold text-[var(--color-ink)]">Map view — coming soon</span>
                </div>
              </div>
            </div>

            {/* Branch cards */}
            {BRANCHES.map((branch) => (
              <article
                key={branch.id}
                className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--color-blue-300)] transition-colors shadow-sm flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-mist)] text-[var(--color-blue-500)] flex items-center justify-center shrink-0">
                      <MapPin size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[var(--color-ink)] leading-tight mb-0.5">
                        {branch.name}
                      </h2>
                      <span className="text-xs font-semibold text-[var(--color-blue-500)] uppercase tracking-wider">
                        {branch.region}
                      </span>
                    </div>
                  </div>
                  {branch.mapsUrl && branch.mapsUrl !== "#" && (
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-[var(--color-slate)] hover:bg-[var(--color-mist)] hover:text-[var(--color-blue-500)] transition-colors"
                      aria-label={`Directions to ${branch.name}`}
                    >
                      <ExternalLink size={16} strokeWidth={2} />
                    </a>
                  )}
                </div>
                <div className="space-y-3 mt-auto pt-4 border-t border-[var(--color-line)]">
                  <p className="flex items-start gap-2.5 text-sm font-medium text-[var(--color-slate)]">
                    <MapPin size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--color-blue-300)]" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-slate)]">
                    <Phone size={16} strokeWidth={2} className="shrink-0 text-[var(--color-blue-300)]" />
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-[var(--color-blue-500)] transition-colors">
                      {branch.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-slate)]">
                    <Mail size={16} strokeWidth={2} className="shrink-0 text-[var(--color-blue-300)]" />
                    <a href={`mailto:${branch.email}`} className="hover:text-[var(--color-blue-500)] transition-colors truncate">
                      {branch.email}
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
