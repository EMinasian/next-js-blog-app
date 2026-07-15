import { ReactNode } from "react"

export default function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
}
