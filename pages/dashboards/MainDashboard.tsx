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
  GraduationCap,
  Scale,
  Award,
  BarChart as ChartIcon,
  ZapOff,
  Cpu,
  Globe,
  ClipboardCheck,
  ChevronRight,
  Layout,
  ChevronDown
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
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Props {
  user: User;
}

const MainDashboard: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('ME'); 
  const [studentPeriod, setStudentPeriod] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  const [principalTarget, setPrincipalTarget] = useState<'TEACHERS' | 'HOD'>('TEACHERS');
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.PATRON;
  const isStudent = user.role === UserRole.STUDENT;

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
      <div className={`${bgColor} p-8 rounded-[2.5rem] border border-gray-100 shadow-sm w-full overflow-hidden`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-black uppercase tracking-tighter flex items-center">
            <History size={18} className="mr-3 text-gold" /> Recent Activity Feed
          </h3>
          <button className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">Audit History</button>
        </div>
        <div className="flex flex-col space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 bg-white rounded-xl border border-transparent hover:border-gold transition-all group flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-6">
                <div className="p-2.5 bg-gray-50 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-800 leading-snug uppercase tracking-tight">
                    {activity.text}
                  </p>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
              <Activity size={14} className="text-gray-200 group-hover:text-gold transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const getStatsForHero = () => {
    if (isStudent) {
      return [
        { label: 'MY GPA', value: '3.72', icon: <Target size={14} className="text-blue-400" /> },
        { label: 'ATTENDANCE', value: '96%', icon: <UserCheck size={14} className="text-green-400" /> },
        { label: 'CLASS RANK', value: '12/42', icon: <Users2 size={14} className="text-gold" /> },
        { label: 'GRADE RANK', value: '20/93', icon: <Trophy size={14} className="text-purple-400" /> },
        { label: 'PENDING ASGN', value: '4', icon: <Briefcase size={14} className="text-orange-400" /> },
        { label: 'PENDING TESTS', value: '2', icon: <FileText size={14} className="text-red-400" /> },
        { label: 'NEW MSGS', value: '12', icon: <MessageSquare size={14} className="text-cyan-400" /> },
        { label: 'NEW POSTS', value: '8', icon: <Layout size={14} className="text-emerald-400" /> },
      ];
    }
    if (viewMode === 'ME') {
      return [
        { label: 'CLASSES', value: '5', icon: <Users2 size={14} className="text-blue-400" /> },
        { label: 'LOAD', value: '18/wk', icon: <Clock size={14} className="text-green-400" /> },
        { label: 'AVG GPA', value: '3.4', icon: <ChartIcon size={14} className="text-gold" /> },
        { label: 'PENDING', value: '12', icon: <FileText size={14} className="text-purple-400" /> },
      ];
    }
    return [
      { label: 'ENROLLED', value: '1,240', icon: <Users2 size={14} className="text-blue-400" /> },
      { label: 'ATTENDANCE', value: '94.2%', icon: <Clock size={14} className="text-green-400" /> },
      { label: 'STANDING', value: '89%', icon: <Trophy size={14} className="text-gold" /> },
      { label: 'ALERTS', value: '5', icon: <AlertCircle size={14} className="text-red-400" /> },
    ];
  };

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 xl:mb-0 xl:max-w-xl">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
             {isStudent ? 'My Academic Dashboard' : 'Institutional Performance Hub'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-5">
          {isStudent ? 'Student' : 'Institutional'}<br/>
          <span className="text-gold">{isStudent ? 'Analytics' : 'Performance'}</span>
        </h2>

        {isStudent ? (
           <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="relative inline-block group">
                <select className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                  <option className="bg-black">2026</option>
                  <option className="bg-black">2025</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
              </div>
              <div className="relative inline-block group">
                <select className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                  <option className="bg-black">TERM 1</option>
                  <option className="bg-black">TERM 2</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
              </div>
              <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
                Export Transcript
              </button>
           </div>
        ) : (
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest max-w-sm mb-10">
            Comprehensive performance audit logs for Students, Teachers, and Department Heads.
          </p>
        )}
        
        {/* Toggle Controls */}
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {(isStudent ? ['TERM', 'CUMULATIVE'] : ['STUDENTS', 'ME'] as const).map(target => (
            <button 
              key={target}
              onClick={() => isStudent ? setStudentPeriod(target as any) : setViewMode(target as any)}
              className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                (isStudent ? studentPeriod === target : viewMode === target)
                  ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - Stat Grid */}
      <div className={`relative z-10 grid ${isStudent ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'} gap-3`}>
        {getStatsForHero().map((stat, i) => (
          <div key={i} className={`bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] ${isStudent ? 'w-full sm:w-36 xl:w-44' : 'w-36'} flex flex-col items-start hover:bg-white/10 transition-colors group`}>
             <div className="mb-3 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{(stat as any).icon}</div>
             <h4 className="text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</h4>
             <p className="text-gray-500 text-[7px] xl:text-[8px] font-black uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrincipalDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderInstitutionalHero()}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <TrendingUp size={24} className="mr-3 text-gold" /> {viewMode === 'STUDENTS' ? 'Academic Growth Trajectory' : 'Institutional Efficiency Index'}
          </h3>
          <div className="h-[300px] bg-white rounded-[2.5rem] p-8 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Line type="monotone" dataKey="revenue" stroke={viewMode === 'ME' ? '#3B82F6' : '#FFD700'} strokeWidth={4} dot={{r: 6, fill: viewMode === 'ME' ? '#3B82F6' : '#FFD700', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-rose-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <ShieldCheck size={24} className="mr-3 text-gold" /> Critical Protocol Audit
          </h3>
          <div className="space-y-6">
            {(viewMode === 'STUDENTS' ? [
              { label: 'National Exam Registry', val: 100, color: 'bg-black' },
              { label: 'Internal Grade Audit', val: 82, color: 'bg-gold' },
              { label: 'University Pathway Sync', val: 45, color: 'bg-blue-500' },
              { label: 'Parent Engagement Rate', val: 94, color: 'bg-purple-500' },
            ] : [
              { label: 'License Verification', val: 98, color: 'bg-black' },
              { label: 'Lesson Plan Compliance', val: 91, color: 'bg-gold' },
              { label: 'Faculty Appraisals', val: 65, color: 'bg-blue-500' },
              { label: 'Safety Training', val: 100, color: 'bg-green-500' },
            ]).map((kpi, i) => (
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
        </div>
      </div>
      {renderRecentActivity('bg-slate-50')}
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderInstitutionalHero()}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-indigo-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <TrendingUp size={20} className="mr-3 text-gold" /> Performance Summary
            </h3>
            <div className="space-y-4">
              {[
                { subject: 'Mathematics', grade: 'A-', percentage: '91%', color: 'bg-blue-500' },
                { subject: 'Science', grade: 'B+', percentage: '85%', color: 'bg-green-500' },
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
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[1.5rem] shadow-sm">
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

  const renderStudentDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderInstitutionalHero()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <TrendingUp size={20} className="mr-3 text-gold" /> Performance Summary
          </h3>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', grade: 'A-', percentage: '91%', color: 'bg-blue-500' },
              { subject: 'Science', grade: 'B+', percentage: '85%', color: 'bg-green-500' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instructional Progress */}
          <div className="bg-blue-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <BookOpen size={20} className="mr-3 text-gold" /> Instructional Progress
            </h3>
            <div className="space-y-4">
              {[
                { subject: 'Mathematics Unit 4', progress: 92, status: 'Active', color: 'bg-blue-500' },
                { subject: 'Physics Practical 2', progress: 78, status: 'Delayed', color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white rounded-[1.5rem] shadow-sm">
                   <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs uppercase text-black">{item.subject}</span>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${item.status === 'Delayed' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>{item.status}</span>
                   </div>
                   <div className="flex items-center space-x-4">
                      <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full ${item.color}`} style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="font-black text-[10px] text-black">{item.progress}%</span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Pipeline */}
          <div className="bg-rose-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <ClipboardCheck size={20} className="mr-3 text-gold" /> Assessment Pipeline
            </h3>
            <div className="space-y-4">
              {[
                { task: 'Calculus Mock Exam', status: 'Pending', deadline: '2 days', color: 'bg-red-500' },
                { task: 'English Literature Essay', status: 'In Review', deadline: 'Completed', color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white rounded-[1.5rem] shadow-sm flex items-center justify-between border border-transparent hover:border-gold transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${item.status === 'Pending' ? 'bg-gold/10 text-gold' : 'bg-green-50 text-green-600'} rounded-xl flex items-center justify-center`}>
                      {item.status === 'Pending' ? <Clock size={16} /> : <CheckCircle size={16} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-black uppercase truncate">{item.task}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">{item.status} &bull; {item.deadline}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-gold hover:text-black transition-all">Go to Assignment Hub</button>
          </div>
        </div>

      {renderRecentActivity('bg-slate-50')}
    </div>
  );

  const renderDashboardByRole = () => {
    switch (user.role) {
      case UserRole.STUDENT:
        return renderStudentDashboard();
      case UserRole.PRINCIPAL:
        return renderPrincipalDashboard();
      case UserRole.TEACHER:
      case UserRole.PATRON:
        return renderTeacherDashboard();
      default:
        return renderStudentDashboard();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {renderDashboardByRole()}
    </div>
  );
};

export default MainDashboard;
