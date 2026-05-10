import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background blobs */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div className="blob absolute w-125 h-125 bg-pop1/20 -top-32 -right-32 animate-float-1" />
                <div className="blob absolute w-87.5 h-87.5 bg-pop4/15 bottom-0 -left-24 animate-float-2" />
                <div className="blob-organic absolute w-56 h-56 bg-pop3/15 top-[30%] left-[15%] animate-float-3" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Glitchy 404 */}
                <div className="relative select-none mb-4">
                    {/* Shadow layers for depth */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 font-display font-light text-[clamp(8rem,25vw,18rem)] leading-none tracking-[-0.04em] text-pop1/20 translate-x-2 translate-y-2"
                    >
                        404
                    </span>
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 font-display font-light text-[clamp(8rem,25vw,18rem)] leading-none tracking-[-0.04em] text-pop3/15 -translate-x-1 translate-y-1"
                    >
                        404
                    </span>
                    {/* Main number */}
                    <h1 className="font-display font-light text-[clamp(8rem,25vw,18rem)] leading-none tracking-[-0.04em] text-ink relative">
                        4<em className="not-italic text-pop1">0</em>4
                    </h1>
                </div>

                {/* Mono label */}
                <div className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-[#555] mb-6">
                    <span className="w-8 h-px bg-[#333]" />
                    Page not found
                    <span className="w-8 h-px bg-[#333]" />
                </div>

                {/* Message */}
                <p className="font-display font-light text-[clamp(1.2rem,3vw,2rem)] text-[#888] leading-snug tracking-tight mb-3 max-w-md">
                    Looks like this page took a{" "}
                    <em className="text-pop3 not-italic">wrong turn</em>{" "}
                    somewhere.
                </p>
                <p className="font-mono text-sm text-[#555] mb-12">
                    The URL might be broken, or the page may have been removed.
                </p>

                {/* Terminal hint */}
                <div className="font-mono text-xs text-left bg-dark border border-[#2a2a2a] rounded-2xl px-6 py-4 mb-12 w-full max-w-sm">
                    <span className="text-pop2">$</span>{" "}
                    <span className="text-[#666]">GET </span>
                    <span className="text-pop1 line-through opacity-60">
                        /{"{unknown}"}
                    </span>
                    <br />
                    <span className="text-pop3">→ </span>
                    <span className="text-[#666]">302 redirect to </span>
                    <span className="text-pop2">/</span>
                </div>

                {/* CTA */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-3 font-mono text-sm text-ink no-underline px-8 py-4 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] shadow-[4px_4px_0_#ff5c35] hover:shadow-[6px_6px_0_#ff5c35] hover:-translate-y-1 transition-all duration-200 group"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Take me home
                </Link>
            </div>
        </main>
    );
}
