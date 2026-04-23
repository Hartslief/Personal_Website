"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function Reveal({
    children,
    delay = 0,
    className = "",
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.transitionDelay = `${delay}ms`;
                    el.classList.add("opacity-100", "translate-y-0");
                    el.classList.remove("opacity-0", "translate-y-10");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`opacity-0 translate-y-10 transition-all duration-700 ${className}`}
        >
            {children}
        </div>
    );
}
