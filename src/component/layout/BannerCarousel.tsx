"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Box, useTheme, useMediaQuery } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerItem {
    image: string;
}

interface BannerCarouselProps {
    banners: BannerItem[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
    const theme = useTheme();
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (prevRef.current && nextRef.current) {
            const swiperEl = document.querySelector(".swiper") as any;
            if (swiperEl?.swiper) {
                swiperEl.swiper.params.navigation.prevEl = prevRef.current;
                swiperEl.swiper.params.navigation.nextEl = nextRef.current;
                swiperEl.swiper.navigation.init();
                swiperEl.swiper.navigation.update();
            }
        }
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: 200, sm: 350, md: 400, lg: 550 },
                position: "relative",
                overflow: "hidden",
                borderRadius: theme.shape.borderRadius,
                mb: 4,
            }}
        >
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                loop
                speed={800}
                grabCursor={true}
                style={{ width: "100%", height: "100%" }}
            >
                {banners.map((banner, idx) => (
                    <SwiperSlide key={idx}>
                        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                            <Image
                                src={banner.image}
                                alt={`banner-${idx}`}
                                fill
                                style={{ objectFit: "cover" }}
                                priority={idx === 0}
                            />
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation arrows */}
            <Box
                ref={prevRef}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: { xs: 4, sm: 8 },
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: { xs: 30, sm: 40 },
                    height: { xs: 30, sm: 40 },
                    borderRadius: "50%",
                    bgcolor: theme.custom.colors.subtleBlue,
                    color: theme.custom.colors.highlight,
                    display: isMobile ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                        bgcolor: theme.palette.secondary.main,
                        transform: "translateY(-50%) scale(1.1)",
                    },
                }}
            >
                ‹
            </Box>

            <Box
                ref={nextRef}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: { xs: 4, sm: 8 },
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: { xs: 30, sm: 40 },
                    height: { xs: 30, sm: 40 },
                    borderRadius: "50%",
                    bgcolor: theme.custom.colors.subtleBlue,
                    color: theme.custom.colors.highlight,
                    display: isMobile ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                        bgcolor: theme.palette.secondary.main,
                        transform: "translateY(-50%) scale(1.1)",
                    },
                }}
            >
                ›
            </Box>
        </Box>
    );
}
