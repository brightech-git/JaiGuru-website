"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Pre-defined animation variants for different use cases
export const transitionVariants = {
    // Drawer/Slide animations
    slideLeft: {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0 }
    },
    slideRight: {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 }
    },
    slideUp: {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 }
    },
    slideDown: {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-100%", opacity: 0 }
    },

    // Modal/Overlay animations
    scale: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 }
    },
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    },

    // List/Item animations
    stagger: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    },

    // Height animations (for accordions)
    height: {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 }
    }
};

// Common transition settings
export const transitionConfig = {
    duration: 0.3,
    ease: "easeInOut" as const
};

interface TransitionWrapperProps {
    children: ReactNode;
    isVisible: boolean;
    variant?: keyof typeof transitionVariants;
    duration?: number;
    className?: string;
    onAnimationComplete?: () => void;
    onAnimationStart?: () => void;
}

export default function TransitionWrapper({
    children,
    isVisible,
    variant = "fade",
    duration = 0.3,
    className = "",
    onAnimationComplete,
    onAnimationStart
}: TransitionWrapperProps) {
    const selectedVariant = transitionVariants[variant];

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    variants={selectedVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        duration,
                        ease: transitionConfig.ease
                    }}
                    className={className}
                    onAnimationStart={onAnimationStart}
                    onAnimationComplete={onAnimationComplete}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}