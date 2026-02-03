
import React, { useState } from 'react';
import { User, ChatContact, Message } from '../types';
import { CHAT_CONTACTS } from '../constants';
import { Send, Paperclip, MoreVertical, Search, Phone, Video, MessageSquare, Users, UserCheck } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Messenger Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        {[
          { label: 'Unread Messages', value: '12', icon: <MessageSquare /> },
          { label: 'Online Peers', value: '45', icon: <UserCheck /> },
          { label: 'Active Groups', value: '8', icon: <Users /> },
        ].map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-gray-50 rounded-2xl text-gold">{m.icon}</div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{m.label}</p>
              <h3 className="text-xl font-black text-black uppercase">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[calc(100vh-16rem)] bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">Messages</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search contacts..." 
                className="w-full bg-gray-50 border-0 rounded-xl py-2 pl-10 pr-4 text-xs font-bold outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {CHAT_CONTACTS.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 flex items-center space-x-4 cursor-pointer transition-colors ${selectedContact?.id === contact.id ? 'bg-gold/5 border-r-4 border-gold' : 'hover:bg-gray-50'}`}
              >
                <div className="relative">
                  <img src={`https://i.pravatar.cc/150?u=${contact.id}`} className="w-12 h-12 rounded-xl shadow-sm" alt="" />
                  {contact.online && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm truncate">{contact.name}</h4>
                    <span className="text-[10px] text-gray-400 font-bold">10:30 AM</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-[10px] font-black">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col bg-gray-50/30">
          {selectedContact ? (
            <>
              <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={`https://i.pravatar.cc/150?u=${selectedContact.id}`} className="w-12 h-12 rounded-xl shadow-sm" alt="" />
                  <div>
                    <h3 className="font-black text-black uppercase tracking-tight">{selectedContact.name}</h3>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{selectedContact.online ? 'Online Now' : 'Last seen 2h ago'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-400">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Phone size={20} /></button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Video size={20} /></button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical size={20} /></button>
                </div>
              </div>

              <div className="flex-grow p-8 overflow-y-auto custom-scrollbar flex flex-col space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md ${msg.senderId === 'me' ? 'order-1' : 'order-2'}`}>
                      <div className={`p-4 rounded-3xl shadow-sm text-sm ${
                        msg.senderId === 'me' 
                          ? 'bg-black text-white rounded-tr-none' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <p className={`text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 ${msg.senderId === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-2xl">
                  <button className="p-3 text-gray-400 hover:text-gold transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..." 
                    className="flex-grow bg-transparent border-0 focus:ring-0 text-sm font-semibold"
                  />
                  <button 
                    onClick={handleSend}
                    className="bg-gold text-black p-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-gold/20"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-black uppercase mb-2">Select a Contact</h3>
              <p className="text-gray-400 text-sm max-w-xs">Connect with peers, staff, or administration through the school messaging hub.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
