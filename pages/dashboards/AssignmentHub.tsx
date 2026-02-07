import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  FileText, 
  Send,
  Plus,
  Filter,
  Upload,
  Folder,
  ChevronRight,
  ArrowLeft,
  Calendar,
  AlertCircle,
  X,
  Layout,
  Trophy,
  ArrowDownToLine,
  Check,
  Save,
  Target,
  PlusCircle,
  Trash2,
  Eye,
  FileIcon,
  BookOpen
} from 'lucide-react';

interface Props {
  user: User;
}

interface StudentSubmission {
  id: string;
  name: string;
  studentId: string;
  initial: string;
  status: 'graded' | 'pending';
  fileName: string;
  fileSize: string;
  submittedAt: string;
}

const AssignmentHub: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<string>('TASKS'); 
  const [targetRole, setTargetRole] = useState<string>('STUDENTS');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [gradingStudent, setGradingStudent] = useState<StudentSubmission | null>(null);
  const [viewingFile, setViewingFile] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Role Checks
  const isTeacher = [UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(user.role);
  const isHOD = user.role === UserRole.HOD;
  const isAdmin = [UserRole.PRINCIPAL, UserRole.ADMIN, UserRole.SUPER_USER].includes(user.role);
  const isStudent = user.role === UserRole.STUDENT;

  const getSwitcherOptions = () => {
    if (isAdmin) return ['STUDENTS', 'TEACHERS', 'HOD', 'ME'];
    if (isHOD) return ['STUDENTS', 'TEACHERS', 'ME'];
    return ['STUDENTS', 'ME'];
  };

  // Data customization based on role
  const folders = isStudent ? [
    { id: 'MATH', name: 'MATHEMATICS', count: 4, icon: <BookOpen size={24} /> },
    { id: 'PHYS', name: 'PHYSICS', count: 2, icon: <Target size={24} /> },
    { id: 'LIT', name: 'LITERATURE', count: 3, icon: <FileText size={24} /> },
  ] : isTeacher ? [
    { id: '12A', name: 'GRADE 12A', count: 5, icon: <Folder size={24} /> },
    { id: '12B', name: 'GRADE 12B', count: 3, icon: <Folder size={24} /> },
    { id: '11C', name: 'GRADE 11C', count: 4, icon: <Folder size={24} /> },
  ] : [
    { id: 'STEM', name: 'STEM DEPT', count: 12, icon: <Layout size={24} /> },
    { id: 'HUM', name: 'HUMANITIES', count: 8, icon: <Layout size={24} /> },
  ];

  const tasksByFolder: Record<string, any[]> = {
    'MATH': [
      { id: 1, title: 'Calculus Mock Exam Paper 2', deadline: 'JAN 30, 2026', status: 'pending', subject: 'MATH' },
      { id: 4, title: 'Trigonometric Identities', deadline: 'FEB 05, 2026', status: 'submitted', subject: 'MATH' },
    ],
    '12A': [
      { id: 1, title: 'Calculus Mock Exam Paper 2', class: 'GRADE 12A', folders: 42, pending: 8, graded: 34 },
    ],
    'STEM': [
      { id: 1, title: 'Annual STEM Review', class: 'ALL GRADES', pending: 150, graded: 340 },
    ]
  };

  const mockSubmissions: StudentSubmission[] = [
    { id: '1', name: 'JOSHUA KILA', studentId: 'S101', initial: 'J', status: 'graded', fileName: 'Calculus_Mock_Kila.pdf', fileSize: '2.4MB', submittedAt: 'JAN 28, 10:15 AM' },
    { id: '2', name: 'ANNA VELE', studentId: 'S102', initial: 'A', status: 'pending', fileName: 'Mock_Exam_Anna.pdf', fileSize: '1.8MB', submittedAt: 'JAN 28, 11:30 AM' },
  ];

  const getStats = () => {
    if (isStudent) return [
      { label: 'TO DO', value: '4', icon: <Clock size={14} className="text-blue-400" /> },
      { label: 'DONE', value: '12', icon: <CheckCircle size={14} className="text-green-400" /> },
      { label: 'AVG GRADE', value: 'A-', icon: <Trophy size={14} className="text-gold" /> },
      { label: 'URGENT', value: '1', icon: <AlertCircle size={14} className="text-red-400" /> },
    ];
    return [
      { label: 'TOTAL NODES', value: '412', icon: <FileText size={14} className="text-blue-400" /> },
      { label: 'GRADED', value: '88%', icon: <CheckCircle size={14} className="text-green-400" /> },
      { label: 'PENDING', value: '12%', icon: <Clock size={14} className="text-gold" /> },
      { label: 'AVG SCORE', value: 'B+', icon: <Trophy size={14} className="text-purple-400" /> },
    ];
  };

  const renderHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      <div className="relative z-10 flex flex-col items-start">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg"><Layout size={20} /></div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">{isStudent ? 'Academic Progress Tracker' : 'Institutional Task Registry'}</p>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Assignment<br/><span className="text-gold">{isStudent ? 'Hub' : 'Log'}</span>
        </h2>
        
        <div className="flex flex-col space-y-4">
          {!isStudent && (
            <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
              {getSwitcherOptions().map(target => (
                <button key={target} onClick={() => setTargetRole(target)} className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${targetRole === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-zinc-500 hover:text-white'}`}>
                  {target}
                </button>
              ))}
            </div>
          )}

          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
            {['TASKS', 'PERSONAL LOG'].map(target => (
              <button key={target} onClick={() => setViewMode(target)} className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-zinc-500 hover:text-white'}`}>
                {target}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-4 xl:gap-6">
        {getStats().map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group shadow-lg">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDrilldown = () => (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <button onClick={() => setSelectedTask(null)} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold transition-all shadow-sm">
            <ArrowLeft size={20}/>
          </button>
          <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black">
                <Folder size={20} fill="currentColor" />
             </div>
             <div>
               <h3 className="text-2xl font-black uppercase tracking-tight text-black">{selectedTask.title}</h3>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                 {isStudent ? `DEADLINE: ${selectedTask.deadline}` : `MONITORING ${mockSubmissions.length} NODES`}
               </p>
             </div>
          </div>
        </div>
        {isStudent && (
          <button className="bg-black text-gold px-[38px] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center space-x-3 hover:bg-gold hover:text-black transition-all">
            <Upload size={18} />
            <span>TRANSMIT RESPONSE</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {isStudent ? (
          <div className="lg:col-span-2 bg-white rounded-[3.5rem] p-12 border border-gray-100 shadow-sm">
            <h4 className="text-xl font-black uppercase mb-6">Master Instructions</h4>
            <div className="prose prose-sm max-w-none text-gray-500 font-bold leading-relaxed mb-10">
               Please review the attached syllabus nodes and complete Section A of the mock exam. No physical files are required for submission today.
            </div>
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
               <h5 className="text-[10px] font-black uppercase tracking-widest mb-4">Institutional Criteria</h5>
               <ul className="space-y-4">
                 {['ACCURACY (40%)', 'METHODOLOGY (30%)', 'PRESENTATION (30%)'].map(c => (
                   <li key={c} className="flex items-center space-x-3 text-xs font-black text-black">
                     <CheckCircle size={14} className="text-gold" />
                     <span>{c}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        ) : (
          mockSubmissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl p-10 hover:shadow-2xl transition-all group">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                     <div className="w-14 h-14 bg-black text-gold rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">{sub.initial}</div>
                     <div>
                       <h4 className="font-black text-lg uppercase text-black leading-none mb-1">{sub.name}</h4>
                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">ID: {sub.studentId}</p>
                     </div>
                  </div>
                  <span className={`px-4 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${sub.status === 'graded' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-500 border-orange-100'}`}>
                    {sub.status}
                  </span>
               </div>
               <div className="bg-gray-50/80 p-6 rounded-[2rem] flex items-center space-x-6 border border-gray-100 mb-8 hover:bg-white hover:border-gold transition-all cursor-pointer">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-gray-300"><FileText size={24} /></div>
                  <div className="overflow-hidden">
                     <p className="font-black text-[11px] text-black uppercase truncate">{sub.fileName}</p>
                     <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{sub.fileSize}</p>
                  </div>
               </div>
               <div className="flex space-x-3">
                  <button onClick={() => setGradingStudent(sub)} className="flex-grow bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all">GRADE NOW</button>
                  <button onClick={() => setViewingFile(sub.fileName)} className="flex-grow bg-white border border-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-gold hover:text-black transition-all">VIEW FILE</button>
               </div>
            </div>
          ))
        )}
      </div>

      {gradingStudent && renderGradingForm()}
      {viewingFile && renderFileViewer()}
    </div>
  );

  const renderTaskList = () => {
    const list = tasksByFolder[activeFolderId!] || [];
    return (
      <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
        <div className="flex items-center space-x-6">
          <button onClick={() => setActiveFolderId(null)} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold transition-all shadow-sm">
            <ArrowLeft size={20}/>
          </button>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-black">{activeFolderId} Registry</h3>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Active Institutional Subfolders</p>
          </div>
        </div>
        <div className="space-y-6">
          {list.map((task) => (
            <div key={task.id} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all group flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="w-16 h-16 bg-black text-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Folder size={28} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-lg uppercase text-black tracking-tight">{task.title}</h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1.5">
                    {isStudent ? `DEADLINE: ${task.deadline}` : `${task.class || 'SECTION'} • ${task.pending} PENDING`}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTask(task)}
                className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 group-hover:bg-gold group-hover:text-black transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGradingForm = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
           <div>
             <h3 className="text-xl font-black text-black uppercase tracking-tight">Grading Node: {gradingStudent?.name}</h3>
             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Institutional Audit Cycle Active</p>
           </div>
           <button onClick={() => setGradingStudent(null)} className="p-3 hover:bg-gray-200 rounded-full text-gray-400"><X size={20}/></button>
        </div>
        <div className="p-10 space-y-8 overflow-y-auto">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {['Accuracy (40%)', 'Methodology (30%)', 'Presentation (20%)', 'Critical Thinking (10%)'].map((c, i) => (
                <div key={i} className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-black ml-2">{c}</label>
                   <input type="number" placeholder="0-100" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black focus:ring-1 focus:ring-gold outline-none" />
                </div>
              ))}
           </div>
        </div>
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
           <button onClick={() => setGradingStudent(null)} className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest">Discard</button>
           <button onClick={() => setGradingStudent(null)} className="px-10 py-3 bg-black text-gold rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black shadow-xl transition-all">Commit Grade</button>
        </div>
      </div>
    </div>
  );

  const renderFileViewer = () => (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/90 p-10 animate-in fade-in duration-300">
       <button onClick={() => setViewingFile(null)} className="absolute top-10 right-10 p-4 bg-white/10 text-white rounded-full"><X size={32}/></button>
       <div className="w-full h-full max-w-5xl bg-white rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
            <h3 className="font-black text-sm uppercase text-black">{viewingFile}</h3>
            <button className="bg-black text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase">Download</button>
          </div>
          <div className="flex-grow flex items-center justify-center bg-zinc-100">
            <Eye size={48} className="text-gray-300 animate-pulse" />
          </div>
       </div>
    </div>
  );

  return (
    <div className="pb-20 space-y-12">
      {selectedTask ? renderDrilldown() : activeFolderId ? renderTaskList() : (
        <>
          {renderHero()}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
                  <span className="w-1 h-6 bg-gold mr-4 rounded-full" />
                  {isStudent ? 'MY ACADEMIC FOLDERS' : 'INSTITUTIONAL REGISTRIES'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {folders.map((folder) => (
                  <div 
                    key={folder.id} 
                    onClick={() => setActiveFolderId(folder.id)}
                    className="p-10 bg-gray-50/50 rounded-[3rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all group cursor-pointer shadow-sm hover:shadow-xl flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-black text-gold rounded-[2rem] flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform">
                      {folder.icon}
                    </div>
                    <h4 className="font-black text-2xl uppercase text-black tracking-tight mb-2">{folder.name}</h4>
                    <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-[9px] font-black uppercase tracking-widest">{folder.count} LOGGED ITEMS</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              {isTeacher && (
                <div className="bg-gold p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                  <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-6 leading-none">Create Assignment</h3>
                  <p className="text-black/70 text-sm font-bold leading-relaxed mb-10">Transmit instructions and set deadlines for your target grades.</p>
                  <button onClick={() => setIsCreating(true)} className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center space-x-4 hover:bg-white hover:text-black transition-all">
                    <Plus size={20} />
                    <span>INITIALIZE NODE</span>
                  </button>
                </div>
              )}
              <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-10">LATEST UPDATES</h3>
                <div className="space-y-8 text-center text-gray-300 font-bold uppercase text-[10px] tracking-widest italic py-10">No recent activity logged</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentHub;