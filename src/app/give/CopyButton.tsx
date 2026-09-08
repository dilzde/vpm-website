"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1B5299] hover:bg-[#154378] text-white font-sans font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all shrink-0 cursor-pointer"
    >
      {copied ? (
        <>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
