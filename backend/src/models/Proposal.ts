import mongoose, { Document, Schema } from 'mongoose';

export interface IProposal extends Document {
  _id: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  message: string;
  estimatedCompletionTime: number; // in hours
  portfolioExamples: string[];
  questions?: string;
  status: 'pending' | 'accepted' | 'declined' | 'withdrawn';
  declineReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const proposalSchema = new Schema<IProposal>({
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 500,
  },
  estimatedCompletionTime: {
    type: Number,
    required: true,
    min: 1,
    max: 720, // Max 30 days in hours
  },
  portfolioExamples: [{
    type: String,
  }],
  questions: {
    type: String,
    maxlength: 300,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'withdrawn'],
    default: 'pending',
  },
  declineReason: {
    type: String,
    maxlength: 200,
  },
}, {
  timestamps: true,
});

proposalSchema.index({ taskId: 1 });
proposalSchema.index({ providerId: 1 });
proposalSchema.index({ status: 1 });
proposalSchema.index({ createdAt: -1 });

proposalSchema.index({ taskId: 1, providerId: 1 }, { unique: true });

export default mongoose.model<IProposal>('Proposal', proposalSchema);