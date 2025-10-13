"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, useTheme,Divider } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppButton from "./AppButton";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    name: string;
    price: string | number;
    images: string[];
    link?: string | number;
    backgroundColor?: string;
    itemSno?: string;
    isWishlisted?: boolean;
    onToggleWishlist?: (itemSno: string) => void;
    onAddToCart?: (item: { itemSno: string; itemName: string; price: number; image: string }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    name,
    price,
    images,
    link,
    backgroundColor,
    itemSno,
    isWishlisted = false,
    onToggleWishlist,
    onAddToCart,
}) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    console.log("Rendering ProductCard:", { name, price, images, link, backgroundColor, itemSno, isWishlisted });
    const theme = useTheme();
    const bg = backgroundColor || theme.palette.background.paper;
    const textColor = theme.palette.getContrastText(bg);
    const [hovered, setHovered] = useState(false);
    const [showSecondImage, setShowSecondImage] = useState(false);
    const [heartAnimation, setHeartAnimation] = useState(false);
    const [cartAnimation, setCartAnimation] = useState(false);
    const [isTouchActive, setIsTouchActive] = useState(false);
    const hasMultipleImages = images.length > 1;

    useEffect(() => {
        let hoverTimer: NodeJS.Timeout;
        if ((hovered || isTouchActive) && hasMultipleImages) {
            hoverTimer = setTimeout(() => setShowSecondImage(true), 100);
        } else if (!(hovered || isTouchActive) && hasMultipleImages) {
            setShowSecondImage(false);
        }
        return () => clearTimeout(hoverTimer);
    }, [hovered, isTouchActive, hasMultipleImages]);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (itemSno && onToggleWishlist) {
            setHeartAnimation(true);
            onToggleWishlist(itemSno);
            setTimeout(() => setHeartAnimation(false), 600);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        if (isAuthenticated) {
            router.push("user/customer/login"); // redirect to login if not logged in
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (itemSno && onAddToCart) {
            setCartAnimation(true);
            onAddToCart({
                itemSno,
                itemName: name,
                price: Number(price),
                image: images[0],
            });
            setTimeout(() => setCartAnimation(false), 600);
        }
    };

    const handleTouchToggle = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsTouchActive((prev) => !prev);
    };

    return (
        <Box
            
        
            className="card-container"
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                textDecoration: "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={handleTouchToggle}
        >
            <Box
                component="a"
                className="product-item"
                href={link ? String(link) : "#"}
                sx={{
                    position: "relative",
                    background: bg,
                    borderRadius: "0px",
                    overflow: "hidden",
                    border: "1px solid #ebebeb",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
            >
                {/* Image Section */}
                <Box
                    className="image-wrapper"
                    sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1/1",
                        overflow: "hidden",
                        backgroundColor: theme.palette.grey[100],
                    }}
                >
                    <Box className="image-container">
                        {images[0] && (
                            <Image
                                src={images[0]}
                                alt={name}
                                fill
                                style={{
                                    objectFit: "cover",
                                    transition: "opacity 0.5s ease",
                                    filter: "brightness(1.02)",
                                    opacity: showSecondImage && hasMultipleImages ? 0 : 1,
                                }}
                                sizes="(max-width: 600px) 220px, (max-width: 960px) 260px, 320px"
                                onError={(e) => {
                                    e.currentTarget.src = "/Fallback-icon.png";
                                }}
                            />
                        )}
                        {hasMultipleImages && (
                            <Image
                                src={images[1]}
                                alt={name}
                                fill
                                style={{
                                    objectFit: "cover",
                                    transition: "opacity 0.5s ease",
                                    filter: "brightness(1.05)",
                                    opacity: showSecondImage ? 1 : 0,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                                sizes="(max-width: 600px) 220px, (max-width: 960px) 260px, 320px"
                                onError={(e) => {
                                    e.currentTarget.src = images[0];
                                }}
                            />
                        )}
                    </Box>
                    {/* Wishlist Icon */}
                    <IconButton
                        onClick={handleWishlistToggle}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: theme.palette.background.paper,
                            borderRadius: "50%",
                            p: 0.5,
                            boxShadow: theme.custom.shadows.light,
                            "&:hover": {
                                bgcolor: theme.palette.background.paper,
                            },
                            transform: heartAnimation ? "scale(1.2)" : "scale(1)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        {isWishlisted ? (
                            <FavoriteIcon
                                sx={{
                                    color: theme.custom.colors.danger,
                                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                                }}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                                }}
                            />
                        )}
                    </IconButton>
                </Box>

                {/* Product Details */}
                <Box
                    className="item-info"
                    sx={{
                        p: { xs: "8px 6px", sm: "10px 8px", md: "12px 10px" },
                        textAlign: "center",
                        backgroundColor: bg,
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography
                            variant="subtitle1"
                            className="item-name"
                            sx={{
                                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                                fontFamily: theme.typography.fontFamily,
                                textTransform: "capitalize",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                mb: { xs: 0.5, sm: 0.75 },
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="h6"
                            className="new-price"
                            sx={{
                                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.9rem" },
                                fontFamily: theme.typography.fontFamily,
                            }}
                        >
                            ${Number(price).toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
                <AppButton
                    label="Add to Cart"
                    
                    fontVariant="shadow"
                    className={`action-button add-cart-btn ${cartAnimation ? "cart-animation" : ""}`}
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "100%" },
                        height: { xs: "28px", sm: "32px", md: "36px" },
                        fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" },
                        fontWeight: 600,
                        borderRadius: "0px",
                        padding: "0 12px",
                        background: 'linear-gradient(360deg, #ff80b5af, #fd679eff) !important', 
                        color: textColor,
                      
                        "&:hover": {
                            background: theme.palette.action.hover,
                        },
                    
                        
                    }}
                    onClick={handleAddToCart}
                />
            </Box>
        </Box>
    );
};

export default ProductCard;