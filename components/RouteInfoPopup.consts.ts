import type { InfoSection } from "./RouteInfoPopup";

type RouteInfoContent = {
  title: string;
  sections: InfoSection[];
  githubUrl: string;
};

export const POSTS_ROUTE_INFO: RouteInfoContent = {
  title: "Posts",
  sections: [
    {
      label: "Rendering",
      text: "Hybrid — a Server Component makes one fetch to the internal /api/posts route (force-dynamic, since the data depends on a running server rather than being available at build time).",
    },
    {
      label: "Hooks",
      text: "List is a Client Component that owns search, page size, and pagination entirely via useState/useRef.",
    },
    {
      label: "Caching",
      text: "None beyond the single initial fetch — everything downstream is in-memory slicing, with no further network requests.",
    },
    {
      label: "Why it helps",
      text: "A useful contrast to the other examples: one server round trip up front, then everything behaves like pure client-side pagination.",
    },
  ],
  githubUrl:
    "https://github.com/EMinasian/next-js-blog-app/blob/main/app/posts/page.tsx",
};

export const SERVER_SIDE_PAGINATION_ROUTE_INFO: RouteInfoContent = {
  title: "Server-side Pagination",
  sections: [
    {
      label: "Rendering",
      text: "Server Component — the page search param is forwarded straight to the external API's own ?page= endpoint, so the remote API does the slicing.",
    },
    {
      label: "Hooks",
      text: "The Pagination wrapper is a Client Component pairing useOptimistic (flips the highlighted page instantly) with useTransition (marks the router.push as non-blocking).",
    },
    {
      label: "Caching",
      text: "None — Next 15 defaults fetch to no-store (unlike Next 13/14's force-cache default), so every navigation is a genuinely fresh request.",
    },
    {
      label: "Why it helps",
      text: "The old page stays interactive and the UI feels immediate, even though the new page's data is still streaming in over the network.",
    },
  ],
  githubUrl:
    "https://github.com/EMinasian/next-js-blog-app/blob/main/app/pagination-examples/server-side/page.tsx",
};

export const CLIENT_SIDE_PAGINATION_ROUTE_INFO: RouteInfoContent = {
  title: "Client-side Pagination",
  sections: [
    {
      label: "Rendering",
      text: "Client Component — the fetch happens in the browser, not on the server.",
    },
    {
      label: "Hooks",
      text: "useEffect (wrapping a useCallback fetcher) loads the entire post list once on mount; useState holds posts/loading/error so retries just re-run the fetch.",
    },
    {
      label: "Caching",
      text: "None — this never touches Next's Data Cache, since the request is made client-side rather than in a Server Component.",
    },
    {
      label: "Why it helps",
      text: "Pagination afterward is just posts.slice() over data already in memory, so page changes are instant with no server round trip — at the cost of downloading the whole dataset before the first render.",
    },
  ],
  githubUrl:
    "https://github.com/EMinasian/next-js-blog-app/blob/main/app/pagination-examples/client-side/page.tsx",
};

export const LOAD_MORE_PAGINATION_ROUTE_INFO: RouteInfoContent = {
  title: "Load More Pagination",
  sections: [
    {
      label: "Rendering",
      text: "Server Component — reads a sets search param and renders the first 9 * sets posts from the internal /api/posts route.",
    },
    {
      label: "Hooks",
      text: "LoadMoreButton is a Client Component using useTransition to push an incremented sets value into the URL (scroll: false, to avoid jumping the viewport).",
    },
    {
      label: "Caching",
      text: "Wrapped in unstable_cache tagged ['posts'] — repeat requests reuse Next's Data Cache instead of re-hitting the API, and can all be invalidated at once with revalidateTag('posts').",
    },
    {
      label: "Why it helps",
      text: "Keeping progress in the URL rather than component state makes it bookmarkable and safe across back/forward navigation.",
    },
  ],
  githubUrl:
    "https://github.com/EMinasian/next-js-blog-app/blob/main/app/pagination-examples/load-more/page.tsx",
};
