"use client";

import React, { useEffect, useState, useRef } from "react";
import { Radio, Tv, Upload, Trash2, CheckCircle, Loader2, ImageIcon } from "lucide-react";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { subscribeRadioConfig, updateRadioConfig, type RadioConfig } from "@/lib/firestore";

export default function AdminLivestreamPage() {
  const [config, setConfig] = useState<RadioConfig>({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeRadioConfig((cfg) => {
      setConfig(cfg || {});
    });
    return () => unsub();
  }, []);

  const handleToggleChannelA = async () => {
    const nextVal = !config.channelALive;
    setConfig((prev) => ({ ...prev, channelALive: nextVal }));
    await updateRadioConfig({ channelALive: nextVal });
  };

  const handleToggleChannelB = async () => {
    const nextVal = !config.channelBLive;
    setConfig((prev) => ({ ...prev, channelBLive: nextVal }));
    await updateRadioConfig({ channelBLive: nextVal });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Clean old logo from storage if it exists
      if (config.radioLogoStoragePath) {
        try {
          await deleteObject(storageRef(storage, config.radioLogoStoragePath));
        } catch {
          /* already removed */
        }
      }

      const path = `radio/logo_${Date.now()}_${file.name}`;
      const sRef = storageRef(storage, path);
      await uploadBytes(sRef, file);
      const url = await getDownloadURL(sRef);

      await updateRadioConfig({
        radioLogoUrl: url,
        radioLogoStoragePath: path,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to upload radio logo:", err);
      alert("Failed to upload image. Please verify Firebase Storage rules.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveLogo = async () => {
    if (!confirm("Remove the radio background logo?")) return;
    setSaving(true);
    try {
      if (config.radioLogoStoragePath) {
        try {
          await deleteObject(storageRef(storage, config.radioLogoStoragePath));
        } catch {
          /* already removed */
        }
      }
      await updateRadioConfig({
        radioLogoUrl: null,
        radioLogoStoragePath: null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error removing logo:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-ink)] font-sans">Livestream &amp; Radio Control</h1>
        <p className="text-sm text-[var(--color-slate)] font-sans mt-1">
          Manage live broadcast feeds and the visual branding for the Asriel Radio player on the homepage.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold animate-fade-in">
          <CheckCircle size={16} className="text-emerald-600" />
          Settings saved live to the website!
        </div>
      )}

      {/* ── Section 1: Asriel Radio Background Logo ── */}
      <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-image)] p-6 sm:p-7 shadow-[var(--shadow-card)] space-y-6">
        <div>
          <span className="text-[11px] font-sans font-bold text-[var(--color-accent)] uppercase tracking-wider block mb-1">
            Radio Visual Branding
          </span>
          <h2 className="text-lg font-bold text-[var(--color-ink)] font-sans">
            Asriel Radio Player Background Logo
          </h2>
          <p className="text-xs text-[var(--color-slate)] font-sans mt-1">
            Upload the station logo. It will appear with atmospheric opacity in the background of the live radio card right behind the play button.
          </p>
        </div>

        {/* Current Logo Preview or Empty State */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F2540] via-[#1A3A6B] to-[#0A1628] border border-[var(--color-line)] relative overflow-hidden flex flex-col items-center justify-center text-center text-white min-h-[200px]">
          {config.radioLogoUrl ? (
            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={config.radioLogoUrl}
                alt="Radio Logo Preview"
                className="w-28 h-28 object-contain drop-shadow-md rounded-lg"
              />
              <span className="text-xs text-white/80 font-mono font-medium">
                Active Radio Logo
              </span>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center gap-2 text-white/50">
              <ImageIcon size={36} />
              <p className="text-xs font-sans">No logo uploaded yet. Player shows ambient radial wave.</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-navy-900)] text-white text-xs font-bold hover:bg-[#1A3A6B] transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            <span>{uploading ? "Uploading…" : config.radioLogoUrl ? "Replace Logo" : "Upload Radio Logo"}</span>
          </button>

          {config.radioLogoUrl && (
            <button
              type="button"
              disabled={saving}
              onClick={handleRemoveLogo}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Remove Logo</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Section 2: Channel Status Toggles ── */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[var(--color-ink)] font-sans">Broadcast Channels</h2>

        {/* Channel A */}
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#EBF3FB] text-[#1B5299]">
                <Tv size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-ink)] font-sans">Channel A — Asriel TV 24/7</h3>
                <p className="text-xs text-[var(--color-slate)] font-sans">Continuous broadcast loop</p>
              </div>
            </div>
            <button
              onClick={handleToggleChannelA}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                config.channelALive ? "bg-[#1B5299]" : "bg-slate-200"
              }`}
              aria-label="Toggle Channel A"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  config.channelALive ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
          {config.channelALive && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Live Now</span>
            </div>
          )}
        </div>

        {/* Channel B */}
        <div className="bg-white border border-[var(--color-line)] rounded-[var(--radius-eight)] p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#EBF3FB] text-[#1B5299]">
                <Radio size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-ink)] font-sans">Channel B — Asriel TV</h3>
                <p className="text-xs text-[var(--color-slate)] font-sans">Main sanctuary revival service</p>
              </div>
            </div>
            <button
              onClick={handleToggleChannelB}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                config.channelBLive ? "bg-[#1B5299]" : "bg-slate-200"
              }`}
              aria-label="Toggle Channel B"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  config.channelBLive ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
          {config.channelBLive && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Live Now</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
