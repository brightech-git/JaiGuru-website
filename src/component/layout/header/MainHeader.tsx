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
    Search as SearchIcon,
    ArrowBack,
    AccountCircle,
    ShoppingCart,
    FavoriteBorder,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SearchBar from "@/component/ui/SearchBar";
import { useRouter } from "next/navigation";


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
}

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
}: HeaderProps) {
    const isLoggedIn = Boolean(userName);
    const theme = useTheme();
    const router = useRouter();


    const handleBack = () => {
        router.back();
    };
    


    // Desktop Header
    const renderDesktopHeader = () => {
        switch (pageType) {
            case "home":
            case "productDetail":
            default:
                return (
                    <Toolbar
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "space-between",
                            px: 4,
                            py:0
                        }}
                    >
                        <Typography variant="h5" sx={{ color: theme.palette.primary.contrastText ,cursor:'pointer'}} onClick={() => router.push('/')} >
                            MyShop
                        </Typography>
                        <Box sx={{ flex: 1, mx: 4 }}>
                            <SearchBar />
                        </Box>
                        <Box display="flex" alignItems="center" gap={3}>
                            {/* Wishlist */}
                            <IconButton onClick={onWishlist}>
                                <Badge badgeContent={wishlistCount} color="secondary">
                                    <FavoriteBorder sx={{ color: theme.palette.primary.contrastText }} />
                                </Badge>
                            </IconButton>
                            {/* Cart */}
                            <IconButton onClick={onCart}>
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingCart sx={{ color: theme.palette.primary.contrastText }}  />
                                </Badge>
                            </IconButton>
                            {/* Profile */}
                            <Box display="flex" alignItems="center" gap={1} onClick={isLoggedIn ? onProfile : onLogin} sx={{ cursor: "pointer" }}>
                                <AccountCircle sx={{ color: theme.palette.primary.contrastText }} />
                                <Typography sx={{ color: theme.palette.primary.contrastText }}>
                                    {isLoggedIn ? userName : "Login"}
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                );

           
                // return (
                //     <Toolbar
                //         sx={{
                //             display: { xs: "none", md: "flex" },
                //             justifyContent: "space-between",
                //             px: 4,
                //         }}
                //     >
                //         <IconButton onClick={onBack}>
                //             <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                //         </IconButton>
                //         <Box sx={{ flex: 1, mx: 4 }}>
                //             <SearchBar />
                //         </Box>
                //         <IconButton onClick={onCart}>
                //             <Badge badgeContent={cartCount} color="secondary">
                //                 <ShoppingCart sx={{ color: theme.palette.primary.contrastText }} />
                //             </Badge>
                //         </IconButton>
                //     </Toolbar>
                // );

           
                // return (
                //     <Toolbar
                //         sx={{
                //             display: { xs: "none", md: "flex" },
                //             justifyContent: "space-between",
                //             px: 4,
                //         }}
                //     >
                //         <IconButton onClick={onBack}>
                //             <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                //         </IconButton>
                //         <Box sx={{ flex: 1, mx: 4 }}>
                //             <SearchBar />
                //         </Box>
                //         <Box display="flex" alignItems="center" gap={3}>
                //             <IconButton onClick={onCart}>
                //                 <Badge badgeContent={cartCount} color="secondary">
                //                     <ShoppingCart sx={{ color: theme.palette.primary.contrastText }} />
                //                 </Badge>
                //             </IconButton>
                //             <Box display="flex" alignItems="center" gap={1} onClick={isLoggedIn ? onProfile : onLogin} sx={{ cursor: "pointer" }}>
                //                 <AccountCircle sx={{ color: theme.palette.primary.contrastText }} />
                //                 <Typography sx={{ color: theme.palette.primary.contrastText }}>
                //                     {isLoggedIn ? userName : "Login"}
                //                 </Typography>
                //             </Box>
                //         </Box>
                //     </Toolbar>
                // );
        }
    };

    // Mobile Header
    const renderMobileHeader = () => {
        switch (pageType) {
            case "home":
                return (
                    <Toolbar sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", px: 2 }}>
                        <IconButton>
                            <MenuIcon sx={{ color: theme.palette.primary.contrastText }} />
                        </IconButton>
                        <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 ,cursor:"pointer"}}  onClick={() => router.push('/')} >
                            MyShops
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton onClick={onWishlist}>
                                <Badge badgeContent={wishlistCount} color="secondary">
                                    <FavoriteBorder sx={{ color: theme.palette.primary.contrastText }} />
                                </Badge>
                            </IconButton>
                            <IconButton onClick={onCart}>
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingCart sx={{ color: theme.palette.primary.contrastText }} />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>
                );

            case "productDetail":
                // Dynamic title
             

                return (
                    <Toolbar sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", px: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                        <IconButton onClick={handleBack}>
                            <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                        </IconButton>
                        <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 }}>
                            {pageName || "Product"}
                        </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton>
                                <SearchIcon sx={{ color: theme.palette.primary.contrastText }} />
                            </IconButton>
                            <IconButton onClick={onCart}>
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingCart sx={{ color: theme.palette.primary.contrastText }} />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>
                );
            case "cart":
                // Dynamic title
                const pageTitle = pageType === "cart" ? "Cart Page" : "Page";

                return (
                    <Toolbar sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", px: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <IconButton onClick={handleBack}>
                                <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                            </IconButton>
                            <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 }}>
                                {pageName || pageTitle}
                            </Typography>
                        </Box>
                     
                    </Toolbar>
                );

            case "checkout":
                // Dynamic title
             

                return (
                    <Toolbar sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", px: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <IconButton onClick={handleBack}>
                                <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                            </IconButton>
                            <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 }}>
                                {pageName || "Checkout"}
                            </Typography>
                        </Box>

                    </Toolbar>
                );
            case "other":
                // Dynamic title
            

                return (
                    <Toolbar sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", px: 1 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                        <IconButton onClick={handleBack}>
                            <ArrowBack sx={{ color: theme.palette.primary.contrastText }} />
                        </IconButton>
                     
                        <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 }}>
                            {pageName || ""}
                        </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                           <SearchBar />
                            <IconButton onClick={onCart}>
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingCart sx={{ color: theme.palette.primary.contrastText }} />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>
                );
        }
    };

    return (
        <AppBar position="static" color="inherit" elevation={2} sx={{ backgroundColor: theme.custom.colors.mainHeader, py: { xs: 0.5, md: 1 } }}>
            {renderDesktopHeader()} {/* unchanged */}
            {renderMobileHeader()}

            {/* Mobile Search Bar for Home only */}
            {pageType === "home" && (
                <Box
                    sx={{
                        display: { xs: "flex", md: "none" },
                        px: 1,
                        bgcolor: theme.custom.colors.subtleBlue,
                        borderRadius: 2,
                        mx: 1,
                    }}
                >
                    <SearchBar />
                </Box>
            )}
        </AppBar>
    );
}
