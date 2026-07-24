import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "lucide-react";

// Sample branch data — in production, loaded from Firestore
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
    <section className="bg-white py-16" id="branches-preview">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl text-slate-800">Our Branches</h2>
          <Link
            href="/branches"
            className="flex items-center gap-1.5 text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors"
          >
            View All
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Map placeholder */}
          <div className="bg-sky-100 border border-line rounded-md flex items-center justify-center min-h-48 md:row-span-2 lg:row-span-1">
            <div className="text-center text-slate-600/50 p-6">
              <MapPin size={32} strokeWidth={1.5} className="mx-auto mb-2" />
              <span className="text-xs font-medium">Map view — coming soon</span>
            </div>
          </div>

          {/* Branch cards */}
          {PREVIEW_BRANCHES.slice(0, 2).map((branch) => (
            <article
              key={branch.id}
              className="bg-cloud border border-line rounded-md p-5 hover:border-sky-200 transition-colors"
            >
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                {branch.name}
              </h3>
              <p className="text-xs text-sky-500 font-medium mb-3">
                {branch.region}
              </p>
              <div className="space-y-1.5">
                <p className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin size={12} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                  {branch.address}
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone size={12} strokeWidth={1.75} className="shrink-0" />
                  {branch.phone}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
