import { toast } from 'react-toastify';

function NotificationButton () {
  const handleClick = () => {
    toast('Notification Clicked')
  }

  return (
      <button onClick={handleClick}>
        Click for notification
      </button>
  );
};

export default NotificationButton;
