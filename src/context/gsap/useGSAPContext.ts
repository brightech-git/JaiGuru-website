import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const useGSAPContext = (scope: React.RefObject<HTMLElement>) => {
    const ctx = useRef<gsap.Context | null>(null);

    useEffect(() => {
        if (scope.current) {
            ctx.current = gsap.context(() => {}, scope.current);
        }
        return () => ctx.current?.revert();
    }, [scope]);

    return ctx;
};