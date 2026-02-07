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
  Activity,
  Briefcase,
  UserCheck,
  Target,
  Users2,
  Layout,
  ChevronDown,
  BarChart as ChartIcon,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Save,
  Zap,
  Star,
  HardDrive
} from 'lucide-react';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis
} from 'recharts';

interface Props {
  user: User;
}

const MainDashboard: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('ME'); 
  const [studentPeriod, setStudentPeriod] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  // Mock data for student assessments (editable by teacher)
  const [studentAssessments, setStudentAssessments] = useState<Record<string, any>>({
    'S101': [
      { id: 1, name: 'CALCULUS MOCK', score: 82, max: 100, date: 'JAN 15' },
      { id: 2, name: 'ALGEBRA QUIZ', score: 18, max: 20, date: 'JAN 10' }
    ],
    'S102': [
      { id: 3, name: 'CALCULUS MOCK', score: 75, max: 100, date: 'JAN 15' },
      { id: 4, name: 'ALGEBRA QUIZ', score: 15, max: 20, date: 'JAN 10' }
    ]
  });

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.PATRON || user.role === UserRole.HOD;
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

  const handleScoreChange = (studentId: string, assessmentId: number, newScore: string) => {
    const scoreNum = parseInt(newScore) || 0;
    setStudentAssessments(prev => ({
      ...prev,
      [studentId]: prev[studentId].map((asm: any) => asm.id === assessmentId ? { ...asm, score: scoreNum } : asm)
    }));
  };

  const getStatsForHero = () => {
    const isTerm = studentPeriod === 'TERM';
    if (isStudent) {
      return [
        { label: 'MY GPA', value: isTerm ? '3.72' : '3.65', icon: <Target size={14} className="text-blue-400" /> },
        { label: 'ATTENDANCE', value: isTerm ? '96%' : '94%', icon: <UserCheck size={14} className="text-green-400" /> },
        { label: 'CLASS RANK', value: isTerm ? '12/42' : '15/42', icon: <Users2 size={14} className="text-gold" /> },
        { label: 'GRADE RANK', value: isTerm ? '20/93' : '28/93', icon: <Trophy size={14} className="text-purple-400" /> },
        { label: 'PENDING ASGN', value: isTerm ? '4' : '6', icon: <Briefcase size={14} className="text-orange-400" /> },
        { label: 'PENDING TESTS', value: isTerm ? '2' : '3', icon: <FileText size={14} className="text-red-400" /> },
        { label: 'NEW MSGS', value: '12', icon: <MessageSquare size={14} className="text-cyan-400" /> },
        { label: 'NEW POSTS', value: '8', icon: <Layout size={14} className="text-emerald-400" /> },
      ];
    }
    if (isTeacher) {
      return [
        { label: 'CLASSES', value: '5', icon: <Users2 size={14} className="text-blue-400" /> },
        { label: 'LOAD', value: '18/wk', icon: <Clock size={14} className="text-green-400" /> },
        { label: 'AVG GPA', value: isTerm ? '3.4' : '3.2', icon: <ChartIcon size={14} className="text-gold" /> },
        { label: 'PENDING', value: isTerm ? '12' : '45', icon: <FileText size={14} className="text-purple-400" /> },
        { label: 'RECEIVED', value: '312', icon: <Zap size={14} className="text-orange-400" /> },
        { label: 'SYNC RATE', value: '100%', icon: <ShieldCheck size={14} className="text-emerald-400" /> },
        { label: 'NEW MSGS', value: '28', icon: <MessageSquare size={14} className="text-cyan-400" /> },
        { label: 'ALERTS', value: '2', icon: <AlertCircle size={14} className="text-red-400" /> },
      ];
    }
    return [
      { label: 'ENROLLED', value: '1,240', icon: <Users2 size={14} className="text-blue-400" /> },
      { label: 'ATTENDANCE', value: isTerm ? '94.2%' : '92.1%', icon: <Clock size={14} className="text-green-400" /> },
      { label: 'STANDING', value: isTerm ? '89%' : '86%', icon: <Trophy size={14} className="text-gold" /> },
      { label: 'ALERTS', value: isTerm ? '5' : '18', icon: <AlertCircle size={14} className="text-red-400" /> },
      { label: 'FACULTY', value: '82', icon: <Users2 size={14} className="text-purple-400" /> },
      { label: 'BUDGET', value: '94%', icon: <Target size={14} className="text-emerald-400" /> },
      { label: 'REVENUE', value: '1.2M', icon: <Zap size={14} className="text-orange-400" /> },
      { label: 'U-SYNC', value: '98%', icon: <CheckCircle size={14} className="text-cyan-400" /> },
    ];
  };

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      <div className="relative z-10 flex flex-col items-start mb-8 xl:mb-0 xl:max-w-xl">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
             {isPrincipal ? 'Institutional Performance Hub' : 'My Academic Dashboard'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-5">
          {isPrincipal ? 'Institutional' : 'Personal'}<br/>
          <span className="text-gold">Analytics</span>
        </h2>

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
        </div>
        
        <div className="flex items-center space-x-3">
          {(!isStudent) && (
            <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
              {['STUDENTS', 'ME'].map(target => (
                <button 
                  key={target}
                  onClick={() => setViewMode(target as any)}
                  className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    viewMode === target 
                      ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {target}
                </button>
              ))}
            </div>
          )}

          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
            {['TERM', 'CUMULATIVE'].map(target => (
              <button 
                key={target}
                onClick={() => setStudentPeriod(target as any)}
                className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  studentPeriod === target 
                    ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {target}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6`}>
        {getStatsForHero().map((stat, i) => (
          <div key={i} className={`bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group`}>
             <div className="mb-3 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{(stat as any).icon}</div>
             <h4 className="text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</h4>
             <p className="text-gray-500 text-[7px] xl:text-[8px] font-black uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRegistry = () => {
    const students = [
      { id: 'S101', name: 'JOSHUA KILA', avg: '91%' },
      { id: 'S102', name: 'ANNA VELE', avg: '84%' },
      { id: 'S103', name: 'PETER GERE', avg: '88%' }
    ];

    return (
      <section className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
           <h3 className="text-2xl font-black text-black uppercase tracking-tighter">GRADE 12A Student Registry</h3>
           <div className="flex items-center space-x-2 text-gold font-black uppercase text-[10px] tracking-widest">
              <Star size={14} fill="currentColor" />
              <span>ACTIVE SESSION MONITOR</span>
           </div>
        </div>
        <div className="p-8 space-y-4">
           {students.map(s => (
             <div key={s.id} className="border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 group">
                <div 
                  onClick={() => setExpandedStudentId(expandedStudentId === s.id ? null : s.id)}
                  className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${expandedStudentId === s.id ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                >
                   <div className="flex items-center space-x-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-lg ${expandedStudentId === s.id ? 'bg-gold text-black' : 'bg-black text-gold'}`}>
                         {s.name.charAt(0)}
                      </div>
                      <div>
                         <p className="font-black text-sm uppercase tracking-tight">{s.name}</p>
                         <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${expandedStudentId === s.id ? 'text-gray-400' : 'text-gray-400'}`}>Node ID: {s.id}</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-8">
                      <div className="text-right">
                         <p className={`text-[8px] font-black uppercase ${expandedStudentId === s.id ? 'text-gray-500' : 'text-gray-400'}`}>Term Average</p>
                         <p className={`text-xl font-black ${expandedStudentId === s.id ? 'text-gold' : 'text-black'}`}>{s.avg}</p>
                      </div>
                      <ChevronDown size={20} className={`transition-transform duration-500 ${expandedStudentId === s.id ? 'rotate-180 text-gold' : 'text-gray-300'}`} />
                   </div>
                </div>
                {expandedStudentId === s.id && (
                  <div className="p-10 bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top duration-500">
                     <p className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">Active Assessment Registry Node</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(studentAssessments[s.id] || []).map((asm: any) => (
                           <div key={asm.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                              <div>
                                 <h4 className="font-black text-xs uppercase text-black mb-1">{asm.name}</h4>
                                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{asm.date}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                 <div className="relative">
                                    <input 
                                      type="number" 
                                      value={asm.score}
                                      onChange={(e) => handleScoreChange(s.id, asm.id, e.target.value)}
                                      className="w-16 bg-gray-50 border border-gray-100 rounded-lg p-2 text-center text-sm font-black text-black outline-none focus:ring-1 focus:ring-gold"
                                    />
                                    <Edit2 size={10} className="absolute -top-1 -right-1 text-gold" />
                                 </div>
                                 <span className="text-gray-300 font-black">/</span>
                                 <span className="text-xs font-black text-gray-400">{asm.max}</span>
                                 <button className="p-2.5 bg-black text-gold rounded-xl shadow-lg hover:scale-110 transition-transform">
                                    <Save size={14}/>
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                )}
             </div>
           ))}
        </div>
      </section>
    );
  };

  const renderPersonalizedSections = () => {
    if (isTeacher) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-orange-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <History size={20} className="mr-3 text-gold" /> Recent Faculty Communications
            </h3>
            <div className="space-y-4">
              {[
                { title: 'New Science Lab Protocols', sender: 'Dept Head', time: '2h ago', urgent: true },
                { title: 'Mid-Term Grading Window', sender: 'Registry', time: '5h ago', urgent: false },
              ].map((msg, i) => (
                <div key={i} className="p-5 bg-white rounded-3xl shadow-sm flex items-center justify-between border border-transparent hover:border-gold transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${msg.urgent ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
                    <div>
                      <p className="text-xs font-black text-black uppercase tracking-tight">{msg.title}</p>
                      <p className="text-[8px] font-black text-gray-400 uppercase mt-1">From: {msg.sender} &bull; {msg.time}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-purple-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <Star size={20} className="mr-3 text-gold" /> Instructional Milestones
            </h3>
            <div className="space-y-4">
              {[
                { unit: 'Calculus Unit 4', progress: 85, color: 'bg-gold' },
                { unit: 'Physics Wave Theory', progress: 62, color: 'bg-blue-500' },
              ].map((m, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl shadow-sm">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase text-black">{m.unit}</span>
                      <span className="text-[9px] font-black text-gray-400">{m.progress}% Completed</span>
                   </div>
                   <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} transition-all duration-1000`} style={{ width: `${m.progress}%` }} />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (isStudent) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-amber-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <Zap size={20} className="mr-3 text-gold" /> Extracurricular Credits
            </h3>
            <div className="space-y-4">
              {[
                { activity: 'Math Olympiad Prep', points: 45, level: 'Advanced' },
                { activity: 'Community Literacy', points: 30, level: 'Active' },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-sm border border-transparent hover:border-gold transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center"><Star size={16}/></div>
                    <div>
                      <p className="text-xs font-black text-black uppercase">{act.activity}</p>
                      <p className="text-[8px] font-black text-gray-400 uppercase mt-0.5">{act.level}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-black">+{act.points} pts</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-sky-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <HardDrive size={20} className="mr-3 text-gold" /> My Vault Repository Usage
            </h3>
            <div className="space-y-6">
               <div className="bg-white p-6 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-black uppercase text-gray-400">Personal Storage</span>
                     <span className="text-xs font-black text-black">20.9MB / 100MB</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden mb-4">
                     <div className="h-full bg-blue-500" style={{ width: '21%' }} />
                  </div>
                  <div className="flex items-center space-x-4">
                     <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-[8px] font-black uppercase text-gray-400">PDFs (15MB)</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-[8px] font-black uppercase text-gray-400">IMGs (5.9MB)</span>
                     </div>
                  </div>
               </div>
               <button className="w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Optimize Storage Assets</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-zinc-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <Zap size={20} className="mr-3 text-gold" /> Financial Pipeline Audit
          </h3>
          <div className="h-48 bg-white rounded-3xl shadow-sm p-6 flex flex-col justify-center">
             <div className="flex items-end space-x-2 mb-2">
                <span className="text-3xl font-black text-black">K1,240,000</span>
                <span className="text-[10px] font-black text-green-500 uppercase mb-1">+12% vs LY</span>
             </div>
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Institutional Revenue Index</p>
             <div className="mt-6 flex space-x-2">
                <div className="flex-grow h-1.5 bg-gold rounded-full" />
                <div className="flex-grow h-1.5 bg-blue-500 rounded-full" />
                <div className="flex-grow h-1.5 bg-gray-100 rounded-full" />
             </div>
          </div>
        </div>
        <div className="bg-emerald-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
            <Activity size={20} className="mr-3 text-gold" /> System Infrastructure Health
          </h3>
          <div className="space-y-4">
             {[
               { node: 'Core Cloud Registry', health: 100 },
               { node: 'Local Network Node 2', health: 94 },
               { node: 'Attendance Sync Pipeline', health: 100 }
             ].map((n, i) => (
               <div key={i} className="bg-white p-5 rounded-3xl shadow-sm flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-black">{n.node}</span>
                  <div className="flex items-center space-x-2">
                     <span className="text-[10px] font-black text-green-500 uppercase">Operational</span>
                     <CheckCircle size={14} className="text-green-500" />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  };

  // Fixed error: Added missing renderRecentActivity function
  const renderRecentActivity = (bgColor: string) => (
    <div className={`${bgColor} p-8 rounded-[3rem] border border-transparent shadow-sm mt-8`}>
      <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
        <Activity size={20} className="mr-3 text-gold" /> Institutional Activity Log
      </h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="p-5 bg-white rounded-3xl shadow-sm flex items-center justify-between border border-transparent hover:border-gold transition-colors group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                {activity.icon}
              </div>
              <div>
                <p className="text-xs font-black text-black uppercase tracking-tight">{activity.text}</p>
                <p className="text-[8px] font-black text-gray-400 uppercase mt-1">{activity.time}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderDashboardByRole = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {renderInstitutionalHero()}
        
        {isTeacher && viewMode === 'STUDENTS' && renderRegistry()}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-indigo-50 p-8 rounded-[3rem] border border-transparent shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
              <TrendingUp size={20} className="mr-3 text-gold" /> Performance Summary
            </h3>
            <div className="space-y-4">
              {(isStudent ? [
                { subject: 'Mathematics', grade: 'A-', percentage: '91%', color: 'bg-blue-500' },
                { subject: 'Science', grade: 'B+', percentage: '85%', color: 'bg-green-500' },
              ] : [
                { subject: 'Grade 12A (Math)', grade: 'B+', percentage: '87%', color: 'bg-blue-500' },
                { subject: 'Grade 12B (Physics)', grade: 'B', percentage: '82%', color: 'bg-purple-500' },
              ]).map((course, i) => (
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
              {(isStudent ? [
                { subject: 'Mathematics', absent: 0, tardy: 1, color: 'text-blue-600' },
                { subject: 'Science', absent: 1, tardy: 2, color: 'text-green-600' },
              ] : [
                { subject: 'Grade 12A', absent: 2, tardy: 5, color: 'text-blue-600' },
                { subject: 'Grade 12B', absent: 4, tardy: 8, color: 'text-purple-600' },
              ]).map((stat, i) => (
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

        {renderPersonalizedSections()}

        {renderRecentActivity('bg-slate-50')}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {renderDashboardByRole()}
    </div>
  );
};

export default MainDashboard;