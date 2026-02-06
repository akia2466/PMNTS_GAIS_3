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
  Filter,
  Upload,
  User as UserIcon,
  ChevronDown,
  Target,
  Briefcase,
  History,
  MoreVertical,
  Activity,
  Folder,
  ChevronRight,
  ArrowLeft,
  Calendar,
  AlertCircle,
  X,
  FileIcon,
  Layout,
  Trophy
} from 'lucide-react';

interface Props {
  user: User;
}

interface StudentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  status: 'graded' | 'pending';
}

const AssignmentHub: React.FC<Props> = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('ME'); // Default to ME for student
  const [viewingSubmissions, setViewingSubmissions] = useState<{
    id: number;
    title: string;
    class: string;
  } | null>(null);

  const isTeacher = [
    UserRole.TEACHER, 
    UserRole.PATRON,
    UserRole.HOD, 
    UserRole.PRINCIPAL, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER, 
    UserRole.VENDOR
  ].includes(user.role);
  const isStudent = user.role === UserRole.STUDENT;

  const teacherSubmissionsMonitor = [
    { id: 1, title: 'Calculus Mock Exam Paper 2', class: 'Grade 12A', pending: 8, graded: 34, total: 42 },
    { id: 2, title: 'Algebra Systems Research', class: 'Grade 12B', pending: 15, graded: 20, total: 35 },
    { id: 3, title: 'Geometry Proofs', class: 'Grade 11C', pending: 3, graded: 42, total: 45 },
  ];

  const getStatsForHero = () => {
    if (isStudent || viewMode === 'ME') {
      return [
        { label: 'PENDING', value: '4', icon: <Clock size={14} className="text-blue-400" /> },
        { label: 'COMPLETED', value: '12', icon: <CheckCircle size={14} className="text-green-400" /> },
        { label: 'AVG GRADE', value: 'A-', icon: <Trophy size={14} className="text-gold" /> },
        { label: 'DUE TODAY', value: '1', icon: <AlertCircle size={14} className="text-purple-400" /> },
      ];
    }
    return [
      { label: 'RECEIVED', value: '412', icon: <FileText size={14} className="text-blue-400" /> },
      { label: 'AVG GRADE', value: 'B+', icon: <Trophy size={14} className="text-green-400" /> },
      { label: 'PENDING', value: '12%', icon: <Clock size={14} className="text-gold" /> },
      { label: 'COMPLETED', value: '88%', icon: <CheckCircle size={14} className="text-purple-400" /> },
    ];
  };

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
             {isStudent ? 'My Academic Tasks Audit' : 'Assignment Registry Oversight'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Assignment<br/>
          <span className="text-gold">{isStudent ? 'Hub' : 'Log'}</span>
        </h2>

        {isStudent && (
           <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="relative inline-block group">
                <select className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                  <option className="bg-black">All Subjects</option>
                  <option className="bg-black">Mathematics</option>
                  <option className="bg-black">Physics</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
              </div>
              <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
                Submit Task
              </button>
           </div>
        )}
        
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {(isStudent ? ['TASKS', 'ME'] : ['STUDENTS', 'ME'] as const).map(target => (
            <button 
              key={target}
              onClick={() => isStudent ? null : setViewMode(target as any)}
              className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                (isStudent ? target === 'TASKS' : viewMode === target) 
                  ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - Stat Grid */}
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
  );

  const renderTeacherView = () => (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {renderInstitutionalHero()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-black uppercase tracking-tighter border-l-4 border-gold pl-6">Submissions Monitor</h3>
             </div>
             <div className="space-y-4">
                {teacherSubmissionsMonitor.map((task) => (
                   <div key={task.id} className="p-8 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all cursor-pointer group flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-black text-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Folder size={24} fill="currentColor" />
                        </div>
                        <div>
                          <h4 className="font-black text-base uppercase text-black">{task.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {task.class} &bull; <span className="text-gold">{task.total} Folders</span>
                          </p>
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
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {renderInstitutionalHero()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-black uppercase tracking-tighter border-l-4 border-gold pl-6">Academic Task List</h3>
               <div className="flex space-x-2">
                 <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors"><Search size={16}/></button>
                 <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors"><Filter size={16}/></button>
               </div>
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'Calculus Mock Paper', deadline: '24 Jan 2026', subject: 'Mathematics', status: 'pending' },
                  { id: 2, title: 'Physics Research', deadline: '20 Jan 2026', subject: 'Physics', status: 'completed' },
                  { id: 3, title: 'Chemistry Lab', deadline: '18 Jan 2026', subject: 'Chemistry', status: 'completed' },
                ].map((task) => (
                   <div key={task.id} className="p-8 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all cursor-pointer group flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-black text-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-base uppercase text-black">{task.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {task.subject} &bull; Deadline: <span className="text-gold">{task.deadline}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                         <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                           task.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                         }`}>
                           {task.status}
                         </span>
                         <div className="p-4 bg-gray-100 rounded-2xl group-hover:bg-gold group-hover:text-black transition-colors">
                            <ChevronRight size={20} />
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           </div>
        </div>
        <div className="space-y-8">
           <div className="bg-gold p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-bl-full group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-8 leading-tight">Transmit Your Assignment</h3>
              <p className="text-black/60 text-sm font-bold leading-relaxed mb-8">Upload your completed tasks to the institutional repository for grading audit.</p>
              <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3">
                <Upload size={20} />
                <span>Upload File</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      {isTeacher ? renderTeacherView() : isStudent ? renderStudentView() : null}
    </div>
  );
};

export default AssignmentHub;
