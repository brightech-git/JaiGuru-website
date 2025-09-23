// src/components/layout/Banner.tsx
"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";
import Image from "next/image";

interface BannerProps {
    title: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
    imageUrl: string;
}

export default function Banner({
    title,
    subtitle,
    ctaLabel = "Shop Now",
    ctaHref = "#",
    imageUrl,
}: BannerProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: { xs: 220, sm: 350, md: 500 }, // responsive height
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: theme.custom.shadows.medium,
                mb: 4,
            }}
        >
            {/* Background Image */}
            <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                style={{ objectFit: "cover" }}
            />

            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    px: { xs: 2, sm: 4, md: 8 },
                }}
            >
                <Box maxWidth={{ xs: "80%", sm: "60%", md: "45%" }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: theme.palette.primary.contrastText,
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
                        }}
                    >
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.grey[200],
                                mb: 3,
                                fontSize: { xs: "0.9rem", md: "1.1rem" },
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}

                    {ctaLabel && (
                        <Button
                            href={ctaHref}
                            variant="contained"
                            color="secondary"
                            sx={{
                                px: { xs: 2, sm: 3 },
                                py: { xs: 1, sm: 1.2 },
                                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                                fontWeight: 600,
                                borderRadius: 2,
                            }}
                        >
                            {ctaLabel}
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
