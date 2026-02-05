
import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  FileText,
  MessageSquare,
  AlertCircle,
  Trophy,
  ChevronRight,
  History,
  Building2,
  Briefcase,
  Activity,
  Users,
  Wallet,
  Zap,
  ShieldCheck,
  UserX,
  UserCheck,
  Target,
  BarChart3,
  Users2,
  GraduationCap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface Props {
  user: User;
}

const MainDashboard: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'TEACHERS' | 'HOD'>('STUDENTS');
  const isPrincipal = user.role === UserRole.PRINCIPAL;

  const financialData = [
    { month: 'Jan', revenue: 450000, expenses: 320000 },
    { month: 'Feb', revenue: 520000, expenses: 340000 },
    { month: 'Mar', revenue: 480000, expenses: 310000 },
    { month: 'Apr', revenue: 610000, expenses: 380000 },
  ];

  const recentActivities = [
    { id: 1, icon: <CheckCircle className="text-green-500" />, text: "Registry sync completed: Term 1 assessment data uploaded.", time: "12 mins ago" },
    { id: 2, icon: <MessageSquare className="text-blue-500" />, text: "Faculty notice: Staff meeting in Grand Hall at 15:00.", time: "1 hour ago" },
    { id: 3, icon: <FileText className="text-gold" />, text: "Curriculum update: Grade 12 Mock Exam Syllabus released.", time: "3 hours ago" },
    { id: 4, icon: <AlertCircle className="text-red-500" />, text: "Infrastructure alert: Server maintenance scheduled for 02:00 AM.", time: "5 hours ago" },
  ];

  const renderRecentActivity = (bgColor: string = "bg-white") => (
    <section className="mt-12 w-full">
      <div className={`${bgColor} p-10 rounded-[3rem] border border-gray-100 shadow-sm w-full overflow-hidden`}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-black uppercase tracking-tighter flex items-center">
            <History size={20} className="mr-3 text-gold" /> Recent Activity Feed
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">Audit History</button>
        </div>
        <div className="flex flex-col space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-5 bg-white rounded-2xl border border-transparent hover:border-gold transition-all group flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-gray-50 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 leading-snug uppercase tracking-tight">
                    {activity.text}
                  </p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-200 group-hover:text-gold transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPrincipalDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* View Toggle */}
      <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
        {(['STUDENTS', 'TEACHERS', 'HOD'] as const).map(target => (
          <button 
            key={target}
            onClick={() => setViewMode(target)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === target ? 'bg-black text-gold shadow-lg shadow-black/20' : 'text-gray-400 hover:text-black'}`}
          >
            {target}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {viewMode === 'STUDENTS' ? [
          { label: 'Total Enrolled', value: '1,240', icon: <Users2 size={16} />, bg: 'bg-blue-50' },
          { label: 'Avg Attendance', value: '94.2%', icon: <Clock size={16} />, bg: 'bg-green-50' },
          { label: 'Academic Standing', value: '89%', icon: <Trophy size={16} />, bg: 'bg-gold/10' },
          { label: 'Registry Alerts', value: '5', icon: <AlertCircle size={16} />, bg: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2.5rem] border border-transparent shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group`}>
            <div className="p-3 bg-white rounded-2xl text-gold mb-3 group-hover:scale-110 transition-transform shadow-sm">{stat.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        )) : viewMode === 'TEACHERS' ? [
          { label: 'Faculty Count', value: '82', icon: <GraduationCap size={16} />, bg: 'bg-purple-50' },
          { label: 'Avg Efficiency', value: '91%', icon: <Activity size={16} />, bg: 'bg-indigo-50' },
          { label: 'Lesson Coverage', value: '88%', icon: <BookOpen size={16} />, bg: 'bg-cyan-50' },
          { label: 'Staff On Leave', value: '3', icon: <UserX size={16} />, bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2.5rem] border border-transparent shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group`}>
            <div className="p-3 bg-white rounded-2xl text-gold mb-3 group-hover:scale-110 transition-transform shadow-sm">{stat.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        )) : [
          { label: 'Dept Oversight', value: '4/4', icon: <Briefcase size={16} />, bg: 'bg-slate-100' },
          { label: 'Strategic KPIs', value: '92%', icon: <Target size={16} />, bg: 'bg-emerald-50' },
          { label: 'Budget Utilization', value: '74%', icon: <Wallet size={16} />, bg: 'bg-orange-50' },
          { label: 'Compliance Rate', value: '99%', icon: <ShieldCheck size={16} />, bg: 'bg-gold/10' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2.5rem] border border-transparent shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group`}>
            <div className="p-3 bg-white rounded-2xl text-gold mb-3 group-hover:scale-110 transition-transform shadow-sm">{stat.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <TrendingUp size={24} className="mr-3 text-gold" /> Institutional Growth Index
          </h3>
          <div className="h-[300px] bg-white rounded-[2.5rem] p-8 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Line type="monotone" dataKey="revenue" stroke="#FFD700" strokeWidth={4} dot={{r: 6, fill:'#FFD700', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-rose-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <ShieldCheck size={24} className="mr-3 text-gold" /> Critical Milestone Audit
          </h3>
          <div className="space-y-6">
            {[
              { label: 'National Exam Registration', val: 100, color: 'bg-black' },
              { label: 'Faculty Quality Audit', val: 82, color: 'bg-gold' },
              { label: 'Infrastructure Grant Review', val: 45, color: 'bg-blue-500' },
              { label: 'Registry Compliance', val: 94, color: 'bg-purple-500' },
            ].map((kpi, i) => (
              <div key={i} className="space-y-3">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="text-gray-600">{kpi.label}</span>
                    <span className="text-black">{kpi.val}%</span>
                 </div>
                 <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full ${kpi.color} transition-all duration-1000`} style={{ width: `${kpi.val}%` }} />
                 </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-gold hover:text-black transition-all">Generate Executive Report</button>
        </div>
      </div>
      {renderRecentActivity('bg-slate-50')}
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'GPA', value: '3.7', icon: <TrendingUp size={16} />, bg: 'bg-blue-50' },
          { label: 'Attendance', value: '95%', icon: <Clock size={16} />, bg: 'bg-green-50' },
          { label: 'Class Rank', value: '12/42', icon: <Trophy size={16} />, bg: 'bg-purple-50' },
          { label: 'Grade Rank', value: '20/93', icon: <Trophy size={16} />, bg: 'bg-orange-50' },
          { label: 'Assignments', value: '5', icon: <CheckCircle size={16} />, bg: 'bg-pink-50' },
          { label: 'Tests', value: '3', icon: <AlertCircle size={16} />, bg: 'bg-red-50' },
          { label: 'Messages', value: '8', icon: <MessageSquare size={16} />, bg: 'bg-cyan-50' },
          { label: 'Courses', value: '8', icon: <BookOpen size={16} />, bg: 'bg-gold/10' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2.5rem] border border-transparent shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group`}>
            <div className="p-3 bg-white rounded-2xl text-gold mb-3 group-hover:scale-110 transition-transform shadow-sm">{stat.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <TrendingUp size={20} className="mr-3 text-gold" /> Performance Summary
          </h3>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', grade: 'A-', percentage: '91%', color: 'bg-blue-500' },
              { subject: 'Science', grade: 'B+', percentage: '85%', color: 'bg-green-500' },
              { subject: 'Literature', grade: 'A', percentage: '92%', color: 'bg-purple-500' },
              { subject: 'Social Science', grade: 'B', percentage: '81%', color: 'bg-orange-500' },
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[1.5rem] shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${course.color} text-white rounded-xl flex items-center justify-center font-black text-xs`}>{course.grade}</div>
                  <span className="font-bold text-sm uppercase tracking-tight">{course.subject}</span>
                </div>
                <span className="font-black text-sm tracking-tight">{course.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <UserCheck size={20} className="mr-3 text-gold" /> Attendance Summary
          </h3>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', absent: 0, tardy: 1, color: 'text-blue-600' },
              { subject: 'Science', absent: 1, tardy: 2, color: 'text-green-600' },
              { subject: 'Literature', absent: 0, tardy: 0, color: 'text-purple-600' },
              { subject: 'Social Science', absent: 1, tardy: 0, color: 'text-orange-600' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[1.5rem] shadow-sm border border-transparent hover:border-gold transition-colors">
                <span className={`font-bold text-sm uppercase tracking-tight ${stat.color}`}>{stat.subject}</span>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Absent</p>
                    <p className={`text-sm font-black ${stat.absent > 0 ? 'text-red-500' : 'text-gray-900'}`}>{stat.absent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Tardy</p>
                    <p className={`text-sm font-black ${stat.tardy > 0 ? 'text-orange-500' : 'text-gray-900'}`}>{stat.tardy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderRecentActivity('bg-slate-50')}
    </div>
  );

  const renderHODDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Dept Avg GPA', value: '3.6', icon: <BarChart3 size={16} />, bg: 'bg-blue-50' },
          { label: 'Dept Attendance', value: '94%', icon: <Clock size={16} />, bg: 'bg-green-50' },
          { label: 'Dept Rank', value: '#1', icon: <Trophy size={16} />, bg: 'bg-gold/10' },
          { label: 'Staff Count', value: '4', icon: <Users size={16} />, bg: 'bg-purple-50' },
          { label: 'Pending Reviews', value: '8', icon: <FileText size={16} />, bg: 'bg-orange-50' },
          { label: 'Active Curricula', value: '2', icon: <BookOpen size={16} />, bg: 'bg-cyan-50' },
          { label: 'Dept Inquiries', value: '15', icon: <MessageSquare size={16} />, bg: 'bg-pink-50' },
          { label: 'Registry Alerts', value: '2', icon: <AlertCircle size={16} />, bg: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2.5rem] border border-transparent shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group`}>
            <div className="p-3 bg-white rounded-2xl text-gold mb-3 group-hover:scale-110 transition-transform shadow-sm">{stat.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <Target size={24} className="mr-3 text-gold" /> Mathematics Teacher Overview
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Mr. A. Kila', grades: '11 & 12', load: '18 hrs/wk', performance: '92%', color: 'bg-blue-500' },
              { name: 'Ms. B. Vele', grades: '11 & 12', load: '16 hrs/wk', performance: '88%', color: 'bg-green-500' },
              { name: 'Mr. C. Gere', grades: '11 & 12', load: '17 hrs/wk', performance: '94%', color: 'bg-purple-500' },
              { name: 'Ms. D. Gima', grades: '11 & 12', load: '16 hrs/wk', performance: '85%', color: 'bg-orange-500' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-sm border border-transparent hover:border-gold transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${t.color} text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg`}>{t.name.split(' ')[1][0]}</div>
                  <div>
                    <span className="font-black text-sm uppercase text-black block">{t.name}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Load: {t.load} &bull; Grades: {t.grades}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-black leading-none">{t.performance}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gold/10 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase mb-8 flex items-center">
              <TrendingUp size={24} className="mr-3 text-gold" /> Mathematics Dept Performance
           </h3>
           <div className="h-[300px] bg-white rounded-[2.5rem] p-8 shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[{g:'G11',a:84},{g:'G12',a:89}]}>
                    <Bar dataKey="a" fill="#000" radius={[10, 10, 0, 0]} />
                    <XAxis dataKey="g" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#F8F8F8'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-8 flex justify-around">
             <div className="text-center">
               <p className="text-3xl font-black text-black">86.5%</p>
               <p className="text-[9px] font-bold text-gray-400 uppercase">Average Mastery</p>
             </div>
             <div className="w-[1px] bg-gray-200" />
             <div className="text-center">
               <p className="text-3xl font-black text-gold">420</p>
               <p className="text-[9px] font-bold text-gray-400 uppercase">Enrolled Students</p>
             </div>
           </div>
        </div>
      </div>
      {renderRecentActivity('bg-slate-50')}
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Class GPA', value: '3.4', icon: <TrendingUp size={16} />, bg: 'bg-blue-50' },
          { label: 'Avg Attendance', value: '92%', icon: <Clock size={16} />, bg: 'bg-green-50' },
          { label: 'Avg Tardiness', value: '4%', icon: <AlertCircle size={16} />, bg: 'bg-orange-50' },
          { label: 'Class Rank', value: '3/12', icon: <Trophy size={16} />, bg: 'bg-purple-50' },
          { label: 'Teaching Load', value: '4', icon: <Building2 size={16} />, bg: 'bg-cyan-50' },
          { label: 'Pending Assignments', value: '12', icon: <Briefcase size={16} />, bg: 'bg-pink-50' },
          { label: 'Pending Tests', value: '2', icon: <FileText size={16} />, bg: 'bg-red-50' },
          { label: 'Unread Messages', value: '24', icon: <MessageSquare size={16} />, bg: 'bg-gold/10' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2.5rem] border border-transparent shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group`}>
            <div className="p-3 bg-white rounded-2xl text-gold mb-3 group-hover:scale-110 transition-transform shadow-sm">{stat.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <Building2 size={20} className="mr-3 text-gold" /> Class Performance Summary
          </h3>
          <div className="space-y-4">
            {[
              { class: 'Grade 12A', subject: 'Mathematics', average: '88%', color: 'bg-blue-500' },
              { class: 'Grade 12B', subject: 'Mathematics', average: '82%', color: 'bg-blue-600' },
              { class: 'Grade 11C', subject: 'Advanced Math', average: '91%', color: 'bg-indigo-500' },
              { class: 'Grade 11D', subject: 'Advanced Math', average: '84%', color: 'bg-indigo-600' },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[1.5rem] shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${c.color} text-white rounded-xl flex items-center justify-center font-black text-[10px]`}>{c.class.split(' ')[1]}</div>
                  <div>
                    <span className="font-black text-xs uppercase tracking-tight block">{c.class}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{c.subject}</span>
                  </div>
                </div>
                <span className="font-black text-sm tracking-tight">{c.average}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <UserCheck size={20} className="mr-3 text-gold" /> Class Attendance Summary
          </h3>
          <div className="space-y-4">
            {[
              { class: 'Grade 12A', absent: 2, tardy: 1, color: 'text-blue-600' },
              { class: 'Grade 12B', absent: 4, tardy: 3, color: 'text-blue-700' },
              { class: 'Grade 11C', absent: 1, tardy: 0, color: 'text-indigo-600' },
              { class: 'Grade 11D', absent: 3, tardy: 2, color: 'text-indigo-700' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[1.5rem] shadow-sm border border-transparent hover:border-gold transition-colors">
                <span className={`font-black text-xs uppercase tracking-tight ${stat.color}`}>{stat.class}</span>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Absences</p>
                    <p className={`text-sm font-black ${stat.absent > 3 ? 'text-red-500' : 'text-gray-900'}`}>{stat.absent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Tardy</p>
                    <p className={`text-sm font-black ${stat.tardy > 2 ? 'text-orange-500' : 'text-gray-900'}`}>{stat.tardy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderRecentActivity('bg-slate-50')}
    </div>
  );

  const renderDashboardByRole = () => {
    switch (user.role) {
      case UserRole.STUDENT:
        return renderStudentDashboard();
      case UserRole.HOD:
        return renderHODDashboard();
      case UserRole.PRINCIPAL:
        return renderPrincipalDashboard();
      case UserRole.TEACHER:
      case UserRole.ADMIN:
      case UserRole.SUPER_USER:
      case UserRole.VENDOR:
        return renderTeacherDashboard();
      case UserRole.ADMISSIONS:
        return renderPrincipalDashboard(); // Using Principal's for Admissions/Admins
      case UserRole.BURSAR:
        return renderPrincipalDashboard(); // Using Principal's for BURSAR
      default:
        return renderStudentDashboard();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Institutional Overview</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Authenticated as: {user.name} &bull; {user.role} Portal
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Audit Export</button>
          <button className="bg-gold text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 transition-all">Quick Broadcast</button>
        </div>
      </div>

      {renderDashboardByRole()}
    </div>
  );
};

export default MainDashboard;
