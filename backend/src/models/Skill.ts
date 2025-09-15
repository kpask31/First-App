import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  description: string;
  skillLevel: 'beginner' | 'intermediate' | 'expert';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Design & Creative',
      'Writing & Content',
      'Programming & Tech',
      'Business & Marketing',
      'Education & Training',
      'Home & Lifestyle',
      'Health & Fitness',
      'Other'
    ],
  },
  description: {
    type: String,
    maxlength: 500,
    default: '',
  },
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

skillSchema.index({ name: 1 });
skillSchema.index({ category: 1 });
skillSchema.index({ skillLevel: 1 });

export default mongoose.model<ISkill>('Skill', skillSchema);