'use client'

import { useState } from "react"
import ListItem from "./ListItem"
import { PostType } from "../types"

const POSTS_PER_PAGE = [9, 12, 15, 18]

export default function List({ posts }: { posts: Array<PostType>}) {

  const [currentpage, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)
  const pages = Math.floor(posts.length / perPage) + 1
  const postsOfPage = posts.slice(perPage * (currentpage - 1), currentpage * perPage)

  function perPageButton(postsNum: number) {
    return (
      <button onClick={() => {setPerPage(postsNum)}}>{postsNum}</button>
    )
  } 
  
  return (
    <div className="p-4">
      <div className="flex gap-4 justify-center p-4">
        Posts per page:
        {
          POSTS_PER_PAGE.map(num => perPageButton(num))
        }
      </div>
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