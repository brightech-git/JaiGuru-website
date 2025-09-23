"use client";

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    title: string;
    image: string;
    link: string;
}

const ThemeRadiusCategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Box>
            <Box
                component={Link}
                href={link}
                sx={{
                    display: "block",
                    textDecoration: "none",
                    width: { xs: "80px", sm: "120px", md: "150px" }, // Reduced sizes
                    margin: "0 6px", // Reduced margin for compactness
                    overflow: "hidden",
                    boxShadow: theme.custom.shadows.medium,
                    borderRadius: theme.shape.borderRadius,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: theme.custom.shadows.heavy,
                        border: `1px solid ${theme.palette.text.primary}`, // Visible border on hover
                    },
                }}
            >
                <Box sx={{ position: "relative", paddingTop: "100%", width: "100%" }}>
                    <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
                </Box>
            </Box>
            <Box sx={{ p: 0.5, bgcolor: theme.palette.background.paper, textAlign: "center" }}> {/* Reduced padding */}
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.primary,
                        fontSize: isExtraSmallScreen
                            ? theme.custom.fontSize?.small
                            : isSmallScreen
                                ? theme.custom.fontSize?.medium
                                : theme.custom.fontSize?.larger,
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default ThemeRadiusCategoryCard;