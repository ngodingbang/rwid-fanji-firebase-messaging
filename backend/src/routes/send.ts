import { Elysia, t } from "elysia";
import { admin } from "../config/firebaseAdmin";
import notificationSchema from "../models/Notification";

export default new Elysia().post(
  // /notification/send
  "/send",
  async ({ body }) => {
    const message = {
      notification: {
        title: body.title,
        body: body.body,
      },
      token: body.clientId,
    };

    try {
      await admin.messaging().send(message);
      await notificationSchema.create(body);
    } catch (err) {
      console.error("Error sending notification:", err);
    }
  },
  {
    detail: {
      summary: "send",
      tags: ["Notifications"],
    },
    body: t.Object({
      title: t.String(),
      body: t.String(),
      clientId: t.String(),
    }),
  }
);
