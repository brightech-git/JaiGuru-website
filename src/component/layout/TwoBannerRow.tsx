"use client";

import { Box } from "@mui/material";
import Image from "next/image";

interface TwoBannerRowProps {
    leftImage: string;
    rightImage: string;
    leftAlt?: string;
    rightAlt?: string;
    height?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
    }; // responsive heights
}

export default function TwoBannerRow({
    leftImage,
    rightImage,
    leftAlt = "Left Banner",
    rightAlt = "Right Banner",
    height = { xs: 200, sm: 300, md: 400 }, // default responsive heights
}: TwoBannerRowProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                width: "100%",
            }}
        >
            {/* Left Banner */}
            <Box
                sx={{
                    flex: 1,
                    position: "relative",
                    height,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <Image
                    src={leftImage}
                    alt={leftAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </Box>

            {/* Right Banner */}
            <Box
                sx={{
                    flex: 1,
                    position: "relative",
                    height,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <Image
                    src={rightImage}
                    alt={rightAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </Box>
        </Box>
    );
}
