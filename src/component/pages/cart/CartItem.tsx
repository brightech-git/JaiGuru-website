"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    useTheme,
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    useMediaQuery,
    Divider,
} from "@mui/material";
import { DeleteOutline, WarningAmber, ShoppingCartCheckout } from "@mui/icons-material";
import AppButton from "@/component/ui/AppButton";

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    image: string;
    weight: number;
    sku?: string;
    onRemove: (id: number) => void;
    onBuyNow?: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    price,
    image,
    weight,
    sku,
    onRemove,
    onBuyNow,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleRemoveClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        onRemove(id);
        setDeleteDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };

    const handleBuyNow = () => {
        onBuyNow?.(id);
    };

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: { xs: 1, md: 2 },
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[1],
                    transition: "all 0.3s ease",
                    '&:hover': {
                        boxShadow: theme.shadows[3],
                        transform: { md: 'translateY(-2px)' },
                    },
                    flexDirection: { xs: 'column', md: 'row' },
                    position: 'relative',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' ,flexDirection:'row',gap:2}}>                {/* Product Image */}
                <CardMedia
                    component="img"
                    image={image}
                    alt={name}
                    sx={{
                        width: { xs: 100, md: 100 },
                        height: { xs: 100, md: 100 },
                        borderRadius: 1,
                        objectFit: 'cover',
                        flexShrink: 0,
                    }}
                />

                {/* Product Details */}
                <CardContent sx={{
                    flex: 1,
                    p: 0,
                    pl: { md: 2 },
                    width: { xs: '100%', md: 'auto' },
                    mt: { xs: 1, md: 0 }
                }}>
                    <Stack spacing={1}>
                        <Typography variant="h6" component="h3" sx={{
                            fontWeight: 500,
                            lineHeight: 1.2,
                            fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}>
                            {name}
                        </Typography>

                        {sku && (
                            <Typography variant="body2" component="p" sx={{
                                fontWeight: 400,
                                lineHeight: 1,
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.875rem', md: '1rem' }
                            }}>
                                SKU: {sku}
                            </Typography>
                        )}

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0.5, md: 2 }}>
                            <Typography variant="body1" color="primary" fontWeight={600}>
                                Price: ${price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Weight: {weight.toFixed(3)} grams
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
              
                </Box>
                {/* Desktop Remove Button */}
                {!isMobile && (
                    <IconButton
                        onClick={handleRemoveClick}
                        aria-label={`Remove ${name} from cart`}
                        sx={{
                            color: theme.palette.text.secondary,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: theme.palette.error.light,
                                color: theme.palette.error.main,
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <DeleteOutline />
                    </IconButton>
                )}
                <Divider sx={{ width: '100%', display:{md:'none'}}} />
                {/* Mobile Action Buttons */}
                {isMobile && (
                   
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            width: '100%',
                            mt: 1,
                            justifyContent: 'space-between'
                        }}
                    >
                        <AppButton
                            label="Remove"
                            appVariant="ghost"
                            fontVariant="shadow"
                            color="error"
                            startIcon={<DeleteOutline />}
                            onClick={handleRemoveClick}
                            size="small"
                            sx={{
                                flex: 1,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 500,
                            }}
                        />
                           

                        <AppButton
                            label="Buy Now"
                            appVariant="secondary"
                            fontVariant="shadow"
                            onClick={handleBuyNow}
                            size="small"
                            sx={{
                                flex: 1,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 500,
                               
                            }}
                        />
                          
                    </Stack>
                )}
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="delete-dialog-title"
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        maxWidth: '400px',
                        m: { xs: 2, md: 3 }
                    }
                }}
            >
                <DialogTitle id="delete-dialog-title" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme.palette.warning.main
                }}>
                    <WarningAmber />
                    Remove Item
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="body1">
                            Are you sure you want to remove this item from your cart?
                        </Typography>

                        {/* Item Preview */}
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'background.default' }}>
                            <CardMedia
                                component="img"
                                image={image}
                                alt={name}
                                sx={{ width: 60, height: 60, borderRadius: 1 }}
                            />
                            <Box sx={{ ml: 2, flex: 1 }}>
                                <Typography variant="subtitle2" fontWeight={500}>
                                    {name}
                                </Typography>
                                <Typography variant="body2" color="primary" fontWeight={600}>
                                    ${price.toFixed(2)}
                                </Typography>
                            </Box>
                        </Card>

                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            This action cannot be undone.
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <AppButton
                        label="Keep Item"
                        onClick={handleCancelDelete}
                        appVariant="ghost"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                        }}
                    />
                        
                    <AppButton
                        label="Remove Item"
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 3,
                        }}
                        autoFocus
                    />
                      
             
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CartItem;