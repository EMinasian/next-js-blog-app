import { revalidateTag } from "next/cache"

export async function GET() {
  revalidateTag('posts', 'max')
  return Response.json({ revalidation: 'success' })
}