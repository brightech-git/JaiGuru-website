// src/components/Layout/Layout.tsx
"use client";

import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import HeaderSection from "./HeaderContainer";
import Footer from "../layout/footer/Footer1";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <HeaderSection />
            <Box component="main" sx={{ flex: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
