"use client";

import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import DesktopCheckoutPage from "./DesktopCheckoutPage";
import MobileCheckoutPage from "./MobileCheckoutPage";

const CheckoutPage: React.FC = () => {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (!mounted) return null; // Render nothing on SSR/hydration

    return isMobile ? <MobileCheckoutPage /> : <DesktopCheckoutPage />;
};

export default CheckoutPage;
