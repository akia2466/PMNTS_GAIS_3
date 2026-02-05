
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
  Globe
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
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'TEACHERS' | 'HOD'>('STUDENTS');
  const isPrincipal = user.role === UserRole.PRINCIPAL;

  const financialData = [
    { month: 'Jan', revenue: 450000, expenses: 320000 },
    { month: 'Feb', revenue: 520000, expenses: 340000 },
    { month: 'Mar', revenue: 480000, expenses: 310000 },
    { month: 'Apr', revenue: 610000, expenses: 380000 },
  ];

  const pieData = [
    { name: 'Science', value: 400 },
    { name: 'Humanities', value: 300 },
    { name: 'Arts', value: 200 },
    { name: 'Tech', value: 100 },
  ];
  const COLORS_PIE = ['#000000', '#FFD700', '#B8860B', '#444444'];

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
              <Activity size={16} className="text-gray-200 group-hover:text-gold transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPrincipalDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
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
        {(viewMode === 'STUDENTS' ? [
          { label: 'Total Enrolled', value: '1,240', icon: <Users2 size={16} />, bg: 'bg-blue-50' },
          { label: 'Avg Attendance', value: '94.2%', icon: <Clock size={16} />, bg: 'bg-green-50' },
          { label: 'Academic Standing', value: '89%', icon: <Trophy size={16} />, bg: 'bg-gold/10' },
          { label: 'Registry Alerts', value: '5', icon: <AlertCircle size={16} />, bg: 'bg-red-50' },
          { label: 'Univ. Placement', value: '95%', icon: <Globe size={16} />, bg: 'bg-indigo-50' },
          { label: 'National Rank', value: '#1', icon: <Award size={16} />, bg: 'bg-purple-50' },
          { label: 'Outstanding Fees', value: 'K24k', icon: <Wallet size={16} />, bg: 'bg-orange-50' },
          { label: 'Sport Participation', value: '72%', icon: <Zap size={16} />, bg: 'bg-cyan-50' },
        ] : viewMode === 'TEACHERS' ? [
          { label: 'Faculty Count', value: '82', icon: <GraduationCap size={16} />, bg: 'bg-purple-50' },
          { label: 'Avg Efficiency', value: '91%', icon: <Activity size={16} />, bg: 'bg-indigo-50' },
          { label: 'Lesson Coverage', value: '88%', icon: <BookOpen size={16} />, bg: 'bg-cyan-50' },
          { label: 'Staff On Leave', value: '3', icon: <UserX size={16} />, bg: 'bg-orange-50' },
          { label: 'Peer Reviews', value: '4.8/5', icon: <UserCheck size={16} />, bg: 'bg-green-50' },
          { label: 'Training Hours', value: '320', icon: <Clock size={16} />, bg: 'bg-blue-50' },
          { label: 'Retention Rate', value: '98%', icon: <ShieldCheck size={16} />, bg: 'bg-rose-50' },
          { label: 'Open Vacancies', value: '2', icon: <AlertCircle size={16} />, bg: 'bg-slate-50' },
        ] : [
          { label: 'Dept Oversight', value: '4/4', icon: <Briefcase size={16} />, bg: 'bg-slate-100' },
          { label: 'Strategic KPIs', value: '92%', icon: <Target size={16} />, bg: 'bg-emerald-50' },
          { label: 'Budget Util.', value: '74%', icon: <Wallet size={16} />, bg: 'bg-orange-50' },
          { label: 'Compliance Rate', value: '99%', icon: <ShieldCheck size={16} />, bg: 'bg-gold/10' },
          { label: 'Curriculum Sync', value: '100%', icon: <Zap size={16} />, bg: 'bg-cyan-50' },
          { label: 'Innovation Index', value: '8.4', icon: <Cpu size={16} />, bg: 'bg-indigo-50' },
          { label: 'Research Output', value: '12', icon: <FileText size={16} />, bg: 'bg-blue-50' },
          { label: 'Inter-Dept Meets', value: '5', icon: <MessageSquare size={16} />, bg: 'bg-rose-50' },
        ]).map((stat, i) => (
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
            <TrendingUp size={24} className="mr-3 text-gold" /> {viewMode === 'STUDENTS' ? 'Academic Growth Trajectory' : viewMode === 'TEACHERS' ? 'Faculty Efficiency Index' : 'Strategic Dept Progress'}
          </h3>
          <div className="h-[300px] bg-white rounded-[2.5rem] p-8 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Line type="monotone" dataKey="revenue" stroke={viewMode === 'TEACHERS' ? '#3B82F6' : '#FFD700'} strokeWidth={4} dot={{r: 6, fill: viewMode === 'TEACHERS' ? '#3B82F6' : '#FFD700', strokeWidth: 2, stroke: '#fff'}} />
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
            ] : viewMode === 'TEACHERS' ? [
              { label: 'License Verification', val: 98, color: 'bg-black' },
              { label: 'Lesson Plan Compliance', val: 91, color: 'bg-gold' },
              { label: 'Faculty Appraisals', val: 65, color: 'bg-blue-500' },
              { label: 'Safety Training', val: 100, color: 'bg-green-500' },
            ] : [
              { label: 'Departmental Budgets', val: 74, color: 'bg-black' },
              { label: 'Syllabus Coverage', val: 88, color: 'bg-gold' },
              { label: 'Resource Procurement', val: 52, color: 'bg-blue-500' },
              { label: 'Cross-Dept Synergy', val: 90, color: 'bg-purple-500' },
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
          <button className="w-full mt-10 py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-gold hover:text-black transition-all">Download Audit Trail</button>
        </div>

        {/* NEW SECTION 3: Performance Distribution */}
        <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <ChartIcon size={24} className="mr-3 text-gold" /> {viewMode === 'STUDENTS' ? 'Academic Enrollment Mix' : viewMode === 'TEACHERS' ? 'Teacher Load Mix' : 'Budgetary Distribution'}
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
             {pieData.map((d, i) => (
               <div key={i} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS_PIE[i]}} />
                  <span className="text-[10px] font-black uppercase text-gray-500">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* NEW SECTION 4: Operational Intelligence */}
        <div className="bg-slate-100 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <Scale size={24} className="mr-3 text-gold" /> Institutional Balance Scorecard
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {(viewMode === 'STUDENTS' ? [
              { label: 'Student Discipline Index', score: '9.2', trend: 'up' },
              { label: 'Engagement Score', score: '8.4', trend: 'up' },
              { label: 'Wellness Compliance', score: '10.0', trend: 'stable' },
            ] : viewMode === 'TEACHERS' ? [
              { label: 'Instructional Quality', score: '9.5', trend: 'up' },
              { label: 'Resource Satisfaction', score: '7.8', trend: 'down' },
              { label: 'Admin Support Feed', score: '8.9', trend: 'up' },
            ] : [
              { label: 'Operational Efficiency', score: '8.7', trend: 'up' },
              { label: 'Inter-Dept Alignment', score: '9.1', trend: 'up' },
              { label: 'Resource Utilization', score: '7.2', trend: 'down' },
            ]).map((score, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl flex items-center justify-between border border-gray-100 shadow-sm">
                <div>
                   <p className="text-[10px] font-black uppercase text-gray-400">{score.label}</p>
                   <p className="text-2xl font-black text-black">{score.score}<span className="text-[12px] text-gray-400 font-bold ml-1">/ 10</span></p>
                </div>
                <div className={`p-2 rounded-xl ${score.trend === 'up' ? 'bg-green-100 text-green-600' : score.trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                  <TrendingUp size={16} className={score.trend === 'down' ? 'rotate-180' : ''} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-gold hover:text-black transition-all">Strategic Review</button>
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

  const renderDashboardByRole = () => {
    switch (user.role) {
      case UserRole.STUDENT:
        return renderStudentDashboard();
      case UserRole.PRINCIPAL:
        return renderPrincipalDashboard();
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
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-100 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Audit Export</button>
          <button className="bg-gold text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 transition-all">Quick Broadcast</button>
        </div>
      </div>

      {renderDashboardByRole()}
    </div>
  );
};

export default MainDashboard;
