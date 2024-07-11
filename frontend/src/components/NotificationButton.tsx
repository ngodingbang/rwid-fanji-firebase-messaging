import React, { useState } from 'react';
import { requestPermission } from '../firebaseConfig';

const NotificationButton: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleNotification = async () => {
    const currentToken = await requestPermission();
    if (currentToken) {
      setToken(currentToken);
    }
  };

  return (
    <div>
      <button onClick={handleNotification}>Send Notification</button>
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default NotificationButton;
