import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageSquare, 
  UserCheck, 
  Clock, 
  Check, 
  ShieldCheck, 
  Layout, 
  ChevronDown, 
  Activity, 
  Trophy 
} from 'lucide-react';

interface Props {
  user: User;
}

const Connections: React.FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'NETWORK' | 'LOG'>('NETWORK');

  const isAdminRole = [
    UserRole.PRINCIPAL, 
    UserRole.HOD, 
    UserRole.BURSAR, 
    UserRole.ADMISSIONS, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER
  ].includes(user.role);

  const activeConnections = [
    { name: 'John Smith', grade: 'Grade 12 - Class A' },
    { name: 'Jane Wilson', grade: 'Grade 12 - Class B' },
  ];

  const requests = [
    { name: 'Alex Kila', grade: 'Grade 11 - Class C', type: 'incoming' },
    { name: 'Sarah Gima', grade: 'Grade 12 - Class A', type: 'outgoing' },
  ];

  const getHeroStats = () => {
    if (isAdminRole) {
      return [
        { label: 'TOTAL NODES', value: '1,240', icon: <Users size={14} className="text-blue-400" /> },
        { label: 'PENDING AUDITS', value: '14', icon: <Clock size={14} className="text-gold" /> },
        { label: 'OUTGOING SYNC', value: '98%', icon: <UserPlus size={14} className="text-green-400" /> },
        { label: 'SEC. INDEX', value: '9.8', icon: <ShieldCheck size={14} className="text-purple-400" /> },
      ];
    }
    return [
      { label: 'PEER NODES', value: '24', icon: <Users size={14} className="text-blue-400" /> },
      { label: 'PENDING', value: '3', icon: <Clock size={14} className="text-green-400" /> },
      { label: 'OUTGOING', value: '2', icon: <UserPlus size={14} className="text-gold" /> },
      { label: 'SECURITY', value: '100%', icon: <ShieldCheck size={14} className="text-purple-400" /> },
    ];
  };

  const renderHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0 xl:max-w-xl">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">
             {isAdminRole ? 'Institutional Node Management' : 'Registry Node Registry'}
           </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Registry<br/>
          <span className="text-gold">Nodes</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 mb-8">
            <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
              {isAdminRole ? 'Audit Directory' : 'Search Directory'}
            </button>
            <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
              Security Protocol
            </button>
         </div>
        
        {/* Toggle Controls */}
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {['NETWORK', 'LOG'].map(target => (
            <button 
              key={target}
              onClick={() => setViewMode(target as any)}
              className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
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

      {/* Right Content - Stat Grid - Adjusted for balance after removing Integrity card */}
      <div className="relative z-10 grid grid-cols-2 gap-4 xl:gap-6">
        {getHeroStats().map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-40 flex flex-col items-start hover:bg-white/10 transition-colors group shadow-lg">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      {renderHero()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50 bg-gray-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter">
              {isAdminRole ? 'Institutional Directory' : 'Your Connections'}
            </h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search registry..." 
                className="bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-[9px] font-black uppercase outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
          <div className="divide-y divide-gray-50 flex-grow">
            {activeConnections.map((c, i) => (
              <div key={i} className="p-8 hover:bg-gray-50/50 transition-all flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-black text-gold rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">{c.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-black text-lg uppercase text-black leading-none mb-1">{c.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{c.grade}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase border border-green-100">Verified Node</span>
                  <button className="p-3 bg-black text-gold rounded-xl hover:bg-gold hover:text-black transition-all shadow-md">
                    <MessageSquare size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50 bg-gray-50/20">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter">
              {isAdminRole ? 'Recent Registry Requests' : 'Connection Requests'}
            </h3>
          </div>
          <div className="divide-y divide-gray-50 flex-grow">
            {requests.map((r, i) => (
              <div key={i} className="p-8 hover:bg-gray-50/50 transition-all flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gray-100 text-black border border-gray-200 rounded-2xl flex items-center justify-center font-black text-xl">{r.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-black text-lg uppercase text-black leading-none mb-1">{r.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{r.grade}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {r.type === 'incoming' ? (
                    <>
                      <button className="bg-black text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-sm flex items-center space-x-2">
                        <Check size={12}/>
                        <span>Approve</span>
                      </button>
                      <button className="bg-gray-100 text-gray-400 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all border border-gray-200">
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className="bg-white border-2 border-gray-100 text-gray-400 px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all group">
                      <span className="group-hover:hidden">Pending Admin Review</span>
                      <span className="hidden group-hover:inline">Cancel Audit</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Connections;