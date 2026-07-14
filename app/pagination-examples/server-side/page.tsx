import type { Metadata } from "next"
import ListItem from "@/app/components/ListItem"
import PostsGrid from "@/app/components/PostsGrid"
import PageContainer from "@/app/components/PageContainer"
import Pagination from "./pagination"
import { PostType } from "@/app/types"

export const metadata: Metadata = {
  title: "Server-side Pagination",
  description: "Pagination example driven by server-side query params.",
}

type PaginatedResponse = { data: PostType[]; last_page: number }

export default async function ServerSide({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {

  const page = Number((await searchParams)?.page) || 1

  const postsResponse = await fetch(`https://jsonfakery.com/blogs/paginated?page=${page}`)
  const { data: posts, last_page }: PaginatedResponse = await postsResponse.json()

  return (
    <PageContainer>
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
        Server-side Pagination
      </h1>
      <PostsGrid>
        {posts?.map(post => <ListItem key={post.id} post={post} />)}
      </PostsGrid>
      <Pagination pageCurrent={page} pages={last_page} />
    </PageContainer>
  )
}
