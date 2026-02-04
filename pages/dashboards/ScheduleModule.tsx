
import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { MapPin, User as UserIcon, Clock, ChevronLeft, ChevronRight, BookOpen, Edit2, Save, Plus } from 'lucide-react';

interface Props {
  user: User;
}

const ScheduleModule: React.FC<Props> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const weeklySchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
        { time: '09:15 - 10:15', subject: 'English Literature', teacher: 'Ms. Smith', location: 'Room 205' },
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '08:00 - 09:00', subject: 'Chemistry', teacher: 'Dr. Williams', location: 'Lab 2' },
        { time: '09:15 - 10:15', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' },
      ]
    },
    { day: 'Wednesday', classes: [{ time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Johnson', location: 'Room 101' }] },
    { day: 'Thursday', classes: [{ time: '08:00 - 09:00', subject: 'Physics', teacher: 'Dr. Williams', location: 'Lab 1' }] },
    { day: 'Friday', classes: [{ time: '08:00 - 09:00', subject: 'Science', teacher: 'Dr. Williams', location: 'Lab 1' }] }
  ];

  const canEdit = user.role === UserRole.PRINCIPAL || user.role === UserRole.ADMIN || user.role === UserRole.SUPER_USER;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
            {canEdit ? 'Master Schedule Editor' : 'Academic Timetable'}
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Institutional Time Management Overview</p>
        </div>
        <div className="flex items-center space-x-4">
           {canEdit && (
             <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`${isEditing ? 'bg-black text-gold' : 'bg-gold text-black'} px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 flex items-center space-x-3 hover:scale-105 transition-all`}
             >
               {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
               <span>{isEditing ? 'Save Master Changes' : 'Enter Edit Mode'}</span>
             </button>
           )}
           <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronLeft size={18}/></button>
            <span className="px-6 py-1 text-[10px] font-black uppercase tracking-widest border-x border-gray-100 italic opacity-60">Current Term</span>
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronRight size={18}/></button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {weeklySchedule.map((dayData, i) => (
            <div key={dayData.day} className="space-y-4">
              <div className="p-5 bg-black text-white rounded-[2rem] text-center shadow-lg border-b-8 border-gold">
                <h3 className="font-black uppercase tracking-[0.2em] text-[11px]">{dayData.day}</h3>
              </div>
              
              <div className="space-y-4">
                {dayData.classes.map((item, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-gold/30 hover:bg-white transition-all group relative">
                    {isEditing && (
                      <button className="absolute -top-2 -right-2 bg-black text-gold p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                        <Edit2 size={12} />
                      </button>
                    )}
                    <div className="flex items-center space-x-2 mb-4 opacity-50">
                      <Clock size={12} />
                      <p className="text-[9px] font-black uppercase tracking-widest">{item.time}</p>
                    </div>
                    <h4 className="text-xs font-black text-black uppercase tracking-tight mb-4 min-h-[1.5rem]">{item.subject}</h4>
                    <div className="pt-4 border-t border-gray-200/50 space-y-2">
                       <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center"><UserIcon size={12} className="mr-2 opacity-30" /> {item.teacher}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center"><MapPin size={12} className="mr-2 opacity-30" /> {item.location}</p>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-gray-300 flex flex-col items-center justify-center hover:border-gold/50 hover:text-gold transition-all">
                    <Plus size={20} />
                    <span className="text-[8px] font-black uppercase tracking-widest mt-2">Add Slot</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModule;
