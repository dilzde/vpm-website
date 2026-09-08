"use client";

import { useState, useEffect } from "react";
import type { SiteImage } from "@/lib/image-types";

export type { SiteImage };

// Keep type alias for backward compatibility with existing components
export type CarouselImage = SiteImage;
export type CarouselSlot = SiteImage["slot"];

/**
 * useCarouselImages — fetches images for a given slot from GitHub-backed /api/images endpoint.
 * Replaces Firebase Firestore subscription. No real-time — polls on mount.
 */
export function useCarouselImages(slot: CarouselSlot, adminMode = false) {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/images?slot=${slot}${adminMode ? "&all=true" : ""}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SiteImage[]) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setImages([]);
        setLoading(false);
      });
  }, [slot, adminMode]);

  return { images, loading, error };
}
