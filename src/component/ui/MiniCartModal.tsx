"use client";

import {
    Paper,
    Fade,
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import {
    Close,
    Delete,
    ShoppingCart,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import Image from "next/image";
import AppButton from "./AppButton";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
}

interface MiniCartModalProps {
    cartItems?: CartItem[];
    cartCount?: number;
    isOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

export default function MiniCartModal({
    cartItems = [],
    cartCount = 0,
    isOpen,
    onClose,
    anchorEl,
}: MiniCartModalProps) {
    const theme = useTheme();
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout>(null);

    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleViewCart = () => {
        onClose();
        router.push('/user/cart');
    };

    const handleQuickCheckout = () => {
        onClose();
        router.push('/user/checkout');
    };

    const handleRemoveItem = (id: number) => {
        // Implement remove item logic here
        console.log('Remove item:', id);
    };

    // Handle hover behavior
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handleMouseLeave = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as Node;

        // Don't close if moving back to the cart button
        if (relatedTarget && anchorEl && anchorEl.contains(relatedTarget)) {
            return;
        }

        hoverTimeoutRef.current = setTimeout(() => {
            onClose();
        }, 200);
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                anchorEl &&
                !anchorEl.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [isOpen, anchorEl, onClose]);

    if (!isOpen) return null;

    return (
        <Fade in={isOpen} timeout={200}>
            <Paper
                ref={modalRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="mini-cart-modal absolute top-full right-0 w-96 bg-white shadow-xl rounded-lg z-50 overflow-hidden mt-2 border border-gray-200"
                sx={{
                    // Bridge the gap between button and modal
                    marginTop: '4px',
                }}
            >
                {/* Header */}
                <Box className="p-4 border-b border-gray-200">
                    <Box className="flex justify-between items-center">
                        <Box className="flex items-center gap-2">
                            <Typography
                                variant="h6"
                                className="font-semibold text-lg text-gray-900"
                            >
                                Your Mini Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                            </Typography>
                        </Box>
                        <IconButton
                            size="small"
                            onClick={onClose}
                            className="text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                {/* Cart Items */}
                <Box className="max-h-64 overflow-y-auto p-2">
                    {cartItems.length === 0 ? (
                        <Box className="text-center py-8">
                            <ShoppingCart
                                className="text-gray-400 text-4xl mx-auto mb-3"
                                sx={{ fontSize: 40 }}
                            />
                            <Typography className="text-gray-500 text-lg font-medium">
                                Your cart is empty
                            </Typography>
                            <Typography className="text-gray-400 text-sm mt-1">
                                Add some items to get started
                            </Typography>
                        </Box>
                    ) : (
                        cartItems.map((item) => (
                            <Box
                                key={item.id}
                                className="p-3 border border-gray-200 rounded-lg mb-2 hover:shadow-md transition-all duration-200 bg-white"
                            >
                                <Box className="flex gap-3 items-start">
                                    {/* Product Image */}
                                    <Box className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            objectFit="cover"
                                        />
                                    </Box>

                                    {/* Product Details */}
                                    <Box className="flex-1 min-w-0">
                                        <Typography
                                            className="font-medium text-gray-900 text-sm truncate leading-tight"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography className="text-gray-500 text-xs mt-1">
                                            Color: {item.color}
                                        </Typography>
                                        <Typography className="font-semibold text-blue-600 text-sm">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Box>

                                    {/* Remove Button */}
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:bg-red-50 self-start transition-colors duration-200"
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Subtotal */}
                {cartItems.length > 0 && (
                    <Box className="p-2  px-4 border-t border-gray-200 bg-grey-400">
                        <Box className="flex justify-between items-center">
                            <Typography className="font-semibold text-gray-900 text-base">
                                Subtotal
                            </Typography>
                            <Typography className="font-bold text-blue-600 text-xl">
                                ${subtotal.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Buttons */}
                {cartItems.length > 0 && (
                    <Box className="p-4 border-t border-gray-200 bg-white">
                        <Box className="flex gap-3">
                            <AppButton
                                label="View Cart"
                                appVariant="ghost"
                                fullWidth
                                onClick={handleViewCart}
                                className="py-2 text-sm font-semibold hover:shadow-md transition-all duration-200"
                                sx={{ borderRadius: '50px' }}
                            />
                            <AppButton
                                label="Quick Checkout"
                                appVariant="secondary"
                                fullWidth
                                onClick={handleQuickCheckout}
                                className="py-2 text-sm font-semibold hover:shadow-md transition-all duration-200"
                                sx={{borderRadius: '50px' , background: 'linear-gradient(90deg, #ee9a3aff, #f782adff)', color: '#000' ,fontWeight: 500}}
                            />
                        </Box>
                    </Box>
                )}
            </Paper>
        </Fade>
    );
}