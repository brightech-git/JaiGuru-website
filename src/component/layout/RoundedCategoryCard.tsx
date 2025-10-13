"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link"; // Corrected import
import Image from "next/image";

interface CategoryCardProps {
    title: string;
    image: string;
    link: string;
}

const RoundedCategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
    const theme = useTheme();
    return (
        <Box>
        <Box
            component={Link}
            href={link}
            gap={2}
            sx={{
                display: "block",
                textDecoration: "none",
                width: { xs: "80px", sm: "100px", md: "120px" },
                height: { xs: "80px", sm: "100px", md: "120px" },
                margin: "0 8px",
                overflow: "hidden",
                boxShadow: theme.custom.shadows.medium,
                borderRadius: "50%",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)", boxShadow: theme.custom.shadows.heavy },
            }}
        >
            <Box sx={{ position: "relative", paddingTop: "100%", width: "100%" }}>
                <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
            </Box>
            
        </Box>
        <Box sx={{ p: 1, bgcolor: theme.palette.background.paper, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: "0.8rem" }}>
                    {title}
                </Typography>
            </Box>
            </Box>
    );
};

export default RoundedCategoryCard;