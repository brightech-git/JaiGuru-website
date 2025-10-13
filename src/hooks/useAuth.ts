// src/hooks/useAuth.ts
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

// Custom hook to access authentication state

export const useAuth = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);

    // Fallback to localStorage in case Redux resets on refresh
    const localToken = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;

    return {
        isAuthenticated: !!(token || localToken),
        user,
        token: token || localToken,
    };
};
