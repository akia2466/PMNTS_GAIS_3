
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
  FileIcon
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
  const [viewingSubmissions, setViewingSubmissions] = useState<{
    id: number;
    title: string;
    class: string;
  } | null>(null);

  // Expanded teacher and patron access roles
  const isTeacher = [
    UserRole.TEACHER, 
    UserRole.PATRON,
    UserRole.HOD, 
    UserRole.PRINCIPAL, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER, 
    UserRole.VENDOR
  ].includes(user.role);

  // Mock Data
  const subjectStats = [
    { name: 'Mathematics', received: 12, submitted: 10, color: 'bg-blue-500', cardBg: 'bg-blue-50' },
    { name: 'Science', received: 8, submitted: 5, color: 'bg-green-500', cardBg: 'bg-green-50' },
    { name: 'Literature', received: 15, submitted: 15, color: 'bg-purple-500', cardBg: 'bg-purple-50' },
    { name: 'Social Science', received: 4, submitted: 2, color: 'bg-orange-500', cardBg: 'bg-orange-50' },
  ];

  const studentTasks = [
    { id: 1, title: 'Calculus Mock Exam Paper 2', subject: 'Mathematics', from: 'Dr. Vele', due: 'Jan 30, 2026', criteria: 'Answer all 4 questions in Section A.', status: 'pending' },
    { id: 2, title: 'Biology Lab Report: Osmosis', subject: 'Science', from: 'Mr. Tau', due: 'Feb 5, 2026', criteria: 'Minimum 2000 words. Include data tables.', status: 'submitted' },
  ];

  const studentSubmissionsHistory = [
    { id: 'sub1', taskTitle: 'Physics Workbook Ch 4', submittedAt: 'Jan 22, 2026', fileName: 'Workbook_Ch4_Vele.pdf', grade: 'A' },
    { id: 'sub2', taskTitle: 'Social Studies Essay', submittedAt: 'Jan 15, 2026', fileName: 'PNG_History_Draft.docx', grade: 'B+' },
  ];

  const teacherSubmissionsMonitor = [
    { id: 1, title: 'Calculus Mock Exam Paper 2', class: 'Grade 12A', pending: 8, graded: 34, total: 42 },
    { id: 2, title: 'Algebra Systems Research', class: 'Grade 12B', pending: 15, graded: 20, total: 35 },
    { id: 3, title: 'Geometry Proofs', class: 'Grade 11C', pending: 3, graded: 42, total: 45 },
  ];

  const mockSubmissionsByClass: Record<number, StudentSubmission[]> = {
    1: [
      { id: '101', studentName: 'Joshua Kila', studentId: 'S101', className: 'Grade 12A', fileName: 'Calculus_Mock_Kila.pdf', fileSize: '2.4MB', submittedAt: 'Jan 28, 10:15 AM', status: 'graded' },
      { id: '102', studentName: 'Anna Vele', studentId: 'S102', className: 'Grade 12A', fileName: 'Mock_Exam_Anna.pdf', fileSize: '1.8MB', submittedAt: 'Jan 28, 11:30 AM', status: 'pending' },
      { id: '103', studentName: 'Peter Gere', studentId: 'S103', className: 'Grade 12A', fileName: 'SectionA_B_Gere.pdf', fileSize: '3.1MB', submittedAt: 'Jan 27, 04:45 PM', status: 'graded' },
    ]
  };

  const renderSubmissionFolder = () => {
    if (!viewingSubmissions) return null;
    const subs = mockSubmissionsByClass[viewingSubmissions.id] || [];

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setViewingSubmissions(null)}
              className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center space-x-3">
                <Folder className="text-gold" size={24} fill="currentColor" />
                <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">
                  {viewingSubmissions.class} / {viewingSubmissions.title}
                </h3>
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                Viewing {subs.length} Student Submissions
              </p>
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all flex items-center">
            <Download size={16} className="mr-2" /> Bulk Download
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subs.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:border-gold hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black text-gold rounded-xl flex items-center justify-center font-black text-sm">
                    {s.studentName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black truncate w-32">{s.studentName}</h4>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">ID: {s.studentId}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${s.status === 'graded' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {s.status}
                </span>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-6 group-hover:bg-gold/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileIcon className="text-gray-400 group-hover:text-gold" size={20} />
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-black text-black truncate">{s.fileName}</p>
                    <p className="text-[9px] text-gray-400 font-bold">{s.fileSize}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-gray-400 mb-6">
                <span>Submitted:</span>
                <span className="text-black">{s.submittedAt}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-black text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Grade Now</button>
                <button className="bg-white border border-gray-100 text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-gold transition-all">View File</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCreateForm = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-black text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gold text-black rounded-2xl flex items-center justify-center">
                <Plus size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Issue New Assessment</h3>
                <p className="text-gold font-bold uppercase tracking-widest text-[9px]">Targeting Institutional Students</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCreating(false)}
              className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-10 custom-scrollbar space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Assessment Title</label>
                <input type="text" placeholder="e.g. Unit 4 Final Project" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-gold outline-none shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subject</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-[11px] font-black uppercase outline-none shadow-sm">
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English Literature</option>
                  <option>Social Science</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Project Description / Context</label>
              <textarea 
                rows={4}
                placeholder="Describe the objective of this assignment..."
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-6 text-sm font-bold focus:ring-2 focus:ring-gold outline-none shadow-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Assessment Criteria</label>
              <textarea 
                rows={3}
                placeholder="List the criteria for a high score (Grading Rubric)..."
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-6 text-sm font-bold focus:ring-2 focus:ring-gold outline-none shadow-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Due Date</label>
                <div className="relative">
                  <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-gold outline-none shadow-sm" />
                  <Calendar size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Target Class</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-[11px] font-black uppercase outline-none shadow-sm">
                  <option>Grade 12A</option>
                  <option>Grade 12B</option>
                  <option>Grade 11C</option>
                  <option>All Grade 12</option>
                </select>
              </div>
            </div>

            <div className="p-10 border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/50 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-gold hover:bg-white transition-all">
              <Upload size={32} className="text-gray-300 group-hover:text-gold mb-4" />
              <p className="text-sm font-black uppercase tracking-widest text-black">Optional: Attach Master Document</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Assignment sheets, prompts or source files</p>
            </div>
          </div>

          <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-4">
            <button 
              onClick={() => setIsCreating(false)}
              className="px-10 py-5 bg-white border border-gray-200 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
            >
              Cancel
            </button>
            <button className="px-12 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-gold hover:text-black transition-all">
              Dispatch Assessment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTeacherView = () => (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Teacher Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Assessments Issued', value: '14', icon: <Briefcase />, bg: 'bg-black text-white' },
          { label: 'Files Received', value: '412', icon: <FileText />, bg: 'bg-blue-50 text-blue-600' },
          { label: 'Pending Grade', value: '26', icon: <Clock />, bg: 'bg-orange-50 text-orange-600' },
          { label: 'Grade Progress', value: '94%', icon: <Activity />, bg: 'bg-gold/10 text-gold' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           {/* Submissions Folders */}
           <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-black text-black uppercase tracking-tighter border-l-4 border-gold pl-6">Submissions Monitor</h3>
               <div className="flex space-x-2">
                 <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors"><Search size={16}/></button>
                 <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors"><Filter size={16}/></button>
               </div>
             </div>
             
             <div className="space-y-4">
                {teacherSubmissionsMonitor.map((task) => (
                   <div 
                    key={task.id} 
                    onClick={() => setViewingSubmissions(task)}
                    className="p-8 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all cursor-pointer group flex items-center justify-between"
                  >
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
                      <div className="flex items-center space-x-12">
                         <div className="text-center">
                            <p className="text-[8px] font-black uppercase text-gray-400 mb-1">To Grade</p>
                            <p className="text-xl font-black text-red-500">{task.pending}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Completed</p>
                            <p className="text-xl font-black text-green-500">{task.graded}</p>
                         </div>
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
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-8 leading-tight">Prepare & Issue Assessment</h3>
              <p className="text-black/60 text-sm font-bold leading-relaxed mb-8">Define criteria, set deadlines, and transmit instructions to your target grades without needing mandatory files.</p>
              <button 
                onClick={() => setIsCreating(true)}
                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3"
              >
                <Plus size={20} />
                <span>Create Assessment</span>
              </button>
           </div>

           <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-lg font-black text-black uppercase tracking-tight mb-8">Recent Submissions</h3>
             <div className="space-y-6">
                {[
                  { name: 'Samuel Kapu', time: '12 mins ago', task: 'Linear Algebra', class: '12A' },
                  { name: 'Sarah Gima', time: '1 hour ago', task: 'Linear Algebra', class: '12A' },
                  { name: 'John Doe', time: '3 hours ago', task: 'Calculus Mock', class: '12B' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-xs text-black">{act.name.charAt(0)}</div>
                    <div>
                      <p className="text-[11px] font-black uppercase text-black">{act.name} <span className="text-gray-400 font-bold ml-1">submitted</span></p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{act.task} &bull; {act.time}</p>
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
                   <p className="text-[8px] font-black uppercase text-gray-400 mb-1">To Do</p>
                   <p className="text-lg font-black text-black">{s.received}</p>
                </div>
                <div className="w-[1px] h-8 bg-gray-200" />
                <div className="text-center">
                   <p className="text-[8px] font-black uppercase text-gray-400 mb-1 text-gold">Sent</p>
                   <p className="text-lg font-black text-black">{s.submitted}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter">Current Tasks</h3>
              <div className="px-4 py-1 bg-gold/10 rounded-full text-[9px] font-black uppercase text-gold">2 Pending</div>
           </div>
           <div className="space-y-6">
              {studentTasks.map((task) => (
                 <div key={task.id} className="p-8 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all group shadow-sm">
                    <div className="flex items-start space-x-6 mb-6">
                       <div className="p-4 bg-black text-gold rounded-2xl group-hover:rotate-12 transition-transform shadow-lg"><FileText size={24} /></div>
                       <div className="flex-grow">
                          <h4 className="font-black text-base uppercase tracking-tight text-black">{task.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Subject: {task.subject} &bull; Instructor: {task.from}</p>
                       </div>
                       {task.status === 'submitted' && <CheckCircle className="text-green-500" size={24} />}
                    </div>
                    
                    <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 mb-6">
                       <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Instructions / Criteria:</p>
                       <p className="text-xs font-bold text-gray-600 leading-relaxed italic">"{task.criteria}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                       <div className="flex items-center space-x-2 text-[10px] text-red-500 font-black uppercase">
                          <Clock size={14} />
                          <span>Due: {task.due}</span>
                       </div>
                       <div className="flex space-x-3">
                          <button className="bg-black text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Submit Work</button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-black text-white p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group border border-gold/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center">
                 <History size={24} className="mr-3 text-gold" /> My Submission History
              </h3>
              <div className="space-y-4">
                 {studentSubmissionsHistory.map((sub) => (
                    <div key={sub.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-gold transition-all group/sub">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                             <div className="p-3 bg-zinc-800 rounded-xl text-gold"><Download size={16}/></div>
                             <div>
                                <h4 className="font-black text-xs uppercase tracking-tight group-hover/sub:text-gold transition-colors">{sub.taskTitle}</h4>
                                <p className="text-[9px] text-gray-500 font-bold mt-1 uppercase">{sub.fileName}</p>
                             </div>
                          </div>
                          <span className="w-10 h-10 bg-gold text-black rounded-xl flex items-center justify-center font-black text-xs">{sub.grade}</span>
                       </div>
                       <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Logged: {sub.submittedAt}</p>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gold transition-all shadow-xl">
                 Request Full Transcript
              </button>
           </div>

           <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8 flex items-center">
                <AlertCircle size={20} className="mr-3 text-gold" /> Hub Instructions
             </h3>
             <div className="space-y-6 text-gray-500 text-xs font-bold leading-relaxed">
                <p>1. Teachers may set assessments as pure instructions without master files.</p>
                <p>2. Ensure all submissions are in PDF format unless specified otherwise.</p>
                <p>3. Once submitted, your work is logged into the class folder for your instructor's review.</p>
                <p>4. Late submissions will be flagged by the institutional registry.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      {!viewingSubmissions && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Assignment Hub</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {isTeacher ? 'Institutional Grading Protocol' : 'Academic Task Registry'} &bull; Term 1 2024
            </p>
          </div>
          {isTeacher && (
             <button 
              onClick={() => setIsCreating(true)}
              className="bg-gold text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center"
             >
               <Plus size={18} className="mr-2" /> Issue New Assessment
             </button>
          )}
        </div>
      )}
      
      {isCreating && renderCreateForm()}
      {viewingSubmissions ? renderSubmissionFolder() : (isTeacher ? renderTeacherView() : renderStudentView())}
    </div>
  );
};

export default AssignmentHub;
