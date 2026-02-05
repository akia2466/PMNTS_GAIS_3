
import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  UserX, 
  ChevronRight,
  Send,
  Plus,
  Users,
  Search,
  Filter,
  FileText,
  Upload,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface Props {
  user: User;
}

const AttendanceRecord: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [auditTarget, setAuditTarget] = useState<'STUDENTS' | 'TEACHERS' | 'HOD'>('STUDENTS');
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isStaff = [UserRole.TEACHER, UserRole.HOD, UserRole.PRINCIPAL, UserRole.ADMIN, UserRole.SUPER_USER, UserRole.VENDOR].includes(user.role);

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
           <div className="flex bg-white/10 p-2 rounded-2xl backdrop-blur-md mt-8 md:mt-0">
              {(['STUDENTS', 'TEACHERS', 'HOD'] as const).map(target => (
                <button 
                  key={target}
                  onClick={() => setAuditTarget(target)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${auditTarget === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-white'}`}
                >
                  {target}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
            <ShieldCheck size={24} className="mr-3 text-gold" /> Institutional Override Control
          </h3>
          <div className="flex space-x-2">
            <div className="relative">
              <input type="text" placeholder="Search registry..." className="bg-white border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-gold" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            </div>
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
              {(auditTarget === 'STUDENTS' ? attendanceState : teacherAttendance).map((entry: any) => (
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

  return (
    <div className="pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Attendance Registry</h2>
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
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Audit Export</button>
        </div>
      </div>
      {isPrincipal ? renderPrincipalAudit() : isStaff ? (
        <div className="space-y-10">
          {/* Fallback to original Teacher/Staff view logic if needed */}
          <h3 className="text-xl font-bold uppercase">Section Registry View</h3>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Fallback to original Student view logic if needed */}
          <h3 className="text-xl font-bold uppercase">Personal Attendance Log</h3>
        </div>
      )}
    </div>
  );
};

export default AttendanceRecord;
