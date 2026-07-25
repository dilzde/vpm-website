import React from "react";

export default function PlaceholderAnnouncement({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-[var(--color-cloud)] overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="225" fill="var(--color-cloud)" />
        
        {/* Calendar / Megaphone Composition */}
        <g stroke="var(--color-blue-300)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          {/* Megaphone body */}
          <path d="M160 140 L240 160 L240 70 L160 90 Z" fill="var(--color-blue-100)" />
          {/* Megaphone mouthpiece */}
          <path d="M140 100 L160 90 L160 140 L140 130 Z" fill="var(--color-blue-300)" />
          {/* Megaphone handle */}
          <path d="M190 148 L190 170 L210 170 L210 152" />
          {/* Sound waves */}
          <path d="M260 90 C270 100 270 130 260 140" />
          <path d="M280 75 C295 95 295 135 280 155" />
        </g>
      </svg>
    </div>
  );
}
