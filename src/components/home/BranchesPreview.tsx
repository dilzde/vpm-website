import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import PlaceholderBranch from "../placeholders/PlaceholderBranch";

// Sample branch data
const PREVIEW_BRANCHES = [
  {
    id: "kisumu-hq",
    name: "Kisumu Headquarters",
    region: "Kisumu",
    address: "Brighlight Kisumu",
    phone: "+254 757 871 123",
  },
  {
    id: "nairobi",
    name: "Nairobi Branch",
    region: "Nairobi",
    address: "Family bank, Mlolongo",
    phone: "+254 794 731 831",
  },
  {
    id: "siaya",
    name: "Siaya Branch",
    region: "Siaya",
    address: "Siaya",
    phone: "+254 794 731 831",
  },
];

export default function BranchesPreview() {
  return (
    <section className="bg-white py-16 md:py-24" id="branches-preview">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Visit Us
          </p>
          <h2 className="text-3xl text-[var(--color-ink)]">Our Branches</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Illustration */}
          <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto bg-[var(--color-cloud)] border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm relative">
            <PlaceholderBranch />
          </div>

          {/* Right: Branch List */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {PREVIEW_BRANCHES.slice(0, 3).map((branch) => (
                <Link
                  key={branch.id}
                  href="/branches"
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-[var(--color-mist)] p-5 md:p-6 rounded-[var(--radius-md)] border border-[var(--color-line)] hover:border-[var(--color-blue-300)] transition-colors shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-[var(--color-blue-500)] flex items-center justify-center shrink-0 border border-[var(--color-line)] shadow-sm">
                    <MapPin size={18} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[var(--color-ink)] group-hover:text-[var(--color-blue-500)] transition-colors mb-1">
                      {branch.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[var(--color-slate)]">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {branch.address}
                      </span>
                      <span className="hidden sm:inline text-[var(--color-line)]">•</span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} />
                        {branch.phone}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex text-[var(--color-slate)] group-hover:text-[var(--color-blue-500)] transition-colors">
                    <ArrowRight size={20} strokeWidth={2} />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/branches"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold
                           bg-transparent text-[var(--color-blue-700)] border border-[var(--color-blue-300)] rounded-[var(--radius-sm)]
                           hover:bg-[var(--color-blue-100)] transition-colors w-full sm:w-auto
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue-500)]"
              >
                See all branches
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
