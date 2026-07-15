# Next.js Blog App

A small blog used as a hands-on study of pagination patterns in the Next.js App Router. Every route exists to isolate and compare one way of paginating a list of posts, from purely client-side to fully server-driven.

## Routes

### `/` — Home

`app/page.tsx`

A landing page with a short pitch for the app and links into `/posts` and each pagination example. Implemented as a plain static server component (no data fetching) so there's a stable, fast entry point that explains what the other routes are for before the visitor picks one.

### `/posts` — Posts (search + client pagination over server-fetched data)

`app/posts/page.tsx` + `components/List.tsx`

Displays the full post list with a title search box and a "posts per page" selector (9/12/15/18). The page itself is a server component that fetches from the app's own `/api/posts` route and hands the raw array to `List`, a client component that owns searching, page-size, and pagination state locally.

Implemented this way to demonstrate the split Next.js encourages: a server component does the network fetch (so the fetch never ships to the browser as client JS), while everything that needs to react instantly to typing/clicking (filtering, changing page size) lives in a client component operating on data already in memory. Because `/posts` fetches from an internal route by absolute URL, the page is marked `dynamic = "force-dynamic"` — otherwise Next would try to prerender it at build time, when no server is running yet to answer that fetch.

### `/pagination-examples/client-side` — Client-side pagination

`app/pagination-examples/client-side/page.tsx`

Fetches every post once (directly from the external `jsonfakery.com` API, client-side, in a `useEffect`) and then pages through the in-memory array by slicing it. Page changes are instant since they're just array slices with no further network calls.

This is the baseline/"naive" approach: it's implemented to show the trade-off plainly — simplest mental model and snappiest paging once loaded, at the cost of downloading the entire dataset up front, a loading skeleton on first paint, and page state that lives only in `useState` (not shareable via URL, lost on refresh).

### `/pagination-examples/load-more` — Load more pagination

`app/pagination-examples/load-more/page.tsx` + `LoadMoreButton.tsx`

Renders posts in growing chunks: the number of "sets" already loaded is read from a `sets` search param, the server fetches from the internal `/api/posts` route (through `unstable_cache`, tagged `"posts"`), and slices the first `9 * sets` posts. Clicking "Load More" pushes the same URL with `sets` incremented, so the server re-renders with one more chunk. `useTransition` in the button drives the pending/"Loading…" state.

Implemented as a server-rendered, URL-driven alternative to typical client-side "infinite scroll": progress is encoded in the URL (bookmarkable, works with back/forward), the response is cached with `unstable_cache` so repeated loads don't keep hitting the upstream API, and the cache is paired with `/api/revalidate-posts` to show how tag-based invalidation clears it on demand.

### `/pagination-examples/server-side` — Server-side pagination

`app/pagination-examples/server-side/page.tsx` + `pagination.tsx`

Each page is its own request: the `page` search param is read on the server and passed straight to the external API's own pagination (`jsonfakery.com/blogs/paginated?page=`), so the server does the slicing instead of the app. The `Pagination` client component wraps navigation in `useTransition` and uses `useOptimistic` to flip the highlighted page number immediately, before the server response for the new page has actually arrived.

Implemented to demonstrate the classic "let the backend paginate" pattern (no need to ever hold the full dataset in memory, works with datasets too large to fetch entirely) alongside `useOptimistic` as the fix for the UX cost that pattern usually has — a page number that only updates after the round-trip finishes.

### `/api/posts` — Internal posts API route

`app/api/posts/route.ts`

Proxies `jsonfakery.com/blogs` and truncates the result to 50 posts. Implemented as a thin internal layer so `/posts` and `/pagination-examples/load-more` fetch from same-origin (`http://localhost:3000/api/posts`) instead of calling the third-party API directly, and so both can share the same `unstable_cache`/`revalidateTag("posts")` cache entry.

### `/api/revalidate-posts` — Cache revalidation route

`app/api/revalidate-posts/route.ts`

Calls `revalidateTag("posts")` and returns a confirmation. Implemented as a manual trigger to invalidate the cached response from `/api/posts` on demand, showing how Next's tag-based cache invalidation works independent of any time-based revalidation.

### `app/error.tsx` — Route error boundary

Catches errors thrown while rendering any page below the root layout (e.g. a failed `fetch` in one of the pagination examples) and shows a styled "something went wrong" screen with a "Try again" button (`reset()`) and a link back home. Implemented so a failed request degrades gracefully instead of showing Next's default error overlay, and so the failure states in each example are easy to trigger and observe.

### `app/global-error.tsx` — Root error boundary

Handles the one case `error.tsx` can't: an error thrown in the root layout itself. Since it has to replace the root layout, it renders its own `<html>`/`<body>` with inline styles rather than reusing app components. Implemented purely as the required fallback for that edge case, not as a route anyone navigates to directly.

### `app/layout.tsx` — Root layout

Loads fonts (Geist, Geist Mono, Lora), wraps the app in `next-themes`'s `ThemeProvider` for light/dark mode, and renders the shared `Nav`. Implemented once at the root so every route below it gets consistent chrome and theming without repeating it per page.

### `app/types.ts` — Shared types

`PostType` and `UserType` mirror the shape returned by the `jsonfakery.com` API. Implemented as a single shared source of truth so every route and component fetching or rendering posts/users agrees on the same shape.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
