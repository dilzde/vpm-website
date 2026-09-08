"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getEvents, upsertEvent, deleteEvent, uploadEventPoster } from "@/lib/events.server";
import type { SiteEvent } from "@/lib/event-types";

export async function fetchAllEvents(): Promise<SiteEvent[]> {
  return getEvents();
}

export async function saveEvent(
  id: string | null,
  data: Omit<SiteEvent, "id">
): Promise<{ ok: true; event: SiteEvent } | { ok: false; error: string }> {
  try {
    const event = await upsertEvent(id, data);
    revalidateTag("vpm-events", "max");
    revalidatePath("/events");
    revalidatePath("/", "layout");
    return { ok: true, event };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save event" };
  }
}

export async function removeEvent(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deleteEvent(id);
    revalidateTag("vpm-events", "max");
    revalidatePath("/events");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete event" };
  }
}

export async function uploadPosterFile(
  base64: string,
  filename: string
): Promise<{ ok: true; url: string; storagePath: string } | { ok: false; error: string }> {
  try {
    const res = await uploadEventPoster(base64, filename);
    return { ok: true, ...res };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Upload failed" };
  }
}
