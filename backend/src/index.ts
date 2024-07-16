import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import mongoose from "mongoose";
import { admin } from "./config/firebaseAdmin";
import notificationSchema, { type INotification } from "./models/Notification";

const app = new Elysia();

app.use(cors());

const createNotification = async (body: INotification, session: string) => {
  try {
    const isExist = await notificationSchema.findOne({
      title: body.title,
      body: body.body,
      clientId: body.clientId,
    });

    if (isExist) {
      throw new Error('Notification already exists');
    }

    const saveNotification = await notificationSchema.create({
      ...body,
      createdAt: new Date()
    });

    return {
      status: 200,
      data: saveNotification
    };
  } catch (err) {
    throw err;
  }
};

const sendNotification = async (notification: INotification) => {
  const message = {
    notification: {
      title: notification.title,
      body: notification.body,
    },
    token: notification.clientId
  };

  try {
    await admin.messaging().send(message);
    await notificationSchema.create(notification);
  } catch (err) {
    console.error('Error sending notification:', err);
  }
};

const handleResponse = async (action: any, set: any, params: any[]) => {
  try {
    const res = await action(...params);
    set.status = 200;
    return { data: res.data, message: "Success", ...res };
  } catch (error: any) {
    set.status = 500;
    return { message: error.message };
  }
};

const create = async ({ set, body, cookie: { auth_session } }: any) => {
  return handleResponse(createNotification, set, [body, auth_session.value]);
};

const send = async ({ set, body, cookie: { auth_session } }: any) => {
  return handleResponse(sendNotification, set, [body, auth_session.value]);
};

app.group('/notification', (app: any) =>
  app
    .post('/notifications', create, {
      detail: {
        summary: "save",
        tags: ["Notifications"]
      },
    })
    .post('/send', send, {
      detail: {
        summary: "send",
        tags: ["Notifications"]
      }
    })
);

const PORT = Bun.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(Bun.env.MONGODB_URI!, {});
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

startServer();
