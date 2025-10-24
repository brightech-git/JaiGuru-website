// src/components/ui/SearchBar.tsx
"use client";

import { Box, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface SearchBarProps {
    placeholder?: string;
    maxWidth?: number | string;
    onFocus?: () => void;
}

export default function SearchBar({ placeholder = "Search products...", maxWidth = 650 ,onFocus }: SearchBarProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                bgcolor: theme.palette.background.paper,
                px: { xs: 1, sm: 2, md: 2 },
                py: { xs: 0.5, sm: 0.8, md: 1 },
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                maxWidth: { xs: "100%", md: maxWidth },
                mx: { xs: 1, md: 4 },
                color: theme.custom.colors.highlight,
                cursor: "text", // ✅ new
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    borderColor: theme.palette.primary.main, // ✅ new
                    boxShadow: `0 0 4px ${theme.palette.primary.light}`,
                },
            }}
        >

            <SearchIcon sx={{ color: theme.palette.text.secondary , fontSize: { xs: 20, md: 28 } }}  />
            <InputBase
                placeholder={placeholder}
                onFocus={onFocus} // ✅ add this line
                sx={{
                    ml: 2,
                    flex: 1,
                    color: theme.palette.text.primary,
                    fontSize: { xs: "0.85rem", md: "1rem" },
                }}
            />
        </Box>
    );
}
