import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "../../../components/PageContainer";
import { getButtonClassName } from "../../../components/Button";
import { getBaseUrl } from "../../../lib/get-base-url";
import { PostType } from "../../types";

// This route fetches from our own API route by absolute URL, which only
// resolves once the server is actually running. Force dynamic rendering so
// Next doesn't attempt to prerender it at build time (when no server is up).
export const dynamic = "force-dynamic";

async function getPost(postId: string) {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/posts/${postId}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch post for base url ${baseUrl}`);
  }
  const { post }: { post: PostType } = await response.json();
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const post = await getPost(postId);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer className="max-w-3xl">
      <Link
        href="/posts"
        className={getButtonClassName({ variant: "ghost", className: "mb-6" })}
      >
        ← Back to posts
      </Link>

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {post.category}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-3 text-lg text-muted">{post.subtitle}</p>
        )}

        <div className="mt-4 flex items-center gap-2 text-sm text-muted">
          <span>
            By {post.user.first_name} {post.user.last_name}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="relative mt-6 aspect-[3/2] w-full overflow-hidden rounded-lg bg-subtle-accent">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className="mt-8 space-y-4 text-foreground [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.main_content }}
        />
      </article>
    </PageContainer>
  );
}
