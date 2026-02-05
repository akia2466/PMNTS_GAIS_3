
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
  Briefcase
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">User Management</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Institutional Identity Control Registry
          </p>
        </div>
        <button 
          onClick={() => setIsAddingUser(true)}
          className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all flex items-center"
        >
          <Plus size={18} className="mr-2" /> Add Institutional User
        </button>
      </div>

      {isAddingUser && (
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black uppercase">Create New Profile</h3>
            <button onClick={() => setIsAddingUser(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Full Name</label>
              <input 
                type="text" placeholder="Official Name" 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none"
                value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Email Address</label>
              <input 
                type="email" placeholder="id@pomnhs.edu.pg" 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none"
                value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Institutional Role</label>
              <select 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none uppercase"
                value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
              >
                {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-400 ml-4">Assignment (Class or Dept)</label>
              <input 
                type="text" placeholder="e.g. 12A or Math" 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-gold outline-none"
                value={newUser.role === UserRole.STUDENT ? newUser.class : newUser.dept} 
                onChange={e => newUser.role === UserRole.STUDENT ? setNewUser({...newUser, class: e.target.value}) : setNewUser({...newUser, dept: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
             <button onClick={() => setIsAddingUser(false)} className="px-8 py-3 bg-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
             <button onClick={handleAddUser} className="px-8 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black">Save Registry Node</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: users.length.toString(), icon: <Users size={20} />, color: 'bg-blue-50' },
          { label: 'Student Users', value: users.filter(u => u.role === UserRole.STUDENT).length.toString(), icon: <GraduationCap size={20} />, color: 'bg-green-50' },
          { label: 'Faculty Users', value: users.filter(u => u.role === UserRole.TEACHER || u.role === UserRole.HOD).length.toString(), icon: <Briefcase size={20} />, color: 'bg-purple-50' },
          { label: 'Staff Users', value: users.filter(u => ![UserRole.STUDENT, UserRole.TEACHER, UserRole.HOD].includes(u.role)).length.toString(), icon: <Shield size={20} />, color: 'bg-gold/10' },
        ].map((m, i) => (
          <div key={i} className={`${m.color} p-8 rounded-[2.5rem] border border-transparent shadow-sm flex flex-col items-center text-center group`}>
            <div className="p-3 bg-white rounded-xl mb-4 shadow-sm">{m.icon}</div>
            <h3 className="text-2xl font-black text-black tracking-tighter">{m.value}</h3>
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest leading-tight mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between bg-gray-50/20 gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, ID or email..."
              className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
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
                            <input 
                              type="text" value={u.name} 
                              onChange={e => handleUpdateUser(u.id, 'name', e.target.value)}
                              className="bg-white border p-1 rounded font-black text-sm uppercase outline-none focus:border-gold"
                            />
                          ) : (
                            <p className="font-black text-sm uppercase text-black">{u.name}</p>
                          )}
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {isEditing ? (
                        <select 
                          className="bg-white border p-1 rounded text-[9px] font-black uppercase outline-none"
                          value={u.role} onChange={e => handleUpdateUser(u.id, 'role', e.target.value as UserRole)}
                        >
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
                        <input 
                          type="text" value={u.dept || u.class || ''} 
                          onChange={e => handleUpdateUser(u.id, u.role === UserRole.STUDENT ? 'class' : 'dept', e.target.value)}
                          className="bg-white border p-1 rounded text-xs outline-none"
                        />
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
                        {/* Fixed error: changed handleDeleteUser(id) to handleDeleteUser(u.id) */}
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
