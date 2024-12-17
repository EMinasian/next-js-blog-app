import List from "../components/List";

export default async function PostsPage() {

  const postsResponse = await fetch('http://localhost:3000/api/posts')
  const { posts } = await postsResponse.json()

  return (
    <div>
      <List posts={posts} />
    </div>
  );
}