import { Schema, model, Document } from "mongoose";

export interface IToken extends Document {
  userId: string;
  token: string;
  accessToken: string;
  session: string;
  createdAt: Date;
}

const tokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  accessToken: { type: String, required: true },
  session: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IToken>('Token', tokenSchema);
