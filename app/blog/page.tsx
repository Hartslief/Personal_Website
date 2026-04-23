import type { Metadata } from "next";
import type { Post } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faTag,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read my latest blog posts on software development, programming, and technology.",
    metadataBase: new URL("https://calebhartslief.co.za/blog"),
};

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
        <main className="max-w-[1100px] mx-auto px-6 py-32">
            {/* Header */}
            <div className="mb-16">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-pop1 mb-4">
                    Writing
                </p>
                <h1 className="font-display font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight">
                    My <em>thoughts</em>
                </h1>
            </div>

            {posts.length === 0 ? (
                /* Empty state styled as a terminal comment */
                <div className="font-mono text-sm text-[#555] border border-[#2a2a2a] rounded-2xl p-8 bg-[#0d0d0d]">
                    <span className="text-pop4">// </span>
                    No posts yet — check back soon.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className={`group flex flex-col bg-[#1a1a1a] rounded-3xl overflow-hidden border border-[#2a2a2a] transition-all duration-300 hover:-translate-y-2 no-underline ${
                                i % 2 === 0
                                    ? "hover:-rotate-1"
                                    : "hover:rotate-1"
                            }`}
                        >
                            {/* Cover image */}
                            {post.coverImageUrl ? (
                                <div className="h-48 shrink-0 overflow-hidden">
                                    <Image
                                        src={post.coverImageUrl}
                                        alt={post.title}
                                        width={600}
                                        height={300}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                /* Gradient placeholder when no cover image */
                                <div
                                    className={`h-48 shrink-0 bg-gradient-to-br ${
                                        [
                                            "from-pop1 to-pop3",
                                            "from-pop2 to-pop4",
                                            "from-pop4 to-pop1",
                                        ][i % 3]
                                    } flex items-center justify-center`}
                                >
                                    <span className="font-display italic text-white/40 text-4xl">
                                        {post.title.charAt(0)}
                                    </span>
                                </div>
                            )}

                            {/* Body */}
                            <div className="p-7 flex flex-col flex-1">
                                {/* Date */}
                                {post.publishedAt && (
                                    <div className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-[#555] mb-3">
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            className="w-3 h-3"
                                        />
                                        {new Date(
                                            post.publishedAt,
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                )}

                                {/* Title */}
                                <h2 className="font-display font-bold text-xl tracking-tight text-ink mb-3 leading-tight">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="font-mono text-[0.82rem] text-[#aaa] leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>

                                {/* Tags */}
                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <FontAwesomeIcon
                                            icon={faTag}
                                            className="w-3 h-3 text-[#555] mt-0.5 shrink-0"
                                        />
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-[0.7rem] text-[#888] border border-[#333] px-2 py-0.5 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Read more */}
                                <div className="inline-flex items-center gap-2 mt-5 font-mono text-[0.8rem] text-pop3 group/link">
                                    Read post
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
