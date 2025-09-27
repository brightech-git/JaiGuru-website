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
    console.log("Current pathname:", pathname);
    // Determine pageType based on URL
    let pageType: "home" | "productDetail" | "cart"| "checkout" |"other" = "other";
    if (pathname === "/") pageType = "home";
    else if (pathname === "/user/cart") pageType = "cart";
    else if (pathname === "/user/checkout") pageType = "checkout";
    else if (pathname.startsWith("/user/products/")) pageType = "productDetail";

    const pageTitle = pathname
        .split("/")
        .filter(Boolean)
        .pop() || ""; // take only the last segment

    // Capitalize first letter if it's a word
    const formattedTitle =
        pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <HeaderSection pageType={pageType} pageName={formattedTitle} />
            <Box component="main" sx={{ flex: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
