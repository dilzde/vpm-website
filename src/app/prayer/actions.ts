"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { submitPrayerRequest } from "@/lib/prayer.server";
import type { PrayerRequest } from "@/lib/prayer-types";

export async function submitPublicPrayer(
  data: Omit<PrayerRequest, "id" | "status" | "submittedAt" | "source">
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await submitPrayerRequest(data);
    revalidateTag("vpm-prayers", "max");
    revalidatePath("/bazu/prayers");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to submit prayer request" };
  }
}
