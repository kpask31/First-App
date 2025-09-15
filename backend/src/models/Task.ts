import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  creditValue: number;
  deadline: Date;
  taskType: 'remote' | 'local' | 'hybrid';
  status: 'open' | 'in_progress' | 'submitted' | 'under_review' | 'completed' | 'disputed' | 'cancelled';
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  requiredSkills: mongoose.Types.ObjectId[];
  attachments: string[];
  location?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  additionalRequirements?: string;
  proposals: mongoose.Types.ObjectId[];
  submittedWork?: {
    files: string[];
    message?: string;
    submittedAt: Date;
  };
  revisionRequests: {
    feedback: string;
    requestedAt: Date;
  }[];
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 1000,
  },
  creditValue: {
    type: Number,
    required: true,
    min: 5,
    max: 500,
  },
  deadline: {
    type: Date,
    required: true,
    validate: {
      validator: function(this: ITask, deadline: Date) {
        return deadline > new Date(Date.now() + 24 * 60 * 60 * 1000); // At least 24 hours from now
      },
      message: 'Deadline must be at least 24 hours from now',
    },
  },
  taskType: {
    type: String,
    required: true,
    enum: ['remote', 'local', 'hybrid'],
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'submitted', 'under_review', 'completed', 'disputed', 'cancelled'],
    default: 'open',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  requiredSkills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  }],
  attachments: [{
    type: String,
  }],
  location: {
    type: String,
    trim: true,
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
  },
  additionalRequirements: {
    type: String,
    maxlength: 500,
  },
  proposals: [{
    type: Schema.Types.ObjectId,
    ref: 'Proposal',
  }],
  submittedWork: {
    files: [String],
    message: String,
    submittedAt: Date,
  },
  revisionRequests: [{
    feedback: {
      type: String,
      required: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  completedAt: Date,
}, {
  timestamps: true,
});

taskSchema.index({ createdBy: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ taskType: 1 });
taskSchema.index({ deadline: 1 });
taskSchema.index({ creditValue: -1 });
taskSchema.index({ requiredSkills: 1 });
taskSchema.index({ createdAt: -1 });
taskSchema.index({ location: 1 });

export default mongoose.model<ITask>('Task', taskSchema);