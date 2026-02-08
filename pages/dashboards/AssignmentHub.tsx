import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  FileText, 
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
  Check,
  Save,
  Target,
  Eye,
  BookOpen,
  ChevronDown,
  BarChart3,
  UserPlus,
  Users2,
  Camera,
  Image as ImageIcon
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
  const [regMode, setRegMode] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  const [viewMode, setViewMode] = useState<string>('TASKS'); 
  const [targetRole, setTargetRole] = useState<string>('STUDENTS');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [generatedId, setGeneratedId] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [gradingStudent, setGradingStudent] = useState<StudentSubmission | null>(null);
  const [viewingFile, setViewingFile] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Role Checks
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isAdmissions = user.role === UserRole.ADMISSIONS;
  const isAdmin = user.role === UserRole.ADMIN;
  const isSuperUser = user.role === UserRole.SUPER_USER;
  
  // Roles that use the Registration interface instead of the Assignment interface
  const isRegistrationView = [
    UserRole.ADMISSIONS, 
    UserRole.PRINCIPAL, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER
  ].includes(user.role);

  const isTeacher = [UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(user.role) || isPrincipal || isAdmin || isSuperUser;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;

  // Auto-ID Generation for Registration roles
  useEffect(() => {
    if (isRegistrationView) {
      const prefix = regMode === 'STUDENT' ? 'STU-' : 'TEA-';
      setGeneratedId(prefix + Math.floor(100000 + Math.random() * 900000).toString());
    }
  }, [regMode, isRegistrationView]);

  // --- ADMISSIONS / REGISTRATION UI ---

  const renderAdmissionsInput = (label: string, placeholder: string = '', type: string = 'text', colSpan: string = 'col-span-1') => (
    <div className={`space-y-2 ${colSpan}`}>
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none transition-all uppercase" />
    </div>
  );

  const renderSectionTitle = (title: string) => (
    <div className="flex items-center space-x-4 mb-8">
      <div className="w-1.5 h-8 bg-gold rounded-full" />
      <h3 className="text-xl font-black uppercase tracking-tight text-black">{title}</h3>
    </div>
  );

  const renderRegistrationView = () => (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Hero Summary Section for Registration Roles */}
      <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
        <div className="relative z-10 flex flex-col items-start">
          <div className="flex items-center space-x-3 mb-5">
             <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg"><UserPlus size={20} /></div>
             <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Institutional Admissions Registry</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            Registration<br/><span className="text-gold">Portal</span>
          </h2>
          
          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
            {(['STUDENT', 'TEACHER'] as const).map(target => (
              <button key={target} onClick={() => setRegMode(target)} className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${regMode === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-zinc-500 hover:text-white'}`}>
                {target} REGISTRATION
              </button>
            ))}
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-4 xl:gap-6">
          {[
            { label: 'APPLICATIONS', value: '840', icon: <UserPlus size={14} className="text-blue-400" /> },
            { label: 'VERIFIED', value: '210', icon: <CheckCircle size={14} className="text-green-400" /> },
            { label: 'QUEUE SIZE', value: '142', icon: <Clock size={14} className="text-gold" /> },
            { label: 'PROCESS SPEED', value: '2.4d', icon: <BarChart3 size={14} className="text-purple-400" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group shadow-lg">
               <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
               <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
               <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm p-12 lg:p-20">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <div className="max-w-xl">
             <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">{regMode} ENROLLMENT FORM</h2>
             <p className="text-gray-400 font-bold text-sm leading-relaxed">Official institutional entry protocol. Ensure all registry fields are populated according to Government standards.</p>
             <div className="mt-8 flex items-center space-x-4">
                <div className="px-6 py-2 bg-black text-gold rounded-xl font-black text-[10px] uppercase tracking-widest">AUTO-ID GENERATED</div>
                <div className="text-2xl font-black tracking-tighter text-black">{generatedId}</div>
             </div>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-48 bg-gray-50 border-4 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center text-gray-300 relative group overflow-hidden cursor-pointer hover:border-gold transition-all">
                {profileImage ? (
                  <img src={profileImage} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera size={32} className="mb-2 group-hover:text-gold transition-colors" />
                    <span className="text-[9px] font-black uppercase">Upload Profile Photo</span>
                  </>
                )}
             </div>
             <p className="mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Official Photo Required</p>
          </div>
        </div>

        <form className="space-y-16">
          {/* General Information */}
          <section>
            {renderSectionTitle('General Information')}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderAdmissionsInput('First Name', 'GIVEN NAME')}
              {renderAdmissionsInput('Last Name', 'SURNAME')}
              {renderAdmissionsInput('Middle Name (Optional)', 'IF APPLICABLE')}
              {renderAdmissionsInput('Date of Birth', '', 'date')}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Gender</label>
                <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none">
                  <option>MALE</option>
                  <option>FEMALE</option>
                  <option>OTHER</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Marital Status</label>
                <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none">
                  <option>SINGLE</option>
                  <option>MARRIED</option>
                  <option>DIVORCED</option>
                </select>
              </div>
              {renderAdmissionsInput('Place of Origin', 'PROVINCE/CITY')}
              {renderAdmissionsInput('Residential Address', 'PHYSICAL LOCATION', 'text', 'md:col-span-2')}
              {renderAdmissionsInput('Postal Address', 'PO BOX / PRIVATE BAG', 'text', 'md:col-span-3')}
            </div>
          </section>

          {/* Educational Information */}
          <section>
            {renderSectionTitle('Educational Information')}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {renderAdmissionsInput('Last School Attended', 'PREVIOUS INSTITUTION', 'text', 'md:col-span-2')}
              {renderAdmissionsInput('Last Grade Completed', 'e.g. GRADE 10')}
              {renderAdmissionsInput('Which Primary School Did You Attend?', 'PRIMARY NAME')}
              {renderAdmissionsInput('What Year', 'YYYY')}
              {renderAdmissionsInput('Name Of Teacher/Patron', 'LEAD REFERENCE')}
              {renderAdmissionsInput('GPA', '0.00')}
              {renderAdmissionsInput('Percentage', '0%')}
              <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-gray-50">
                 {renderAdmissionsInput('English Score', '0-100')}
                 {renderAdmissionsInput('Mathematics Score', '0-100')}
                 {renderAdmissionsInput('Science Score', '0-100')}
                 {renderAdmissionsInput('Social Science Score', '0-100')}
                 {renderAdmissionsInput('Arts Score', '0-100')}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            {renderSectionTitle('Contact Information')}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderAdmissionsInput('Primary Email Address', 'official@mail.com', 'email')}
              {renderAdmissionsInput('Primary Mobile Number', '+675 XXXX XXXX')}
              {renderAdmissionsInput('Landline Number', 'XXXX XXXX')}
              {renderAdmissionsInput('Whatsapp Number', '+675 XXXX XXXX')}
              {renderAdmissionsInput('Viber Number', '+675 XXXX XXXX')}
              {renderAdmissionsInput('Place of Origin', 'PROVINCE/CITY')}
              {renderAdmissionsInput('Residential Address', 'PHYSICAL LOCATION', 'text', 'md:col-span-2')}
              {renderAdmissionsInput('Postal Address', 'PO BOX / PRIVATE BAG', 'text', 'md:col-span-3')}
            </div>
          </section>

          {/* Health & Safety */}
          <section>
            {renderSectionTitle('Health & Safety Information')}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Medical Condition</label>
                 <textarea className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none h-32 resize-none uppercase" placeholder="DESCRIBE CONDITIONS..." />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Allergies</label>
                 <textarea className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none h-32 resize-none uppercase" placeholder="LIST ALLERGIES..." />
              </div>
              {renderAdmissionsInput('Medication', 'CURRENT PRESCRIBED MEDS')}
              {renderAdmissionsInput('Immunization Status', 'UP TO DATE / PENDING')}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Gender</label>
                <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none">
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>
              {renderAdmissionsInput('Place of Origin', 'PROVINCE/CITY')}
              {renderAdmissionsInput('Residential Address', 'PHYSICAL LOCATION', 'text', 'md:col-span-2')}
              {renderAdmissionsInput('Postal Address', 'PO BOX / PRIVATE BAG', 'text', 'md:col-span-2')}
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            {renderSectionTitle('Emergency Contact Information')}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderAdmissionsInput('First Name', 'CONTACT NAME')}
              {renderAdmissionsInput('Last Name', 'SURNAME')}
              {renderAdmissionsInput('Middle Name (Optional)', 'IF APPLICABLE')}
              {renderAdmissionsInput('Relationship', 'e.g. PARENT/GUARDIAN')}
              {renderAdmissionsInput('Primary Mobile Number', '+675 XXXX XXXX')}
              {renderAdmissionsInput('Secondary Mobile Number', '+675 XXXX XXXX')}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Gender</label>
                <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none">
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-12 border-t border-gray-100 flex justify-end space-x-6">
             <button type="reset" className="px-12 py-5 bg-white border-2 border-gray-100 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:border-red-500 hover:text-red-500 transition-all">Clear Registry</button>
             <button type="button" className="px-16 py-5 bg-black text-gold rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-gold hover:text-black transition-all flex items-center space-x-3">
                <Check size={20} />
                <span>FINALIZE REGISTRATION</span>
             </button>
          </div>
        </form>
      </div>
    </div>
  );

  // --- ORIGINAL ASSIGNMENT HUB UI (FOR ALL OTHER USERS) ---

  const getSwitcherOptions = () => {
    const isAdminGeneral = [UserRole.PRINCIPAL, UserRole.ADMIN, UserRole.SUPER_USER].includes(user.role);
    if (isAdminGeneral) return ['STUDENTS', 'STAFF', 'ME'];
    if (isHOD) return ['STUDENTS', 'TEACHERS', 'ME'];
    return ['STUDENTS', 'ME'];
  };

  const getStats = () => {
    if (isStudent) return [
      { label: 'TO DO', value: '4', icon: <Clock size={14} className="text-blue-400" /> },
      { label: 'DONE', value: '12', icon: <CheckCircle size={14} className="text-green-400" /> },
      { label: 'AVG GRADE', value: 'A-', icon: <Trophy size={14} className="text-gold" /> },
      { label: 'URGENT', value: '1', icon: <AlertCircle size={14} className="text-red-400" /> },
    ];
    if (isPrincipal) return [
      { label: 'INSTITUTIONAL NODES', value: '1,240', icon: <FileText size={14} className="text-blue-400" /> },
      { label: 'COMPLETION INDEX', value: '92%', icon: <CheckCircle size={14} className="text-green-400" /> },
      { label: 'AUDIT COMPLIANCE', value: '100%', icon: <Clock size={14} className="text-gold" /> },
      { label: 'AVG SYSTEM SCORE', value: 'B+', icon: <BarChart3 size={14} className="text-purple-400" /> },
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

  // --- FINAL CONDITIONAL RETURN ---

  if (isRegistrationView) return renderRegistrationView();

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
              {isTeacher && !isRegistrationView && (
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