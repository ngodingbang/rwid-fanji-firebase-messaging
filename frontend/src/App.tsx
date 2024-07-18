import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { firebaseConfig } from './firebaseConfig';
import NotificationButton from './components/NotificationButton';

function App() {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: 'BHCPOJOFLKg_-OLAaJ6aejF-eDipJ9viMI8Hue6ud4ZjZJ38XV9JgAWX-ZVAD-JZyiPzO_6kwe7QSEzWZ3_AseY' });
          if (token) {
            console.log('Token:', token);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        } else {
          console.log('Permission not granted for Notification');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      toast.info(`Title: ${payload.notification?.title} - Body: ${payload.notification?.body}`);
    });
  }, []);

  return (
    <div className="App">
      <NotificationButton />
      <ToastContainer />
    </div>
  );
}

export default App;
