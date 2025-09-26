"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography, Button, useTheme, Container } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const EmptyCart: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const cartIconRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (cartIconRef.current && contentRef.current) {
            tl.fromTo(
                cartIconRef.current,
                {
                    y: -50,
                    opacity: 0,
                    scale: 0.5,
                    rotation: -10
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }
            ).fromTo(
                contentRef.current.children,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out"
                },
                "-=0.4"
            );
        }
    }, []);

    const handleExploreProducts = () => {
        router.push("/products");
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                    py: 8,
                }}
            >
                {/* Animated Cart Icon */}
                <Box
                    ref={cartIconRef}
                    sx={{
                        mb: 3,
                        color: theme.palette.primary.main,
                    }}
                >
                    <ShoppingCartOutlined
                        sx={{
                            fontSize: 96,
                            opacity: 0.7
                        }}
                    />
                </Box>

                {/* Content */}
                <Box ref={contentRef}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 2
                        }}
                    >
                        Your Cart is Empty
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            lineHeight: 1.6
                        }}
                    >
                        Discover our exclusive collection of jewelry and accessories.
                        Find the perfect pieces to complement your style.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleExploreProducts}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[4],
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Explore Products
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EmptyCart;