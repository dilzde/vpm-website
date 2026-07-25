"use client";

import React, { useState } from "react";
import { Radio, Tv } from "lucide-react";

export default function AdminLivestreamPage() {
  const [channelALive, setChannelALive] = useState(false);
  const [channelBLive, setChannelBLive] = useState(false);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Live Status</h1>
      <p className="text-xs text-slate-600 mb-8 max-w-prose">
        Manually toggle the livestream status. This overrides the
        automatic YouTube live-check and immediately updates the website
        and mobile app.
      </p>

      <div className="space-y-4 max-w-lg">
        {/* Channel A */}
        <div className="bg-cloud border border-line rounded-md p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-sky-50">
                <Tv size={18} strokeWidth={1.75} className="text-sky-500" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Channel A — Asriel TV 247</h2>
                <p className="text-xs text-slate-600/70">Always-on loop channel</p>
              </div>
            </div>
            <button
              onClick={() => setChannelALive(!channelALive)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                channelALive ? "bg-live" : "bg-sky-200"
              }`}
              aria-label={channelALive ? "Set Channel A offline" : "Set Channel A live"}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  channelALive ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
          {channelALive && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-live animate-live-pulse" />
              <span className="text-xs font-semibold text-live uppercase tracking-wide">Live</span>
            </div>
          )}
        </div>

        {/* Channel B */}
        <div className="bg-cloud border border-line rounded-md p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-sky-50">
                <Radio size={18} strokeWidth={1.75} className="text-sky-500" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Channel B — Asriel TV</h2>
                <p className="text-xs text-slate-600/70">Main ministry services</p>
              </div>
            </div>
            <button
              onClick={() => setChannelBLive(!channelBLive)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                channelBLive ? "bg-live" : "bg-sky-200"
              }`}
              aria-label={channelBLive ? "Set Channel B offline" : "Set Channel B live"}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  channelBLive ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
          {channelBLive && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-live animate-live-pulse" />
              <span className="text-xs font-semibold text-live uppercase tracking-wide">Live</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
