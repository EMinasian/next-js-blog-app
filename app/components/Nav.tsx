'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

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
    `rounded-md px-3 py-2 text-sm transition-colors hover:bg-subtle-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
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
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-subtle-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/40 ${
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
      </nav>
    </header>
  )
}
