'use client'

import { useRef, useState } from "react"
import ListItem from "./ListItem"
import Pagination from "./Pagination"
import PostsGrid from "./PostsGrid"
import Button from "./Button"
import { PostType } from "../types"
import { getTotalPages } from "../lib/pagination"

const POSTS_PER_PAGE = [9, 12, 15, 18]

export default function List({ posts }: { posts: Array<PostType>}) {

  const searchRef = useRef<HTMLInputElement>(null)
  const postsViewed = useRef(POSTS_PER_PAGE[0])

  const [currentpage, setPage] = useState(1)
  const [perPage, setPerPage] = useState(POSTS_PER_PAGE[0])
  const [totalPosts, setPosts] = useState(posts)

  const pages = getTotalPages(totalPosts.length, perPage)
  const postsOfPage = totalPosts.slice(perPage * (currentpage - 1), currentpage * perPage)
  postsViewed.current = currentpage * perPage

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
    if (searchRef.current) {
      searchRef.current.value = ""
    }
  }

  function handlePostNumChange(postsNum: number) {
    const newPage = Math.floor(postsViewed.current/postsNum) + 1
    setPerPage(postsNum)
    setPage(newPage)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-muted">Posts per page:</span>
        {POSTS_PER_PAGE.map((num) => (
          <Button
            key={num}
            type="button"
            active={perPage === num}
            onClick={() => handlePostNumChange(num)}
          >
            {num}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="search" className="text-sm text-muted">
            Search by title
          </label>
          <input
            id="search"
            name="search"
            ref={searchRef}
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          />
        </div>
        <Button type="button" variant="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {postsOfPage.length > 0 ? (
        <PostsGrid>
          {postsOfPage.map(post => <ListItem key={post.id} post={post} />)}
        </PostsGrid>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-subtle-accent px-6 py-16 text-center text-sm text-muted">
          No posts found.
        </div>
      )}

      <Pagination
        currentPage={currentpage}
        totalPages={pages}
        onPrev={() => setPage(page => Math.max(1, page - 1))}
        onNext={() => setPage(page => Math.min(pages, page + 1))}
      />
    </div>
  )
}
