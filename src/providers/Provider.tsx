"use client";

import React, { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider as ReduxProvider } from "react-redux";
import TransitionWrapper from "@/component/transition/TransitionWrapper";
import { store } from "@/redux/store/store";
import theme from "../theme/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CompanyNameProvider } from "@/context/name/companyNameContext";
import { NavigationProvider } from "@/context/transition/NavigationContext";
import { NotificationProvider } from "@/context/notification/NotificationContext";
import NotificationRequestModal from "@/component/notification/NotificationRequestModal";

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

                        <TransitionWrapper transitionType="slide">
                            <CompanyNameProvider>
                                <NavigationProvider>
                                    <NotificationProvider>


                                        {children}


                                        <NotificationRequestModal />
                                    </NotificationProvider>
                                </NavigationProvider>
                            </CompanyNameProvider>


                        </TransitionWrapper>

                    </SnackbarProvider>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
