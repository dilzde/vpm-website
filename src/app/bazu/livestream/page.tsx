"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { Radio, Tv, Upload, Trash2, CheckCircle, Loader2, ImageIcon, RotateCcw } from "lucide-react";
import { fetchLivestreamConfig, saveLivestreamConfig, uploadLogo, deleteLogo } from "./actions";
import type { LivestreamConfig } from "@/lib/livestream-types";

export default function AdminLivestreamPage() {
  const [config, setConfig] = useState<LivestreamConfig>({
    channelALive: false,
    channelBLive: false,
    radioLogoUrl: null,
    radioLogoStoragePath: null,
    stationName: "Asriel Radio",
    nowBroadcastingTitle: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchLivestreamConfig();
      setConfig(data);
    } catch {
      setStatusMsg({ type: "error", text: "Failed to load livestream config from GitHub." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleChannelA = () => {
    const nextVal = !config.channelALive;
    setConfig((prev) => ({ ...prev, channelALive: nextVal }));
    startTransition(async () => {
      const res = await saveLivestreamConfig({ channelALive: nextVal });
      if (res.ok) {
        setStatusMsg({ type: "success", text: nextVal ? "Channel A is now LIVE!" : "Channel A is now OFF." });
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleToggleChannelB = () => {
    const nextVal = !config.channelBLive;
    setConfig((prev) => ({ ...prev, channelBLive: nextVal }));
    startTransition(async () => {
      const res = await saveLivestreamConfig({ channelBLive: nextVal });
      if (res.ok) {
        setStatusMsg({ type: "success", text: nextVal ? "Channel B is now LIVE!" : "Channel B is now OFF." });
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg(null);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const res = await uploadLogo(base64, file.name, config.radioLogoStoragePath);
        if (res.ok) {
          setConfig((prev) => ({ ...prev, radioLogoUrl: res.url, radioLogoStoragePath: res.storagePath }));
          setStatusMsg({ type: "success", text: "Radio station logo updated on GitHub!" });
        } else {
          setStatusMsg({ type: "error", text: res.error });
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to process logo file." });
      setUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    if (!confirm("Are you sure you want to remove the radio logo?")) return;
    startTransition(async () => {
      const res = await deleteLogo(config.radioLogoStoragePath);
      if (res.ok) {
        setConfig((prev) => ({ ...prev, radioLogoUrl: null, radioLogoStoragePath: null }));
        setStatusMsg({ type: "success", text: "Logo removed." });
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  const handleSaveTextConfig = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveLivestreamConfig({
        stationName: config.stationName,
        nowBroadcastingTitle: config.nowBroadcastingTitle,
      });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Station metadata updated!" });
      } else {
        setStatusMsg({ type: "error", text: res.error });
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Livestream & Broadcast Control</h1>
          <p className="text-sm text-slate-500">
            Control live status toggles and station branding across the public website and mobile players.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-md border border-line transition-colors self-start sm:self-auto"
          title="Reload from GitHub"
        >
          <RotateCcw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded-md text-sm font-medium flex items-center justify-between ${
            statusMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-xs underline ml-4">Dismiss</button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <Loader2 size={32} className="animate-spin text-sky-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Loading broadcast config from GitHub...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Toggles Card */}
          <div className="bg-white border border-line rounded-lg p-6 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-800">Broadcast Channel Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Channel A (TV / Video) */}
              <div className="p-4 rounded-lg border border-line bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.channelALive ? "bg-red-500 text-white animate-pulse" : "bg-slate-200 text-slate-600"}`}>
                    <Tv size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Channel A — Video Stream</h3>
                    <p className="text-xs text-slate-500">
                      {config.channelALive ? "Broadcasting Live to Site" : "Currently Offline"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleChannelA}
                  disabled={isPending}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    config.channelALive ? "bg-red-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      config.channelALive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Channel B (Radio / Audio) */}
              <div className="p-4 rounded-lg border border-line bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.channelBLive ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-600"}`}>
                    <Radio size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Channel B — Audio Stream</h3>
                    <p className="text-xs text-slate-500">
                      {config.channelBLive ? "Broadcasting Live to Site" : "Currently Offline"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleChannelB}
                  disabled={isPending}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    config.channelBLive ? "bg-sky-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      config.channelBLive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Radio Station Metadata */}
          <form onSubmit={handleSaveTextConfig} className="bg-white border border-line rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-800">Station Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Station Name</label>
                <input
                  type="text"
                  value={config.stationName || ""}
                  onChange={(e) => setConfig({ ...config, stationName: e.target.value })}
                  placeholder="e.g. Asriel Radio"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Now Broadcasting Title</label>
                <input
                  type="text"
                  value={config.nowBroadcastingTitle || ""}
                  onChange={(e) => setConfig({ ...config, nowBroadcastingTitle: e.target.value })}
                  placeholder="e.g. Prophetic Revelations & Morning Worship"
                  className="w-full px-3 py-2 border border-line rounded-md focus:outline-none focus:border-sky-500 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:opacity-50 transition-colors shadow-sm"
              >
                {isPending && <Loader2 size={13} className="animate-spin" />}
                Save Station Info
              </button>
            </div>
          </form>

          {/* Radio Logo Branding */}
          <div className="bg-white border border-line rounded-lg p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-800">Radio Station Logo</h2>
            <p className="text-xs text-slate-500">
              Custom logo shown in the online audio player header and media bar.
            </p>

            <div className="flex items-center gap-6 pt-2">
              {config.radioLogoUrl ? (
                <div className="flex items-center gap-4">
                  <img
                    src={config.radioLogoUrl}
                    alt="Radio Logo"
                    className="w-24 h-24 object-contain rounded-lg border border-line bg-slate-50 p-2"
                  />
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} />
                      Remove Logo
                    </button>
                    <p className="text-xs text-slate-400">Stored on GitHub CDN</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-lg border-2 border-dashed border-line flex items-center justify-center text-slate-400">
                    <ImageIcon size={28} />
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-line rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                      {uploading ? "Uploading to GitHub..." : "Upload Station Logo"}
                    </button>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, or SVG recommended</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
