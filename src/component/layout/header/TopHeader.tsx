"use client";

import { Box, Typography, useTheme } from "@mui/material";

interface TopHeaderProps {
    message?: string;
    onLogin?: () => void;
    onRegister?: () => void;
}

export default function TopHeader({ message, onLogin, onRegister }: TopHeaderProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: theme.custom.colors.topHeader,
                px: 2,
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            {/* Left message */}
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "clamp(0.8rem, 1vw, 1rem)",
                    lineHeight: 1.4,
                    fontWeight: 400,
                }}
            >
                {message || "Free shipping on orders over $50!"}
            </Typography>

            {/* Right actions */}
            <Box display="flex" gap={2} alignItems="center">
                <Typography
                    onClick={onLogin}
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: "clamp(0.8rem, 1vw, 1rem)",
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    Login
                </Typography>
                <Typography
                    onClick={onRegister}
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: "clamp(0.8rem, 1vw, 1rem)",
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    Register
                </Typography>
            </Box>
        </Box>
    );
}
