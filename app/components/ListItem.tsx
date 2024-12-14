import { PostType } from "../types"

export default function ListItem({ post }: { post: PostType}) {
  return (
    <div>
      <h2>{post.title}</h2>
    </div>
  )
}