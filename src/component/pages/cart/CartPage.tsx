"use client";

import React, { useState, useMemo } from "react";
import { Box, useTheme, Container, Typography } from "@mui/material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    weight: number;
    sku?: string;
}

// Mock Data
const MOCK_CART_ITEMS: CartItem[] = [
    {
        id: 1,
        name: "Classic Leather Sneakers",
        price: 79.99,
        image: "/images/2.webp",
        weight: 0.500,
        sku: "CLSN-001",
    },
    {
        id: 2,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 0.222,
        sku: "EHBG-002",
    },
    {
        id: 3,
        name: "Classic Leather Sneakers",
        price: 79.99,
        image: "/images/2.webp",
        weight: 0.222,
        sku: "CLSN-002",
    },
    {
        id: 4,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 0.222,
        sku: "EHBG-005",
    },
    {
        id: 5,
        name: "Classic Leather Sneakers",
        price: 79.99,
        image: "/images/2.webp",
        weight: 0.222,
        sku: "CLSN-009",
    },
    {
        id: 6,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 0.222,
        sku: "EHBG-008",
    },
    {
        id: 7,
        name: "Classic Leather Sneakers",
        price: 79.99,
        image: "/images/2.webp",
        weight: 0.222,
        sku: "CLSN-005",
    },
    {
        id: 8,
        name: "Elegant Handbag",
        price: 129.5,
        image: "/images/3.webp",
        weight: 0.222,
        sku: "EHBG-004",
    },
];

const TAX_RATE = 0.1;

const CartPage: React.FC = () => {
    const theme = useTheme();
    const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

    const handleRemoveItem = (id: number) => {
        setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

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
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4
            }}>
                Shopping Cart
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr',md: '2fr 1fr', lg: '2fr 1fr' },
                    gap: 4,
                    backgroundColor: theme.palette.background.default,
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {/* Cart Items Section */}
                <Box>
                    <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
                        Items ({cartItems.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                {...item}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Order Summary Section */}
                <Box>
                    <CartSummary
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        itemCount={cartItems.length}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default CartPage;