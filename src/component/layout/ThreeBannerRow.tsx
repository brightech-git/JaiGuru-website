"use client";

import React from 'react';
import { Box, Typography, Button, SxProps, Theme } from "@mui/material";
import Image from "next/image";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Interface for banner items with additional properties for content
interface BannerItem {
    src: string;
    alt?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

// Props interface for the component
interface ThreeBannerRowProps {
    images: BannerItem[];
    height?: { xs?: number; sm?: number; md?: number; lg?: number };
    gap?: number;
    sx?: SxProps<Theme>;
}

export default function ThreeBannerRow({
    images,
    height = { xs: 200, sm: 250, md: 350, lg: 400 },
    gap = 3,
    sx,
}: ThreeBannerRowProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: gap,
                width: '100%',
                flexWrap: 'nowrap',
                py: 4,
                px: { xs: 2, md: 4 },
                backgroundColor: theme.custom.colors.subtleBlue,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.custom.shadows.light,
                overflow: 'visible', // Ensure no clipping of content
                ...sx,
            }}
            className="w-full"
        >
            {images.slice(0, 3).map((img, index) => (
                <Box
                    key={index}
                    sx={{
                        flex: isMobile ? '0 0 100%' : '1 1 33.33%',
                        position: 'relative',
                        borderRadius: theme.shape.borderRadius,
                        overflow: 'hidden',
                        height: { xs: height.xs, sm: height.sm, md: height.md, lg: height.lg },
                        mb: isMobile && index < 2 ? gap : 0,
                        minWidth: 0,
                        aspectRatio: isMobile ? '16/9' : 'auto', // Maintain aspect ratio on mobile
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: theme.custom.shadows.heavy,
                        },
                    }}
                    className="group"
                >
                    {/* Image */}
                    <Image
                        src={img.src}
                        alt={img.alt || `Banner ${index + 1}`}
                        width={1200} // Provide fallback dimensions
                        height={675} // Maintain 16:9 aspect ratio
                        sizes="(max-width: 600px) 100vw, 33vw"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        priority={index === 0} // Prioritize first image
                        className="transition-opacity duration-300 group-hover:opacity-95"
                    />
                    {/* Content Overlay */}
                    {(img.title || img.subtitle || img.buttonText) && (
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: isMobile ? 'center' : 'flex-start',
                                textAlign: isMobile ? 'center' : 'left',
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                                p: { xs: 2, md: 3 },
                                color: theme.palette.common.white,
                            }}
                        >
                            {img.title && (
                                <Typography
                                    variant={isMobile ? 'h6' : 'h5'}
                                    sx={{
                                        fontFamily: theme.custom.fonts.special,
                                        mb: 1,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {img.title}
                                </Typography>
                            )}
                            {img.subtitle && (
                                <Typography
                                    variant={isMobile ? 'body2' : 'body1'}
                                    sx={{ mb: 2, maxWidth: '80%' }}
                                >
                                    {img.subtitle}
                                </Typography>
                            )}
                            {img.buttonText && img.buttonLink && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href={img.buttonLink}
                                    sx={{
                                        px: 3,
                                        py: 1,
                                        fontFamily: theme.typography.button.fontFamily,
                                        backgroundColor: theme.custom.colors.highlight,
                                        color: theme.palette.text.primary,
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.dark,
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {img.buttonText}
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
}