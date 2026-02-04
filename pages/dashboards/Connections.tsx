
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
  ShieldCheck
} from 'lucide-react';

interface Props {
  user: User;
}

const Connections: React.FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const metrics = [
    { label: 'Total Friends/Peers', value: '24', icon: <Users />, bg: 'bg-blue-50' },
    { label: 'Requests Received', value: '3', icon: <UserPlus />, bg: 'bg-gold/10' },
    { label: 'Requests Sent', value: '2', icon: <UserCheck />, bg: 'bg-purple-50' },
    { label: 'Pending Response', value: '5', icon: <Clock />, bg: 'bg-orange-50' },
  ];

  const activeConnections = [
    { name: 'John Smith', grade: 'Grade 12 - Class A' },
    { name: 'Jane Wilson', grade: 'Grade 12 - Class B' },
  ];

  const requests = [
    { name: 'Alex Kila', grade: 'Grade 11 - Class C', type: 'incoming' },
    { name: 'Sarah Gima', grade: 'Grade 12 - Class A', type: 'outgoing' },
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Registry Nodes</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Authorized institutional directory management.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className={`${m.bg} p-8 rounded-[2.5rem] border border-transparent shadow-sm flex flex-col items-center text-center group`}>
            <h3 className="text-3xl font-black text-black mb-2 tracking-tighter">{m.value}</h3>
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest leading-tight">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Your Connections */}
        <section className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50 bg-gray-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter">Your Connections</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search students..." 
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
                  <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase border border-green-100">Connected</span>
                  <button className="p-3 bg-black text-gold rounded-xl hover:bg-gold hover:text-black transition-all shadow-md">
                    <MessageSquare size={16}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requests Section */}
        <section className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50 bg-gray-50/20">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter">Connection Requests</h3>
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
                        <span>Accept</span>
                      </button>
                      <button className="bg-gray-100 text-gray-400 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all border border-gray-200">
                        Decline
                      </button>
                    </>
                  ) : (
                    <button className="bg-white border-2 border-gray-100 text-gray-400 px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all group">
                      <span className="group-hover:hidden">Pending</span>
                      <span className="hidden group-hover:inline">Cancel Request</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Security Footer */}
      <section className="bg-zinc-900 text-white p-12 rounded-[4rem] border border-gold/30 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-bl-[10rem] -z-0" />
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
           <div className="flex items-center space-x-8">
             <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-black shrink-0 shadow-lg"><ShieldCheck size={32} /></div>
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 leading-none">Institutional Security</h3>
                <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest">All connection modifications are logged for audit compliance.</p>
             </div>
           </div>
           <button className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-gold transition-all">Audit Connections</button>
        </div>
      </section>
    </div>
  );
};

export default Connections;
