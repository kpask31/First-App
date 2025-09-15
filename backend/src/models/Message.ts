import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'voice';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  voiceDuration?: number;
  isRead: boolean;
  readAt?: Date;
  isEdited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'voice'],
    default: 'text',
  },
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  voiceDuration: Number,
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  isEdited: {
    type: Boolean,
    default: false,
  },
  editedAt: Date,
}, {
  timestamps: true,
});

messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ isRead: 1 });

export interface IConversation extends Document {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  taskId?: mongoose.Types.ObjectId;
  lastMessage?: mongoose.Types.ObjectId;
  unreadCounts: Map<string, number>;
  isArchived: boolean;
  archivedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  unreadCounts: {
    type: Map,
    of: Number,
    default: new Map(),
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  archivedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

conversationSchema.index({ participants: 1 });
conversationSchema.index({ taskId: 1 });
conversationSchema.index({ updatedAt: -1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);
export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);