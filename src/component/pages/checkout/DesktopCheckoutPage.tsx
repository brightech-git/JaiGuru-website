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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel as MuiFormControlLabel,
    Checkbox,
    Grid,
} from "@mui/material";
import { Edit, Add } from "@mui/icons-material";
import AppButton from "@/component/ui/AppButton";
import AddressDialog from "./AddressDialog";
import PriceDetailsCard from "./PriceDetailsCard";
import PaymentPage from "./PaymentPage";

// Mock user data
const MOCK_USER = {
    name: "Aswin Kumar",
    mobile: "+919342884232"
};

// Mock addresses data
const MOCK_ADDRESSES = [
    {
        id: 1,
        name: "Aswin",
        type: "HOME",
        mobile: "9342884232",
        address: "13 ist cross street, Randham school road, Cheyyar, Tamil Nadu - 604407",
        isDefault: true
    },
    {
        id: 2,
        name: "Suriya",
        type: "HOME",
        mobile: "9443657315",
        address: "13, Randham to valavanoor, Tiruvethipuram, Tamil Nadu - 604407",
        isDefault: false
    },
    {
        id: 3,
        name: "Jayakumar",
        type: "WORK",
        mobile: "9344637465",
        address: "Adhiparashakthi college of arts and science opposite, Arcot to cheyyar, mulluvadi, Kalavai, Tamil Nadu - 632506",
        isDefault: false
    }
];

// Mock cart items
const MOCK_CART_ITEMS = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        weight: 1,
        image: "/images/2.webp"
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 343,
        weight: 1,
        sku: "SW-500",
        image: "/images/3.webp"
    }
];

const CheckoutPage: React.FC = () => {
    const theme = useTheme();
    const [selectedAddress, setSelectedAddress] = useState<number>(1);
    const [addressDialogOpen, setAddressDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState<'checkout' | 'payment'>('checkout');

    // Calculate order totals
    const { subtotal, platformFee, total, savings } = useMemo(() => {
        const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
        const platformFee = 7;
        const total = subtotal + platformFee;
        const savings = 1751;
        return { subtotal, platformFee, total, savings };
    }, []);

    const handleAddressSelect = (addressId: number) => {
        setSelectedAddress(addressId);
    };

    const handleAddNewAddress = () => {
        setIsEditing(false);
        setEditingAddress(null);
        setAddressDialogOpen(true);
    };

    const handleEditAddress = (address: any) => {
        setIsEditing(true);
        setEditingAddress(address);
        setAddressDialogOpen(true);
    };

    const handleSaveAddress = () => {
        console.log("Saving address:", editingAddress);
        setAddressDialogOpen(false);
    };

    const handleProceedToPayment = () => {
        setCurrentStep('payment');
    };

    const handlePlaceOrder = () => {
        console.log("Placing order with address:", selectedAddress);
        handleProceedToPayment();
    };

    if (currentStep === 'payment') {
        return <PaymentPage />;
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4
            }}>
                Checkout
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4 }}>
                {/* Left Section - Checkout Details */}
                <Box>
                    {/* Login Info */}
                    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            1. LOGIN
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {MOCK_USER.name} {MOCK_USER.mobile}
                        </Typography>
                    </Card>

                    {/* Delivery Address */}
                    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                2. DELIVERY ADDRESS
                            </Typography>
                        </Box>

                        <RadioGroup value={selectedAddress} onChange={(e) => handleAddressSelect(Number(e.target.value))}>
                            {MOCK_ADDRESSES.map((address) => (
                                <Box key={address.id} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <FormControlLabel
                                            value={address.id}
                                            control={<Radio />}
                                            label={
                                                <Box sx={{ flex: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Box>
                                                            <Typography variant="subtitle1" fontWeight={600}>
                                                                {address.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {address.type} {address.mobile}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        {address.address}
                                                    </Typography>
                                                    {address.isDefault && (
                                                        <Typography variant="caption" color="primary" sx={{ fontStyle: 'italic' }}>
                                                            Default Address
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                            sx={{ alignItems: 'flex-start', width: '100%', margin: 0 }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditAddress(address)}
                                            sx={{ color: theme.palette.primary.main }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </RadioGroup>

                        <AppButton
                            label="Add New Address"
                            startIcon={<Add />}
                            onClick={handleAddNewAddress}
                            sx={{ borderRadius: 2 }}
                        />
                    </Card>

                    {/* Order Summary */}
                    <Card sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            3. ORDER SUMMARY
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {MOCK_CART_ITEMS.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.name}
                                    sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" fontWeight={500}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Weight: {item.weight.toFixed(3)}gm
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight={600}>
                                    ${item.price}
                                </Typography>
                            </Box>
                        ))}
                    </Card>
                </Box>

                {/* Right Section - Price Details (Sticky) */}
                <Box sx={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
                    <PriceDetailsCard
                        subtotal={subtotal}
                        platformFee={platformFee}
                        total={total}
                        savings={savings}
                        onPlaceOrder={handlePlaceOrder}
                        MOCK_CART_ITEMS={MOCK_CART_ITEMS}
                    />
                </Box>
            </Box>

            {/* Add/Edit Address Dialog */}
            <AddressDialog
                open={addressDialogOpen}
                onClose={() => setAddressDialogOpen(false)}
                onSave={handleSaveAddress}
                isEditing={isEditing}
                address={editingAddress}
            />
        </Container>
    );
};

export default CheckoutPage;