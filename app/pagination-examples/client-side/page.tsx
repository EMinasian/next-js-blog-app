'use client'
import { useEffect, useState } from "react"
import ListItem from "../../components/ListItem"
import Pagination from "../../components/Pagination"
import PostsGrid from "../../components/PostsGrid"
import PageContainer from "../../components/PageContainer"
import { PostType } from "../../types"
import { getTotalPages } from "../../lib/pagination"

const PER_PAGE = 9

export default function ClientSide() {

  const [pageCurrent, setPageCurrent] = useState(1)
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    async function fetchData() {
      const postsResponse = await fetch('https://jsonfakery.com/blogs')
      const posts: PostType[] = await postsResponse.json()
      setPosts(posts)
    }
    fetchData()
  }, [])

  const pages = getTotalPages(posts.length, PER_PAGE)
  const postsOfPage = posts.slice(PER_PAGE * (pageCurrent - 1), pageCurrent * PER_PAGE)

  return (
    <PageContainer>
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
        Client-side Pagination
      </h1>
      <PostsGrid>
        {postsOfPage.map(post => <ListItem key={post.id} post={post} />)}
      </PostsGrid>
      <Pagination
        currentPage={pageCurrent}
        totalPages={pages}
        onPrev={() => setPageCurrent(page => Math.max(1, page - 1))}
        onNext={() => setPageCurrent(page => Math.min(pages, page + 1))}
      />
    </PageContainer>
  )
}
