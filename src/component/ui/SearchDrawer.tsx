// src/components/ui/SearchDrawer.tsx
"use client";

import { useEffect, useRef } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Grid,
    Card,
    CardMedia,
    Chip
} from "@mui/material";
import { Close, Star, LocalFireDepartment ,Search } from "@mui/icons-material";
import { gsap } from "gsap";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import TransitionWrapper from "../transition/SmoothSection";
import TransitionSectionWrapper from "../transition/TransitionWrapper";

interface SearchPanelProps {
    open: boolean;
    onClose: () => void;
    popularSearches: string[];
    recommended: { id: number; title: string; image: string; link: string }[];
    trigger?: boolean | undefined;
}

export default function SearchPanel({
    open,
    onClose,
    popularSearches,
    recommended,
    trigger
}: SearchPanelProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
    const router = useRouter();

    // Simplified GSAP animations
    useEffect(() => {
        if (open && drawerRef.current) {
            if (isLargeScreen) {
                // Desktop: simple fade in
                gsap.fromTo(
                    drawerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: "power2.out" }
                );
            } else {
                // Mobile: simple slide up
                gsap.fromTo(
                    drawerRef.current,
                    { y: "100%" },
                    { y: 0, duration: 0.3, ease: "power2.out" }
                );
            }
        }
    }, [open, isLargeScreen]);

    const handleItemClick = (link?: string) => {
        if (link) {
            router.push(link);
        }
        onClose();
    };

    const handleCloseWithAnimation = () => {
        if (drawerRef.current) {
            if (isLargeScreen) {
                // Desktop: fade out
                gsap.to(drawerRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: onClose
                });
            } else {
                // Mobile: slide down
                gsap.to(drawerRef.current, {
                    y: "100%",
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: onClose
                });
            }
        } else {
            onClose();
        }
    };

    const content = (
        <Box
            ref={drawerRef}
            sx={{
                p: 2,
                bgcolor: "background.paper",
                width: "100%",
                height: "100%",
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                display: "flex",
                flexDirection: "column",
                background: theme.palette.background.default,
            }}
        >
            {/* Compact Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
            >
               
                    <Box display="flex" alignItems="center"  gap={1}>
                        <Search sx={{
                            color: theme.palette.primary.main,
                            fontSize: 24,
                        }} />
                        <Typography
                            variant="h5"
                           sx={{
                            background:theme.custom.colors.addtoCart,
                            backgroundClip:'text',
                           }}
                        >
                            Search Products
                        </Typography>
                    </Box>
              

                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClose();
                    }}
                    sx={{
                        color: theme.palette.primary.main,
                        backgroundColor: theme.palette.background.paper,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                            color: 'white',
                        },
                        transition: 'all 0.2s ease',
                        width: 40,
                        height: 40,
                    }}
                    size="small"
                >
                    <Close fontSize="small" />
                </IconButton>
            </Box>

            {/* Mobile Search Bar */}
            <Box sx={{ mb: 3, display: { xs: "block", md: "none" } }}>
                <SearchBar
                    placeholder="Search for products..."
                />
            </Box>

            {/* Compact Popular Searches with Auto Scroll */}
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Box display="flex" alignItems="center" gap={1} sx={{ mb: { xs: 1.5, md: 2 } }}>
                    <LocalFireDepartment sx={{
                        color: theme.palette.secondary.main,
                        fontSize: { xs: 18, md: 20 }
                    }} />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontFamily: theme.custom.fonts.domine,
                            fontSize: { xs: theme.custom.fontSize?.medium, md: theme.custom.fontSize?.larger },
                        }}
                    >
                        Popular Searches
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        mx: { xs: -1, md: 0 }, // Negative margin for better edge alignment
                    }}
                >
                    <Box
                        className="popular-scroll-container"
                        sx={{
                            display: 'flex',
                            gap: { xs: 1, md: 1.5 },
                            padding: { xs: 1, md: 2 },
                            width: 'max-content',
                            animation: 'scrollPopular 40s linear infinite',
                            '@keyframes scrollPopular': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' }
                            },
                            '&:hover': {
                                animationPlayState: 'paused',
                            },
                            // Enable manual scrolling
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                            WebkitOverflowScrolling: 'touch',
                            cursor: 'grab',
                            '&:active': {
                                cursor: 'grabbing',
                            }
                        }}
                    >
                        {[...popularSearches, ...popularSearches].map((term, index) => (
                            <Chip
                                key={`${term}-${index}`}
                                label={term}
                                onClick={() => handleItemClick()}
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: "20px",
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 0.5, md: 1 },
                                    fontSize: { xs: '0.7rem', md: theme.custom.fontSize?.small },
                                    transition: "all 0.2s ease",
                                    whiteSpace: "nowrap",
                                    backgroundColor: theme.custom.colors.cardBackgroundColor,
                                    border: `1px solid ${theme.palette.divider}`,
                                    minWidth: 'auto',
                                    flexShrink: 0,
                                    "&:hover": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        backgroundColor: theme.palette.primary.light + '20',
                                        transform: "scale(1.05)",
                                    },
                                }}
                                size="small"
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Compact Recommended for You with Auto Scroll */}
            <Box>
                <Box display="flex" alignItems="center" gap={1} sx={{ mb: { xs: 1.5, md: 2 } }}>
                    <Star sx={{
                        color: theme.palette.warning.main,
                        fontSize: { xs: 18, md: 20 }
                    }} />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontFamily: theme.custom.fonts.domine,
                            fontSize: { xs: theme.custom.fontSize?.medium, md: theme.custom.fontSize?.larger },
                        }}
                    >
                        Recommended for You
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        mx: { xs: -1, md: 0 }, // Negative margin for better edge alignment
                        flex: 1,
                    }}
                >
                    <Box
                        className="recommended-scroll-container"
                        sx={{
                            display: 'flex',
                            gap: { xs: 1.5, md: 2 },
                            padding: { xs: 1, md: 0 },
                            pb: 1,
                            width: 'max-content',
                            animation: 'scrollRecommended 45s linear infinite',
                            '@keyframes scrollRecommended': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' }
                            },
                            '&:hover': {
                                animationPlayState: 'paused',
                            },
                            // Enable manual scrolling
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                            WebkitOverflowScrolling: 'touch',
                            cursor: 'grab',
                            '&:active': {
                                cursor: 'grabbing',
                            }
                        }}
                    >
                        {[...recommended, ...recommended].map((item, index) => (
                            <Box
                                key={`${item.id}-${index}`}
                                sx={{
                                    minWidth: { xs: 130, md: 150 },
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: theme.custom.shadows.light,
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                        overflow: "hidden",
                                        backgroundColor: theme.custom.colors.cardBackgroundColor,
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: theme.custom.shadows.medium,
                                        },
                                    }}
                                    onClick={() => handleItemClick(item.link)}
                                >
                                    <CardMedia>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={150}
                                            height={120}
                                            style={{
                                                width: "100%",
                                                height: "120px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </CardMedia>
                                </Card>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        textAlign: 'center',
                                        mt: { xs: 0.5, md: 1 },
                                        fontSize: { xs: '0.7rem', md: theme.custom.fontSize?.small },
                                        lineHeight: 1.2,
                                        color: theme.palette.text.primary,
                                        fontFamily: theme.custom.fonts.domine,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Quick Categories - Compact */}
            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        mb: 1.5,
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontFamily: theme.custom.fonts.domine,
                    }}
                >
                    Quick Categories
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                    {['Jewelry', 'Electronics', 'Fashion', 'Home', 'Beauty'].map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            onClick={() => handleItemClick()}
                            size="small"
                            sx={{
                                borderRadius: 1.5,
                                px: 1.5,
                                fontSize: theme.custom.fontSize?.small,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                backgroundColor: theme.custom.colors.cardBackgroundColor,
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light + '20',
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                }
                            }}
                            variant="outlined"
                        />
                    ))}
                </Box>
            </Box>

            {/* Scroll Instructions */}
            <Box sx={{ mt: "auto", textAlign: 'center'  }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: theme.custom.fontSize?.small,
                        fontFamily: theme.custom.fonts.domine,
                    }}
                >
                    💡 Hover to pause auto-scroll
                </Typography>
            </Box>
        </Box>
    );

    // For large screens: simple centered modal
    if (isLargeScreen) {
        return open ? (
            <Box
                sx={{
                    position: "fixed",
                    top: trigger ? 60 : 90 ,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: theme.zIndex.modal,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    pt: 1,
                }}
                onClick={handleCloseWithAnimation}
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        width: "90%",
                        maxWidth: "720px",
                        maxHeight: "80vh",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    {content}
                </Box>
            </Box>
        ) : null;
    }

    // For mobile: full screen drawer
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleCloseWithAnimation}
            sx={{
                "& .MuiDrawer-paper": {
                    height: "100vh", // Full screen height
                    width: "100%", // Full screen width
                    borderRadius: 0, // Remove border radius for full screen
                    backgroundColor: "background.paper",
                    overflow: "hidden",
                },
            }}
            SlideProps={{ timeout: 0 }} // Disable default transition for GSAP
        >
            <Box>
                
                <TransitionWrapper variant="slideUp" isVisible={true}
                    duration={0.4}>
                        <TransitionSectionWrapper>

                {content}
                    </TransitionSectionWrapper>
                </TransitionWrapper>
            </Box>
           
        </Drawer>
    );
}