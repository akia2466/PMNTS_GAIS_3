import React, { useState } from 'react';
import { User, ChatContact, Message, UserRole } from '../types';
import { CHAT_CONTACTS } from '../constants';
import { Send, Paperclip, MoreVertical, Search, Phone, Video, MessageSquare, Users, UserCheck, Layout, ChevronDown, Activity, ShieldCheck } from 'lucide-react';

interface Props {
  user: User;
}

const Messenger: React.FC<Props> = ({ user }) => {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(CHAT_CONTACTS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'c1', text: 'Hey, do you have the notes from today\'s physics lab?', timestamp: '10:30 AM' },
    { id: '2', senderId: 'me', text: 'Yeah, I just uploaded them to the Vault actually.', timestamp: '10:35 AM' },
    { id: '3', senderId: 'c1', text: 'Awesome, thanks a lot! See you at the library later?', timestamp: '10:36 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [viewMode, setViewMode] = useState<'PEERS' | 'ARCHIVE'>('PEERS');

  const isStudent = user.role === UserRole.STUDENT;

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true&format=svg`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderStudentHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Secure Transmission Hub</p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Messenger<br/>
          <span className="text-gold">Hub</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 mb-8">
            <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
              New Message
            </button>
            <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
              Privacy Audit
            </button>
         </div>
        
        {/* Toggle Controls */}
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {['PEERS', 'ARCHIVE'].map(target => (
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
        {[
          { label: 'UNREAD MSGS', value: '12', icon: <MessageSquare size={14} className="text-blue-400" /> },
          { label: 'ACTIVE PEERS', value: '45', icon: <UserCheck size={14} className="text-green-400" /> },
          { label: 'SECURE NODES', value: '8', icon: <ShieldCheck size={14} className="text-gold" /> },
          { label: 'DATA RATE', value: '1GB/s', icon: <Activity size={14} className="text-purple-400" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {isStudent && renderStudentHero()}

      {!isStudent && (
        <>
          <div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Peer-to-Peer Transmission</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Secure encrypted messaging between POMNHS nodes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            {[
              { label: 'Unread Transmission', value: '12', icon: <MessageSquare />, bg: 'bg-blue-50' },
              { label: 'Active Peers', value: '45', icon: <UserCheck />, bg: 'bg-green-50' },
              { label: 'Nodes Active', value: '8', icon: <Users />, bg: 'bg-purple-50' },
            ].map((m, i) => (
              <div key={i} className={`${m.bg} p-6 rounded-3xl border border-transparent shadow-sm flex items-center space-x-4`}>
                <div className="p-3 bg-white rounded-2xl text-gold shadow-sm">{m.icon}</div>
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{m.label}</p>
                  <h3 className="text-xl font-black text-black uppercase">{m.value}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={`h-[calc(100vh-${isStudent ? '20rem' : '22rem'})] bg-slate-100 p-2 rounded-[3rem] shadow-lg border border-transparent flex overflow-hidden`}>
        <div className="w-80 bg-white border-r border-gray-100 flex flex-col rounded-l-[2.5rem]">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">Contacts</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Filter nodes..." className="w-full bg-gray-50 border-0 rounded-xl py-2 pl-10 text-xs font-bold focus:ring-1 focus:ring-gold shadow-inner" />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {CHAT_CONTACTS.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 flex items-center space-x-4 cursor-pointer transition-all ${selectedContact?.id === contact.id ? 'bg-gold/10 border-r-4 border-gold' : 'hover:bg-gray-50'}`}
              >
                <img src={getAvatarUrl(contact.name)} className="w-12 h-12 rounded-xl border-2 border-white shadow-sm" alt="" />
                <div className="flex-grow overflow-hidden">
                  <h4 className="font-black text-[11px] uppercase tracking-tight truncate text-black">{contact.name}</h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5 font-bold italic">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-grow flex flex-col bg-white rounded-r-[2.5rem]">
          {selectedContact ? (
            <>
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={getAvatarUrl(selectedContact.name)} className="w-12 h-12 rounded-xl shadow-sm" alt="" />
                  <div>
                    <h3 className="font-black text-black uppercase tracking-tight text-sm">{selectedContact.name}</h3>
                    <span className="text-[10px] text-green-500 font-black uppercase flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />Active</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow p-8 overflow-y-auto custom-scrollbar flex flex-col space-y-6 bg-slate-50/20">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-4 rounded-3xl shadow-sm text-[13px] font-bold ${msg.senderId === 'me' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type encrypted message..." 
                    className="flex-grow bg-transparent border-0 focus:ring-0 text-xs font-black uppercase"
                  />
                  <button onClick={handleSend} className="bg-gold text-black p-3 rounded-xl shadow-lg hover:scale-105 transition-all"><Send size={20} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center bg-white"><p className="text-gray-300 font-black uppercase tracking-widest text-xs">Select Node to Transmit</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
