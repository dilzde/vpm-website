/**
 * Public /give page — Server Component.
 * Reads payment methods from GitHub via the server-side helper.
 */
import React from "react";
import { Heart, ShieldCheck, ArrowUpRight, Smartphone, Globe, Send } from "lucide-react";
import { getPaymentMethods } from "@/lib/payment-methods.server";
import { CopyButton } from "./CopyButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Give | VPM International",
  description:
    "Support the ministry of Voice of the Potter's Messengers Ministry International through M-Pesa, PayPal, Sendwave and more.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  mpesa:    <Smartphone size={22} />,
  till:     <Smartphone size={22} />,
  paypal:   <Globe size={22} />,
  sendwave: <Send size={22} />,
};

export default async function GivePage() {
  const allMethods = await getPaymentMethods();
  const methods = allMethods
    .filter((m) => m.active)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#FAF7F2] text-[#0D2545] min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FB] border border-[#D0E2F4] text-xs font-sans font-extrabold tracking-widest text-[#1B5299] uppercase mb-3">
            Kingdom Stewardship
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[#0A1D36] font-extrabold mb-4 tracking-tight">
            Financial Giving &amp; Offerings
          </h1>
          <p className="text-base sm:text-lg text-[#3E5571] font-sans leading-relaxed">
            Your generous partnership directly empowers evangelism, nationwide revival meetings, broadcast ministries, and compassionate missionary relief.
          </p>
        </div>

        {/* Payment Methods Grid */}
        {methods.length === 0 ? (
          <div className="text-center py-16 text-[#3E5571]">
            <Heart size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">Payment methods loading…</p>
            <p className="text-sm mt-1">Please check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methods.map((method) => (
              <div
                key={method.id}
                className="bg-white border-2 border-[#E5EDF6] rounded-3xl p-6 sm:p-8 space-y-5 shadow-[0_4px_20px_rgba(15,37,64,0.05)] hover:shadow-[0_8px_30px_rgba(27,82,153,0.12)] hover:border-[#1B5299]/50 transition-all duration-200"
              >
                {/* Card header */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B5299] text-white flex items-center justify-center font-bold shadow-md">
                    {ICON_MAP[method.type] ?? <Heart size={22} />}
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-extrabold text-[#0A1D36] tracking-tight">
                      {method.label}
                    </h2>
                    <p className="text-xs text-[#1B5299] font-sans font-bold capitalize mt-0.5">
                      {method.type === "till" ? "Mission & Charity Till" : method.type.replace(/-/g, " ")}
                    </p>
                  </div>
                </div>

                {/* Primary Number / Value Box */}
                <div className="p-5 rounded-2xl bg-[#F0F5FA] border border-[#D5E3F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-sans font-extrabold text-[#1B5299] uppercase tracking-wider block mb-1">
                      {method.type === "paypal"
                        ? "PayPal Account Email"
                        : method.type === "till"
                        ? "Lipa Na M-Pesa Buy Goods Till"
                        : "Send Money Number"}
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-black text-[#0A1D36] tracking-wide select-all">
                      {method.value}
                    </span>
                  </div>
                  <CopyButton value={method.value} />
                </div>

                {/* Instructions */}
                {method.instructions && (
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EDF6] text-sm text-[#3E5571] font-sans leading-relaxed">
                    {method.instructions}
                  </div>
                )}

                {/* Scripture / Mission Note */}
                {method.note && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F2540] to-[#1A3A6B] text-white border border-[#29A3E4]/30 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-bold text-[#62B4EE] uppercase tracking-wider">
                        Mission &amp; Charity Work (Orphans, Widows &amp; Vulnerable)
                      </span>
                      <a
                        href="https://www.bible.com/bible/compare/MAT.25.35-40"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#F5C451] hover:underline shrink-0"
                      >
                        <span>{method.note}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                    <p className="text-xs text-emerald-300 font-sans font-semibold">
                      This Till Number is purely dedicated for mission and charity work helping orphans, widows, and the vulnerable in society.
                    </p>
                    <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                      &ldquo;For I was hungry and you gave me food, I was thirsty and you gave me drink… as you did it to one of the least of these my brothers, you did it to me.&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stewardship Note */}
        <div className="bg-white border border-[#D5E3F0] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-[0_2px_12px_rgba(15,37,64,0.04)]">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3FB] text-[#1B5299] flex items-center justify-center shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div className="space-y-2">
            <h2 className="font-sans text-xl font-bold text-[#0A1D36]">Stewardship &amp; Integrity</h2>
            <p className="text-sm text-[#3E5571] font-sans leading-relaxed">
              Every financial offering sown into VPM International is stewarded with transparent accountability and prayer. We honor your seed and pray abundant fruitfulness in every area of your life.
            </p>
            <p className="text-xs text-[#1B5299] font-sans font-semibold italic">
              &ldquo;Bring all the tithes into the storehouse, that there may be food in My house…&rdquo; — Malachi 3:10
            </p>
          </div>
        </div>

        {/* Anchor Banner */}
        <div className="bg-gradient-to-br from-[#0F2540] via-[#1A3A6B] to-[#154378] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center shadow-xl">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
            Thank You for Partnering With VPM International
          </h2>
          <p className="text-white/85 text-base max-w-xl font-sans leading-relaxed">
            May the Lord bless, protect, and multiply your harvest according to His riches in glory.
          </p>
        </div>

      </div>
    </div>
  );
}
