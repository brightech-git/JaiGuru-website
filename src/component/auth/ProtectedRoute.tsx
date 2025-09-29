// src/components/auth/ProtectedRoute.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // mark client after hydration
    }, []);

    useEffect(() => {
        if (isClient && !isAuthenticated) {
            router.replace("/user/customer/login");
        }
    }, [isClient, isAuthenticated, router]);

    if (!isClient) {
        // Prevent mismatch by not rendering anything until client is ready
        return null;
    }

    if (!isAuthenticated) {
        return <div>🔒 Redirecting...</div>;
    }

    return <>{children}</>;
}
