
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
  BarChart,
  Target,
  Users,
  CheckCircle,
  Trophy,
  ChevronDown,
  ArrowLeft,
  X,
  User as UserIcon,
  PlusCircle,
  ChevronUp
} from 'lucide-react';

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
  const [isAddingAssessment, setIsAddingAssessment] = useState(false);
  const [newAssessment, setNewAssessment] = useState({ title: '', grade: '12', total: 100, date: '' });
  
  // Helper to determine if the user has staff-level access
  const isStaff = [
    UserRole.TEACHER, 
    UserRole.HOD, 
    UserRole.PRINCIPAL, 
    UserRole.ADMIN, 
    UserRole.SUPER_USER, 
    UserRole.VENDOR
  ].includes(user.role);

  const isHOD = user.role === UserRole.HOD;

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

  // Mock Student Data for Mathematics
  const mockStudents: StudentGrade[] = [
    { id: 'S101', name: 'Joshua Kila', score: 82, total: 100 },
    { id: 'S102', name: 'Anna Vele', score: 91, total: 100 },
    { id: 'S103', name: 'Peter Gere', score: 75, total: 100 },
    { id: 'S104', name: 'Sarah Gima', score: 88, total: 100 },
    { id: 'S105', name: 'Samuel Kapu', score: 64, total: 100 },
  ];

  // Teachers in the Mathematics Department (HOD oversight)
  const deptTeachers = [
    { name: 'Mr. A. Kila', grades: ['11', '12'], efficiency: '92%', avatar: 'AK' },
    { name: 'Ms. B. Vele', grades: ['11', '12'], efficiency: '88%', avatar: 'BV' },
    { name: 'Mr. C. Gere', grades: ['11', '12'], efficiency: '94%', avatar: 'CG' },
    { name: 'Ms. D. Gima', grades: ['11', '12'], efficiency: '85%', avatar: 'DG' },
  ];

  const teacherClasses = [
    { 
      name: 'Grade 12A', 
      grade: 'B+', 
      avg: '87%', 
      studentCount: 43,
      color: 'bg-blue-500', 
      sectionBg: 'bg-blue-50/50',
      icon: '12A',
      assessments: [
        { type: 'Calculus Mock', date: 'Jan 15', score: '82/100', percentage: '82%', grade: 'B', rawTotal: 100 },
        { type: 'Algebra Quiz', date: 'Jan 10', score: '18/20', percentage: '90%', grade: 'A', rawTotal: 20 }
      ]
    },
    { 
      name: 'Grade 12B', 
      grade: 'B', 
      avg: '82%', 
      studentCount: 39,
      color: 'bg-indigo-500', 
      sectionBg: 'bg-indigo-50/50',
      icon: '12B',
      assessments: [
        { type: 'Unit Test 1', date: 'Jan 18', score: '80/100', percentage: '80%', grade: 'B', rawTotal: 100 },
        { type: 'Mental Math', date: 'Jan 12', score: '17/20', percentage: '85%', grade: 'B+', rawTotal: 20 }
      ]
    },
    { 
      name: 'Grade 11C', 
      grade: 'A-', 
      avg: '91%', 
      studentCount: 45,
      color: 'bg-purple-500', 
      sectionBg: 'bg-purple-50/50',
      icon: '11C',
      assessments: [
        { type: 'Geometry Exam', date: 'Jan 20', score: '92/100', percentage: '92%', grade: 'A-', rawTotal: 100 },
        { type: 'Formula Quiz', date: 'Jan 8', score: '19/20', percentage: '95%', grade: 'A', rawTotal: 20 }
      ]
    }
  ];

  const studentSubjects = [
    { 
      name: 'Mathematics', 
      grade: 'A-', 
      avg: '91%', 
      studentCount: 43,
      color: 'bg-blue-500', 
      sectionBg: 'bg-blue-50/50',
      icon: 'M',
      assessments: [
        { type: 'Midterm Exam', date: 'Jan 15', score: '92/100', percentage: '92%', grade: 'A' },
        { type: 'Problem Set 5', date: 'Jan 10', score: '18/20', percentage: '90%', grade: 'A' }
      ]
    },
    { 
      name: 'Science', 
      grade: 'B+', 
      avg: '85%', 
      studentCount: 39,
      color: 'bg-green-500', 
      sectionBg: 'bg-green-50/50',
      icon: 'S',
      assessments: [
        { type: 'Lab Practical', date: 'Jan 18', score: '85/100', percentage: '85%', grade: 'B+' },
        { type: 'Quiz 2', date: 'Jan 12', score: '17/20', percentage: '85%', grade: 'B+' }
      ]
    },
    { 
      name: 'English Literature', 
      grade: 'A', 
      avg: '94%', 
      studentCount: 45,
      color: 'bg-purple-500', 
      sectionBg: 'bg-purple-50/50',
      icon: 'L',
      assessments: [
        { type: 'Essay #2', date: 'Jan 14', score: '95/100', percentage: '95%', grade: 'A' },
        { type: 'Oral Presentation', date: 'Jan 11', score: '19/20', percentage: '95%', grade: 'A' }
      ]
    },
    { 
      name: 'Social Science', 
      grade: 'B', 
      avg: '82%', 
      studentCount: 41,
      color: 'bg-orange-500', 
      sectionBg: 'bg-orange-50/50',
      icon: 'H',
      assessments: [
        { type: 'Research Project', date: 'Jan 16', score: '80/100', percentage: '80%', grade: 'B' },
        { type: 'Weekly Quiz', date: 'Jan 09', score: '17/20', percentage: '85%', grade: 'B' }
      ]
    },
  ];

  const calculateGrade = (score: number, total: number) => {
    const percent = (score / total) * 100;
    if (percent >= 90) return 'A';
    if (percent >= 80) return 'B';
    if (percent >= 70) return 'C';
    if (percent >= 60) return 'D';
    return 'F';
  };

  const handleAddAssessment = () => {
    // Simulating adding assessment to the department
    setIsAddingAssessment(false);
    alert(`Mathematics Assessment "${newAssessment.title}" issued to all Grade ${newAssessment.grade} classes.`);
  };

  const handleScoreChange = (id: string, newScore: string) => {
    if (!viewingAssessment) return;
    const scoreNum = parseFloat(newScore) || 0;
    setViewingAssessment({
      ...viewingAssessment,
      students: viewingAssessment.students.map(s => 
        s.id === id ? { ...s, score: Math.min(scoreNum, s.total) } : s
      )
    });
  };

  const renderGradingProtocol = () => {
    if (!viewingAssessment) return null;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setViewingAssessment(null)}
              className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">
                {viewingAssessment.assessmentType}
              </h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                Class: {viewingAssessment.className} &bull; Grading Protocol
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
             <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Discard</button>
             <button 
                onClick={() => setViewingAssessment(null)}
                className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-gold hover:text-black transition-all flex items-center"
             >
                <Save size={16} className="mr-2" /> Commit Grades
             </button>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Profile</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Raw Score (/{viewingAssessment.total})</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Percentage</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Computed Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {viewingAssessment.students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setViewingStudent({ name: s.name, id: s.id, class: viewingAssessment.className, assessments: [] })}>
                      <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{s.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-sm uppercase text-black hover:text-gold transition-colors">{s.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">ID: {s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <input 
                      type="number" 
                      value={s.score}
                      max={s.total}
                      onChange={(e) => handleScoreChange(s.id, e.target.value)}
                      className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-black text-black outline-none focus:ring-2 focus:ring-gold w-24 shadow-inner"
                    />
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-black text-gold">{Math.round((s.score / s.total) * 100)}%</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className="inline-flex w-10 h-10 bg-black text-white items-center justify-center rounded-xl font-black text-xs shadow-lg">
                      {calculateGrade(s.score, s.total)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderStudentOverview = () => {
    if (!viewingStudent) return null;
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setViewingStudent(null)}
              className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-black text-gold rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-xl">{viewingStudent.name.charAt(0)}</div>
              <div>
                <h3 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">{viewingStudent.name}</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                  Student ID: {viewingStudent.id} &bull; Mathematics Portfolio
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Overall Math Avg', value: '89.4%', color: 'text-gold' },
            { label: 'Assessments Logged', value: '12', color: 'text-black' },
            { label: 'Attendance (Math)', value: '98%', color: 'text-green-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
              <h4 className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h4>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Unit / Assignment</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Logged</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Score</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Registry Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {[
                 { type: 'Calculus Mock', date: 'Jan 15', score: '82/100', percentage: '82%', grade: 'B' },
                 { type: 'Algebra Quiz', date: 'Jan 10', score: '18/20', percentage: '90%', grade: 'A' },
                 { type: 'Geometry Proofs', date: 'Dec 12', score: '95/100', percentage: '95%', grade: 'A' },
               ].map((a, i) => (
                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-10 py-6 font-black text-sm uppercase text-black">{a.type}</td>
                   <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">{a.date}</td>
                   <td className="px-10 py-6">
                     <span className="font-black text-black">{a.score}</span>
                     <span className="ml-2 text-[10px] font-black text-gold">({a.percentage})</span>
                   </td>
                   <td className="px-10 py-6 text-right">
                     <span className="inline-flex w-10 h-10 bg-black text-white items-center justify-center rounded-xl font-black text-xs">{a.grade}</span>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAssessmentModal = () => {
    if (!isAddingAssessment) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden">
          <div className="p-10 bg-black text-white flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">New Departmental Assessment</h3>
              <p className="text-gold font-bold uppercase tracking-widest text-[9px] mt-1">Mathematics Department • Institutional Registry</p>
            </div>
            <button onClick={() => setIsAddingAssessment(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={24} /></button>
          </div>
          <div className="p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Assessment Title</label>
              <input 
                type="text" 
                placeholder="e.g. Unit 3 Trigonometry Exam"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none"
                value={newAssessment.title}
                onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Raw Total</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none"
                  value={newAssessment.total}
                  onChange={(e) => setNewAssessment({...newAssessment, total: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Issue Date</label>
              <input 
                type="date" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none"
                value={newAssessment.date}
                onChange={(e) => setNewAssessment({...newAssessment, date: e.target.value})}
              />
            </div>
            <p className="text-[9px] text-gray-400 italic text-center">Once issued, this assessment will propagate to all classes in the selected grade. Scores will be filled after marking.</p>
          </div>
          <div className="p-10 bg-gray-50 border-t border-gray-100 flex space-x-4">
             <button onClick={() => setIsAddingAssessment(false)} className="flex-grow bg-white border border-gray-200 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">Discard</button>
             <button onClick={handleAddAssessment} className="flex-grow bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-gold hover:text-black transition-all">Issue Assessment</button>
          </div>
        </div>
      </div>
    );
  };

  const renderHODPerformanceHub = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Dept Summary Card */}
      <div className="bg-gold text-black p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-black/5 rounded-bl-[15rem] group-hover:scale-110 transition-transform duration-1000" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Mathematics Dept Performance</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-9xl font-black tracking-tighter leading-none">86%</span>
              <div className="bg-black/10 px-4 py-2 rounded-full flex items-center space-x-1 mb-4">
                <ChevronUp size={16} />
                <span className="text-[11px] font-black uppercase">+2.4%</span>
              </div>
            </div>
            <div className="mt-8 flex space-x-12">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Avg Dept GPA</p>
                 <p className="text-4xl font-black tracking-tight mt-1">3.64</p>
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Success Rate</p>
                 <p className="text-4xl font-black tracking-tight mt-1">94%</p>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {deptTeachers.map((t, i) => (
               <div key={i} className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white transition-all shadow-sm">
                 <div className="flex items-center space-x-3 mb-4">
                   <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs shadow-lg">{t.avatar}</div>
                   <p className="font-black text-xs uppercase tracking-tight truncate">{t.name}</p>
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[8px] font-black uppercase opacity-60">Efficiency</p>
                       <p className="text-xl font-black">{t.efficiency}</p>
                    </div>
                    <p className="text-[9px] font-black uppercase opacity-40">Grades: {t.grades.join(',')}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Grade Level Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {[
           { grade: 'Grade 12', avg: '89%', teachers: ['Mr. A. Kila', 'Ms. B. Vele'], classes: ['12A', '12B', '12C'], color: 'bg-blue-50' },
           { grade: 'Grade 11', avg: '84%', teachers: ['Mr. C. Gere', 'Ms. D. Gima'], classes: ['11A', '11B', '11C'], color: 'bg-purple-50' },
         ].map((g, i) => (
           <div key={i} className={`${g.color} p-10 rounded-[3.5rem] border border-transparent shadow-sm hover:border-gold transition-all`}>
             <div className="flex justify-between items-start mb-10">
               <div>
                 <h4 className="text-3xl font-black text-black uppercase tracking-tighter">{g.grade} Overview</h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Institutional Academic Tracking</p>
               </div>
               <div className="text-right">
                 <p className="text-4xl font-black text-black">{g.avg}</p>
                 <p className="text-[9px] font-black text-gold uppercase tracking-widest">Mastery Rate</p>
               </div>
             </div>
             
             <div className="space-y-4 mb-10">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Departmental Classes:</p>
                <div className="flex flex-wrap gap-2">
                   {g.classes.map((c, idx) => (
                     <button key={idx} className="bg-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-gold transition-all shadow-sm">{c}</button>
                   ))}
                </div>
             </div>

             <div className="bg-white/60 p-6 rounded-3xl shadow-inner flex justify-between items-center">
                <div className="flex -space-x-3">
                   {g.teachers.map((_, idx) => (
                     <div key={idx} className="w-10 h-10 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] font-black text-gold">T{idx+1}</div>
                   ))}
                </div>
                <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black flex items-center transition-colors">
                  View Full Registry <ChevronRight size={14} className="ml-1" />
                </button>
             </div>
           </div>
         ))}
      </div>

      {/* Class/Teacher Performance Matrix */}
      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
          <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Institutional Class Matrix</h3>
          <button 
            onClick={() => setIsAddingAssessment(true)}
            className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all flex items-center"
          >
            <PlusCircle size={18} className="mr-2" /> Issue Dept Assessment
          </button>
        </div>
        <div className="divide-y divide-gray-100">
           {teacherClasses.map((cls, idx) => (
             <div key={idx} className="p-10 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row items-center justify-between group">
                <div className="flex items-center space-x-8 mb-6 md:mb-0">
                  <div className={`w-16 h-16 ${cls.color} rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xl group-hover:scale-110 transition-transform`}>{cls.icon}</div>
                  <div>
                    <h4 className="text-2xl font-black uppercase text-black tracking-tight leading-none mb-1">{cls.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lead: {deptTeachers[idx % deptTeachers.length].name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-12">
                   <div className="text-center">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Class Avg</p>
                     <p className="text-2xl font-black text-black">{cls.avg}</p>
                   </div>
                   <div className="text-center">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                     <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[8px] font-black uppercase border border-green-100">On Track</span>
                   </div>
                   <button 
                    onClick={() => setViewingAssessment({ className: cls.name, assessmentType: 'Mathematics General Overview', total: 100, students: mockStudents })}
                    className="p-4 bg-gray-100 rounded-2xl group-hover:bg-gold group-hover:text-black transition-all shadow-sm"
                   >
                     <ChevronRight size={20} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderPerformanceHub = (data: any[], title: string, subtitle: string, mainStatLabel: string, mainStatValue: string, gpaValue?: string) => {
    if (viewingStudent) return renderStudentOverview();
    if (viewingAssessment) return renderGradingProtocol();
    if (isHOD) return renderHODPerformanceHub();

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-gold text-black p-10 rounded-[3rem] shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">{mainStatLabel}</h3>
            <div className="flex items-baseline justify-center md:justify-start space-x-2">
              <span className="text-8xl font-black tracking-tighter">{mainStatValue}</span>
              <div className="bg-black/10 px-3 py-1 rounded-full flex items-center space-x-1 mb-4">
                <TrendingUp size={12} />
                <span className="text-[10px] font-black uppercase">+1.2%</span>
              </div>
            </div>
            {gpaValue && (
              <div className="mt-2 inline-block md:block">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  {isStaff ? 'Institutional Teaching Average GPA' : 'Your Overall GPA'}
                </p>
                <p className="text-4xl font-black tracking-tight mt-1">{gpaValue}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:w-auto relative z-10">
            {data.map((s, i) => (
              <div key={i} className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex items-center space-x-4 shadow-sm hover:scale-105 transition-all cursor-default">
                <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-white font-black text-[9px] shadow-md shrink-0`}>{s.icon}</div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60 truncate w-24">{s.name}</p>
                  <p className="text-xl font-black tracking-tight">{s.avg}</p>
                  {s.studentCount && <p className="text-[8px] font-black uppercase opacity-40">{s.studentCount} Students</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between bg-gray-50/20 gap-4">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter">{title}</h3>
            <div className="flex items-center space-x-4">
              <div className="relative inline-block">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative inline-block">
                <select 
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm"
                >
                  {terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <button className="bg-black text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-gold hover:text-black transition-all">Download CSV</button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {data.map((s, i) => (
              <div key={i} className={`${s.sectionBg} p-10 hover:bg-white transition-all`}>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <div className={`w-16 h-16 ${s.color} rounded-[1.5rem] flex items-center justify-center text-white font-black text-xl shadow-xl`}>{s.icon}</div>
                    <div>
                      <h4 className="text-2xl font-black text-black uppercase tracking-tighter">{s.name}</h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                          {isStaff ? 'Class Avg:' : 'Current Avg:'} <span className="text-gold font-black">{s.avg}</span>
                        </p>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <p className="text-[11px] font-black text-gold uppercase tracking-widest">
                          {s.studentCount} Students
                        </p>
                      </div>
                      {isStaff && (
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">
                          &bull; Click on an assessment to grade
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Unit / Assignment</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Issued</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">{isStaff ? 'Class Mean' : 'Your Score'}</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Success Rate</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Mean Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {s.assessments.map((a: any, idx: number) => (
                        <tr 
                          key={idx} 
                          onClick={() => {
                            if (isStaff) {
                              setViewingAssessment({
                                className: s.name,
                                assessmentType: a.type,
                                total: a.rawTotal || 100,
                                students: mockStudents.map(ms => ({ ...ms, total: a.rawTotal || 100 }))
                              });
                            }
                          }}
                          className={`group/row transition-colors ${isStaff ? 'cursor-pointer hover:bg-gold/5' : ''}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-black text-black uppercase group-hover/row:text-gold transition-colors">{a.type}</span>
                              {isStaff && <Edit3 size={12} className="opacity-0 group-hover/row:opacity-100 transition-opacity text-gold" />}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{a.date}</td>
                          <td className="px-6 py-4 text-sm font-black text-gray-700">{a.score}</td>
                          <td className="px-6 py-4 text-sm font-black text-gold">{a.percentage}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex w-8 h-8 rounded-lg bg-black text-white items-center justify-center font-black text-xs">{a.grade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-12">
      {renderAssessmentModal()}
      {!viewingAssessment && !viewingStudent && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Performance Hub</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {isHOD ? 'Mathematics Department Oversight' : isStaff ? 'Institutional Performance Oversight' : 'Individual Performance Analytics'} &bull; {selectedTerm} {selectedYear}
            </p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Export Institutional Report</button>
        </div>
      )}
      {isHOD 
        ? renderPerformanceHub(teacherClasses, "Departmental Performance Register", "Manage Mathematics institutional results", "Mathematics Dept Average %", "86%", "3.64")
        : isStaff 
        ? renderPerformanceHub(teacherClasses, "Class Performance Register", "Manage institutional results", "Institutional Average %", "89%", "3.4") 
        : renderPerformanceHub(studentSubjects, "Academic Transcript", "View your semester grades", "Your Overall Average %", "89%", "3.4")}
    </div>
  );
};

export default Performance;
