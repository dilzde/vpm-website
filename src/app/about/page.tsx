import React from "react";
import { Metadata } from "next";
import { Heart, BookOpen, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about VPM International — Voice of the Potter's Messengers Ministry. Our mission, vision, and the journey of faith that drives us.",
};

export default function AboutPage() {
  return (
    <div className="bg-sky-50">
      {/* Hero */}
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800 max-w-xl">
            About VPM International
          </h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Voice of the Potter&apos;s Messengers Ministry
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose-body">
                <h2 className="text-xl mb-4">Our Story</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  VPM International — Voice of the Potter&apos;s Messengers
                  Ministry — was birthed from a deep burden for intercessory
                  prayer and prophetic ministry. What began as a small
                  fellowship of believers committed to seeking God&apos;s face
                  has grown into a ministry that reaches across Kenya and
                  beyond through multiple branches, media platforms, and
                  outreach programs.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  We believe that the Lord is raising a generation of
                  worshippers, intercessors, and ministers who will carry the
                  message of salvation to the nations. Through teaching,
                  prayer, and prophetic ministry, we equip believers for
                  the work of service and the building up of the body of
                  Christ.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our ministry operates through local church gatherings,
                  radio broadcasts, online streaming, conventions, and
                  community outreach — all anchored in the Word of God and
                  the leading of the Holy Spirit.
                </p>
              </div>

              {/* Image placeholder */}
              <div className="bg-sky-100 border border-line rounded-md aspect-video flex items-center justify-center">
                <div className="text-center text-slate-600/40 p-6">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-xs font-medium">Add ministry photo here</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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
