"use client";

import React, { useState, useMemo ,useEffect} from "react";
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
    Stepper,
    Step,
    StepLabel,
    useMediaQuery,
    Fab,
} from "@mui/material";
import { Edit, Add, ArrowForward, ArrowBack } from "@mui/icons-material";
import AppButton from "@/component/ui/AppButton";
import AddressForm from "./AddressForm";
import DynamicBreadcrumbs from "@/component/layout/breadcrumb/DynamicBreadcrumbs";
import GetLocation from "@/component/extra/GetLocation";
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
        pincode: "604407",
        isDefault: true
    },
    {
        id: 2,
        name: "Suriya",
        type: "HOME",
        mobile: "9443657315",
        address: "13, Randham to valavanoor, Tiruvethipuram, Tamil Nadu - 604407",
        pincode: "604407",
        isDefault: false
    },
    {
        id: 3,
        name: "Jayakumar",
        type: "WORK",
        mobile: "9344637465",
        address: "Adhiparashakthi college of arts and science opposite, Arcot to cheyyar, mulluvadi, Kalavai, Tamil Nadu - 632506",
        pincode: "632506",
        isDefault: false
    }
];

// Mock cart items
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
    },
    {
        id: 3,
        name: "Premium Wireless Headphones",
        price: 299,
        weight: 0.350,
        sku: "PH-001",
        image: "/images/2.webp"
    },
    {
        id: 4,
        name: "Smart Watch Series 5",
        price: 343,
        weight: 0.120,
        sku: "SW-500",
        image: "/images/3.webp"
    },
     {
        id: 5,
        name: "Premium Wireless Headphones",
        price: 299,
        weight: 0.350,
        sku: "PH-001",
        image: "/images/2.webp"
    },
    {
        id: 6,
        name: "Smart Watch Series 5",
        price: 343,
        weight: 0.120,
        sku: "SW-500",
        image: "/images/3.webp"
    }
];

const STEPS = ['Address', 'Order Summary', 'Payment'];

const MobileCheckoutPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState<number>(1);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
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

    // Calculate order totals
    const { subtotal, platformFee, total, savings } = useMemo(() => {
        const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
        const platformFee = 7;
        const total = subtotal + platformFee;
        const savings = 1751;
        return { subtotal, platformFee, total, savings };
    }, []);

    const selectedAddressData = MOCK_ADDRESSES.find(addr => addr.id === selectedAddress);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleAddressSelect = (addressId: number) => {
        setSelectedAddress(addressId);
    };

    const handleEditAddress = (address: any) => {
        setEditingAddress(address);
        setShowAddressForm(true);
    };

    const handleAddNewAddress = () => {
        setEditingAddress(null);
        setShowAddressForm(true);
    };

    const handleSaveAddress = (addressData: any) => {
        // Handle address save logic
        console.log("Saving address:", addressData);
        setShowAddressForm(false);
        setEditingAddress(null);
    };

    const handlePlaceOrder = () => {
        console.log("Placing order with:", { selectedAddress, paymentMethod });
        // Handle order placement
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return renderAddressStep();
            case 1:
                return renderOrderSummaryStep();
            case 2:
                return renderPaymentStep();
            default:
                return null;
        }
    };

    const renderAddressStep = () => {
        if (showAddressForm) {
            return (
                <AddressForm
                    address={editingAddress}
                    onSave={handleSaveAddress}
                    onCancel={() => setShowAddressForm(false)}
                    isEditing={!!editingAddress}
                />
            );
        }

        return (
            <Box>
                {/* Selected Address Preview */}
                {selectedAddressData && (
                    <Card sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Deliver to:
                            </Typography>
                          
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {selectedAddressData.name} {selectedAddressData.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedAddressData.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedAddressData.pincode}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedAddressData.mobile}
                            </Typography>
                        </Box>
                    </Card>
                )}

                {/* All Addresses List */}
                <Card sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Select Address ({MOCK_ADDRESSES.length})
                    </Typography>

                    <RadioGroup value={selectedAddress} onChange={(e) => handleAddressSelect(Number(e.target.value))}>
                        {MOCK_ADDRESSES.map((address) => (
                            <Box key={address.id} sx={{ mb: 2, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <FormControlLabel
                                        value={address.id}
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    {address.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.type} {address.mobile}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                    {address.address}
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{ alignItems: 'flex-start', margin: 0 }}
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
                        label="Add a new address"
                        appVariant="ghost"
                        startIcon={<Add />}
                        onClick={handleAddNewAddress}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt:2 }}>
                    <Box>
                        <Typography variant="body2" color="body.text">
                            Total: ${total}
                        </Typography>
                    </Box>
                    <AppButton
                        label="Deliver Here"
                        endIcon={<ArrowForward />}
                        onClick={handleNext}
                        sx={{
                            background: '#FCF9EA',
                            color: '#000000',
                            px: 3,
                            '&:hover': {
                                background: '#FCF9EA',
                                color: '#000000',
                            },
                        }}
                    />
                </Box>
            </Box>
        );
    };

    const renderOrderSummaryStep = () => {
        return (
            <Box>
                <Card sx={{ p: 2, borderRadius: 2}}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Order Summary
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
                                {item.sku && (
                                    <Typography variant="body2" color="text.secondary">
                                        SKU: {item.sku}
                                    </Typography>
                                )}
                                <Typography variant="body2" color="text.secondary">
                                    Weight: {item.weight.toFixed(3)} gm
                                </Typography>
                            </Box>
                            <Typography variant="body1" fontWeight={600}>
                                ${item.price}
                            </Typography>
                        </Box>
                    ))}
                </Card>

                {/* Inline footer (visible even if fixed footer shows) */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                       
                        transition: 'margin-bottom 0.3s ease',
                    }}
                >
                    <AppButton
                        label="Back"
                        startIcon={<ArrowBack />}
                        onClick={handleBack}
                        appVariant="ghost"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                            ${total}
                        </Typography>
                        <AppButton
                            label="Continue"
                            endIcon={<ArrowForward />}
                            onClick={handleNext}
                            sx={{
                                background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        );
    };


    const renderPaymentStep = () => {
        return (
            <Box>
            <Card sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Payment
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Payment Methods */}
                <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                        control={<Radio checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />}
                        label={
                            <Box>
                                <Typography fontWeight={600}>Online Payment</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pay using UPI, Credit/Debit Card, Net Banking
                                </Typography>
                            </Box>
                        }
                        sx={{ width: '100%', alignItems: 'flex-start', mb: 2 }}
                    />

                    <FormControlLabel
                        control={<Radio checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />}
                        label={
                            <Box>
                                <Typography fontWeight={600}>Cash on Delivery</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pay when you receive the order
                                </Typography>
                            </Box>
                        }
                        sx={{ width: '100%', alignItems: 'flex-start' }}
                    />
                </Box>

                {/* Price Summary */}
                <Box sx={{ p: 2,  borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Price ({MOCK_CART_ITEMS.length} items)</Typography>
                        <Typography variant="body2">${subtotal}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Platform Fee</Typography>
                        <Typography variant="body2">${platformFee}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight={600}>Total Amount</Typography>
                        <Typography variant="h6" fontWeight={600} color="primary">${total}</Typography>
                    </Box>
                </Box>
            </Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,mt:2 ,mb:2 }}>
                    <AppButton
                        label="Back"
                        startIcon={<ArrowBack />}
                        onClick={handleBack}
                        appVariant="ghost"
                    />
                    <AppButton
                        label={paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                        onClick={handlePlaceOrder}
                        sx={{
                            background: 'linear-gradient(45deg, #ec607eff 30%, #ff53e2ff 90%)',
                            px: 3,
                        }}
                    />

                </Box>
            </Box>
        );
    };

    if (!isMobile) {
        // Return desktop version if needed, or use your existing desktop component
        return null; // You can integrate with your existing desktop component here
    }

    return (
        <Container maxWidth="sm" sx={{ py: 2}}>
            <DynamicBreadcrumbs />
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 3  ,fontSize:{xs:'0.5rem', sm:'0.75rem'}}} alternativeLabel>
                {STEPS.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step Content */}
            {renderStepContent()}

            {/* Sticky Bottom Navigation */}
           <Box sx={{ display: 'flex', justifyContent: 'center',margin:'0 auto' }}>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: isFooterVisible ? -100 : { xs: 0.5, sm: 1.5, md: 2 },
                        left: 0,
                        right: 0,
                        mx: "auto",
                        background: theme.custom.colors.addtoCart,
                        boxShadow: theme.custom.shadows.medium,
                        zIndex: 1000,
                        transition: "bottom 0.3s ease",
                        padding: { xs: 1, sm: 1.5, md: 2 },
                        width: { xs: '90%', sm: '80%' },
                        borderRadius: 2,
                    }}
                >  
                {activeStep === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="body2" color="white">
                                Total: ${total}
                            </Typography>
                        </Box>
                        <AppButton
                            label="Deliver Here"
                            endIcon={<ArrowForward />}
                            onClick={handleNext}
                            sx={{
                                background: '#FCF9EA',
                                color: '#000000',
                                px: 3,
                                '&:hover': {
                                    background: '#FCF9EA',
                                    color: '#000000',
                                },
                            }}
                        />
                    </Box>
                )}

                {activeStep === 1 && (
                    <Box sx={{ display: isFooterVisible?'none':'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AppButton
                            label="Back"
                            startIcon={<ArrowBack />}
                            onClick={handleBack}
                            appVariant="ghost"
                            
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={600} color="white">
                                ${total}
                            </Typography>
                            <AppButton
                                label="Continue"
                                endIcon={<ArrowForward />}
                                onClick={handleNext}
                                sx={{
                                    background: '#FCF9EA',
                                    color: '#000000',
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {activeStep === 2 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AppButton
                            label="Back"
                            startIcon={<ArrowBack />}
                            onClick={handleBack}
                            appVariant="ghost"
                        />
                        <AppButton
                            label={paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                            onClick={handlePlaceOrder}
                            sx={{
                                background: '#FCF9EA',
                                color: '#000000',
                                p:1
                            }}
                        />
                        
                    </Box>
                )}
            </Box>
            </Box>
            <Box id='footer'></Box>
        </Container>
    );
};

export default MobileCheckoutPage;