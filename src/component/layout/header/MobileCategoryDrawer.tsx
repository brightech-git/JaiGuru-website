"use client";

import {
    Drawer,
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    Grid,
    Slide,
    ListItemButton,
    Fade,
    useTheme,
} from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { categories, Category, SubMenu } from "@/data/categoryData";
import TransitionWrapper from '@/component/transition/SmoothSection'

interface MobileCategoryDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function MobileCategoryDrawer({ open, onClose }: MobileCategoryDrawerProps) {
    const router = useRouter();
    const theme = useTheme();
    const [step, setStep] = useState<"main" | "submenu" | "items">("main");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedSubMenu, setSelectedSubMenu] = useState<SubMenu | null>(null);
    const [contentOpacity, setContentOpacity] = useState(1);

    // Reset states when drawer closes
    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setStep("main");
                setSelectedCategory(null);
                setSelectedSubMenu(null);
            }, 300);
        }
    }, [open]);

    const animateTransition = (callback: () => void) => {
        setContentOpacity(0);
        setTimeout(() => {
            callback();
            setContentOpacity(1);
        }, 200);
    };

    const handleCategoryClick = (cat: Category) => {
        animateTransition(() => {
            if (cat.subMenus) {
                setSelectedCategory(cat);
                setStep("submenu");
            } else if (cat.link) {
                router.push(cat.link);
                onClose();
            }
        });
    };

    const handleSubMenuClick = (sub: SubMenu) => {
        animateTransition(() => {
            setSelectedSubMenu(sub);
            setStep("items");
        });
    };

    const handleItemClick = (link?: string) => {
        if (link) {
            // Add a small delay for visual feedback
            setContentOpacity(0.7);
            setTimeout(() => {
                router.push(link);
                onClose();
            }, 150);
        }
    };

    const handleBack = () => {
        animateTransition(() => {
            if (step === "items") {
                setSelectedSubMenu(null);
                setStep("submenu");
            } else if (step === "submenu") {
                setSelectedCategory(null);
                setStep("main");
            }
        });
    };

    // Main Categories Content
    const mainContent = (
        <Fade in={step === "main"} timeout={300} >
            <Box sx={{ opacity: contentOpacity, transition: 'opacity 0.2s ease-in-out' }} >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} sx={{ background: `linear-gradient(90deg, ${'#bbfafaff'}, ${'#d692d8ff'})`,px:2, py:1, boxShadow: theme.custom.shadows.light }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            fontFamily: theme.typography.subtitle1.fontFamily,
                            
                        }}
                    >
                        Categories Menu
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.custom.colors.subtleBlue,
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <List sx={{ py: 0 }}>
                    {categories.map((cat, index) => (
                        <Fade in={true} timeout={500} key={cat.label} style={{ transitionDelay: `${index * 50}ms` }}>
                            <ListItem  >
                                <ListItemButton
                                    onClick={() => handleCategoryClick(cat)}
                                    sx={{
                                        py: 1,
                                        px: 1,
                                        borderRadius: 2,
                                        '&:hover': {
                                            transform: 'translateX(4px)',         
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                > 
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: theme.typography.h1.fontFamily,
                                            fontSize: theme.custom.fontSize?.larger,
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {cat.label}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </Fade>
                    ))}
                </List>
            </Box>
        </Fade>
    );

    // Submenu Content
    const submenuContent = (
        <Fade in={step === "submenu"} timeout={300}>
            <Box sx={{ opacity: contentOpacity, transition: 'opacity 0.2s ease-in-out' }}>
                <Box display="flex" alignItems="center" gap={1} mb={2} sx={{ background: `linear-gradient(90deg, ${'#bbfafaff'}, ${'#d692d8ff'})`,px:1, py:1, boxShadow: theme.custom.shadows.light }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.custom.colors.subtleBlue,
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {selectedCategory?.label}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: theme.palette.primary.main,
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <List sx={{ py: 0 }}>
                    {selectedCategory?.subMenus?.map((sub, index) => (
                        <Fade in={true} timeout={400} key={sub.title} style={{ transitionDelay: `${index * 40}ms` }}>
                            <ListItem  sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => handleSubMenuClick(sub)}
                                    sx={{
                                        py: 1,
                                        px:1,
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: theme.custom.fontSize?.larger,
                                            color: theme.palette.primary.light,
                                            fontFamily: theme.typography.h1.fontFamily,
                                        }}
                                    >
                                        {sub.title}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </Fade>
                    ))}
                </List>
            </Box>
        </Fade>
    );

    // Items Content
    const itemsContent = (
        <Fade in={step === "items"} timeout={300}>
            <Box sx={{ opacity: contentOpacity, transition: 'opacity 0.2s ease-in-out' }}>
                <Box display="flex" alignItems="center" gap={1} mb={2} sx={{ background: `linear-gradient(90deg, ${'#bbfafaff'}, ${'#d692d8ff'})`, px: 1, py: 1, boxShadow: theme.custom.shadows.light }} >
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.custom.colors.subtleBlue,
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {selectedSubMenu?.title}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: theme.palette.primary.main,
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <Grid container spacing={1}>
                    {selectedSubMenu?.items.map((item, index) => (
                        <Fade in={true} timeout={400} key={item.name} style={{ transitionDelay: `${index * 30}ms` }}>
                            <Grid size={{xs:4 , sm:4}} sx={{p:{xs:1, sm:0.5}}}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        p: 1,
                                   
                                        border: `1px solid ${theme.palette.text.disabled || '#696868ff'}`,
                                        borderRadius: 2,
                                        '&:hover': {
                                            '& img': {
                                                transform: "scale(1.08)",
                                                boxShadow: theme.custom.shadows.medium,
                                            },
                                            border: `1px solid ${theme.custom.colors.cartBackground || '#5c5c5cff'}`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: theme.custom.shadows.light,
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                    onClick={() => handleItemClick(item.link)}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.name}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 2,
                                            objectFit: "cover",
                                            mb: 1.5,
                                           
                                            transition: "all 0.3s ease",
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textAlign: "center",
                                            fontWeight: 500,
                                            color: theme.palette.text.primary,
                                            lineHeight: 1.2,
                                            fontFamily: theme.typography.h1.fontFamily,
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Fade>
                    ))}
                </Grid>
            </Box>
        </Fade>
    );

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width:{ xs: '100%', sm: 400 },
                    maxWidth: '100vw',
                },
            }}
        >
            <TransitionWrapper 
                isVisible={open}
                variant="slideRight"
                duration={0.4} >
           
            <Box
                sx={{
                    width: '100%',
                    height: "100%",
                    bgcolor: "background.paper",
                    p: 0,
                    overflowY: "auto",
                    background: `linear-gradient(135deg, ${theme.palette.background.default} 10%, ${theme.custom.colors.subtleBlue} 90%)`,
                }}
            >
                {/* Render current step content */}
                {step === "main" && mainContent}
                {step === "submenu" && submenuContent}
                {step === "items" && itemsContent}
            </Box>
            </TransitionWrapper>
        </Drawer>
    );
}