import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCBPszTV4_noTmGjzv009VNpT0oH4_2pUg",
  authDomain: "legal-plus-64781.firebaseapp.com",
  projectId: "legal-plus-64781",
  storageBucket: "legal-plus-64781.appspot.com",
  messagingSenderId: "895467007440",
  appId: "1:895467007440:web:0bb8d5eb09aba7d394ddd5",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  Notification.permission;
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const serviceWorkerRegistration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("Service Worker registered:", serviceWorkerRegistration);
    } else {
      console.log("Unable to get permission to notify.");
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
  }
};

export { getToken, messaging };
