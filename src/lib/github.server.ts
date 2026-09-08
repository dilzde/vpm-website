/**
 * SERVER-ONLY — generic GitHub API helper.
 * All data sections (images, give, events, etc.) use this.
 */

const GITHUB_API = "https://api.github.com";

export function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  if (!token || !owner || !repo) {
    throw new Error(
      "GitHub env vars missing: GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME"
    );
  }
  return { token, owner, repo };
}

export function fileUrl(owner: string, repo: string, path: string) {
  return `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
}

/** Read a JSON file from GitHub, return parsed value. Falls back to `defaultValue` on error. */
export async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const { token, owner, repo } = cfg();
    const res = await fetch(fileUrl(owner, repo, filePath), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });
    if (!res.ok) return defaultValue;
    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed = JSON.parse(content);
    return parsed;
  } catch {
    return defaultValue;
  }
}

/** Write (create or update) a JSON file in GitHub. */
export async function writeJsonFile<T>(filePath: string, data: T, commitMsg: string): Promise<void> {
  const { token, owner, repo } = cfg();
  const url = fileUrl(owner, repo, filePath);

  // Get current SHA
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
    // File doesn't exist yet — first write
  }

  const encoded = Buffer.from(JSON.stringify(data, null, 2), "utf-8").toString("base64");
  const body: Record<string, unknown> = { message: commitMsg, content: encoded };
  if (sha) body.sha = sha;

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

/** Upload a binary file (image) to GitHub. Returns the raw public path. */
export async function uploadBinaryFile(
  filePath: string,
  base64Content: string,
  commitMsg: string
): Promise<string> {
  const { token, owner, repo } = cfg();
  const url = fileUrl(owner, repo, filePath);

  // Check if file already exists (get SHA)
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
    // New file
  }

  const body: Record<string, unknown> = { message: commitMsg, content: base64Content };
  if (sha) body.sha = sha;

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
    throw new Error(`GitHub upload error ${res.status}: ${err.message ?? res.statusText}`);
  }

  // Return the public path (Next.js serves from /public)
  return `/${filePath.replace(/^public\//, "")}`;
}

/** Delete a file from GitHub. */
export async function deleteGitHubFile(filePath: string, commitMsg: string): Promise<void> {
  const { token, owner, repo } = cfg();
  const url = fileUrl(owner, repo, filePath);

  // Get SHA
  const cur = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });
  if (!cur.ok) return; // File doesn't exist, nothing to do

  const d = await cur.json();
  const sha = d.sha;

  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: commitMsg, sha }),
    cache: "no-store",
  });
}
