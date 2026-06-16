// User Types
export enum EnglishLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  FLUENT = 'FLUENT',
}

export enum LearningGoal {
  IELTS = 'IELTS',
  SPEAKING = 'SPEAKING',
  TRAVEL_ENGLISH = 'TRAVEL_ENGLISH',
  BUSINESS_ENGLISH = 'BUSINESS_ENGLISH',
  SCHOOL_ENGLISH = 'SCHOOL_ENGLISH',
}

export enum UserRank {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  TEACHERS_APPRENTICE = 'TEACHERS_APPRENTICE',
  LEFT_HAND = 'LEFT_HAND',
  RIGHT_HAND = 'RIGHT_HAND',
  SENIOR_ASSISTANT = 'SENIOR_ASSISTANT',
  VICE_TEACHER = 'VICE_TEACHER',
  LEADER = 'LEADER',
}

export enum BookCategory {
  GRAMMAR = 'GRAMMAR',
  VOCABULARY = 'VOCABULARY',
  IELTS = 'IELTS',
  SPEAKING = 'SPEAKING',
  PRONUNCIATION = 'PRONUNCIATION',
}

export enum TeacherMode {
  FRIENDLY = 'FRIENDLY',
  STRICT = 'STRICT',
}

export enum MissionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum BossBattleType {
  AIRPORT_CONVERSATION = 'AIRPORT_CONVERSATION',
  JOB_INTERVIEW = 'JOB_INTERVIEW',
  IELTS_SPEAKING_TEST = 'IELTS_SPEAKING_TEST',
  BUSINESS_MEETING = 'BUSINESS_MEETING',
}

export enum BossBattleStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  englishLevel: EnglishLevel;
  learningGoal: LearningGoal;
  xp: number;
  level: number;
  rank: UserRank;
  dailyStreak: number;
  totalSpeakingTime: number;
  completedTasks: number;
  lastActivityAt?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  topic?: string;
  teacherMode: TeacherMode;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  grammarMistakes?: string;
  suggestions?: string;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  description?: string;
  coverImage?: string;
  pdfUrl?: string;
  totalPages: number;
  chapters: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  description?: string;
  icon?: string;
  badgeColor: string;
  unlockedAt: Date;
}

export interface Mission {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: string;
  targetValue: number;
  currentValue: number;
  status: MissionStatus;
  reward: number;
  createdAt: Date;
  completedAt?: Date;
  updatedAt: Date;
}

export interface GameScore {
  id: string;
  userId: string;
  gameType: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  createdAt: Date;
}

export interface BossBattle {
  id: string;
  name: string;
  type: BossBattleType;
  description?: string;
  difficulty: number;
  createdAt: Date;
}

export interface BossBattleResult {
  id: string;
  userId: string;
  bossBattleId: string;
  status: BossBattleStatus;
  grammarScore: number;
  vocabularyScore: number;
  fluencyScore: number;
  pronunciationScore: number;
  totalScore: number;
  feedback?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  weeklyXp: number;
  weeklyStreak: number;
  weeklySpeakingTime: number;
  rank: number;
  lastUpdated: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  englishLevel: EnglishLevel;
  learningGoal: LearningGoal;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  expires: string;
}
