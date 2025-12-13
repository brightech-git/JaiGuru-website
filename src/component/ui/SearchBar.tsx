"use client";

import { Box, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
} from "react";

interface SearchBarProps {
    placeholder?: string;
    maxWidth?: number | string;
    onFocus?: () => void;
    onClick?: () => void;
}

// ✨ Rotating placeholder texts
const placeholderList = [
    "Search gold chains...",
    "Find diamond rings...",
    "Explore bangles...",
    "Discover new arrivals...",
    "Shop trending collections...",
];

const SearchBar = forwardRef<{ blur: () => void }, SearchBarProps>(
    (
        {
            placeholder = "Search products...",
            maxWidth = 650,
            onFocus,
            onClick,
        },
        ref
    ) => {
        const theme = useTheme();
        const inputRef = useRef<HTMLInputElement>(null);

        // Expose blur method to parent
        useImperativeHandle(ref, () => ({
            blur: () => {
                inputRef.current?.blur();
            },
        }));

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            onFocus?.();
        };

        // 🌀 State for looping placeholder with enhanced animations
        const [index, setIndex] = useState(0);
        const [animation, setAnimation] = useState<'fadeIn' | 'slideUp' | 'slideDown'>('fadeIn');
        const [displayText, setDisplayText] = useState(placeholderList[0]);

        useEffect(() => {
            const interval = setInterval(() => {
                // Start fade out/slide up animation
                setAnimation('slideUp');

                setTimeout(() => {
                    // Change text
                    const nextIndex = (index + 1) % placeholderList.length;
                    setIndex(nextIndex);
                    setDisplayText(placeholderList[nextIndex]);

                    // Start slide down animation for new text
                    setAnimation('slideDown');

                    setTimeout(() => {
                        // Return to normal state
                        setAnimation('fadeIn');
                    }, 300);

                }, 500); // Wait for slide up to complete

            }, 3000); // Change every 3 seconds

            return () => clearInterval(interval);
        }, [index]);

        const getPlaceholderStyles = () => {
            switch (animation) {
                case 'slideUp':
                    return {
                        opacity: 0,
                        transform: 'translateY(-10px)',
                        transition: 'all 0.5s ease-in-out',
                    };
                case 'slideDown':
                    return {
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'all 0.3s ease-in-out',
                    };
                case 'fadeIn':
                default:
                    return {
                        opacity: 1,
                        transform: 'translateY(0)',
                        transition: 'all 0.4s ease-in-out',
                    };
            }
        };

        return (
            <Box
                onClick={onClick}
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
                    cursor: "text",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 8px ${theme.palette.primary.light}40`,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <SearchIcon
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: { xs: 20, md: 25 },
                        transition: 'color 0.3s ease',
                    }}
                />

                {/* Animated Placeholder Container */}
                <Box
                    sx={{
                        position: 'relative',
                        flex: 1,
                        ml: 2,
                        overflow: 'hidden',
                    }}
                >
                    <InputBase
                        ref={inputRef}
                        placeholder={displayText}
                        onFocus={handleFocus}
                        sx={{
                            width: '100%',
                            color: theme.palette.text.primary,
                            fontSize: { xs: "0.85rem", md: "1rem" },
                            "&::placeholder": {
                                ...getPlaceholderStyles(),
                                color: theme.palette.text.secondary,
                                fontStyle: 'italic',
                            },
                            "&:focus::placeholder": {
                                opacity: 0.6,
                            },
                        }}
                    />
                </Box>

                {/* Decorative animation indicator */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                        opacity: animation === 'slideUp' ? 0.8 : 0,
                        transform: animation === 'slideUp' ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'all 0.5s ease-in-out',
                        transformOrigin: 'center',
                    }}
                />
            </Box>
        );
    }
);

SearchBar.displayName = "SearchBar";
export default SearchBar;