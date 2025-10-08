"use client";

import React, { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store/store";
import theme from "../theme/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

const AppProvider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
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
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
