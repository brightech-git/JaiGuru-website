"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import AppButton from "../ui/AppButton";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

export default function GetLocation() {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({
        lat: null,
        lng: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = () => {
        setError(null);
        setLoading(true);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ lat: latitude, lng: longitude });
                setLoading(false);
                enqueueSnackbar("Location fetched successfully ✅", { variant: "success" });
            },
            (err) => {
                if (err.code === 1)
                    setError("Permission denied. Please allow location access.");
                else if (err.code === 2)
                    setError("Position unavailable. Try again later.");
                else if (err.code === 3)
                    setError("Request timed out. Please retry.");
                else setError("Unable to fetch location.");
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    // 👇 show snackbar when an error occurs
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [error, enqueueSnackbar]);

    return (
        <Box
            sx={{
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <AppButton
                label={loading ? "Getting Location..." : "Use My Location"}
                appVariant="primary"
                fontVariant="domine"
                onClick={handleGetLocation}
                disabled={loading}
                endIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
                sx={{    
                    fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.8rem" },
                }}
            />

            {/* {coords.lat && coords.lng && (
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        padding: 2,
                        boxShadow: theme.custom.shadows.light,
                        marginTop: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: theme.custom.fonts.domine,
                            fontSize: theme.custom.fontSize?.medium,
                            color: theme.palette.text.primary,
                        }}
                    >
                        📍 <strong>Latitude:</strong> {coords.lat.toFixed(6)}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: theme.custom.fonts.domine,
                            fontSize: theme.custom.fontSize?.medium,
                            color: theme.palette.text.primary,
                        }}
                    >
                        📍 <strong>Longitude:</strong> {coords.lng.toFixed(6)}
                    </Typography>
                </Box>
            )} */}
        </Box>
    );
}
