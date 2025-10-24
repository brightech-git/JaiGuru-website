"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Multiple transition styles
const transitionStyles = {
    slide: {
        initial: { opacity: 0, x: 30 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
            opacity: 0,
            x: -30,
            transition: { duration: 0.3, ease: [0.55, 0.085, 0.68, 0.53] },
        },
    },
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.35, ease: "easeInOut" } },
        exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    },
    scale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
        exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3, ease: [0.36, 0, 0.66, -0.56] } },
    },
};

// Loading bar variants
const loadingVariants = {
    initial: { width: "0%", opacity: 0 },
    animate: { width: "100%", opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: [0.55, 0.085, 0.68, 0.53] } },
};

// Smooth scroll function
const smoothScrollToTop = () => {
    const start = window.scrollY;
    const duration = 600;
    const startTime = performance.now();

    const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOut = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, start * (1 - easeInOut));

        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

interface TransitionWrapperProps {
    children: React.ReactNode;
    transitionType?: "slide" | "fade" | "scale";
}

export default function TransitionWrapper({ children, transitionType = "slide" }: TransitionWrapperProps) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [previousPathname, setPreviousPathname] = useState(pathname);

    // Detect route change
    useEffect(() => {
        if (pathname !== previousPathname) {
            setIsLoading(true);

            const loadingTimer = setTimeout(() => setIsLoading(false), 600);
            const pathUpdateTimer = setTimeout(() => setPreviousPathname(pathname), 400);

            return () => {
                clearTimeout(loadingTimer);
                clearTimeout(pathUpdateTimer);
            };
        }
    }, [pathname, previousPathname]);

    const selectedVariants = transitionStyles[transitionType];

    return (
        <>
            {/* Loading Bar */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-0 shadow-lg"
                        variants={loadingVariants as any}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ transformOrigin: "0%", boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)" }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white opacity-30"
                            animate={{ x: ["0%", "100%", "0%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content with Transition */}
            <AnimatePresence
                mode="wait"
                onExitComplete={() => smoothScrollToTop()}
            >
                <motion.div
                    key={pathname}
                    variants={selectedVariants as any}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="min-h-screen w-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>

            {/* Optional overlay during loading */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.02 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-0 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
