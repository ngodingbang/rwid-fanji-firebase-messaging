import { Schema, model, Document } from 'mongoose';

interface INotification extends Document {
  title: string;
  body: string;
  clientId: string;
}

const notificationSchema = new Schema<INotification>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  clientId: { type: String, require: true }
});

const Notification = model<INotification>('Notification', notificationSchema);

export { Notification };
export type { INotification };
