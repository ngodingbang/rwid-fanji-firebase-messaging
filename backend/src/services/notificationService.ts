import { admin } from '../config/firebaseAdmin';
import { Notification, type INotification } from '../models/Notification';

export const sendNotification = async (notification: INotification) => {
  const message = {
    notification: {
      title: notification.title,
      body: notification.body,
    },
    token: notification.clientId
  };

  try {
    await admin.messaging().send(message);
    await Notification.create(notification);
  } catch (err) {
    console.error('Error sending notification:', err)
  }
};
