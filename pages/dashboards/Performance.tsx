
import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

interface Props {
  user: User;
}

const Performance: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2026', '2025', '2024'];

  // Data mapping for teacher's classes
  const teacherClasses = [
    { 
      name: 'Grade 12A', 
      grade: 'B+', 
      avg: '87%', 
      color: 'bg-blue-500', 
      sectionBg: 'bg-blue-50/50',
      icon: '12A',
      assessments: [
        { type: 'Calculus Mock', date: 'Jan 15', score: '82/100', percentage: '82%', grade: 'B' },
        { type: 'Algebra Quiz', date: 'Jan 10', score: '18/20', percentage: '90%', grade: 'A' }
      ]
    },
    { 
      name: 'Grade 12B', 
      grade: 'B', 
      avg: '82%', 
      color: 'bg-indigo-500', 
      sectionBg: 'bg-indigo-50/50',
      icon: '12B',
      assessments: [
        { type: 'Unit Test 1', date: 'Jan 18', score: '80/100', percentage: '80%', grade: 'B' },
        { type: 'Mental Math', date: 'Jan 12', score: '17/20', percentage: '85%', grade: 'B+' }
      ]
    },
    { 
      name: 'Grade 11C', 
      grade: 'A-', 
      avg: '91%', 
      color: 'bg-purple-500', 
      sectionBg: 'bg-purple-50/50',
      icon: '11C',
      assessments: [
        { type: 'Geometry Exam', date: 'Jan 20', score: '92/100', percentage: '92%', grade: 'A-' },
        { type: 'Formula Quiz', date: 'Jan 8', score: '19/20', percentage: '95%', grade: 'A' }
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
    { 
      name: 'Literature', 
      grade: 'A', 
      avg: '92%', 
      color: 'bg-purple-500', 
      sectionBg: 'bg-purple-50/50',
      icon: 'L',
      assessments: [
        { type: 'Modern Poetry Analysis', date: 'Jan 20', score: '95/100', percentage: '95%', grade: 'A' },
        { type: 'Shakespeare Exam', date: 'Jan 8', score: '88/100', percentage: '88%', grade: 'B+' }
      ]
    },
    { 
      name: 'Social Science', 
      grade: 'B', 
      avg: '81%', 
      color: 'bg-orange-500', 
      sectionBg: 'bg-orange-50/50',
      icon: 'S',
      assessments: [
        { type: 'History Research Paper', date: 'Jan 22', score: '82/100', percentage: '82%', grade: 'B' },
        { type: 'Geography Quiz', date: 'Jan 5', score: '16/20', percentage: '80%', grade: 'B' }
      ]
    }
  ];

  const renderPerformanceHub = (data: any[], title: string, subtitle: string, mainStatLabel: string, mainStatValue: string) => (
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto relative z-10">
          {data.map((s, i) => (
            <div key={i} className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex items-center space-x-4 shadow-sm">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-white font-black text-[9px] shadow-md shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-60 truncate w-24">{s.name}</p>
                <p className="text-xl font-black tracking-tight">{s.avg}</p>
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
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Class Avg: <span className="text-gold font-black">{s.avg}</span> • Status: <span className="text-green-500 font-black">ACTIVE</span>
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
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Mean Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {s.assessments.map((a: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-black text-black uppercase">{a.type}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{a.date}</td>
                        <td className="px-6 py-4 text-sm font-black text-gray-700">{a.score}</td>
                        <td className="px-6 py-4 text-sm font-black text-gold">{a.percentage}</td>
                        <td className="px-6 py-4">
                          <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs">{a.grade}</span>
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

  return (
    <div className="pb-12">
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
      {user.role === UserRole.TEACHER 
        ? renderPerformanceHub(teacherClasses, "Class Performance Register", "Manage your classes' results", "Teaching Average GPA", "3.4") 
        : renderPerformanceHub(studentSubjects, "Academic Transcript", "View your semester grades", "Your Overall Average", "87%")}
    </div>
  );
};

export default Performance;
