import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { Fraunces, DM_Mono } from "next/font/google";
import Cursor from "./components/Cursor";

const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
});

const dmMono = DM_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
});

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
        <html lang="en" className={`${fraunces.variable} ${dmMono.variable}`}>
            <body
                className={`antialiased text-ink overflow-x-hidden noise-overlay`}
            >
                <Cursor />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
