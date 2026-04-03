import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read my latest blog posts on software development, programming, and technology.",
    metadataBase: new URL("https://calebhartslief.co.za/blog"),
};

export default function Blog() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <title className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Blog
                </title>
            </main>
        </div>
    );
}
