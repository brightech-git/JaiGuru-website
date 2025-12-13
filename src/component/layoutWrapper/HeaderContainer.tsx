'use client';

import TopHeader from "../layout/header/TopHeader";
import Header from "../layout/header/MainHeader";
import { useRouter } from "next/navigation";
import { Box, useScrollTrigger, useTheme } from "@mui/material";
import { useState } from "react";
import AuthDrawer from "../ui/AuthDrawer";
import CategoryHeader from "../layout/header/CategoryHeader";
import AnimatedWrapper from "../ui/AnimatedWrapper";

interface HeaderSectionProps {
    pageType: "home" | "productDetail" | "other" | "cart" | "checkout";
    pageName?: string;
}

export default function HeaderSection({ pageType, pageName }: HeaderSectionProps) {
    const router = useRouter();
    const theme = useTheme();
    const [authOpen, setAuthOpen] = useState(false);
    const [authView, setAuthView] = useState<"login" | "register">("login");

    // Enable sticky behavior for TopHeader on home page
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
        const mainHeaderHeight = pageType==="home"?"30px":"50px"; // Fixed height for MainHeader
        const categoryHeaderHeight = showCategoryHeader ? "50px" : "0px"; // Estimated CategoryHeader height
        if (pageType === "home") {
            return trigger ? `calc(${mainHeaderHeight} + ${categoryHeaderHeight})` : `calc(${mainHeaderHeight} + ${categoryHeaderHeight} + ${showTopHeader ? "50px" : "0px"})`;
        }
        return mainHeaderHeight; // Only MainHeader height for other pages
    };

    return (
        <>
            {/* Top Header - Only for home page */}
            {showTopHeader && (
                <Box
                    sx={{
                        transition: "all 0.3s ease-in-out",
                        transform: trigger ? "translateY(-100%)" : "translateY(0)",
                        overflow: "hidden",
                        backgroundColor: theme.custom.colors.topHeader,
                        boxShadow: theme.custom.shadows.light,
                        zIndex: 60,
                    }}
                >
                    <TopHeader
                        message="Free shipping on orders over $50!"
                        onLogin={() => { setAuthView("login"); setAuthOpen(true); }}
                        onRegister={() => { setAuthView("register"); setAuthOpen(true); }}
                    />
                </Box>
            )}

            {/* Main Header - Fixed on all pages */}
            <Box
                sx={{
                    position: "fixed",
                    top: pageType === "home" ? (trigger ? 0 : {xs:30 ,lg:35}) : 0,
                    left: 0,
                    width: "100%",
                    zIndex: 50,
                    boxShadow: pageType === "home" ? (trigger ? theme.custom.shadows.medium : 0 ) : theme.custom.shadows.medium, 
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
                    trigger={trigger}
                />
            </Box>

            {/* Category Header - Only for home page */}
            {showCategoryHeader && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0, // Below MainHeader
                        left: 0,
                        width: "100%",
                        zIndex: 49,
                        backgroundColor: theme.custom.colors.categoryHeader,
                        boxShadow: theme.custom.shadows.light,
                        transition: "all 0.3s ease-in-out",
                        transform: trigger && showTopHeader ? "translateY(-50px)" : "translateY(0)",
                        opacity: trigger && showTopHeader ? 0 : 1,
                        display: { xs: "none", md: "block" }, // Hidden on mobile
                    }}
                >
                    <CategoryHeader />
                </Box>
            )}

            {/* Dynamic Spacer */}
            <Box
                sx={{
                    height: getHeaderHeight(),
                    transition: "height 0.3s ease-in-out",
                }}
            />

            {/* Auth Drawer */}
            {/* Auth Drawer — render above all */}
            <Box sx={{ position: "relative", zIndex: 2000 }}>
                <AnimatedWrapper componentId="drawer" animationType="fadeUp" delay={0.4}>
                    <AuthDrawer
                        open={authOpen}
                        onClose={() => setAuthOpen(false)}
                        initialView={authView}
                    />
                </AnimatedWrapper>
            </Box>

        </>
    );
}