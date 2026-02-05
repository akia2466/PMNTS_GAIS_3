
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
  ChevronDown,
  Layers,
  Target,
  Briefcase,
  History,
  MoreVertical,
  Activity,
  Users
} from 'lucide-react';

interface Props {
  user: User;
}

const AssignmentHub: React.FC<Props> = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [dispatchTarget, setDispatchTarget] = useState('Grade 12A');

  const isTeacher = user.role === UserRole.TEACHER;

  const subjectStats = [
    { name: 'Mathematics', received: 12, submitted: 420, color: 'bg-blue-500', cardBg: 'bg-blue-50' },
    { name: 'Advanced Math', received: 8, submitted: 156, color: 'bg-indigo-500', cardBg: 'bg-indigo-50' },
    { name: 'Statistics', received: 4, submitted: 89, color: 'bg-purple-500', cardBg: 'bg-purple-50' },
    { name: 'Grade 12A', received: 15, submitted: 12, color: 'bg-gold', cardBg: 'bg-gold/10' },
  ];

  const teacherMasterFiles = [
    { id: 1, title: 'Calculus Mock Exam Paper 2', subject: 'Mathematics', type: 'Assessment', date: 'Jan 28, 2026' },
    { id: 2, title: 'Linear Algebra Study Guide', subject: 'Advanced Math', type: 'Resource', date: 'Jan 25, 2026' },
    { id: 3, title: 'Probability Distributions Lab', subject: 'Statistics', type: 'Lab', date: 'Jan 22, 2026' },
    { id: 4, title: 'Annual Mathematics Syllabus', subject: 'Mathematics', type: 'Curriculum', date: 'Jan 15, 2026' },
  ];

  const studentTasks = [
    { id: 1, title: 'Biology Lab Report Guidelines', subject: 'Science', status: 'pending', from: 'Mr. Yawi', due: 'Jan 30, 2026' },
    { id: 2, title: 'Calculus Problem Set 6', subject: 'Mathematics', status: 'pending', from: 'Mr. Chen', due: 'Feb 5, 2026' },
  ];

  const renderTeacherView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Teacher Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Assignments Issued', value: '24', icon: <Briefcase />, bg: 'bg-black text-white' },
          { label: 'Submissions Graded', value: '412', icon: <CheckCircle />, bg: 'bg-blue-50 text-blue-600' },
          { label: 'Pending Grading', value: '18', icon: <Clock />, bg: 'bg-orange-50 text-orange-600' },
          { label: 'Avg. Success Rate', value: '88%', icon: <Activity />, bg: 'bg-gold/10 text-gold' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-10 rounded-[3rem] shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all`}>
            <div className="p-4 bg-white/10 rounded-2xl w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{stat.label}</p>
              <h4 className="text-4xl font-black tracking-tighter">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Master File Repository (Teacher's Version of Incoming Tasks) */}
        <div className="bg-indigo-50 p-12 rounded-[3.5rem] border border-transparent shadow-sm">
           <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black text-black uppercase tracking-tighter border-l-4 border-gold pl-6">Assignment Repository</h3>
             <button className="text-[10px] font-black uppercase text-gold hover:text-black transition-colors">View All Assets</button>
           </div>
           
           <div className="space-y-6">
              {teacherMasterFiles.map((file) => (
                 <div key={file.id} className="p-8 bg-white rounded-[2.5rem] border border-transparent hover:border-gold transition-all group flex flex-col shadow-sm">
                    <div className="flex items-start space-x-6 mb-8">
                       <div className="p-4 bg-black text-gold rounded-2xl group-hover:rotate-12 transition-transform shadow-lg">
                          <FileText size={24} />
                       </div>
                       <div className="flex-grow">
                          <h4 className="font-black text-base uppercase tracking-tight text-black">{file.title}</h4>
                          <div className="flex space-x-2 mt-2">
                             <span className="px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black uppercase text-indigo-600">{file.subject}</span>
                             <span className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black uppercase text-gray-400">{file.type}</span>
                          </div>
                       </div>
                       <button className="text-gray-300 hover:text-black transition-colors"><MoreVertical size={18}/></button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-50 gap-4">
                       <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <History size={14} />
                          <span>Uploaded: {file.date}</span>
                       </div>
                       <div className="flex space-x-3 w-full md:w-auto">
                          <div className="relative flex-grow md:flex-grow-0">
                             <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 pr-10 text-[9px] font-black uppercase outline-none appearance-none focus:ring-1 focus:ring-gold shadow-sm">
                                <option>Grade 12A</option>
                                <option>Grade 12B</option>
                                <option>All Grade 12</option>
                                <option>Grade 11C</option>
                             </select>
                             <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                          <button className="bg-black text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center space-x-2 hover:bg-gold hover:text-black transition-all">
                             <Target size={14} />
                             <span>Dispatch</span>
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Upload Hub (Assignment Creation) */}
        <div className="space-y-8">
           <div className="bg-emerald-50 p-12 rounded-[3.5rem] border border-transparent shadow-sm">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-10 border-l-4 border-gold pl-6 text-center lg:text-left">Upload Hub</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Assignment Title</label>
                    <input type="text" placeholder="e.g. Unit 4 Final Project" className="w-full bg-white border border-gray-100 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-gold outline-none shadow-sm" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subject Category</label>
                       <select className="w-full bg-white border border-gray-100 rounded-2xl p-5 text-[11px] font-black uppercase outline-none shadow-sm">
                          <option>Mathematics</option>
                          <option>Advanced Mathematics</option>
                          <option>Statistics</option>
                          <option>Applied Physics</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Primary Recipient</label>
                       <select className="w-full bg-white border border-gray-100 rounded-2xl p-5 text-[11px] font-black uppercase outline-none shadow-sm">
                          <optgroup label="Single Classes">
                             <option>Grade 12A</option>
                             <option>Grade 12B</option>
                             <option>Grade 11C</option>
                          </optgroup>
                          <optgroup label="Grade Levels">
                             <option>All Grade 12 Classes</option>
                             <option>All Grade 11 Classes</option>
                          </optgroup>
                          <optgroup label="Global">
                             <option>All Assigned Students</option>
                          </optgroup>
                       </select>
                    </div>
                 </div>

                 <div className="w-full border-2 border-dashed border-gold/30 rounded-[2.5rem] p-12 flex flex-col items-center justify-center space-y-4 hover:border-gold transition-all cursor-pointer bg-white/50 group">
                    <Upload size={32} className="text-gold group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-black uppercase tracking-widest text-black">Transmit New Master Asset</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">PDF, DOCX, ZIP (MAX 25MB)</p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-gray-100 hover:border-gold transition-all shadow-sm">
                       Save as Draft
                    </button>
                    <button className="bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl">
                       <Send size={18} />
                       <span>Upload & Dispatch</span>
                    </button>
                 </div>
              </form>
           </div>

           <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-transparent shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-black uppercase tracking-tighter">Submissions Monitor</h3>
                 <div className="p-3 bg-white rounded-xl shadow-sm text-gold"><Activity size={18}/></div>
              </div>
              <div className="space-y-4">
                 {[
                   { name: 'Calculus Quiz #1', class: 'Grade 12A', pending: 8, graded: 34 },
                   { name: 'Linear Systems Lab', class: 'Grade 12B', pending: 12, graded: 28 },
                 ].map((sub, i) => (
                    <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-transparent hover:border-gold transition-all shadow-sm flex items-center justify-between">
                       <div>
                          <h4 className="font-black text-sm uppercase text-black">{sub.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{sub.class}</p>
                       </div>
                       <div className="flex space-x-6">
                          <div className="text-center">
                             <p className="text-[8px] font-black uppercase text-gray-400 mb-1">To Grade</p>
                             <p className="text-sm font-black text-red-500">{sub.pending}</p>
                          </div>
                          <div className="text-center">
                             <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Graded</p>
                             <p className="text-sm font-black text-green-500">{sub.graded}</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
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
        <div className="bg-indigo-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Incoming Tasks</h3>
           <div className="space-y-4">
              {studentTasks.map((task) => (
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
            {isTeacher ? 'Faculty Assignment Protocol' : 'Institutional Task Management'} &bull; 2024
          </p>
        </div>
        {isTeacher && (
           <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors flex items-center">
             <Plus size={16} className="mr-2" /> New Task Grade Level
           </button>
        )}
      </div>
      {isTeacher ? renderTeacherView() : renderStudentView()}
    </div>
  );
};

export default AssignmentHub;
