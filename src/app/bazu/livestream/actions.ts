"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  getLivestreamConfig,
  updateLivestreamConfig,
  uploadRadioLogo,
  removeRadioLogo,
} from "@/lib/livestream.server";
import type { LivestreamConfig } from "@/lib/livestream-types";

export async function fetchLivestreamConfig(): Promise<LivestreamConfig> {
  return getLivestreamConfig();
}

export async function saveLivestreamConfig(
  patch: Partial<LivestreamConfig>
): Promise<{ ok: true; config: LivestreamConfig } | { ok: false; error: string }> {
  try {
    const config = await updateLivestreamConfig(patch);
    revalidateTag("vpm-livestream", "max");
    revalidatePath("/radio");
    revalidatePath("/", "layout");
    return { ok: true, config };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to update livestream config" };
  }
}

export async function uploadLogo(
  base64: string,
  filename: string,
  oldStoragePath?: string | null
): Promise<{ ok: true; url: string; storagePath: string } | { ok: false; error: string }> {
  try {
    if (oldStoragePath) {
      await removeRadioLogo(oldStoragePath);
    }
    const res = await uploadRadioLogo(base64, filename);
    await updateLivestreamConfig({
      radioLogoUrl: res.url,
      radioLogoStoragePath: res.storagePath,
    });
    revalidateTag("vpm-livestream", "max");
    revalidatePath("/radio");
    return { ok: true, ...res };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to upload logo" };
  }
}

export async function deleteLogo(
  storagePath: string | null
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await removeRadioLogo(storagePath);
    await updateLivestreamConfig({
      radioLogoUrl: null,
      radioLogoStoragePath: null,
    });
    revalidateTag("vpm-livestream", "max");
    revalidatePath("/radio");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete logo" };
  }
}
