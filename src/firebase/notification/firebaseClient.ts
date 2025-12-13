// src/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyALToIAT-uauSnfFxafrwuKKbQ-fypabRg",
    authDomain: "vra-jewellers-notification.firebaseapp.com",
    projectId: "vra-jewellers-notification",
    storageBucket: "vra-jewellers-notification.firebasestorage.app",
    messagingSenderId: "759747140105",
    appId: "1:759747140105:web:4c7bc2c0bed6f8a8fbb6d8",
    measurementId: "G-0EL6QG3EY0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
