import React, { useEffect } from 'react';
import NotificationButton from './components/NotificationButton';

const App: React.FC = () => {
  useEffect(() => {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        console.log('Service Worker registered:', registration);
      });
    });
  }, []);

  return (
    <div>
      <h1>Push Notification Demo</h1>
      <NotificationButton />
    </div>
  );
};

export default App;
