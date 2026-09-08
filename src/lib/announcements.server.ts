import { readJsonFile, writeJsonFile } from "./github.server";
import type { Announcement } from "./announcement-types";

const DATA_PATH = "public/data/announcements.json";

export async function getAnnouncements(activeOnly = false): Promise<Announcement[]> {
  const all = await readJsonFile<Announcement[]>(DATA_PATH, []);
  const filtered = activeOnly ? all.filter((a) => a.active) : all;
  return filtered.sort((a, b) => a.order - b.order);
}

export async function upsertAnnouncement(id: string | null, data: Omit<Announcement, "id">): Promise<Announcement> {
  const all = await readJsonFile<Announcement[]>(DATA_PATH, []);
  if (id) {
    const updated = all.map((a) => (a.id === id ? { ...a, ...data } : a));
    await writeJsonFile(DATA_PATH, updated, "chore: update announcement via admin");
    return { id, ...data };
  }
  const newItem: Announcement = { id: `ann-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...data };
  await writeJsonFile(DATA_PATH, [...all, newItem], "feat: add announcement via admin");
  return newItem;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const all = await readJsonFile<Announcement[]>(DATA_PATH, []);
  await writeJsonFile(DATA_PATH, all.filter((a) => a.id !== id), "chore: delete announcement via admin");
}
