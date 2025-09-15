import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  phone: string;
  name: string;
  bio: string;
  location: string;
  profileImageUrl?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  accountStatus: 'active' | 'suspended' | 'inactive';
  creditBalance: number;
  rating: number;
  completedTasks: number;
  responseTime: number;
  completionRate: number;
  skills: mongoose.Types.ObjectId[];
  isAvailable: boolean;
  lastActive: Date;
  socialLogins: {
    google?: string;
    facebook?: string;
    apple?: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    taskUpdates: boolean;
    messages: boolean;
    marketing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  bio: {
    type: String,
    maxlength: 300,
    default: '',
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  profileImageUrl: {
    type: String,
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'inactive'],
    default: 'active',
  },
  creditBalance: {
    type: Number,
    default: 50, // Starting credits for new users
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  completedTasks: {
    type: Number,
    default: 0,
    min: 0,
  },
  responseTime: {
    type: Number,
    default: 0, // In hours
    min: 0,
  },
  completionRate: {
    type: Number,
    default: 0, // Percentage
    min: 0,
    max: 100,
  },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill',
  }],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  socialLogins: {
    google: String,
    facebook: String,
    apple: String,
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    taskUpdates: { type: Boolean, default: true },
    messages: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false },
  },
}, {
  timestamps: true,
});

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ location: 1 });
userSchema.index({ rating: -1 });
userSchema.index({ completedTasks: -1 });

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);