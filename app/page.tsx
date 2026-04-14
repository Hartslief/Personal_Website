import { Metadata } from "next";
import AgeTimer from "./components/AgeTimer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home",
    description:
        "A personal portfolio showcasing my projects, skills, and experience in software development.",
    metadataBase: new URL("https://calebhartslief.co.za"),
};

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-row justify-center items-center gap-3 bg-white dark:bg-black">
                <div className="sm:text-xs lg:text-lg font-mono">I am </div>
                <div className="sm:text-xs lg:text-lg font-mono mouse select-none">
                    <AgeTimer />
                </div>
                <div className="sm:text-xs lg:text-lg font-mono">
                    years old.
                </div>
            </main>
            <Link href="/blog" className="text-lg font-mono hover:underline">
                Blogs
            </Link>
        </div>
    );
}
