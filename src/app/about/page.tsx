import React from "react";
import { Metadata } from "next";
import { Heart, Award } from "lucide-react";
import PlaceholderCongregation from "@/components/placeholders/PlaceholderCongregation";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

export const metadata: Metadata = {
  title: "About Us | VPM International",
  description:
    "Learn about VPM International — Voice of the Potter's Messengers Ministry. Our mission, vision, and the journey of faith that drives us.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-sans font-bold tracking-widest text-[var(--color-accent)] uppercase block mb-2">
            Who We Are In Christ
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-navy-900)] font-semibold mb-4">
            About VPM International
          </h1>
          <p className="text-lg font-sans font-medium text-[var(--color-slate)]">
            Voice of the Potter&apos;s Messengers Ministry
          </p>
        </div>

        {/* Narrative & Staggered Photo Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Left: Narrative & Vision/Mission */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[var(--color-navy-900)] font-semibold mb-4">
                Our Story
              </h2>
              <p className="text-base text-[var(--color-slate)] leading-relaxed font-sans mb-4">
                VPM International — Voice of the Potter&apos;s Messengers Ministry — was birthed from a deep burden for intercessory prayer and prophetic ministry. What began as a small fellowship committed to seeking God&apos;s face has grown into a vibrant ministry reaching across Kenya and beyond through multiple branches, broadcast platforms, and community altars.
              </p>
              <p className="text-base text-[var(--color-slate)] leading-relaxed font-sans">
                Founded under God&apos;s guidance, we remain dedicated to spreading the uncompromised Word, nurturing spiritual gifts, and building believers into mature disciples operating in spiritual authority.
              </p>
            </div>

            {/* Vision and Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--color-line)]">
              <div className="bg-white p-6 rounded-lg border border-[var(--color-line)]">
                <div className="w-10 h-10 rounded-md bg-[var(--color-paper)] text-[var(--color-accent)] flex items-center justify-center mb-4 border border-[var(--color-line)]">
                  <Award size={20} />
                </div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-navy-900)] mb-2">Our Vision</h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
                  To spread the prophetic Word and bring divine guidance, serving as a beacon of faith, hope, and spiritual awakening across Kenya and the nations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[var(--color-line)]">
                <div className="w-10 h-10 rounded-md bg-[var(--color-paper)] text-[var(--color-accent)] flex items-center justify-center mb-4 border border-[var(--color-line)]">
                  <Heart size={20} />
                </div>
                <h3 className="font-sans text-lg font-bold text-[var(--color-navy-900)] mb-2">Our Mission</h3>
                <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
                  To deliver accurate prophetic truth, foster intercessory prayer altars, and build a supportive community where souls grow into spiritual maturity.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Staggered/Overlapping Photo Collage (Reference 2 Device) */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[440px]">
            <div className="w-4/5 h-4/5 rounded-lg overflow-hidden border border-[var(--color-line)] bg-white shadow-sm relative">
              <PlaceholderCongregation />
            </div>
            <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-lg overflow-hidden border border-[var(--color-line)] bg-white shadow-md z-10">
              <PlaceholderSermon />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
