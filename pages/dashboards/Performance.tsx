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
  FileText,
  Star,
  Edit2,
  Save
} from 'lucide-react';

interface Props {
  user: User;
}

interface Assessment {
  name: string;
  date: string;
  score: string;
  rate: string;
  grade: string;
}

interface SubjectTranscript {
  subject: string;
  initial: string;
  color: string;
  avg: string;
  students: number;
  bg: string;
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
  const [viewMode, setViewMode] = useState<string>('STUDENTS');
  const [timePeriod, setTimePeriod] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  const [drilldownClassId, setDrilldownClassId] = useState<string | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;
  const isAdmin = [UserRole.ADMIN, UserRole.SUPER_USER, UserRole.PRINCIPAL].includes(user.role);
  const isTeacher = [UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(user.role) || isAdmin;

  const departments = ['MATHEMATICS', 'SCIENCE', 'SOCIAL SCIENCE', 'ENGLISH'];
  const years = ['2026', '2025', '2024'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  const getSwitcherOptions = () => {
    if (isAdmin) return ['STUDENTS', 'TEACHERS', 'HOD', 'ME'];
    if (isHOD) return ['STUDENTS', 'TEACHERS', 'ME'];
    return ['STUDENTS', 'ME'];
  };

  const [classes] = useState<ClassPerformance[]>([
    { id: 'c1', name: 'GRADE 12A', grade: 'B+', avg: '87%', studentCount: 43, color: 'bg-blue-500', sectionBg: 'bg-blue-50/50', icon: '12A', leadTeacher: 'DR. MICHAEL CHEN' },
    { id: 'c2', name: 'GRADE 12B', grade: 'B', avg: '82%', studentCount: 39, color: 'bg-indigo-500', sectionBg: 'bg-indigo-50/50', icon: '12B', leadTeacher: 'MS. SARAH SMITH' },
  ]);

  const getTranscriptData = (): SubjectTranscript[] => {
    const isTerm = timePeriod === 'TERM';
    return [
      {
        subject: 'MATHEMATICS',
        initial: 'M',
        color: 'bg-blue-500',
        avg: isTerm ? '91%' : '88%',
        students: 43,
        bg: 'bg-blue-50/30',
        assessments: [
          { name: 'MIDTERM EXAM', date: 'JAN 15', score: '92/100', rate: '92%', grade: 'A' },
          { name: 'PROBLEM SET 5', date: 'JAN 10', score: '18/20', rate: '90%', grade: 'A' },
        ]
      },
      {
        subject: 'SCIENCE',
        initial: 'S',
        color: 'bg-green-500',
        avg: isTerm ? '85%' : '82%',
        students: 39,
        bg: 'bg-green-50/30',
        assessments: [
          { name: 'LAB PRACTICAL', date: 'JAN 18', score: '85/100', rate: '85%', grade: 'B+' },
          { name: 'QUIZ 2', date: 'JAN 12', score: '17/20', rate: '85%', grade: 'B+' },
        ]
      }
    ];
  };

  const renderDetailedTranscript = () => (
    <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden mt-10">
      <div className="p-10 border-b border-gray-50 flex items-center justify-between">
         <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Subject Transcripts</h3>
         <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
           <FileText size={20} />
         </div>
      </div>
      <div className="p-8 space-y-6">
        {getTranscriptData().map((subject, idx) => (
          <div key={idx} className={`${subject.bg} p-8 rounded-[3rem] border border-gray-100`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className={`w-14 h-14 ${subject.color} text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg`}>
                  {subject.initial}
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase text-black tracking-tight">{subject.subject}</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Weighted Average: {subject.avg}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subject.assessments.map((asm, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-xs uppercase text-black mb-1">{asm.name}</h5>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{asm.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-black">{asm.score}</p>
                    <p className="text-[9px] font-black text-gold uppercase">{asm.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getStatsForHero = () => {
    if (isStudent) {
      return getTranscriptData().map(stat => ({
        label: `${stat.students} STUDENTS`,
        value: stat.avg,
        title: stat.subject,
        initial: stat.initial,
        color: stat.color
      }));
    }
    return [
      { label: 'SYSTEM GPA', value: '3.42', icon: <Target size={14} className="text-blue-400" /> },
      { label: 'PASS RATE', value: '96.2%', icon: <CheckCircle size={14} className="text-green-400" /> },
      { label: 'ACTIVE HODS', value: '4/4', icon: <Users2 size={14} className="text-gold" /> },
      { label: 'RANK', value: '#1 Nat', icon: <Trophy size={14} className="text-purple-400" /> },
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
             {isStudent ? 'My Academic Performance' : 'Performance Registry Oversight'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          {isStudent ? 'Student' : 'Master'}<br/>
          <span className="text-gold">Analytics</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="relative inline-block group">
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                {years.map(y => <option key={y} value={y} className="bg-black">{y}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
            </div>
            <div className="relative inline-block group">
              <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                {terms.map(t => <option key={t} value={t} className="bg-black">{t.toUpperCase()}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
            </div>
            <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
              {isStudent ? 'EXPORT TRANSCRIPT' : 'AUDIT EXPORT'}
            </button>
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
                onClick={() => setTimePeriod(target as any)}
                className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  timePeriod === target 
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

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
         <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] w-full min-w-[276px] shadow-2xl transform hover:scale-105 transition-transform border border-white/10">
            <p className="text-white/80 font-black text-[10px] uppercase tracking-widest mb-4">
              {isStudent ? 'Your Overall Average %' : 'Institutional Average %'}
            </p>
            <div className="flex items-end space-x-3 mb-8">
               <h3 className="text-7xl font-black text-white tracking-tighter leading-none">
                 {timePeriod === 'TERM' ? (isStudent ? '89%' : '88%') : (isStudent ? '87%' : '86%')}
               </h3>
               <div className="bg-gold/20 px-3 py-1.5 rounded-xl flex items-center space-x-1 mb-1 border border-gold/30">
                  <TrendingUp size={14} className="text-gold" />
                  <span className="text-gold font-black text-xs">+1.2%</span>
               </div>
            </div>
            <div className="pt-6 border-t border-white/10">
               <p className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-2">
                 {isStudent ? 'Your Overall GPA' : 'System Mean GPA'}
               </p>
               <h4 className="text-4xl font-black text-gold">{timePeriod === 'TERM' ? '3.4' : '3.3'}</h4>
            </div>
         </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 xl:gap-6">
        {getStatsForHero().map((stat: any, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group shadow-lg">
             {stat.icon ? (
               <div className="mb-3 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             ) : (
               <div className="flex items-center space-x-3 w-full justify-center mb-3">
                 <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center text-white font-black text-[10px] shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                   {stat.initial}
                 </div>
                 <p className="text-gray-400 text-[6px] font-black uppercase tracking-widest leading-tight truncate">{stat.title}</p>
               </div>
             )}
             <h4 className="text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</h4>
             <p className="text-gray-500 text-[7px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdministrativePerformanceHub = () => {
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
            <table className="w-full text-left mt-6 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-400">Student Profile</th>
                  <th className="px-8 py-4 text-[9px] font-black uppercase text-gray-400 text-right">Current Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((idx) => {
                  const studentId = `S${idx + 100}`;
                  const isExpanded = expandedStudentId === studentId;
                  return (
                    <React.Fragment key={studentId}>
                      <tr 
                        onClick={() => setExpandedStudentId(isExpanded ? null : studentId)}
                        className={`transition-all cursor-pointer group ${isExpanded ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-8 py-6 rounded-l-2xl">
                          <div className="flex items-center space-x-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-md transition-colors ${isExpanded ? 'bg-gold text-black' : 'bg-black text-gold'}`}>
                              S
                            </div>
                            <div>
                               <p className={`font-black text-sm uppercase tracking-tight ${isExpanded ? 'text-white' : 'text-black group-hover:text-gold'}`}>Student Node {studentId}</p>
                               <p className={`text-[8px] font-bold uppercase tracking-widest mt-1 ${isExpanded ? 'text-gray-400' : 'text-gray-400'}`}>Registry ID: {studentId}990429</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 rounded-r-2xl text-right">
                          <div className="flex items-center justify-end space-x-4">
                             <span className={`font-black text-lg ${isExpanded ? 'text-gold' : 'text-black'}`}>88%</span>
                             <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-gold' : 'text-gray-300'}`} />
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={2} className="px-8 py-10 bg-slate-50/50 rounded-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-2 duration-500">
                               <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                                  <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-[10px] font-black uppercase text-gold tracking-widest flex items-center">
                                      <Star size={14} className="mr-2" fill="currentColor"/> ASSESSMENT LOG
                                    </h4>
                                    <span className="text-[8px] font-black text-gray-400 uppercase">Registry Verified</span>
                                  </div>
                                  <div className="space-y-4">
                                     {[
                                       { name: 'Calculus Mock', score: '92/100', status: 'Graded', date: 'Jan 15' },
                                       { name: 'Physics Practical', score: '18/20', status: 'Graded', date: 'Jan 18' },
                                       { name: 'Algebra Quiz 4', score: 'PND', status: 'Pending', date: 'Feb 02' },
                                     ].map((asm, i) => (
                                       <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                                          <div>
                                            <p className="text-xs font-black uppercase text-black">{asm.name}</p>
                                            <p className="text-[8px] font-black text-gray-400 uppercase mt-1">{asm.date}</p>
                                          </div>
                                          <div className="flex items-center space-x-6">
                                             <span className={`text-[8px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${asm.status === 'Graded' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                               {asm.status}
                                             </span>
                                             <span className="text-sm font-black text-black w-12 text-right">{asm.score}</span>
                                          </div>
                                       </div>
                                     ))}
                                  </div>
                               </div>
                               <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-center text-center">
                                  <p className="text-[9px] font-black uppercase text-gray-400 mb-4 tracking-widest">Mastery Progress Index</p>
                                  <div className="flex items-center justify-center space-x-6 mb-8">
                                     <h3 className="text-7xl font-black text-black tracking-tighter leading-none">88%</h3>
                                     <div className="flex flex-col items-center">
                                       <div className="bg-gold text-black w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">A-</div>
                                       <p className="text-[8px] font-black text-gold uppercase mt-2">Rank: #12</p>
                                     </div>
                                  </div>
                                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                                     <div className="h-full bg-gold shadow-[0_0_10px_rgba(255,215,0,0.5)]" style={{ width: '88%' }} />
                                  </div>
                                  <p className="text-[8px] font-black text-gray-400 uppercase">Institutional Benchmark: 75% Mastery</p>
                               </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        {renderInstitutionalHero()}

        {viewMode === 'ME' ? (
          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm p-20 text-center animate-in slide-in-from-bottom-2 duration-500">
            <Target size={48} className="mx-auto text-gold mb-6 opacity-20" />
            <h3 className="text-2xl font-black uppercase tracking-tighter text-black mb-2">Individual Performance Matrix</h3>
            <p className="text-gray-400 uppercase font-black text-[11px] tracking-widest">No individual logs available in administrative leadership mode.</p>
          </div>
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
      {renderInstitutionalHero()}
      {renderDetailedTranscript()}
    </div>
  );

  return (
    <div className="pb-12">
      {isStudent ? renderStudentView() : (isPrincipal || isTeacher || isHOD || isAdmin) ? renderAdministrativePerformanceHub() : (
        <div className="space-y-8 animate-in fade-in duration-500 text-center py-20">
           <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Academic Records Locked by Institutional Protocol.</p>
        </div>
      )}
    </div>
  );
};

export default Performance;