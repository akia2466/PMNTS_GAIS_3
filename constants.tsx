
import { UserRole, Post, ChatContact, FileItem, ScheduleItem } from './types';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award, 
  LayoutDashboard, 
  MessageSquare, 
  Rss, 
  Files, 
  Calendar, 
  UserPlus,
  UserCheck
} from 'lucide-react';
import React from 'react';

export const COLORS = {
  PRIMARY: '#000000',
  SECONDARY: '#FFD700',
  ACCENT: '#B8860B',
  BG_LIGHT: '#F8F8F8'
};

export const METRICS = [
  { label: 'University Admission Rate', value: '95%', icon: <GraduationCap size={24} /> },
  { label: 'National Rank (Science)', value: '#1', icon: <Award size={24} /> },
  { label: 'Annual Graduates', value: '450+', icon: <Users size={24} /> },
  { label: 'Programs Offered', value: '12+', icon: <BookOpen size={24} /> },
  { label: 'Students Enrolled', value: '1,240', icon: <UserPlus size={24} /> },
  { label: 'Qualified Teachers', value: '82', icon: <UserCheck size={24} /> }
];

export const NEWS = [
  {
    id: '1',
    title: 'Science Fair 2024 Winners',
    excerpt: 'The annual STEM symposium concludes with groundbreaking student projects in renewable energy.',
    date: 'Oct 12, 2024',
    category: 'Innovation',
    image: 'https://picsum.photos/seed/science/400/300'
  },
  {
    id: '2',
    title: 'New Digital Hub Launch',
    excerpt: 'Principal announces state-of-the-art computer science center to open next semester.',
    date: 'Oct 08, 2024',
    category: 'Facilities',
    image: 'https://picsum.photos/seed/tech/400/300'
  },
  {
    id: '3',
    title: 'Sports Day Victory',
    excerpt: 'POMNHS Athletics team secures 1st place in the regional inter-school championships.',
    date: 'Oct 05, 2024',
    category: 'Sports',
    image: 'https://picsum.photos/seed/sports/400/300'
  }
];

export const DUMMY_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'John Doe',
    authorRole: 'Student Council',
    content: 'Don\'t forget about the general assembly tomorrow at the Grand Hall! Attendance is mandatory.',
    timestamp: '2 hours ago',
    likes: 45,
    comments: 12
  },
  {
    id: 'p2',
    author: 'Ms. Sarah Smith',
    authorRole: 'Head of Mathematics',
    content: 'Sharing the new mock exam schedule for Grade 12 students. Check your emails or the Vault.',
    timestamp: '5 hours ago',
    likes: 89,
    comments: 5,
    image: 'https://picsum.photos/seed/math/600/300'
  }
];

export const CHAT_CONTACTS: ChatContact[] = [
  { id: 'c1', name: 'James Kari', role: 'Student', lastMessage: 'See you at the library.', unread: 2, online: true },
  { id: 'c2', name: 'Dr. Anna Vele', role: 'Teacher', lastMessage: 'Your assignment is reviewed.', unread: 0, online: false },
  { id: 'c3', name: 'Bursar Office', role: 'Admin', lastMessage: 'Fee statement attached.', unread: 0, online: true }
];

export const VAULT_FILES: FileItem[] = [
  { id: 'f1', name: 'Curriculum 2024', size: '--', type: 'folder', date: '2024-01-10' },
  { id: 'f2', name: 'Mathematics_Mock_Exam.pdf', size: '2.4 MB', type: 'pdf', date: '2024-10-01' },
  { id: 'f3', name: 'Campus_Map_HighRes.png', size: '5.1 MB', type: 'img', date: '2024-09-15' }
];

export const SCHEDULE: ScheduleItem[] = [
  { id: 's1', subject: 'Advanced Mathematics', time: '08:00 - 09:30', room: 'RM 102', teacher: 'Dr. Vele', day: 'Monday' },
  { id: 's2', subject: 'Physics Lab', time: '10:00 - 11:30', room: 'Lab B', teacher: 'Mr. Tau', day: 'Monday' },
  { id: 's3', subject: 'Literature', time: '13:00 - 14:30', room: 'RM 204', teacher: 'Ms. Gere', day: 'Monday' }
];
