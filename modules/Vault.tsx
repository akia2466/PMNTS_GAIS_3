
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
  Users
} from 'lucide-react';

interface Props { user: User; }

const Vault: React.FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('General');
  const [recipientType, setRecipientType] = useState('Individual');

  // Teacher functionality roles
  const isTeacher = [
    UserRole.TEACHER, 
    UserRole.HOD, 
    UserRole.PRINCIPAL, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER, 
    UserRole.VENDOR
  ].includes(user.role);

  const metrics = [
    { label: 'Total Files', value: isTeacher ? '42' : '11', icon: <FileText />, bg: 'bg-blue-50' },
    { label: 'Storage Used', value: isTeacher ? '450.2 MB' : '20.9 MB', icon: <HardDrive />, bg: 'bg-purple-50' },
    { label: 'Storage Available', value: '4.9 GB', icon: <Activity />, bg: 'bg-green-50' },
  ];

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
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Institutional Repository</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Manage encrypted {user.role.toLowerCase()} assets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className={`${m.bg} p-10 rounded-[3rem] border border-transparent shadow-sm flex items-center space-x-6 group`}>
            <div className="p-4 bg-white rounded-2xl text-gold shadow-sm">{m.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{m.label}</p>
              <h3 className="text-3xl font-black text-black uppercase tracking-tighter">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

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
                   {recipientType === 'Individual' ? 'Select Student/User:' : recipientType === 'Single Class' ? 'Select Class:' : 'Select Grade Level:'}
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
