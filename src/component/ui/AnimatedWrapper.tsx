// components/ui/AnimatedWrapper.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedWrapperProps {
    children: React.ReactNode;
    componentId: string;
    className?: string;
    animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'custom';
    delay?: number;
    duration?: number;
    triggerOnce?: boolean;
    onAnimationComplete?: () => void;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
    children,
    componentId,
    className = '',
    animationType = 'fadeUp',
    delay = 0,
    duration = 0.8,
    triggerOnce = true,
    onAnimationComplete
}) => {
    const elementRef = useRef<HTMLDivElement>(null!);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || (hasAnimated.current && triggerOnce)) return;

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && (!hasAnimated.current || !triggerOnce)) {
                    animateElement();
                    hasAnimated.current = true;
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [triggerOnce]);

    const getAnimationConfig = () => {
        const baseConfig = {
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            onComplete: onAnimationComplete
        };

        switch (animationType) {
            case 'fadeUp':
                return {
                    from: { opacity: 0, y: 30 },
                    to: { ...baseConfig, y: 0 }
                };
            case 'fadeIn':
                return {
                    from: { opacity: 0 },
                    to: baseConfig
                };
            case 'slideLeft':
                return {
                    from: { opacity: 0, x: 50 },
                    to: { ...baseConfig, x: 0 }
                };
            case 'slideRight':
                return {
                    from: { opacity: 0, x: -50 },
                    to: { ...baseConfig, x: 0 }
                };
            case 'scale':
                return {
                    from: { opacity: 0, scale: 0.8 },
                    to: { ...baseConfig, scale: 1 }
                };
            default:
                return {
                    from: { opacity: 0, y: 30 },
                    to: { ...baseConfig, y: 0 }
                };
        }
    };

    const animateElement = () => {
        const config = getAnimationConfig();
        gsap.fromTo(elementRef.current, config.from, config.to);
    };

    return (
        <div
            ref={elementRef}
            className={`animated-wrapper ${className}`}
            data-component-id={componentId}
            style={{ opacity: 0 }} // Initial state for GSAP
        >
            {children}
        </div>
    );
};

export default AnimatedWrapper;