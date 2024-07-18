import { Elysia, t } from "elysia";
import notificationSchema from "../models/Notification";

export default new Elysia().post(
  "/notifications",
  async ({ body }) => {
    const isExist = await notificationSchema.findOne({
      title: body.title,
      body: body.body,
      clientId: body.clientId,
    });

    if (isExist) {
      throw new Error("Notification already exists");
    }

    const saveNotification = await notificationSchema.create({
      ...body,
      createdAt: new Date(),
    });

    return {
      status: 200,
      data: saveNotification,
    };
  },
  {
    detail: {
      summary: "save",
      tags: ["Notifications"],
    },
    body: t.Object({
      title: t.String(),
      body: t.String(),
      clientId: t.String(),
    }),
  }
);
