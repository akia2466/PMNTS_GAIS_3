import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Shield, 
  Filter,
  CheckCircle,
  UserCheck,
  Save,
  X,
  GraduationCap,
  Briefcase,
  Layout,
  Activity,
  ShieldCheck,
  Star,
  HardDrive,
  ChevronDown
} from 'lucide-react';

interface Props {
  user: User;
}

interface ManagedUser {
  id: string;
  name: string;
  role: UserRole;
  dept?: string;
  class?: string;
  status: string;
  email: string;
}

const UserManagement: React.FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<string>('ME');
  const [period, setPeriod] = useState<'TERM' | 'CUMULATIVE'>('TERM');

  const [users, setUsers] = useState<ManagedUser[]>([
    { id: '101', name: 'Dr. Anna Vele', role: UserRole.TEACHER, dept: 'Mathematics', status: 'Active', email: 'a.vele@pomnhs.edu.pg' },
    { id: '102', name: 'James Kari', role: UserRole.STUDENT, class: '12A', status: 'Active', email: 'j.kari@pomnhs.edu.pg' },
    { id: '103', name: 'Ms. Sarah Smith', role: UserRole.HOD, dept: 'Mathematics', status: 'Active', email: 's.smith@pomnhs.edu.pg' },
    { id: '104', name: 'Peter Nambui', role: UserRole.BURSAR, dept: 'Finance', status: 'Active', email: 'accounts@pomnhs.edu.pg' },
  ]);

  const [newUser, setNewUser] = useState<ManagedUser>({
    id: '',
    name: '',
    role: UserRole.STUDENT,
    email: '',
    status: 'Active',
    class: '',
    dept: ''
  });

  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isHOD = user.role === UserRole.HOD;
  const isAdmin = [UserRole.ADMIN, UserRole.SUPER_USER, UserRole.PRINCIPAL].includes(user.role);

  const getSwitcherOptions = () => {
    if (isAdmin) return ['STUDENTS', 'TEACHERS', 'HOD', 'ME'];
    if (isHOD) return ['STUDENTS', 'TEACHERS', 'ME'];
    return ['STUDENTS', 'ME'];
  };

  const roles = ['All Roles', ...Object.values(UserRole)];

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const id = (Math.floor(Math.random() * 900) + 100).toString();
    setUsers([...users, { ...newUser, id }]);
    setIsAddingUser(false);
    setNewUser({ id: '', name: '', role: UserRole.STUDENT, email: '', status: 'Active', class: '', dept: '' });
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to remove this user from the institutional registry?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveEdit = (id: string) => {
    setEditingUserId(null);
  };

  const handleUpdateUser = (id: string, field: keyof ManagedUser, value: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const renderInstitutionalHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      <div className="relative z-10 flex flex-col items-start mb-8 xl:mb-0 xl:max-w-xl">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Users size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Registry Access Control Hub</p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Institutional<br/>
          <span className="text-gold">Registry</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 mb-8">
            <button onClick={() => setIsAddingUser(true)} className="bg-gold text-black px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl hover:bg-white transition-all flex items-center">
              <Plus size={16} className="mr-2" /> Initialize Node
            </button>
            <button className="bg-white/10 text-white px-8 py-3 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
              Security Audit
            </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
            {getSwitcherOptions().map(target => (
              <button key={target} onClick={() => setViewMode(target)} className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-zinc-500 hover:text-white'}`}>
                {target}
              </button>
            ))}
          </div>
          <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl w-fit">
            {['TERM', 'CUMULATIVE'].map(target => (
              <button key={target} onClick={() => setPeriod(target as any)} className={`px-[30px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${period === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-zinc-500 hover:text-white'}`}>
                {target}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4">
         <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] w-full min-w-[276px] shadow-2xl transform hover:scale-105 transition-transform border border-white/10">
            <p className="text-white/80 font-black text-[10px] uppercase tracking-widest mb-4">Registry Integrity %</p>
            <div className="flex items-end space-x-3 mb-8">
               <h3 className="text-7xl font-black text-white tracking-tighter leading-none">100%</h3>
               <div className="bg-green-500/20 px-3 py-1.5 rounded-xl flex items-center space-x-1 mb-1 border border-green-500/30">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span className="text-green-500 font-black text-xs">Secure</span>
               </div>
            </div>
            <div className="pt-6 border-t border-white/10">
               <p className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-2">Authorized Accounts</p>
               <h4 className="text-4xl font-black text-gold">{users.length}</h4>
            </div>
         </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 xl:gap-6">
        {[
          { label: 'STUDENTS', value: users.filter(u => u.role === UserRole.STUDENT).length.toString(), icon: <GraduationCap size={14} className="text-blue-400" /> },
          { label: 'FACULTY', value: users.filter(u => [UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(u.role)).length.toString(), icon: <Briefcase size={14} className="text-green-400" /> },
          { label: 'ADMIN NODES', value: users.filter(u => ![UserRole.STUDENT, UserRole.TEACHER, UserRole.PATRON, UserRole.HOD].includes(u.role)).length.toString(), icon: <Shield size={14} className="text-gold" /> },
          { label: 'UPTIME', value: '99.9%', icon: <Activity size={14} className="text-purple-400" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] w-full sm:w-36 xl:w-44 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group shadow-lg">
             <div className="mb-3 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-xl xl:text-2xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</h4>
             <p className="text-gray-500 text-[7px] font-black uppercase tracking-widest leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {renderInstitutionalHero()}

      {isAddingUser && (
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black uppercase">Create New Profile</h3>
            <button onClick={() => setIsAddingUser(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Full Name</label>
              <input type="text" placeholder="Official Name" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Email Address</label>
              <input type="email" placeholder="id@pomnhs.edu.pg" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Institutional Role</label>
              <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none uppercase" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}>
                {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Assignment (Class or Dept)</label>
              <input type="text" placeholder="e.g. 12A or Math" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none" value={newUser.role === UserRole.STUDENT ? newUser.class : newUser.dept} onChange={e => newUser.role === UserRole.STUDENT ? setNewUser({...newUser, class: e.target.value}) : setNewUser({...newUser, dept: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
             <button onClick={() => setIsAddingUser(false)} className="px-8 py-3 bg-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
             <button onClick={handleAddUser} className="px-8 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black">Save Registry Node</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between bg-gray-50/20 gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search by name, ID or email..." className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-gold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">User Profile</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Institutional Role</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Assignment</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Access Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => {
                const isEditing = editingUserId === u.id;
                return (
                  <tr key={u.id} className={`hover:bg-gray-50/50 transition-all group ${isEditing ? 'bg-gold/5' : ''}`}>
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{u.name.charAt(0)}</div>
                        <div>
                          {isEditing ? (
                            <input type="text" value={u.name} onChange={e => handleUpdateUser(u.id, 'name', e.target.value)} className="bg-white border p-1 rounded font-black text-sm uppercase outline-none focus:border-gold" />
                          ) : (
                            <p className="font-black text-sm uppercase text-black">{u.name}</p>
                          )}
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {isEditing ? (
                        <select className="bg-white border p-1 rounded text-[9px] font-black uppercase outline-none" value={u.role} onChange={e => handleUpdateUser(u.id, 'role', e.target.value as UserRole)}>
                          {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      ) : (
                        <span className="bg-gold/10 text-gold px-3 py-1 rounded-lg text-[9px] font-black uppercase border border-gold/20">
                          {u.role}
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-xs font-bold text-gray-600 uppercase">
                      {isEditing ? (
                        <input type="text" value={u.dept || u.class || ''} onChange={e => handleUpdateUser(u.id, u.role === UserRole.STUDENT ? 'class' : 'dept', e.target.value)} className="bg-white border p-1 rounded text-xs outline-none" />
                      ) : (
                        u.dept || u.class || '--'
                      )}
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center text-green-600 space-x-2">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-black uppercase">{u.status}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {isEditing ? (
                          <button onClick={() => handleSaveEdit(u.id)} className="p-2 bg-black text-gold rounded-lg shadow-sm hover:scale-105 transition-all"><Save size={14}/></button>
                        ) : (
                          <button onClick={() => setEditingUserId(u.id)} className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-gold transition-colors"><Edit2 size={14}/></button>
                        )}
                        <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;