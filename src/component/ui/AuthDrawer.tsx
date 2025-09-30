"use client";

import React, { useState, useEffect } from "react";
import {
    Drawer,
    Box,
    Tabs,
    Tab,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "../pages/login/LoginForm";
import RegisterForm from "../pages/register/RegisterForm";
import ForgotPasswordForm from "../pages/forgotPassword/ForgotPasswordForm";

interface AuthDrawerProps {
    open: boolean;
    onClose: () => void;
    initialView?: "login" | "register";
}

type AuthView = "login" | "register" | "forgot";

const AuthDrawer: React.FC<AuthDrawerProps> = ({
    open,
    onClose,
    initialView = "login",
}) => {
    const [view, setView] = useState<AuthView>(initialView);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (open) setView(initialView);
    }, [open, initialView]);

    const switchToLogin = () => setView("login");
    const switchToRegister = () => setView("register");
    const switchToForgot = () => setView("forgot");

    return (
        <Drawer
            anchor={isMobile ? "bottom" : "right"}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: isMobile
                    ? {
                        height: "75%",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        width: "100%",
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[8],
                        overflow: "hidden",
                    }
                    : {
                        width: { xs: "100%", sm: "400px", md: "450px" },
                        backgroundColor: theme.palette.background.paper,
                    },
            }}
        >
            <Box sx={{ overflowY: "auto" }}>
             
                    <Box
                        sx={{
                            textAlign: "center",
                            background: "linear-gradient(180deg, #ecc8a3ff, #FFFFFF)",
                            py: 1,
                            px: 2,
                            p:{ xs:1,sm:2 },
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            position: "sticky",
                        }}
                    >
                        {/* Close button */}
                        <IconButton
                            onClick={onClose}
                            sx={{ position: "absolute", top: 5, right: 5 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* Circle with icon */}
                        <Box
                            sx={{
                                position:'absolute',
                                width: 50,
                                height: 50,
                                mx: "auto",
                                borderRadius: "50%",
                                backgroundColor: theme.palette.primary.light,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {/* Placeholder for your logo / icon */}
                            <Typography variant="h5" color="primary">
                                ✨
                            </Typography>
                        </Box>

                        {/* Subtitle */}
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
                        >
                            Personalized experiences
                        </Typography>

                        {/* Title */}
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                        >
                            {view === "login"
                                ? "Welcome Back!"
                                : view === "register"
                                    ? "Join Us Today"
                                    : "Reset Your Password"}
                        </Typography>
                    </Box>
      

                <Box sx={{ p: { xs: 1, md: 2, lg: 3}, background: "linear-gradient(180deg, #ffffff, #f7f3e6ff)", }}>

                    <Box sx={{ mt: 0 }}>
                        {view === "login" && (
                            <LoginForm
                                switchToRegister={switchToRegister}
                                switchToForgot={switchToForgot}
                                onSuccess={onClose}
                            />
                        )}
                        {view === "register" && (
                            <RegisterForm switchToLogin={switchToLogin} />
                        )}
                        {view === "forgot" && (
                            <ForgotPasswordForm switchToLogin={switchToLogin} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default AuthDrawer;
