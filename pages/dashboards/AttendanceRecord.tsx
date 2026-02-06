import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Calendar, 
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
  ArrowUpRight,
  Layout,
  Users2,
  Trophy
} from 'lucide-react';

interface Props {
  user: User;
}

const AttendanceRecord: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [auditTarget, setAuditTarget] = useState<'TEACHERS' | 'HOD'>('TEACHERS');
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('ME'); // Default to ME for student

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.PATRON;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  const [attendanceState, setAttendanceState] = useState([
    { id: 'S101', name: 'Joshua Kila', status: 'present', lateMinutes: 0 },
    { id: 'S102', name: 'Anna Vele', status: 'late', lateMinutes: 25 },
    { id: 'S103', name: 'Peter Gere', status: 'present', lateMinutes: 0 },
  ]);

  const teacherAttendance = [
    { id: 'T201', name: 'Dr. Michael Chen', status: 'present', load: '18/18', room: 'Lab 1' },
    { id: 'T202', name: 'Ms. Linda Anderson', status: 'absent', load: '12/18', room: 'RM 102' },
  ];

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setAttendanceState(prev => prev.map(s => 
      s.id === studentId ? { ...s, status: newStatus, lateMinutes: newStatus === 'late' ? s.lateMinutes || 5 : 0 } : s
    ));
  };

  const getStatsForHero = () => {
    if (isStudent || viewMode === 'ME') {
      return [
        { label: 'MY PRESENCE', value: '96%', icon: <CheckCircle size={14} className="text-blue-400" /> },
        { label: 'SICK LEAVE', value: '1', icon: <UserMinus size={14} className="text-green-400" /> },
        { label: 'TIMES LATE', value: '2', icon: <Clock size={14} className="text-gold" /> },
        { label: 'TARGET', value: '95%', icon: <Trophy size={14} className="text-purple-400" /> },
      ];
    }
    return [
      { label: 'AVG PRESENCE', value: '94.2%', icon: <CheckCircle size={14} className="text-blue-400" /> },
      { label: 'ABSENTEES', value: '5', icon: <UserMinus size={14} className="text-green-400" /> },
      { label: 'LATES', value: '12', icon: <Clock size={14} className="text-gold" /> },
      { label: 'TARGET', value: '95%', icon: <Trophy size={14} className="text-purple-400" /> },
    ];
  };

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
             {isStudent ? 'Individual Presence Audit' : 'Attendance Registry Oversight'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-5">
          Attendance<br/>
          <span className="text-gold">{isStudent ? 'Log' : 'Registry'}</span>
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
                Registry Export
              </button>
           </div>
        ) : (
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest max-w-md mb-10">
            Institutional presence monitoring and automated registry logs for POMNHS nodes.
          </p>
        )}
        
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {(isStudent ? ['TERM', 'CUMULATIVE'] : ['STUDENTS', 'ME'] as const).map(target => (
            <button 
              key={target}
              onClick={() => isStudent ? null : setViewMode(target as any)}
              className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                (isStudent ? target === 'TERM' : viewMode === target) 
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
        {getStatsForHero().map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrincipalAudit = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {renderInstitutionalHero()}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden mt-10">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
            <ShieldCheck size={24} className="mr-3 text-gold" /> Registry Override Control
          </h3>
          <div className="relative">
            <input type="text" placeholder="Search registry..." className="bg-white border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-gold" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Registry Profile</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Assignment/Room</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(viewMode === 'STUDENTS' ? attendanceState : teacherAttendance).map((entry: any) => (
                <tr key={entry.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{entry.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-sm uppercase text-black">{entry.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">ID: {entry.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-3">
                      {['present', 'absent', 'late'].map((s) => (
                        <button 
                          key={s} 
                          onClick={() => handleStatusChange(entry.id, s)}
                          className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                            entry.status === s 
                              ? (s === 'present' ? 'bg-green-500 text-white shadow-lg' : s === 'absent' ? 'bg-red-500 text-white shadow-lg' : 'bg-orange-500 text-white shadow-lg') 
                              : 'bg-white border border-gray-100 text-gray-400 hover:border-gold hover:text-black'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-xs font-bold text-gray-600 uppercase">
                    {entry.room || 'Grade 12A'}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="text-[10px] font-black uppercase text-gold hover:text-black transition-colors underline underline-offset-4 decoration-gold decoration-2">Edit Audit Log</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
      {(isPrincipal || isTeacher || isHOD) ? renderPrincipalAudit() : isStudent ? renderStudentView() : (
        <div className="space-y-10 py-20 text-center">
          <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Registry View Locked for Non-Administrative Access.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecord;
