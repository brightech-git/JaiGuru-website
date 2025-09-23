"use client";

import React from "react";
import { Box, Typography, Card, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

interface Product {
    name: string;
    image: string;
}

interface LargeScreenBannerProps {
    title?: string; // Optional title
    products: Product[]; // Exactly 4 products
    banner: { image: string; alt?: string };
    backgroundColor?: string;
}

export default function LargeScreenBanner2({
    title,
    products,
    banner,
    backgroundColor,
}: LargeScreenBannerProps) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
    const bg = backgroundColor || theme.palette.background.default;

    if (!isLargeScreen) return null;

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                width: "100%",
                mb: 6,
                px: 2,
            }}
        >
            {/* Left Product Grid */}
           

           
            <Box
                sx={{
                    width: "70%",
                    position: "relative",
                    aspectRatio: "2 / 1",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: theme.custom.shadows.medium,
                }}
            >
                <Image
                    src={banner.image}
                    alt={banner.alt || "Banner"}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </Box>

            {/* Right Banner */}
            <Box
                sx={{
                    width: "30%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: title ? "auto 1fr 1fr" : "1fr 1fr", // Title + 2 rows of products
                    gap: 2,
                    backgroundColor: bg,
                    borderRadius: 2,
                    p: 2,
                }}
            >
                {title && (
                    <Typography
                        sx={{
                            gridColumn: "span 2",
                            fontWeight: 600,
                            fontSize: theme.custom.fontSize?.larger,
                            mb: 0, // Remove extra margin
                        }}
                    >
                        {title}
                    </Typography>
                )}

                {products.slice(0, 4).map((product, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            borderRadius: 2,
                            boxShadow: theme.custom.shadows.medium,
                            aspectRatio: "1 / 1", // Make it square
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <Box
                            sx={{
                                textAlign: "center",
                                py: 0.5,
                                fontSize: theme.custom.fontSize?.medium,
                                fontWeight: 500,
                                color: theme.palette.getContrastText(bg),
                            }}
                        >
                            {product.name}
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
