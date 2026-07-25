import React from "react";

export default function PlaceholderBranch({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-[var(--color-cloud)] overflow-hidden flex items-end justify-center ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMax slice"
      >
        <rect width="400" height="300" fill="var(--color-cloud)" />
        
        {/* Main building structure */}
        <path d="M50 300 L50 150 L200 80 L350 150 L350 300 Z" fill="var(--color-blue-100)" />
        
        {/* Steeple / Tower */}
        <path d="M170 120 L170 30 L200 10 L230 30 L230 120 Z" fill="var(--color-blue-300)" />
        
        {/* Roof trim */}
        <path d="M40 160 L200 85 L360 160" stroke="var(--color-blue-300)" strokeWidth="6" strokeLinecap="round" />
        
        {/* Doors */}
        <path d="M175 300 L175 240 C175 220 225 220 225 240 L225 300 Z" fill="var(--color-mist)" />
        
        {/* Windows */}
        <path d="M100 220 L100 180 C100 170 120 170 120 180 L120 220 Z" fill="var(--color-mist)" />
        <path d="M280 220 L280 180 C280 170 300 170 300 180 L300 220 Z" fill="var(--color-mist)" />
      </svg>
    </div>
  );
}
