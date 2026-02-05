
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
  ArrowUpRight
} from 'lucide-react';

interface Props {
  user: User;
}

const AttendanceRecord: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [expandedClass, setExpandedClass] = useState<string | null>('Grade 12A');

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  const [attendanceState, setAttendanceState] = useState([
    { id: 'S101', name: 'Joshua Kila', status: 'present', lateMinutes: 0 },
    { id: 'S102', name: 'Anna Vele', status: 'late', lateMinutes: 25 },
    { id: 'S103', name: 'Peter Gere', status: 'present', lateMinutes: 0 },
    { id: 'S104', name: 'Sarah Gima', status: 'absent', lateMinutes: 0 },
    { id: 'S105', name: 'Samuel Kapu', status: 'present', lateMinutes: 0 },
  ]);

  const recentAttendance = [
    { date: 'Jan 23, 2026', subject: 'Mathematics', status: 'Present', timeIn: '7:55 AM', timeOut: '3:10 PM', remarks: '' },
    { date: 'Jan 22, 2026', subject: 'Science', status: 'Late', timeIn: '8:15 AM', timeOut: '3:05 PM', remarks: '15 minutes late' },
    { date: 'Jan 21, 2026', subject: 'Literature', status: 'Present', timeIn: '7:50 AM', timeOut: '3:00 PM', remarks: '' },
    { date: 'Jan 20, 2026', subject: 'Social Science', status: 'Absent', timeIn: '--', timeOut: '--', remarks: 'Medical leave' },
    { date: 'Jan 19, 2026', subject: 'Mathematics', status: 'Present', timeIn: '7:58 AM', timeOut: '3:12 PM', remarks: '' },
  ];

  const subjectAttendance = [
    { name: 'Mathematics', rate: 98, tardy: 2, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { name: 'Science', rate: 95, tardy: 5, color: 'bg-green-500', bg: 'bg-green-50' },
    { name: 'Literature', rate: 96, tardy: 1, color: 'bg-purple-500', bg: 'bg-purple-50' },
    { name: 'Social Science', rate: 94, tardy: 4, color: 'bg-orange-500', bg: 'bg-orange-50' },
  ];

  const classAttendance = [
    { name: 'Grade 12A', rate: 94, tardy: 6, absents: 2, session: 'Morning Lecture' },
    { name: 'Grade 12B', rate: 89, tardy: 11, absents: 4, session: 'Afternoon Lab' },
    { name: 'Grade 11C', rate: 97, tardy: 3, absents: 1, session: 'Review Session' },
    { name: 'Grade 11D', rate: 91, tardy: 9, absents: 3, session: 'Tutorial' },
  ];

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setAttendanceState(prev => prev.map(s => 
      s.id === studentId ? { ...s, status: newStatus, lateMinutes: newStatus === 'late' ? s.lateMinutes || 5 : 0 } : s
    ));
  };

  const handleLateMinutesChange = (studentId: string, minutes: number) => {
    setAttendanceState(prev => prev.map(s => 
      s.id === studentId ? { ...s, lateMinutes: minutes } : s
    ));
  };

  const renderAttendanceData = (data: any[]) => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl border border-[#B8860B] flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gold transition-colors relative z-10">
            {user.role === UserRole.TEACHER ? 'Global Teaching Presence' : 'Overall Presence'}
          </h3>
          <div className="mt-8 flex items-end justify-between relative z-10">
            <span className="text-7xl font-black tracking-tighter">{user.role === UserRole.TEACHER ? '92%' : '96%'}</span>
            <CheckCircle className="text-gold mb-2" size={40} />
          </div>
        </div>
        {[
          { label: user.role === UserRole.TEACHER ? 'Total Absences' : 'Days Absent', value: user.role === UserRole.TEACHER ? '12' : '2', icon: <UserX />, color: 'text-red-500', bg: 'bg-red-50' },
          { label: user.role === UserRole.TEACHER ? 'Total Late' : 'Times Late', value: user.role === UserRole.TEACHER ? '18' : '3', icon: <Clock />, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Unchecked Registers', value: user.role === UserRole.TEACHER ? '1' : '0', icon: <Activity />, color: 'text-gold', bg: 'bg-gold/10' },
        ].map((m, i) => (
          <div key={i} className={`${m.bg} p-10 rounded-[3rem] border-2 border-transparent shadow-sm flex flex-col justify-between group hover:border-gold transition-all hover:shadow-xl`}>
            <div className={`p-4 bg-white rounded-2xl w-fit mb-6 ${m.color} group-hover:scale-110 transition-transform shadow-sm`}>{m.icon}</div>
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{m.label}</p>
              <h4 className="text-4xl font-black text-black tracking-tighter">{m.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {user.role === UserRole.TEACHER ? (
        <section className="space-y-12">
           <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
                <Users size={24} className="mr-3 text-gold" /> Class-Specific Registries
              </h3>
              <div className="flex space-x-2">
                 <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors shadow-sm"><Filter size={18}/></button>
                 <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors shadow-sm"><Search size={18}/></button>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-12">
             {classAttendance.map((cls, idx) => {
               const isExpanded = expandedClass === cls.name;
               return (
                 <div key={idx} className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    <div 
                      className={`p-10 flex flex-col md:flex-row items-center justify-between cursor-pointer transition-colors ${isExpanded ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                      onClick={() => setExpandedClass(isExpanded ? null : cls.name)}
                    >
                       <div className="flex items-center space-x-8">
                          <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center font-black text-2xl shadow-xl transition-all ${isExpanded ? 'bg-gold text-black scale-110' : 'bg-black text-gold'}`}>
                            {cls.name.split(' ')[1]}
                          </div>
                          <div>
                             <h4 className={`text-3xl font-black uppercase tracking-tighter ${isExpanded ? 'text-white' : 'text-black'}`}>{cls.name}</h4>
                             <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${isExpanded ? 'text-gray-400' : 'text-gray-400'}`}>
                               Current Session: <span className="text-gold font-black">{cls.session}</span>
                             </p>
                          </div>
                       </div>

                       <div className="flex items-center space-x-12 mt-8 md:mt-0">
                          <div className="text-center">
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Daily Rate</p>
                             <p className="text-2xl font-black tracking-tighter">{cls.rate}%</p>
                          </div>
                          <div className="text-center">
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Absents</p>
                             <p className="text-2xl font-black text-red-500 tracking-tighter">{cls.absents}</p>
                          </div>
                          <div className="p-4 bg-white/10 rounded-2xl hover:bg-gold hover:text-black transition-all">
                             {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                          </div>
                       </div>
                    </div>

                    {isExpanded && (
                      <div className="p-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center space-x-4">
                               <div className="bg-gold/10 px-6 py-2 rounded-xl text-gold font-black text-[10px] uppercase tracking-widest border border-gold/20 flex items-center">
                                  <Clock size={14} className="mr-2" /> Session Timer: 12:45 remaining
                               </div>
                               <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors">Clear All</button>
                            </div>
                            <button className="bg-black text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center hover:bg-gold hover:text-black transition-all group">
                               <Send size={16} className="mr-3 group-hover:translate-x-1 transition-transform" />
                               Submit {cls.name} Registry
                            </button>
                         </div>

                         <div className="bg-gray-50/50 rounded-[3rem] border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                               <thead>
                                  <tr className="bg-white border-b border-gray-100">
                                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Profile</th>
                                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status</th>
                                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Punctuality</th>
                                     <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Settings</th>
                                  </tr>
                               </thead>
                               <tbody className="divide-y divide-gray-100">
                                  {attendanceState.map((s, i) => (
                                    <tr key={i} className="hover:bg-white transition-all group">
                                       <td className="px-10 py-6">
                                          <div className="flex items-center space-x-4">
                                             <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs group-hover:scale-110 transition-transform">{s.name.charAt(0)}</div>
                                             <div>
                                                <p className="font-black text-sm uppercase text-black">{s.name}</p>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{s.id}</p>
                                             </div>
                                          </div>
                                       </td>
                                       <td className="px-10 py-6">
                                          <div className="flex items-center space-x-3">
                                             {['present', 'absent', 'late'].map((status) => (
                                               <button 
                                                 key={status} 
                                                 onClick={() => handleStatusChange(s.id, status)}
                                                 className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                                                   s.status === status 
                                                     ? (status === 'present' ? 'bg-green-500 text-white shadow-lg' : status === 'absent' ? 'bg-red-500 text-white shadow-lg' : 'bg-orange-500 text-white shadow-lg') 
                                                     : 'bg-white border border-gray-100 text-gray-400 hover:border-gold hover:text-black'
                                                 }`}
                                               >
                                                 {status}
                                               </button>
                                             ))}
                                             {s.status === 'late' && (
                                               <div className="flex items-center bg-white border border-orange-200 rounded-lg px-2 animate-in fade-in zoom-in-95 duration-200">
                                                 <input 
                                                   type="number"
                                                   value={s.lateMinutes}
                                                   onChange={(e) => handleLateMinutesChange(s.id, parseInt(e.target.value) || 0)}
                                                   className="w-12 text-[10px] font-black text-orange-600 outline-none p-1"
                                                   placeholder="Min"
                                                 />
                                                 <span className="text-[8px] font-black text-orange-400 uppercase">Min</span>
                                               </div>
                                             )}
                                          </div>
                                       </td>
                                       <td className="px-10 py-6">
                                          <span className="text-[10px] font-black uppercase text-gray-400 flex items-center">
                                             {s.status === 'present' ? (
                                               <>
                                                 <CheckCircle size={12} className="mr-2 text-green-500" /> On Time
                                               </>
                                             ) : s.status === 'late' ? (
                                               <>
                                                 <Clock size={12} className="mr-2 text-orange-500" /> {s.lateMinutes}mins L
                                               </>
                                             ) : (
                                               <>
                                                 <UserX size={12} className="mr-2 text-red-500" /> --
                                               </>
                                             )}
                                          </span>
                                       </td>
                                       <td className="px-10 py-6 text-right">
                                          <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-300 hover:text-black transition-all"><MoreVertical size={16}/></button>
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
             })}
           </div>
        </section>
      ) : (
        <section className="space-y-12">
          {/* Student Subject Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjectAttendance.map((subject, idx) => (
              <div key={idx} className={`${subject.bg} p-8 rounded-[3rem] border border-transparent shadow-sm hover:border-gold transition-all group flex flex-col justify-between overflow-hidden relative`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/50 rounded-bl-full group-hover:scale-110 transition-transform" />
                <div className="flex justify-between items-start relative z-10">
                  <div className={`p-3 ${subject.color} text-white rounded-2xl shadow-lg`}>
                    <Activity size={18} />
                  </div>
                  <div className="text-right">
                    <p className="text-[18px] font-black text-black leading-none">{subject.rate}%</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Presence</p>
                  </div>
                </div>
                <div className="mt-8 relative z-10">
                  <h4 className="font-black text-[13px] uppercase tracking-tight text-black">{subject.name}</h4>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5">
                    <div className="flex items-center space-x-2">
                       <Clock size={12} className="text-orange-500" />
                       <span className="text-[10px] font-black text-gray-600">{subject.tardy} Lates</span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-300 group-hover:text-gold transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Individual Log Registry</h3>
              <div className="p-3 bg-white border border-gray-100 rounded-xl text-gold shadow-sm"><FileText size={18}/></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Subject</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Time In</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentAttendance.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                      <td className="px-10 py-6 text-[11px] font-black text-black uppercase">{row.date}</td>
                      <td className="px-10 py-6 text-[11px] font-black text-gold uppercase tracking-tight">{row.subject}</td>
                      <td className="px-10 py-6">
                        <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase border-2 ${
                          row.status === 'Present' ? 'bg-green-50 text-green-600 border-green-100' : 
                          row.status === 'Late' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-600">{row.timeIn}</td>
                      <td className="px-10 py-6 text-[10px] font-bold text-gray-400 italic text-right">{row.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
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
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative inline-block">
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm"
            >
              {terms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Audit Export</button>
        </div>
      </div>
      {user.role === UserRole.TEACHER 
        ? renderAttendanceData(classAttendance) 
        : renderAttendanceData(subjectAttendance)}
    </div>
  );
};

export default AttendanceRecord;
