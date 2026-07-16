'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useId, useRef, useState } from "react"
import { useRouteInfoPopup } from "./RouteInfoPopupContext"

const PAGINATION_ROUTES = [
  { href: "/pagination-examples/client-side", label: "Client-side" },
  { href: "/pagination-examples/load-more", label: "Load more" },
  { href: "/pagination-examples/server-side", label: "Server-side" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { hasPopup, open: openInfoPopup } = useRouteInfoPopup()

  useEffect(() => {
    // next-themes' hydration-safe mount flag: no async boundary is possible here,
    // since the whole point is to flip immediately after the first client render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  function closeMenu(options: { refocus?: boolean } = {}) {
    setOpen(false)
    if (options.refocus) {
      triggerRef.current?.focus()
    }
  }

  useEffect(() => {
    if (!open) return

    function handleMouseDown(event: MouseEvent) {
      const target = event.target as Node
      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return
      }
      closeMenu()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu({ refocus: true })
      }
    }

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const isPaginationActive = pathname?.startsWith("/pagination-examples")

  const navLinkClass = (isActive: boolean) =>
    `rounded-md px-3 py-2 text-sm transition-colors hover:bg-subtle-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
      isActive ? "font-semibold text-foreground" : "text-muted"
    }`

  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
          Blog
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/posts" className={navLinkClass(pathname === "/posts")}>
            Posts
          </Link>

          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((prev) => !prev)}
              className={`flex items-center gap-1 ${navLinkClass(Boolean(isPaginationActive))}`}
            >
              Pagination Examples
              <span
                aria-hidden="true"
                className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {open && (
              <div
                ref={menuRef}
                id={menuId}
                role="menu"
                aria-label="Pagination Examples"
                className="absolute left-0 top-full z-10 mt-2 min-w-[12rem] rounded-md border border-border bg-surface py-1 shadow-md"
              >
                {PAGINATION_ROUTES.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    role="menuitem"
                    onClick={() => closeMenu()}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-subtle-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50 ${
                      pathname === route.href
                        ? "font-semibold text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1">
          {hasPopup && (
            <button
              type="button"
              aria-label="Show route info"
              onClick={openInfoPopup}
              className="rounded-md p-2 text-muted transition-colors hover:bg-subtle-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </button>
          )}
          <button
            type="button"
            aria-label={
              mounted && resolvedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-md p-2 text-muted transition-colors hover:bg-subtle-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            {mounted && resolvedTheme === "dark" ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M4.93 19.07l1.41-1.41" />
                <path d="M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
