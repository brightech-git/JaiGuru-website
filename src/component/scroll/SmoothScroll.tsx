"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1, // Smooth duration (tune this)
            lerp: 0.1, // Lower = smoother, higher = snappier
            wheelMultiplier: 1, // reduce scroll speed
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <div>{children}</div>;
}