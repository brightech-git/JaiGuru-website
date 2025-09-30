"use client";

import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, useTheme } from "@mui/material";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
    name: string;
    image: string;
    link: string;
    itemName?: string;
    subItemName?: string;
}

interface MainProduct extends Product {
    subProducts: Product[];
}

interface HandpickedProductsProps {
    title: string;
    subtitle: string;
    mainProducts: MainProduct[];
    backgroundColor?: string;
    baseUrl?: string;
}

const ArrowButton = ({ onClick, direction }: { onClick?: () => void; direction: "next" | "prev" }) => {
    const theme = useTheme();
    return (
        <button
            onClick={onClick}
            aria-label={direction === "next" ? "Next slide" : "Previous slide"}
            style={{
                position: "absolute",
                top: "50%",
                [direction === "next" ? "right" : "left"]: 16,
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "rgba(255, 255, 255, 0.95)",
                color: theme.palette.text.primary,
                border: "none",
                borderRadius: theme.shape.borderRadius,
                width: { xs: 40, sm: 48, md: 56 },
                height: { xs: 40, sm: 48, md: 56 },
                cursor: "pointer",
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                boxShadow: theme.custom.shadows.medium,
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: theme.custom.colors.highlight,
                    color: theme.palette.common.white,
                    transform: "translateY(-50%) scale(1.1)",
                },
            }}
        >
            {direction === "next" ? ">" : "<"}
        </button>
    );
};

const SubProductCard = ({ product, baseUrl }: { product: Product; baseUrl: string }) => {
    const theme = useTheme();
    const getImageUrl = () => {
        const image = product.image;
        if (!image) return "/images/placeholder.jpg";
        return image.startsWith("http://") || image.startsWith("https://")
            ? image
            : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
    };

    return (
        <Card
            sx={{
                width: { xs: "4rem", sm: "4rem", md: "5rem", lg: "5rem" },
                height: { xs: "4rem", sm: "4rem", md: "5rem", lg: "5rem" },
                borderRadius:0,
                overflow: "hidden",
                boxShadow: theme.custom.shadows.light,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: theme.custom.shadows.medium,
                },
            }}
        >
            <a href={product.link}>
                <CardMedia
                    component="img"
                    image={getImageUrl()}
                    alt={product.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </a>
        </Card>
    );
};

export default function HandpickedProducts({
    title,
    subtitle,
    mainProducts,
    backgroundColor,
    baseUrl = "https://app.bmgjewellers.com",
}: HandpickedProductsProps) {
    const theme = useTheme();
    const bg = backgroundColor || theme.palette.background.default;

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        nextArrow: <ArrowButton direction="next" />,
        prevArrow: <ArrowButton direction="prev" />,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2, arrows: false } },
            { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
            { breakpoint: 576, settings: { slidesToShow: 1, arrows: false } },
            { breakpoint: 420, settings: { slidesToShow: 1, arrows: false } },
        ],
    };

    const handleShopNow = (itemName?: string, subItemName?: string) => {
        const queryParams = new URLSearchParams();
        if (itemName) queryParams.append("itemName", itemName);
        if (subItemName) queryParams.append("subItemName", subItemName);
        window.location.href = `/shop-left?${queryParams.toString()}`;
    };

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: bg,
                px: { xs: 1, sm: 2, md: 4 },
                py: 6,
                position: "relative",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                maxWidth: "100%",
            }}
        >
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.075rem" },
                        fontWeight: 700,
                        textTransform: "capitalize",
                        letterSpacing: "0.125rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "0.25rem",
                        fontFamily: theme.custom.fonts.special,
                    }}
                >
                    <span
                        style={{
                            background: `linear-gradient(90deg, ${theme.custom.colors.highlight}, ${theme.custom.colors.subtleBlue})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        {title.split(" ")[0]}
                    </span>
                    <span >
                        {title.split(" ").slice(1).join(" ")}
                    </span>
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: theme.custom.fontSize?.small, sm: theme.custom.fontSize?.medium, md: theme.custom.fontSize?.medium, lg: theme.custom.fontSize?.larger },
                        color: theme.palette.text.secondary,
                        maxWidth: "33.75rem",
                        mx: "auto",
                        opacity: 0.8,
                        fontFamily: theme.typography.body1.fontFamily,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            {mainProducts.length === 0 ? (
                <Typography sx={{ textAlign: "center", py: 4, color: theme.palette.text.secondary }}>
                    Loading products...
                </Typography>
            ) : (
                <Slider
                    {...settings}
                    sx={{
                        "& .slick-track": {
                            display: "flex",
                            alignItems: "center",
                        },
                        "& .slick-slide": {
                            px: 1,
                            opacity: 1,
                            transform: "none",
                            "&.slick-active, &.slick-current, &.slick-center": {
                                opacity: 1,
                                transform: "none",
                                filter: "none",
                            },
                        },
                    }}
                >
                    {mainProducts.map((main, idx) => (
                        <Box
                            key={`banner-${idx}`}
                            sx={{ display: "flex !important", justifyContent: "center", outline: "none" }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    mb: { xs: 4, sm: 4, md: 4, lg: 2 , xl:4},
                                    width: { xs: "18rem", md: "20rem", lg: "24rem",xl: "30rem" },
                                    maxWidth: "100%",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: "18rem", md: "20rem", lg: "24rem", xl: "30rem" },
                                        height: { xs: "18rem", md: "20rem", lg: "24rem" ,xl: "30rem" },
                                        borderRadius: 0,
                                        overflow: "hidden",
                                        boxShadow: theme.custom.shadows.medium,
                                        position: "relative",
                                        cursor: "pointer",
                                        mb: 1,
                                        "&:hover img": {
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                    onClick={() => handleShopNow(main.itemName, main.subItemName)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${main.name} collection`}
                                >
                                    <Image
                                        src={
                                            main.image
                                        }
                                        alt={main.name}
                                        fill
                                        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <Typography
                                        sx={{
                                            position: "absolute",
                                            bottom: 8,
                                            left: 8,
                                            color: theme.palette.getContrastText(bg),
                                            fontWeight: 500,
                                            backgroundColor: "rgba(0,0,0,0.4)",
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: theme.shape.borderRadius,
                                            fontSize: { xs: theme.custom.fontSize?.small, sm: theme.custom.fontSize?.medium, md: theme.custom.fontSize?.larger },
                                        }}
                                    >
                                        {main.name}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: { xs: 0.25, sm: 0.375, md: 0.5, lg: 0.85 },
                                        position: "absolute",
                                        bottom: { xs: "-1rem", sm: "-1.5rem", md: "-2rem", lg: "-2.5rem" },
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: { xs: "12rem", sm: "12rem", md: "15rem", lg: "20rem" },
                                        maxWidth: "100%",
                                        zIndex: 2,
                                        p: 0.5,
                                    }}
                                >
                                    {main.subProducts.map((sub, sidx) => (
                                        <SubProductCard key={`subproduct-${sidx}`} product={sub} baseUrl={baseUrl} />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            )}
        </Box>
    );
}