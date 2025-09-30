"use client";
import TopHeader from "../layout/header/TopHeader";
import Header from "../layout/header/MainHeader";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { useState } from "react";
import AuthDrawer from "../ui/AuthDrawer";

interface HeaderSectionProps {
    pageType: "home" | "productDetail" | "other" | "cart" | "checkout";
    pageName?: string;
}

export default function HeaderSection({ pageType, pageName }: HeaderSectionProps) {
    const router = useRouter();
    const [authOpen, setAuthOpen] = useState(false);
    const [authView, setAuthView] = useState<"login" | "register">("login");

    const handleHome = () => router.push("/");
    const handleCart = () => router.push("/user/cart");

    return (
        <>
            {/* TopHeader */}
            <TopHeader
                message="Free shipping on orders over $50!"
                onLogin={() => {
                    setAuthView("login");
                    setAuthOpen(true);
                }}
                onRegister={() => {
                    setAuthView("register");
                    setAuthOpen(true);
                }}
            />

            {/* MainHeader */}
            <Box className="sticky top-0 z-50 bg-white shadow-sm">
                <Header
                    pageName={pageName || ""}
                    pageType={pageType}
                    userName="Aswin"
                    cartCount={3}
                    wishlistCount={2}
                    onLogin={() => {
                        setAuthView("login");
                        setAuthOpen(true);
                    }}
                    onProfile={() => console.log("Profile clicked")}
                    onCart={handleCart}
                    onWishlist={() => console.log("Wishlist clicked")}
                />
            </Box>

            {/* Auth Drawer */}
            <AuthDrawer
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                initialView={authView} // 👈 pass correct view
            />
        </>
    );
}
