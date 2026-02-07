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

interface Props {
  user: User;
}

const MainDashboard: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<string>('ME'); 
  const [studentPeriod, setStudentPeriod] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

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
  const isHOD = user.role === UserRole.HOD;
  const isAdmin = [UserRole.ADMIN, UserRole.SUPER_USER, UserRole.PRINCIPAL].includes(user.role);
  const isTeacher = [UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(user.role) || isAdmin;
  const isStudent = user.role === UserRole.STUDENT;

  const getSwitcherOptions = () => {
    if (isAdmin) return ['STUDENTS', 'TEACHERS', 'HOD', 'ME'];
    if (isHOD) return ['STUDENTS', 'TEACHERS', 'ME'];
    return ['STUDENTS', 'ME'];
  };

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
      ];
    }
    return [
      { label: 'ENROLLED', value: '1,240', icon: <Users2 size={14} className="text-blue-400" /> },
      { label: 'ATTENDANCE', value: isTerm ? '94.2%' : '92.1%', icon: <Clock size={14} className="text-green-400" /> },
      { label: 'STANDING', value: isTerm ? '89%' : '86%', icon: <Trophy size={14} className="text-gold" /> },
      { label: 'U-SYNC', value: '98%', icon: <CheckCircle size={14} className="text-cyan-400" /> },
    ];
  };

  const renderRecentActivity = (bgColor: string) => (
    <div className={`p-8 rounded-[3rem] ${bgColor} border border-transparent shadow-sm mt-8`}>
      <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
        <History size={20} className="mr-3 text-gold" /> Recent Activity
      </h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white rounded-[1.5rem] shadow-sm">
            <div className="shrink-0">{activity.icon}</div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-gray-800 leading-snug">{activity.text}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalizedSections = () => (
    <div className="bg-amber-50 p-8 rounded-[3rem] border border-transparent shadow-sm mt-8">
      <h3 className="text-xl font-black text-black uppercase tracking-tight mb-8 flex items-center">
        <HardDrive size={20} className="mr-3 text-gold" /> System Status
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Registry Sync</p>
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-green-500" />
            <p className="text-sm font-black text-black uppercase">Database Healthy</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Portal Load</p>
          <div className="flex items-center space-x-2">
            <Activity size={16} className="text-blue-500" />
            <p className="text-sm font-black text-black uppercase">Minimal Latency</p>
          </div>
        </div>
      </div>
    </div>
  );

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
        
        <div className="flex flex-col space-y-4">
          {!isStudent && (
            <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
              {getSwitcherOptions().map(target => (
                <button 
                  key={target}
                  onClick={() => setViewMode(target)}
                  className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
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

          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
            {['TERM', 'CUMULATIVE'].map(target => (
              <button 
                key={target}
                onClick={() => setStudentPeriod(target as any)}
                className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
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

      <div className={`relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 xl:gap-6`}>
        {getStatsForHero().map((stat, i) => (
          <div key={i} className={`bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group shadow-lg`}>
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
    <div className="pb-12">
      {renderDashboardByRole()}
    </div>
  );
};

export default MainDashboard;