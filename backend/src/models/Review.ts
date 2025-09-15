import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
  reviewerId: mongoose.Types.ObjectId;
  revieweeId: mongoose.Types.ObjectId;
  overallRating: number;
  communicationRating: number;
  timelinessRating: number;
  qualityRating: number;
  wouldRecommend: boolean;
  comment: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  revieweeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  overallRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  communicationRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  timelinessRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  qualityRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  wouldRecommend: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 25,
    maxlength: 500,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

reviewSchema.index({ taskId: 1, reviewerId: 1 }, { unique: true });
reviewSchema.index({ revieweeId: 1 });
reviewSchema.index({ overallRating: -1 });
reviewSchema.index({ createdAt: -1 });

export default mongoose.model<IReview>('Review', reviewSchema);