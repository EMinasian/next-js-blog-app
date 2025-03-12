// intended to decrease the size of the cache

export async function GET() {
  const postsResponse = await fetch('https://jsonfakery.com/blogs')
  const posts = await postsResponse.json()
  return Response.json({ posts: posts.slice(0, 50) })
}