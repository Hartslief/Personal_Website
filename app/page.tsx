import { Metadata } from "next";
import Link from "next/link";
import MarqueeStrip from "./components/Marquee";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faHand,
    faStar,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "Home",
    description:
        "A personal portfolio showcasing my projects, skills, and experience in software development.",
    metadataBase: new URL("https://calebhartslief.co.za"),
};

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="min-h-screen grid place-items-center relative overflow-hidden px-12 pt-32 pb-16">
                {/* Background blobs */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <div className="blob absolute w-105 h-105 bg-pop3/35 -top-20 -right-24 animate-float-1" />
                    <div className="blob absolute w-70 h-70 bg-pop4/30 bottom-16 -left-16 animate-float-2" />
                    <div className="blob-organic absolute w-40 h-40 bg-pop2/40 top-[40%] left-[20%] animate-float-3" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center font-mono text-xs tracking-[0.12em] uppercase bg-ink text-dark px-5 py-1.5 rounded-full mb-8 border border-[#333] animate-fade-down">
                        <FontAwesomeIcon
                            icon={faStar}
                            className="mr-2 w-3 h-3 text-pop1"
                        />
                        Available for work
                        <FontAwesomeIcon
                            icon={faStar}
                            className="ml-2 w-3 h-3 text-pop1"
                        />
                    </div>

                    <h1 className="font-display font-light text-[clamp(4rem,12vw,9rem)] leading-[0.92] tracking-[-0.04em] animate-fade-up-delay-1">
                        Software
                        <em className="block not-italic text-pop1">
                            Developer
                        </em>
                    </h1>

                    <p className="font-mono text-base text-[#aaa] mt-8 max-w-md mx-auto leading-relaxed animate-fade-up-delay-2">
                        I make things that look good, feel fun, and actually
                        work — from pixels to products.
                    </p>

                    <div className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-up-delay-3">
                        <Link
                            href="#work"
                            className="font-mono text-sm tracking-wide px-9 py-3.5 rounded-full bg-ink text-dark no-underline inline-flex items-center gap-2 shadow-[4px_4px_0_#ff5c35] hover:shadow-[6px_6px_0_#ff5c35] hover:-translate-y-1 transition-all duration-200"
                        >
                            See my work
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="w-3 h-3"
                            />
                        </Link>
                        <Link
                            href="#contact"
                            className="font-mono text-sm tracking-wide px-9 py-3.5 rounded-full border-2 border-[#444] text-ink no-underline inline-flex items-center gap-2 shadow-[4px_4px_0_#ffd166] hover:shadow-[6px_6px_0_#ffd166] hover:-translate-y-1 transition-all duration-200"
                        >
                            Say hello
                            <FontAwesomeIcon
                                icon={faHand}
                                className="w-3 h-3"
                            />
                        </Link>
                    </div>
                </div>
            </section>

            <MarqueeStrip />
            <Work />
            <Contact />
            <Footer />
        </main>
    );
}
