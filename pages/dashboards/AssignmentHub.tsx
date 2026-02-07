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
  ChevronDown,
  Briefcase,
  History,
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
  Users,
  Target,
  PlusCircle,
  Trash2,
  Eye,
  FileIcon
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

interface Criterion {
  id: string;
  label: string;
  weight: number;
}

const AssignmentHub: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'ME'>('STUDENTS'); 
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<any | null>(null);
  const [gradingStudent, setGradingStudent] = useState<StudentSubmission | null>(null);
  const [viewingFile, setViewingFile] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Creation Form State
  const [createForm, setCreateForm] = useState({
    title: '',
    instructions: '',
    targetClass: 'GRADE 12A',
    deadline: '',
    criteria: [{ id: '1', label: '', weight: 0 }]
  });

  const isTeacher = [
    UserRole.TEACHER, 
    UserRole.PATRON,
    UserRole.HOD, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER
  ].includes(user.role);
  const isStudent = user.role === UserRole.STUDENT;

  const classFolders = [
    { id: '12A', name: 'GRADE 12A', count: 5 },
    { id: '12B', name: 'GRADE 12B', count: 3 },
    { id: '11C', name: 'GRADE 11C', count: 4 },
  ];

  const assignmentsByClass: Record<string, any[]> = {
    '12A': [
      { id: 1, title: 'Calculus Mock Exam Paper 2', class: 'GRADE 12A', folders: 42, pending: 8, graded: 34 },
      { id: 4, title: 'Trigonometric Identities', class: 'GRADE 12A', folders: 42, pending: 42, graded: 0 },
    ],
    '12B': [
      { id: 2, title: 'Algebra Systems Research', class: 'GRADE 12B', folders: 35, pending: 15, graded: 20 },
    ],
    '11C': [
      { id: 3, title: 'Geometry Proofs', class: 'GRADE 11C', folders: 45, pending: 3, graded: 42 },
    ]
  };

  const mockSubmissions: StudentSubmission[] = [
    { id: '1', name: 'JOSHUA KILA', studentId: 'S101', initial: 'J', status: 'graded', fileName: 'Calculus_Mock_Kila.pdf', fileSize: '2.4MB', submittedAt: 'JAN 28, 10:15 AM' },
    { id: '2', name: 'ANNA VELE', studentId: 'S102', initial: 'A', status: 'pending', fileName: 'Mock_Exam_Anna.pdf', fileSize: '1.8MB', submittedAt: 'JAN 28, 11:30 AM' },
    { id: '3', name: 'PETER GERE', studentId: 'S103', initial: 'P', status: 'graded', fileName: 'SectionA_B_Gere.pdf', fileSize: '3.1MB', submittedAt: 'JAN 27, 04:45 PM' },
  ];

  const recentSubmissions = [
    { name: 'JOSHUA KILA', status: 'GRADED', subject: 'MATHEMATICS', time: '2H AGO' },
    { name: 'ANNA VELE', status: 'PENDING', subject: 'PHYSICS', time: '5H AGO' },
    { name: 'PETER GERE', status: 'GRADED', subject: 'ENGLISH', time: '1D AGO' },
    { name: 'SARAH GIMA', status: 'PENDING', subject: 'MATHEMATICS', time: '2D AGO' },
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
      { label: 'AVG GRADE', value: 'B+', icon: <Trophy size={14} className="text-gold" /> },
      { label: 'PENDING', value: '12%', icon: <Clock size={14} className="text-gold" /> },
      { label: 'COMPLETED', value: '88%', icon: <CheckCircle size={14} className="text-purple-400" /> },
    ];
  };

  const handleAddCriterion = () => {
    setCreateForm({
      ...createForm,
      criteria: [...createForm.criteria, { id: Date.now().toString(), label: '', weight: 0 }]
    });
  };

  const handleRemoveCriterion = (id: string) => {
    setCreateForm({
      ...createForm,
      criteria: createForm.criteria.filter(c => c.id !== id)
    });
  };

  const renderGradingForm = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
           <div>
             <h3 className="text-xl font-black text-black uppercase tracking-tight">Grading Node: {gradingStudent?.name}</h3>
             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Assessment: {selectedAssessment?.title}</p>
           </div>
           <button onClick={() => setGradingStudent(null)} className="p-3 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: 'Accuracy & Technicality', weight: '40%' },
                { label: 'Structure & Flow', weight: '30%' },
                { label: 'Presentation & Visuals', weight: '20%' },
                { label: 'Critical Thinking', weight: '10%' },
              ].map((c, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex justify-between items-center px-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-black">{c.label}</label>
                     <span className="text-[9px] font-bold text-gold uppercase">{c.weight}</span>
                   </div>
                   <input 
                     type="number" 
                     placeholder="0 - 100" 
                     className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black focus:ring-1 focus:ring-gold outline-none" 
                   />
                </div>
              ))}
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Master Feedback / Remarks</label>
              <textarea 
                placeholder="Enter formal institutional feedback for this node..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-semibold focus:ring-1 focus:ring-gold outline-none h-32 resize-none" 
              />
           </div>
        </div>
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
           <button onClick={() => setGradingStudent(null)} className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel Audit</button>
           <button onClick={() => { alert('Grade node submitted to registry.'); setGradingStudent(null); }} className="px-10 py-3 bg-black text-gold rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black shadow-xl transition-all flex items-center space-x-2">
              <Check size={16} />
              <span>Commit Grade</span>
           </button>
        </div>
      </div>
    </div>
  );

  const renderFileViewer = () => (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/90 p-4 lg:p-10 animate-in fade-in duration-300">
       <button onClick={() => setViewingFile(null)} className="absolute top-6 right-6 lg:top-10 lg:right-10 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"><X size={32}/></button>
       <div className="w-full h-full max-w-5xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center"><FileIcon size={20}/></div>
              <div>
                <h3 className="font-black text-sm uppercase text-black">{viewingFile}</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Authenticated Secure Node Viewer</p>
              </div>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Download Copy</button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center text-center p-20 bg-[#F8F8F8]">
            <div className="w-24 h-24 bg-gold/10 rounded-3xl flex items-center justify-center text-gold mb-8 animate-pulse">
               <Eye size={48} />
            </div>
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-4">Node Content Preview</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed mb-10 italic">Secure visualization of <span className="text-black font-bold">{viewingFile}</span>. Internal PDF rendering engine is currently active for this session.</p>
            <div className="w-full max-w-2xl bg-white h-64 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Institutional Data Stream Active</p>
            </div>
          </div>
       </div>
    </div>
  );

  const renderCreateModal = () => (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 bg-black text-gold rounded-2xl flex items-center justify-center">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-black uppercase tracking-tight leading-none">Create New Assignment</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Institutional Instruction Gateway</p>
            </div>
          </div>
          <button onClick={() => setIsCreating(false)} className="p-3 hover:bg-gray-200 rounded-full text-gray-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 flex-grow overflow-y-auto custom-scrollbar space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Assignment Title</label>
                <input 
                  type="text" 
                  value={createForm.title}
                  onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                  placeholder="e.g. Calculus Mock Exam Paper 2" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Target Grade/Class</label>
                <select 
                  value={createForm.targetClass}
                  onChange={(e) => setCreateForm({...createForm, targetClass: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none appearance-none transition-all"
                >
                  {classFolders.map(cf => <option key={cf.id}>{cf.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Submission Deadline</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={createForm.deadline}
                    onChange={(e) => setCreateForm({...createForm, deadline: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none transition-all"
                  />
                  <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Master Instructions</label>
                <textarea 
                  value={createForm.instructions}
                  onChange={(e) => setCreateForm({...createForm, instructions: e.target.value})}
                  placeholder="Provide detailed instruction nodes for the students..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-5 text-sm font-semibold focus:ring-2 focus:ring-gold outline-none h-[228px] resize-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black flex items-center">
                <Target size={16} className="mr-2 text-gold" /> Grading Criteria Definitions
              </h4>
              <button 
                onClick={handleAddCriterion}
                className="text-[10px] font-black text-gold uppercase tracking-widest flex items-center hover:underline"
              >
                <PlusCircle size={14} className="mr-2" /> Add Node
              </button>
            </div>
            
            <div className="space-y-4">
              {createForm.criteria.map((c, idx) => (
                <div key={c.id} className="flex items-center space-x-4 animate-in slide-in-from-left-4 duration-300">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      placeholder="Criterion Name (e.g. Accuracy)" 
                      className="w-full bg-white border border-gray-100 rounded-xl p-3 text-[11px] font-bold outline-none focus:ring-1 focus:ring-gold"
                      value={c.label}
                      onChange={(e) => {
                        const newCriteria = [...createForm.criteria];
                        newCriteria[idx].label = e.target.value;
                        setCreateForm({...createForm, criteria: newCriteria});
                      }}
                    />
                  </div>
                  <div className="w-24">
                    <input 
                      type="number" 
                      placeholder="Weight %" 
                      className="w-full bg-white border border-gray-100 rounded-xl p-3 text-[11px] font-bold text-center outline-none focus:ring-1 focus:ring-gold"
                      value={c.weight || ''}
                      onChange={(e) => {
                        const newCriteria = [...createForm.criteria];
                        newCriteria[idx].weight = parseInt(e.target.value) || 0;
                        setCreateForm({...createForm, criteria: newCriteria});
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => handleRemoveCriterion(c.id)}
                    className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Node Status: Local Draft</p>
           <div className="flex space-x-4">
              <button 
                onClick={() => { alert('Form draft saved successfully.'); setIsCreating(false); }}
                className="px-10 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center space-x-3 shadow-sm"
              >
                <Save size={18} />
                <span>Save Draft</span>
              </button>
              <button 
                onClick={() => { alert('Assignment transmitted to all target nodes.'); setIsCreating(false); }}
                className="px-12 py-4 bg-black text-gold rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center space-x-3 shadow-xl"
              >
                <Send size={18} />
                <span>Transmit To Students</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
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

  const renderSubmissionsDrilldown = () => (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-20 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <button onClick={() => setSelectedAssessment(null)} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold transition-all shadow-sm">
            <ArrowLeft size={20}/>
          </button>
          <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black">
                <Folder size={20} fill="currentColor" />
             </div>
             <div>
               <h3 className="text-2xl font-black uppercase tracking-tight text-black flex items-center">
                 {selectedAssessment.class} / {selectedAssessment.title}
               </h3>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">VIEWING {mockSubmissions.length} STUDENT SUBMISSIONS</p>
             </div>
          </div>
        </div>
        <button className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center space-x-3 hover:bg-gold hover:text-black transition-all">
          <ArrowDownToLine size={18} />
          <span>BULK DOWNLOAD</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockSubmissions.map((sub) => (
          <div key={sub.id} className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl p-10 hover:shadow-2xl transition-all group">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                   <div className="w-14 h-14 bg-black text-gold rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                     {sub.initial}
                   </div>
                   <div>
                     <h4 className="font-black text-lg uppercase text-black leading-none mb-1">{sub.name}</h4>
                     <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">ID: {sub.studentId}</p>
                   </div>
                </div>
                <span className={`px-4 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shadow-sm ${
                  sub.status === 'graded' ? 'bg-green-50 text-green-500 border-green-100' : 'bg-orange-50 text-orange-500 border-orange-100'
                }`}>
                  {sub.status}
                </span>
             </div>

             <div className="bg-gray-50/80 p-6 rounded-[2rem] flex items-center space-x-6 border border-gray-100 mb-8 hover:bg-white hover:border-gold/30 transition-all cursor-pointer">
                <div className="bg-white p-3 rounded-xl shadow-sm text-gray-300">
                   <FileText size={24} />
                </div>
                <div className="overflow-hidden">
                   <p className="font-black text-[11px] text-black uppercase truncate">{sub.fileName}</p>
                   <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{sub.fileSize}</p>
                </div>
             </div>

             <div className="flex items-center justify-between mb-8 px-2">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">SUBMITTED:</p>
                <p className="text-[9px] font-black text-black uppercase tracking-widest">{sub.submittedAt}</p>
             </div>

             <div className="flex space-x-3">
                <button 
                  onClick={() => setGradingStudent(sub)}
                  className="flex-grow bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all"
                >
                  GRADE NOW
                </button>
                <button 
                  onClick={() => setViewingFile(sub.fileName)}
                  className="flex-grow bg-white border border-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-gold hover:text-black transition-all"
                >
                  VIEW FILE
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Integrate Grading Form and File Viewer modals */}
      {gradingStudent && renderGradingForm()}
      {viewingFile && renderFileViewer()}
    </div>
  );

  const renderClassAssignmentList = () => {
    const list = assignmentsByClass[activeClassId!] || [];
    return (
      <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
        <div className="flex items-center space-x-6">
          <button onClick={() => setActiveClassId(null)} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold transition-all shadow-sm">
            <ArrowLeft size={20}/>
          </button>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-black leading-none">Grade {activeClassId} Assignments</h3>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Institutional Subfolder Registry</p>
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
                    {task.class} &bull; <span className="text-gold">{task.folders} FOLDERS</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-12">
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">TO GRADE</p>
                  <p className="text-2xl font-black text-red-500">{task.pending}</p>
                </div>
                <div className="text-center border-l border-gray-100 pl-12">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">COMPLETED</p>
                  <p className="text-2xl font-black text-green-500">{task.graded}</p>
                </div>
                <button 
                  onClick={() => setSelectedAssessment(task)}
                  className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 group-hover:bg-gold group-hover:text-black group-hover:border-transparent transition-all shadow-md"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTeacherView = () => (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {selectedAssessment ? renderSubmissionsDrilldown() : activeClassId ? renderClassAssignmentList() : (
        <>
          {renderInstitutionalHero()}
          
          {viewMode === 'STUDENTS' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative">
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black text-black uppercase tracking-tighter flex items-center">
                      <span className="w-1 h-6 bg-gold mr-4 rounded-full" />
                      SUBMISSIONS MONITOR
                    </h3>
                    <div className="flex items-center space-x-3">
                      <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors shadow-sm"><Search size={18}/></button>
                      <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gold transition-colors shadow-sm"><Filter size={18}/></button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {classFolders.map((folder) => (
                       <div 
                        key={folder.id} 
                        onClick={() => setActiveClassId(folder.id)}
                        className="p-10 bg-gray-50/50 rounded-[3rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all group cursor-pointer shadow-sm hover:shadow-xl flex flex-col items-center text-center"
                       >
                          <div className="w-24 h-24 bg-black text-gold rounded-[2rem] flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform">
                            <Folder size={48} fill="currentColor" />
                          </div>
                          <h4 className="font-black text-2xl uppercase text-black tracking-tight mb-2">{folder.name}</h4>
                          <div className="flex items-center space-x-3">
                            <span className="px-4 py-1.5 bg-gold text-black rounded-full text-[9px] font-black uppercase tracking-widest">{folder.count} SUBFOLDERS</span>
                            <div className="p-2 bg-white rounded-lg text-gray-300 group-hover:text-gold transition-colors shadow-inner">
                              <ChevronRight size={14} />
                            </div>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gold p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group border border-gold">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-bl-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
                  <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-6 leading-none uppercase">Create Assignment</h3>
                  <p className="text-black/70 text-sm font-bold leading-relaxed mb-10">Define criteria, set deadlines, and transmit instructions to your target grades without needing mandatory files.</p>
                  <button 
                    onClick={() => setIsCreating(true)}
                    className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center space-x-4 hover:bg-white hover:text-black transition-all transform active:scale-95"
                  >
                    <Plus size={20} />
                    <span>TRANSMIT NOW</span>
                  </button>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
                   <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-10">RECENT SUBMISSIONS</h3>
                   <div className="space-y-8">
                     {recentSubmissions.map((sub, i) => (
                       <div key={i} className="flex items-center space-x-6 group">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-xs text-black border border-gray-100 shadow-sm">{sub.name.charAt(0)}</div>
                          <div className="flex-grow overflow-hidden">
                             <div className="flex items-center space-x-3 mb-1">
                                <h4 className="font-black text-[10px] text-black tracking-tight">{sub.name}</h4>
                                <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest">{sub.status}</span>
                             </div>
                             <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center">
                                {sub.subject} &bull; <span className="ml-2 font-black text-gray-300">{sub.time}</span>
                             </p>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center bg-white rounded-[3.5rem] border border-gray-100">
               <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Viewing My Personal Task Logs</p>
            </div>
          )}
        </>
      )}
      {isCreating && renderCreateModal()}
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