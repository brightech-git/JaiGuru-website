"use client";

import React, { useState, useMemo } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    Divider,
    useTheme,
    Radio,
    FormControlLabel,
    RadioGroup,
    TextField,
    Grid,
} from "@mui/material";
import { CreditCard, LocalAtm } from "@mui/icons-material";
import AppButton from "@/component/ui/AppButton";

// Mock data
const MOCK_CART_ITEMS = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        weight: 0.350,
        sku: "PH-001",
        image: "/images/2.webp"
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 343,
        weight: 0.120,
        sku: "SW-500",
        image: "/images/3.webp"
    }
];

const MOCK_SELECTED_ADDRESS = {
    id: 1,
    name: "Aswin",
    type: "HOME",
    mobile: "9342884232",
    address: "13 ist cross street, Randham school road, Cheyyar, Tamil Nadu - 604407",
    pincode: "604407"
};

const PaymentPage: React.FC = () => {
    const theme = useTheme();
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    // Calculate order totals
    const { subtotal, platformFee, total, savings } = useMemo(() => {
        const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
        const platformFee = 7;
        const total = subtotal + platformFee;
        const savings = 1751;
        return { subtotal, platformFee, total, savings };
    }, []);

    const handlePaymentSubmit = () => {
        console.log("Processing payment with:", { paymentMethod, cardDetails });
        // Handle payment processing logic
    };

    const renderOnlinePaymentSection = () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, width: { md: '120%', lg: '150%' ,xl:'200%'} ,}}>
            <Typography variant="body2" color="text.secondary" >
                Secure online payment with multiple options
            </Typography>
            <AppButton
                label={`Pay $${total}`}
                
                onClick={handlePaymentSubmit}
                sx={{

                    background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                }}
            />      
        </Box>
    );

    const renderCODSection = () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: { md: '100%', xl: '120%' }, gap:2}}>
            <Typography variant="body2" color="text.secondary">
                Pay when you receive your order
            </Typography>

            <Box sx={{ p: 2, bgcolor: theme.palette.success.light, borderRadius: 1, }}>
                <Typography variant="body2" color="success.dark" fontWeight={500} sx={{fontSize:{md:'0.675rem',lg:'0.825rem'}}}>
                    Cash on Delivery available for this order
                </Typography>
               
            </Box>
            <AppButton
                label="Place Order"
                
                onClick={handlePaymentSubmit}
                sx={{
                    background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                }}
            />
           

         
        </Box>
    );

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4
            }}>
                Complete Payment
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4 }}>
                {/* Left Section - Payment Methods */}
                <Box>
                    {/* Delivery Address Summary */}
                    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Delivery Address
                        </Typography>
                        <Box sx={{ p: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {MOCK_SELECTED_ADDRESS.name} {MOCK_SELECTED_ADDRESS.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {MOCK_SELECTED_ADDRESS.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {MOCK_SELECTED_ADDRESS.pincode}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {MOCK_SELECTED_ADDRESS.mobile}
                            </Typography>
                        </Box>
                    </Card>

                    {/* Payment Methods */}
                    <Card sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Select Payment Method
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)}>
                            {/* Online Payment */}
                            <Card sx={{ mb: 1, p: 2, border: `1px solid ${theme.palette.divider}`, display: 'flex',justifyContent:'space-between', }}>
                                <FormControlLabel
                                    value="online"
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ width: '100%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,mt:1 }}>
                                                <CreditCard />
                                                <Typography fontWeight={600} >
                                                    Online Payment
                                                </Typography>
                                               
                                            </Box>
                                            {paymentMethod === 'online' && renderOnlinePaymentSection()}

                                        </Box>
                                    }
                                    sx={{ width: '100%', alignItems: 'flex-start' }}
                                />
                               
                               
                            </Card>

                            {/* Cash on Delivery */}
                            <Card sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}`,  display: 'flex',justifyContent:'space-between', }}>
                                <FormControlLabel
                                    value="cod"
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ width: '100%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,mt:1}}>
                                                <LocalAtm />
                                                <Typography fontWeight={600}>
                                                    Cash on Delivery
                                                </Typography>
                                            </Box>
                                            {paymentMethod === 'cod' && renderCODSection()}
                                        </Box>
                                    }
                                    sx={{ width: '100%', alignItems: 'flex-start' }}
                                />
                              
                            </Card>
                        </RadioGroup>

                        {/* Security Info */}
                        <Box sx={{ mt: 3, p: 2, bgcolor: theme.palette.background.default, borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                Safe and Secure Payments. Easy returns. 100% Authentic products.
                            </Typography>
                        </Box>
                    </Card>
                </Box>

                {/* Right Section - Order Summary */}
                <Box sx={{ position: 'sticky', top: 40, alignSelf: 'flex-start' }}>
                    <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Order Summary
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            {MOCK_CART_ITEMS.map((item) => (
                                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.name}
                                        sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={500}>
                                            {item.name}
                                        </Typography>
                                        {item.sku && (
                                            <Typography variant="caption" color="text.secondary">
                                                SKU: {item.sku}
                                            </Typography>
                                        )}
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Weight: {item.weight.toFixed(3)}gm
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight={600}>
                                        ${item.price}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            {/* Price Breakdown */}
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Price ({MOCK_CART_ITEMS.length} items)</Typography>
                                    <Typography variant="body2">${subtotal}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Platform Fee</Typography>
                                    <Typography variant="body2">${platformFee}</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Total */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    Total Amount
                                </Typography>
                                <Typography variant="h6" fontWeight={600} color="primary">
                                    ${total}
                                </Typography>
                            </Box>

                            {/* Discount Offer */}
                            <Box sx={{ p: 2, bgcolor: theme.palette.success.light, borderRadius: 1 }}>
                                <Typography variant="body2" fontWeight={600} color="success.dark">
                                    10% instant discount
                                </Typography>
                                <Typography variant="caption" color="success.dark">
                                    Claim now with payment offers
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    {/* Terms and Conditions */}
                    <Card sx={{ mt: 2, p: 2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: 'block', mb: 1 }}>
                            By continuing, you confirm that you are above 18 years of age and agree to our Terms of Use and Privacy Policy.
                        </Typography>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

export default PaymentPage;