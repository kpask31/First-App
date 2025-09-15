export interface User {
  id: string;
  email: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  skillLevel: 'beginner' | 'intermediate' | 'expert';
}

export interface UserSkill {
  userId: string;
  skillId: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
  endorsements: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  creditValue: number;
  deadline: string;
  taskType: 'remote' | 'local' | 'hybrid';
  status: 'open' | 'in_progress' | 'submitted' | 'under_review' | 'completed' | 'disputed' | 'cancelled';
  createdBy: string;
  assignedTo?: string;
  requiredSkills: string[];
  attachments?: string[];
  location?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  additionalRequirements?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Proposal {
  id: string;
  taskId: string;
  providerId: string;
  message: string;
  estimatedCompletionTime: number;
  portfolioExamples?: string[];
  questions?: string;
  status: 'pending' | 'accepted' | 'declined' | 'withdrawn';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  taskId: string;
  amount: number;
  status: 'pending' | 'escrowed' | 'completed' | 'disputed' | 'refunded';
  createdAt: string;
  completedAt?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'voice';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  voiceDuration?: number;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  taskId?: string;
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  taskId: string;
  reviewerId: string;
  revieweeId: string;
  overallRating: number;
  communicationRating: number;
  timelinessRating: number;
  qualityRating: number;
  wouldRecommend: boolean;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task_update' | 'proposal_received' | 'message' | 'payment' | 'review' | 'system';
  isRead: boolean;
  data?: any;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  creditReward: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: string;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  TaskDetails: { taskId: string };
  UserProfile: { userId: string };
  CreateTask: undefined;
  EditProfile: undefined;
  Messages: undefined;
  Chat: { conversationId: string };
  Notifications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Browse: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
}

export interface TaskForm {
  title: string;
  description: string;
  creditValue: number;
  deadline: Date;
  taskType: 'remote' | 'local' | 'hybrid';
  requiredSkills: string[];
  location?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  additionalRequirements?: string;
  attachments?: string[];
}

export interface ProposalForm {
  message: string;
  estimatedCompletionTime: number;
  portfolioExamples?: string[];
  questions?: string;
}

// Filter and search types
export interface TaskFilters {
  skills?: string[];
  creditRange?: [number, number];
  location?: string;
  radius?: number;
  taskType?: 'remote' | 'local' | 'hybrid';
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  datePosted?: 'today' | 'week' | 'month';
  sortBy?: 'recent' | 'credits' | 'deadline' | 'match';
}

export interface UserFilters {
  skills?: string[];
  rating?: number;
  location?: string;
  radius?: number;
  availability?: boolean;
  sortBy?: 'rating' | 'completed' | 'recent';
}