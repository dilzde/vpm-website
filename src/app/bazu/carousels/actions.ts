"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getCarouselSlides, upsertCarouselSlide, deleteCarouselSlide } from "@/lib/carousels.server";
import type { CarouselSlide } from "@/lib/carousel-types";

export async function fetchCarouselSlides(slot?: CarouselSlide["slot"]): Promise<CarouselSlide[]> {
  return getCarouselSlides(slot);
}

export async function saveCarouselSlide(
  id: string | null,
  data: Omit<CarouselSlide, "id">
): Promise<{ ok: true; slide: CarouselSlide } | { ok: false; error: string }> {
  try {
    const slide = await upsertCarouselSlide(id, data);
    revalidateTag("vpm-carousels", "max");
    revalidatePath("/", "layout");
    return { ok: true, slide };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save carousel slide" };
  }
}

export async function removeCarouselSlide(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deleteCarouselSlide(id);
    revalidateTag("vpm-carousels", "max");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete carousel slide" };
  }
}
