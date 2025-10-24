"use client";

import React from "react";
import {
    Box,
    Typography,
    Divider,
    Card,
    useTheme,
    Button,
    Stack,
    useMediaQuery,
} from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import AppButton from "@/component/ui/AppButton";

interface CartSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
    onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
    subtotal,
    tax,
    total,
    itemCount,
    onCheckout,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleCheckout = () => {
        onCheckout?.();
        console.log("Proceeding to checkout");
    };

    const summaryItems = [
        { label: `Subtotal (${itemCount} items)`, value: subtotal },
        { label: "Tax (10%)", value: tax },
    ];

    return (
        <Card
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                position: { md: 'sticky' },
                top: { md: 40 },
               
            }}
        >
            <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <ShoppingBagOutlined />
                Order Summary
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Summary Items */}
            <Stack spacing={1.5} sx={{ mb: 2 }}>
                {summaryItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            {item.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            ${item.value.toFixed(2)}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                    Total
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary">
                    ${total.toFixed(2)}
                </Typography>
            </Box>

            {/* Checkout Button - Hidden on Mobile */}
            {!isMobile && (
                <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
                    <AppButton
                        label="Proceed to Checkout"
                        variant="contained"
                        onClick={handleCheckout}
                        size="large"
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: theme.shadows[4],
                            },
                            transition: 'all 0.2s ease-in-out',
                        }}
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: 'block',
                            textAlign: 'center',
                            mt: 1
                        }}
                    >
                        Free shipping on orders over $100
                    </Typography>
                </Box>
            )}
        </Card>
    );
};

export default CartSummary;