// src/components/Layout/Layout.tsx
"use client";

import React, { ReactNode ,useState } from "react";
import { Box } from "@mui/material";
import HeaderSection from "./HeaderContainer";
import Footer from "../layout/footer/Footer1";
import { usePathname } from "next/navigation";
import IntroLoader from '@/component/intro/IntroLoader';
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();

    // Enhanced page type detection
    let pageType: "home" | "productDetail" | "cart" | "checkout" | "other" = "other";

    if (pathname === "/") pageType = "home";
    else if (pathname === "/user/cart") pageType = "cart";
    else if (pathname === "/user/checkout") pageType = "checkout";
    else if (pathname?.startsWith("/user/products/")) pageType = "productDetail";

    // Better page title formatting
    const getPageTitle = () => {
        const segments = pathname?.split("/").filter(Boolean) || [];
        if (segments.length === 0) return "Home";
        const lastSegment = segments[segments.length - 1];
        return lastSegment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Enhanced main content with better spacing
    const getMainTopPadding = () => {
        switch (pageType) {
            case "home":
                return { xs: "0px", md: "0px", xl: "0px" };
            case "productDetail":
                return { xs: "0px", md: "0px" };
            case "cart":
            case "checkout":
                return { xs: "0px", md: "0px" };
            default:
                return { xs: "0px", md: "0px" };
        }
    };
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                overflowX: "hidden",
            }}
        >
            {!isLoaded && (
                <IntroLoader
                    clientImage="/images/2.webp"
                    onFinish={() => setIsLoaded(true)}
                />
            )}
            {isLoaded && <Box>
                <HeaderSection
                    pageType={pageType}
                    pageName={getPageTitle()}
                />
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        pt: getMainTopPadding(), // Dynamic padding based on page type
                        minHeight: "calc(100vh - 60px)", // Ensure footer stays at bottom
                    }}
                >
                    {children}
                </Box>
                <Footer />
            </Box> }
   
        </Box>
    );
};

export default Layout;