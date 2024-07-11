import { Elysia } from 'elysia';
import { messaging } from '../utils/firebaseAdmin';

export const app = new Elysia();

interface NotificationRequestBody {
  token: string;
  message: string;
}

app.post('/send-notification', async ({ body }: { body: NotificationRequestBody }) => {
  const { token, message } = body;

  try {
    const response = await messaging.send({
      token,
      notification: {
        title: 'New notification',
        body: message,
      },
    });
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
}).listen(8080);

console.log('Messaging Object:', messaging);
