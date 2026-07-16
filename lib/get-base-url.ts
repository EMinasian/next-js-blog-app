/**
 * Resolves the origin to use for server-side fetches to this app's own API
 * routes. Vercel injects VERCEL_URL (host only, no protocol) into every
 * deployment, so that takes priority over the localhost fallback used in
 * local dev.
 */
export function getBaseUrl(): string {
  let url: string | undefined = undefined;
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    url = process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    url = `https://${process.env.VERCEL_URL}`;
  }
  console.warn('Base url was', url)
  return url ?? "http://localhost:3000";
}
