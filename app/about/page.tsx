import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about my background, and my journey in software development.",
  metadataBase: new URL("https://calebhartslief.co.za/about"),
};

export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <title className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          About
        </title>
      </main>
    </div>
  );
}
