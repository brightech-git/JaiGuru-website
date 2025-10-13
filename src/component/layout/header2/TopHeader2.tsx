// src/components/layout/TopHeader2.tsx
"use client";

import { Box, Typography, Link, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface TopHeader2Props {
    labels: { label: string; href: string }[]; // multiple labels
    interval?: number; // optional, time in ms for rotation
}

export default function TopHeader2({ labels, interval = 2000 }: TopHeader2Props) {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Rotate the label index
    useEffect(() => {
        if (labels.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % labels.length);
        }, interval);

        return () => clearInterval(timer);
    }, [labels, interval]);

    if (labels.length === 0) return null;

    const currentLabel = labels[currentIndex];

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: theme.custom.colors.topHeader,
                px: 0.5,
                py: 0.5,
                display: "flex",
                justifyContent: "center", // center the current label
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Link
                href={currentLabel.href}
                sx={{
                    color: theme.palette.primary.main,
                    fontSize: "clamp(0.7rem, 1vw, 0.95rem)",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                }}
            >
                {currentLabel.label}
            </Link>
        </Box>
    );
}
