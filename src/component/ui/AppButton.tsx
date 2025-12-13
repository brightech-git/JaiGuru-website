"use client";

import { Button, ButtonProps } from "@mui/material";

type FontVariant = "default" | "shadow" | "satisfy" | "exo" | "creepster" | "amatic" | "parisienne" | "poiret" | "domine" ;
type AppVariant = "primary" | "secondary" | "ghost" | "success" | "error" | "warning" | "addtoCart";

interface AppButtonProps extends ButtonProps {
    label: string;
    fontVariant?: FontVariant;  // font family override
    appVariant?: AppVariant;    // color/variant preset
}

export default function AppButton({
    label,
    fontVariant = "default",
    appVariant = "primary",
    sx,
    ...props
}: AppButtonProps) {
    // Map fontVariant to font family
    const fontMap: Record<FontVariant, string> = {
        default: `"Poiret One", sans-serif`,
        shadow: `"Shadow Into Light", cursive`,
        satisfy: `"Satisfy", cursive`,
        exo: `"Exo", sans-serif`,
        creepster: `"Creepster", cursive`,
        amatic: `"Amatic SC", cursive`,
        parisienne: `"Parisienne", cursive`,
        poiret: `"Poiret One", cursive`,
        domine: `"Domine", serif`,
    };

    // Map appVariant to MUI colors or ghost styles
    const variantMap: Record<AppVariant, { variant: ButtonProps["variant"]; color?: ButtonProps["color"] }> = {
        primary: { variant: "contained", color: "primary" },
        secondary: { variant: "contained", color: "secondary" },
        success: { variant: "contained", color: "success" },
        error: { variant: "contained", color: "error" },
        warning: { variant: "contained", color: "warning" },
        addtoCart: { variant: "contained", color: "info" },
        ghost: { variant: "outlined"   }, // no color, just border
    };

    const v = variantMap[appVariant];

    return (
        <Button
            {...props}
            variant={v.variant}
            color={v.color}
            sx={{
                fontFamily: fontMap[fontVariant],
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                padding: { xs: "5px 10px", sm: "6px 12px", md: "8px 14px" },
                ...sx, // allow per-use overrides
            }}
        >
            {label}
        </Button>
    );
}
