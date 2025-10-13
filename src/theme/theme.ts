// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

// Extend the theme with custom properties
declare module "@mui/material/styles" {
    interface Theme {
        custom: {
            colors: {
                cartBackground:string;
                topHeader:string;
                mainHeader:string;
                categoryHeader:string;
                footer:string;
                highlight: string;
                subtleBlue: string;
                danger: string;
                imageBorder?: string;
                addtoCart?:string;
            };
            shadows: {
                light: string;
                medium: string;
                heavy: string;
            };
            fonts: {
                special: string;
            };
            fontSize?: {
                title?: string;
                larger?: string;
                medium?: string;
                small?: string;
            }
        };
    }
    interface ThemeOptions {
        custom?: {
            colors?: {
                cartBackground: string;
                topHeader: string;
                mainHeader: string;
                categoryHeader: string;
                footer: string;
                highlight: string;
                subtleBlue: string;
                danger: string;
                imageBorder?: string;
                addtoCart?:string;
            };
            shadows?: {
                light?: string;
                medium?: string;
                heavy?: string;
            };
            fonts?: {
                special?: string;
            };
            fontSize?:{
                title?: string;
                larger?: string;
                medium?: string;
                small?: string;
            }
        };
    }
}

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#041f60",
            light: "#334b8c",
            dark: "#021136",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#ff6f61",
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
        success: { main: "#2e7d32" },
        error: { main: "#d32f2f" },
        warning: { main: "#ed6c02" },
        info: { main: "#0288d1" },
    },
    typography: {
        fontFamily: `"Domine", "Saira", serif, sans-serif`,
        h1: { fontFamily: `"Domine", serif`, fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 },
        h2: { fontFamily: `"Domine", serif`, fontSize: "2rem", fontWeight: 600, lineHeight: 1.3 },
        h3: { fontFamily: `"Domine", serif`, fontSize: "1.75rem", fontWeight: 600 },
        h4: { fontFamily: `"merriweather", sans-serif`, fontSize: "1.5rem", fontWeight: 500 },
        h5: { fontFamily: `"merriweather", sans-serif`, fontSize: "1.25rem", fontWeight: 500 },
        h6: { fontFamily: `"merriweather", sans-serif`, fontSize: "1rem", fontWeight: 500 },
        body1: { fontFamily: `"merriweather", sans-serif`, fontSize: "1rem", lineHeight: 1.6 },
        body2: { fontFamily: `"merriweather", sans-serif`, fontSize: "0.9rem", lineHeight: 1.6 },
        subtitle1: { fontFamily: `"merriweather", serif`, fontSize: "1rem", fontWeight: 500 },
        subtitle2: { fontFamily: `"merriweather", sans-serif`, fontSize: "0.875rem", fontWeight: 500 },
        button: { fontFamily: `"Shadow Into Light", cursive`, textTransform: "none", fontWeight: 600, fontSize: "0.95rem" },
    },
    shape: { borderRadius: 4 },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontWeight: 400,
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
                root: { margin: "8px 0" },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { backgroundColor: "#041f60" },
            },
        },
    },
    custom: {
        colors: {
            cartBackground: "#ffffffff",
            topHeader: "#fcc5d8",
<<<<<<< Updated upstream
            mainHeader: "#334b8c",
=======
            mainHeader: "#041f60",
>>>>>>> Stashed changes
            categoryHeader: "#021136",
            footer: "#686868ff",
            highlight: "#ffcc00",
            subtleBlue: "#eef2ff",
            danger: "#d32f2f",
            imageBorder: "#8f8e8eff",
            addtoCart: "linear-gradient(90deg, #ff7b00, #ffcc00)", // ✅ gradient stored as string
        },
        shadows: {
            light: "0 2px 4px rgba(0,0,0,0.05)",
            medium: "0 4px 8px rgba(0,0,0,0.1)",
            heavy: "0 8px 16px rgba(0,0,0,0.2)",
        },
        fonts: {
            special: `"Creepster", "Amatic SC", "Parisienne", "Poiret One", cursive`,
            
        },
        fontSize:{
            title: "1.55rem",
            larger:  "1.05rem",
            medium: "0.85rem",
            small: "0.7rem"
        }
    },
});

export default theme;
