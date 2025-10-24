"use client";

import React, { useState, useMemo, useCallback ,useEffect } from "react";
import {
    Box,
    useTheme,
    Container,
    Typography,
    useMediaQuery,
    Fab
} from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import DynamicBreadcrumbs from "@/component/layout/breadcrumb/DynamicBreadcrumbs";

interface CartItemType {
    id: number;
    name: string;
    price: number;
    image: string;
    weight: number;
    sku?: string;
}

// Mock Data
const MOCK_CART_ITEMS: CartItemType[] = [
    {
        id: 1,
        name: "Classic Leather Sneakers",
        price: 79.99,
        image: "/images/2.webp",
        weight: 500,
        sku: "CLS-001",
    },
    {
        id: 2,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 200,
        sku: "EHB-002",
    },
    {
        id: 3,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 200,
        sku: "EHB-002",
    },
    {
        id: 4,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 200,
        sku: "EHB-002",
    },
];

const TAX_RATE = 0.1;

const CartPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [cartItems, setCartItems] = useState<CartItemType[]>(MOCK_CART_ITEMS);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    
        useEffect(() => {
            const handleScroll = () => {
                const footer = document.getElementById("footer");
                if (footer) {
                    const footerTop = footer.getBoundingClientRect().top;
                    setIsFooterVisible(footerTop <= window.innerHeight);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

    const handleRemoveItem = useCallback((id: number) => {
        setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }, []);

    const handleBuyNow = useCallback((id: number) => {
        // Handle buy now logic for specific item
        console.log("Buy now clicked for item:", id);
        // You can navigate to checkout with this specific item
    }, []);

    const handleCheckout = useCallback(() => {
        // Handle checkout logic for all items
        console.log("Proceeding to checkout with items:", cartItems);
    }, [cartItems]);

    // Calculate cart totals using useMemo for performance
    const { subtotal, tax, total } = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        return { subtotal, tax, total };
    }, [cartItems]);

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 1, md: 4 }, pb: { xs: 10, md: 2 } }}>
            
            <Box sx={{ alignItems: 'center', textAlign: 'center', px: { xs: 1, sm: 1, md: 2 } }}>
                <DynamicBreadcrumbs />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, px:{xs:0,md:2 ,lg:4} }} >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                }}
            >
                Shopping Cart 
            </Typography>
            <Typography variant="h6" gutterBottom> Items ({cartItems.length})</Typography>
            </Box>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                    gap: 4,
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >   
            

                {/* Cart Items Section */}
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                {...item}
                                onRemove={handleRemoveItem}
                                onBuyNow={handleBuyNow}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Order Summary Section */}
                <Box >
                    <CartSummary
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        itemCount={cartItems.length}
                        onCheckout={handleCheckout}
                    />
                </Box>
                {isMobile && (
                    <Box sx={{ display: 'flex' }}>
                        <Box
                            sx={{
                                width: '100%',
                                bottom: 'auto',
                                right: "auto",
                                left: "auto",
                                zIndex: 1000,
                                background: theme.palette.background.default,
                                transition: "bottom 0.3s ease",
                                padding: { xs: 1, sm: 1.5, md: 2 },
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent:'space-between',
                                gap:5

                            }}
                        >

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                <Typography variant="body2" color="body.text">
                                    Total
                                </Typography>
                                <Typography variant="body1" fontWeight={400} color="body.text">
                                    ${total.toFixed(2)}
                                </Typography>
                            </Box>

                            <Fab
                                variant="extended"
                                onClick={handleCheckout}
                                sx={{
                                    background: '#BADFDB',
                                    color: 'primary',
                                    borderRadius: 2,
                                    px: 2,
                                    height: 40,
                                    minWidth: 'auto',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: theme.shadows[6],
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <ShoppingCartCheckout sx={{ mr: 1 }} />
                                Checkout
                            </Fab>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Sticky Mobile Checkout Button */}
            {isMobile && cartItems.length > 0 && (
             <Box sx={{ display: 'flex', justifyContent: 'center',margin:'0 auto' }}>
                <Box
                    sx={{
                            position: "fixed",
                            bottom: isFooterVisible ? -100 : { xs: 1, sm: 1.5, md: 2 },
                            right: "auto",
                            left: "auto",
                            background: theme.custom.colors.addtoCart,
                            boxShadow: theme.custom.shadows.medium,
                            zIndex: 1000,
                            transition: "bottom 0.3s ease",
                            padding: { xs: 1, sm: 1.5, md: 2 },
                            width: { xs: '90%', sm: '80%', },
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'space-between'
                        
                    }}
                >   
            
                    <Box sx={{ display: 'flex', flexDirection: 'row'  ,gap:2, alignItems:'center'}}>
                        <Typography variant="body2" color="white">
                            Total
                        </Typography>
                        <Typography variant="body1" fontWeight={400} color="white">
                            ${total.toFixed(2)}
                        </Typography>
                    </Box>

                    <Fab
                        variant="extended"
                        onClick={handleCheckout}
                        sx={{
                            background: '#BADFDB',
                            color: 'primary',
                            borderRadius: 2,
                            px: 2,
                            height: 40,
                            minWidth: 'auto',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[6],
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ShoppingCartCheckout sx={{ mr: 1 }} />
                        Checkout
                    </Fab>
                </Box>
            </Box>
            )}
             <Box id='footer' ></Box>
        </Container>
    );
};

export default CartPage;