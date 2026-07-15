export default function ListItemSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="aspect-[3/2] w-full animate-pulse bg-subtle-accent" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-subtle-accent" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-subtle-accent" />
      </div>
    </div>
  )
}
