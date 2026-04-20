"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="absolute w-full p-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex flex-row text-2xl font-bold">
                <div className="hover:text-[#ff0000]">C</div>
                <div className="hover:text-[#ff8700]">A</div>
                <div className="hover:text-[#ffd300]">L</div>
                <div className="hover:text-[#deff0a]">E</div>
                <div className="hover:text-[#a1ff0a]">B</div>
                <div className="hover:text-[#0aff99]">H</div>
                <div className="hover:text-[#0aefff]">A</div>
                <div className="hover:text-[#147df5]">R</div>
                <div className="hover:text-[#580aff]">T</div>
                <div className="hover:text-[#be0aff]">S</div>
                <div className="hover:text-[#580aff]">L</div>
                <div className="hover:text-[#147df5]">I</div>
                <div className="hover:text-[#0aefff]">E</div>
                <div className="hover:text-[#0aff99]">F</div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-4">
                <Link
                    href="/"
                    className="text-lg font-mono font-bold hover:text-red-500"
                >
                    Home
                </Link>
                |
                <Link
                    href="/blog"
                    className="text-lg font-mono font-bold hover:text-orange-400"
                >
                    Blogs
                </Link>
                |
                <Link
                    href="/about"
                    className="text-lg font-mono font-bold hover:text-yellow-400"
                >
                    About
                </Link>
            </nav>

            {/* Hamburger Button */}
            <button
                className="md:hidden flex flex-col gap-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white"></span>
                <span className="w-6 h-0.5 bg-white"></span>
            </button>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="absolute top-16 right-4 bg-black border border-gray-700 rounded-lg p-4 flex flex-col gap-3 md:hidden">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link href="/blog" onClick={() => setIsOpen(false)}>
                        Blogs
                    </Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                </div>
            )}
        </header>
    );
}
