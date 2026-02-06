import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  Folder, 
  FileText, 
  Search, 
  Download, 
  Plus, 
  HardDrive, 
  ChevronRight,
  Send,
  Upload,
  User as UserIcon,
  Clock,
  History,
  FileUp,
  Mail,
  Filter,
  Activity,
  ChevronDown,
  Users,
  Layout,
  Trophy
} from 'lucide-react';

interface Props { user: User; }

const Vault: React.FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('General');
  const [recipientType, setRecipientType] = useState('Individual');
  const [viewMode, setViewMode] = useState<'ASSETS' | 'ME'>('ME');

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

  const getStatsForHero = () => {
    return [
      { label: 'TOTAL FILES', value: isStudent ? '11' : '42', icon: <FileText size={14} className="text-blue-400" /> },
      { label: 'USED SPACE', value: isStudent ? '20.9 MB' : '450.2 MB', icon: <HardDrive size={14} className="text-green-400" /> },
      { label: 'AVAILABLE', value: '4.9 GB', icon: <Activity size={14} className="text-gold" /> },
      { label: 'SYNC RATE', value: '100%', icon: <Trophy size={14} className="text-purple-400" /> },
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
             {isStudent ? 'Individual Repository Audit' : 'Institutional Repository oversight'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Repository<br/>
          <span className="text-gold">{isStudent ? 'Hub' : 'Registry'}</span>
        </h2>

        {isStudent && (
           <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="relative inline-block group">
                <select className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                  <option className="bg-black">All Folders</option>
                  <option className="bg-black">Academic</option>
                  <option className="bg-black">Shared</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
              </div>
              <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
                Cleanup Assets
              </button>
           </div>
        )}
        
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {(isStudent ? ['FILES', 'ME'] : ['ASSETS', 'ME'] as const).map(target => (
            <button 
              key={target}
              onClick={() => setViewMode(target as any)}
              className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === target 
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

  const folders = [
    { name: 'Mathematics', count: 12, icon: <Folder />, bg: 'bg-blue-100/50' },
    { name: 'Assessments', count: 8, icon: <Folder />, bg: 'bg-purple-100/50' },
    { name: 'Lecture Notes', count: 15, icon: <Folder />, bg: 'bg-green-100/50' },
    { name: 'Past Papers', count: 7, icon: <Folder />, bg: 'bg-orange-100/50' },
  ];

  const sentFiles = [
    { name: 'History Essay.pdf', size: '1.2 MB', sentAt: 'Jan 24, 2026, 10:30 AM', to: 'Ms. Johnson' },
    { name: 'Math Homework.pdf', size: '850 KB', sentAt: 'Jan 22, 2026, 02:15 PM', to: 'Mr. Chen' },
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {renderInstitutionalHero()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase mb-8 tracking-tighter">Asset Folders</h3>
           <div className="grid grid-cols-2 gap-6">
             {folders.map((folder, i) => (
               <div key={i} className={`p-8 rounded-[2.5rem] ${folder.bg} hover:bg-white shadow-sm transition-all cursor-pointer group flex flex-col items-center text-center`}>
                 <Folder className="text-gold mb-6 group-hover:scale-110 transition-transform" size={40} />
                 <h4 className="font-black text-[11px] uppercase tracking-widest mb-1">{folder.name}</h4>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-60">{folder.count} files</p>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-rose-50 p-10 rounded-[3.5rem] border border-transparent shadow-sm">
           <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Transmission Gateway</h3>
           <div className="space-y-6">
              {isTeacher && (
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Recipient Targeting:</label>
                   <div className="flex space-x-2">
                     {['Individual', 'Single Class', 'Whole Grade'].map(type => (
                       <button 
                         key={type}
                         onClick={() => setRecipientType(type)}
                         className={`flex-grow px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${recipientType === type ? 'bg-black text-gold shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:border-gold'}`}
                       >
                         {type}
                       </button>
                     ))}
                   </div>
                </div>
              )}

              <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-gray-400 ml-4">
                   {recipientType === 'Individual' ? 'Select Recipient Node:' : recipientType === 'Single Class' ? 'Select Class:' : 'Select Grade Level:'}
                 </label>
                 <select className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-xs font-black uppercase outline-none focus:ring-2 focus:ring-gold shadow-sm">
                    {recipientType === 'Individual' && (
                      <>
                        <option>Select Node...</option>
                        <option>Joshua Kila (S101)</option>
                        <option>Anna Vele (S102)</option>
                      </>
                    )}
                    {recipientType === 'Single Class' && (
                      <>
                        <option>Grade 12A</option>
                        <option>Grade 12B</option>
                        <option>Grade 11C</option>
                      </>
                    )}
                    {recipientType === 'Whole Grade' && (
                      <>
                        <option>Grade 12</option>
                        <option>Grade 11</option>
                      </>
                    )}
                 </select>
              </div>

              <div className="w-full border-2 border-dashed border-gray-300 rounded-[2.5rem] p-12 flex flex-col items-center justify-center space-y-4 hover:border-gold transition-colors cursor-pointer bg-white/50">
                 <FileUp size={32} className="text-gold" />
                 <p className="text-sm font-black uppercase tracking-widest text-black">Transmit New Asset</p>
                 <button className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest mt-4">Select Files</button>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-cyan-50 p-10 rounded-[3rem] border border-transparent shadow-sm">
         <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8 flex items-center">
            <History size={20} className="mr-3 text-gold" /> Transmission Log
         </h3>
         <div className="space-y-4">
            {sentFiles.map((file, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl shadow-sm border border-transparent hover:border-gold transition-all">
                 <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-sm uppercase text-black">{file.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{file.size} &bull; Sent to {file.to}</p>
                    </div>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-green-100">Delivered</span>
                 </div>
                 <p className="text-[9px] text-gray-300 font-black mt-2 uppercase tracking-widest">{file.sentAt}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Vault;
