"use client";

import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import DesktopCheckoutPage from "./DesktopCheckoutPage";
import MobileCheckoutPage from "./MobileCheckoutPage";

const CheckoutPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
           defaultMatches: true,  // assume mobile until proven otherwise
   
       });

    return isMobile ? <MobileCheckoutPage /> : <DesktopCheckoutPage />;
};

export default CheckoutPage;