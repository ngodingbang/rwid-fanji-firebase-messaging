import { cors } from "@elysiajs/cors";

export const corsConfig = cors ({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
});