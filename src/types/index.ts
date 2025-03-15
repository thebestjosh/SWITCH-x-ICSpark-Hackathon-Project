// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  language: 'en' | 'haw' | 'fil' | 'ilo' | 'sm' | 'chk';
  preferences: UserPreferences;
  healthMetrics?: HealthMetrics;
  createdAt: string;
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: 'en' | 'haw' | 'fil' | 'ilo' | 'sm' | 'chk';
}

export interface HealthMetrics {
  height?: number; // in cm
  weight?: number; // in kg
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    date: string;
  }[];
  bloodSugar?: {
    value: number;
    date: string;
  }[];
}

// Learning content related types
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: HealthCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  lessons: Lesson[];
  quizzes: Quiz[];
  completedBy: string[];
}

export type HealthCategory = 
  | 'diabetes'
  | 'heart-health'
  | 'nutrition'
  | 'mental-health'
  | 'physical-activity'
  | 'traditional-medicine'
  | 'preventative-care';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  imageUrls?: string[];
}

// Quiz related types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizResult {
  userId: string;
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

// Forum related types
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: HealthCategory | 'general';
  createdAt: string;
  updatedAt: string;
  comments: ForumComment[];
  likes: number;
  views: number;
  tags: string[];
}

export interface ForumComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
}

// Resource related types
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: HealthCategory | 'general';
  url?: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  tags: string[];
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'system' | 'forum';
  read: boolean;
  createdAt: string;
  linkUrl?: string;
}