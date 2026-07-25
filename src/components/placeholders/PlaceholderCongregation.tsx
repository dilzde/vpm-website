import React from "react";

export default function PlaceholderCongregation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-[var(--color-mist)] overflow-hidden flex items-end justify-center ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMax slice"
      >
        <rect width="400" height="300" fill="var(--color-mist)" />
        <rect width="400" height="300" fill="url(#paint0_linear)" fillOpacity="0.4" />

        {/* Back row silhouettes */}
        <circle cx="100" cy="220" r="25" fill="var(--color-blue-100)" />
        <path d="M50 300 C50 250 150 250 150 300" fill="var(--color-blue-100)" />
        
        <circle cx="200" cy="210" r="30" fill="var(--color-blue-100)" />
        <path d="M140 300 C140 240 260 240 260 300" fill="var(--color-blue-100)" />

        <circle cx="300" cy="220" r="25" fill="var(--color-blue-100)" />
        <path d="M250 300 C250 250 350 250 350 300" fill="var(--color-blue-100)" />

        {/* Front row silhouettes */}
        <circle cx="150" cy="250" r="28" fill="var(--color-blue-300)" />
        <path d="M90 320 C90 270 210 270 210 320" fill="var(--color-blue-300)" />

        <circle cx="250" cy="250" r="28" fill="var(--color-blue-300)" />
        <path d="M190 320 C190 270 310 270 310 320" fill="var(--color-blue-300)" />

        <defs>
          <linearGradient id="paint0_linear" x1="200" y1="0" x2="200" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-blue-100)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--color-blue-300)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
