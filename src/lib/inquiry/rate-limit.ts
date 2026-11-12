import "server-only";

/**
 * Inquiry rate limiting: 5 submissions per 10 minutes per client.
 *
 * Uses Upstash Redis (REST) when UPSTASH_REDIS_REST_URL / _TOKEN are set —
 * recommended in production, where serverless instances don't share memory.
 * Falls back to a per-instance in-memory window otherwise.
 */
const WINDOW_SECONDS = 600;
const MAX_REQUESTS = 5;
const memory = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(key: string): Promise<{ ok: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", `inquiry:${key}`],
          ["EXPIRE", `inquiry:${key}`, String(WINDOW_SECONDS), "NX"],
        ]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { result: number }[];
        return { ok: (data[0]?.result ?? 0) <= MAX_REQUESTS };
      }
    } catch {
      /* fall through to memory limiter */
    }
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    if (memory.size > 5000) for (const [k, v] of memory) if (v.resetAt < now) memory.delete(k);
    return { ok: true };
  }
  entry.count += 1;
  return { ok: entry.count <= MAX_REQUESTS };
}
