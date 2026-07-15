import PostsGrid from "./PostsGrid"
import ListItemSkeleton from "./ListItemSkeleton"

export default function PostsGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <PostsGrid>
      {Array.from({ length: count }).map((_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </PostsGrid>
  )
}
