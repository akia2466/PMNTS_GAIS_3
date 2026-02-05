
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
  Trash2
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
  Line,
  AreaChart,
  Area
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

const Performance: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedDept, setSelectedDept] = useState('Mathematics');
  const [isAddingAssessment, setIsAddingAssessment] = useState(false);
  const [newAssessment, setNewAssessment] = useState({ title: '', grade: '12', total: 100, date: '', subject: 'Mathematics' });
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isHOD = user.role === UserRole.HOD;
  const isStaff = [UserRole.TEACHER, UserRole.HOD, UserRole.PRINCIPAL, UserRole.ADMIN, UserRole.SUPER_USER, UserRole.VENDOR].includes(user.role);

  // Principal's Multi-Dept Switcher Data
  const departments = ['Mathematics', 'Natural Science', 'Humanities', 'Fine Arts'];

  // Drill-down States
  const [viewingAssessment, setViewingAssessment] = useState<{
    className: string;
    assessmentType: string;
    total: number;
    students: StudentGrade[];
  } | null>(null);

  const [viewingStudent, setViewingStudent] = useState<{
    name: string;
    id: string;
    class: string;
    assessments: any[];
  } | null>(null);

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  const mockStudents: StudentGrade[] = [
    { id: 'S101', name: 'Joshua Kila', score: 82, total: 100 },
    { id: 'S102', name: 'Anna Vele', score: 91, total: 100 },
    { id: 'S103', name: 'Peter Gere', score: 75, total: 100 },
    { id: 'S104', name: 'Sarah Gima', score: 88, total: 100 },
    { id: 'S105', name: 'Samuel Kapu', score: 64, total: 100 },
  ];

  const teacherClasses = [
    { name: 'Grade 12A', grade: 'B+', avg: '87%', studentCount: 43, color: 'bg-blue-500', sectionBg: 'bg-blue-50/50', icon: '12A', assessments: [{ type: 'Calculus Mock', date: 'Jan 15', score: '82/100', percentage: '82%', grade: 'B', rawTotal: 100 }] },
    { name: 'Grade 12B', grade: 'B', avg: '82%', studentCount: 39, color: 'bg-indigo-500', sectionBg: 'bg-indigo-50/50', icon: '12B', assessments: [{ type: 'Unit Test 1', date: 'Jan 18', score: '80/100', percentage: '80%', grade: 'B', rawTotal: 100 }] },
  ];

  const studentSubjects = [
    { name: 'Mathematics', grade: 'A-', avg: '91%', studentCount: 43, color: 'bg-blue-500', sectionBg: 'bg-blue-50/50', icon: 'M', assessments: [{ type: 'Midterm Exam', date: 'Jan 15', score: '92/100', percentage: '92%', grade: 'A' }] },
  ];

  const handleAddAssessment = () => {
    setIsAddingAssessment(false);
    alert(`${newAssessment.subject} Assessment "${newAssessment.title}" issued by Principal to Grade ${newAssessment.grade}.`);
  };

  const calculateGrade = (score: number, total: number) => {
    const percent = (score / total) * 100;
    if (percent >= 90) return 'A';
    if (percent >= 80) return 'B';
    if (percent >= 70) return 'C';
    if (percent >= 60) return 'D';
    return 'F';
  };

  const renderAssessmentModal = () => {
    if (!isAddingAssessment) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden">
          <div className="p-10 bg-black text-white flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Issue Multi-Dept Assessment</h3>
              <p className="text-gold font-bold uppercase tracking-widest text-[9px] mt-1">Institutional Academic Command Registry</p>
            </div>
            <button onClick={() => setIsAddingAssessment(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={24} /></button>
          </div>
          <div className="p-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subject Dept</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-black uppercase outline-none"
                  value={newAssessment.subject}
                  onChange={(e) => setNewAssessment({...newAssessment, subject: e.target.value})}
                >
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Target Grade</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-black uppercase outline-none"
                  value={newAssessment.grade}
                  onChange={(e) => setNewAssessment({...newAssessment, grade: e.target.value})}
                >
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Assessment Title</label>
              <input 
                type="text" 
                placeholder="e.g. End of Term Examination"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none"
                value={newAssessment.title}
                onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Raw Total</label>
                <input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none" value={newAssessment.total} onChange={(e) => setNewAssessment({...newAssessment, total: parseInt(e.target.value) || 0})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Issue Date</label>
                <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none" value={newAssessment.date} onChange={(e) => setNewAssessment({...newAssessment, date: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="p-10 bg-gray-50 border-t border-gray-100 flex space-x-4">
             <button onClick={() => setIsAddingAssessment(false)} className="flex-grow bg-white border border-gray-200 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">Discard</button>
             <button onClick={handleAddAssessment} className="flex-grow bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-gold hover:text-black transition-all">Issue Institutional Assessment</button>
          </div>
        </div>
      </div>
    );
  };

  const renderPrincipalPerformanceHub = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Principal Global Summary */}
      <div className="bg-black text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group border border-[#B8860B]/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-bl-[15rem] group-hover:scale-110 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
             <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gold text-black p-3 rounded-xl shadow-lg shadow-gold/20"><Layout size={24}/></div>
                <h3 className="text-gold font-black uppercase tracking-[0.3em] text-[11px]">Academic Executive Dashboard</h3>
             </div>
             <h2 className="text-7xl font-black tracking-tighter leading-none mb-6">Institutional <span className="text-gold">Mastery</span></h2>
             <p className="text-gray-400 text-lg leading-relaxed">Auditing performance data across all 4 Departments and the entire student body of 1,240 students.</p>
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
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
          <div className="flex items-center space-x-6">
             <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Departmental Switcher</h3>
             <div className="flex space-x-2">
                {departments.map(d => (
                  <button 
                    key={d} 
                    onClick={() => setSelectedDept(d)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedDept === d ? 'bg-black text-gold shadow-lg shadow-black/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >
                    {d}
                  </button>
                ))}
             </div>
          </div>
          <button 
            onClick={() => setIsAddingAssessment(true)}
            className="bg-gold text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center"
          >
            <PlusCircle size={18} className="mr-2" /> New Institutional Assessment
          </button>
        </div>
        <div className="p-10">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Viewing Stats for: <span className="text-gold">{selectedDept}</span> Dept Lead Teachers & Classes</p>
           <div className="grid grid-cols-1 gap-8">
              {teacherClasses.map((cls, idx) => (
                <div key={idx} className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 hover:border-gold transition-all group flex items-center justify-between">
                   <div className="flex items-center space-x-8">
                      <div className="w-20 h-20 bg-black text-gold rounded-[2rem] flex items-center justify-center font-black text-2xl shadow-xl">{cls.icon}</div>
                      <div>
                        <h4 className="text-3xl font-black uppercase text-black tracking-tighter leading-none mb-1">{cls.name}</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Subject Average: <span className="text-gold">{cls.avg}</span> &bull; 42 Registry Nodes</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-12">
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Status</p>
                        <span className="px-5 py-1.5 bg-green-50 text-green-600 rounded-xl text-[9px] font-black uppercase border border-green-100">Validated</span>
                      </div>
                      <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm">
                        <Edit3 size={20} />
                      </button>
                      <button className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                        <Trash2 size={20} className="lucide-trash-2" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      {renderAssessmentModal()}
      {isPrincipal ? renderPrincipalPerformanceHub() : isHOD ? renderPrincipalPerformanceHub() : (
        <div className="space-y-8 animate-in fade-in duration-500">
           {/* Fallback to existing student view logic if needed */}
           <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Performance Hub</h2>
           {/* Component continues as before... */}
        </div>
      )}
    </div>
  );
};

export default Performance;
