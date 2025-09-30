"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link as MuiLink,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { login } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@/redux/store/store";

interface LoginFormProps {
    switchToForgot?: () => void; // 👈 so we can switch tab in AuthDrawer
    switchToRegister?: () => void; // 👈 so we can switch tab in AuthDrawer
    onSuccess?: () => void; // 👈 new prop
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister, onSuccess, switchToForgot }) => {
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
                login({ contactOrEmailOrUsername: identifier, password })
            ).unwrap();

            enqueueSnackbar("✅ Login successful!", { variant: "success" });

            if (result?.token) {
                setIdentifier("");
                setPassword("");
                setLocalError(null);
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push("/"); // fallback
                }
            }
        } catch (err: any) {
            const message =
                typeof err === "string"
                    ? err
                    : err?.message || "Login failed";

            setLocalError(message);
            enqueueSnackbar(message, { variant: "error" });
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
                p: { xs: 1, sm: 2 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
               
            }}
        >
            <Typography
                variant="h5"
                textAlign="center"
                color={theme.palette.primary.main}
                fontWeight={600}
                mb={{xs:0,md:1}}
            >
                Continue to Your Account
            </Typography>

            {localError && (
                <Typography
                    variant="body2"
                    sx={{ color: theme.palette.error.main, textAlign: "center" }}
                >
                    {localError}
                </Typography>
            )}


            <form onSubmit={handleLogin}>
                <TextField
                    fullWidth
                    label="Email Address or Phone Number"
                    variant="outlined"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    sx={{ mb: {xs:1,md:2} }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 1 }}
                />

                <Box textAlign="right" mb={2}>
                    <MuiLink  underline="hover" variant="body2" onClick={switchToForgot} >
                        Forgot Password?
                    </MuiLink>
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ py: 1.3, fontWeight: 600 }}
                >
                    Login
                </Button>
            </form>

            <Typography variant="body2" textAlign="center" mt={2}>
                Don&apos;t have an account?{" "}
                <MuiLink
                    component="button"
                    onClick={switchToRegister} // 👈 will switch tab instead of redirect
                    underline="hover"
                    sx={{ fontWeight: 600 }}
                >
                    Create One
                </MuiLink>
            </Typography>
        </Box>
    );
};

export default LoginForm;
