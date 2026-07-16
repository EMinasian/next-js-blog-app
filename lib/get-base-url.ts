/**
 * Resolves the origin to use for server-side fetches to this app's own API
 * routes. NEXT_PUBLIC_SITE_URL takes priority: VERCEL_URL is the raw
 * per-deployment host, which is commonly behind Vercel Deployment
 * Protection, so an unauthenticated self-fetch to it returns an HTML
 * challenge page instead of JSON. VERCEL_URL is only a fallback for
 * preview/prod deployments that haven't set NEXT_PUBLIC_SITE_URL.
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
