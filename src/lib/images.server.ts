/**
 * SERVER-ONLY — reads/writes images metadata from public/data/images.json via GitHub API.
 */
import { readJsonFile, writeJsonFile, deleteGitHubFile } from "./github.server";
import type { SiteImage } from "./image-types";

const DATA_PATH = "public/data/images.json";

export async function getImages(slot?: SiteImage["slot"]): Promise<SiteImage[]> {
  const all = await readJsonFile<SiteImage[]>(DATA_PATH, []);
  if (slot) return all.filter((img) => img.slot === slot);
  return all;
}

export async function saveImages(images: SiteImage[]): Promise<void> {
  await writeJsonFile(DATA_PATH, images, "chore: update images.json via admin panel");
}

export async function addImage(image: Omit<SiteImage, "id">): Promise<SiteImage> {
  const all = await getImages();
  const newImage: SiteImage = { id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...image };
  await writeJsonFile(DATA_PATH, [...all, newImage], "feat: add image via admin panel");
  return newImage;
}

export async function upsertImageMeta(id: string | null, data: Omit<SiteImage, "id">): Promise<SiteImage> {
  const all = await getImages();
  if (id) {
    const updated = all.map((img) => img.id === id ? { ...img, ...data } : img);
    await writeJsonFile(DATA_PATH, updated, "chore: update image metadata via admin");
    return { id, ...data };
  }
  const newImg: SiteImage = { id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...data };
  await writeJsonFile(DATA_PATH, [...all, newImg], "feat: add image via admin panel");
  return newImg;
}

export async function removeImage(id: string): Promise<void> {
  const all = await getImages();
  const img = all.find((i) => i.id === id);
  const updated = all.filter((i) => i.id !== id);
  await writeJsonFile(DATA_PATH, updated, "chore: delete image via admin panel");
  // Also delete the actual file from GitHub
  if (img?.storagePath) {
    try {
      await deleteGitHubFile(img.storagePath, `chore: delete image file ${img.storagePath}`);
    } catch {
      // Non-fatal — metadata is already removed
    }
  }
}
