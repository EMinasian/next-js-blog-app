'use client'
import { useEffect, useState } from "react"
import ListItem from "../../components/ListItem"

const PER_PAGE = 9

export default function ClientSide() {

  const [pageCurrent, setPageCurrent] = useState(1)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const postsResponse = await fetch('https://jsonfakery.com/blogs')
      const posts = await postsResponse.json()
      setPosts(posts)
    }
    fetchData()
  }, [])

  const pages = Math.floor(posts.length / PER_PAGE) + 1
  const postsOfPage = posts.slice(PER_PAGE * (pageCurrent - 1), pageCurrent * PER_PAGE)

  return (
    <div>
      <div className="grid grid-cols-3">
        {
          //@ts-ignore
          postsOfPage.map(post => <ListItem key={post.id} post={post} />)
        }
      </div>
      <div className="flex justify-center p-4 gap-4">
        {pageCurrent > 1 && <button onClick={() => { setPageCurrent(page => page - 1) }}>Previous</button>}
        page {pageCurrent} of {pages}
        {pageCurrent < pages && <button onClick={() => { setPageCurrent(page => page + 1) }}>Next</button>}
      </div>
    </div>
  )
}