importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCBPszTV4_noTmGjzv009VNpT0oH4_2pUg",
  authDomain: "legal-plus-64781.firebaseapp.com",
  projectId: "legal-plus-64781",
  storageBucket: "legal-plus-64781.appspot.com",
  messagingSenderId: "895467007440",
  appId: "1:895467007440:web:0bb8d5eb09aba7d394ddd5",
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener ("activate", async () => {
  const token = await messaging.getToken(messaging, { vapidKey: 'BHCPOJOFLKg_-OLAaJ6aejF-eDipJ9viMI8Hue6ud4ZjZJ38XV9JgAWX-ZVAD-JZyiPzO_6kwe7QSEzWZ3_AseY'});
  if (token) {
    console.log('Token:', token);
    return token;
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
})