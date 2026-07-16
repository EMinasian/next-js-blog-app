import { PostType } from "../app/types";
import Image from "next/image";
import Link from "next/link";

export default function ListItem({ post }: { post: PostType }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-md"
    >
      <article>
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-subtle-accent">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-1 p-4">
          <h2 className="font-serif text-lg font-semibold leading-snug text-foreground">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="text-sm text-muted">{post.subtitle}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
