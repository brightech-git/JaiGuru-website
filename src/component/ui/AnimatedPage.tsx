// components/ui/AnimatedPage.tsx
'use client';

import React from 'react';
import { useNavigation } from '@/context/transition/NavigationContext';
import AnimatedWrapper from './AnimatedWrapper';

interface AnimatedPageProps {
    children: React.ReactNode;
    pageId: string;
    className?: string;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({
    children,
    pageId,
    className = ''
}) => {
    const { isNavigating } = useNavigation();

    return (
        <AnimatedWrapper
            componentId={pageId}
            className={`min-h-screen ${isNavigating ? 'pointer-events-none' : ''} ${className}`}
            animationType="fadeUp"
            delay={0.2}
            triggerOnce={false} // Pages should animate every time they enter
        >
            {children}
        </AnimatedWrapper>
    );
};

export default AnimatedPage;