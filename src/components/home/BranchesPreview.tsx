import React from "react";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

const BRANCHES_PREVIEW = [
  {
    id: "githurai-main",
    name: "Githurai Main Altar",
    region: "Nairobi / Kiambu",
    address: "Githurai 45, Off Thika Superhighway, Nairobi",
    phone: "0759265819",
    services: "Sunday 9:00 AM | Wed 5:30 PM",
    lat: -1.2066,
    lng: 36.9242,
  },
  {
    id: "nairobi-cbd",
    name: "Nairobi Central Branch",
    region: "Nairobi CBD",
    address: "Town Center Sanctuary, Nairobi",
    phone: "0759265819",
    services: "Sunday 10:00 AM | Fri 5:30 PM",
    lat: -1.2864,
    lng: 36.8172,
  },
  {
    id: "nakuru-altar",
    name: "Nakuru Revival Sanctuary",
    region: "Rift Valley",
    address: "Nakuru Town Center, Nakuru",
    phone: "0759265819",
    services: "Sunday 9:30 AM",
    lat: -0.3031,
    lng: 36.0800,
  },
];

export default function BranchesPreview() {
  return (
    <section
      className="bg-[var(--color-surface)] text-[var(--color-ink)] section-gap border-b border-[var(--color-line)]"
      id="branches-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              TERRITORIAL ALTARS
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[var(--color-ink)] font-bold">
              Our Local Branches
            </h2>
          </div>
          <Link
            href="/branches"
            className="text-sm font-sans font-semibold text-[var(--color-ink)] hover:underline transition-colors shrink-0"
          >
            View all branches →
          </Link>
        </div>

        {/* 3-Column Branch Card Grid (ROUND_EIGHT Radius, Hairline Border, Coordinate Google Maps Link §0 & §9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES_PREVIEW.map((branch) => {
            const mapsUrl = branch.lat && branch.lng 
              ? `https://www.google.com/maps?q=${branch.lat},${branch.lng}`
              : `https://maps.google.com/?q=${encodeURIComponent(branch.address)}`;

            return (
              <div
                key={branch.id}
                className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)]"
              >
                <div>
                  {/* 140px Tall Building Illustration Container */}
                  <div className="h-[140px] w-full rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] border border-[var(--color-line)] relative mb-4">
                    <PlaceholderSermon />
                  </div>

                  {/* Branch Name & Terracotta Region Tag */}
                  <h3 className="font-sans text-[18px] font-bold text-[var(--color-ink)] mb-1 leading-snug">
                    {branch.name}
                  </h3>
                  
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/30 text-xs font-sans font-bold uppercase tracking-wider mb-4">
                    {branch.region}
                  </span>

                  <div className="space-y-2 text-[14px] text-[var(--color-slate)] font-sans mb-4">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="text-[var(--color-ink)] shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={16} className="text-[var(--color-ink)] shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>

                  <p className="text-xs font-sans font-semibold text-[var(--color-ink)] bg-[var(--color-surface-alt)] p-2.5 rounded border border-[var(--color-line)]">
                    {branch.services}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-line)] mt-4">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[var(--color-ink)] hover:underline"
                  >
                    <span>View on Map</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
