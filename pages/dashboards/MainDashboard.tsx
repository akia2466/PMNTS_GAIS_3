
import React from 'react';
import { User, UserRole } from '../../types';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  FileText,
  MessageSquare,
  AlertCircle,
  Trophy,
  ChevronRight,
  PieChart as PieIcon,
  // Fix for "Cannot find name 'UserIcon'" and "Cannot find name 'DollarSign'"
  User as UserIcon,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface Props {
  user: User;
}

const MainDashboard: React.FC<Props> = ({ user }) => {
  const attendanceData = [
    { name: 'Present', value: 95, color: '#FFD700' },
    { name: 'Absent', value: 5, color: '#000000' },
  ];

  const renderStudentStats = () => (
    <div className="space-y-8 pb-12">
      {/* 8 Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { label: 'GPA', value: '3.7', icon: <TrendingUp size={16} /> },
          { label: 'Attendance', value: '95%', icon: <Clock size={16} /> },
          { label: 'Class Rank', value: '12/42', icon: <Trophy size={16} /> },
          { label: 'Grade Rank', value: '20/93', icon: <Trophy size={16} /> },
          { label: 'Assignments', value: '5', icon: <CheckCircle size={16} /> },
          { label: 'Tests', value: '3', icon: <AlertCircle size={16} /> },
          { label: 'Messages', value: '8', icon: <MessageSquare size={16} /> },
          { label: 'Courses', value: '8', icon: <BookOpen size={16} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-gold transition-colors text-center flex flex-col items-center group">
            <div className="p-2 bg-gray-50 rounded-xl text-gold mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
            <h3 className="text-xl font-black text-black tracking-tight">{stat.value}</h3>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Row 1: Performance & Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">Performance Summary</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Current Academic Status</p>
            </div>
            <button className="text-gold font-bold text-[10px] uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', grade: 'A-', percentage: '91%' },
              { subject: 'Science', grade: 'B+', percentage: '85%' },
              { subject: 'Literature', grade: 'A', percentage: '92%' },
              { subject: 'Social Science', grade: 'B', percentage: '81%' },
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-gold/5 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{course.grade}</div>
                  <span className="font-bold text-sm uppercase tracking-tight">{course.subject}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-black text-sm tracking-tight">{course.percentage}</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                    <div className="h-full bg-gold" style={{ width: course.percentage }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">Attendance Breakdown</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Year to Date Analysis</p>
            </div>
            <PieIcon className="text-gold" size={20} />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black">95%</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Present</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span className="text-[10px] font-bold uppercase">Present (142 Days)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-black rounded-full" />
              <span className="text-[10px] font-bold uppercase">Absent (8 Days)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Friends & Files */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black text-white p-8 rounded-[2.5rem] border border-[#B8860B] shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black uppercase tracking-tight">Friends & Peers</h3>
            <Users className="text-gold" size={20} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-2xl text-center border border-white/5">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Connections</p>
              <h4 className="text-2xl font-black text-gold">24</h4>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl text-center border border-gold/30">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">New Requests</p>
              <h4 className="text-2xl font-black text-gold">3</h4>
            </div>
          </div>
          <button className="w-full bg-gold text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-all text-xs shadow-lg shadow-gold/20">
            Manage Peer Network
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-black uppercase tracking-tight">My Recent Files</h3>
            <button className="text-gold font-bold text-[10px] uppercase tracking-widest hover:underline">Open Vault</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Algebra Problem Set.pdf', info: '2.4 MB • 20/01/2026' },
              { name: 'Shakespeare Essay.docx', info: '1.8 MB • 18/01/2026' },
              { name: 'Lab Report.pdf', info: '3.2 MB • 15/01/2026' },
            ].map((file, i) => (
              <div key={i} className="flex items-center space-x-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-all">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gold/10 transition-colors">
                  <FileText size={18} className="text-gray-400 group-hover:text-gold" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate uppercase tracking-tight">{file.name}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">{file.info}</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-gold" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Activity Full Width */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8">Recent Institutional Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            { title: 'Assignment submitted: Algebra Problem Set', time: '2 hours ago', icon: <CheckCircle className="text-green-500" /> },
            { title: 'Grade received: Literature Essay - A', time: '1 day ago', icon: <Trophy className="text-gold" /> },
            { title: 'New announcement: Mid-term Exams Schedule', time: '2 days ago', icon: <AlertCircle className="text-blue-500" /> },
            { title: 'Message from Mr. Yawi: titration experiment guidelines', time: '3 days ago', icon: <MessageSquare className="text-purple-500" /> },
          ].map((activity, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
              <div className="p-2 bg-gray-50 rounded-xl mt-1">{activity.icon}</div>
              <div>
                <p className="font-bold text-sm text-gray-800 tracking-tight leading-tight">{activity.title}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdminStats = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '1,240', icon: <Users />, color: 'bg-blue-50 text-blue-600' },
          { label: 'Staff Roster', value: '82', icon: <UserIcon />, color: 'bg-purple-50 text-purple-600' },
          { label: 'Fees Collected', value: 'K1.2M', icon: <DollarSign />, color: 'bg-green-50 text-green-600' },
          { label: 'System Uptime', value: '99.9%', icon: <CheckCircle />, color: 'bg-gold/10 text-gold' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4 group hover:border-gold transition-colors">
            <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-black">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-black uppercase mb-8 tracking-tighter">Enrollment Funnel</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Applied', v: 800 },
                { name: 'Interviewed', v: 600 },
                { name: 'Accepted', v: 400 },
                { name: 'Enrolled', v: 350 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="v" fill="#000000" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-black uppercase mb-6 tracking-tighter">System Control Panel</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gold/10 transition-all group">
              <div className="flex items-center space-x-4">
                <Users size={20} className="text-gray-400 group-hover:text-gold" />
                <span className="font-bold text-sm uppercase tracking-tight">Manage Student Registry</span>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gold" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gold/10 transition-all group">
              <div className="flex items-center space-x-4">
                <FileText size={20} className="text-gray-400 group-hover:text-gold" />
                <span className="font-bold text-sm uppercase tracking-tight">Institutional Policies</span>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Welcome back, {user.name}</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            {user.role === UserRole.STUDENT ? 'Student Portal' : 'Administrative Console'} &bull; Term 3, 2024
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Download Performance</button>
          <button className="bg-gold text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 transition-all">Quick Action</button>
        </div>
      </div>

      {user.role === UserRole.STUDENT ? renderStudentStats() : renderAdminStats()}
    </div>
  );
};

export default MainDashboard;
