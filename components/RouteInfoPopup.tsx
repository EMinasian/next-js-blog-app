"use client"

import { useEffect } from "react"
import { getButtonClassName } from "./Button"
import { useRouteInfoPopup } from "./RouteInfoPopupContext"

export type InfoSection = {
  label: string
  text: string
}

type RouteInfoPopupProps = {
  title: string
  sections: InfoSection[]
  githubUrl: string
}

export default function RouteInfoPopup({
  title,
  sections,
  githubUrl,
}: RouteInfoPopupProps) {
  const { isOpen, close, registerPopup, unregisterPopup } =
    useRouteInfoPopup()

  useEffect(() => {
    registerPopup()
    return () => unregisterPopup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed left-4 top-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-border bg-surface p-4 shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-serif text-base font-semibold tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-subtle-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
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
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <dl className="mt-3 space-y-2.5 flex flex-col gap-4">
        {sections.map(({ label, text }) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted/80">
              {label}
            </dt>
            <dd className="mt-0.5 text-sm text-muted">{text}</dd>
          </div>
        ))}
      </dl>

      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className={getButtonClassName({
          variant: "secondary",
          className: "mt-4 w-full",
        })}
      >
        View on GitHub
      </a>
    </div>
  )
}
