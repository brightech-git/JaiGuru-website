"use client";

import React from "react";
import { Box, Typography, Card, CardMedia, useTheme } from "@mui/material";

interface Product {
    name: string;
    image: string;
}

interface PremiumFindsProps {
    title: string;
    products: Product[];
    backgroundColor?: string; // optional, defaults to theme primary
}

export default function PremiumFinds({
    title,
    products,
    backgroundColor,
}: PremiumFindsProps) {
    const theme = useTheme();
    const bg = backgroundColor || theme.palette.primary.main;

    return (
        <Box
            sx={{
                backgroundColor: bg,
                borderRadius: theme.shape.borderRadius,
                py: 2,
                px: 1,
                display: { xs: "block", sm: "none" }, // only mobile
            }}
        >
            {/* Title */}
            <Typography
                variant="h6"
                sx={{
                    color: theme.palette.getContrastText(bg),
                    mb: 1,
                    px: 1,
                    fontWeight: 600,
                    fontSize: theme.custom.fontSize?.larger || "0.75rem",
                }}
            >
                {title}
            </Typography>

            {/* Horizontal scroll container with hidden scrollbar */}
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    pb: 1,
                    px: 1,
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                }}
            >
                {products.map((product, index) => (
                    <Card
                        key={index}
                        sx={{
                            minWidth: 120,
                            flex: "0 0 auto",
                            borderRadius: 2,
                            boxShadow: theme.custom.shadows.medium,
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{ height: 120, objectFit: "cover" }}
                        />
                        <Box
                            sx={{
                                backgroundColor: bg,
                                color: theme.palette.getContrastText(bg),
                                textAlign: "center",
                                py: 0.5,
                                fontSize: theme.custom.fontSize?.medium || "0.7rem",
                                fontWeight: 500,
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
