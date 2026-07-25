import React from "react";
import { Metadata } from "next";
import { Heart, BookOpen, Globe, Users } from "lucide-react";
import PlaceholderCongregation from "@/components/placeholders/PlaceholderCongregation";

export const metadata: Metadata = {
  title: "About Us | VPM International",
  description:
    "Learn about VPM International — Voice of the Potter's Messengers Ministry. Our mission, vision, and the journey of faith that drives us.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Who We Are
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold max-w-xl mb-4">
            About VPM International
          </h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Voice of the Potter&apos;s Messengers Ministry
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose-body">
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Our Story</h2>
                <p className="text-base text-[var(--color-slate)] leading-relaxed mb-6">
                  VPM International — Voice of the Potter&apos;s Messengers
                  Ministry — was birthed from a deep burden for intercessory
                  prayer and prophetic ministry. What began as a small
                  fellowship of believers committed to seeking God&apos;s face
                  has grown into a ministry that reaches across Kenya and
                  beyond through multiple branches, media platforms, and
                  outreach programs.
                </p>
                <div className="prose prose-slate prose-lg max-w-prose">
                  <p className="text-base text-[var(--color-slate)] leading-relaxed mb-8">
                    VPM International was founded with a vision to spread the Prophetic word
                    and bring spiritual guidance to all who seek it. We have been a beacon of hope,
                    faith, and spiritual awakening in Kenya and beyond.
                  </p>
                  
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">Our Vision</h3>
                  <p className="text-base text-[var(--color-slate)] leading-relaxed mb-8">
                    To spread the Prophetic word and bring spiritual guidance, serving as a beacon
                    of hope, faith, and spiritual awakening across Kenya and beyond.
                  </p>
                  
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">Our Mission</h3>
                  <p className="text-base text-[var(--color-slate)] leading-relaxed mb-8">
                    Our mission is to deliver accurate prophetic messages, provide spiritual guidance,
                    and create a supportive community where members can grow in their faith and
                    understanding of God&apos;s plan for their lives.
                  </p>
                </div>
              </div>

              {/* Image placeholder */}
              <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] aspect-[16/9] md:aspect-video flex items-center justify-center overflow-hidden shadow-sm">
                <PlaceholderCongregation />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: Heart,
                  title: "Our Mission",
                  text: "To equip believers, raise intercessors, and spread the transforming message of the Gospel across nations.",
                },
                {
                  icon: BookOpen,
                  title: "Our Foundation",
                  text: "Rooted in prayer, the prophetic word, and the unchanging truth of Scripture.",
                },
                {
                  icon: Globe,
                  title: "Our Reach",
                  text: "Multiple branches across Kenya, online streaming to a global audience, and radio broadcasting daily.",
                },
                {
                  icon: Users,
                  title: "Our Community",
                  text: "A family of believers united in faith, supporting one another in prayer and service.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-cloud border border-line rounded-md p-5"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <item.icon size={18} strokeWidth={1.75} className="text-sky-500" />
                    <h3 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
