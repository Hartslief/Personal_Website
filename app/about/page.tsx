import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn more about my background, and my journey in software development.",
    metadataBase: new URL("https://calebhartslief.co.za/about"),
};

export default function About() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
                <title>About</title>
                <p>Hello</p>
            </main>
        </div>
    );
}
