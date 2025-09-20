// src/components/ui/AppButton.tsx
"use client";

import { Button, ButtonProps } from "@mui/material";

interface AppButtonProps extends ButtonProps {
    label: string;
}

export default function AppButton({ label, sx, ...props }: AppButtonProps) {
    return (
        <Button
            {...props}
            sx={{
                // only keep responsive overrides that differ from the theme
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                padding: { xs: "6px 10px", sm: "8px 14px", md: "10px 15px" },
                ...sx, // allow per-use overrides
            }}
        >
            {label}
        </Button>
    );
}
