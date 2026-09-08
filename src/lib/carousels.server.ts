import { readJsonFile, writeJsonFile } from "./github.server";
import type { CarouselSlide } from "./carousel-types";

const DATA_PATH = "public/data/carousels.json";

export async function getCarouselSlides(slot?: CarouselSlide["slot"], activeOnly = false): Promise<CarouselSlide[]> {
  const all = await readJsonFile<CarouselSlide[]>(DATA_PATH, []);
  let filtered = slot ? all.filter((s) => s.slot === slot) : all;
  if (activeOnly) {
    filtered = filtered.filter((s) => s.active);
  }
  return filtered.sort((a, b) => a.order - b.order);
}

export async function upsertCarouselSlide(
  id: string | null,
  data: Omit<CarouselSlide, "id">
): Promise<CarouselSlide> {
  const all = await readJsonFile<CarouselSlide[]>(DATA_PATH, []);
  if (id) {
    const updated = all.map((s) => (s.id === id ? { ...s, ...data } : s));
    await writeJsonFile(DATA_PATH, updated, "chore: update carousel slide via admin");
    return { id, ...data };
  }
  const newSlide: CarouselSlide = {
    id: `slide-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...data,
  };
  await writeJsonFile(DATA_PATH, [...all, newSlide], "feat: add carousel slide via admin");
  return newSlide;
}

export async function deleteCarouselSlide(id: string): Promise<void> {
  const all = await readJsonFile<CarouselSlide[]>(DATA_PATH, []);
  await writeJsonFile(DATA_PATH, all.filter((s) => s.id !== id), "chore: delete carousel slide via admin");
}
