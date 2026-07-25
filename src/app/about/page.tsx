import React from "react";
import { Metadata } from "next";
import { Heart, BookOpen, Globe, Users, Award, Sparkles } from "lucide-react";
import PlaceholderCongregation from "@/components/placeholders/PlaceholderCongregation";
import PlaceholderSermon from "@/components/placeholders/PlaceholderSermon";

export const metadata: Metadata = {
  title: "About Us | VPM International",
  description:
    "Learn about VPM International — Voice of the Potter's Messengers Ministry. Our mission, vision, and the journey of faith that drives us.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-mist)]">
      {/* Editorial Deep Navy Header */}
      <section className="band-navy py-20 md:py-28 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-[var(--color-accent)] text-xs font-display font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-[var(--color-accent)]" />
            Who We Are In Christ
          </p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
            About <span className="highlight-block">VPM International</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--color-accent)] font-display font-bold max-w-2xl">
            Voice of the Potter&apos;s Messengers Ministry
          </p>
        </div>
      </section>

      {/* Narrative Section: Staggered Collage & Story */}
      <section className="band-white py-20 md:py-28 border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Ministry Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <h2 className="text-3xl font-display font-extrabold text-[var(--color-ink)] mb-6 tracking-tight">
                  Our Story
                </h2>
                <p className="text-lg text-[var(--color-slate)] leading-relaxed font-sans mb-6">
                  VPM International — Voice of the Potter&apos;s Messengers
                  Ministry — was birthed from a deep burden for intercessory
                  prayer and prophetic ministry. What began as a small
                  fellowship of believers committed to seeking God&apos;s face
                  has grown into a ministry that reaches across Kenya and
                  beyond through multiple branches, media platforms, and
                  outreach programs.
                </p>
                <p className="text-base text-[var(--color-slate)] leading-relaxed font-sans">
                  VPM International was founded with a vision to spread the Prophetic word
                  and bring spiritual guidance to all who seek it. We have been a beacon of hope,
                  faith, and spiritual awakening in Kenya and beyond.
                </p>
              </div>

              {/* Vision and Mission dual boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--color-line)]">
                <div className="bg-[var(--color-cloud)] p-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] shadow-xs">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] flex items-center justify-center mb-5 shadow-xs">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-[var(--color-ink)] mb-3">Our Vision</h3>
                  <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
                    To spread the Prophetic word and bring spiritual guidance, serving as a beacon
                    of hope, faith, and spiritual awakening across Kenya and beyond.
                  </p>
                </div>

                <div className="bg-[var(--color-cloud)] p-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] shadow-xs">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-navy-900)] text-[var(--color-accent)] flex items-center justify-center mb-5 shadow-xs">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-[var(--color-ink)] mb-3">Our Mission</h3>
                  <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
                    Our mission is to deliver accurate prophetic messages, provide spiritual guidance,
                    and create a supportive community where members can grow in their faith and
                    understanding of God&apos;s plan for their lives.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Staggered Visual Showcase & Foundational Pillars (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Illustrated Staggered Frame */}
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-navy-950)] p-6 shadow-xl border border-white/10 aspect-4/3 flex flex-col justify-end group">
                <div className="absolute inset-0 opacity-85 group-hover:opacity-100 transition-opacity">
                  <PlaceholderCongregation />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/40 to-transparent" />
                <div className="relative z-10 p-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-[var(--radius-md)]">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-accent)] mb-1">Empowerment & Fellowship</p>
                  <p className="text-sm font-display font-bold text-white">United in Spirit, Truth & Apostolic Revival.</p>
                </div>
              </div>

              {/* Foundational Pillars List */}
              <div className="bg-[var(--color-cloud)] p-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] space-y-6">
                <h3 className="text-lg font-display font-extrabold text-[var(--color-ink)] uppercase tracking-wider border-b border-[var(--color-line)] pb-4">
                  Core Ministry Pillars
                </h3>
                
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
                  <div key={item.title} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-navy-900)] text-[var(--color-accent)] flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                      <item.icon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-base font-display font-bold text-[var(--color-ink)] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[var(--color-slate)] leading-relaxed font-sans">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

