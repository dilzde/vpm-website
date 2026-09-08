"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { upsertImageMeta, removeImage, getImages } from "@/lib/images.server";
import { uploadBinaryFile } from "@/lib/github.server";
import type { SiteImage } from "@/lib/image-types";

export async function fetchAllImages(): Promise<SiteImage[]> {
  return getImages();
}

export async function fetchImagesBySlot(slot: SiteImage["slot"]): Promise<SiteImage[]> {
  return getImages(slot);
}

/** Upload image file to GitHub + register in images.json */
export async function uploadAndRegisterImage(
  slot: SiteImage["slot"],
  base64: string,        // pure base64, no data URL prefix
  filename: string,
  caption: string,
  order: number
): Promise<{ ok: true; image: SiteImage } | { ok: false; error: string }> {
  try {
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const ts = Date.now();
    const storagePath = `public/images/${slot}/${ts}_${safeName}`;
    const publicUrl = await uploadBinaryFile(
      storagePath,
      base64,
      `feat: upload image ${safeName} to ${slot} slot`
    );
    const image = await upsertImageMeta(null, {
      slot,
      url: publicUrl,
      storagePath,
      caption,
      order,
      active: true,
    });
    revalidateTag("vpm-images", "max");
    revalidatePath("/", "layout");
    return { ok: true, image };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Upload failed" };
  }
}

export async function updateImageMeta(
  id: string,
  data: Omit<SiteImage, "id">
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await upsertImageMeta(id, data);
    revalidateTag("vpm-images", "max");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed" };
  }
}

export async function deleteImage(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await removeImage(id);
    revalidateTag("vpm-images", "max");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}
