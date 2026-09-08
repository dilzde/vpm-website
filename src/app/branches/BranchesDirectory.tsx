"use client";

import React, { useState } from "react";
import { Phone, ArrowUpRight, Search, MapPin, X } from "lucide-react";
import type { Branch } from "@/lib/branch-types";

export function BranchesDirectory({ branches }: { branches: Branch[] }) {
  const [search, setSearch] = useState("");

  const filtered = branches.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.region.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q)
    );
  });

  const featured = filtered.find((b) => b.isFeatured) || filtered[0] || branches[0];

  return (
    <div className="space-y-12">
      {/* Search Bar & Quick Region Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full max-w-md relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, town, or region..."
            className="w-full pl-10 pr-10 py-3.5 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm font-sans focus:outline-none focus:border-[#29A3E4] shadow-xs transition-colors"
          />
          <Search size={18} className="absolute left-3.5 top-4 text-[var(--color-slate)]" />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <span className="text-xs font-sans font-bold text-[var(--color-slate)] tracking-wider uppercase">
          Showing {filtered.length} of {branches.length} Altars
        </span>
      </div>

      {/* Featured Headquarters Hero Card */}
      {featured && (
        <div className="bg-white border-2 border-[#1B5299]/30 rounded-[var(--radius-image)] p-6 sm:p-10 shadow-md space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#29A3E4]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="inline-block bg-[#1B5299] text-white font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              {featured.badge || "Ministry Headquarters"}
            </span>
            <span className="text-xs font-mono font-bold text-[#1B5299] uppercase">
              {featured.region}
            </span>
          </div>

          <div>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-ink)] mb-2">
              {featured.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[var(--color-slate)] font-medium">
              <MapPin size={16} className="text-[#29A3E4] shrink-0" />
              <span>{featured.location}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${featured.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-line)] text-sm font-sans font-bold text-[var(--color-ink)] hover:bg-[#1B5299] hover:text-white transition-colors"
            >
              <Phone size={16} className="text-[#29A3E4]" />
              <span>Call: {featured.phone}</span>
            </a>

            {featured.mapsUrl && (
              <a
                href={featured.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-navy-900)] text-white text-sm font-sans font-bold hover:bg-[#1B5299] transition-colors shadow-xs"
              >
                <span>Google Maps Directions</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Branch Cards Grid */}
      <div>
        <h3 className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase mb-6">
          ALL REGIONAL SANCTUARIES ({filtered.length})
        </h3>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-line">
            <p className="text-base font-bold text-slate-700">No sanctuaries found matching &quot;{search}&quot;</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try searching for a different town or region.</p>
            <button
              onClick={() => setSearch("")}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              View All Sanctuaries
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white border rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)] transition-all hover:border-[#1B5299] hover:shadow-md ${
                  branch.isFeatured ? "border-[#1B5299] ring-1 ring-[#1B5299]/30" : "border-[var(--color-line)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {branch.badge ? (
                      <span className="inline-block font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#1B5299]/10 text-[#1B5299] border border-[#1B5299]/20 tracking-wider">
                        {branch.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Sanctuary Altar
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {branch.region}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-extrabold text-[var(--color-ink)] mb-1.5 leading-snug">
                    {branch.name}
                  </h3>
                  
                  <p className="text-xs font-sans text-[var(--color-slate)] mb-5 font-medium leading-relaxed">
                    {branch.location}
                  </p>

                  <div className="flex items-center gap-2.5 text-xs text-[var(--color-ink)] font-sans mb-5 bg-[var(--color-surface-alt)] p-3 rounded-[var(--radius-eight)] border border-[var(--color-line)]">
                    <Phone size={14} className="text-[#29A3E4] shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="font-bold hover:underline truncate">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--color-line)] flex items-center justify-between">
                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                    className="text-xs font-bold text-[#1B5299] hover:underline"
                  >
                    Call Altar
                  </a>

                  {branch.mapsUrl && (
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-black hover:underline"
                    >
                      <span>Directions</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
