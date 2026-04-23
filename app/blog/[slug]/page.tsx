import type { Metadata } from "next";
import type { Post } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faTag,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchPost(slug);
    return {
        title: post?.title ?? "Post not found",
        description: post?.excerpt ?? "",
    };
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
        <main className="max-w-[740px] mx-auto px-6 py-32">
            {/* Back link */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#555] hover:text-pop1 no-underline transition-colors duration-200 mb-12 group"
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-1"
                />
                Back to posts
            </Link>

            {/* Cover image */}
            {post.coverImageUrl && (
                <div className="rounded-2xl overflow-hidden mb-10 border border-[#2a2a2a]">
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        width={740}
                        height={400}
                        className="w-full h-72 object-cover"
                    />
                </div>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {post.publishedAt && (
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#555]">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="w-3 h-3"
                        />
                        {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            },
                        )}
                    </div>
                )}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <FontAwesomeIcon
                            icon={faTag}
                            className="w-3 h-3 text-[#555]"
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
            </div>

            {/* Title */}
            <h1 className="font-display font-light text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight mb-10">
                {post.title}
            </h1>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-pop1 mb-10" />

            {/* Content — prose styles override defaults to match the dark theme */}
            <div
                className="
                    prose prose-invert max-w-none
                    prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:font-mono prose-p:text-[#bbb] prose-p:leading-relaxed prose-p:text-sm
                    prose-a:text-pop3 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-ink prose-strong:font-bold
                    prose-code:font-mono prose-code:text-pop2 prose-code:bg-[#1a1a1a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-[#2a2a2a] prose-pre:rounded-2xl prose-pre:text-sm
                    prose-blockquote:border-l-pop1 prose-blockquote:text-[#888] prose-blockquote:font-mono prose-blockquote:text-sm
                    prose-ul:text-[#bbb] prose-ol:text-[#bbb]
                    prose-li:font-mono prose-li:text-sm
                    prose-hr:border-[#2a2a2a]
                    prose-img:rounded-2xl prose-img:border prose-img:border-[#2a2a2a]
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </main>
    );
}
