
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Calendar,
  Edit3,
  Save,
  ChevronRight,
  BarChart as BarChartIcon,
  Target,
  Users,
  CheckCircle,
  Trophy,
  ChevronDown,
  ArrowLeft,
  X,
  User as UserIcon,
  PlusCircle,
  ChevronUp,
  Layout,
  Trash2,
  Users2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface Props {
  user: User;
}

interface StudentGrade {
  id: string;
  name: string;
  score: number;
  total: number;
}

interface ClassPerformance {
  id: string;
  name: string;
  grade: string;
  avg: string;
  studentCount: number;
  color: string;
  sectionBg: string;
  icon: string;
  leadTeacher?: string;
  assessments: any[];
}

const Performance: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDept, setSelectedDept] = useState('Mathematics');
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'TEACHERS' | 'HOD'>('STUDENTS');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [drilldownClassId, setDrilldownClassId] = useState<string | null>(null);
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isHOD = user.role === UserRole.HOD;
  const isStaff = [UserRole.TEACHER, UserRole.HOD, UserRole.PRINCIPAL, UserRole.ADMIN, UserRole.SUPER_USER, UserRole.VENDOR].includes(user.role);

  const departments = ['Mathematics', 'Natural Science', 'Humanities', 'Fine Arts'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  const [classes, setClasses] = useState<ClassPerformance[]>([
    { id: 'c1', name: 'Grade 12A', grade: 'B+', avg: '87%', studentCount: 43, color: 'bg-blue-500', sectionBg: 'bg-blue-50/50', icon: '12A', leadTeacher: 'Dr. Michael Chen', assessments: [{ type: 'Calculus Mock', date: 'Jan 15', score: '82/100', percentage: '82%', grade: 'B', rawTotal: 100 }] },
    { id: 'c2', name: 'Grade 12B', grade: 'B', avg: '82%', studentCount: 39, color: 'bg-indigo-500', sectionBg: 'bg-indigo-50/50', icon: '12B', leadTeacher: 'Ms. Sarah Smith', assessments: [{ type: 'Unit Test 1', date: 'Jan 18', score: '80/100', percentage: '80%', grade: 'B', rawTotal: 100 }] },
  ]);

  const [newClass, setNewClass] = useState<Partial<ClassPerformance>>({ name: '', grade: '12', leadTeacher: '', color: 'bg-black' });

  const mockStudents: StudentGrade[] = [
    { id: 'S101', name: 'Joshua Kila', score: 82, total: 100 },
    { id: 'S102', name: 'Anna Vele', score: 91, total: 100 },
    { id: 'S103', name: 'Peter Gere', score: 75, total: 100 },
    { id: 'S104', name: 'Sarah Gima', score: 88, total: 100 },
    { id: 'S105', name: 'Samuel Kapu', score: 64, total: 100 },
  ];

  const handleAddClass = () => {
    const id = 'c' + Date.now();
    const c: ClassPerformance = {
      id,
      name: newClass.name || 'New Class',
      grade: '-',
      avg: '0%',
      studentCount: 0,
      color: newClass.color || 'bg-black',
      sectionBg: 'bg-gray-50/50',
      icon: newClass.name?.split(' ')[1] || '?',
      leadTeacher: newClass.leadTeacher,
      assessments: []
    };
    setClasses([...classes, c]);
    setIsAddingClass(false);
  };

  const handleDeleteClass = (id: string) => {
    if (confirm('Permanently remove this class node from institutional records?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const handleUpdateClass = (id: string, field: keyof ClassPerformance, value: any) => {
    setClasses(classes.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const renderPrincipalPerformanceHub = () => {
    if (drilldownClassId) {
      const cls = classes.find(c => c.id === drilldownClassId);
      return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="flex items-center space-x-6">
            <button onClick={() => setDrilldownClassId(null)} className="p-3 bg-white border rounded-2xl hover:bg-gold transition-all shadow-sm"><ArrowLeft/></button>
            <div>
               <h3 className="text-3xl font-black uppercase">{cls?.name} Student Registry</h3>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lead Instructor: {cls?.leadTeacher}</p>
            </div>
          </div>
          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Profile</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Current Average</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockStudents.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-all group">
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{s.name.charAt(0)}</div>
                        <p className="font-black text-sm uppercase text-black">{s.name}</p>
                      </div>
                    </td>
                    <td className="px-10 py-6 font-black text-gold">{s.score}%</td>
                    <td className="px-10 py-6 text-right">
                      <button className="text-[9px] font-black uppercase text-gray-400 hover:text-black">Audit Portfolio</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        {/* Principal Global Summary */}
        <div className="bg-black text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group border border-[#B8860B]/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-bl-[15rem] group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
               <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gold text-black p-3 rounded-xl shadow-lg shadow-gold/20"><Layout size={24}/></div>
                  <h3 className="text-gold font-black uppercase tracking-[0.3em] text-[11px]">Performance Registry oversight</h3>
               </div>
               <h2 className="text-7xl font-black tracking-tighter leading-none mb-6">Master <span className="text-gold">Analytics</span></h2>
               <div className="flex bg-white/10 p-2 rounded-2xl backdrop-blur-md w-fit mb-4">
                  {(['STUDENTS', 'TEACHERS', 'HOD'] as const).map(target => (
                    <button 
                      key={target}
                      onClick={() => setViewMode(target)}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-white'}`}
                    >
                      {target}
                    </button>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
               {[
                 { label: 'System GPA', value: '3.42', icon: <Target size={16}/>, color: 'text-blue-500' },
                 { label: 'Pass Rate', value: '96.2%', icon: <CheckCircle size={16}/>, color: 'text-green-500' },
                 { label: 'Active HODs', value: '4/4', icon: <Users size={16}/>, color: 'text-gold' },
                 { label: 'Rank', value: '#1 Nat', icon: <Trophy size={16}/>, color: 'text-purple-500' },
               ].map((stat, i) => (
                 <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                   <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                   <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                   <p className="text-[10px] font-black uppercase text-gray-500 mt-1">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between bg-gray-50/20 gap-4">
            <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0">
               <h3 className="text-2xl font-black text-black uppercase tracking-tighter shrink-0">Dept Switcher</h3>
               <div className="flex space-x-2">
                  {departments.map(d => (
                    <button 
                      key={d} 
                      onClick={() => setSelectedDept(d)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${selectedDept === d ? 'bg-black text-gold shadow-lg shadow-black/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      {d}
                    </button>
                  ))}
               </div>
            </div>
            <button 
              onClick={() => setIsAddingClass(true)}
              className="bg-gold text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center shrink-0"
            >
              <PlusCircle size={18} className="mr-2" /> New Class Node
            </button>
          </div>

          {isAddingClass && (
            <div className="p-10 bg-gold/5 border-b animate-in slide-in-from-top duration-300">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input type="text" placeholder="Class Name (e.g. 12C)" className="p-4 rounded-xl border outline-none font-bold text-sm" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} />
                  <input type="text" placeholder="Lead Instructor" className="p-4 rounded-xl border outline-none font-bold text-sm" value={newClass.leadTeacher} onChange={e => setNewClass({...newClass, leadTeacher: e.target.value})} />
                  <div className="flex space-x-4">
                    <button onClick={handleAddClass} className="bg-black text-white px-8 rounded-xl font-black text-[10px] uppercase tracking-widest">Register Node</button>
                    <button onClick={() => setIsAddingClass(false)} className="px-8 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white border">Cancel</button>
                  </div>
               </div>
            </div>
          )}

          <div className="p-10">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Viewing <span className="text-gold">{viewMode}</span> Performance Matrix: <span className="text-black">{selectedDept}</span></p>
             <div className="grid grid-cols-1 gap-8">
                {classes.map((cls, idx) => {
                  const isEditing = editingClassId === cls.id;
                  return (
                    <div key={idx} className={`bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 hover:border-gold transition-all group flex flex-col md:flex-row items-center justify-between ${isEditing ? 'bg-gold/5 ring-1 ring-gold' : ''}`}>
                       <div className="flex items-center space-x-8 mb-6 md:mb-0">
                          <div 
                            onClick={() => setDrilldownClassId(cls.id)}
                            className={`w-20 h-20 ${cls.color} rounded-[2rem] flex items-center justify-center font-black text-2xl text-white shadow-xl cursor-pointer hover:scale-110 transition-transform`}
                          >
                            {cls.icon}
                          </div>
                          <div>
                            {isEditing ? (
                              <input 
                                type="text" value={cls.name} 
                                onChange={e => handleUpdateClass(cls.id, 'name', e.target.value)}
                                className="bg-white border p-1 rounded-lg text-2xl font-black uppercase text-black mb-1"
                              />
                            ) : (
                              <h4 
                                onClick={() => setDrilldownClassId(cls.id)}
                                className="text-3xl font-black uppercase text-black tracking-tighter leading-none mb-1 cursor-pointer hover:text-gold transition-colors"
                              >
                                {cls.name}
                              </h4>
                            )}
                            {isEditing ? (
                              <input 
                                type="text" value={cls.leadTeacher || ''} 
                                onChange={e => handleUpdateClass(cls.id, 'leadTeacher', e.target.value)}
                                className="bg-white border p-1 rounded text-[11px] outline-none"
                              />
                            ) : (
                              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Lead: {cls.leadTeacher} &bull; {cls.studentCount} Nodes</p>
                            )}
                          </div>
                       </div>
                       <div className="flex items-center space-x-12">
                          <div className="text-center" onClick={() => setDrilldownClassId(cls.id)}>
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Avg Mastery</p>
                            <p className="text-2xl font-black text-black cursor-pointer">{cls.avg}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                             {isEditing ? (
                               <button onClick={() => setEditingClassId(null)} className="p-4 bg-black text-gold rounded-2xl shadow-lg"><Save size={20}/></button>
                             ) : (
                               <button onClick={() => setEditingClassId(cls.id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"><Edit3 size={20}/></button>
                             )}
                             <button onClick={() => handleDeleteClass(cls.id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"><Trash2 size={20}/></button>
                             <button onClick={() => setDrilldownClassId(cls.id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"><Users2 size={20}/></button>
                          </div>
                       </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-12">
      {isPrincipal ? renderPrincipalPerformanceHub() : isHOD ? renderPrincipalPerformanceHub() : (
        <div className="space-y-8 animate-in fade-in duration-500">
           <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Performance Hub</h2>
           {/* Legacy views hidden for brevity or mapped to generic staff hubs */}
           <p className="text-gray-400 uppercase font-black text-[10px]">Academic Records Locked by Institutional Protocol.</p>
        </div>
      )}
    </div>
  );
};

export default Performance;
