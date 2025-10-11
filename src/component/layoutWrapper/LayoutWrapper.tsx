// src/components/Layout/Layout.tsx
"use client";

import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import HeaderSection from "./HeaderContainer";
import Footer from "../layout/footer/Footer1";
import { usePathname } from "next/navigation";

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

    // Calculate proper top padding based on page type
    const getMainTopPadding = () => {
        switch (pageType) {
            case "home":
                return { xs: "0px", md: "0px",xl:'0px'}; // Spacer handles the space
            case "productDetail":
                return { xs: "0px", md: "0px" }; // No extra padding needed
            case "cart":
            case "checkout":
                return { xs: "0px", md: "0px" }; // No extra padding needed
            default:
                return { xs: "0px", md: "0px" }; // No extra padding needed
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                overflowX: "hidden",
            }}
        >
            <HeaderSection
                pageType={pageType}
                pageName={getPageTitle()}
            />
            <Box
                component="main"
                sx={{
                    flex: 0,
                    pt: getMainTopPadding(), // Dynamic padding based on page type
                    
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;