"use client";

import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    InputBase,
    Badge,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    AccountCircle,
    ShoppingCart,
    FavoriteBorder,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SearchBar from "@/component/ui/SearchBar";

interface HeaderProps {
    userName?: string;
    cartCount?: number;
    wishlistCount?: number;
    onLogin?: () => void;
    onProfile?: () => void;
    onCart?: () => void;
    onWishlist?: () => void;
}

export default function Header({
    userName,
    cartCount = 0,
    wishlistCount = 0,
    onLogin,
    onProfile,
    onCart,
    onWishlist,
}: HeaderProps) {
    const isLoggedIn = Boolean(userName);
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            color="inherit"
            elevation={2}
            sx={{ backgroundColor: theme.custom.colors.mainHeader, py: { xs: 0.5, md: 1 } }}
        >
            {/* Desktop Toolbar */}
            <Toolbar
                sx={{
                    display: { xs: "none", md: "flex" },
                    width: "100%",           // full width
                    px: { xs: 2, md: 4 },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                {/* Left: Logo */}
                <Typography
                    variant="h5"
                    sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 }}
                >
                    MyShop
                </Typography>

                {/* Center: Search */}
                <Box sx={{ flex: 1 }}>
                    <SearchBar />
                </Box>


                {/* Right: Profile, Wishlist, Cart */}
                <Box display="flex" alignItems="center" gap={3}>
                    {/* Profile */}
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        onClick={isLoggedIn ? onProfile : onLogin}
                        sx={{ cursor: "pointer" }}
                    >
                        <AccountCircle sx={{ fontSize: 28, color: theme.palette.primary.contrastText }} />
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.primary.contrastText, fontWeight: 500 }}
                        >
                            {isLoggedIn ? userName : "Login"}
                        </Typography>
                    </Box>

                    {/* Wishlist */}
                    <Box display="flex" flexDirection="column" alignItems="center" onClick={onWishlist} sx={{ cursor: "pointer" }}>
                        <Badge badgeContent={wishlistCount} color="secondary">
                            <FavoriteBorder sx={{ fontSize: 28, color: theme.palette.primary.contrastText }} />
                        </Badge>
                        <Typography variant="caption" sx={{ color: theme.palette.primary.contrastText }}>
                            Wishlist
                        </Typography>
                    </Box>

                    {/* Cart */}
                    <Box display="flex" flexDirection="column" alignItems="center" onClick={onCart} sx={{ cursor: "pointer" }}>
                        <Badge badgeContent={cartCount} color="secondary">
                            <ShoppingCart sx={{ fontSize: 28, color: theme.palette.primary.contrastText }} />
                        </Badge>
                        <Typography variant="caption" sx={{ color: theme.palette.primary.contrastText }}>
                            Cart
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>

            {/* Mobile Toolbar */}
            <Toolbar
                sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "space-between",
                    px: 1,
                }}
            >   <Box gap={1} sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton >
                        <MenuIcon sx={{ color: theme.palette.primary.contrastText }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ color: theme.palette.primary.contrastText, fontWeight: 700 }}
                    >
                        MyShop
                    </Typography>
                </Box>


                <Box display="flex" alignItems="center" gap={1}>
                    {/* Profile/Login */}
                    <Box display="flex" alignItems="center" gap={0.5} onClick={isLoggedIn ? onProfile : onLogin} sx={{ cursor: "pointer" }}>
                        <AccountCircle sx={{ color: theme.palette.primary.contrastText }} />
                        <Typography variant="body2" sx={{ color: theme.palette.primary.contrastText }}>
                            {isLoggedIn ? userName : "Login"}
                        </Typography>
                    </Box>

                    {/* Wishlist */}
                    <IconButton onClick={onWishlist}>
                        <Badge badgeContent={wishlistCount} color="secondary">
                            <FavoriteBorder sx={{ color: theme.palette.primary.contrastText }} />
                        </Badge>
                    </IconButton>

                    {/* Cart */}
                    <IconButton onClick={onCart}>
                        <Badge badgeContent={cartCount} color="primary">
                            <ShoppingCart sx={{ color: theme.palette.primary.contrastText }} />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>

            {/* Mobile: Search Bar */}
            <Box
                sx={{
                    display: { xs: "flex", md: "none" }, // mobile only
                    px: 0,
                    py: 0.5,
                    bgcolor: theme.custom.colors.subtleBlue,
                    borderRadius: 2,
                    mx: 1,
                    mt: 1,
                }}
            >
                <SearchBar />
            </Box>

        </AppBar>
    );
}
