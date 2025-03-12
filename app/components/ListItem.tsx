import { PostType } from "../types"
import Image from "next/image"

export default function ListItem({ post }: { post: PostType}) {
  return (
    <div className="p-2">
      <div className="relative w-full h-[200px]">
        <Image 
          src={post.featured_image}
          alt=''
          fill
          className="object-cover"
        />
      </div>

      <h2>{post.title}</h2>
    </div>
  )
}