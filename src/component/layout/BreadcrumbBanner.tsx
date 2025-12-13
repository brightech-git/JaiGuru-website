"use client";

import { Box, Typography, Breadcrumbs, Link, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface BreadcrumbBannerProps {
    title: string;
    image: string;
    breadcrumbs: { label: string; href?: string }[];
}

export default function BreadcrumbBanner({
    title,
    image,
    breadcrumbs,
}: BreadcrumbBannerProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                
                minHeight: { xs: "180px", sm: "240px", md: "400px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.common.white,
                overflow: "hidden",
                mt: 3,
            }}
        >
            {/* Background Image */}
            <Box
                component="img"
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    filter: "brightness(1)",
                }}
            />

            {/* Content Overlay */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                    px: 2,
                    maxWidth: "1200px",
                    width: "100%",
                }}
            >
                {/* Breadcrumbs */}
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" sx={{ color: "#fff" }} />}
                    aria-label="breadcrumb"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 1,
                        "& a": {
                            color: theme.palette.grey[200],
                            textDecoration: "none",
                            fontSize: theme.custom.fontSize?.medium,
                            "&:hover": { color: theme.palette.primary.light },
                        },
                    }}
                >
                 
                </Breadcrumbs>

            
        
            </Box>
        </Box>
    );
}
