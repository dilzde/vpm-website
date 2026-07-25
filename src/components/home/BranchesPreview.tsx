import React from "react";
import Link from "next/link";
import { Phone, ArrowUpRight } from "lucide-react";
import PlaceholderSermon from "../placeholders/PlaceholderSermon";

export interface BranchRecord {
  id: string;
  name: string;
  location: string;
  phone: string;
  mapsUrl: string;
  isFeatured?: boolean;
}

export const FOUR_BRANCHES: BranchRecord[] = [
  {
    id: "nairobi-mlolongo",
    name: "Nairobi Branch",
    location: "Family Bank, Mlolongo",
    phone: "+254 794 731 831",
    mapsUrl: "https://maps.app.goo.gl/XyRajWmu3kFt8h5K9",
    isFeatured: true,
  },
  {
    id: "kisumu-hq",
    name: "Kisumu Headquarters",
    location: "Brighlight, Kisumu",
    phone: "+254 757 871 123",
    mapsUrl: "https://maps.app.goo.gl/CzAQhusk4crKfLjHA",
    isFeatured: false,
  },
  {
    id: "kisumu-nyamasaria",
    name: "Kisumu Branch",
    location: "Nyamasaria",
    phone: "+254 720 408 630",
    mapsUrl: "https://maps.google.com/?q=-0.1022,34.7617",
    isFeatured: false,
  },
  {
    id: "siaya-branch",
    name: "Siaya Branch",
    location: "Siaya",
    phone: "+254 794 731 831",
    mapsUrl: "https://maps.google.com/?q=-0.0607,34.2878",
    isFeatured: false,
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
            <h2 className="font-sans text-3xl sm:text-4xl text-[var(--color-ink)] font-extrabold">
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

        {/* 4 Branch Cards Grid (§F Card Spec) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className={`bg-white border rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)] transition-all ${
                branch.isFeatured ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]" : "border-[var(--color-line)]"
              }`}
            >
              <div>
                {/* Building Illustration Container */}
                <div className="h-[130px] w-full rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] border border-[var(--color-line)] relative mb-4">
                  <PlaceholderSermon />
                  {branch.isFeatured && (
                    <span className="absolute top-2 left-2 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                      Featured Main Sanctuary
                    </span>
                  )}
                </div>

                {/* Branch Name & Location */}
                <h3 className="font-sans text-lg font-bold text-[var(--color-ink)] mb-1 leading-snug">
                  {branch.name}
                </h3>

                <p className="text-xs font-sans text-[var(--color-slate)] mb-4">
                  {branch.location}
                </p>

                {/* Phone Number (Tap to Call §F) */}
                <div className="flex items-center gap-2 text-xs font-sans text-[var(--color-ink)] mb-4">
                  <Phone size={14} className="text-[var(--color-slate)] shrink-0" />
                  <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="font-semibold hover:underline">
                    {branch.phone}
                  </a>
                </div>
              </div>

              {/* See Location Map Link (§F) */}
              <div className="pt-4 border-t border-[var(--color-line)] mt-2">
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[var(--color-ink)] hover:underline"
                >
                  <span>See Location</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
