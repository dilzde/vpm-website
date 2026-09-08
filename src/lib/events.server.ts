import { readJsonFile, writeJsonFile, uploadBinaryFile, deleteGitHubFile } from "./github.server";
import type { SiteEvent } from "./event-types";

const DATA_PATH = "public/data/events.json";

export async function getEvents(activeOnly = false): Promise<SiteEvent[]> {
  const all = await readJsonFile<SiteEvent[]>(DATA_PATH, []);
  return activeOnly
    ? all.filter((e) => e.active).sort((a, b) => (a.date || "").localeCompare(b.date || ""))
    : all.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

export async function upsertEvent(id: string | null, data: Omit<SiteEvent, "id">): Promise<SiteEvent> {
  const all = await readJsonFile<SiteEvent[]>(DATA_PATH, []);
  if (id) {
    const updated = all.map((e) => (e.id === id ? { ...e, ...data } : e));
    await writeJsonFile(DATA_PATH, updated, "chore: update event via admin");
    return { id, ...data };
  }
  const newEvent: SiteEvent = { id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...data };
  await writeJsonFile(DATA_PATH, [...all, newEvent], "feat: add event via admin");
  return newEvent;
}

export async function deleteEvent(id: string): Promise<void> {
  const all = await readJsonFile<SiteEvent[]>(DATA_PATH, []);
  const ev = all.find((e) => e.id === id);
  await writeJsonFile(DATA_PATH, all.filter((e) => e.id !== id), "chore: delete event via admin");
  if (ev?.posterStoragePath) {
    try {
      await deleteGitHubFile(ev.posterStoragePath, `chore: delete poster for event ${id}`);
    } catch {
      // non-fatal
    }
  }
}

export async function uploadEventPoster(base64: string, filename: string): Promise<{ url: string; storagePath: string }> {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `public/images/events/${Date.now()}_${safeName}`;
  const url = await uploadBinaryFile(storagePath, base64, `feat: upload event poster ${safeName}`);
  return { url, storagePath };
}
