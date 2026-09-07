"use server";

/**
 * Server Actions for links management.
 * These run on the server — they have access to env vars (GITHUB_TOKEN etc.)
 * and call revalidatePath/revalidateTag after every write so the public
 * /links page refreshes instantly on next visit.
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { getLinks, saveLinks } from "@/lib/links.server";
import { SocialLink, DEFAULT_LINKS } from "@/lib/link-types";

function bust() {
  revalidateTag("vpm-links", "max");
  revalidatePath("/links");
}

/** Return all links (including hidden ones) for the admin UI. */
export async function fetchAllLinks(): Promise<SocialLink[]> {
  const links = await getLinks();
  return links.slice().sort((a, b) => a.order - b.order);
}

/** Create a new link or update an existing one (identified by id). */
export async function upsertLink(
  id: string | null,
  data: Omit<SocialLink, "id">
): Promise<{ ok: boolean; error?: string }> {
  try {
    const links = await getLinks();
    const targetId =
      id ||
      "link-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);

    const idx = links.findIndex((l) => l.id === targetId);
    const item: SocialLink = { id: targetId, ...data };

    let updated: SocialLink[];
    if (idx >= 0) {
      // In-place update — all other links remain untouched
      updated = links.map((l) => (l.id === targetId ? item : l));
    } else {
      // Append new link
      updated = [...links, item];
    }

    updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    await saveLinks(updated);
    bust();
    return { ok: true };
  } catch (err) {
    console.error("upsertLink error:", err);
    return { ok: false, error: String(err) };
  }
}

/** Permanently delete a link by id. */
export async function deleteLink(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const links = await getLinks();
    const filtered = links.filter((l) => l.id !== id);
    await saveLinks(filtered);
    bust();
    return { ok: true };
  } catch (err) {
    console.error("deleteLink error:", err);
    return { ok: false, error: String(err) };
  }
}

/** Reset the entire links list back to the 7 official VPM defaults. */
export async function resetToDefaults(): Promise<{
  ok: boolean;
  error?: string;
}> {
  try {
    await saveLinks(DEFAULT_LINKS);
    bust();
    return { ok: true };
  } catch (err) {
    console.error("resetToDefaults error:", err);
    return { ok: false, error: String(err) };
  }
}
