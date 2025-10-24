"use client";

import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Badge,
} from "@mui/material";
import {
    Menu as MenuIcon,
    ArrowBack,
    AccountCircle,
    ShoppingCart,
    FavoriteBorder,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SearchBar from "@/component/ui/SearchBar";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import MiniCartModal from "@/component/ui/MiniCartModal";
import MobileCategoryDrawer from "./MobileCategoryDrawer";
import { useCompanyName } from "@/context/name/companyNameContext";
import Image from "next/image";
import SearchDrawer from "@/component/ui/SearchDrawer";

interface HeaderProps {
    pageType?: "home" | "productDetail" | "other" | "cart" | "checkout";
    pageName?: string;
    userName?: string;
    cartCount?: number;
    wishlistCount?: number;
    onLogin?: () => void;
    onProfile?: () => void;
    onCart?: () => void;
    onWishlist?: () => void;
    onBack?: () => void;
    trigger?: boolean | undefined;
}

// Mock cart data - replace with your actual cart data
const mockCartItems = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 99.99,
        quantity: 1,
        image: "/images/2.webp",
        color: "Black",
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 299.99,
        quantity: 1,
        image: "/images/111.jpg",
        color: "Silver",
    },
    {
        id: 3,
        name: "USB-C Charging Cable",
        price: 19.99,
        quantity: 2,
        image: "/images/3.webp",
        color: "White",
    },
];

