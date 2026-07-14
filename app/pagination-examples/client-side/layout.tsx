import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client-side Pagination",
  description: "Pagination example computed entirely on the client.",
}

export default function ClientSideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
