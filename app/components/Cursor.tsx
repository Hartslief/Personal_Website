"use client";

import { useEffect, useRef } from "react";

const DOT_SIZE = 12;
const RING_SIZE = 40;
const RING_SIZE_HOVER = 60;

export default function Cursor() {
    /* 
        Refs give us direct DOM access so we can mutate styles every animation
        frame without triggering React re-renders, which would be far too slow
        for smooth cursor movement. 
    */
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // A ref (not state) for the hover flag so the animation loop can read it without needing to be re-created every time it changes.
    const hovering = useRef(false);

    useEffect(() => {
        /* 
            mx/my: the true mouse position, updated instantly on every mousemove.
            rx/ry: the ring's current rendered position, which lerps toward mx/my
                   each frame to create the lagging "trailing" effect.
        */
        let mx = 0,
            my = 0;
        let rx = 0,
            ry = 0;
        let animId: number;

        // Capture the exact mouse position every time it moves.
        // We store it in plain variables (not state) to avoid re-renders.
        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
        };

        // Detect when the cursor enters or leaves an interactive element.
        // .closest() walks up the DOM tree, so hovering a child of a <a> still counts.
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            hovering.current = !!target.closest('a, button, [role="button"]');

            // Change dot colour immediately on hover — no need to wait for next frame.
            if (dotRef.current) {
                dotRef.current.style.background = hovering.current
                    ? "#3ddc84"
                    : "#ff5c35";
            }
            // Resize the ring immediately. CSS transition (set in className) smooths the width/height change so it doesn't jump.
            if (ringRef.current) {
                const size = hovering.current ? RING_SIZE_HOVER : RING_SIZE;
                ringRef.current.style.width = `${size}px`;
                ringRef.current.style.height = `${size}px`;
            }
        };

        const animate = () => {
            /* 
                Linear interpolation (lerp): move rx/ry 12% of the remaining distance
                toward mx/my each frame. This makes the ring ease toward the cursor
                rather than snapping, creating the satisfying lag effect.
                A factor of 1.0 would snap instantly; lower values lag more.
            */
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;

            // Position the dot using CSS transform instead of top/left.
            // Transform is GPU-accelerated and doesn't cause layout reflow.
            // We subtract half the element's size to center it on the cursor point, this is why DOT_SIZE/RING_SIZE constants must match the actual rendered size.
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mx - DOT_SIZE / 2}px, ${my - DOT_SIZE / 2}px)`;
            }
            if (ringRef.current) {
                // Use the current size for centering since it changes on hover.
                const size = hovering.current ? RING_SIZE_HOVER : RING_SIZE;
                ringRef.current.style.transform = `translate(${rx - size / 2}px, ${ry - size / 2}px)`;
            }

            // Schedule the next frame — this keeps the loop running at the display refresh rate (typically 60fps or 120fps) without a fixed setInterval.
            animId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        // Kick off the animation loop.
        animId = requestAnimationFrame(animate);

        // Cleanup: remove listeners and cancel the pending animation frame when the component unmounts to prevent memory leaks.
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            cancelAnimationFrame(animId);
        };
    }, []); // Empty deps array — this effect runs once on mount only.

    return (
        // pointer-events-none ensures the cursor elements don't intercept clicks or trigger their own mouseover events (which would cause feedback loops).
        <div className="fixed top-0 left-0 z-9999 pointer-events-none">
            {/* 
                Dot — snaps instantly to the mouse position each frame 
            */}
            <div
                ref={dotRef}
                style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    background: "#ff5c35",
                }}
                className="absolute top-0 left-0 rounded-full transition-colors duration-200"
            />

            {/* 
                Ring — lags behind via lerp for the trailing effect.
                Only width/height are CSS-transitioned (for the hover resize);
                position is handled entirely by JS transform for smoothness. 
            */}
            <div
                ref={ringRef}
                style={{ width: RING_SIZE, height: RING_SIZE }}
                className="absolute top-0 left-0 rounded-full border-2 border-pop3 transition-[width,height] duration-200"
            />
        </div>
    );
}
