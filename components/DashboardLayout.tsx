
import React from 'react';
import { User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Rss, 
  Files, 
  Calendar, 
  LogOut, 
  Bell, 
  Search,
  ChevronDown,
  BarChart3,
  Briefcase,
  ClipboardCheck,
  UserPlus,
  Users2
} from 'lucide-react';

interface Props {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  logout: () => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ user, activeTab, setActiveTab, logout, children }) => {
  const isPrincipal = user.role === UserRole.PRINCIPAL;

  const baseMenuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'performance', label: 'Performance', icon: <BarChart3 size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck size={20} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} /> },
    { id: 'assignments', label: 'Assignments', icon: <Briefcase size={20} /> },
    { id: 'files', label: 'Files', icon: <Files size={20} /> },
    { id: 'messenger', label: 'Messenger', icon: <MessageSquare size={20} /> },
    { id: 'community', label: 'Community', icon: <Rss size={20} /> },
    { id: 'connections', label: 'Connections', icon: <UserPlus size={20} /> },
  ];

  // Filtering logic for Principal
  let menuItems = baseMenuItems;
  if (isPrincipal) {
    menuItems = baseMenuItems.filter(item => item.id !== 'assignments');
    menuItems.splice(1, 0, { id: 'users', label: 'User Management', icon: <Users2 size={20} /> });
  }

  return (
    <div className="flex h-screen bg-[#F8F8F8] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-black text-white flex flex-col hidden lg:flex border-r border-[#B8860B]/30 shrink-0">
        <div className="p-8 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-gold/20">P</div>
          <h1 className="text-xl font-heading font-extrabold tracking-tighter leading-none uppercase">POMNHS</h1>
        </div>

        <nav className="flex-grow px-4 mt-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-4 mb-4">Institutional Portal</p>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-gold text-black font-bold shadow-lg shadow-gold/20' 
                    : 'text-gray-400 hover:text-gold hover:bg-white/5'
                }`}
              >
                <span className={`${activeTab === item.id ? 'text-black' : 'group-hover:text-gold'}`}>
                  {item.icon}
                </span>
                <span className="text-xs uppercase tracking-widest font-black leading-none">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-white/5 pt-8">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-4 mb-4">User Settings</p>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold uppercase tracking-wider text-xs"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        <div className="p-6">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 group cursor-pointer hover:border-gold/50 transition-colors">
            <div className="flex items-center space-x-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-gold shadow-md" alt="Profile" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-white uppercase tracking-tight">{user.name}</p>
                <p className="text-[9px] text-gold font-bold uppercase tracking-widest opacity-80">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-grow flex flex-col relative overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center space-x-4 flex-grow max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search resources, users, or files..."
                className="w-full bg-gray-50 border-0 rounded-full py-2.5 pl-12 pr-4 text-[10px] font-black uppercase focus:ring-2 focus:ring-gold/50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer hover:scale-110 transition-transform">
              <Bell className="text-gray-500" size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold border-2 border-white rounded-full text-[8px] flex items-center justify-center font-bold text-black shadow-sm">3</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-black uppercase tracking-tight group-hover:text-gold transition-colors leading-none">{user.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">ID: {user.id}0429</p>
              </div>
              <img src={user.avatar} className="w-10 h-10 rounded-xl shadow-md border-2 border-transparent group-hover:border-gold transition-all" alt="Avatar" />
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto custom-scrollbar p-8 bg-[#F8F8F8]">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
