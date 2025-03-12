import ListItem from "@/app/components/ListItem"
import Link from "next/link"
import { unstable_cache } from "next/cache"

const ITEMS_PER_SET = 9

export default async function LoadMore({ searchParams }: { searchParams: any }) {

  const sets = Number((await searchParams)?.sets) || 1

  const getCachedData = unstable_cache(async () => {
    const postsResponse = await fetch('http://localhost:3000/api/posts')
    console.log('executed function')
    return await postsResponse.json()
  }, [], { tags: ['posts'] }) 

  const { posts: totalPosts} = await getCachedData()

  const posts = totalPosts?.slice(0, ITEMS_PER_SET * sets)

  return (
    <>
      <div className="grid grid-cols-3">
        {
          //@ts-ignore
          posts?.map(post => <ListItem key={post.id} post={post} />)
        }
      </div>
      <Link href={`/pagination-examples/load-more?sets=${sets + 1}`} >
        Load More
      </Link>
    </>
  )
}