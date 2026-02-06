
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  HOD = 'HOD',
  PRINCIPAL = 'PRINCIPAL',
  BURSAR = 'BURSAR',
  ADMISSIONS = 'ADMISSIONS',
  ADMIN = 'ADMIN',
  SUPER_USER = 'SUPER_USER',
  VENDOR = 'VENDOR',
  PATRON = 'PATRON'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isVerified: boolean;
}

export type ViewState = 'HOME' | 'ABOUT' | 'ACADEMICS' | 'STUDENTS' | 'CONTACT' | 'LOGIN' | 'REGISTER' | 'VERIFY' | 'DASHBOARD';

export interface Post {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  unread: number;
  online: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'folder' | 'pdf' | 'doc' | 'img';
  date: string;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  room: string;
  teacher: string;
  day: string;
}
