import { NextRequest } from 'next/server'
import { getPaginatedPosts } from '@/lib/posts-data'

const PER_PAGE = 9

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get('page')) || 1
  const { data, last_page } = getPaginatedPosts(page, PER_PAGE)
  return Response.json({ data, last_page })
}
