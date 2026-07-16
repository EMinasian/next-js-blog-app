import { getPostById } from "@/lib/posts-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const post = getPostById(postId);

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json({ post });
}
