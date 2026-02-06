import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { 
  MapPin, 
  User as UserIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Edit2, 
  Save, 
  Plus, 
  Activity, 
  ChevronDown, 
  Users, 
  Briefcase,
  LayoutGrid,
  Trash2,
  Layout,
  Calendar as CalendarIcon,
  ShieldCheck,
  Target,
  Trophy,
  CheckCircle
} from 'lucide-react';

interface Props {
  user: User;
}

const ScheduleModule: React.FC<Props> = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [viewMode, setViewMode] = useState<'TERM' | 'DAILY' | 'STUDENTS' | 'ME'>('TERM'); 
  const [isEditing, setIsEditing] = useState(false);
  const [viewType, setViewType] = useState<'SELF' | 'STUDENTS' | 'TEACHERS' | 'HOD'>('SELF');
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDayName = daysOfWeek[currentTime.getDay() - 1] || 'Monday';

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.PATRON || user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;

  const years = ['2026', '2025', '2024'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  const principalSchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'General Assembly', location: 'Grand Hall', type: 'leadership' },
        { time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'Board of Governors', location: 'Council Room', type: 'meeting' },
        { time: '13:00 - 14:30', start: '13:00', end: '14:30', subject: 'Dept Head Review', location: 'Principal Office', type: 'review' },
      ]
    },
    { day: 'Tuesday', classes: [{ time: '09:00 - 10:30', start: '09:00', end: '10:30', subject: 'Govt. Liaison Meet', location: 'Registry Office', type: 'admin' }] },
    { day: 'Wednesday', classes: [{ time: '14:00 - 15:30', start: '14:00', end: '15:30', subject: 'Curriculum Audit', location: 'Academic Office', type: 'audit' }] },
    { day: 'Thursday', classes: [{ time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'Faculty Briefing', location: 'Staff Lounge', type: 'meeting' }] },
    { day: 'Friday', classes: [{ time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Parent Association', location: 'Boardroom', type: 'leadership' }] }
  ];

  const genericMocks = [
    { day: 'Monday', classes: [{ time: '08:00 - 09:30', subject: 'Mathematics 12A', location: 'Room 101', teacher: 'Dr. Vele' }] },
    { day: 'Tuesday', classes: [{ time: '10:00 - 11:30', subject: 'Science Lab', location: 'Lab 2', teacher: 'Mr. Tau' }] },
    { day: 'Wednesday', classes: [] },
    { day: 'Thursday', classes: [] },
    { day: 'Friday', classes: [] },
  ];

  const getActiveSchedule = () => {
    if (isStudent || viewMode === 'ME' || viewMode === 'TERM' || viewMode === 'DAILY') return isStudent ? genericMocks : principalSchedule;
    return genericMocks;
  };

  const getStatsForHero = () => {
    return [
      { label: 'WEEKLY LOAD', value: isStudent ? '32h' : '18h', icon: <Clock size={14} className="text-blue-400" /> },
      { label: 'FREE SLOTS', value: isStudent ? '6' : '4', icon: <CalendarIcon size={14} className="text-green-400" /> },
      { label: 'LAB HRS', value: isStudent ? '12h' : '8h', icon: <Briefcase size={14} className="text-gold" /> },
      { label: 'SYNC RATE', value: '100%', icon: <ShieldCheck size={14} className="text-purple-400" /> },
    ];
  };

  const subjectColors: {[key: string]: string} = {
    'General Assembly': 'bg-black text-gold border-gold/30',
    'Board of Governors': 'bg-gold/10 text-black border-gold/30',
    'Dept Head Review': 'bg-blue-50 text-blue-900 border-blue-200',
    'Mathematics 12A': 'bg-indigo-50 text-indigo-900 border-indigo-200',
    'Science Lab': 'bg-emerald-50 text-emerald-900 border-emerald-200',
  };

  const getSessionProgress = (startStr: string, endStr: string) => {
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM] = endStr.split(':').map(Number);
    const nowH = currentTime.getHours();
    const nowM = currentTime.getMinutes();
    const startTime = startH * 60 + startM;
    const endTime = endH * 60 + endM;
    const nowTime = nowH * 60 + nowM;
    if (nowTime < startTime) return 0;
    if (nowTime > endTime) return 100;
    return Math.round(((nowTime - startTime) / (endTime - startTime)) * 100);
  };

  const weeklySchedule = getActiveSchedule();
  const currentSession = weeklySchedule.find(d => d.day === currentDayName)?.classes.find(c => {
    const progress = getSessionProgress((c as any).start || '0', (c as any).end || '0');
    return progress > 0 && progress < 100;
  });

  const renderStudentHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Individual Schedule Audit</p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          SCHEDULE<br/>
          <span className="text-gold">LOG</span>
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
                (viewMode === target || (isStudent && viewMode === 'TERM' && target === 'TERM'))
                  ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - Stat Grid matching summary section style */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {getStatsForHero().map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-start hover:bg-white/10 transition-colors group">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {isStudent ? (
        renderStudentHero()
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">
                {isPrincipal ? "Institutional Master Schedule" : "Timetable Registry"}
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Authenticated Command Node &bull; {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {isPrincipal && (
              <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                 {(['SELF', 'STUDENTS', 'TEACHERS', 'HOD'] as const).map(v => (
                   <button 
                     key={v}
                     onClick={() => { setViewType(v); setIsEditing(false); }}
                     className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${viewType === v ? 'bg-black text-gold shadow-lg shadow-black/20' : 'text-gray-400 hover:text-black'}`}
                   >
                     {v}
                   </button>
                 ))}
              </div>
            )}
          </div>

          <section className="bg-gold p-8 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-bl-[10rem] transition-transform group-hover:scale-110 duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-black text-gold rounded-[2rem] flex items-center justify-center shadow-xl">
                     <Briefcase size={32} />
                  </div>
                  <div>
                     <p className="text-black/50 font-black uppercase tracking-widest text-[10px] mb-1">Administrative Focus</p>
                     <h3 className="text-4xl font-black uppercase tracking-tighter text-black leading-none">
                        {viewType === 'SELF' ? (currentSession ? currentSession.subject : 'Leadership Mode Active') : `Managing ${viewType} Timetable`}
                     </h3>
                     <p className="text-black/60 font-bold uppercase tracking-widest text-[10px] mt-2">Institutional Master Access • Multi-Node Oversight</p>
                  </div>
               </div>
               {isPrincipal && (
                 <button 
                   onClick={() => setIsEditing(!isEditing)}
                   className={`px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl flex items-center space-x-3 ${isEditing ? 'bg-black text-gold ring-4 ring-gold/20' : 'bg-white text-black hover:bg-black hover:text-gold'}`}
                 >
                   {isEditing ? <Save size={18}/> : <Edit2 size={18}/>}
                   <span>{isEditing ? 'Commit Master Changes' : 'Enter Master Edit Mode'}</span>
                 </button>
               )}
            </div>
          </section>
        </>
      )}

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
                {dayData.classes.map((item: any, idx) => {
                  const colorClass = subjectColors[item.subject] || 'bg-white border-gray-100 text-gray-900';
                  return (
                    <div key={idx} className={`p-8 rounded-[3rem] border-2 ${colorClass} transition-all group relative overflow-hidden shadow-lg hover:shadow-2xl`}>
                      {isEditing && !isStudent && (
                        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 bg-black text-gold rounded-full hover:scale-110 transition-transform shadow-md"><Edit2 size={12}/></button>
                           <button className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-md"><Trash2 size={12}/></button>
                        </div>
                      )}
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
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center"><MapPin size={14} className="mr-3 opacity-40" /> {item.location}</p>
                      </div>
                    </div>
                  );
                })}
                {isEditing && !isStudent && (
                  <button className="w-full py-8 border-2 border-dashed border-gray-300 rounded-[3rem] text-gray-400 hover:border-gold hover:text-gold flex flex-col items-center justify-center transition-all bg-white/50">
                    <Plus size={20} />
                    <span className="text-[9px] font-black uppercase tracking-widest mt-2">New Node Entry</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleModule;