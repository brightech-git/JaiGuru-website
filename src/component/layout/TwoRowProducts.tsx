"use client";

import React from "react";
import { Box, Typography, Card, CardMedia, IconButton, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Product {
    name: string;
    image: string;
}

interface TwoRowProductsProps {
    title: string;
    products: Product[]; // Should be exactly 4
    backgroundColor?: string;
}

export default function TwoRowProducts({
    title,
    products,
    backgroundColor,
}: TwoRowProductsProps) {
    const theme = useTheme();
    const bg = backgroundColor || theme.palette.primary.main;

    return (
        <Box
            sx={{
                backgroundColor: bg,
                py: 2,
                px: 2,
                display: { xs: "block", sm: "none" }, 
            }}
        >
            {/* Header with title and right arrow */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.getContrastText(bg),
                        fontWeight: 600,
                        fontSize: theme.custom.fontSize?.larger || "0.75rem",
                    }}
                >
                    {title}
                </Typography>
                <IconButton
                    sx={{
                        color: theme.palette.getContrastText(bg),
                        p: 0.5,
                    }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* 2-row grid */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {products.slice(0, 4).map((product, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: "calc(50% - 8px)", // 2 per row with gap
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
