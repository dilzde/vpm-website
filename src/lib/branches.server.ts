import { readJsonFile, writeJsonFile } from "./github.server";
import type { Branch } from "./branch-types";

const DATA_PATH = "public/data/branches.json";

export async function getBranches(activeOnly = false): Promise<Branch[]> {
  const all = await readJsonFile<Branch[]>(DATA_PATH, []);
  const filtered = activeOnly ? all.filter((b) => b.active) : all;
  return filtered.sort((a, b) => a.order - b.order);
}

export async function upsertBranch(id: string | null, data: Omit<Branch, "id">): Promise<Branch> {
  const all = await readJsonFile<Branch[]>(DATA_PATH, []);
  if (id) {
    const updated = all.map((b) => (b.id === id ? { ...b, ...data } : b));
    await writeJsonFile(DATA_PATH, updated, "chore: update branch via admin");
    return { id, ...data };
  }
  const newBranch: Branch = { id: `br-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...data };
  await writeJsonFile(DATA_PATH, [...all, newBranch], "feat: add branch via admin");
  return newBranch;
}

export async function deleteBranch(id: string): Promise<void> {
  const all = await readJsonFile<Branch[]>(DATA_PATH, []);
  await writeJsonFile(DATA_PATH, all.filter((b) => b.id !== id), "chore: delete branch via admin");
}
