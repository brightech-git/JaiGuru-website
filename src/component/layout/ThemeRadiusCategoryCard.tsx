"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    title: string;
    image: string;
    link: string;
    backgroundColor?:string ;// dynamic theme color key
}

const ThemeRadiusCategoryCard: React.FC<CategoryCardProps> = ({
    title,
    image,
    link,
    backgroundColor,
}) => {
    const theme = useTheme();
    const bg = backgroundColor || theme.custom.colors.subtleBlue;
    const contrastText = theme.palette.getContrastText(bg);
    return (
        <Box sx={{
            p:0.6,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: bg, // dynamic background
            "&:hover": {
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.custom.shadows.heavy,
                border: `1px solid ${theme.palette.text.primary}`,
                
            },}}> 
            <Box
                component={Link}
                href={link}
                sx={{
                    display: "block",
                    textDecoration: "none",
                    width: { xs: "80px", sm: "120px", md: "150px" },
                    margin: "0 6px",
                    overflow: "hidden",
                    boxShadow: theme.custom.shadows.medium,
                    borderRadius: theme.shape.borderRadius,
                    
                    transition:
                        "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                   
                }}
            >
                <Box sx={{ position: "relative", paddingTop: "100%", width: "100%" }}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </Box>
            </Box>

            {/* Title Section */}
            <Box
                sx={{
                    p: 0.5,
                    bgcolor: bg,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        color: contrastText || theme.palette.text.secondary,
                        fontWeight: 500,
                        fontSize: {
                            xs: theme.custom.fontSize?.small,
                            sm: theme.custom.fontSize?.medium,
                            md: theme.custom.fontSize?.larger,
                        },
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default ThemeRadiusCategoryCard;
