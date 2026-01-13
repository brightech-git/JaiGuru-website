// src/context/NotificationContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { messaging } from "@/firebase/notification/firebaseClient";
import { getToken, Messaging } from "firebase/messaging";

type NotificationContextType = {
    permission: NotificationPermission;
    fcmToken: string | null;
    requestPermission: () => Promise<string | null>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {

    const [permission, setPermission] = useState<NotificationPermission>(
        typeof window !== "undefined" ? Notification.permission : "default"
    );
    const [fcmToken, setFcmToken] = useState<string | null>(null);

    // Request notification permission and return the token
    const requestPermission = async (): Promise<string | null> => {
        if (!messaging) return null;
        const fcmMessaging: Messaging = messaging;

        let perm = Notification.permission;

        if (perm === "default") {
            perm = await Notification.requestPermission();
            setPermission(perm);
        }

        if (perm === "granted") {
            const token = await getToken(fcmMessaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "",
            });
            setFcmToken(token || null);
            return token;
        } else if (perm === "denied") {
            setPermission("denied");
            setFcmToken(null);
            return null;
        }

        return null;
    };

    return (
        <NotificationContext.Provider value={{ permission, fcmToken, requestPermission }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used within a NotificationProvider");
    return context;
};
