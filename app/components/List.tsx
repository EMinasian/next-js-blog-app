'use client'

import { useRef, useState } from "react"
import ListItem from "./ListItem"
import { PostType } from "../types"

const POSTS_PER_PAGE = [9, 12, 15, 18]

export default function List({ posts }: { posts: Array<PostType>}) {

  const searchRef = useRef<HTMLInputElement>(null)

  const [currentpage, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)
  const [totalPosts, setPosts] = useState(posts)

  const pages = Math.floor(totalPosts.length / perPage) + 1
  const postsOfPage = totalPosts.slice(perPage * (currentpage - 1), currentpage * perPage)

  function perPageButton(postsNum: number) {
    return (
      <button onClick={() => {setPerPage(postsNum)}}>{postsNum}</button>
    )
  } 

  function handleSearch() {

    if (!searchRef.current?.value) {
      return 
    }

    const reg = RegExp(searchRef.current?.value)
    const searchedPosts = totalPosts.filter(post => {
      const value = reg.test(post?.title)
      return value
    })
    setPosts(searchedPosts)
    setPage(1)
  } 

  function handleReset() {
    setPosts(posts)
    setPage(1)
  }
  
  return (
    <div className="p-4">
      <div className="flex gap-4 justify-center p-4">
        Posts per page:
        {
          POSTS_PER_PAGE.map(num => perPageButton(num))
        }
      </div>
      <div className="flex gap-4 p-4">
        <input name="search" ref={searchRef}/>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
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