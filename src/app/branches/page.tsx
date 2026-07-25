import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowUpRight, Globe, Search } from "lucide-react";
import { FOUR_BRANCHES } from "@/components/home/BranchesPreview";

export const metadata: Metadata = {
  title: "Branches & Sanctuary Locations | VPM International",
  description:
    "Find a Voice of the Potter's Messengers sanctuary near you. Worship locations across Kenya including Nairobi (Mlolongo) main church and Kisumu Headquarters.",
};

export default function BranchesPage() {
  const featuredBranch = FOUR_BRANCHES.find((b) => b.isFeatured) || FOUR_BRANCHES[0];

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Entry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-line)]">
          <div className="max-w-2xl">
            <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase block mb-2">
              GLOBAL NETWORK
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] font-extrabold mb-3 tracking-tight">
              Our Local Branches
            </h1>
            <p className="text-base text-[var(--color-slate)] font-sans leading-relaxed">
              Locate a Voice of the Potter&apos;s Messengers sanctuary near you for worship, intercessory prayer, and spiritual guidance across Kenya.
            </p>
          </div>

          <div className="w-full md:w-80 relative shrink-0">
            <input
              type="text"
              placeholder="Search by city or region..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm font-sans focus:outline-none focus:border-[var(--color-ink)] transition-colors"
            />
            <Search size={18} className="absolute left-3 top-3.5 text-[var(--color-slate)]" />
          </div>
        </div>

        {/* Featured Main Church Hero Card (No image placeholder box) */}
        <div className="bg-white border border-[var(--color-accent)] rounded-[var(--radius-image)] p-8 sm:p-10 shadow-[var(--shadow-card)] ring-1 ring-[var(--color-accent)] space-y-4">
          <span className="inline-block bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Main Sanctuary & Church
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)]">
            {featuredBranch.name}
          </h2>
          <p className="text-base font-semibold text-[var(--color-slate)] font-sans">
            {featuredBranch.location}
          </p>
          <div className="flex items-center gap-3 text-base text-[var(--color-ink)] font-sans pt-2">
            <Phone size={18} className="text-[var(--color-slate)] shrink-0" />
            <a href={`tel:${featuredBranch.phone.replace(/\s+/g, '')}`} className="font-bold hover:underline">
              {featuredBranch.phone}
            </a>
          </div>
          <div className="pt-4">
            <a
              href={featuredBranch.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-navy-900)] text-white text-sm font-sans font-bold hover:scale-105 transition-all shadow-xs"
            >
              <span>See Location</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* 4 Clean Branch Cards Grid — No Image Placeholders */}
        <div>
          <h3 className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase mb-6">
            ALL REGIONAL SANCTUARIES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_BRANCHES.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white border rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)] transition-all ${
                  branch.isFeatured ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]" : "border-[var(--color-line)]"
                }`}
              >
                <div>
                  {branch.isFeatured && (
                    <span className="inline-block bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full mb-3 tracking-wider">
                      Main Sanctuary
                    </span>
                  )}

                  <h3 className="font-sans text-xl font-extrabold text-[var(--color-ink)] mb-1 leading-snug">
                    {branch.name}
                  </h3>
                  
                  <p className="text-sm font-sans text-[var(--color-slate)] mb-6 font-medium">
                    {branch.location}
                  </p>

                  <div className="flex items-center gap-2.5 text-sm text-[var(--color-ink)] font-sans mb-6 bg-[var(--color-surface-alt)] p-3 rounded-[var(--radius-eight)] border border-[var(--color-line)]">
                    <Phone size={16} className="text-[var(--color-ink)] shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="font-bold hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-line)]">
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-sans font-bold text-[var(--color-ink)] hover:underline"
                  >
                    <span>See Location</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anchor Band */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center mb-4">
            <Globe size={22} />
          </div>
          <h3 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3">
            Can&apos;t Find a Sanctuary Near You?
          </h3>
          <p className="text-white/85 text-base max-w-xl mb-6 font-sans">
            Join our Online Campus! Listen live on Asriel Radio, watch our YouTube broadcasts, or connect with our intercessory prayer network.
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
