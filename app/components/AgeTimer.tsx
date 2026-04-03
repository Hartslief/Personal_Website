"use client";

import { useEffect, useRef, useState } from "react";

const DOB = new Date("2002-10-10T00:00:00");
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

// Gets exact age at the moment of calling so that when the page loads it doesn't start at 0
function getExactAge(): string {
    const age = (Date.now() - DOB.getTime()) / MS_PER_YEAR; //
    const intPart = Math.floor(age);
    const decPart = (age - intPart).toFixed(16).slice(2);
    return `${intPart}.${decPart}`;
}

export default function AgeTimer() {
    const [age, setAge] = useState<string | null>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const tick = () => {
            setAge(getExactAge());
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current!);
    }, []);

    return age;
}
