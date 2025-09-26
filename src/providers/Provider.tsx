"use client";

import React, { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store/store";
import theme from "../theme/theme";

interface ProviderProps {
    children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    autoHideDuration={3000}
                >
                 
                        {children}
                  
                </SnackbarProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default Provider;
