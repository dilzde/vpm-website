import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { getBranches } from "@/lib/branches.server";
import { BranchesDirectory } from "./BranchesDirectory";

export const metadata: Metadata = {
  title: "Branches & Sanctuary Locations | VPM International",
  description:
    "Find a Voice of the Potter's Messengers sanctuary near you. Worship locations across Kenya including Nairobi (Family Bank, Mlolongo) Ministry Headquarters and Kisumu Mother Church.",
};

export default async function BranchesPage() {
  const branches = await getBranches(true);

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
        </div>

        {/* Directory with live search */}
        <BranchesDirectory branches={branches} />

        {/* Anchor Band */}
        <div className="bg-[var(--color-anchor-olive)] text-white rounded-[var(--radius-block)] p-8 sm:p-12 text-center flex flex-col items-center shadow-[var(--shadow-xl)]">
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] flex items-center justify-center mb-4">
            <Globe size={22} />
          </div>
          <h3 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3">
            Can&apos;t Find a Sanctuary Near You?
          </h3>
          <p className="text-white/85 text-base max-w-xl mb-6 font-sans">
            Listen live on Asriel Radio, watch our YouTube broadcasts, or connect with our intercessory prayer network.
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
