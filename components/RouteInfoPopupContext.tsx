"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type RouteInfoPopupContextValue = {
  isOpen: boolean
  hasPopup: boolean
  open: () => void
  close: () => void
  registerPopup: () => void
  unregisterPopup: () => void
}

const RouteInfoPopupContext = createContext<RouteInfoPopupContextValue | null>(
  null,
)

export function RouteInfoPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [popupCount, setPopupCount] = useState(0)

  const registerPopup = useCallback(() => {
    setPopupCount((count) => count + 1)
    setIsOpen(true)
  }, [])

  const unregisterPopup = useCallback(() => {
    setPopupCount((count) => Math.max(0, count - 1))
  }, [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      isOpen,
      hasPopup: popupCount > 0,
      open,
      close,
      registerPopup,
      unregisterPopup,
    }),
    [isOpen, popupCount, open, close, registerPopup, unregisterPopup],
  )

  return (
    <RouteInfoPopupContext.Provider value={value}>
      {children}
    </RouteInfoPopupContext.Provider>
  )
}

export function useRouteInfoPopup() {
  const context = useContext(RouteInfoPopupContext)
  if (!context) {
    throw new Error(
      "useRouteInfoPopup must be used within a RouteInfoPopupProvider",
    )
  }
  return context
}
