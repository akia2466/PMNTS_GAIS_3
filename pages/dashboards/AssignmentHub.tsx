
import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Download, 
  Search, 
  Clock, 
  CheckCircle, 
  FileText, 
  Send,
  ClipboardCheck,
  Plus,
  DollarSign,
  Filter,
  Upload,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';

interface Props {
  user: User;
}

const AssignmentHub: React.FC<Props> = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const subjectStats = [
    { name: 'Mathematics', received: 3, submitted: 2, color: 'bg-blue-500', cardBg: 'bg-blue-50' },
    { name: 'Science', received: 4, submitted: 3, color: 'bg-green-500', cardBg: 'bg-green-50' },
    { name: 'Literature', received: 2, submitted: 2, color: 'bg-purple-500', cardBg: 'bg-purple-50' },
    { name: 'Social Science', received: 3, submitted: 1, color: 'bg-orange-500', cardBg: 'bg-orange-50' },
  ];

  const teacherTasks = [
    { id: 1, title: 'Biology Lab Report Guidelines', subject: 'Science', status: 'pending', from: 'Mr. Yawi', due: 'Jan 30, 2026' },
    { id: 2, title: 'Calculus Problem Set 6', subject: 'Mathematics', status: 'pending', from: 'Mr. Chen', due: 'Feb 5, 2026' },
    { id: 3, title: 'History Presentation Template', subject: 'Social Science', status: 'pending', from: 'Ms. Johnson', due: 'Feb 10, 2026' },
    { id: 4, title: 'Chemistry Data Analysis Sheet', subject: 'Science', status: 'pending', from: 'Mr. Yawi', due: 'Jan 28, 2026' },
  ];

  const submittedAssignments = [
    { name: 'Algebra Problem Set 4.pdf', teacher: 'Mr. Chen', date: 'Jan 20, 2026', status: 'Submitted' },
    { name: 'Science Lab Report 2.pdf', teacher: 'Mr. Yawi', date: 'Jan 18, 2026', status: 'Submitted' },
  ];

  const renderStudentView = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Metrics Row with Backgrounds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjectStats.map((s, i) => (
          <div key={i} className={`${s.cardBg} p-10 rounded-[3.5rem] border border-transparent shadow-sm hover:border-gold transition-all group`}>
             <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-12 transition-transform`}>{s.name.charAt(0)}</div>
                <div className="text-right">
                   <p className="text-[9px] font-black uppercase text-gray-400">Completion</p>
                   <p className="text-xl font-black text-black leading-none mt-1">{Math.round((s.submitted / s.received) * 100)}%</p>
                </div>
             </div>
             <h4 className="font-black text-sm uppercase tracking-tight text-black mb-6">{s.name}</h4>
             <div className="flex justify-between items-center bg-white/60 rounded-2xl p-4 shadow-inner">
                <div className="text-center">
                   <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Received</p>
                   <p className="text-lg font-black text-black">{s.received}</p>
                </div>
                <div className="w-[1px] h-8 bg-gray-200" />
                <div className="text-center">
                   <p className="text-[8px] font-black uppercase text-gray-400 mb-1 text-gold">Done</p>
                   <p className="text-lg font-black text-black">{s.submitted}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Incoming Section */}
        <div className="bg-indigo-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Incoming Tasks</h3>
           <div className="space-y-4">
              {teacherTasks.map((task) => (
                 <div key={task.id} className="p-8 bg-white rounded-[2.5rem] border border-transparent hover:border-gold transition-all group flex flex-col shadow-sm">
                    <div className="flex items-start space-x-6 mb-6">
                       <div className="p-4 bg-black text-gold rounded-2xl group-hover:rotate-12 transition-transform shadow-lg"><FileText size={24} /></div>
                       <div>
                          <h4 className="font-black text-base uppercase tracking-tight text-black">{task.title}</h4>
                          <span className="inline-block mt-2 px-3 py-1 bg-orange-50 rounded-full text-[9px] font-black uppercase text-orange-600">{task.subject} • {task.status}</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{task.from} &bull; Due {task.due}</p>
                       <div className="flex space-x-3">
                          <button className="bg-gray-50 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Get</button>
                          <button className="bg-gold text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Submit</button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Upload & History */}
        <div className="space-y-8">
           <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Upload Hub</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Recipient</label>
                    <select className="w-full bg-white border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none shadow-sm">
                       <option>Select Teacher</option>
                       <option>Mr. Chen</option>
                       <option>Mr. Yawi</option>
                    </select>
                 </div>
                 <div className="w-full border-2 border-dashed border-gray-200 rounded-[2rem] p-8 flex flex-col items-center justify-center space-y-3 hover:border-gold transition-colors cursor-pointer bg-white">
                    <Upload size={24} className="text-gold" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Drop Submission Here</p>
                 </div>
                 <button className="bg-black text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl">
                    <Send size={18} />
                    <span>Upload Now</span>
                 </button>
              </form>
           </div>

           <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Submission Archive</h3>
              <div className="space-y-4">
                 {submittedAssignments.map((sub, i) => (
                    <div key={i} className="p-6 bg-white rounded-3xl border border-transparent shadow-sm">
                       <h4 className="font-black text-sm uppercase text-black">{sub.name}</h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{sub.teacher} &bull; {sub.date}</p>
                       <span className="inline-block mt-3 bg-green-50 text-green-600 px-4 py-1 rounded-full text-[9px] font-black uppercase">Confirmed</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Assignment Hub</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Institutional Task Management &bull; 2024
          </p>
        </div>
      </div>
      {renderStudentView()}
    </div>
  );
};

export default AssignmentHub;
