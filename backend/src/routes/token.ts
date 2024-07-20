import { Elysia, t } from "elysia";
import type { IToken } from "../models/Token";
import Token from "../models/Token";

export default new Elysia().post(
  "/saveToken",
  async ({ body }) => {
    const { userId, token, accessToken } = body;

    try {
      await saveToken(userId, { token, accessToken });
      return new Response('Token successfully saved', { status: 200 });
    } catch (error) {
      return new Response('Error saving token: ' + (error as Error).message, { status: 500 });
    }
  },
  {
    body: t.Object({
      userId: t.String(),
      token: t.String(),
      accessToken: t.String(),
    })
  }
);

const saveToken = async (userId: string, tokenData: { token: string, accessToken: string }): Promise<void> => {
  try {
    const tokenDoc: IToken = new Token({
      userId,
      token: tokenData.token,
      accessToken: tokenData.accessToken,
    });
    await tokenDoc.save();
    console.log('Tokens successfully saved!');
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};
