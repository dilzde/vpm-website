"use client";

import React, { useState } from "react";
import { Phone, ArrowUpRight, Search } from "lucide-react";
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
    <div className="space-y-16">
      {/* Search Bar */}
      <div className="w-full max-w-md relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by city or region..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] text-sm font-sans focus:outline-none focus:border-[var(--color-ink)] transition-colors"
        />
        <Search size={18} className="absolute left-3 top-3.5 text-[var(--color-slate)]" />
      </div>

      {featured && (
        <div className="bg-white border border-[var(--color-accent)] rounded-[var(--radius-image)] p-8 sm:p-10 shadow-[var(--shadow-card)] ring-1 ring-[var(--color-accent)] space-y-4">
          <span className="inline-block bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {featured.badge || "Ministry Headquarters"}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)]">
            {featured.name}
          </h2>
          <p className="text-base font-semibold text-[var(--color-slate)] font-sans">
            {featured.location}
          </p>
          <div className="flex items-center gap-3 text-base text-[var(--color-ink)] font-sans pt-2">
            <Phone size={18} className="text-[var(--color-slate)] shrink-0" />
            <a href={`tel:${featured.phone.replace(/\s+/g, "")}`} className="font-bold hover:underline">
              {featured.phone}
            </a>
          </div>
          {featured.mapsUrl && (
            <div className="pt-4">
              <a
                href={featured.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-navy-900)] text-white text-sm font-sans font-bold hover:scale-105 transition-all shadow-xs"
              >
                <span>See Location</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Branch Cards Grid */}
      <div>
        <h3 className="text-xs font-sans font-bold tracking-widest text-[var(--color-slate)] uppercase mb-6">
          ALL REGIONAL SANCTUARIES ({filtered.length})
        </h3>

        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-line">
            <p className="text-sm text-slate-500">No branches match &quot;{search}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white border rounded-[var(--radius-eight)] p-6 flex flex-col justify-between h-full shadow-[var(--shadow-card)] transition-all ${
                  branch.isFeatured ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]" : "border-[var(--color-line)]"
                }`}
              >
                <div>
                  {branch.badge && (
                    <span className={`inline-block font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full mb-3 tracking-wider ${
                      branch.isFeatured
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                        : "bg-[#1B5299]/15 text-[#1B5299] border border-[#1B5299]/30"
                    }`}>
                      {branch.badge}
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
                    <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="font-bold hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {branch.mapsUrl && (
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
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
