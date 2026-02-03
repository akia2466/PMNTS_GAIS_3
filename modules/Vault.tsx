
import React, { useState } from 'react';
import { User } from '../types';
import { Folder, FileText, Search, Filter, Download, Plus, Send, HardDrive, ChevronRight } from 'lucide-react';

interface Props {
  user: User;
}

const Vault: React.FC<Props> = ({ user }) => {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Institutional Files</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Manage and organize your academic course materials and personal research assets.</p>
        </div>
        <button className="bg-gold text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 shadow-lg shadow-gold/20 hover:scale-105 transition-all">
          <Plus size={18} />
          <span>Upload File</span>
        </button>
      </div>

      {/* Storage Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Files', value: '1', icon: <FileText /> },
          { label: 'Storage Used', value: '20.9 MB', icon: <HardDrive /> },
          { label: 'Storage Available', value: '4.9 GB', icon: <HardDrive /> },
        ].map((m, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-center space-x-6 group hover:border-gold transition-all">
            <div className="p-4 bg-gray-50 rounded-2xl text-gold group-hover:scale-110 transition-transform shadow-inner">{m.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 leading-none">{m.label}</p>
              <h3 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-3 space-y-8">
          {/* Folders Grid */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-black uppercase mb-8 tracking-tighter">Academic Folders</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Mathematics', count: '5 files' },
                { name: 'Literature', count: '3 files' },
                { name: 'Science', count: '4 files' },
                { name: 'Social Science', count: '2 files' },
              ].map((folder, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveFolder(folder.name)}
                  className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer group flex flex-col items-center text-center ${
                    activeFolder === folder.name ? 'bg-black text-white border-gold shadow-xl' : 'bg-gray-50 border-transparent hover:border-gold hover:bg-white shadow-sm'
                  }`}
                >
                  <Folder className={`${activeFolder === folder.name ? 'text-gold' : 'text-gold'} mb-6 group-hover:scale-110 transition-transform`} size={40} />
                  <h4 className="font-black text-[11px] uppercase tracking-widest mb-1 leading-tight">{folder.name}</h4>
                  <p className={`text-[9px] font-black uppercase tracking-widest opacity-60`}>{folder.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Files Table */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter">Repository Directory</h3>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search files..." 
                    className="bg-gray-50 border-0 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-gold/30 shadow-inner w-64"
                  />
                </div>
                <button className="bg-gray-50 p-3 rounded-2xl text-gray-400 border border-gray-100 shadow-sm hover:text-black transition-colors">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Resource Name</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Size</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Format</th>
                    <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition-all group cursor-pointer">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-6">
                        <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                          <FileText size={28} />
                        </div>
                        <div>
                          <span className="text-base font-black text-black uppercase tracking-tight group-hover:text-gold transition-colors">Welcome_Packet.pdf</span>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 opacity-70">Modified: 27/01/2026</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-[11px] text-gray-400 font-black uppercase tracking-widest">2.4 MB</td>
                    <td className="px-10 py-8">
                      <span className="bg-black text-gold text-[9px] font-black uppercase px-3 py-1 rounded-lg">PDF Asset</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-3 text-gray-300 hover:text-gold hover:bg-black rounded-2xl transition-all shadow-sm">
                        <Download size={20} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* History Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group hover:border-gold transition-all">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-black uppercase tracking-tighter">Sent Assets</h3>
                <div className="p-3 bg-gold text-black rounded-2xl shadow-lg shadow-gold/20 group-hover:rotate-12 transition-transform">
                  <Send size={20} />
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'History Essay.pdf', info: '1.2 MB • Sent: Jan 24, 2026', to: 'Ms. Johnson' },
                  { name: 'Math Homework.pdf', info: '850 KB • Sent: Jan 22, 2026', to: 'Mr. Chen' },
                ].map((file, i) => (
                  <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0 group/item cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="font-black text-sm text-black uppercase tracking-tight group-hover/item:text-gold transition-colors leading-tight">{file.name}</p>
                      <ChevronRight size={16} className="text-gray-300 group-hover/item:text-gold transition-colors" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mt-2 tracking-widest opacity-60">{file.info}</p>
                    <p className="text-[9px] text-gold font-black uppercase tracking-[0.2em] mt-3 bg-gold/5 inline-block px-3 py-1 rounded-full border border-gold/10">To: {file.to}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group hover:border-blue-500 transition-all">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-black uppercase tracking-tighter">Received Assets</h3>
                <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                  <Download size={20} />
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'Exam Guide.pdf', info: '3.5 MB • Received: Jan 25, 2026', from: 'Dr. Williams' },
                  { name: 'Reading List.docx', info: '420 KB • Received: Jan 23, 2026', from: 'Ms. Smith' },
                ].map((file, i) => (
                  <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0 group/item cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="font-black text-sm text-black uppercase tracking-tight group-hover/item:text-blue-500 transition-colors leading-tight">{file.name}</p>
                      <Download size={16} className="text-gray-300 group-hover/item:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mt-2 tracking-widest opacity-60">{file.info}</p>
                    <p className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] mt-3 bg-blue-500/5 inline-block px-3 py-1 rounded-full border border-blue-500/10">From: {file.from}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel: Transmit */}
        <div className="space-y-8">
          <div className="bg-black text-white p-10 rounded-[3rem] shadow-xl border border-[#B8860B] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold opacity-5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 relative z-10 leading-none">Files <br/><span className="text-gold">Transmission</span></h3>
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Recipient Registry</label>
                <select className="w-full bg-white/10 border-2 border-white/5 rounded-2xl p-5 text-[11px] font-black uppercase outline-none focus:ring-1 focus:ring-gold appearance-none cursor-pointer hover:bg-white/20 transition-all">
                  <option className="bg-black">Select Staff / Peer</option>
                  <option className="bg-black">Ms. Johnson (English)</option>
                  <option className="bg-black">Mr. Chen (Math)</option>
                  <option className="bg-black">Dr. Williams (Physics)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Select Asset</label>
                <div className="w-full h-48 border-2 border-dashed border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 cursor-pointer hover:border-gold/50 hover:bg-white/5 transition-all group/upload shadow-inner">
                  <Plus className="text-gold mb-4 group-hover/upload:scale-125 transition-transform" size={40} />
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 leading-relaxed">Drop Institutional File <br/> or <span className="text-gold">Browse Archive</span></p>
                </div>
              </div>
              <button className="w-full bg-gold text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-white transition-all text-[11px] flex items-center justify-center space-x-4 shadow-xl shadow-gold/20 active:scale-95 group/btn">
                <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                <span>Transmit</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full opacity-50" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center relative z-10">
               <HardDrive size={18} className="mr-3 text-gold" /> Cloud Storage
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-bold relative z-10">All files uploaded to the Institutional Cloud are encrypted. Ensure file naming follows the standards for rapid departmental indexing.</p>
            <div className="mt-10 pt-8 border-t border-gray-50 space-y-4 relative z-10">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">Usage Progress</span>
                  <span className="text-black">0.42%</span>
               </div>
               <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                  <div className="w-[1%] h-full bg-gold shadow-sm" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
