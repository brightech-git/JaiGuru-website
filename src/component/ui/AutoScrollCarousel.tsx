"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Box } from "@mui/material";

interface AutoScrollCarouselProps {
    children: React.ReactNode;
    autoScrollSpeed?: number; // pixels per frame
    gap?: number | string;
}

export default function AutoScrollCarousel({
    children,
    autoScrollSpeed = 0.5,
    gap = 2,
}: AutoScrollCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Reset scroll position when content changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [children]);

    // Auto-scroll effect
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        let frameId: number;
        let animationSpeed = autoScrollSpeed;

        const scroll = () => {
            if (!container || isPaused || isDragging) {
                frameId = requestAnimationFrame(scroll);
                return;
            }

            container.scrollLeft += animationSpeed;

            // Check if we've scrolled past the content width
            // If so, reset to beginning for seamless loop
            if (container.scrollLeft >= content.scrollWidth) {
                container.scrollLeft = 0;
            }

            frameId = requestAnimationFrame(scroll);
        };

        frameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [autoScrollSpeed, isPaused, isDragging]);

    // Mouse drag handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;

        setIsDragging(true);
        setIsPaused(true);

        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);

        // Prevent text selection during drag
        e.preventDefault();
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        containerRef.current.scrollLeft = scrollLeft - walk;
    }, [isDragging, startX, scrollLeft]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        // Don't resume auto-scroll immediately after drag
        setTimeout(() => setIsPaused(false), 1000);
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            setTimeout(() => setIsPaused(false), 1000);
        }
    }, [isDragging]);

    // Touch drag handlers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!containerRef.current) return;

        setIsDragging(true);
        setIsPaused(true);

        const touch = e.touches[0];
        setStartX(touch.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const touch = e.touches[0];
        const x = touch.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    }, [isDragging, startX, scrollLeft]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
        setTimeout(() => setIsPaused(false), 1000);
    }, []);

    // Handle wheel events for manual scrolling
    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (!containerRef.current) return;

        // Pause auto-scroll when user manually scrolls
        setIsPaused(true);

        // Allow native wheel scrolling
        // The scroll event will happen naturally

        // Resume auto-scroll after a delay
        clearTimeout((window as any).scrollResumeTimeout);
        (window as any).scrollResumeTimeout = setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    }, []);

    return (
        <Box
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            sx={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                overflowY: "hidden",
                scrollBehavior: isDragging ? "auto" : "smooth",
                gap: gap,
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                padding: { xs: 1, sm: 2 },
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                // Prevent browser's default drag behavior
                "& > *": {
                    WebkitUserDrag: "none",
                    userDrag: "none",
                    flexShrink: 0,
                },
                // Smooth scrolling when not dragging
                ...(!isDragging && {
                    scrollBehavior: "smooth",
                }),
            }}
        >
            <Box
                ref={contentRef}
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: gap,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}   