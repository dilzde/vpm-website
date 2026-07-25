import React from "react";

export default function PlaceholderSermon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-[var(--color-blue-100)] overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="225" fill="url(#sermon_paint0_linear)" />
        
        {/* Abstract open book motif in background */}
        <path d="M200 170 C150 170 50 130 50 130 L50 60 C50 60 150 100 200 100" fill="var(--color-blue-300)" fillOpacity="0.3" />
        <path d="M200 170 C250 170 350 130 350 130 L350 60 C350 60 250 100 200 100" fill="var(--color-blue-300)" fillOpacity="0.2" />

        {/* Play button */}
        <circle cx="200" cy="112.5" r="32" fill="var(--color-blue-700)" />
        <path d="M212 112.5 L192 125 L192 100 L212 112.5 Z" fill="var(--color-white)" />

        <defs>
          <linearGradient id="sermon_paint0_linear" x1="0" y1="0" x2="400" y2="225" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-blue-100)" />
            <stop offset="1" stopColor="var(--color-blue-300)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
