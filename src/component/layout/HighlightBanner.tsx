"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

interface Product {
    name: string;
    image: string;
    link: string;
}

interface HighlightBannerProps {
    title: string;
    body: string;
    products: Product[];
    backgroundColor?: string;
}

export default function HighlightBanner({
    title,
    body,
    products,
    backgroundColor,
}: HighlightBannerProps) {
    const theme = useTheme();
    const bg = backgroundColor || theme.custom.colors.subtleBlue;

    // ✅ auto-calculate best contrast text color (white or dark)
    const contrastText = theme.palette.getContrastText(bg);

    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 3, md: 6 },
                px: { xs: 2, md: 6 },
                backgroundColor: bg,
                borderRadius: 3,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: { xs: 3, sm: 5, md: 10, lg: 10 },
                color: contrastText, // ✅ apply contrast color globally
            }}
        >
            {/* Left Section - Text */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        fontFamily: theme.custom.fonts.special,
                        fontSize: {
                            xs: theme.custom.fontSize?.medium,
                            sm: theme.custom.fontSize?.larger,
                            md: theme.custom.fontSize?.title,
                        },
                        lineHeight: 1.3,
                        color: contrastText, // ✅ ensures readable text
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: {
                            xs: theme.custom.fontSize?.small,
                            sm: theme.custom.fontSize?.medium,
                            md: theme.custom.fontSize?.larger,
                        },
                        lineHeight: 1.6,
                        color: contrastText, // ✅ also uses contrast
                        maxWidth: 500,
                    }}
                >
                    {body}
                </Typography>
            </Box>

            {/* Right Section - 3 Images */}
            <Box
                sx={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                    justifyItems: "center",
                    alignItems: "center",
                }}
            >
                {products.slice(0, 3).map((p, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        {/* Image */}
                        <Box
                            component="a"
                            href={p.link}
                            sx={{
                                width: { xs: 90, sm: 120, md: 150, lg: 180 },
                                height: { xs: 100, sm: 140, md: 180, lg: 220 },
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: theme.custom.shadows.medium,
                                position: "relative",
                                transition: "transform 0.3s ease",
                                "&:hover": { transform: "translateY(-4px)" },
                            }}
                        >
                            <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </Box>

                        {/* Title */}
                        <Typography
                            sx={{
                                mt: 1,
                                fontWeight: 500,
                                fontSize: {
                                    xs: theme.custom.fontSize?.small,
                                    sm: theme.custom.fontSize?.medium,
                                    md: theme.custom.fontSize?.larger,
                                },
                                color: contrastText, // ✅ ensures readable text
                            }}
                        >
                            {p.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
