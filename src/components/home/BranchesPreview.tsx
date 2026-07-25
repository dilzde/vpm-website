import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Phone, Globe } from "lucide-react";
import PlaceholderBranch from "../placeholders/PlaceholderBranch";

const PREVIEW_BRANCHES = [
  {
    id: "kisumu-hq",
    name: "Kisumu Headquarters",
    region: "Kisumu",
    address: "Brightlight Building, Kisumu",
    phone: "+254 757 871 123",
  },
  {
    id: "nairobi",
    name: "Nairobi Branch",
    region: "Nairobi",
    address: "Family Bank Bldg, Mlolongo",
    phone: "+254 794 731 831",
  },
  {
    id: "siaya",
    name: "Siaya Branch",
    region: "Siaya",
    address: "Central Siaya Sanctuary",
    phone: "+254 794 731 831",
  },
];

export default function BranchesPreview() {
  return (
    <section className="band-navy py-20 md:py-28 relative overflow-hidden" id="branches-preview">
      {/* Subtle background ambient lighting */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-[var(--color-accent)]/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 text-center sm:text-left">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-2 flex items-center justify-center sm:justify-start gap-2">
            <Globe size={15} className="text-[var(--color-accent)]" />
            Worship in God&apos;s Presence
          </p>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Our Ministry <span className="highlight-block">Branches</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Architectural Visual Frame */}
          <div className="w-full lg:w-12/23 min-h-[360px] lg:min-h-full bg-[var(--color-navy-950)] border border-white/15 rounded-[var(--radius-lg)] overflow-hidden shadow-2xl relative flex flex-col justify-end p-6 group">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlaceholderBranch />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-900)]/40 to-transparent" />
            <div className="relative z-10 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-[var(--radius-md)]">
              <p className="text-xs uppercase font-display font-bold text-[var(--color-accent)] tracking-wider mb-1">Global Sanctuary Family</p>
              <h4 className="text-lg font-display font-bold text-white">Join our dynamic revival gatherings weekly.</h4>
            </div>
          </div>

          {/* Right: Editorial Branch Directory List */}
          <div className="w-full lg:w-11/23 flex flex-col justify-between space-y-4">
            <div className="flex flex-col gap-4">
              {PREVIEW_BRANCHES.slice(0, 3).map((branch) => (
                <Link
                  key={branch.id}
                  href="/branches"
                  className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-white/5 p-6 rounded-[var(--radius-md)] border border-white/10 hover:border-[var(--color-accent)] hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                    <MapPin size={20} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-[var(--color-accent)] transition-colors mb-1.5">
                      {branch.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-300 font-sans">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        {branch.address}
                      </span>
                      <span className="hidden sm:inline text-white/20">•</span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} className="text-slate-400 shrink-0" />
                        {branch.phone}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex text-slate-400 group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all">
                    <ArrowRight size={20} strokeWidth={2.2} />
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/branches"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-display font-bold uppercase tracking-wider
                           bg-white text-[var(--color-navy-900)] hover:bg-[var(--color-accent)] hover:text-white 
                           rounded-[var(--radius-sm)] transition-all duration-200 w-full sm:w-auto shadow-md"
              >
                <span>View All Global Branches & Schedules</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
