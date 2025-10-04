"use client";
import TopHeader from "../layout/header/TopHeader";
import Header from "../layout/header/MainHeader";
import { useRouter } from "next/navigation";
import { Box, useScrollTrigger } from "@mui/material";
import { useState } from "react";
import AuthDrawer from "../ui/AuthDrawer";
import CategoryHeader from "../layout/header/CategoryHeader";

interface HeaderSectionProps {
    pageType: "home" | "productDetail" | "other" | "cart" | "checkout";
    pageName?: string;
}

export default function HeaderSection({ pageType, pageName }: HeaderSectionProps) {
    const router = useRouter();
    const [authOpen, setAuthOpen] = useState(false);
    const [authView, setAuthView] = useState<"login" | "register">("login");

    // Only enable sticky behavior for home page
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
    });

    const handleCart = () => router.push("/user/cart");
    const handleWishlist = () => router.push("/user/wishlist");

    const showTopHeader = pageType === "home";
    const showCategoryHeader = pageType === "home";

    // Calculate header heights for proper spacing
    const getHeaderHeight = () => {
        if (pageType === "home") {
            return trigger ? "70px" : showTopHeader ? "160px" : "110px";
        }
        return "70px"; // Fixed height for other pages
    };

    return (
        <>
            {/* Top Header - Only for home page */}
            {showTopHeader && (
                <Box
                    sx={{
                        transition: "all 0.3s ease-in-out",
                        transform: trigger ? "translateY(-100%)" : "translateY(0)",
                        opacity: trigger ? 0 : 1,
                        height: trigger ? 0 : "auto",
                        overflow: "hidden",
                    }}
                >
                    <TopHeader
                        message="Free shipping on orders over $50!"
                        onLogin={() => { setAuthView("login"); setAuthOpen(true); }}
                        onRegister={() => { setAuthView("register"); setAuthOpen(true); }}
                    />
                </Box>
            )}

            {/* Main Header */}
            <Box
                sx={{
                    position: pageType === "home" && trigger ? "fixed" : "relative",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 50,
                    backgroundColor: "white",
                    boxShadow: pageType === "home" && trigger ? 2 : 0,
                    transition: "all 0.3s ease-in-out",
                }}
            >
                <Header
                    pageType={pageType}
                    pageName={pageName || ""}
                    userName="Aswin"
                    cartCount={3}
                    wishlistCount={2}
                    onLogin={() => { setAuthView("login"); setAuthOpen(true); }}
                    onProfile={() => console.log("Profile clicked")}
                    onCart={handleCart}
                    onWishlist={handleWishlist}
                    onBack={() => router.back()}
                />
            </Box>

            <Box sx={{ width: "100%" ,display:{ xs: "none", md: "block"}}}> 
                {/* Category Header - Only for home page */}
                {showCategoryHeader && <CategoryHeader />}
            </Box>
            
            {/* Dynamic Spacer - Only when header becomes fixed on home page */}
            {pageType === "home" && trigger && (
                <Box sx={{
                    height: getHeaderHeight(),
                    transition: "height 0.3s ease-in-out",
                }} />
            )}

            {/* Auth Drawer */}
            <AuthDrawer
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                initialView={authView}
            />
        </>
    );
}