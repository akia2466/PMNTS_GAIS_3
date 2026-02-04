import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
// Added Users to the lucide-react import list
import { MapPin, User as UserIcon, Clock, ChevronLeft, ChevronRight, BookOpen, Edit2, Save, Plus, Activity, ChevronDown, Users } from 'lucide-react';

interface Props {
  user: User;
}

const ScheduleModule: React.FC<Props> = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDayName = daysOfWeek[currentTime.getDay() - 1] || 'Monday';

  const years = ['2026', '2025', '2024'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  const isTeacher = user.role === UserRole.TEACHER;

  // Schedule for a Teacher (Specific Subject: e.g. Mathematics)
  const teacherSchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Mathematics', class: 'Grade 12A', location: 'Room 101' },
        { time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'Mathematics', class: 'Grade 12B', location: 'Room 102' },
        { time: '13:00 - 14:30', start: '13:00', end: '14:30', subject: 'Advanced Math', class: 'Grade 11C', location: 'Room 101' },
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Advanced Math', class: 'Grade 11D', location: 'Room 104' },
        { time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'Mathematics', class: 'Grade 12A', location: 'Room 101' },
      ]
    },
    { day: 'Wednesday', classes: [{ time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Mathematics', class: 'Grade 12B', location: 'Room 102' }] },
    { day: 'Thursday', classes: [{ time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'Advanced Math', class: 'Grade 11C', location: 'Room 101' }] },
    { day: 'Friday', classes: [{ time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Advanced Math', class: 'Grade 11D', location: 'Room 104' }] }
  ];

  // Schedule for a Student
  const studentSchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Mathematics', teacher: 'Dr. Vele', location: 'Room 101' },
        { time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'English Literature', teacher: 'Ms. Gere', location: 'Room 205' },
        { time: '13:00 - 14:30', start: '13:00', end: '14:30', subject: 'Social Science', teacher: 'Mr. Tau', location: 'Room 101' },
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Chemistry', teacher: 'Mr. Tau', location: 'Lab 2' },
        { time: '10:00 - 11:30', start: '10:00', end: '11:30', subject: 'Mathematics', teacher: 'Dr. Vele', location: 'Room 101' },
      ]
    },
    { day: 'Wednesday', classes: [{ time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Social Science', teacher: 'Mr. Nambui', location: 'Room 301' }] },
    { day: 'Thursday', classes: [{ time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Physics', teacher: 'Mr. Chen', location: 'Lab 1' }] },
    { day: 'Friday', classes: [{ time: '08:00 - 09:30', start: '08:00', end: '09:30', subject: 'Physical Education', teacher: 'Coach Miller', location: 'Gym' }] }
  ];

  const weeklySchedule = isTeacher ? teacherSchedule : studentSchedule;

  const subjectColors: {[key: string]: string} = {
    'Mathematics': 'bg-blue-50 border-blue-200 text-blue-900',
    'Advanced Math': 'bg-indigo-50 border-indigo-200 text-indigo-900',
    'English Literature': 'bg-purple-50 border-purple-200 text-purple-900',
    'Chemistry': 'bg-green-50 border-green-200 text-green-900',
    'Social Science': 'bg-orange-50 border-orange-200 text-orange-900',
    'Physics': 'bg-cyan-50 border-cyan-200 text-cyan-900',
    'Physical Education': 'bg-red-50 border-red-200 text-red-900'
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

  const currentSession = weeklySchedule.find(d => d.day === currentDayName)?.classes.find(c => {
    const progress = getSessionProgress(c.start || '0', c.end || '0');
    return progress > 0 && progress < 100;
  });

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">
            {isTeacher ? "Subject Timetable" : "Academic Timetable"}
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2">Academic Period:</p>
          <div className="relative inline-block">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative inline-block">
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm"
            >
              {terms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <section className="bg-gold p-8 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-bl-[10rem] transition-transform group-hover:scale-110 duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center space-x-8">
              <div className="w-20 h-20 bg-black text-gold rounded-[2rem] flex items-center justify-center shadow-xl animate-pulse">
                 <Activity size={32} />
              </div>
              <div>
                 <p className="text-black/50 font-black uppercase tracking-widest text-[10px] mb-1">Current Class in Session</p>
                 <h3 className="text-4xl font-black uppercase tracking-tighter text-black leading-none">
                    {currentSession ? currentSession.subject : 'No Active Lectures'}
                 </h3>
                 {currentSession && (
                   <p className="text-black/60 font-bold uppercase tracking-widest text-[10px] mt-2">
                      {isTeacher ? (currentSession as any).class : (currentSession as any).teacher} • {currentSession.location} • Ends at {currentSession.end}
                   </p>
                 )}
              </div>
           </div>
           {currentSession && (
             <div className="w-full md:w-96 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-black">
                   <span>Session Progress</span>
                   <span>{getSessionProgress(currentSession.start || '0', currentSession.end || '0')}%</span>
                </div>
                <div className="h-4 w-full bg-black/10 rounded-full overflow-hidden p-1">
                   <div 
                      className="h-full bg-black rounded-full transition-all duration-1000 shadow-lg" 
                      style={{ width: `${getSessionProgress(currentSession.start || '0', currentSession.end || '0')}%` }} 
                   />
                </div>
             </div>
           )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {weeklySchedule.map((dayData) => {
          const isToday = dayData.day === currentDayName;
          return (
            <div key={dayData.day} className={`flex flex-col space-y-6 transition-all duration-500 ${isToday ? 'scale-105 z-10' : 'opacity-80 hover:opacity-100'}`}>
              <div className={`p-6 rounded-[2.5rem] text-center shadow-xl border-b-8 transition-all ${isToday ? 'bg-black text-white border-gold shadow-gold/10' : 'bg-white text-black border-gray-100 shadow-sm'}`}>
                <h3 className="font-black uppercase tracking-[0.2em] text-[13px]">{dayData.day}</h3>
                <p className={`text-[9px] font-black uppercase tracking-widest mt-2 ${isToday ? 'text-gold' : 'text-gray-400'}`}>
                  {isToday ? 'Live Sessions' : `${dayData.classes.length} Lectures`}
                </p>
              </div>
              
              <div className="space-y-6">
                {dayData.classes.map((item: any, idx) => {
                  const colorClass = subjectColors[item.subject] || 'bg-gray-50 border-gray-100 text-gray-900';
                  const isActive = isToday && currentSession?.subject === item.subject && currentSession?.time === item.time;

                  return (
                    <div key={idx} className={`p-8 rounded-[3rem] border-2 ${colorClass} transition-all group relative overflow-hidden shadow-lg hover:shadow-2xl ${isActive ? 'ring-4 ring-gold ring-offset-4' : ''}`}>
                      <div className="flex items-center space-x-2 mb-6 opacity-60">
                        <Clock size={14} />
                        <p className="text-[10px] font-black uppercase tracking-widest">{item.time}</p>
                      </div>

                      <h4 className="text-sm font-black uppercase tracking-tight mb-6 leading-tight min-h-[2.5rem]">{item.subject}</h4>
                      
                      <div className="pt-6 border-t border-black/5 space-y-3">
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center">
                            {/* Fixed missing icon import here by adding 'Users' to the lucide-react import */}
                            {isTeacher ? <Users size={14} className="mr-3 opacity-40" /> : <UserIcon size={14} className="mr-3 opacity-40" />}
                            {isTeacher ? item.class : item.teacher}
                         </p>
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center"><MapPin size={14} className="mr-3 opacity-40" /> {item.location}</p>
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