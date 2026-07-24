import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Branches",
  description:
    "Find a VPM International branch near you. Locations across Kenya with contact details and directions.",
};

// Sample branches — in production, loaded from Firestore
const BRANCHES = [
  { id: "1", name: "VPM Nairobi (Headquarters)", region: "Nairobi", address: "Nairobi, Kenya", phone: "+254 759 265 819", email: "nairobi@vpminternational.org", mapsUrl: "#", active: true },
  { id: "2", name: "VPM Mombasa", region: "Coast", address: "Mombasa, Kenya", phone: "+254 700 000 002", email: "mombasa@vpminternational.org", mapsUrl: "#", active: true },
  { id: "3", name: "VPM Kisumu", region: "Western", address: "Kisumu, Kenya", phone: "+254 700 000 003", email: "kisumu@vpminternational.org", mapsUrl: "#", active: true },
  { id: "4", name: "VPM Nakuru", region: "Rift Valley", address: "Nakuru, Kenya", phone: "+254 700 000 004", email: "nakuru@vpminternational.org", mapsUrl: "#", active: true },
  { id: "5", name: "VPM Eldoret", region: "North Rift", address: "Eldoret, Kenya", phone: "+254 700 000 005", email: "eldoret@vpminternational.org", mapsUrl: "#", active: true },
];

export default function BranchesPage() {
  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Our Branches</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Find a VPM International branch near you. We have communities
            of believers gathering across Kenya.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES.map((branch) => (
              <article
                key={branch.id}
                className="bg-cloud border border-line rounded-md p-6 hover:border-sky-200 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">
                      {branch.name}
                    </h2>
                    <span className="text-xs text-sky-500 font-medium">
                      {branch.region}
                    </span>
                  </div>
                  {branch.mapsUrl && branch.mapsUrl !== "#" && (
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-slate-600 hover:bg-sky-50 hover:text-sky-500 transition-colors"
                      aria-label={`Directions to ${branch.name}`}
                    >
                      <ExternalLink size={14} strokeWidth={1.75} />
                    </a>
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  <p className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin size={13} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                    {branch.address}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone size={13} strokeWidth={1.75} className="shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-sky-500 transition-colors">
                      {branch.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail size={13} strokeWidth={1.75} className="shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-sky-500 transition-colors">
                      {branch.email}
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
