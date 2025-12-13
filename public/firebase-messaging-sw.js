// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyALToIAT-uauSnfFxafrwuKKbQ-fypabRg",
    authDomain: "vra-jewellers-notification.firebaseapp.com",
    projectId: "vra-jewellers-notification",
    storageBucket: "vra-jewellers-notification.firebasestorage.app",
    messagingSenderId: "759747140105",
    appId: "1:759747140105:web:4c7bc2c0bed6f8a8fbb6d8",
    measurementId: "G-0EL6QG3EY0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
