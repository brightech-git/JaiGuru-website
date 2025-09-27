"use client";

import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Box,
    useTheme,
} from "@mui/material";
import AppButton from "@/component/ui/AppButton";

interface PriceDetailsCardProps {
    MOCK_CART_ITEMS: { id: number; name: string; price: number; image: string; weight: number; sku?: string }[];
    subtotal: number;
    platformFee: number;
    total: number;
    savings: number;
    onPlaceOrder: () => void;
}

const PriceDetailsCard: React.FC<PriceDetailsCardProps> = ({
    subtotal,
    platformFee,
    total,
    savings,
    onPlaceOrder,
}) => {
    const theme = useTheme();

    return (
        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    PRICE DETAILS
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Price Breakdown */}
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                            Price ({} items)
                        </Typography>
                        <Typography variant="body2">${subtotal}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Platform Fee</Typography>
                        <Typography variant="body2">${platformFee}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Total */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Total Payable
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color="primary">
                        ${total}
                    </Typography>
                </Box>

                {/* Savings */}
                <Typography variant="body2" color="success.main" sx={{ mb: 3 }}>
                    Your Total Savings on this order ${savings}
                </Typography>

                {/* Security Info */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3, lineHeight: 1.5 }}>
                    Safe and Secure Payments. Easy returns. 100% Authentic products.
                </Typography>

                {/* Terms and Conditions */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3, lineHeight: 1.5 }}>
                    By continuing with the order, you confirm that you are above 18 years of age,
                    and you agree to the Terms of Use and Privacy Policy
                </Typography>

                {/* Place Order Button */}
                <AppButton
                    label="Place Order"
                    fullWidth
                    onClick={onPlaceOrder}
                    sx={{
                        py: 1.5,
                        
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: theme.shadows[4],
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                />
              
            </CardContent>
        </Card>
    );
};

export default PriceDetailsCard;