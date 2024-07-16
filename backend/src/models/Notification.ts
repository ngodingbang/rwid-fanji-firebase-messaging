import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  title: string;
  body: string;
  clientId: string;
  session: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  clientId: { type: String, required: true },
  session: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<INotification>("Notification", notificationSchema);
