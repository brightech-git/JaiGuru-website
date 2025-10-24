// src/components/HorizontalMasonryGallery.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { Box, Typography, useTheme, Link as MuiLink } from "@mui/material";

interface GalleryItem {
    id: string | number;
    image: string;
    title: string;
    link?: string;
}

interface HorizontalMasonryGalleryProps {
    items: GalleryItem[];
    height?: number;
    backgroundImage?: string;
}

const HorizontalMasonryGallery: React.FC<HorizontalMasonryGalleryProps> = ({
    items,
    height = 600,
    backgroundImage,
}) => {
    const theme = useTheme();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Enable drag-to-scroll on desktop (mouse hold + move)
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            scrollContainer.classList.add("dragging");
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            scrollContainer.classList.remove("dragging");
        };

        const handleMouseUp = () => {
            isDown = false;
            scrollContainer.classList.remove("dragging");
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1.2; // scroll speed
            scrollContainer.scrollLeft = scrollLeft - walk;
        };

        scrollContainer.addEventListener("mousedown", handleMouseDown);
        scrollContainer.addEventListener("mouseleave", handleMouseLeave);
        scrollContainer.addEventListener("mouseup", handleMouseUp);
        scrollContainer.addEventListener("mousemove", handleMouseMove);

        return () => {
            scrollContainer.removeEventListener("mousedown", handleMouseDown);
            scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
            scrollContainer.removeEventListener("mouseup", handleMouseUp);
            scrollContainer.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    if (items.length < 6) {
        console.warn("This gallery expects at least 6 items for proper layout.");
    }

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                background:backgroundImage ?'none':theme.custom.colors.addtoCart,
                py: theme.spacing(4),
            }}
        >
            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: { xs: 2, md: 3 },
                    alignItems: "center",
                    scrollBehavior: "smooth",
                    px: theme.spacing(2),
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE/Edge
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                    cursor: "grab",
                    "&.dragging": { cursor: "grabbing" },
                    userSelect: "none",
                }}
            >
                {/* Item 1: Full height */}
                {items[0] && (
                    <Box
                        sx={{
                            height: { xs: 500, md: height },
                            width: { xs: 300, md: 400 },
                            flexShrink: 0,
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: theme.custom?.shadows?.medium || theme.shadows[3],
                        }}
                    >
                        <MuiLink href={items[0].link || "#"} underline="none">
                            <img
                                src={items[0].image}
                                alt={items[0].title}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    position: "absolute",
                                    bottom: theme.spacing(1),
                                    left: theme.spacing(1),
                                    color: "#fff",
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    px: 1,
                                    borderRadius: 1,
                                }}
                            >
                                {items[0].title}
                            </Typography>
                        </MuiLink>
                    </Box>
                )}

                {/* Items 2 & 3 */}
                <Box display="flex" flexDirection="column" gap={0}>
                    {[items[1], items[2]].map(
                        (item, idx) =>
                            item && (
                                <Box
                                    key={idx}
                                    sx={{
                                        height: { xs: 250, md: height / 2.05 },
                                        width: { xs: 230, md: 300 },
                                        flexShrink: 0,
                                        position: "relative",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        my: { xs: theme.spacing(0.3), md: theme.spacing(1) },
                                        boxShadow: theme.custom?.shadows?.light || theme.shadows[1],
                                    }}
                                >
                                    <MuiLink href={item.link || "#"} underline="none">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                position: "absolute",
                                                bottom: theme.spacing(0.5),
                                                left: theme.spacing(0.5),
                                                color: "#fff",
                                                backgroundColor: "rgba(0,0,0,0.4)",
                                                px: 0.5,
                                                borderRadius: 1,
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </MuiLink>
                                </Box>
                            )
                    )}
                </Box>

                {/* Item 4 */}
                {items[3] && (
                    <Box
                        sx={{
                            height: { xs: 500, md: height },
                            width: { xs: 300, md: 400 },
                            flexShrink: 0,
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: theme.custom?.shadows?.medium || theme.shadows[3],
                        }}
                    >
                        <MuiLink href={items[3].link || "#"} underline="none">
                            <img
                                src={items[3].image}
                                alt={items[3].title}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    position: "absolute",
                                    bottom: theme.spacing(1),
                                    left: theme.spacing(1),
                                    color: "#fff",
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    px: 1,
                                    borderRadius: 1,
                                }}
                            >
                                {items[3].title}
                            </Typography>
                        </MuiLink>
                    </Box>
                )}

                {/* Items 5 & 6 */}
                <Box display="flex" flexDirection="column" gap={0}>
                    {[items[4], items[5]].map(
                        (item, idx) =>
                            item && (
                                <Box
                                    key={idx}
                                    sx={{
                                        height: { xs: 250, md: height / 2.05 },
                                        width: { xs: 230, md: 300 },
                                        flexShrink: 0,
                                        position: "relative",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        my: { xs: theme.spacing(0.3), md: theme.spacing(1) },
                                        boxShadow: theme.custom?.shadows?.light || theme.shadows[1],
                                    }}
                                >
                                    <MuiLink href={item.link || "#"} underline="none">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                position: "absolute",
                                                bottom: theme.spacing(0.5),
                                                left: theme.spacing(0.5),
                                                color: "#fff",
                                                backgroundColor: "rgba(0,0,0,0.4)",
                                                px: 0.5,
                                                borderRadius: 1,
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </MuiLink>
                                </Box>
                            )
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default HorizontalMasonryGallery;
