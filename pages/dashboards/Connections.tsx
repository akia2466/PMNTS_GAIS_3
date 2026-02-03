
import React from 'react';
import { User } from '../../types';
import { 
  Users, 
  Search, 
  UserCheck, 
  UserPlus, 
  Clock, 
  MessageSquare, 
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  // Fix: Added missing Send import
  Send
} from 'lucide-react';

interface Props {
  user: User;
}

const Connections: React.FC<Props> = ({ user }) => {
  const stats = [
    { label: 'Total Friends/Peers', value: '24', icon: <Users size={18} /> },
    { label: 'Requests Received', value: '3', icon: <UserPlus size={18} />, active: true },
    { label: 'Requests Sent', value: '2', icon: <Send size={18} /> },
    { label: 'Pending Response', value: '5', icon: <Clock size={18} /> },
  ];

  const connections = [
    { name: 'John Smith', grade: 'Grade 12 - Class A', avatar: 'https://i.pravatar.cc/150?u=js', initial: 'J' },
    { name: 'Jane Wilson', grade: 'Grade 12 - Class B', avatar: 'https://i.pravatar.cc/150?u=jw', initial: 'J' },
    { name: 'David Tau', grade: 'Grade 12 - Class A', avatar: 'https://i.pravatar.cc/150?u=dt', initial: 'D' },
    { name: 'Mary Vele', grade: 'Grade 11 - Class C', avatar: 'https://i.pravatar.cc/150?u=mv', initial: 'M' },
  ];

  const requests = [
    { name: 'Alex Kila', grade: 'Grade 11 - Class C', avatar: 'https://i.pravatar.cc/150?u=ak', type: 'incoming' },
    { name: 'Sarah Gima', grade: 'Grade 12 - Class A', avatar: 'https://i.pravatar.cc/150?u=sg', type: 'outgoing' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Peer Connections</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Manage your institutional network and peer directory</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="bg-white border-2 border-gray-100 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-gold/30 w-64 shadow-sm"
          />
        </div>
      </div>

      {/* Connection Metrics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((m, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border shadow-sm flex flex-col justify-between group transition-all cursor-pointer ${m.active ? 'bg-gold border-gold text-black shadow-gold/20' : 'bg-white border-gray-100 text-black hover:border-gold'}`}>
            <div className={`p-3 rounded-2xl w-fit mb-8 ${m.active ? 'bg-black text-gold' : 'bg-gray-50 text-gold'}`}>
              {m.icon}
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest ${m.active ? 'text-black/60' : 'text-gray-400'}`}>{m.label}</p>
              <h3 className="text-3xl font-black tracking-tighter">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter">Your Connections</h3>
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sorted by Activity</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-[2rem] border border-transparent hover:border-gold/30 hover:bg-white transition-all group shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img src={c.avatar} className="w-14 h-14 rounded-2xl shadow-md border-2 border-white group-hover:border-gold transition-colors" alt="" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight text-black">{c.name}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{c.grade}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="bg-gold/10 text-gold text-[7px] font-black uppercase px-2 py-0.5 rounded border border-gold/10">Connected</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="p-2.5 bg-white rounded-xl text-black hover:bg-gold transition-all shadow-sm border border-gray-100">
                      <MessageSquare size={16} />
                    </button>
                    <button className="p-2.5 bg-white rounded-xl text-gray-300 hover:text-red-500 transition-all shadow-sm border border-gray-100">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border-2 border-dashed border-gray-100 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black hover:border-gold/50 transition-all">
              Load More Peers
            </button>
          </div>
        </div>

        {/* Connection Management Sidebar */}
        <div className="space-y-8">
          {/* Incoming Requests */}
          <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-xl border border-[#B8860B] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 relative z-10">Connection Requests</h3>
            
            <div className="space-y-6 relative z-10">
              {requests.filter(r => r.type === 'incoming').map((req, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-4">
                    <img src={req.avatar} className="w-12 h-12 rounded-xl border border-white/10" alt="" />
                    <div>
                      <p className="font-black text-xs uppercase tracking-tight leading-none">{req.name}</p>
                      <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">{req.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-gold text-black rounded-lg hover:scale-105 transition-all shadow-lg shadow-gold/20">
                      <Check size={14} />
                    </button>
                    <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-red-500 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Pending Outgoing</p>
                {requests.filter(r => r.type === 'outgoing').map((req, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-4">
                      <img src={req.avatar} className="w-10 h-10 rounded-xl" alt="" />
                      <p className="font-black text-[10px] uppercase tracking-tight">{req.name}</p>
                    </div>
                    <button className="text-[8px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 underline">Cancel Request</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Directory Stats */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center">
              <ShieldCheck size={14} className="mr-2" /> Institutional Privacy
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">Only students from verified Grade 11 and 12 rosters are visible in this directory. Private data is encrypted and hidden by default.</p>
            <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">Online Students</span>
                <span className="text-green-500 font-black">142</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">Active Departments</span>
                <span className="text-black font-black">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
