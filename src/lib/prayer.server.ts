import { readJsonFile, writeJsonFile } from "./github.server";
import type { PrayerRequest } from "./prayer-types";

const DATA_PATH = "public/data/prayer-requests.json";

export async function getPrayerRequests(status?: PrayerRequest["status"]): Promise<PrayerRequest[]> {
  const all = await readJsonFile<PrayerRequest[]>(DATA_PATH, []);
  const filtered = status ? all.filter((p) => p.status === status) : all;
  return filtered.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export async function submitPrayerRequest(
  data: Omit<PrayerRequest, "id" | "status" | "submittedAt" | "source">
): Promise<PrayerRequest> {
  const all = await readJsonFile<PrayerRequest[]>(DATA_PATH, []);
  const newReq: PrayerRequest = {
    id: `pr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...data,
    source: "web",
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  await writeJsonFile(DATA_PATH, [...all, newReq], "feat: new prayer request submitted");
  return newReq;
}

export async function updatePrayerStatus(id: string, status: PrayerRequest["status"]): Promise<void> {
  const all = await readJsonFile<PrayerRequest[]>(DATA_PATH, []);
  const updated = all.map((p) => (p.id === id ? { ...p, status } : p));
  await writeJsonFile(DATA_PATH, updated, "chore: update prayer request status via admin");
}

export async function deletePrayerRequest(id: string): Promise<void> {
  const all = await readJsonFile<PrayerRequest[]>(DATA_PATH, []);
  await writeJsonFile(DATA_PATH, all.filter((p) => p.id !== id), "chore: delete prayer request via admin");
}
