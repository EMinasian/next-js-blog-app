import ListItem from "./ListItem"
import { PostType } from "../types"

export default function List({ posts }: { posts: Array<PostType>}) {
  return (
    <div className="grid grid-cols-3">
      {
        posts.map(post => <ListItem key={post.id} post={post} />)
      }
    </div>
  )
}