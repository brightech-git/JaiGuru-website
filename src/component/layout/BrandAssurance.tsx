"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import DiamondIcon from "@mui/icons-material/Diamond";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export interface AssuranceItem {
    icon: React.ReactNode;
    label: string;
}

export interface BrandAssuranceProps {
    assurances?: AssuranceItem[];
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    iconColor?: string;
    textColor?: string;
}

const BrandAssurance: React.FC<BrandAssuranceProps> = ({
    assurances = [
        { icon: <VerifiedIcon sx={{ fontSize: 20 }} />, label: "100% Authentic Jewellery" },
        { icon: <DiamondIcon sx={{ fontSize: 20 }} />, label: "BIS Hallmarked Gold" },
        { icon: <LockIcon sx={{ fontSize: 20 }} />, label: "Secure Payments" },
        { icon: <LocalShippingIcon sx={{ fontSize: 20 }} />, label: "Free & Insured Delivery" },
        { icon: <AutorenewIcon sx={{ fontSize: 20 }} />, label: "Lifetime Exchange" },
    ],
    backgroundColor,
    primaryColor,
    secondaryColor,
    accentColor,
    iconColor,
    textColor,
}) => {
    const theme = useTheme();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollIntervalRef = useRef<any>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [userScrolling, setUserScrolling] = useState(false);

    const enhancedAssurances = [...assurances ];

    const startAutoScroll = () => {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

        scrollIntervalRef.current = setInterval(() => {
            if (scrollContainerRef.current && !isPaused && !userScrolling) {
                const container = scrollContainerRef.current;
                container.scrollLeft += 1;

                if (container.scrollLeft >= container.scrollWidth / 1) {
                    container.scrollLeft = 0;
                }
            }
        }, 20);
    };

    // Track when the user manually scrolls (pause auto-scroll briefly)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setUserScrolling(true);
            clearTimeout((handleScroll as any).timeout);
            (handleScroll as any).timeout = setTimeout(() => {
                setUserScrolling(false);
            }, 1000); // resume auto-scroll 1s after user stops scrolling
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        startAutoScroll();
        return () => clearInterval(scrollIntervalRef.current);
    }, [isPaused, userScrolling]);

    // Use props colors or fallback to theme colors
    const getBackgroundColor = () => backgroundColor || theme.custom.colors.backgroundColor;
    const getPrimaryColor = () => primaryColor || theme.palette.primary.main;
    const getSecondaryColor = () => secondaryColor || theme.palette.secondary.main;
    const getAccentColor = () => accentColor || theme.palette.primary.light;
    const getIconColor = () => iconColor || theme.palette.primary.contrastText;
    const getTextColor = () => textColor || theme.palette.primary.main;

    return (
        <Box
            sx={{
                mt: 2,
                py: { xs: 3, md: 2 },
                px: { xs: 2, md: 4 },
                background: getBackgroundColor(),
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "#fff",
                    animation: "pulseBackground 8s ease-in-out infinite alternate",
                    "@keyframes pulseBackground": {
                        "0%": { opacity: 0.3 },
                        "100%": { opacity: 0.7 },
                    },
                }}
            />

            <Box
                ref={scrollContainerRef}
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    gap: 2,
                    py: 2,
                    px: 2,
                    cursor: "grab",
                    "&:active": { cursor: "grabbing" },
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    maxWidth: "100%",
                    mx:'auto',
                    justifyContent:{xs:'flex-start' ,sm:'flex-start', md:'center'}
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {enhancedAssurances.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: "0 0 auto",
                            width: { xs: 100, sm: 120, md: 180 },
                            textAlign: "center",
                            display: "flex",
                            justifyContent:'center',
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                            p: 2,
                            borderRadius: 4,
                            background: theme.palette.background.paper,
                            border: `2px solid ${getAccentColor()}40`,
                            boxShadow: theme.custom.shadows.medium,
                            transition: "all 0.4s ease",
                            animation: `slideIn 0.6s ease-out ${index * 0.1}s both`,
                            "&:hover": {
                                transform: "translateY(-8px) scale(1.05)",
                                boxShadow: theme.custom.shadows.heavy,
                                background: theme.custom.colors.secondaryBackgroundColor,
                                borderColor: getSecondaryColor(),
                            },
                            "@keyframes slideIn": {
                                "0%": { opacity: 0, transform: "translateX(-50px)" },
                                "100%": { opacity: 1, transform: "translateX(0)" },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                padding: { xs: 1, sm: 1.20, md: 1.80 },
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getSecondaryColor()})`,
                                color: getIconColor(),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                animation: "float 3s ease-in-out infinite",
                                "@keyframes float": {
                                    "0%, 100%": { transform: "translateY(0px)" },
                                    "50%": { transform: "translateY(-10px)" },
                                },
                            }}
                        >
                            {item.icon}
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                fontFamily: theme.custom.fonts.domine,
                                textAlign: "center",
                                lineHeight: 1.4,
                                fontSize: { xs: theme.custom.fontSize?.small, md: theme.custom.fontSize?.medium },
                                minHeight: 48,
                                display: "flex",
                                alignItems: "center",
                                background: `linear-gradient(45deg, ${getTextColor()}, ${getSecondaryColor()})`,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default BrandAssurance;