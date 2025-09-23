"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";
import Image from "next/image";

interface CardBanner {
    image: string;
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

interface FullWidthBannerProps {
    backgroundImage: string;
    cards: CardBanner[]; // Expecting 3 cards
    height?: number;
    backgroundColor?: string; // Optional overlay background color
}

export default function FullWidthBanner({
    backgroundImage,
    cards,
    height = 400,
    backgroundColor,
}: FullWidthBannerProps) {
    const theme = useTheme();
    const overlayBg = backgroundColor || "rgba(0,0,0,0.15)";

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: height,
                overflow: "hidden",
                borderRadius: 2,
                display: { xs: "none", md: "block" }, // Only for larger screens
                mb: 2,
            }}
        >
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt="Banner Background"
                fill
                style={{ objectFit: "cover" }}
                priority
            />

            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, ${overlayBg} 0%, rgba(0,0,0,0.6) 100%)`,
                }}
            />

            {/* Cards Container */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: { md: 32 },
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-evenly",
                    px: { md: 8 },
                    gap: 3,
                }}
            >
                {cards.slice(0, 3).map((card, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: "30%",
                            bgcolor: "rgba(255,255,255,0.95)",
                            borderRadius: 3,
                            p: 2,
                            textAlign: "center",
                            boxShadow: theme.shadows[5],
                        }}
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            width={500}
                            height={500}
                            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                mt: 1,
                                fontWeight: 600,
                                fontSize: { md: "1.25rem" },
                            }}
                        >
                            {card.title}
                        </Typography>
                        {card.subtitle && (
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.5,
                                    color: theme.palette.text.secondary,
                                    fontSize: { md: "1rem" },
                                }}
                            >
                                {card.subtitle}
                            </Typography>
                        )}
                        {card.ctaText && card.ctaLink && (
                            <Button
                                href={card.ctaLink}
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 1, px: 2, py: 1 }}
                            >
                                {card.ctaText}
                            </Button>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
