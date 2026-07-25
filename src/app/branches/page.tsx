import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

export const metadata: Metadata = {
  title: "Branches & Sanctuary Locations | VPM International",
  description:
    "Find a Voice of the Potter's Messengers branch near you. Worship sanctuaries and communion gatherings across Kenya with contact details and directions.",
};

const BRANCHES = [
  {
    id: "githurai-main",
    name: "Githurai Main Altar",
    region: "Nairobi / Kiambu",
    address: "Githurai 45, Off Thika Superhighway, Nairobi",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:00 AM | Wed 5:30 PM",
  },
  {
    id: "nairobi-cbd",
    name: "Nairobi Central Branch",
    region: "Nairobi CBD",
    address: "Town Center Sanctuary, Nairobi",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 10:00 AM | Fri 5:30 PM",
  },
  {
    id: "nakuru-altar",
    name: "Nakuru Revival Sanctuary",
    region: "Rift Valley",
    address: "Nakuru Town Center, Nakuru",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:30 AM",
  },
  {
    id: "kisumu-branch",
    name: "Kisumu Sanctuary",
    region: "Nyanza",
    address: "Nyamasaria Sanctuary, Kisumu",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:00 AM",
  },
  {
    id: "machakos-branch",
    name: "Machakos Branch",
    region: "Eastern",
    address: "Machakos Revival Center, Machakos",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:00 AM",
  },
];

export default function BranchesPage() {
  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-gold-500)] uppercase block mb-2">
            Territorial Altars
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold mb-4">
            Our Ministry Branches
          </h1>
          <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
            Find a Voice of the Potter&apos;s Messengers sanctuary near you. We have vibrant communities of believers gathering across Kenya for worship, prayer, and revival.
          </p>
        </div>

        {/* Clean Card Grid (Part F Rules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-white border border-[var(--color-line)] rounded-xl p-6 flex flex-col justify-between h-full shadow-xs"
            >
              <div>
                <div className="h-[140px] w-full rounded-lg overflow-hidden bg-[var(--color-cream)] border border-[var(--color-line)] relative mb-4">
                  <PlaceholderSermon />
                </div>

                <h2 className="font-sans text-[18px] font-bold text-[var(--color-ink)] mb-1 leading-snug">
                  {branch.name}
                </h2>
                
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-cream)] text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/30 text-xs font-sans font-bold uppercase tracking-wider mb-4">
                  {branch.region}
                </span>

                <div className="space-y-2.5 text-[14px] text-[var(--color-slate)] font-sans mb-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[var(--color-gold-500)] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[var(--color-gold-500)] shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-[var(--color-ink)]">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-[var(--color-gold-500)] shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-[var(--color-ink)] truncate">
                      {branch.email}
                    </a>
                  </div>
                </div>

                <p className="text-xs font-sans font-semibold text-[var(--color-navy-900)] bg-[var(--color-cream)] p-2.5 rounded border border-[var(--color-line)]">
                  {branch.services}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-line)] mt-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[var(--color-gold-700)] hover:underline"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
