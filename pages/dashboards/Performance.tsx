
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
  User as UserIcon
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
  
  // Drill-down State
  const [viewingAssessment, setViewingAssessment] = useState<{
    className: string;
    assessmentType: string;
    total: number;
    students: StudentGrade[];
  } | null>(null);

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  // Mock Student Data for Grading
  const mockStudents: StudentGrade[] = [
    { id: 'S101', name: 'Joshua Kila', score: 82, total: 100 },
    { id: 'S102', name: 'Anna Vele', score: 91, total: 100 },
    { id: 'S103', name: 'Peter Gere', score: 75, total: 100 },
    { id: 'S104', name: 'Sarah Gima', score: 88, total: 100 },
    { id: 'S105', name: 'Samuel Kapu', score: 64, total: 100 },
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
      color: 'bg-green-500', 
      sectionBg: 'bg-green-50/50',
      icon: 'S',
      assessments: [
        { type: 'Lab Practical', date: 'Jan 18', score: '85/100', percentage: '85%', grade: 'B+' },
        { type: 'Quiz 2', date: 'Jan 12', score: '17/20', percentage: '85%', grade: 'B+' }
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
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{s.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-sm uppercase text-black">{s.name}</p>
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

  const renderPerformanceHub = (data: any[], title: string, subtitle: string, mainStatLabel: string, mainStatValue: string, gpaValue?: string) => {
    if (viewingAssessment) return renderGradingProtocol();

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-gold text-black p-10 rounded-[3rem] shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">{mainStatLabel}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-8xl font-black tracking-tighter">{mainStatValue}</span>
              <div className="bg-black/10 px-3 py-1 rounded-full flex items-center space-x-1 mb-4">
                <TrendingUp size={12} />
                <span className="text-[10px] font-black uppercase">+1.2%</span>
              </div>
            </div>
            {user.role === UserRole.TEACHER && gpaValue && (
              <div className="mt-2">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Teaching Average GPA</p>
                <p className="text-2xl font-black tracking-tight">{gpaValue}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto relative z-10">
            {data.map((s, i) => (
              <div key={i} className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex items-center space-x-4 shadow-sm">
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
                          Class Avg: <span className="text-gold font-black">{s.avg}</span>
                        </p>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <p className="text-[11px] font-black text-gold uppercase tracking-widest">
                          {s.studentCount} Students
                        </p>
                      </div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">
                        &bull; Click on an assessment to grade
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Unit / Assignment</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Issued</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Class Mean</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Success Rate</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Mean Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {s.assessments.map((a: any, idx: number) => (
                        <tr 
                          key={idx} 
                          onClick={() => {
                            if (user.role === UserRole.TEACHER) {
                              setViewingAssessment({
                                className: s.name,
                                assessmentType: a.type,
                                total: a.rawTotal || 100,
                                students: mockStudents.map(ms => ({ ...ms, total: a.rawTotal || 100 }))
                              });
                            }
                          }}
                          className={`group/row transition-colors ${user.role === UserRole.TEACHER ? 'cursor-pointer hover:bg-gold/5' : ''}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-black text-black uppercase group-hover/row:text-gold transition-colors">{a.type}</span>
                              {user.role === UserRole.TEACHER && <Edit3 size={12} className="opacity-0 group-hover/row:opacity-100 transition-opacity text-gold" />}
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
      {!viewingAssessment && (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Performance Hub</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {user.role === UserRole.TEACHER ? 'Class Performance Oversight' : 'Individual Performance Analytics'} &bull; {selectedTerm} {selectedYear}
            </p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">Export Institutional Report</button>
        </div>
      )}
      {user.role === UserRole.TEACHER 
        ? renderPerformanceHub(teacherClasses, "Class Performance Register", "Manage your classes' results", "Teaching Average %", "89%", "3.4") 
        : renderPerformanceHub(studentSubjects, "Academic Transcript", "View your semester grades", "Your Overall Average", "87%")}
    </div>
  );
};

export default Performance;
