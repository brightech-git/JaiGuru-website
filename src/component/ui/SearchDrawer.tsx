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
    CardContent,
    TextField,
    InputAdornment,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { gsap } from "gsap";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
    const searchInputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

    // GSAP animation for mobile
    useEffect(() => {
        if (open && drawerRef.current) {
            if (isLargeScreen) {
                // Large screen animation
                gsap.fromTo(
                    drawerRef.current,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
                );
            } else {
                // Mobile animation - from bottom to top
                gsap.fromTo(
                    drawerRef.current,
                    { y: "100%", opacity: 1 },
                    { y: 0, duration: 0.5, ease: "power3.out" }
                );
            }

            // Focus search input when opened
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [open, isLargeScreen]);

    // Close when clicking outside (for large screens)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isLargeScreen &&
                open &&
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose, isLargeScreen]);

    // Close when clicking on popular search items or recommended cards
    const handleItemClick = (link?: string) => {
        if (link) {
            window.open(link, "_blank");
        }
        onClose();
    };

    const content = (
        <Box
            ref={drawerRef}
            sx={{
                p: { xs: 2, md: 4 },
                spaceY: { xs: 3, md: 4 },
                position: "relative",
                bgcolor: "background.paper",
                borderRadius: { xs: 0, md: 2 },
                boxShadow: { md: 3 },
                width: "100%",
                height: { xs: "100vh", md: "auto" },
                maxWidth: { md: "720px" },
                maxHeight: { md: "70vh" },
                overflowY: "auto",
                // Hide scrollbars for cleaner look
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                border: { md: `1px solid ${theme.palette.divider}` },
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header - Mobile has close button only, desktop has title */}
            <Box
                display="flex"
                justifyContent={isLargeScreen ? "space-between" : "flex-end"}
                alignItems="center"
                sx={{ mb: 2 }}
            >
                {isLargeScreen && (
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontFamily: "var(--secondary-font)",
                            color: "text.primary"
                        }}
                    >
                        Search
                    </Typography>
                )}
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: "text.primary"
                    }}
                >
                    <Close />
                </IconButton>
            </Box>

            {/* Search Bar - Top for mobile */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search for products..."
                    variant="outlined"
                    inputRef={searchInputRef}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 2,
                            backgroundColor: "background.default",
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: "divider",
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: "primary.main",
                            },
                        }
                    }}
                />
            </Box>

            {/* Popular Searches */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 2,
                        fontWeight: 500,
                        color: "text.secondary",
                        fontSize: { xs: "0.9rem", md: "1rem" }
                    }}
                >
                    Popular Searches
                </Typography>
                <Grid container spacing={1}>
                    {popularSearches.map((term, index) => (
                        <Grid  key={index}>
                            <Box
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: "20px",
                                    px: 3,
                                    py: 1,
                                    border: `1px solid ${theme.palette.divider}`,
                                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                                    transition: "all 0.2s ease",
                                    whiteSpace: "nowrap",
                                    "&:hover": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                                onClick={() => handleItemClick()}
                            >
                                {term}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Recommended for You */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 2,
                        fontWeight: 500,
                        color: "text.primary",
                        fontSize: { xs: "0.9rem", md: "1rem" }
                    }}
                >
                    Recommended for You
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        overflowX: "auto",
                        pb: 2,
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {recommended.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                minWidth: { xs: "140px", md: "160px" },
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    transition: "all 0.3s ease-in-out",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 4,
                                    },
                                }}
                                onClick={() => handleItemClick(item.link)}
                            >
                                <CardMedia>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={160}
                                        height={160}
                                        style={{
                                            width: "100%",
                                            height: "140px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </CardMedia>
                            </Card>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    textAlign: "center",
                                    fontFamily: "var(--secondary-font)",
                                    mt: 1,
                                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );

    // For large screens: render as absolute positioned element without modal overlay
    if (isLargeScreen) {
        return open ? (
            <Box
                sx={{
                    position: "fixed",
                    top: trigger ? 33 : 70,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: theme.zIndex.modal,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    pt: 4,
                    backgroundColor: "transparent",
                    pointerEvents: "none",
                }}
            >
                <Box sx={{ pointerEvents: "auto" }}>
                    {content}
                </Box>
            </Box>
        ) : null;
    }

    // For mobile: use drawer with full screen
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    height: "100vh",
                    borderRadius: 0,
                    backgroundColor: "background.paper",
                    overflow: "hidden",
                },
            }}
            SlideProps={{
                timeout: 0, // Disable default transition since we're using GSAP
            }}
        >
            {content}
        </Drawer>
    );
}