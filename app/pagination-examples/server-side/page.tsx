import ListItem from "@/app/components/ListItem"
import Pagination from "./pagination"

export default async function ServerSide({ searchParams }: { searchParams: any }) {

  const page = Number((await searchParams)?.page) || 1

  const postsResponse = await fetch(`https://jsonfakery.com/blogs/paginated?page=${page}`)
  const { data: posts, last_page } = await postsResponse.json()

  return (
    <>
      <div className="grid grid-cols-3">
          {
            //@ts-ignore
            posts?.map(post => <ListItem key={post.id} post={post} />)
          }
       </div>
       <Pagination pageCurrent={page} pages={last_page} />
    </>
  )
}