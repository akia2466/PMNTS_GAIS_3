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
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('STUDENTS');
  const [timePeriod, setTimePeriod] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  const [drilldownClassId, setDrilldownClassId] = useState<string | null>(null);
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;
  const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.PATRON;

  const departments = ['MATHEMATICS', 'SCIENCE', 'SOCIAL SCIENCE', 'ENGLISH'];
  const years = ['2026', '2025', '2024'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

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
      },
      {
        subject: 'ENGLISH',
        initial: 'E',
        color: 'bg-orange-500',
        avg: isTerm ? '88%' : '86%',
        students: 41,
        bg: 'bg-orange-50/30',
        assessments: [
          { name: 'LITERATURE ESSAY', date: 'JAN 20', score: '88/100', rate: '88%', grade: 'A-' },
          { name: 'VOCABULARY TEST', date: 'JAN 14', score: '19/20', rate: '95%', grade: 'A' },
        ]
      },
      {
        subject: 'SOCIAL SCIENCE',
        initial: 'SS',
        color: 'bg-purple-500',
        avg: isTerm ? '92%' : '90%',
        students: 40,
        bg: 'bg-purple-50/30',
        assessments: [
          { name: 'HISTORY PROJECT', date: 'JAN 22', score: '94/100', rate: '94%', grade: 'A' },
          { name: 'GEOGRAPHY QUIZ', date: 'JAN 11', score: '18/20', rate: '90%', grade: 'A' },
        ]
      }
    ];
  };

  const renderDetailedTranscript = () => (
    <div className="mt-8 space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Academic Transcript</h3>
        <div className="h-1 flex-grow mx-8 bg-gray-100 rounded-full" />
      </div>

      {getTranscriptData().map((data, idx) => (
        <div key={idx} className={`${data.bg} p-10 rounded-[3rem] border border-white shadow-sm`}>
          <div className="flex items-center space-x-6 mb-10">
            <div className={`w-16 h-16 ${data.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
              {data.initial}
            </div>
            <div>
              <h4 className="text-3xl font-black text-black uppercase tracking-tight">{data.subject}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest mt-1">
                <span className="text-gray-400">Current Avg: </span>
                <span className="text-gold">{data.avg}</span>
                <span className="text-gray-300 mx-3">•</span>
                <span className="text-gold">{data.students} Students</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-black/5">
                  <th className="px-6 py-4">Unit / Assignment</th>
                  <th className="px-6 py-4">Date Issued</th>
                  <th className="px-6 py-4">Your Score</th>
                  <th className="px-6 py-4">Success Rate</th>
                  <th className="px-6 py-4 text-right">Mean Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {data.assessments.map((asm, i) => (
                  <tr key={i} className="group hover:bg-white/40 transition-colors">
                    <td className="px-6 py-6 font-black text-xs text-black uppercase tracking-tight">{asm.name}</td>
                    <td className="px-6 py-6 font-bold text-xs text-gray-400 uppercase tracking-widest">{asm.date}</td>
                    <td className="px-6 py-6 font-black text-sm text-black">{asm.score}</td>
                    <td className="px-6 py-6 font-black text-sm text-gold">{asm.rate}</td>
                    <td className="px-6 py-6 text-right">
                      <span className="inline-flex items-center justify-center w-10 h-8 bg-black text-white text-[10px] font-black rounded-lg shadow-md uppercase">
                        {asm.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
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
        <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
           
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
              
              <div className="flex items-center space-x-3">
                <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
                  {['STUDENTS', 'ME'].map(target => (
                    <button 
                      key={target}
                      onClick={() => setViewMode(target as any)}
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
                <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
                  {['TERM', 'CUMULATIVE'].map(target => (
                    <button 
                      key={target}
                      onClick={() => setTimePeriod(target as any)}
                      className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
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
          <div className="space-y-10 mt-10">
            <p className="text-center text-gray-400 uppercase font-black text-[11px] tracking-widest">Administrative Detailed View Inactive</p>
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
      <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
        
        <div className="relative z-10 flex flex-col items-start mb-8 xl:mb-0">
          <div className="flex items-center space-x-3 mb-5">
             <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
                <Layout size={20} />
             </div>
             <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">My Academic Performance</p>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            STUDENT<br/>
            <span className="text-gold">ANALYTICS</span>
          </h2>

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
                EXPORT TRANSCRIPT
              </button>
           </div>
          
          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
            {['TERM', 'CUMULATIVE'].map(target => (
              <button 
                key={target}
                onClick={() => setTimePeriod(target as any)}
                className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
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

        <div className="relative z-10 flex flex-col items-center justify-center px-4">
           <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] w-full min-w-[276px] shadow-2xl transform hover:scale-105 transition-transform border border-white/10">
              <p className="text-white/80 font-black text-[10px] uppercase tracking-widest mb-4">Your Overall Average %</p>
              <div className="flex items-end space-x-3 mb-8">
                 <h3 className="text-7xl font-black text-white tracking-tighter leading-none">{timePeriod === 'TERM' ? '89%' : '87%'}</h3>
                 <div className="bg-gold/20 px-3 py-1.5 rounded-xl flex items-center space-x-1 mb-1 border border-gold/30">
                    <TrendingUp size={14} className="text-gold" />
                    <span className="text-gold font-black text-xs">+1.2%</span>
                 </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                 <p className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-2">Your Overall GPA</p>
                 <h4 className="text-4xl font-black text-gold">{timePeriod === 'TERM' ? '3.4' : '3.3'}</h4>
              </div>
           </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {getTranscriptData().map((stat, i) => (
            <div 
              key={i} 
              className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group"
            >
              <p className="text-gray-400 text-[7px] font-black uppercase tracking-widest leading-tight mb-3 truncate w-full">{stat.subject}</p>
              
              <div className="flex items-center space-x-3 w-full justify-center">
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                  {stat.initial}
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <h4 className="text-xl font-black text-white tracking-tighter leading-none mb-0.5">{stat.avg}</h4>
                  <p className="text-[7px] text-gray-500 font-bold uppercase tracking-tight truncate w-full">{stat.students} STUDENTS</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderDetailedTranscript()}
    </div>
  );

  return (
    <div className="pb-12">
      {isStudent ? renderStudentView() : (isPrincipal || isTeacher || isHOD) ? renderPrincipalPerformanceHub() : (
        <div className="space-y-8 animate-in fade-in duration-500 text-center py-20">
           <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Academic Records Locked by Institutional Protocol.</p>
        </div>
      )}
    </div>
  );
};

export default Performance;