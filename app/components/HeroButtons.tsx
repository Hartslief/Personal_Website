"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHand } from "@fortawesome/free-solid-svg-icons";

export default function HeroButtons() {
    return (
        <div className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-up-delay-3">
            <button
                onClick={() =>
                    document
                        .getElementById("work")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-mono text-sm tracking-wide px-9 py-3.5 rounded-full bg-ink text-dark no-underline inline-flex items-center gap-2 shadow-[4px_4px_0_#ff5c35] hover:shadow-[6px_6px_0_#ff5c35] hover:-translate-y-1 transition-all duration-200"
            >
                See my work
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </button>

            <button
                onClick={() =>
                    document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-mono text-sm tracking-wide px-9 py-3.5 rounded-full border-2 border-[#444] text-ink no-underline inline-flex items-center gap-2 shadow-[4px_4px_0_#ffd166] hover:shadow-[6px_6px_0_#ffd166] hover:-translate-y-1 transition-all duration-200"
            >
                Say hello
                <FontAwesomeIcon icon={faHand} className="w-3 h-3" />
            </button>
        </div>
    );
}
