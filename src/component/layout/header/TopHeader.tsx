// src/components/layout/TopHeader.tsx
"use client";

import { Box, Typography, Link, useTheme } from "@mui/material";

interface TopHeaderProps {
    message?: string; // optional top message
    links?: { label: string; href: string }[];
}

export default function TopHeader({ message, links = [] }: TopHeaderProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: theme.custom.colors.topHeader,
                px: 2,
                py: 0.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            {/* Left message */}
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "clamp(0.6rem, 1vw, 0.9rem)",
                    lineHeight: 1.4,
                    fontWeight: 400,
                }}
            >
                {message || "Free shipping on orders over $50!"}
            </Typography>


            {/* Right links */}
            <Box display="flex" gap={2}>
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        sx={{
                            color: theme.palette.primary.main,
                            fontSize: "clamp(0.6rem, 1vw, 0.9rem)",
                            fontWeight: 500,
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
            </Box>

        </Box>
    );
}
