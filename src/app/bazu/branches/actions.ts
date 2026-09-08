"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getBranches, upsertBranch, deleteBranch } from "@/lib/branches.server";
import type { Branch } from "@/lib/branch-types";

export async function fetchAllBranches(): Promise<Branch[]> {
  return getBranches();
}

export async function saveBranch(
  id: string | null,
  data: Omit<Branch, "id">
): Promise<{ ok: true; branch: Branch } | { ok: false; error: string }> {
  try {
    const branch = await upsertBranch(id, data);
    revalidateTag("vpm-branches", "max");
    revalidatePath("/branches");
    revalidatePath("/", "layout");
    return { ok: true, branch };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save branch" };
  }
}

export async function removeBranch(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deleteBranch(id);
    revalidateTag("vpm-branches", "max");
    revalidatePath("/branches");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete branch" };
  }
}
