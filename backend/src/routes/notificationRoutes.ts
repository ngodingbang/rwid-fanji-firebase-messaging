import { Elysia } from "elysia";
import { createNotification } from "../controllers/notificationController";

export const notificationRoutes = (app: Elysia) => {
  app.post('/notification', createNotification);
};