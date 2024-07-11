import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';

export const app = new Elysia();

app.use(cors({
  origin: '',
  methods: ['GET', 'POST']
}))

app.post('/get-token', async (req: { json: () => PromiseLike<{ token: any; }> | { token: any; }; }, res: { json: (arg0: { success: boolean; error?: string; token?: any; }) => any; }) => {
  const { token } = await req.json();

  if (!token) {
    return res.json({
      success: false,
      error: 'Token not found',
    });
  }
  return res.json({
    success: true,
    token,
  });
});