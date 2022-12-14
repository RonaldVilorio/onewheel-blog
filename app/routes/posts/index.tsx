import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};
export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json({ posts });
};
export default function PostsRoute() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <Link to="admin" className="text-redd-699 underline">
        Admin
      </Link>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
