/**
 * Resolves the origin to use for server-side fetches to this app's own API
 * routes. Vercel injects VERCEL_URL (host only, no protocol) into every
 * deployment, so that takes priority over the localhost fallback used in
 * local dev.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
