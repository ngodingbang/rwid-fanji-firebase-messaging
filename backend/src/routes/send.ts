import { Elysia, t } from "elysia";
import { admin } from "../config/firebaseAdmin";

export default new Elysia().post(
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