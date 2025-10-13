// src/api/publicUrl.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// ✅ Use NEXT_PUBLIC_ prefix so it's available in Next.js client-side
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const BASE_URL = 'https://app.bmgjewellers.com/api/v1';

console.log("BASE_URL:", BASE_URL); // Debugging line

if (!BASE_URL) {
    console.warn("⚠️ NEXT_PUBLIC_BASE_URL is not defined in .env file");
}

const PublicUrl: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable if using cookies
});

// ✅ Attach user token before every request
PublicUrl.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("user_token") : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default PublicUrl;
