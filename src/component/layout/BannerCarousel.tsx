"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import type { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type SwiperType from "swiper";
import { gsap } from "gsap";

// Import custom icons
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerItem {
    image: string | StaticImageData;
    title?: string;
    subtitle?: string;
}

interface BannerCarouselProps {
    banners: BannerItem[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
    const theme = useTheme();
    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // GSAP animations for slide transitions
    const slideEnterAnimation = (slideElement: HTMLElement) => {
        const image = slideElement.querySelector('img');
        const content = slideElement.querySelector('.banner-content');

        const tl = gsap.timeline();

        // Image animation
        tl.fromTo(image,
            { scale: 1.2, opacity: 0.8 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
        );

        // Content animation
        if (content) {
            tl.fromTo(content,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.6"
            );
        }

        return tl;
    };

 

    // Initialize Swiper with GSAP integration
    const initializeSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
        setIsMounted(true);
        setActiveIndex(swiper.realIndex);

        // Add GSAP transition on slide change
        swiper.on('slideChangeTransitionStart', () => {
            const currentSlide = swiper.slides[swiper.activeIndex];
            if (currentSlide) {
                slideEnterAnimation(currentSlide as HTMLElement);
            }
        });

        // Container entrance animation
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, []);

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    };

    // Enhanced arrow animations
    const arrowHoverAnimation = (arrow: HTMLDivElement, isHover: boolean) => {
        gsap.to(arrow, {
            scale: isHover ? 1.15 : 1,
            backgroundColor: isHover ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    // Initialize navigation after component mounts
    useEffect(() => {
        if (isMounted && swiperRef.current && prevRef.current && nextRef.current) {
            if (swiperRef.current.params.navigation && typeof swiperRef.current.params.navigation === 'object') {
                swiperRef.current.params.navigation.prevEl = prevRef.current;
                swiperRef.current.params.navigation.nextEl = nextRef.current;
                swiperRef.current.navigation.init();
                swiperRef.current.navigation.update();
            }

            // Add hover effects to arrows
            [prevRef.current, nextRef.current].forEach(arrow => {
                if (arrow) {
                    arrow.addEventListener('mouseenter', () => arrowHoverAnimation(arrow, true));
                    arrow.addEventListener('mouseleave', () => arrowHoverAnimation(arrow, false));
                }
            });
        }
    }, [isMounted]);

    // Cleanup function
    useEffect(() => {
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
    }, []);

    // Enhanced Custom Pagination with GSAP
    const CustomPaginationBullet = ({ active, index }: { active: boolean; index: number }) => {
        const bulletRef = useRef<HTMLButtonElement>(null);

        useEffect(() => {
            if (bulletRef.current) {
                if (active) {
                    gsap.to(bulletRef.current, {
                        scale: 1.3,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                } else {
                    gsap.to(bulletRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            }
        }, [active]);

        const handleClick = () => {
            if (bulletRef.current) {
                gsap.to(bulletRef.current, {
                    scale: 0.8,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        swiperRef.current?.slideTo(index);
                    }
                });
            } else {
                swiperRef.current?.slideTo(index);
            }
        };

        const handleHover = (isHover: boolean) => {
            if (bulletRef.current && !active) {
                gsap.to(bulletRef.current, {
                    scale: isHover ? 1.2 : 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        };

        return (
            <button
                ref={bulletRef}
                onClick={handleClick}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                className={`
                    relative cursor-pointer transition-colors duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    rounded-full mx-1
                    ${active
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }
                    w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5
                `}
                aria-label={`Go to slide ${index + 1}`}
            >
                {active && (
                    <div className="absolute inset-0 border-2 border-white rounded-full" />
                )}
            </button>
        );
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                height: { xs: 200, sm: 350, md: 400, lg: 550 },
                position: "relative",
                overflow: "hidden",
                borderRadius: { xs: 2, md: theme.shape.borderRadius },
                mb: 4,
            }}
            className="group"
        >
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: true
                }}
                pagination={false}
                navigation={
                    banners.length > 1 ? {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    } : false
                }
                loop={banners.length > 1}
                speed={800}
                grabCursor={true}
                onSwiper={initializeSwiper}
                onSlideChange={handleSlideChange}
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

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {(banner.title || banner.subtitle) && (
                                <div className="banner-content absolute bottom-6 left-6 text-white z-10">
                                    {banner.title && (
                                        <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                                            {banner.title}
                                        </h2>
                                    )}
                                    {banner.subtitle && (
                                        <p className="text-sm md:text-lg opacity-90 drop-shadow-md">
                                            {banner.subtitle}
                                        </p>
                                    )}
                                </div>
                            )}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {banners.length > 1 && (
                <>
                    {/* <div
                        ref={prevRef}
                        className={`
                            absolute top-1/2 left-4 transform -translate-y-1/2 z-10
                            w-10 h-10 md:w-12 md:h-12 rounded-full
                            bg-white/90 backdrop-blur-sm shadow-lg
                            flex items-center justify-center
                            cursor-pointer transition-all duration-300
                            opacity-0 group-hover:opacity-100
                            border border-gray-200
                            ${isMobile ? 'hidden' : 'flex'}
                        `}
                        onClick={() => swiperRef.current?.slidePrev()}
                        role="button"
                        aria-label="Previous slide"
                        tabIndex={0}
                    >
                        <NavigateBefore
                            className="text-gray-700"
                            fontSize={isMobile ? "small" : "medium"}
                        />
                    </div>

                    <div
                        ref={nextRef}
                        className={`
                            absolute top-1/2 right-4 transform -translate-y-1/2 z-10
                            w-10 h-10 md:w-12 md:h-12 rounded-full
                            bg-white/90 backdrop-blur-sm shadow-lg
                            flex items-center justify-center
                            cursor-pointer transition-all duration-300
                            opacity-0 group-hover:opacity-100
                            border border-gray-200
                            ${isMobile ? 'hidden' : 'flex'}
                        `}
                        onClick={() => swiperRef.current?.slideNext()}
                        role="button"
                        aria-label="Next slide"
                        tabIndex={0}
                    >
                        <NavigateNext
                            className="text-gray-700"
                            fontSize={isMobile ? "small" : "medium"}
                        />
                    </div> */}

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2">
                            {banners.map((_, index) => (
                                <CustomPaginationBullet
                                    key={index}
                                    active={activeIndex === index}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </Box>
    );
}