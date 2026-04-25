"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faHouse,
    faBookOpen,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const NAV_LINKS = [
    {
        href: "/",
        label: "Home",
        icon: faHouse,
        hoverColor: "hover:text-red-500",
    },
    {
        href: "/blog",
        label: "Blogs",
        icon: faBookOpen,
        hoverColor: "hover:text-orange-400",
    },
    {
        href: "/about",
        label: "About",
        icon: faUser,
        hoverColor: "hover:text-yellow-400",
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-200 p-4 flex justify-between items-center bg-dark/80 backdrop-blur-md">
            {/* Logo */}
            <Link
                href="/"
                className="flex flex-row text-2xl font-bold font-display"
            >
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
            <nav className="hidden md:flex gap-4 items-center">
                {NAV_LINKS.map(({ href, label, hoverColor }, i) => (
                    <span key={href} className="inline-flex items-center gap-4">
                        {i > 0 && <span className="opacity-30">|</span>}
                        <Link
                            href={href}
                            className={`text-lg font-display font-bold ${hoverColor}`}
                        >
                            {label}
                        </Link>
                    </span>
                ))}
            </nav>

            {/* Hamburger button — animates to X when open */}
            <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#333] bg-[#1a1a1a] transition-colors duration-200 hover:border-pop1"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <FontAwesomeIcon
                    icon={isOpen ? faXmark : faBars}
                    className="w-4 h-4 transition-transform duration-200"
                />
            </button>

            {/* Mobile menu — full-width slide-down panel */}
            <div
                className={`
                    absolute top-full left-0 w-full md:hidden
                    bg-dark/80 backdrop-blur-md border-b border-[#2a2a2a]/50
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <nav className="flex flex-col px-6 py-4 gap-1">
                    {NAV_LINKS.map(({ href, label, icon, hoverColor }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`
                                flex items-center gap-4 px-4 py-3 rounded-2xl
                                font-display font-bold text-lg text-ink no-underline
                                transition-all duration-200 group
                                hover:bg-[#1a1a1a] ${hoverColor}
                            `}
                        >
                            {/* Icon with a subtle pop-colour circle background on hover */}
                            <span className="w-9 h-9 rounded-full bg-[#1a1a1a] group-hover:bg-[#2a2a2a] flex items-center justify-center shrink-0 transition-colors duration-200">
                                <FontAwesomeIcon
                                    icon={icon}
                                    className="w-4 h-4"
                                />
                            </span>
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom accent line */}
                <div className="h-0.5 bg-linear-to-r from-pop1 via-pop3 to-pop2 opacity-50" />
            </div>
        </header>
    );
}
