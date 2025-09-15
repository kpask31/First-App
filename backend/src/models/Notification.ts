import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'task_update' | 'proposal_received' | 'message' | 'payment' | 'review' | 'system';
  isRead: boolean;
  readAt?: Date;
  data?: any;
  actionUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  message: {
    type: String,
    required: true,
    maxlength: 300,
  },
  type: {
    type: String,
    enum: ['task_update', 'proposal_received', 'message', 'payment', 'review', 'system'],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  data: Schema.Types.Mixed,
  actionUrl: String,
}, {
  timestamps: true,
});

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ type: 1 });

export default mongoose.model<INotification>('Notification', notificationSchema);