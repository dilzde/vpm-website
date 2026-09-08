"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  getPrayerRequests,
  updatePrayerStatus,
  deletePrayerRequest,
  submitPrayerRequest,
} from "@/lib/prayer.server";
import type { PrayerRequest } from "@/lib/prayer-types";

export async function fetchAllPrayers(status?: PrayerRequest["status"]): Promise<PrayerRequest[]> {
  return getPrayerRequests(status);
}

export async function changePrayerStatus(
  id: string,
  status: PrayerRequest["status"]
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await updatePrayerStatus(id, status);
    revalidateTag("vpm-prayers", "max");
    revalidatePath("/bazu/prayers");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to update status" };
  }
}

export async function removePrayer(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deletePrayerRequest(id);
    revalidateTag("vpm-prayers", "max");
    revalidatePath("/bazu/prayers");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete prayer request" };
  }
}

export async function submitNewPrayer(
  data: Omit<PrayerRequest, "id" | "status" | "submittedAt" | "source">
): Promise<{ ok: true; prayer: PrayerRequest } | { ok: false; error: string }> {
  try {
    const prayer = await submitPrayerRequest(data);
    revalidateTag("vpm-prayers", "max");
    revalidatePath("/bazu/prayers");
    return { ok: true, prayer };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to submit prayer request" };
  }
}
