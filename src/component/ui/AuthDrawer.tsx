"use client";

import React, { useState } from "react";
import { Drawer, Box, Tabs, Tab } from "@mui/material";
import LoginForm from "../pages/login/LoginForm";
import RegisterForm from "../pages/register/RegisterForm";

interface AuthDrawerProps {
    open: boolean;
    onClose: () => void;
}

const AuthDrawer: React.FC<AuthDrawerProps> = ({ open, onClose }) => {
    const [tab, setTab] = useState(0);

    const switchToLogin = () => setTab(0);
    const switchToRegister = () => setTab(1);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: "400px", md: "450px", lg: "500px" },
                },
            }}
        >
            <Box sx={{ p: 3 }}>
                {/* Tabs for switching between Login/Register */}
                <Tabs value={tab} onChange={(_, val) => setTab(val)} centered>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                <Box sx={{ mt: 3 ,backgroundColor:"white"}}> 
                    {tab === 0 ? (
                        <LoginForm switchToRegister={switchToRegister} onSuccess={onClose} />
                    ) : (
                        <RegisterForm switchToLogin={switchToLogin} />
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

export default AuthDrawer;
