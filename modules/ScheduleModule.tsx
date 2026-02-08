import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { 
  MapPin, 
  User as UserIcon, 
  Clock, 
  ChevronDown, 
  Users, 
  Briefcase,
  LayoutGrid,
  Layout,
  Calendar as CalendarIcon,
  ShieldCheck,
  Target,
  Activity,
  BarChart3,
  Zap,
  ShieldAlert,
  Wallet,
  CheckCircle
} from 'lucide-react';

interface Props {
  user: User;
}

const ScheduleModule: React.FC<Props> = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [viewMode, setViewMode] = useState<'TERM' | 'CUMULATIVE'>('TERM');
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDayName = daysOfWeek[currentTime.getDay() - 1] || 'Monday';

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isBursar = user.role === UserRole.BURSAR;
  const isAdmissions = user.role === UserRole.ADMISSIONS;
  const isSuperUser = user.role === UserRole.SUPER_USER;
  const isAdmin = [UserRole.ADMIN, UserRole.SUPER_USER, UserRole.PRINCIPAL].includes(user.role);
  const isStudent = user.role === UserRole.STUDENT;
  const isTeacher = [UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(user.role);

  const years = ['2026', '2025', '2024'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  // Professional Schedules based on role
  const getActiveSchedule = () => {
    const leadershipSchedule = [
      {
        day: 'Monday',
        classes: [
          { time: '08:00 - 09:30', subject: 'General Assembly', location: 'Grand Hall', teacher: 'Admin Node' },
          { time: '10:00 - 11:30', subject: 'Executive Briefing', location: 'Council Room', teacher: 'Management' },
          { time: '13:00 - 14:30', subject: 'Institutional Audit', location: 'Boardroom', teacher: 'Audit Lead' },
        ]
      },
      { day: 'Tuesday', classes: [{ time: '09:00 - 10:30', subject: 'Govt. Liaison', location: 'Registry Office', teacher: 'Liaison Officer' }] },
      { day: 'Wednesday', classes: [{ time: '14:00 - 15:30', subject: 'Budget Planning', location: 'Finance Wing', teacher: 'Accounts Dept' }] },
      { day: 'Thursday', classes: [{ time: '10:00 - 11:30', subject: 'Faculty Oversight', location: 'Staff Lounge', teacher: 'VP Academic' }] },
      { day: 'Friday', classes: [{ time: '08:00 - 09:30', subject: 'Strategic Review', location: 'Boardroom', teacher: 'Leadership' }] }
    ];

    const teachingSchedule = [
      { 
        day: 'Monday', 
        classes: [
          { time: '08:00 - 09:30', subject: 'Mathematics 12A', location: 'Room 101', teacher: 'Dr. Vele' },
          { time: '10:00 - 11:30', subject: 'Physics Lab', location: 'Lab B', teacher: 'Mr. Tau' },
          { time: '13:00 - 14:30', subject: 'Literature', location: 'Room 204', teacher: 'Ms. Gere' }
        ] 
      },
      { day: 'Tuesday', classes: [{ time: '10:00 - 11:30', subject: 'Science Lab', location: 'Lab 2', teacher: 'Mr. Tau' }] },
      { day: 'Wednesday', classes: [{ time: '08:00 - 09:30', subject: 'Mathematics 12A', location: 'Room 101', teacher: 'Dr. Vele' }] },
      { day: 'Thursday', classes: [{ time: '11:00 - 12:30', subject: 'Social Science', location: 'Grand Hall', teacher: 'Ms. Johnson' }] },
      { day: 'Friday', classes: [{ time: '09:00 - 10:30', subject: 'Art & Design', location: 'Studio 1', teacher: 'Mr. DaVinci' }] },
    ];

    if (isStudent || isTeacher) return teachingSchedule;
    return leadershipSchedule;
  };

  const getStatsForHero = () => {
    if (isPrincipal) {
      return [
        { label: 'INST. LOAD', value: '420h', icon: <Clock size={14} className="text-blue-400" /> },
        { label: 'ROOM UTIL.', value: '94%', icon: <MapPin size={14} className="text-green-400" /> },
        { label: 'STAFF SYNC', value: '100%', icon: <ShieldCheck size={14} className="text-gold" /> },
        { label: 'ACTIVE NOTICES', value: '5', icon: <ShieldAlert size={14} className="text-purple-400" /> },
      ];
    }
    if (isBursar) {
      return [
        { label: 'FINANCE LOGS', value: '12', icon: <Wallet size={14} className="text-blue-400" /> },
        { label: 'ASSET SYNC', value: 'Active', icon: <Activity size={14} className="text-green-400" /> },
        { label: 'PAYROLL HRS', value: '160h', icon: <Clock size={14} className="text-gold" /> },
        { label: 'AUDIT STATUS', value: 'Verified', icon: <CheckCircle size={14} className="text-purple-400" /> },
      ];
    }
    if (isAdmissions) {
      return [
        { label: 'ENROLLMENT %', value: '92%', icon: <Target size={14} className="text-blue-400" /> },
        { label: 'INTAKE NODES', value: '450', icon: <Users size={14} className="text-green-400" /> },
        { label: 'ROOM CAP.', value: '1,240', icon: <LayoutGrid size={14} className="text-gold" /> },
        { label: 'REGISTRY SYNC', value: '100%', icon: <ShieldCheck size={14} className="text-purple-400" /> },
      ];
    }
    if (isSuperUser) {
      return [
        { label: 'SYS INTEGRITY', value: '99.9%', icon: <ShieldCheck size={14} className="text-blue-400" /> },
        { label: 'ADMIN NODES', value: '12', icon: <Zap size={14} className="text-green-400" /> },
        { label: 'GLOBAL LOAD', value: 'Low', icon: <BarChart3 size={14} className="text-gold" /> },
        { label: 'UPTIME', value: '365d', icon: <Activity size={14} className="text-purple-400" /> },
      ];
    }
    return [
      { label: 'WEEKLY LOAD', value: isStudent ? '32h' : '18h', icon: <Clock size={14} className="text-blue-400" /> },
      { label: 'FREE SLOTS', value: isStudent ? '6' : '4', icon: <CalendarIcon size={14} className="text-green-400" /> },
      { label: 'LAB HRS', value: isStudent ? '12h' : '8h', icon: <Briefcase size={14} className="text-gold" /> },
      { label: 'SYNC RATE', value: '100%', icon: <ShieldCheck size={14} className="text-purple-400" /> },
    ];
  };

  const subjectColors: {[key: string]: string} = {
    'General Assembly': 'bg-black text-gold border-gold/30',
    'Mathematics 12A': 'bg-indigo-50 text-indigo-900 border-indigo-200',
    'Physics Lab': 'bg-rose-50 text-rose-900 border-rose-200',
    'Strategic Review': 'bg-black text-gold border-gold/30',
    'Budget Planning': 'bg-blue-50 text-blue-900 border-blue-200',
  };

  const weeklySchedule = getActiveSchedule();

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {/* Universal Standard Hero */}
      <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between border border-white/10 mb-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
        
        <div className="relative z-10 flex flex-col items-start mb-8 xl:mb-0 xl:max-w-xl">
          <div className="flex items-center space-x-3 mb-5">
             <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
                <Layout size={20} />
             </div>
             <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
               {(isStudent || isTeacher) ? 'Individual Schedule Audit' : 'Institutional Schedule Log'}
             </p>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            SCHEDULE<br/>
            <span className="text-gold">{(isStudent || isTeacher) ? 'LOG' : 'REGISTRY'}</span>
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
                REGISTRY EXPORT
              </button>
          </div>
          
          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
            {['TERM', 'CUMULATIVE'].map(target => (
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
        </div>

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

      {/* Grid Layout - Standard for all roles */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {weeklySchedule.map((dayData) => {
          const isToday = dayData.day === currentDayName;
          return (
            <div key={dayData.day} className={`flex flex-col space-y-6 transition-all duration-500 ${isToday ? 'scale-105 z-10' : 'opacity-80 hover:opacity-100'}`}>
              <div className={`p-6 rounded-[2.5rem] text-center shadow-xl border-b-8 transition-all ${isToday ? 'bg-black text-white border-gold shadow-gold/10' : 'bg-white text-black border-gray-100 shadow-sm'}`}>
                <h3 className="font-black uppercase tracking-[0.2em] text-[13px]">{dayData.day}</h3>
                <p className={`text-[8px] font-black uppercase tracking-widest mt-2 ${isToday ? 'text-gold' : 'text-gray-400'}`}>
                  {dayData.classes.length} Logged Slots
                </p>
              </div>
              
              <div className="space-y-6">
                {dayData.classes.map((item: any, idx: number) => {
                  const colorClass = subjectColors[item.subject] || 'bg-white border-gray-100 text-gray-900';
                  return (
                    <div key={idx} className={`p-8 rounded-[3rem] border-2 ${colorClass} transition-all group relative overflow-hidden shadow-lg hover:shadow-2xl`}>
                      <div className="flex items-center space-x-2 mb-6 opacity-60">
                        <Clock size={14} />
                        <p className="text-[10px] font-black uppercase tracking-widest">{item.time}</p>
                      </div>

                      <h4 className="text-sm font-black uppercase tracking-tight mb-6 leading-tight min-h-[2.5rem]">{item.subject}</h4>
                      
                      <div className="pt-6 border-t border-black/5 space-y-3">
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center">
                            <UserIcon size={14} className="mr-3 opacity-40" />
                            {item.teacher || 'Lead Node'}
                         </p>
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center"><MapPin size={14} className="mr-3 opacity-40" /> {item.location || 'Main Campus'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleModule;