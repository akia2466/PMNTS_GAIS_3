import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Clock, 
  CheckCircle, 
  UserX, 
  Search,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  FileText,
  UserMinus,
  Activity,
  Layout,
  Users2,
  Trophy,
  ChevronUp,
  MoreVertical,
  Send,
  Edit2
} from 'lucide-react';

interface Props {
  user: User;
}

const AttendanceRecord: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [viewMode, setViewMode] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  const [targetView, setTargetView] = useState<'STUDENTS' | 'ME'>('STUDENTS');
  const [expandedClass, setExpandedClass] = useState<string | null>('12A');

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.PATRON;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  const [attendanceState, setAttendanceState] = useState([
    { id: 'S101', name: 'JOSHUA KILA', initials: 'J', status: 'present', punc: 'ON TIME', lateMinutes: 0 },
    { id: 'S102', name: 'ANNA VELE', initials: 'A', status: 'late', punc: '25MINS L', lateMinutes: 25 },
    { id: 'S103', name: 'PETER GERE', initials: 'P', status: 'present', punc: 'ON TIME', lateMinutes: 0 },
    { id: 'S104', name: 'SARAH GIMA', initials: 'S', status: 'absent', punc: '--', lateMinutes: 0 },
    { id: 'S105', name: 'SAMUEL KAPU', initials: 'S', status: 'present', punc: 'ON TIME', lateMinutes: 0 },
  ]);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setAttendanceState(prev => prev.map(s => 
      s.id === studentId ? { 
        ...s, 
        status: newStatus, 
        lateMinutes: newStatus === 'late' ? (s.lateMinutes || 5) : 0,
        punc: newStatus === 'present' ? 'ON TIME' : newStatus === 'late' ? `${s.lateMinutes || 5}MINS L` : '--' 
      } : s
    ));
  };

  const handleLateMinutesChange = (studentId: string, mins: string) => {
    const minsNum = parseInt(mins) || 0;
    setAttendanceState(prev => prev.map(s => 
      s.id === studentId ? { 
        ...s, 
        lateMinutes: minsNum,
        punc: `${minsNum}MINS L`
      } : s
    ));
  };

  const getStudentSubjectStats = () => {
    const isTerm = viewMode === 'TERM';
    return [
      { subject: 'MATHEMATICS', percentage: isTerm ? '98%' : '96%', lates: isTerm ? 1 : 4, absence: isTerm ? 0 : 2, color: 'bg-blue-500' },
      { subject: 'SCIENCE', percentage: isTerm ? '92%' : '89%', lates: isTerm ? 3 : 8, absence: isTerm ? 2 : 5, color: 'bg-green-500' },
      { subject: 'ENGLISH', percentage: isTerm ? '95%' : '94%', lates: isTerm ? 2 : 6, absence: isTerm ? 1 : 3, color: 'bg-orange-500' },
      { subject: 'SOCIAL SCIENCE', percentage: isTerm ? '100%' : '98%', lates: isTerm ? 0 : 1, absence: isTerm ? 0 : 1, color: 'bg-purple-500' },
    ];
  };

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      <div className="relative z-10 flex flex-col items-start mb-8 xl:mb-0">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
             {(isStudent || (isTeacher && targetView === 'ME')) ? 'Individual Presence Audit' : 'Attendance Registry Oversight'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-5">
          Attendance<br/>
          <span className="text-gold">{(isStudent || (isTeacher && targetView === 'ME')) ? 'Log' : 'Registry'}</span>
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
             Registry Export
           </button>
        </div>
        
        <div className="flex items-center space-x-3">
          {(!isStudent) && (
            <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
              {['STUDENTS', 'ME'].map(target => (
                <button 
                  key={target}
                  onClick={() => setTargetView(target as any)}
                  className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    targetView === target 
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
        </div>
      </div>

      {isStudent || (isTeacher && targetView === 'ME') ? (
        <div className="relative z-10 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
           <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] w-full min-w-[276px] shadow-2xl transform hover:scale-105 transition-transform border border-white/10">
              <p className="text-white/80 font-black text-[10px] uppercase tracking-widest mb-4">Overall Presence Rate %</p>
              <div className="flex items-end space-x-3 mb-8">
                 <h3 className="text-7xl font-black text-white tracking-tighter leading-none">{viewMode === 'TERM' ? '96%' : '94%'}</h3>
                 <div className="bg-gold/20 px-3 py-1.5 rounded-xl flex items-center space-x-1 mb-1 border border-gold/30">
                    <TrendingUp size={14} className="text-gold" />
                    <span className="text-gold font-black text-xs">+0.8%</span>
                 </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                 <p className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-2">Institutional Target</p>
                 <h4 className="text-4xl font-black text-gold">95%</h4>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
            {getStudentSubjectStats().map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-36 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group">
                <p className="text-gray-400 text-[7px] font-black uppercase tracking-widest leading-tight mb-2 truncate w-full">{stat.subject}</p>
                <h4 className={`text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-3`}>{stat.percentage}</h4>
                <div className="flex items-center justify-center space-x-4 w-full pt-3 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-[6px] text-gray-500 font-black uppercase">Lates</p>
                    <p className="text-[10px] text-orange-400 font-black">{stat.lates}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[6px] text-gray-500 font-black uppercase">Absnt</p>
                    <p className="text-[10px] text-red-400 font-black">{stat.absence}</p>
                  </div>
                </div>
              </div>
            ))}
           </div>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'AVG PRESENCE', value: '94.2%', icon: <CheckCircle size={14} className="text-blue-400" /> },
            { label: 'ABSENTEES', value: '5', icon: <UserMinus size={14} className="text-green-400" /> },
            { label: 'LATES', value: '12', icon: <Clock size={14} className="text-gold" /> },
            { label: 'TARGET', value: '95%', icon: <Trophy size={14} className="text-purple-400" /> },
            { label: 'NODE SYNC', value: '100%', icon: <ShieldCheck size={14} className="text-cyan-400" /> },
            { label: 'CLASSES', value: '5', icon: <Users2 size={14} className="text-orange-400" /> },
            { label: 'SYSTEM AVG', value: '94%', icon: <Activity size={14} className="text-emerald-400" /> },
            { label: 'ACTIVE ALERTS', value: '2', icon: <FileText size={14} className="text-red-400" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group">
               <div className="mb-3 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
               <h4 className="text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</h4>
               <p className="text-gray-500 text-[7px] xl:text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderClassRegistry = (className: string, dailyRate: string, absents: string, session: string) => {
    const isExpanded = expandedClass === className;
    return (
      <div key={className} className="mb-8 animate-in slide-in-from-bottom-2 duration-300">
        <div 
          onClick={() => setExpandedClass(isExpanded ? null : className)}
          className={`p-10 rounded-t-[3.5rem] flex items-center justify-between cursor-pointer transition-all ${isExpanded ? 'bg-black text-white shadow-2xl' : 'bg-white text-black rounded-b-[3.5rem] shadow-sm hover:shadow-md'}`}
        >
          <div className="flex items-center space-x-10">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl shadow-xl ${isExpanded ? 'bg-gold text-black' : 'bg-black text-gold'}`}>
              {className}
            </div>
            <div>
              <h3 className={`text-4xl font-black uppercase tracking-tight ${isExpanded ? 'text-white' : 'text-black'}`}>GRADE {className}</h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isExpanded ? 'text-gold' : 'text-gray-400'}`}>CURRENT SESSION: <span className={isExpanded ? 'text-white' : 'text-black'}>{session.toUpperCase()}</span></p>
            </div>
          </div>
          <div className="flex items-center space-x-12 pr-6">
            <div className="text-center">
              <p className={`text-[9px] font-black uppercase tracking-widest ${isExpanded ? 'text-gray-400' : 'text-gray-400'}`}>DAILY RATE</p>
              <p className="text-2xl font-black">{dailyRate}</p>
            </div>
            <div className="text-center">
              <p className={`text-[9px] font-black uppercase tracking-widest ${isExpanded ? 'text-gray-400' : 'text-gray-400'}`}>ABSENTS</p>
              <p className="text-2xl font-black text-red-500">{absents}</p>
            </div>
            <div className={`p-4 rounded-2xl transition-transform ${isExpanded ? 'bg-zinc-800 text-gold rotate-0' : 'bg-gray-50 text-gray-400 rotate-180'}`}>
              <ChevronUp size={24} />
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="bg-white rounded-b-[3.5rem] shadow-2xl border-x border-b border-gray-100 p-12 animate-in slide-in-from-top duration-500">
            <div className="flex items-center justify-between mb-12">
               <div className="flex items-center space-x-6">
                  <div className="bg-gold/10 px-6 py-2.5 rounded-full border border-gold/20 flex items-center space-x-3">
                     <Clock size={16} className="text-gold" />
                     <span className="text-gold font-black uppercase text-[10px] tracking-widest">SESSION TIMER: 12:45 REMAINING</span>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors">CLEAR ALL</button>
               </div>
               <button className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center space-x-3 hover:bg-gold hover:text-black transition-all">
                  <Send size={16} />
                  <span>SUBMIT GRADE {className} REGISTRY</span>
               </button>
            </div>

            <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-gray-100">
                   <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">STUDENT PROFILE</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">CURRENT STATUS</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">PUNCTUALITY</th>
                   <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right pr-4">SETTINGS</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {attendanceState.map((s) => (
                   <tr key={s.id} className="group hover:bg-gray-50/50 transition-colors">
                     <td className="py-8 pl-4">
                        <div className="flex items-center space-x-6">
                           <div className="w-12 h-12 bg-black text-gold rounded-2xl flex items-center justify-center font-black text-base shadow-lg">
                              {s.initials}
                           </div>
                           <div>
                              <p className="font-black text-sm text-black uppercase tracking-tight">{s.name}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{s.id}</p>
                           </div>
                        </div>
                     </td>
                     <td className="py-8">
                        <div className="flex flex-col items-center justify-center space-y-3">
                           <div className="flex items-center justify-center space-x-3">
                              {['present', 'absent', 'late'].map(st => (
                                <button 
                                   key={st}
                                   onClick={() => handleStatusChange(s.id, st)}
                                   className={`px-5 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                                      s.status === st 
                                      ? (st === 'present' ? 'bg-green-500 text-white shadow-lg' : st === 'absent' ? 'bg-red-500 text-white shadow-lg' : 'bg-orange-500 text-white shadow-lg')
                                      : 'bg-white border border-gray-100 text-gray-300 hover:border-gold hover:text-black'
                                   }`}
                                >
                                   {st}
                                </button>
                              ))}
                           </div>
                           {s.status === 'late' && (
                             <div className="flex items-center space-x-3 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-xl animate-in zoom-in-95 duration-200">
                                <span className="text-[8px] font-black text-orange-400 uppercase">Input Mins:</span>
                                <div className="relative">
                                   <input 
                                     type="number" 
                                     value={s.lateMinutes}
                                     onChange={(e) => handleLateMinutesChange(s.id, e.target.value)}
                                     className="w-12 bg-white border border-orange-100 rounded-lg p-1 text-center text-[10px] font-black text-orange-500 outline-none focus:ring-1 focus:ring-orange-400 shadow-inner"
                                   />
                                   <Edit2 size={10} className="absolute -top-1 -right-1 text-orange-300" />
                                </div>
                                <span className="text-[7px] font-black text-orange-300 uppercase tracking-widest">MIN</span>
                             </div>
                           )}
                        </div>
                     </td>
                     <td className="py-8 text-center">
                        <div className={`flex items-center justify-center space-x-2 text-[9px] font-black uppercase tracking-tight ${s.status === 'absent' ? 'text-red-400' : 'text-green-500'}`}>
                           {s.status === 'absent' ? <UserX size={14} /> : <CheckCircle size={14} />}
                           <span>{s.punc}</span>
                        </div>
                     </td>
                     <td className="py-8 text-right pr-4">
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-300 hover:text-gold transition-colors">
                           <MoreVertical size={16} />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderTeacherView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {renderInstitutionalHero()}
      
      {targetView === 'STUDENTS' ? (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
                <Users2 size={24} className="mr-4 text-gold" /> CLASS-SPECIFIC REGISTRIES
             </h3>
             <div className="flex space-x-3">
                <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gold transition-all shadow-sm"><Activity size={20}/></button>
                <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gold transition-all shadow-sm"><Search size={20}/></button>
             </div>
          </div>
          
          {renderClassRegistry('12A', '94%', '2', 'MORNING LECTURE')}
          {renderClassRegistry('12B', '89%', '4', 'AFTERNOON LAB')}
        </div>
      ) : (
        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between">
             <h3 className="text-2xl font-black text-black uppercase tracking-tighter">My Attendance History</h3>
             <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
               <FileText size={20} />
             </div>
          </div>
          <div className="p-10 text-center text-gray-400 uppercase font-black text-[10px] tracking-widest">
             No personal attendance logs captured for the selected period.
          </div>
        </div>
      )}
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {renderInstitutionalHero()}
      
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
           <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Individual Presence Log</h3>
           <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
             <FileText size={20} />
           </div>
        </div>
        <div className="px-6 pb-12 overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                <th className="px-10 py-2">Date</th>
                <th className="px-10 py-2">Subject</th>
                <th className="px-10 py-2">Status</th>
                <th className="px-10 py-2 text-center">Time In</th>
                <th className="px-10 py-2 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'JAN 23, 2026', subject: 'MATHEMATICS', status: 'PRESENT', time: '7:55 AM', remarks: '' },
                { date: 'JAN 22, 2026', subject: 'SCIENCE', status: 'LATE', time: '8:15 AM', remarks: '15 minutes late' },
                { date: 'JAN 21, 2026', subject: 'ENGLISH', status: 'PRESENT', time: '7:50 AM', remarks: '' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-all group">
                  <td className="px-10 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 first:rounded-l-2xl first:border-l last:rounded-r-2xl last:border-r font-black text-xs text-black">
                    {log.date}
                  </td>
                  <td className="px-10 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 font-black text-[10px] text-gold tracking-widest">
                    {log.subject}
                  </td>
                  <td className="px-10 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20">
                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                      log.status === 'PRESENT' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 text-center font-bold text-xs text-black">
                    {log.time}
                  </td>
                  <td className="px-10 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 text-right font-bold text-[10px] italic text-gray-400 last:rounded-r-2xl">
                    {log.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      {(isPrincipal || (isTeacher && targetView === 'STUDENTS') || isHOD) ? renderTeacherView() : isStudent || (isTeacher && targetView === 'ME') ? renderStudentView() : (
        <div className="space-y-10 py-20 text-center">
          <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Registry View Locked for Non-Administrative Access.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecord;