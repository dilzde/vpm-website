import React from "react";
import { Metadata } from "next";
import { Heart, Phone, Smartphone, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Support the Mission | VPM International",
  description: "Support VPM International's mission through giving. M-Pesa details and information about how your giving makes an impact.",
};

export default function GivePage() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";
  const tillNumber = process.env.NEXT_PUBLIC_MPESA_TILL_NUMBER;

  return (
    <div className="bg-[var(--color-mist)] min-h-screen">
      <section className="bg-white border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[var(--color-blue-500)] text-sm font-semibold tracking-widest uppercase mb-2">
            Support the Mission
          </p>
          <h1 className="text-3xl text-[var(--color-ink)] font-bold mb-4">Partner with VPM</h1>
          <p className="text-base text-[var(--color-slate)] max-w-prose leading-relaxed">
            Your generosity enables us to preach the Gospel, equip believers,
            and support communities across Kenya and beyond.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* M-Pesa info */}
            <div className="space-y-6">
              <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-lg)] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-blue-100)] text-[var(--color-blue-500)] flex items-center justify-center shadow-sm">
                    <Smartphone size={20} strokeWidth={2} />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--color-ink)]">Give via M-Pesa</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-[var(--color-mist)] border border-[var(--color-line)] rounded-[var(--radius-sm)] p-5">
                    <p className="text-sm font-medium text-[var(--color-slate)] mb-1">Send to number</p>
                    <p className="text-2xl font-bold text-[var(--color-ink)] font-mono tracking-wider">{mpesaNumber}</p>
                  </div>
                  {tillNumber && (
                    <div className="bg-[var(--color-mist)] border border-[var(--color-line)] rounded-[var(--radius-sm)] p-5">
                      <p className="text-sm font-medium text-[var(--color-slate)] mb-1">Till Number</p>
                      <p className="text-2xl font-bold text-[var(--color-ink)] font-mono tracking-wider">{tillNumber}</p>
                    </div>
                  )}
                  <div className="pt-4">
                    <h3 className="text-sm font-bold text-[var(--color-ink)] mb-3 uppercase tracking-wider">How to send via M-Pesa</h3>
                    <ol className="list-decimal list-inside space-y-2.5 text-sm text-[var(--color-slate)]">
                      <li>Go to M-Pesa on your phone</li>
                      <li>Select &quot;Send Money&quot;</li>
                      <li>Enter the number: <span className="font-mono font-bold text-[var(--color-ink)]">{mpesaNumber}</span></li>
                      <li>Enter the amount you wish to give</li>
                      <li>Confirm the transaction</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Why give */}
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: Heart, title: "Spread the Gospel", body: "Your giving supports outreach programs, open-air crusades, and community evangelism across Kenya." },
                { icon: Phone, title: "Radio Broadcasting", body: "Help keep our radio stations on air, reaching thousands of listeners daily with teachings and worship." },
                { icon: CreditCard, title: "Conventions & Events", body: "Fund national conventions, youth revivals, and prayer conferences that transform lives." },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[var(--color-line)] rounded-[var(--radius-md)] p-6 md:p-8 flex items-start gap-4 shadow-sm hover:border-[var(--color-blue-300)] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-mist)] text-[var(--color-blue-500)] flex items-center justify-center shrink-0">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-ink)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--color-slate)] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
