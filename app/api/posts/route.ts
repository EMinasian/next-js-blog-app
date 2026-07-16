import { ALL_POSTS } from '@/lib/posts-data'

export async function GET() {
  return Response.json({ posts: ALL_POSTS })
}