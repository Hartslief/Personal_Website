"use client";

import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

export default function CursorWrapper() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const matches = window.matchMedia("(pointer: fine)").matches;
            console.log("pointer:fine matches:", matches);
            setShow(matches);
        }, 0);
    }, []);

    return show ? <CustomCursor /> : null;
}
