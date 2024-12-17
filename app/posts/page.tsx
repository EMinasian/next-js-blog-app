import List from "../components/List";

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ page: number }>}) {

  const { page } = await searchParams
  const postsResponse = await fetch(
    'http://localhost:3000/api/posts', 
    { 
      cache: 'force-cache',
      next: { revalidate: 3600 }
    }
  )
  const { posts } = await postsResponse.json()

  return (
    <div>
      <List posts={posts} page={Number(page) ?? 1} />
    </div>
  );
}