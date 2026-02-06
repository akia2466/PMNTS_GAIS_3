import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  TrendingUp, 
  ArrowLeft, 
  CheckCircle, 
  Target, 
  Users2, 
  Clock, 
  Activity, 
  History, 
  Trophy, 
  UserCheck, 
  ChevronDown,
  Layout,
  FileText
} from 'lucide-react';

interface Props {
  user: User;
}

interface Assessment {
  unit: string;
  date: string;
  score: string;
  rate: string;
  grade: string;
}

interface SubjectTranscript {
  subject: string;
  char: string;
  color: string;
  avg: string;
  students: number;
  assessments: Assessment[];
}

interface ClassPerformance {
  id: string;
  name: string;
  grade: string;
  avg: string;
  studentCount: number;
  color: string;
  sectionBg: string;
  icon: string;
  leadTeacher?: string;
}

const Performance: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDept, setSelectedDept] = useState('MATHEMATICS');
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('STUDENTS');
  const [drilldownClassId, setDrilldownClassId] = useState<string | null>(null);
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;
  const isTeacherOrPatron = user.role === UserRole.TEACHER || user.role === UserRole.PATRON;

  const departments = ['MATHEMATICS', 'NATURAL SCIENCE', 'HUMANITIES', 'FINE ARTS'];
  const years = ['2026', '2025', '2024'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  const [classes] = useState<ClassPerformance[]>([
    { id: 'c1', name: 'GRADE 12A', grade: 'B+', avg: '87%', studentCount: 43, color: 'bg-blue-500', sectionBg: 'bg-blue-50/50', icon: '12A', leadTeacher: 'DR. MICHAEL CHEN' },
    { id: 'c2', name: 'GRADE 12B', grade: 'B', avg: '82%', studentCount: 39, color: 'bg-indigo-500', sectionBg: 'bg-indigo-50/50', icon: '12B', leadTeacher: 'MS. SARAH SMITH' },
  ]);

  const renderRecentActivity = (bgColor: string = "bg-white") => (
    <section className="mt-12 w-full">
      <div className={`${bgColor} p-8 rounded-[2.5rem] border border-gray-100 shadow-sm w-full overflow-hidden`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-black uppercase tracking-tighter flex items-center">
            <History size={18} className="mr-3 text-gold" /> Recent Activity Feed
          </h3>
          <button className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">Audit History</button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl border border-transparent hover:border-gold transition-all group flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-6">
              <div className="p-2.5 bg-gray-50 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <CheckCircle className="text-green-500" size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-800 leading-snug uppercase tracking-tight">Registry sync completed: Term 1 performance data uploaded.</p>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">12 mins ago</p>
              </div>
            </div>
            <Activity size={14} className="text-gray-200 group-hover:text-gold transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );

  const renderTranscriptContent = () => (
    <div className="space-y-10 animate-in fade-in duration-500 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-[2.5rem] border border-transparent shadow-sm">
          <h3 className="text-lg font-black text-black uppercase tracking-tight mb-6 flex items-center">
            <TrendingUp size={18} className="mr-3 text-gold" /> Performance Summary
          </h3>
          <div className="space-y-3">
            {[
              { subject: 'Mathematics', grade: 'A-', percentage: '91%', color: 'bg-blue-500' },
              { subject: 'Science', grade: 'B+', percentage: '85%', color: 'bg-green-500' },
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className={`w-9 h-9 ${course.color} text-white rounded-lg flex items-center justify-center font-black text-[10px]`}>{course.grade}</div>
                  <span className="font-bold text-xs uppercase tracking-tight">{course.subject}</span>
                </div>
                <span className="font-black text-xs tracking-tight">{course.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-transparent shadow-sm">
          <h3 className="text-lg font-black text-black uppercase tracking-tight mb-6 flex items-center">
            <UserCheck size={18} className="mr-3 text-gold" /> Attendance Summary
          </h3>
          <div className="space-y-3">
            {[
              { subject: 'Mathematics', absent: 0, tardy: 1, color: 'text-blue-600' },
              { subject: 'Science', absent: 1, tardy: 2, color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-white rounded-2xl shadow-sm">
                <span className={`font-bold text-xs uppercase tracking-tight ${stat.color}`}>{stat.subject}</span>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-[7px] font-black text-gray-400 uppercase">Absent</p>
                    <p className={`text-xs font-black ${stat.absent > 0 ? 'text-red-500' : 'text-gray-900'}`}>{stat.absent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[7px] font-black text-gray-400 uppercase">Tardy</p>
                    <p className={`text-xs font-black ${stat.tardy > 0 ? 'text-orange-500' : 'text-gray-900'}`}>{stat.tardy}</p>
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

  const renderPrincipalPerformanceHub = () => {
    if (drilldownClassId) {
      const cls = classes.find(c => c.id === drilldownClassId);
      return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="flex items-center space-x-6">
            <button onClick={() => setDrilldownClassId(null)} className="p-2.5 bg-white border rounded-xl hover:bg-gold transition-all shadow-sm"><ArrowLeft size={18}/></button>
            <div>
               <h3 className="text-2xl font-black uppercase tracking-tight leading-none">{cls?.name} Student Registry</h3>
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Lead Instructor: {cls?.leadTeacher}</p>
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8">
            <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest">Institutional Node Audit List</p>
            <table className="w-full text-left mt-6">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-400">Student Profile</th>
                  <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-400">Current Average</th>
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(0).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-all">
                    <td className="px-8 py-5 font-black text-xs uppercase">Student Node {idx + 100}</td>
                    <td className="px-8 py-5 font-black text-gold text-xs">88%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        {/* Master Analytics Hero Card - Placed at top of subpage */}
        <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
           
           {/* Left Content */}
           <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0">
              <div className="flex items-center space-x-3 mb-5">
                 <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
                    <Layout size={20} />
                 </div>
                 <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Performance Registry Oversight</p>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Master<br/>
                <span className="text-gold">Analytics</span>
              </h2>

              {/* Embedded Selectors Area */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                 <div className="relative inline-block group">
                    <select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)} 
                      className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all"
                    >
                      {years.map(y => <option key={y} value={y} className="bg-black">{y}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
                 </div>

                 <div className="relative inline-block group">
                    <select 
                      value={selectedTerm} 
                      onChange={(e) => setSelectedTerm(e.target.value)} 
                      className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all"
                    >
                      {terms.map(t => <option key={t} value={t} className="bg-black">{t.toUpperCase()}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
                 </div>

                 <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
                    Audit Export
                 </button>
              </div>
              
              {/* Toggle Controls */}
              <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
                {(['STUDENTS', 'ME'] as const).map(target => (
                  <button 
                    key={target}
                    onClick={() => setViewMode(target)}
                    className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      viewMode === target 
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
           <div className="relative z-10 grid grid-cols-2 gap-3">
              {[
                { label: 'SYSTEM GPA', value: '3.42', icon: <Target size={14} className="text-blue-400" /> },
                { label: 'PASS RATE', value: '96.2%', icon: <CheckCircle size={14} className="text-green-400" /> },
                { label: 'ACTIVE HODS', value: '4/4', icon: <Users2 size={14} className="text-gold" /> },
                { label: 'RANK', value: '#1 Nat', icon: <Trophy size={14} className="text-purple-400" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group">
                   <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
                   <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
                   <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>

        {viewMode === 'ME' ? (
          renderTranscriptContent()
        ) : (
          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden p-10 mt-10">
            <div className="flex items-center space-x-6 mb-10">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Dept Switcher</h3>
              <div className="flex space-x-2">
                {departments.map(d => (
                  <button 
                    key={d} 
                    onClick={() => setSelectedDept(d)}
                    className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedDept === d ? 'bg-black text-gold shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Viewing <span className="text-gold">{viewMode}</span> Performance Matrix: <span className="text-black">{selectedDept}</span></p>
              {classes.map((cls, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[3rem] border border-gray-100 hover:border-gold hover:shadow-xl transition-all group flex items-center justify-between">
                   <div className="flex items-center space-x-8">
                      <div 
                        onClick={() => setDrilldownClassId(cls.id)}
                        className={`w-16 h-16 ${cls.color} rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                      >
                        {cls.icon}
                      </div>
                      <div>
                        <h4 
                          onClick={() => setDrilldownClassId(cls.id)}
                          className="text-3xl font-black uppercase text-black tracking-tighter leading-none mb-1.5 cursor-pointer hover:text-gold transition-colors"
                        >
                          {cls.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lead: {cls.leadTeacher} &bull; {cls.studentCount} Nodes</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-10">
                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Avg Mastery</p>
                        <p className="text-2xl font-black text-black">{cls.avg}</p>
                      </div>
                      <button 
                        onClick={() => setDrilldownClassId(cls.id)}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-gold transition-all shadow-sm"
                      >
                        <Users2 size={20}/>
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStudentView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Performance Hub</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px] mt-2">Individual Performance Analytics • Term 1 2026</p>
        </div>
      </div>

      <div className="bg-gold p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex-shrink-0">
          <p className="text-black/50 font-black uppercase tracking-widest text-[9px] mb-4">Your Overall Average %</p>
          <div className="flex items-baseline space-x-4">
            <h2 className="text-7xl font-black tracking-tighter leading-none text-black">89%</h2>
            <div className="bg-black/10 px-2.5 py-1 rounded-full flex items-center space-x-1">
              <TrendingUp size={10} className="text-black" />
              <span className="text-[9px] font-black">+1.2%</span>
            </div>
          </div>
          <p className="text-black/50 font-black uppercase tracking-widest text-[9px] mt-8 mb-2">Your Overall GPA</p>
          <h3 className="text-4xl font-black text-black leading-none">3.4</h3>
        </div>
      </div>
      {renderTranscriptContent()}
    </div>
  );

  return (
    <div className="pb-12">
      {isStudent ? renderStudentView() : (isPrincipal || isTeacherOrPatron || isHOD) ? renderPrincipalPerformanceHub() : (
        <div className="space-y-8 animate-in fade-in duration-500 text-center py-20">
           <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Academic Records Locked by Institutional Protocol.</p>
        </div>
      )}
    </div>
  );
};

export default Performance;
