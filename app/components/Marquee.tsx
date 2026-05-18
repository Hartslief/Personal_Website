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

// We render TWO identical copies of the item list inside a single animated
// wrapper. The animation moves the wrapper left by exactly 50% of its width
// (i.e. one full copy). When the first copy scrolls off-screen the second
// copy is pixel-perfectly in its place, so the loop is invisible.
const Track = () => (
    <ul className="marquee-track" aria-hidden="true">
        {items.map((item, i) => (
            <li
                key={i}
                className="inline-flex items-center gap-3 whitespace-nowrap list-none"
            >
                <FontAwesomeIcon
                    icon={faStar}
                    className="w-3 h-3 text-pop1 shrink-0"
                />
                <span className="font-display italic text-lg">{item}</span>
            </li>
        ))}
    </ul>
);

export default function MarqueeStrip() {
    return (
        <div
            className="bg-ink text-dark py-4 overflow-hidden relative z-10 border-t border-b border-[#222]"
            aria-label="Skills"
        >
            {/* marquee-wrapper animates; two identical Track copies inside */}
            <div className="marquee-wrapper">
                <Track />
                <Track />
            </div>
        </div>
    );
}
