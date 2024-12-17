import List from "../components/List";

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ page: number }>}) {

  const { page } = await searchParams
  const postsResponse = await fetch('https://jsonfakery.com/blogs')
  const posts = await postsResponse.json()

  return (
    <div>
      <List posts={posts} page={Number(page) ?? 1} />
    </div>
  );
}