import AgeTimer from "./components/AgeTimer";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-row items-center gap-3 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="text-lg font-mono">I am </div>
        <div className="text-lg font-mono">
          <AgeTimer />
        </div>
        <div className="text-lg font-mono">years old.</div>
      </main>
    </div>
  );
}
