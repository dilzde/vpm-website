import { readJsonFile, writeJsonFile, uploadBinaryFile, deleteGitHubFile } from "./github.server";
import type { LivestreamConfig } from "./livestream-types";

const DATA_PATH = "public/data/livestream.json";

const DEFAULT: LivestreamConfig = {
  channelALive: false,
  channelBLive: false,
  radioLogoUrl: null,
  radioLogoStoragePath: null,
  stationName: "Asriel Radio",
  nowBroadcastingTitle: "",
};

export async function getLivestreamConfig(): Promise<LivestreamConfig> {
  return readJsonFile<LivestreamConfig>(DATA_PATH, DEFAULT);
}

export async function updateLivestreamConfig(patch: Partial<LivestreamConfig>): Promise<LivestreamConfig> {
  const current = await getLivestreamConfig();
  const updated = { ...current, ...patch };
  await writeJsonFile(DATA_PATH, updated, "chore: update livestream config via admin");
  return updated;
}

export async function uploadRadioLogo(base64: string, filename: string): Promise<{ url: string; storagePath: string }> {
  const ts = Date.now();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `public/images/radio/logo_${ts}_${safeName}`;
  const url = await uploadBinaryFile(storagePath, base64, "feat: upload radio logo via admin");
  return { url, storagePath };
}

export async function removeRadioLogo(storagePath: string | null): Promise<void> {
  if (!storagePath) return;
  try {
    await deleteGitHubFile(storagePath, "chore: remove radio logo via admin");
  } catch {
    /* non-fatal */
  }
}
