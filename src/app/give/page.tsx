import React from "react";
import { Metadata } from "next";
import { Heart, Phone, Smartphone, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Support the Mission",
  description: "Support VPM International's mission through giving. M-Pesa details and information about how your giving makes an impact.",
};

export default function GivePage() {
  const mpesaNumber = process.env.NEXT_PUBLIC_MPESA_NUMBER || "0759265819";
  const tillNumber = process.env.NEXT_PUBLIC_MPESA_TILL_NUMBER;

  return (
    <div className="bg-sky-50">
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl text-slate-800">Support the Mission</h1>
          <p className="mt-4 text-base text-slate-600 max-w-prose">
            Your generosity enables us to preach the Gospel, equip believers,
            and support communities across Kenya and beyond.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* M-Pesa info */}
            <div className="space-y-4">
              <div className="bg-cloud border border-line rounded-md p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <Smartphone size={20} strokeWidth={1.75} className="text-sky-500" />
                  <h2 className="text-lg font-serif font-bold text-slate-800">Give via M-Pesa</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-sky-50 rounded-md p-4">
                    <p className="text-xs text-slate-600 mb-1">Send to number</p>
                    <p className="text-xl font-bold text-slate-800 font-mono tracking-wider">{mpesaNumber}</p>
                  </div>
                  {tillNumber && (
                    <div className="bg-sky-50 rounded-md p-4">
                      <p className="text-xs text-slate-600 mb-1">Till Number</p>
                      <p className="text-xl font-bold text-slate-800 font-mono tracking-wider">{tillNumber}</p>
                    </div>
                  )}
                  <div className="pt-2">
                    <h3 className="text-xs font-semibold text-slate-800 mb-2">How to send via M-Pesa</h3>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
                      <li>Go to M-Pesa on your phone</li>
                      <li>Select &quot;Send Money&quot;</li>
                      <li>Enter the number: <span className="font-mono font-medium">{mpesaNumber}</span></li>
                      <li>Enter the amount you wish to give</li>
                      <li>Confirm the transaction</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Why give */}
            <div className="space-y-4">
              {[
                { icon: Heart, title: "Spread the Gospel", body: "Your giving supports outreach programs, open-air crusades, and community evangelism across Kenya." },
                { icon: Phone, title: "Radio Broadcasting", body: "Help keep our radio stations on air, reaching thousands of listeners daily with teachings and worship." },
                { icon: CreditCard, title: "Conventions & Events", body: "Fund national conventions, youth revivals, and prayer conferences that transform lives." },
              ].map((item) => (
                <div key={item.title} className="bg-cloud border border-line rounded-md p-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <item.icon size={18} strokeWidth={1.75} className="text-sky-500" />
                    <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
