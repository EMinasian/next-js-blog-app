import List from "./components/List";


export default async function Home() {

  const postsResponse = await fetch('https://jsonfakery.com/blogs')
  const posts = await postsResponse.json()

  return (
    <div>
      <List posts={posts} />
    </div>
  );
}
