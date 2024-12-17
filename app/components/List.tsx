import Link from "next/link"
import ListItem from "./ListItem"
import { PostType } from "../types"

export default function List({ posts, page }: { posts: Array<PostType>, page: number}) {

  const pages = Math.floor(posts.length) + 1
  const postsOfPage = posts.slice(9 * (page - 1), page * 9)

  return (
    <div>
      <div className="grid grid-cols-3">
      {
        postsOfPage.map(post => <ListItem key={post.id} post={post} />)
      }
      </div>
      <div className="grid grid-cols-2">
        {page > 1 && <Link href={`/posts?page=${page - 1}`}>Previous</Link>}
        {page < pages && <Link href={`/posts?page=${page + 1}`}>Next</Link>}
      </div>
    </div>
  )
}