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
                productCard?:string;
                backgroundColor?:string;
                cardBackgroundColor?:string;
                secondaryBackgroundColor?:string;
            };
            shadows: {
                light: string;
                medium: string;
                heavy: string;
            };
            fonts: {
                special: string;
                domine:string;
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
                productCard?: string;
                backgroundColor?: string;
                cardBackgroundColor?: string;
                secondaryBackgroundColor?: string;
            };
            shadows?: {
                light?: string;
                medium?: string;
                heavy?: string;
            };
            fonts?: {
                special?: string;
                domine?:string;
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
        h2: { fontFamily: `"Creepster", serif`, fontSize: "2rem", fontWeight: 600, lineHeight: 1.3 },
        h3: { fontFamily: `"Amatic SC", serif`, fontSize: "1.75rem", fontWeight: 600 },
        h4: { fontFamily: `"Parisienne", sans-serif`, fontSize: "1.5rem", fontWeight: 500 },
        h5: { fontFamily: `"Shadow Into Light", sans-serif`, fontSize: "1.25rem", fontWeight: 500 },
        h6: { fontFamily: `"cinzel","courgette", "amaticSC", sans-serif`, fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.2 },
        body1: { fontFamily: `"merriweather", sans-serif`, fontSize: "1rem", lineHeight: 1.6 },
        body2: { fontFamily: `"Domine", sans-serif`, fontSize: "0.9rem", lineHeight: 1.6 },
        subtitle1: { fontFamily: `"Saira", serif`, fontSize: "1rem", fontWeight: 600 },
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
            cartBackground: "#ffffff",
            topHeader: "#fcc5d8",
            mainHeader: "#102663ff",
            categoryHeader: "#e3d6fb",
            footer: "#d1d1d1ff",
            highlight: "#075a4cff",
            subtleBlue: "#eef2ff",
            danger: "#e24242ff",
            imageBorder: "#8f8e8eff",
            addtoCart: "linear-gradient(90deg, #DC143C, #f7bcc7ff)", // ✅ gradient stored as string
            productCard: "linear-gradient(90deg, #f33057ff, #f7bcc7ff)",
            backgroundColor:"linear-gradient(90deg, #7e3c9e, #a883ebff , #ee2cadff)",
            cardBackgroundColor: "#e3d6fb",
            secondaryBackgroundColor:"#e3d6fb" 
           

        },
        shadows: {
            light: "0 2px 4px rgba(0,0,0,0.05)",
            medium: "0 4px 8px rgba(0,0,0,0.1)",
            heavy: "0 8px 16px rgba(0,0,0,0.2)",
        },
        fonts: {
            special: `"Creepster", "Amatic SC", "Parisienne", "Poiret One", cursive`,
            domine: `"Domine", "Saira", serif, sans-serif`,
            
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
