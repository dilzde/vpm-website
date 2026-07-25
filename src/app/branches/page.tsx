import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight, Search, Globe } from "lucide-react";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

export const metadata: Metadata = {
  title: "Branches & Sanctuary Locations | VPM International",
  description:
    "Find a Voice of the Potter's Messengers branch near you. Worship sanctuaries across Kenya with contact details and coordinate-based directions.",
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
    lat: -1.2066,
    lng: 36.9242,
    isFeatured: true,
  },
  {
    id: "nairobi-cbd",
    name: "Nairobi Central Branch",
    region: "Nairobi CBD",
    address: "Town Center Sanctuary, Nairobi",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 10:00 AM | Fri 5:30 PM",
    lat: -1.2864,
    lng: 36.8172,
    isFeatured: false,
  },
  {
    id: "nakuru-altar",
    name: "Nakuru Revival Sanctuary",
    region: "Rift Valley",
    address: "Nakuru Town Center, Nakuru",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:30 AM",
    lat: -0.3031,
    lng: 36.0800,
    isFeatured: false,
  },
  {
    id: "kisumu-branch",
    name: "Kisumu Sanctuary",
    region: "Nyanza",
    address: "Nyamasaria Sanctuary, Kisumu",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:00 AM",
    lat: -0.1022,
    lng: 34.7617,
    isFeatured: false,
  },
  {
    id: "machakos-branch",
    name: "Machakos Branch",
    region: "Eastern",
    address: "Machakos Revival Center, Machakos",
    phone: "0759265819",
    email: "vpminternational2@gmail.com",
    services: "Sunday 9:00 AM",
    lat: -1.5177,
    lng: 37.2634,
    isFeatured: false,
  },
];

export default function BranchesPage() {
  const featuredBranch = BRANCHES.find((b) => b.isFeatured) || BRANCHES[0];

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Entry: Search & Title Header (§5 & §9) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-line)]">
          <div className="max-w-2xl">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              GLOBAL NETWORK
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-3 tracking-tight">
              Our Local Branches
            </h1>
            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              Locate a Voice of the Potter&apos;s Messengers sanctuary near you for worship, intercessory prayer, and spiritual growth across Kenya.
            </p>
          </div>

          {/* Search Box Entry Widget */}
          <div className="w-full md:w-80 relative shrink-0">
            <input
              type="text"
              placeholder="Search by city or region..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm font-sans focus:outline-none focus:border-[var(--color-ink)] transition-colors"
            />
            <Search size={18} className="absolute left-3 top-3.5 text-[var(--color-slate)]" />
          </div>
        </div>

        {/* Featured Branch Hero Card (§9) */}
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[var(--shadow-card)]">
          <div className="lg:col-span-7 h-[240px] sm:h-[300px] rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] relative border border-[var(--color-line)]">
            <PlaceholderSermon />
            <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Main Headquarters Altar
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-sans font-bold text-[var(--color-terracotta)] uppercase tracking-wider block">
              {featuredBranch.region}
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)]">
              {featuredBranch.name}
            </h2>
            <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
              Our primary altar and broadcasting sanctuary. Hosting Sunday Worship, Wednesday teachings, and continuous intercessory prayer vigils.
            </p>

            <div className="space-y-2 text-sm text-[var(--color-ink)] font-sans pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-[var(--color-slate)] shrink-0" />
                <span>{featuredBranch.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[var(--color-slate)] shrink-0" />
                <span>{featuredBranch.phone}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href={`https://www.google.com/maps?q=${featuredBranch.lat},${featuredBranch.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-navy-900)] text-white text-sm font-sans font-bold hover:scale-105 transition-all shadow-xs"
              >
                <span>View on Map</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Branch Grid (No Map Component §0 & §9) */}
        <div>
          <h3 className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase mb-6">
            ALL REGIONAL SANCTUARIES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANCHES.map((branch) => {
              const mapsUrl = `https://www.google.com/maps?q=${branch.lat},${branch.lng}`;
              return (
                <div
                  key={branch.id}
                  className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)]"
                >
                  <div>
                    <div className="h-[140px] w-full rounded-[var(--radius-eight)] overflow-hidden bg-[var(--color-surface-alt)] border border-[var(--color-line)] relative mb-4">
                      <PlaceholderSermon />
                    </div>

                    <h3 className="font-sans text-[18px] font-bold text-[var(--color-ink)] mb-1 leading-snug">
                      {branch.name}
                    </h3>
                    
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/30 text-xs font-sans font-bold uppercase tracking-wider mb-4">
                      {branch.region}
                    </span>

                    <div className="space-y-2.5 text-[14px] text-[var(--color-slate)] font-sans mb-4">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={16} className="text-[var(--color-ink)] shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone size={16} className="text-[var(--color-ink)] shrink-0" />
                        <a href={`tel:${branch.phone}`} className="hover:text-[var(--color-ink)]">
                          {branch.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail size={16} className="text-[var(--color-ink)] shrink-0" />
                        <a href={`mailto:${branch.email}`} className="hover:text-[var(--color-ink)] truncate">
                          {branch.email}
                        </a>
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

        {/* Anchor Band: Online Campus CTA (§5 & §9) */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center mb-4">
            <Globe size={22} />
          </div>
          <h3 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3">
            Can&apos;t Find a Sanctuary Near You?
          </h3>
          <p className="text-white/85 text-base max-w-xl mb-6 font-sans">
            Join our Online Campus! Listen live on Asriel Radio, watch our YouTube services, or connect with our intercessory prayer network.
          </p>
          <Link
            href="/radio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-sans font-bold text-sm hover:scale-105 transition-all shadow-md"
          >
            <span>Stream Asriel Radio Live</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
