import { PostType } from "../types"

export default function ListItem({ post }: { post: PostType}) {
  return (
    <div className="p-2">
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
    </div>
  )
}