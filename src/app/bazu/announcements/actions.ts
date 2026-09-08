"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getAnnouncements, upsertAnnouncement, deleteAnnouncement } from "@/lib/announcements.server";
import type { Announcement } from "@/lib/announcement-types";

export async function fetchAllAnnouncements(): Promise<Announcement[]> {
  return getAnnouncements();
}

export async function saveAnnouncement(
  id: string | null,
  data: Omit<Announcement, "id">
): Promise<{ ok: true; announcement: Announcement } | { ok: false; error: string }> {
  try {
    const announcement = await upsertAnnouncement(id, data);
    revalidateTag("vpm-announcements", "max");
    revalidatePath("/", "layout");
    return { ok: true, announcement };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save announcement" };
  }
}

export async function removeAnnouncement(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deleteAnnouncement(id);
    revalidateTag("vpm-announcements", "max");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete announcement" };
  }
}
