import { Metadata } from "next";
import Reveal from "../components/Reveal";
import AgeTimer from "../components/AgeTimer";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn more about my background, and my journey in software development.",
    metadataBase: new URL("https://calebhartslief.co.za/about"),
};

const skills = [
    "React",
    "C#",
    "TypeScript",
    "REST APIs",
    "Azure",
    "Git & CI/CD",
    ".NET",
    "SQL",
];

export default function About() {
    return (
        <div className="max-w-275 mx-auto px-6 py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                {/* Image — unchanged */}
                <Reveal>
                    <div className="relative aspect-4/5 max-w-sm mx-auto md:max-w-none">
                        <div className="absolute inset-0 translate-x-4 -translate-y-4 bg-pop3 rounded-3xl z-0" />
                        <div className="relative z-10 w-full h-full rounded-3xl bg-linear-to-br from-[#1e1e1e] to-[#2a2a2a] border-2 border-[#333] flex flex-col items-center justify-center gap-3">
                            {/* Replace with <Image> when you have a real photo */}
                            <span className="font-mono text-xs text-[#555]">
                                photo coming soon
                            </span>
                        </div>
                    </div>
                </Reveal>

                {/* Terminal / JSON bio */}
                <Reveal delay={150}>
                    {/* Window chrome */}
                    <div className="rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-2xl">
                        {/* Title bar */}
                        <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                            <span className="font-mono text-xs text-[#555] ml-3">
                                caleb.json
                            </span>
                        </div>

                        {/* Code body */}
                        <div className="bg-#0d0d0d p-6 font-mono text-sm leading-7 overflow-x-auto">
                            {/* Line numbers + content */}
                            <table className="border-spacing-0 border-collapse w-full">
                                <tbody>
                                    <Line
                                        n={1}
                                        content={
                                            <>
                                                <Brace />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={2}
                                        content={
                                            <>
                                                <Key>name</Key>
                                                <Colon />
                                                <Str>Caleb Hartslief</Str>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={3}
                                        content={
                                            <>
                                                <Key>role</Key>
                                                <Colon />
                                                <Str>Software Developer</Str>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={4}
                                        content={
                                            <>
                                                <Key>age</Key>
                                                <Colon />
                                                <Num>
                                                    <AgeTimer />
                                                </Num>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={5}
                                        content={
                                            <>
                                                <Key>location</Key>
                                                <Colon />
                                                <Str>South Africa</Str>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={6}
                                        content={
                                            <>
                                                <Key>available</Key>
                                                <Colon />
                                                <Bool>true</Bool>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={7}
                                        content={
                                            <>
                                                <Key>interests</Key>
                                                <Colon />
                                                <Bracket />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={8}
                                        indent
                                        content={
                                            <>
                                                <Str>rugby</Str>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={9}
                                        indent
                                        content={
                                            <>
                                                <Str>the outdoors</Str>
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={10}
                                        indent
                                        content={
                                            <>
                                                <Str>building cool things</Str>
                                            </>
                                        }
                                    />
                                    <Line
                                        n={11}
                                        content={
                                            <>
                                                <CloseBracket />
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={12}
                                        content={
                                            <>
                                                <Key>skills</Key>
                                                <Colon />
                                                <Bracket />
                                            </>
                                        }
                                    />
                                    {skills.map((skill, i) => (
                                        <Line
                                            key={skill}
                                            n={13 + i}
                                            indent
                                            content={
                                                <>
                                                    <Str>{skill}</Str>
                                                    {i < skills.length - 1 && (
                                                        <Comma />
                                                    )}
                                                </>
                                            }
                                        />
                                    ))}
                                    <Line
                                        n={13 + skills.length}
                                        content={
                                            <>
                                                <CloseBracket />
                                                <Comma />
                                            </>
                                        }
                                    />
                                    <Line
                                        n={14 + skills.length}
                                        content={
                                            <>
                                                <Key>bio</Key>
                                                <Colon />
                                                <Str>
                                                    Just graduated, looking for
                                                    my first role.
                                                </Str>
                                            </>
                                        }
                                    />
                                    <Line
                                        n={15 + skills.length}
                                        content={
                                            <>
                                                <CloseBrace />
                                            </>
                                        }
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

/* ── Small syntax-highlight helpers ─────────────────────────────── */

function Line({
    n,
    content,
    indent = false,
}: {
    n: number;
    content: React.ReactNode;
    indent?: boolean;
}) {
    return (
        <tr className="group">
            {/* Line number */}
            <td className="select-none text-right pr-5 text-[#3a3a3a] group-hover:text-[#555] w-8 align-top transition-colors duration-150">
                {n}
            </td>
            {/* Code */}
            <td className={indent ? "pl-6" : ""}>{content}</td>
        </tr>
    );
}

function Key({ children }: { children: React.ReactNode }) {
    return <span className="text-pop4">&quot;{children}&quot;</span>;
}
function Str({ children }: { children: React.ReactNode }) {
    return <span className="text-pop2">&quot;{children}&quot;</span>;
}
function Num({ children }: { children: React.ReactNode }) {
    return <span className="text-pop3 tabular-nums">{children}</span>;
}
function Bool({ children }: { children: React.ReactNode }) {
    return <span className="text-pop1">{children}</span>;
}
function Colon() {
    return <span className="text-[#555]">: </span>;
}
function Comma() {
    return <span className="text-[#555]">,</span>;
}
function Brace() {
    return <span className="text-[#888]">{"{"}</span>;
}
function CloseBrace() {
    return <span className="text-[#888]">{"}"}</span>;
}
function Bracket() {
    return <span className="text-[#888]">[</span>;
}
function CloseBracket() {
    return <span className="text-[#888]">]</span>;
}
