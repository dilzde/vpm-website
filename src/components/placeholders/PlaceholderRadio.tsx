import React from "react";

export default function PlaceholderRadio({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-[var(--color-blue-700)] overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="200" height="200" fill="var(--color-blue-700)" />
        
        {/* Soft concentric broadcast wave rings */}
        <circle cx="100" cy="100" r="80" stroke="var(--color-blue-500)" strokeWidth="2" strokeOpacity="0.2" />
        <circle cx="100" cy="100" r="60" stroke="var(--color-blue-500)" strokeWidth="4" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="40" stroke="var(--color-blue-500)" strokeWidth="6" strokeOpacity="0.6" />

        {/* Radio / Antenna Line Icon */}
        <rect x="65" y="85" width="70" height="45" rx="4" stroke="var(--color-white)" strokeWidth="4" />
        <circle cx="85" cy="107.5" r="10" stroke="var(--color-white)" strokeWidth="4" />
        <line x1="110" y1="100" x2="125" y2="100" stroke="var(--color-white)" strokeWidth="3" strokeLinecap="round" />
        <line x1="110" y1="110" x2="125" y2="110" stroke="var(--color-white)" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="85" x2="100" y2="55" stroke="var(--color-white)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="50" r="4" fill="var(--color-white)" />
      </svg>
    </div>
  );
}
