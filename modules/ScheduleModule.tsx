
import React from 'react';
import { User } from '../types';
import { MapPin, User as UserIcon, Clock, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface Props {
  user: User;
}

const ScheduleModule: React.FC<Props> = ({ user }) => {
  // Mock current day for dynamic highlighting
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = new Date().getDay();
  const currentDayName = daysOfWeek[currentDayIndex === 0 || currentDayIndex === 6 ? 1 : currentDayIndex]; // Default to Monday if weekend for demo

  const getSubjectColor = (subj: string) => {
    const s = subj.toLowerCase();
    if (s.includes('math')) return 'border-blue-500 text-blue-500 bg-blue-50/30';
    if (s.includes('science') || s.includes('physics') || s.includes('chemistry')) return 'border-green-500 text-green-500 bg-green-50/30';
    if (s.includes('literature') || s.includes('english')) return 'border-purple-500 text-purple-500 bg-purple-50/30';
    if (s.includes('social') || s.includes('history') || s.includes('geography')) return 'border-orange-500 text-orange-500 bg-orange-50/30';
    if (s.includes('education') || s.includes('sports')) return 'border-pink-500 text-pink-500 bg-pink-50/30';
    return 'border-gold text-gold bg-gold/5';
  };

  const getSubjectIconColor = (subj: string) => {
    const s = subj.toLowerCase();
    if (s.includes('math')) return 'bg-blue-500';
    if (s.includes('science') || s.includes('physics') || s.includes('chemistry')) return 'bg-green-500';
    if (s.includes('literature') || s.includes('english')) return 'bg-purple-500';
    if (s.includes('social') || s.includes('history') || s.includes('geography')) return 'bg-orange-500';
    return 'bg-gold';
  };

  const currentClass = { 
    subject: 'English Literature', 
    teacher: 'Ms. Smith', 
    location: 'Room 205', 
    time: '09:15 - 10:15',
    remaining: '24 mins'
  };

  const weeklySchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
        { time: '09:15 - 10:15', subject: 'English Literature', teacher: 'Ms. Smith', location: 'Room 205' },
        { time: '10:30 - 11:30', subject: 'Physics', teacher: 'Dr. Williams', location: 'Lab 1' },
        { time: '11:45 - 12:45', subject: 'History', teacher: 'Mr. Brown', location: 'Room 301' },
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Chemistry', teacher: 'Dr. Williams', location: 'Lab 2' },
        { time: '09:15 - 10:15', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
        { time: '10:30 - 11:30', subject: 'Geography', teacher: 'Ms. Davis', location: 'Room 202' },
        { time: '11:45 - 12:45', subject: 'Physical Education', teacher: 'Coach Miller', location: 'Gym' },
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
        { time: '09:15 - 10:15', subject: 'Social Science', teacher: 'Mr. Brown', location: 'Room 301' },
        { time: '10:30 - 11:30', subject: 'Literature', teacher: 'Ms. Smith', location: 'Room 205' },
        { time: '11:45 - 12:45', subject: 'Science', teacher: 'Dr. Williams', location: 'Lab 1' },
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Physics', teacher: 'Dr. Williams', location: 'Lab 1' },
        { time: '09:15 - 10:15', subject: 'English Literature', teacher: 'Ms. Smith', location: 'Room 205' },
        { time: '10:30 - 11:30', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
        { time: '11:45 - 12:45', subject: 'Social Science', teacher: 'Mr. Brown', location: 'Room 301' },
      ]
    },
    {
      day: 'Friday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Science', teacher: 'Dr. Williams', location: 'Lab 1' },
        { time: '09:15 - 10:15', subject: 'Literature', teacher: 'Ms. Smith', location: 'Room 205' },
        { time: '10:30 - 11:30', subject: 'Physical Education', teacher: 'Coach Miller', location: 'Gym' },
        { time: '11:45 - 12:45', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Academic Timeline</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Institutional Schedule Overview</p>
        </div>
        <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronLeft size={18}/></button>
          <span className="px-6 py-1 text-[10px] font-black uppercase tracking-widest border-x border-gray-100">Oct 14 - Oct 20</span>
          <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronRight size={18}/></button>
        </div>
      </div>

      {/* Class In Progress Section */}
      <div className="relative overflow-hidden bg-black text-white p-10 rounded-[3rem] border border-[#B8860B] shadow-2xl group">
        <div className="absolute top-0 right-0 w-80 h-full bg-gold/5 -skew-x-12 translate-x-16 group-hover:scale-110 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-8">
            <div className="w-24 h-24 bg-gold rounded-[2.5rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,215,0,0.3)] animate-pulse">
              <BookOpen size={48} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-gold text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">In Session Now</span>
                <span className="text-gold font-black text-[11px] uppercase tracking-[0.2em]">{currentClass.time}</span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 leading-none">{currentClass.subject}</h3>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[11px] flex items-center">
                <UserIcon size={14} className="mr-2 text-gold" /> {currentClass.teacher} &bull; <MapPin size={14} className="mx-2 text-gold" /> {currentClass.location}
              </p>
            </div>
          </div>
          <div className="text-center md:text-right bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Session Remaining</p>
            <p className="text-5xl font-black text-gold tracking-tighter">{currentClass.remaining}</p>
          </div>
        </div>
      </div>

      {/* Weekly Timetable - Redesigned for highlighting and subject colors */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {weeklySchedule.map((dayData, i) => {
          const isToday = dayData.day === currentDayName;
          return (
            <div key={dayData.day} className={`flex flex-col space-y-4 transition-all duration-500 ${isToday ? 'scale-105 z-10' : 'opacity-80 hover:opacity-100'}`}>
              <div className={`p-5 rounded-[2rem] text-center shadow-lg transition-all border-b-8 ${
                isToday 
                  ? 'bg-black text-white border-gold shadow-gold/10' 
                  : 'bg-white text-black border-gray-100 shadow-sm'
              }`}>
                <h3 className="font-black uppercase tracking-[0.2em] text-[12px]">{dayData.day}</h3>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${isToday ? 'text-gold' : 'text-gray-400'}`}>
                  {isToday ? 'Today' : `${dayData.classes.length} Sessions`}
                </p>
              </div>
              
              <div className="space-y-4">
                {dayData.classes.map((item, idx) => {
                  const subjectStyles = getSubjectColor(item.subject);
                  const iconColor = getSubjectIconColor(item.subject);
                  return (
                    <div key={idx} className={`p-6 rounded-[2.5rem] shadow-sm border-2 transition-all group relative overflow-hidden flex flex-col items-center text-center ${subjectStyles} ${
                      isToday ? 'shadow-md border-opacity-100' : 'border-transparent bg-white border-gray-50 hover:border-gold/30'
                    }`}>
                      {isToday && idx === 1 && (
                        <div className="absolute top-0 right-0 w-3 h-full bg-gold" />
                      )}
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <Clock size={14} className="opacity-60" />
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">{item.time}</p>
                      </div>

                      <div className={`w-10 h-10 ${iconColor} rounded-xl flex items-center justify-center text-white font-black text-xs mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                        {item.subject.charAt(0)}
                      </div>

                      <h4 className="text-sm font-black text-black uppercase tracking-tight mb-6 leading-tight min-h-[2.5rem] flex items-center">
                        {item.subject}
                      </h4>

                      <div className="w-full pt-5 border-t border-black/5 space-y-3">
                        <div className="flex items-center justify-center text-[10px] text-gray-500 font-black uppercase tracking-widest">
                          <UserIcon size={12} className="mr-2 opacity-40" />
                          <span className="truncate">{item.teacher}</span>
                        </div>
                        <div className="flex items-center justify-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
                          <MapPin size={12} className="mr-2 opacity-40" />
                          <span>{item.location}</span>
                        </div>
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
