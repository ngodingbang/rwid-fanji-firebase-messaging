import { Elysia } from "elysia";
import { notificationRoutes } from "./routes/notificationRoutes";
import { corsConfig } from "./config/corsConfig";
import cors from "@elysiajs/cors";

const app = new Elysia();

app.use(corsConfig);
notificationRoutes(app);

export { app };