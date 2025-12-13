"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Typography,
    useTheme,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
    Fade,
    Slide,
} from "@mui/material";
import { categories } from "@/data/categoryData";

export default function CategoryHeader() {
    const router = useRouter();
    const theme = useTheme();

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isShrunk, setIsShrunk] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [isTopHeaderVisible, setIsTopHeaderVisible] = useState(true);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    // Refs to track hover state
    const categoryRef = useRef<HTMLDivElement>(null);
    const megaMenuRef = useRef<HTMLDivElement>(null);
    const hoverTimerRef = useRef<NodeJS.Timeout>(null);

    // Throttled scroll handler for better performance
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Show/hide logic with thresholds
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
            setMegaMenuOpen(false); // Close mega menu on scroll down
            setHoveredCategory(null);
        } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
            setIsVisible(true);
        }

        // Top header visibility
        setIsTopHeaderVisible(currentScrollY <= 50);

        // Shrink effect
        setIsShrunk(currentScrollY > 100);

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        let ticking = false;

        const scrollListener = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", scrollListener, { passive: true });
        return () => window.removeEventListener("scroll", scrollListener);
    }, [handleScroll]);

    const handleCategoryHover = (categoryLabel: string) => {
        // Clear any existing timer
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
        }

        setHoveredCategory(categoryLabel);
        setMegaMenuOpen(true);
        setActiveSubmenu(0); // Auto-select first submenu
    };

    const handleCategoryLeave = (event: React.MouseEvent) => {
        // Check if we're moving to the mega menu
       

        // Set a timer to close after a small delay
        hoverTimerRef.current = setTimeout(() => {
            setHoveredCategory(null);
            setMegaMenuOpen(false);
            setActiveSubmenu(null);
        }, 150); // Small delay to account for mouse movement
    };

    const handleMegaMenuLeave = (event: React.MouseEvent) => {
        

        // Close the mega menu
        setHoveredCategory(null);
        setMegaMenuOpen(false);
        setActiveSubmenu(null);
    };

    const handleSubmenuClick = (link?: string) => {
        if (link) {
            router.push(link);
            setMegaMenuOpen(false);
            setHoveredCategory(null);
        }
    };

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* Category Header */}
            <Slide
                direction="down"
                in={isVisible}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                <Box
                    ref={categoryRef}
                    sx={{
                        background: theme.custom.colors.categoryHeader,
                        position: "fixed",
                        top: isTopHeaderVisible ? "105px" : "70px",
                        left: 0,
                        width: "100%",
                        zIndex: 40,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        height: isShrunk ? "45px" : "50px",
                        display: "flex",
                        alignItems: "center",
                        // borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "1200px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        {categories.map((cat) => (
                            <Box
                                key={cat.label}
                                sx={{
                                    position: "relative",
                                    flex: 1,
                                    textAlign: "center",
                                }}
                                onMouseEnter={() => handleCategoryHover(cat.label)}
                                onMouseLeave={handleCategoryLeave}
                            >
                                {/* Main Category */}
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 600,
                                        fontSize: isShrunk ? "0.75rem" : "0.85rem",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease-in-out",
                                        padding: "12px 8px",
                                        borderRadius: 1,
                                        letterSpacing: "0.5px",
                                        "&:hover": {
                                            color: theme.palette.primary.main,
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    }}
                                    onClick={() => cat.link && handleSubmenuClick(cat.link)}
                                >
                                    {cat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Slide>

            {/* Mega Menu Overlay - Also controlled by scroll */}
            <Fade in={megaMenuOpen && hoveredCategory !== null && isVisible} timeout={200}>
                <Box
                    ref={megaMenuRef}
                    sx={{
                        position: "fixed",
                        top: isTopHeaderVisible ? "155px" : "110px",
                        left: 0,
                        width: "100%",
                        backgroundColor: "white",
                        boxShadow: theme.shadows[4],
                        zIndex: 35,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        marginTop: '-1px',
                    }}
                    onMouseEnter={() => {
                        if (hoverTimerRef.current) {
                            clearTimeout(hoverTimerRef.current);
                        }
                        setMegaMenuOpen(true);
                    }}
                    onMouseLeave={handleMegaMenuLeave}
                >
                    <Box
                        sx={{
                            maxWidth: "1400px",
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        {categories.map((cat) => (
                            hoveredCategory === cat.label && cat.subMenus && (
                                <Grid
                                    container
                                    key={cat.label}
                                    sx={{
                                        animation: "fadeIn 0.3s ease-in-out",
                                        "@keyframes fadeIn": {
                                            from: { opacity: 0, transform: "translateY(-10px)" },
                                            to: { opacity: 1, transform: "translateY(0)" },
                                        },
                                    }}
                                >
                                    {/* Left Navigation */}
                                    <Grid
                                        size={{ xs: 12, sm: 4, md: 3 ,lg:2 }}
                                        sx={{
                                            backgroundColor: theme.palette.grey[50],
                                            borderRight: `1px solid ${theme.palette.divider}`,
                                            padding: "24px 0",
                                        }}
                                    >
                                        <List disablePadding>
                                            {cat.subMenus.map((submenu, idx) => (
                                                <ListItem key={submenu.title} disablePadding>
                                                    <ListItemButton
                                                        selected={activeSubmenu === idx}
                                                        onMouseEnter={() => setActiveSubmenu(idx)}
                                                        onClick={() => setActiveSubmenu(idx)}
                                                        sx={{
                                                            padding: "12px 24px",
                                                            margin: "2px 0",
                                                            borderRadius: 0,
                                                            transition: "all 0.2s ease-in-out",
                                                            "&.Mui-selected": {
                                                                backgroundColor: theme.palette.primary.light,
                                                                color: theme.palette.primary.contrastText,
                                                                "&:hover": {
                                                                    backgroundColor: theme.palette.primary.main,
                                                                },
                                                            },
                                                            "&:hover": {
                                                                backgroundColor: theme.palette.action.hover,
                                                            },
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={submenu.title}
                                                            primaryTypographyProps={{
                                                                fontSize: "0.95rem",
                                                                fontWeight: activeSubmenu === idx ? 600 : 500,
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>

                                    {/* Right Content */}
                                    <Grid
                                        size={{ xs: 6, sm: 2, md:8 ,lg:6}}
                                        sx={{
                                            padding: "32px",
                                            backgroundColor: "white",
                                        }}
                                    >
                                        {activeSubmenu !== null && (
                                            <Box>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        mb: 3,
                                                        color: theme.palette.text.primary,
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    {cat.subMenus[activeSubmenu].title}
                                                </Typography>
                                                <Grid container spacing={3}>
                                                    {cat.subMenus[activeSubmenu].items.map((item) => (
                                                        <Grid
                                                            size={{ xs: 6, md: 3 }}
                                                            key={item.name}
                                                            sx={{
                                                                cursor: "pointer",
                                                                transition: "all 0.3s ease-in-out",
                                                                "&:hover": {
                                                                    transform: "translateY(-4px)",
                                                                },
                                                            }}
                                                            onClick={() => handleSubmenuClick(item.link)}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    alignItems: "center",
                                                                    gap: 1,
                                                                    padding: 1,
                                                                    borderRadius: 2,
                                                                    border: `1px solid ${theme.palette.divider}`,
                                                                    "&:hover": {
                                                                        borderColor: theme.palette.primary.main,
                                                                        boxShadow: theme.shadows[2],
                                                                    },
                                                                }}
                                                            >
                                                                <Box
                                                                    component="img"
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    sx={{
                                                                        width: {md:80, xs: '100%' , lg:100},
                                                                        height: { md: 80, xs: '100%', lg: 100 },
                                                                        borderRadius: 1,
                                                                        objectFit: "cover",
                                                                        transition: "transform 0.3s ease-in-out",
                                                                       
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        fontWeight: 500,
                                                                        fontSize: "0.9rem",
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                            )
                        ))}
                    </Box>
                </Box>
            </Fade>
        </>
    );
}