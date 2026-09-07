/**
 * SERVER-ONLY — never import in Client Components.
 * Handles reading and writing links.json via the GitHub API.
 * Data lives in your own GitHub repo under public/data/links.json.
 */

import { SocialLink, DEFAULT_LINKS } from "./link-types";

const GITHUB_API = "https://api.github.com";
const FILE_PATH = "public/data/links.json";
const CACHE_TAG = "vpm-links";

function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  if (!token || !owner || !repo) {
    throw new Error("GitHub env vars missing: GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME");
  }
  return { token, owner, repo };
}

function fileUrl(owner: string, repo: string) {
  return `${GITHUB_API}/repos/${owner}/${repo}/contents/${FILE_PATH}`;
}

/** Read links.json from GitHub (cached, busted on admin writes). */
export async function getLinks(): Promise<SocialLink[]> {
  try {
    const { token, owner, repo } = cfg();
    const res = await fetch(fileUrl(owner, repo), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { tags: [CACHE_TAG] },
    });

    if (!res.ok) return [...DEFAULT_LINKS];

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed = JSON.parse(content) as SocialLink[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_LINKS];
  } catch {
    return [...DEFAULT_LINKS];
  }
}

/** Write links.json to GitHub. Automatically fetches the current SHA first. */
export async function saveLinks(links: SocialLink[]): Promise<void> {
  const { token, owner, repo } = cfg();
  const url = fileUrl(owner, repo);

  // 1. Get current SHA (required for GitHub file updates)
  let sha: string | undefined;
  try {
    const cur = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });
    if (cur.ok) {
      const d = await cur.json();
      sha = d.sha;
    }
  } catch {
    // File doesn't exist yet — first write, no SHA needed
  }

  // 2. Encode content as base64
  const encoded = Buffer.from(JSON.stringify(links, null, 2), "utf-8").toString("base64");

  const body: Record<string, unknown> = {
    message: "chore: update links.json via admin panel",
    content: encoded,
  };
  if (sha) body.sha = sha;

  // 3. Write to GitHub
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(`GitHub API error ${res.status}: ${err.message ?? res.statusText}`);
  }
}
