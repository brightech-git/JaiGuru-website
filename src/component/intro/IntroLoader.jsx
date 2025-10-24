"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const IntroLoader = ({ clientImage, onFinish }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if intro was already shown in this session
        const hasShown = sessionStorage.getItem("introShown");

        if (!hasShown) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                sessionStorage.setItem("introShown", "true");
                if (onFinish) onFinish();
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            // Already shown → skip instantly
            if (onFinish) onFinish();
        }
    }, [onFinish]);

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0.5, 1, 0] }}
                    transition={{ duration: 4, times: [0, 0.25, 0.5, 1] }}
                    className="fixed inset-0 flex items-center justify-center bg-white z-50"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: 2, // glow 2 times
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src={clientImage}
                            alt="Client Logo"
                            width={50}
                            height={50}
                            className="rounded-full shadow-lg"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroLoader;
