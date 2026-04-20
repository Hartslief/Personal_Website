import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";

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
                <Navbar />
                {children}
            </body>
        </html>
    );
}
