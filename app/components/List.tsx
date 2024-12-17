'use client'

import { useState } from "react"
import ListItem from "./ListItem"
import { PostType } from "../types"

export default function List({ posts }: { posts: Array<PostType>}) {

  const [currentpage, setPage] = useState(1)
  const pages = Math.floor(posts.length) + 1
  const postsOfPage = posts.slice(9 * (currentpage - 1), currentpage * 9)
  

  return (
    <div className="p-4">
      <div className="grid grid-cols-3">
      {
        postsOfPage.map(post => <ListItem key={post.id} post={post} />)
      }
      </div>
      <div className="flex justify-center p-4 gap-4">
        {currentpage > 1 && <button onClick={() => { setPage(page => page - 1) }}>Previous</button>}
        page {currentpage} of {pages}
        {currentpage < pages && <button onClick={() => { setPage(page => page + 1) }}>Next</button>}
      </div>
    </div>
  )
}