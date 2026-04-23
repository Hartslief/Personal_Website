import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const items = [
    "React",
    "C#",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "REST APIs",
    "Azure",
    "Git & CI/CD",
    ".NET",
    "Firebase",
    "SQL",
];

// Duplicate once — we animate translateX(-50%) so one full copy scrolls off-screen, then the animation loops back seamlessly to the start.
const looped = [...items, ...items];

export default function MarqueeStrip() {
    return (
        <div
            className="bg-ink text-dark py-4 overflow-hidden relative z-10 border-t border-b border-[#222]"
            aria-hidden="true"
        >
            <div className="marquee-track">
                {looped.map((item, i) => (
                    // Each item is a flex row: star · text. Gap between items is handled by the `gap-10` on the parent marquee-track in globals.css.
                    <span
                        key={i}
                        className="inline-flex items-center gap-3 whitespace-nowrap"
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className="w-3 h-3 text-pop1 shrink-0"
                        />
                        <span className="font-display italic text-lg">
                            {item}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}
