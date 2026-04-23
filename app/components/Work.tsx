import Link from "next/link";
import Reveal from "./Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faNetworkWired,
    faHandHoldingHeart,
    faUmbrellaBeach,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Project {
    tag: string;
    name: string;
    description: string;
    icon: IconDefinition;
    gradient: string;
    href: string;
}

const projects: Project[] = [
    {
        tag: "Web Dev · 2025",
        name: "Urban Connect",
        description:
            "An ISP provider in South Africa connecting users to local FNO's for faster, more affordable internet. I was the lead developer, and worked as a fullstack generalist.",
        icon: faNetworkWired,
        gradient: "from-pop4 to-pop2",
        href: "https://urbanconnect.co.za/",
    },
    {
        tag: "Maintenance · 2024",
        name: "VisitZA",
        description:
            "Maintained and updated a holiday destination site for South Africa, built on WordPress. I implemented new features, optimized performance, and ensured the site stayed up-to-date and secure. I also comminicated directly with the client to understand their needs and provide solutions.",
        icon: faUmbrellaBeach,
        gradient: "from-pop1 to-pop3",
        href: "https://visitsouthafrica.co/",
    },
    {
        tag: "University · 2025",
        name: "Ndikhondinani Skills Development NPO",
        description:
            "I was the PM and lead developer for this outreach project. We built an android app to help the NPO sign-up students for their upskilling programs, and inform users about upcoming charity events.",
        icon: faHandHoldingHeart,
        gradient: "from-pop4 to-pop1",
        href: "https://calebhartslief.co.za/blog/ndikhondinani-skills-development",
    },
];

export default function Work() {
    return (
        <section id="work" className="relative z-10 py-28 px-12 bg-[#111]">
            <div className="max-w-275 mx-auto">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.15em] uppercase text-pop3 mb-4">
                        Selected work
                    </p>
                </Reveal>
                <Reveal delay={150}>
                    <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight mb-12">
                        Things I&apos;ve <em>worked on</em>
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <Reveal
                            key={project.name}
                            delay={i * 100}
                            className="h-full"
                        >
                            <div
                                className={`h-full flex flex-col bg-[#1a1a1a] rounded-3xl overflow-hidden border border-[#2a2a2a] transition-all duration-300 hover:-translate-y-2 ${
                                    i % 2 === 0
                                        ? "hover:-rotate-1"
                                        : "hover:rotate-1"
                                }`}
                            >
                                {/* Thumbnail */}
                                <div
                                    className={`h-56 shrink-0 flex items-center justify-center bg-linear-to-br ${project.gradient}`}
                                >
                                    <FontAwesomeIcon
                                        icon={project.icon}
                                        className="w-16 h-16 text-white drop-shadow-lg"
                                    />
                                </div>

                                {/* Body — flex-1 so it fills remaining height, flex col to pin link to bottom */}
                                <div className="p-7 flex flex-col flex-1">
                                    <p className="font-mono text-[0.7rem] tracking-widest uppercase text-[#888] mb-2">
                                        {project.tag}
                                    </p>
                                    <h3 className="font-display font-bold text-2xl tracking-tight mb-2 text-ink">
                                        {project.name}
                                    </h3>
                                    <p className="font-mono text-[0.82rem] text-[#aaa] leading-relaxed flex-1">
                                        {project.description}
                                    </p>
                                    <Link
                                        href={project.href}
                                        className="inline-flex items-center gap-2 mt-5 font-mono text-[0.8rem] text-pop3 no-underline group"
                                    >
                                        View case study
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
