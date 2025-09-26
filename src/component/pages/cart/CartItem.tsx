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
} from "@mui/material";
import { DeleteOutline, WarningAmber } from "@mui/icons-material";

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    image: string;
    weight: number;
    sku?: string;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    price,
    image,
    weight,
    sku,
    onRemove,
    
}) => {
    const theme = useTheme();
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

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[1],
                    transition: "all 0.3s ease",
                    '&:hover': {
                        boxShadow: theme.shadows[3],
                        transform: 'translateY(-2px)',
                    },
                }}
            >
                {/* Product Image */}
                <CardMedia
                    component="img"
                    image={image}
                    alt={name}
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 1,
                        objectFit: 'cover',
                        flexShrink: 0,
                    }}
                />

                {/* Product Details */}
                <CardContent sx={{ flex: 1, p: 0, pl: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="h6" component="h3" sx={{
                            fontWeight: 500,
                            lineHeight: 1.2
                        }}>
                            {name}
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{
                            fontWeight: 500,
                            lineHeight: 1
                        }}>
                            {sku}
                        </Typography>

                      
                            <Typography variant="body1" color="primary" fontWeight={600}>
                                Price : ${price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Weight:{weight.toFixed(3)}grams
                            </Typography>
                        
                    </Stack>
                </CardContent>

                {/* Remove Button */}
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

                <DialogActions sx={{ p: 3, gap: 1 }}>
                    <Button
                        onClick={handleCancelDelete}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                        }}
                    >
                        Keep Item
                    </Button>
                    <Button
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
                    >
                        Remove Item
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CartItem;