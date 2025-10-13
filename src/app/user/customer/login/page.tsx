"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link as MuiLink, Paper, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { login } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@/redux/store/store";

const LoginForm: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier || !password) {
            setLocalError("Please fill in all fields");
            return;
        }

        try {
            const result = await dispatch(
                login(
                    { contactOrEmailOrUsername: identifier, password },
                   
                )
            ).unwrap();
            console.log("Login successful:", result);
            enqueueSnackbar("✅ Login successful!", { variant: "success" });
            if (result?.token) {
                setIdentifier("");
                setPassword("");
                setLocalError(null);
                router.push("/"); // redirect home
            }
        } catch (err: any) {
            setLocalError(err || "Login failed");
            enqueueSnackbar(err || "Login failed", { variant: "error" });
        }
    };

    useEffect(() => {
        if (localError) {
            const timer = setTimeout(() => setLocalError(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [localError]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.custom.colors.subtleBlue,
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: isMobile ? "100%" : 450,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: theme.custom.shadows.medium,
                }}
            >
                <Typography variant="h4" mb={3} textAlign="center" color={theme.palette.primary.main}>
                    Log in
                </Typography>

                {localError && (
                    <Box
                        mb={2}
                        sx={{ color: theme.palette.error.main, textAlign: "center", fontWeight: 500 }}
                    >
                        {localError}
                    </Box>
                )}

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email Address or Phone Number"
                        variant="outlined"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Box textAlign="right" mb={2}>
                        <MuiLink href="/forgot-password" underline="hover" variant="body2">
                            Forgot Password?
                        </MuiLink>
                    </Box>

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mb: 2, py: 1.5 }}>
                        Login
                    </Button>

                    <Typography variant="body2" textAlign="center">
                        Don't have an account?{" "}
                        <MuiLink href="/user/customer/register" underline="hover">
                            Create One
                        </MuiLink>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginForm;
