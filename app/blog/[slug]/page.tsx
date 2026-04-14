import type { Post } from "@/types/blog";
import Image from "next/image";
import { notFound } from "next/navigation";

async function fetchPost(slug: string): Promise<Post | null> {
    const res = await fetch(
        `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/getPost`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: { slug } }),
            next: { revalidate: 60 },
        },
    );

    if (res.status === 404) return null;
    if (!res.ok) {
        const text = await res.text();
        console.error("Firebase getPost error:", res.status, text);
        throw new Error(`Failed to fetch post: ${res.status} ${text}`);
    }
    const json = await res.json();
    return json.result;
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await fetchPost(slug);
    if (!post) notFound();

    return (
        <article className="max-w-3xl mx-auto py-12 px-4">
            {post.coverImageUrl && (
                <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-xl mb-8"
                />
            )}
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 text-sm mb-4">
                {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                      })
                    : null}
            </p>
            <div className="flex gap-2 mb-8">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
