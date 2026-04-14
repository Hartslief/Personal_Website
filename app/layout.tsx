import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: {
        template: "%s | Caleb\s Portfolio",
        default: "Caleb\s Portfolio",
    },
    description:
        "A personal portfolio showcasing my projects, skills, and experience in software development.",
    metadataBase: new URL("https://calebhartslief.co.za"),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`$antialiased`}>
                <header className="absolute top-0 left-0 w-full p-4 flex justify-center">
                    <nav className="flex gap-4">
                        <Link
                            href="/"
                            className="text-lg font-mono hover:underline"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="text-lg font-mono hover:underline"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/about"
                            className="text-lg font-mono hover:underline"
                        >
                            About
                        </Link>
                    </nav>
                </header>
                {children}
            </body>
        </html>
    );
}
