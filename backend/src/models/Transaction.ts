import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  _id: mongoose.Types.ObjectId;
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'escrowed' | 'completed' | 'disputed' | 'refunded';
  type: 'task_payment' | 'credit_purchase' | 'refund' | 'bonus';
  description?: string;
  paymentMethodId?: string; // For credit purchases
  disputeReason?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'escrowed', 'completed', 'disputed', 'refunded'],
    default: 'pending',
  },
  type: {
    type: String,
    enum: ['task_payment', 'credit_purchase', 'refund', 'bonus'],
    required: true,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  paymentMethodId: {
    type: String,
  },
  disputeReason: {
    type: String,
    maxlength: 500,
  },
  resolvedAt: Date,
}, {
  timestamps: true,
});

transactionSchema.index({ fromUserId: 1 });
transactionSchema.index({ toUserId: 1 });
transactionSchema.index({ taskId: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ createdAt: -1 });

export default mongoose.model<ITransaction>('Transaction', transactionSchema);