
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
  ArrowUpRight
} from 'lucide-react';

interface Props {
  user: User;
}

const AttendanceRecord: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [auditTarget, setAuditTarget] = useState<'STUDENTS' | 'TEACHERS' | 'HOD'>('STUDENTS');
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('STUDENTS');

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

  const renderPrincipalAudit = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="bg-black text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden border border-gold/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-bl-[15rem]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
           <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Institutional <span className="text-gold">Presence</span></h2>
              <p className="text-gray-400 max-w-md">Comprehensive attendance audit logs for Students, Teachers, and Department Heads.</p>
           </div>
           {(isPrincipal || isHOD || isTeacher) && (
             <div className="flex bg-white/10 p-2 rounded-2xl backdrop-blur-md mt-8 md:mt-0">
                {isTeacher ? (
                  (['STUDENTS', 'ME'] as const).map(target => (
                    <button 
                      key={target}
                      onClick={() => setViewMode(target)}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-white'}`}
                    >
                      {target}
                    </button>
                  ))
                ) : (
                  (['STUDENTS', 'TEACHERS', 'HOD'] as const).map(target => (
                    <button 
                      key={target}
                      onClick={() => setAuditTarget(target)}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${auditTarget === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-white'}`}
                    >
                      {target}
                    </button>
                  ))
                )}
             </div>
           )}
        </div>
      </div>

      {isTeacher && viewMode === 'ME' ? renderStudentView() : (
        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
            <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
              <ShieldCheck size={24} className="mr-3 text-gold" /> Institutional Override Control
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
                {(isTeacher || auditTarget === 'STUDENTS' ? attendanceState : teacherAttendance).map((entry: any) => (
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
      )}
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Hero Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Overall Presence Card */}
        <div className="bg-black p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between h-64 border border-gold/20">
          <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] relative z-10">Overall Presence</p>
          <div className="flex items-center justify-between relative z-10">
            <h2 className="text-7xl font-black text-white tracking-tighter">96%</h2>
            <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center">
              <CheckCircle className="text-gold" size={24} />
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold opacity-5 rounded-full blur-3xl" />
        </div>

        {/* Days Absent Card */}
        <div className="bg-rose-50 p-10 rounded-[3rem] shadow-sm flex flex-col justify-between h-64 border border-rose-100/50 group hover:border-gold transition-all">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
            <UserMinus size={24} />
          </div>
          <div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Days Absent</p>
            <h3 className="text-6xl font-black text-black tracking-tighter leading-none">2</h3>
          </div>
        </div>

        {/* Times Late Card */}
        <div className="bg-orange-50 p-10 rounded-[3rem] shadow-sm flex flex-col justify-between h-64 border border-orange-100/50 group hover:border-gold transition-all">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Times Late</p>
            <h3 className="text-6xl font-black text-black tracking-tighter leading-none">3</h3>
          </div>
        </div>

        {/* Unchecked Registers Card */}
        <div className="bg-gray-50 p-10 rounded-[3rem] shadow-sm flex flex-col justify-between h-64 border border-gray-100/50 group hover:border-gold transition-all">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Unchecked Registers</p>
            <h3 className="text-6xl font-black text-black tracking-tighter leading-none">0</h3>
          </div>
        </div>
      </div>

      {/* Subject Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { name: 'Mathematics', presence: '98%', lates: 2, color: 'bg-blue-500', lightColor: 'bg-blue-50/50' },
          { name: 'Science', presence: '95%', lates: 5, color: 'bg-green-500', lightColor: 'bg-green-50/50' },
          { name: 'Literature', presence: '96%', lates: 1, color: 'bg-purple-500', lightColor: 'bg-purple-50/50' },
          { name: 'Social Science', presence: '94%', lates: 4, color: 'bg-orange-500', lightColor: 'bg-orange-50/50' },
        ].map((sub, i) => (
          <div key={i} className={`${sub.lightColor} p-8 rounded-[2.5rem] border border-transparent hover:border-gold transition-all group cursor-pointer`}>
            <div className="flex justify-between items-start mb-10">
              <div className={`w-12 h-12 ${sub.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <Activity size={20} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-black tracking-tighter leading-none">{sub.presence}</p>
                <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest mt-1">Presence</p>
              </div>
            </div>
            <h4 className="font-black text-[11px] uppercase tracking-widest text-black mb-10">{sub.name}</h4>
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-400">
              <div className="flex items-center">
                <Clock size={12} className="mr-2 text-orange-400" />
                <span>{sub.lates} Lates</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gold transition-colors" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Individual Log Table */}
      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-12 border-b border-gray-50 flex items-center justify-between">
           <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Individual Log Registry</h3>
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
                { date: 'JAN 21, 2026', subject: 'LITERATURE', status: 'PRESENT', time: '7:50 AM', remarks: '' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-all group">
                  <td className="px-10 py-8 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 first:rounded-l-[2rem] first:border-l last:rounded-r-[2rem] last:border-r font-black text-[13px] text-black">
                    {log.date}
                  </td>
                  <td className="px-10 py-8 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 font-black text-[11px] text-gold tracking-widest">
                    {log.subject}
                  </td>
                  <td className="px-10 py-8 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20">
                    <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      log.status === 'PRESENT' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 text-center font-bold text-[13px] text-black">
                    {log.time}
                  </td>
                  <td className="px-10 py-8 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gold/20 text-right font-bold text-[11px] italic text-gray-400 last:rounded-r-[2rem]">
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter leading-none">Attendance Registry</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Institutional Presence Monitoring & bull; Academic Year 2024
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="relative inline-block">
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm">
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative inline-block">
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm">
              {terms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-xl border border-gray-100 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Audit Export</button>
        </div>
      </div>
      
      {(isPrincipal || isTeacher || isHOD) ? renderPrincipalAudit() : isStudent ? renderStudentView() : (
        <div className="space-y-10 py-20 text-center">
          <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Registry View Locked for Non-Administrative Access.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecord;
