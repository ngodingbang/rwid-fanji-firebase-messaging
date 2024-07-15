import { sendNotification } from "../services/notificationService";
import { type Context as ElysiaContext } from "elysia";
import { type INotification } from "../models/Notification";

interface NotificationRequestBody {
  title: string;
  body: string;
  clientId: string;
}

interface Context extends ElysiaContext {
  json: (body: any, status?: number) => void;
}

export const createNotification = async (ctx: Context) => {
  const { title, body, clientId } = ctx.body as NotificationRequestBody;

  if (!title || !body || !clientId) {
    return ctx.json({ message: 'Invalid data' }, 400);
  }

  const notification: INotification = { title, body, clientId } as INotification;
  await sendNotification(notification)

  return ctx.json({ message: 'Notification sent' }, 200);
};
