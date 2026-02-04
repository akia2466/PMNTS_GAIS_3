
import React from 'react';
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
  Calendar,
  History,
  Building2,
  Briefcase,
  Activity,
  Users,
  Wallet,
  Zap,
  ShieldCheck,
  UserX,
  UserCheck
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
  AreaChart,
  Area
} from 'recharts';

interface Props {
  user: User;
}

const MainDashboard: React.FC<Props> = ({ user }) => {
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

  const renderPrincipalDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Enrollment', value: '1,240', icon: <Users size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Academic Standing', value: '#1', icon: <Trophy size={24} />, color: 'text-gold', bg: 'bg-gold/10' },
          { label: 'Staff Count', value: '82', icon: <Briefcase size={24} />, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Operational Health', value: '99.9%', icon: <Activity size={24} />, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-8 rounded-[2.5rem] border border-transparent shadow-sm flex items-center space-x-6 group hover:border-gold transition-all`}>
            <div className={`p-4 bg-white rounded-2xl ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>{stat.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-black tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase mb-8 flex items-center">
              <TrendingUp size={24} className="mr-3 text-gold" /> Enrollment Growth Index
           </h3>
           <div className="h-[350px] bg-white rounded-[2.5rem] p-8 shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[{y:'2021',v:1000},{y:'2022',v:1150},{y:'2023',v:1240}, {y:'2024',v:1310}]}>
                    <Bar dataKey="v" fill="#000" radius={[10, 10, 0, 0]} />
                    <XAxis dataKey="y" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#F8F8F8'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-rose-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase mb-8 flex items-center">
              <ShieldCheck size={24} className="mr-3 text-gold" /> Institutional KPI Status
           </h3>
           <div className="space-y-6">
              {[
                { label: 'National Exam Prep', val: 94, color: 'bg-black' },
                { label: 'Staff Attendance', val: 98, color: 'bg-gold' },
                { label: 'Digital Hub Usage', val: 76, color: 'bg-blue-500' },
                { label: 'Maintenance Audit', val: 88, color: 'bg-purple-500' },
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
      {renderRecentActivity('bg-slate-100')}
    </div>
  );

  const renderBursarDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-10 rounded-[3rem] border border-transparent shadow-sm group hover:border-gold transition-all">
             <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm"><Wallet size={20} /></div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Fee Revenue</p>
             </div>
             <p className="text-5xl font-black text-black tracking-tighter">K3.2M</p>
             <p className="text-[10px] text-green-500 font-bold uppercase mt-2 tracking-widest">+12% Surplus</p>
          </div>
          <div className="bg-gold/10 p-10 rounded-[3rem] border border-transparent shadow-sm group hover:border-gold transition-all">
             <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-white rounded-xl text-gold shadow-sm"><CheckCircle size={20} /></div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Collection Rate</p>
             </div>
             <p className="text-5xl font-black text-gold tracking-tighter">92%</p>
             <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-widest">42 Arrears Flagged</p>
          </div>
          <div className="bg-orange-50 p-10 rounded-[3rem] border border-transparent shadow-sm group hover:border-gold transition-all">
             <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-white rounded-xl text-orange-500 shadow-sm"><Zap size={20} /></div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Budget Status</p>
             </div>
             <p className="text-5xl font-black text-black tracking-tighter">74%</p>
             <p className="text-[10px] text-orange-500 font-bold uppercase mt-2 tracking-widest">Utilization Rate</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-indigo-50 p-10 rounded-[3.5rem] shadow-sm border border-transparent">
             <h3 className="text-xl font-black text-black uppercase mb-8 flex items-center">
               <Activity size={24} className="mr-3 text-gold" /> Institutional Cash Flow
             </h3>
             <div className="h-[350px] bg-white rounded-[2.5rem] p-8 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                      <Line type="monotone" dataKey="revenue" stroke="#FFD700" strokeWidth={5} dot={{r: 6, fill:'#FFD700', strokeWidth: 2, stroke: '#fff'}} />
                      <Line type="monotone" dataKey="expenses" stroke="#000" strokeWidth={5} dot={{r: 6, fill:'#000', strokeWidth: 2, stroke: '#fff'}} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm flex flex-col">
             <h3 className="text-xl font-black text-black uppercase mb-8">Financial Registry</h3>
             <div className="space-y-4 flex-grow">
                {[
                  { label: 'Payroll Processing', status: 'In Progress', color: 'text-orange-500' },
                  { label: 'Vendor Settlements', status: 'Completed', color: 'text-green-500' },
                  { label: 'Infrastructure Grant', status: 'Pending', color: 'text-blue-500' },
                  { label: 'Audit Compliance', status: 'Verified', color: 'text-black' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white rounded-2xl shadow-sm border border-gray-50">
                     <span className="text-[10px] font-black uppercase text-gray-500">{item.label}</span>
                     <span className={`text-[9px] font-black uppercase ${item.color}`}>{item.status}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all">Access General Ledger</button>
          </div>
       </div>
       {renderRecentActivity('bg-slate-100')}
    </div>
  );

  const renderDashboardByRole = () => {
    switch (user.role) {
      case UserRole.STUDENT: return renderStudentDashboard();
      case UserRole.TEACHER: return renderTeacherDashboard();
      case UserRole.PRINCIPAL:
      case UserRole.ADMIN:
      case UserRole.SUPER_USER:
      case UserRole.ADMISSIONS:
      case UserRole.HOD: return renderPrincipalDashboard();
      case UserRole.BURSAR: return renderBursarDashboard();
      default: return renderStudentDashboard();
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
