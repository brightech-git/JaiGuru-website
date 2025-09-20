// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#041f60",  // brand blue
            light: "#334b8c",
            dark: "#021136",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ff6f61",  // accent coral
            light: "#ff8f85",
            dark: "#e65a50",
            contrastText: "#ffffff",
        },
        background: {
            default: "#ffffff",
            paper: "#f8f9fa",
        },
        text: {
            primary: "#171717",
            secondary: "#555555",
            disabled: "#9e9e9e",
        },
        success: {
            main: "#2e7d32",
        },
        error: {
            main: "#d32f2f",
        },
        warning: {
            main: "#ed6c02",
        },
        info: {
            main: "#0288d1",
        },
    },
    typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: { fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.3 },
        h3: { fontSize: "1.75rem", fontWeight: 600 },
        h4: { fontSize: "1.5rem", fontWeight: 500 },
        h5: { fontSize: "1.25rem", fontWeight: 500 },
        h6: { fontSize: "1rem", fontWeight: 500 },
        body1: { fontSize: "1rem", lineHeight: 1.6 },
        body2: { fontSize: "0.9rem", lineHeight: 1.6 },
        subtitle1: { fontSize: "1rem", fontWeight: 500 },
        subtitle2: { fontSize: "0.875rem", fontWeight: 500 },
        button: { textTransform: "none", fontWeight: 600, fontSize: "0.95rem" },
    },
    shape: {
        borderRadius: 12,
    },
    spacing: 8, // spacing unit (8px)
    shadows: [
        "none",
        "0px 2px 4px rgba(0,0,0,0.1)",
        "0px 4px 8px rgba(0,0,0,0.12)",
        "0px 6px 12px rgba(0,0,0,0.15)",
        ...Array(21).fill("none"),
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    "&:hover": { transform: "translateY(-1px)" },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: "8px 0",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#041f60",
                },
            },
        },
    },
});

export default theme;

