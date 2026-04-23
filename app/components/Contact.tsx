import Link from "next/link";
import Reveal from "./Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faG } from "@fortawesome/free-solid-svg-icons";
import {
    faLinkedin,
    faXTwitter,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const links: { label: string; icon: IconDefinition; href: string }[] = [
    {
        label: "Email",
        icon: faEnvelope,
        href: "mailto:calebhartslief@gmail.com",
    },
    {
        label: "LinkedIn",
        icon: faLinkedin,
        href: "https://www.linkedin.com/in/caleb-hartslief-889b2720a",
    },
    {
        label: "Twitter / X",
        icon: faXTwitter,
        href: "https://x.com/calebhartslief",
    },
    {
        label: "GitHub",
        icon: faGithub,
        href: "http://github.com/Hartslief",
    },
];

export default function Contact() {
    return (
        <section id="contact" className="relative z-10 py-28 px-12">
            <div className="max-w-3xl mx-auto text-center">
                <Reveal>
                    <h2 className="font-display font-light text-[clamp(3rem,8vw,6.5rem)] leading-none tracking-[-0.04em] mb-6">
                        Let&apos;s{" "}
                        <em className="text-amber-600 italic font-serif">
                            work
                        </em>{" "}
                        together
                    </h2>
                    <p className="font-mono text-base text-[#888] mb-12 leading-relaxed">
                        Got a project in mind? I&apos;d love to hear about it.
                        <br />
                        Let&apos;s make something fun.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {links.map((link, i) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`font-mono text-sm text-ink no-underline px-6 py-3 rounded-full border border-[#444] transition-all duration-200 hover:bg-ink hover:text-dark inline-flex items-center gap-2 ${
                                    i % 2 === 0
                                        ? "hover:-rotate-2"
                                        : "hover:rotate-2"
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className="w-4 h-4"
                                />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