export default function Header({
    pageType = "home",
    pageName = "",
    userName,
    cartCount = 0,
    wishlistCount = 0,
    onLogin,
    onProfile,
    onCart,
    onWishlist,
    onBack,
    trigger
}: HeaderProps) {
    const isLoggedIn = Boolean(userName);
    const theme = useTheme();
    const router = useRouter();
    const companyName = useCompanyName();

    const logo = companyName?.company?.logo || "/images/2.webp";
    const title = companyName?.company?.name || "VRAjewels";
    const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);

    const [cartOpen, setCartOpen] = useState(false);
    const cartButtonRef = useRef<HTMLButtonElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout>(null);


    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleBack = () => {
        router.back();
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };
    // Handle cart hover with proper timing
    const handleCartMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (cartCount > 0 && pageName?.toLowerCase() !== "cart") {
            setCartOpen(true);
        }
    };

    const handleCartMouseLeave = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as Node;

        // Don't close if moving to the modal
        if (relatedTarget && (relatedTarget as Element).closest?.('.mini-cart-modal')) {
            return;
        }

        hoverTimeoutRef.current = setTimeout(() => {
            setCartOpen(false);
        }, 200);
    };

    const handleCartClick = () => {
        if (onCart) {
            onCart();
        } else {
            router.push('/user/cart');
        }
        setCartOpen(false);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    // Consistent height for all headers
    const headerHeight = { xs: "45px", md: "70px" };

    // Desktop Header
    const renderDesktopHeader = () => {
        switch (pageType) {
            case "home":
            case "other":
            default:
                return (
                    <Toolbar
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "space-between",
                            px: { md: 2, lg: 4 },
                            minHeight: headerHeight,
                            position: 'relative',
                        }}
                    >   
                    <Box display="flex" flexDirection="row"  sx={{alignItems:'center'}} gap={2}>

                            <Image
                                src={logo}
                                alt={title}
                                height={trigger?45:60}
                                width={trigger ? 45 : 60}
                                priority
                                style={{ objectFit: "cover" }}
                            />

                            <Typography
                                variant="h5"
                                sx={{
                                    color: theme.palette.primary.dark,
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontFamily:theme.custom.fonts.special
                                }}
                                onClick={() => router.push('/')}
                            >
                                {title}
                            </Typography>


                    </Box>
                        
                        <Box sx={{ flex: 1, mx: 4, maxWidth: "600px" }}>
                            <SearchBar onFocus={() => setSearchDrawerOpen(true)} />
                                
                        </Box>
                        <Box display="flex" alignItems="center" gap={3} position="relative">
                            {/* Wishlist */}
                            <IconButton onClick={onWishlist}>
                                <Badge badgeContent={wishlistCount} color="secondary">
                                    <FavoriteBorder sx={{ color: theme.palette.primary.dark, }} />
                                </Badge>
                            </IconButton>

                            {/* Cart with Mini Cart Modal */}
                            <Box position="relative">
                                <IconButton
                                    ref={cartButtonRef}
                                    onClick={handleCartClick}
                                    onMouseEnter={handleCartMouseEnter}
                                    onMouseLeave={handleCartMouseLeave}
                                    sx={{
                                        position: 'relative',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        }
                                    }}
                                >
                                    <Badge badgeContent={cartCount} color="secondary">
                                        <ShoppingCart sx={{ color: theme.palette.primary.dark, }} />
                                    </Badge>
                                </IconButton>
                                <MiniCartModal
                                    cartItems={mockCartItems}
                                    cartCount={cartCount}
                                    isOpen={cartOpen}
                                    onClose={() => setCartOpen(false)}
                                    anchorEl={cartButtonRef.current}
                                />
                               
                            </Box>

                            {/* Profile */}
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                onClick={isLoggedIn ? onProfile : onLogin}
                                sx={{
                                    cursor: "pointer",
                                    padding: '8px 12px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                <AccountCircle sx={{ color: theme.palette.primary.dark, }} />
                                <Typography sx={{ color: theme.palette.primary.dark,  fontWeight: 500 }}>
                                    {isLoggedIn ? userName : "Login"}
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                );
        }
    };

    // Mobile Header
    const renderMobileHeader = () => {
        switch (pageType) {
            case "home":
                return (
                    <Toolbar sx={{
                        display: { xs: "flex", md: "none" },
                        px: 2,
                        justifyContent: "space-between",
                        minHeight: headerHeight,
                    }}>
                       
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon sx={{ color: theme.palette.primary.main }} />
                            </IconButton>
                          
                     
                                <Box display="flex" alignItems="center" gap={1}>
                                   <Image
                                    src={logo}
                                    alt={title}
                                    height={trigger ? 45 : 60}
                                    width={trigger ? 45 : 60}
                                    priority
                                    style={{ objectFit: "cover" }}
                                />

                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.primary.dark,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontFamily:theme.custom.fonts.special
                                    }}
                                    onClick={() => router.push('/')}
                                >
                                    {title}
                                </Typography>
                            </Box>

                       
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton onClick={onWishlist}>
                                <Badge badgeContent={wishlistCount} color="secondary">
                                    <FavoriteBorder sx={{ color: theme.palette.primary.main }} />
                                </Badge>
                            </IconButton>
                            <IconButton onClick={handleCartClick}>
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingCart sx={{ color: theme.palette.primary.main }} />
                                </Badge>
                            </IconButton>
                        </Box>
                        <MobileCategoryDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
                    </Toolbar>
                );

            default:
                return (
                    <Toolbar sx={{
                        display: { xs: "flex", md: "none" },
                        justifyContent: "space-between",
                        px: 1,
                        minHeight: headerHeight,
                    }}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton onClick={handleBack}>
                                <ArrowBack sx={{ color: theme.palette.primary.dark }} />
                            </IconButton>
                            <Typography
                                sx={{
                                    color: theme.palette.primary.dark,
                                    fontWeight: 700,
                                    fontSize: "1rem"
                                }}
                            >
                                {pageName || (pageType === "cart" ? "Cart" : pageType === "checkout" ? "Checkout" : "Page")}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            {pageType !== "cart" && pageType !== "checkout" && (
                                <IconButton onClick={handleCartClick}>
                                    <Badge badgeContent={cartCount} color="secondary">
                                        <ShoppingCart sx={{ color: theme.palette.primary.dark }} />
                                    </Badge>
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                );
        }
    };

    return (
        <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{
                backgroundColor: theme.palette.background.default || theme.custom?.colors?.mainHeader ,
                minHeight: headerHeight,
                boxShadow:0,
            }}
        >
            {renderDesktopHeader()}
            {renderMobileHeader()}

            {/* Mobile Search Bar for Home only */}
            {pageType === "home" && (
                <Box
                    sx={{
                        display: { xs: "flex", md: "none" },
                        px: 2,
                        pb: 1,
                    }}
                >
                    <SearchBar />
                </Box>
            )}
            <SearchDrawer
                open={searchDrawerOpen}
                onClose={() => setSearchDrawerOpen(false)}
                trigger={trigger}
                popularSearches={[
                    "Gold Necklace",
                    "Diamond Rings",
                    "Men’s Chains",
                    "Wedding Bangles",
                ]}
                recommended={[
                    { id: 1, title: "18K Gold Ring", image: "/images/2.webp", link: "#" },
                    { id: 2, title: "Ruby Pendant", image: "/images/111.jpg", link: "#" },
                    { id: 3, title: "Silver Bracelet", image: "/images/3.webp", link: "#" },
                    { id: 4, title: "Pearl Necklace", image: "/images/2.webp", link: "#" },
                ]}
            />

        </AppBar>
    );
}