import type { Metadata } from "next";
import type { Post } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read my latest blog posts on software development, programming, and technology.",
    metadataBase: new URL("https://calebhartslief.co.za/blog"),
};

// Use admin SDK on the server to call functions directly
async function fetchPosts(): Promise<Post[]> {
    const res = await fetch(
        `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/getPosts`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: {} }),
            next: { revalidate: 60 },
        },
    );

    if (!res.ok) {
        const text = await res.text();
        console.error("Firebase error:", res.status, text);
        throw new Error(`Failed to fetch posts: ${res.status} ${text}`);
    }
    const json = await res.json();
    return json.result;
}

export default async function BlogPage() {
    const posts = await fetchPosts();

    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            {posts.length === 0 ? (
                <p className="text-gray-500">No posts yet.</p>
            ) : (
                <div className="space-y-8">
                    {posts.map((post) => (
                        <article key={post.id}>
                            <Link href={`/blog/${post.slug}`}>
                                {post.coverImageUrl && (
                                    <Image
                                        src={post.coverImageUrl}
                                        alt={post.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />
                                )}
                                <h2 className="text-xl font-semibold hover:underline">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-gray-500 text-sm mt-1">
                                {post.publishedAt
                                    ? new Date(
                                          post.publishedAt,
                                      ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })
                                    : null}
                            </p>
                            <p className="text-gray-600 mt-2">{post.excerpt}</p>
                            <div className="flex gap-2 mt-3">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}
