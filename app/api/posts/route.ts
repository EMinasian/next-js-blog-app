// for testing pruposes

export async function GET() {
  const postsResponse = await fetch('https://jsonfakery.com/blogs')
  const posts = await postsResponse.json()
  console.log('Request to get api route')
  return Response.json({ posts })
}