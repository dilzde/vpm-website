"use client";

import { useState, useEffect } from "react";
import {
  subscribeCarouselImages,
  getAllCarouselImagesForSlot,
  type CarouselSlot,
  type CarouselImage,
} from "@/lib/firestore";

/**
 * useCarouselImages — real-time hook for a given carousel slot.
 *
 * Subscribes to Firestore `onSnapshot` so the component re-renders
 * the instant an image is added, deleted, or reordered in the admin.
 *
 * @param slot  - "hero" | "gallery" | "about" | "branches" | "media"
 * @param adminMode - if true, fetches ALL images (including inactive) for admin view
 */
export function useCarouselImages(slot: CarouselSlot, adminMode = false) {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (adminMode) {
      // Admin: one-time fetch of all images (active + inactive)
      getAllCarouselImagesForSlot(slot)
        .then((imgs) => {
          setImages(imgs);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      return;
    }

    // Public: real-time listener (active images only)
    const unsubscribe = subscribeCarouselImages(slot, (imgs) => {
      setImages(imgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slot, adminMode]);

  return { images, loading, error };
}
