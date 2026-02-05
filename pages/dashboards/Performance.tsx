import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  ArrowLeft, 
  Layout, 
  PlusCircle, 
  Trophy, 
  CheckCircle, 
  Target, 
  Trash2, 
  Users2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  BookOpen, 
  ChevronDown 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Props {
  user: User;
}

interface Assessment {
  unit: string;
  date: string;
  score: string;
  rate: string;
  grade: string;
}

interface SubjectTranscript {
  subject: string;
  char: string;
  color: string;
  avg: string;
  students: number;
  assessments: Assessment[];
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
}

const Performance: React.FC<Props> = ({ user }) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedDept, setSelectedDept] = useState('Mathematics');
  const [viewMode, setViewMode] = useState<'STUDENTS' | 'TEACHERS' | 'HOD' | 'ME'>('STUDENTS');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [drilldownClassId, setDrilldownClassId] = useState<string | null>(null);
  
  const isPrincipal = user.role === UserRole.PRINCIPAL;
  const isTeacher = user.role === UserRole.TEACHER;
  const isHOD = user.role === UserRole.HOD;
  const isStudent = user.role === UserRole.STUDENT;

  const departments = ['Mathematics', 'Natural Science', 'Humanities', 'Fine Arts'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

  const [classes, setClasses] = useState<ClassPerformance[]>([
    { id: 'c1', name: 'Grade 12A', grade: 'B+', avg: '87%', studentCount: 43, color: 'bg-blue-500', sectionBg: 'bg-blue-50/50', icon: '12A', leadTeacher: 'Dr. Michael Chen' },
    { id: 'c2', name: 'Grade 12B', grade: 'B', avg: '82%', studentCount: 39, color: 'bg-indigo-500', sectionBg: 'bg-indigo-50/50', icon: '12B', leadTeacher: 'Ms. Sarah Smith' },
  ]);

  const [newClass, setNewClass] = useState<Partial<ClassPerformance>>({ name: '', leadTeacher: '', color: 'bg-black' });

  const transcriptData: SubjectTranscript[] = [
    {
      subject: 'Mathematics',
      char: 'M',
      color: 'bg-blue-500',
      avg: '91%',
      students: 43,
      assessments: [
        { unit: 'Midterm Exam', date: 'Jan 15', score: '92/100', rate: '92%', grade: 'A' },
        { unit: 'Problem Set 5', date: 'Jan 10', score: '18/20', rate: '90%', grade: 'A' },
        { unit: 'Calculus Quiz 2', date: 'Jan 05', score: '14/15', rate: '93%', grade: 'A+' },
        { unit: 'Research Paper', date: 'Dec 20', score: '45/50', rate: '90%', grade: 'A' },
      ]
    },
    {
      subject: 'Science',
      char: 'S',
      color: 'bg-green-500',
      avg: '85%',
      students: 39,
      assessments: [
        { unit: 'Physics Lab Report', date: 'Jan 22', score: '85/100', rate: '85%', grade: 'B+' },
        { unit: 'Chemistry Quiz 3', date: 'Jan 18', score: '23/25', rate: '92%', grade: 'A' },
        { unit: 'Biology Presentation', date: 'Jan 08', score: '40/50', rate: '80%', grade: 'B' },
      ]
    },
    {
      subject: 'English Literature',
      char: 'L',
      color: 'bg-purple-500',
      avg: '94%',
      students: 45,
      assessments: [
        { unit: 'Critical Essay', date: 'Jan 25', score: '48/50', rate: '96%', grade: 'A+' },
        { unit: 'Book Review', date: 'Jan 12', score: '19/20', rate: '95%', grade: 'A+' },
        { unit: 'Grammar Assessment', date: 'Jan 05', score: '90/100', rate: '90%', grade: 'A' },
      ]
    },
    {
      subject: 'Social Science',
      char: 'H',
      color: 'bg-orange-500',
      avg: '82%',
      students: 41,
      assessments: [
        { unit: 'History Project', date: 'Jan 14', score: '80/100', rate: '80%', grade: 'B' },
        { unit: 'Economic Quiz', date: 'Jan 10', score: '21/25', rate: '84%', grade: 'B+' },
        { unit: 'Current Affairs VLOG', date: 'Jan 03', score: '42/50', rate: '84%', grade: 'B+' },
      ]
    }
  ];

  const handleAddClass = () => {
    if (!newClass.name) return;
    const id = 'c' + Date.now();
    const c: ClassPerformance = {
      id,
      name: newClass.name,
      grade: '-',
      avg: '0%',
      studentCount: 0,
      color: newClass.color || 'bg-black',
      sectionBg: 'bg-gray-50/50',
      icon: newClass.name.split(' ')[1] || '?',
      leadTeacher: newClass.leadTeacher,
    };
    setClasses([...classes, c]);
    setIsAddingClass(false);
    setNewClass({ name: '', leadTeacher: '', color: 'bg-black' });
  };

  const handleDeleteClass = (id: string) => {
    if (confirm('Permanently remove this class node from institutional records?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const handleUpdateClass = (id: string, field: keyof ClassPerformance, value: any) => {
    setClasses(classes.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const renderTranscriptContent = () => (
    <>
      {/* Hero Statistics Card */}
      <div className="bg-gold p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-shrink-0">
          <p className="text-black/50 font-black uppercase tracking-widest text-[10px] mb-4">Your Overall Average %</p>
          <div className="flex items-baseline space-x-4">
            <h2 className="text-8xl font-black tracking-tighter leading-none text-black">89%</h2>
            <div className="bg-black/10 px-3 py-1 rounded-full flex items-center space-x-1">
              <TrendingUp size={12} className="text-black" />
              <span className="text-[10px] font-black">+1.2%</span>
            </div>
          </div>
          <p className="text-black/50 font-black uppercase tracking-widest text-[10px] mt-8 mb-2">Your Overall GPA</p>
          <h3 className="text-5xl font-black text-black leading-none">3.4</h3>
        </div>

        {/* Updated: Summary cards in one row - Reduced widths to prevent overflow */}
        <div className="flex-grow flex flex-row flex-nowrap overflow-x-auto custom-scrollbar gap-4 pb-4 lg:pb-0 lg:justify-end">
          {transcriptData.map((subject, i) => (
            <div key={i} className="bg-white/30 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/20 min-w-[160px] lg:w-44 shadow-lg group hover:scale-105 transition-transform cursor-pointer flex-shrink-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md`}>{subject.char}</div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-black uppercase text-black/40 tracking-widest truncate">{subject.subject}</p>
                  <p className="text-xl font-black text-black leading-none">{subject.avg}</p>
                </div>
              </div>
              <p className="text-[8px] font-black uppercase text-black/30 tracking-widest">{subject.students} Students</p>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Transcript Header */}
      <div className="flex items-center justify-between mt-12 mb-8">
        <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Academic Transcript</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select className="bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase focus:ring-1 focus:ring-gold outline-none appearance-none cursor-pointer">
              <option>2026</option>
              <option>2025</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="bg-white border border-gray-200 rounded-xl px-6 py-2 pr-10 text-[10px] font-black uppercase focus:ring-1 focus:ring-gold outline-none appearance-none cursor-pointer">
              <option>Term 1</option>
              <option>Term 2</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="bg-black text-white px-8 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all">Download CSV</button>
        </div>
      </div>

      {/* Subject Sections */}
      <div className="space-y-12">
        {transcriptData.map((data, subjectIdx) => (
          <div key={subjectIdx} className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${subjectIdx * 100}ms` }}>
            <div className="px-10 py-4 border-b border-gray-50 flex items-center space-x-6">
              <div className={`w-16 h-16 ${data.color} rounded-[1.8rem] flex items-center justify-center text-white font-black text-2xl shadow-xl`}>
                {data.char}
              </div>
              <div>
                <h4 className="text-3xl font-black uppercase text-black tracking-tighter leading-none mb-1">{data.subject}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Current Avg: <span className="text-gold">{data.avg}</span> &bull; <span className="text-black">{data.students} Students</span>
                </p>
              </div>
            </div>

            <div className="px-10 pt-2 pb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-8 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 first:rounded-l-3xl">Unit / Assignment</th>
                      <th className="px-8 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Issued</th>
                      <th className="px-8 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Your Score</th>
                      <th className="px-8 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Success Rate</th>
                      <th className="px-8 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right last:rounded-r-3xl">Mean Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.assessments.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-8 py-4 first:rounded-l-3xl">
                          <p className="font-black text-sm uppercase text-black">{row.unit}</p>
                        </td>
                        <td className="px-8 py-4">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{row.date}</p>
                        </td>
                        <td className="px-8 py-4 font-black text-black">
                          {row.score}
                        </td>
                        <td className="px-8 py-4 font-black text-gold">
                          {row.rate}
                        </td>
                        <td className="px-8 py-4 text-right last:rounded-r-3xl">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-lg font-black text-xs group-hover:bg-gold group-hover:text-black transition-colors shadow-sm">
                            {row.grade}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

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
                {transcriptData[0].assessments.map((s, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-all group">
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-black text-gold rounded-xl flex items-center justify-center font-black text-xs">{idx}</div>
                        <p className="font-black text-sm uppercase text-black">Student Node {idx + 100}</p>
                      </div>
                    </td>
                    <td className="px-10 py-6 font-black text-gold">{s.rate}</td>
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

    const viewOptions = isTeacher 
      ? (['STUDENTS', 'ME'] as const) 
      : (['STUDENTS', 'TEACHERS', 'HOD'] as const);

    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <div className="bg-black text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group border border-[#B8860B]/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-bl-[15rem] group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
               <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gold text-black p-3 rounded-xl shadow-lg shadow-gold/20"><Layout size={24}/></div>
                  <h3 className="text-gold font-black uppercase tracking-[0.3em] text-[11px]">Performance Registry Oversight</h3>
               </div>
               <h2 className="text-7xl font-black tracking-tighter leading-none mb-6">
                 {isTeacher && viewMode === 'ME' ? 'My' : 'Master'} <span className="text-gold">Analytics</span>
               </h2>
               <div className="flex bg-white/10 p-2 rounded-2xl backdrop-blur-md w-fit mb-4">
                  {viewOptions.map(target => (
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
                 { label: 'Active HODs', value: '4/4', icon: <Users2 size={16}/>, color: 'text-gold' },
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

        {isTeacher && viewMode === 'ME' ? (
          <div className="space-y-12 mt-12">
            {renderTranscriptContent()}
          </div>
        ) : (
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
              {(isPrincipal || isHOD) && (
                <button 
                  onClick={() => setIsAddingClass(true)}
                  className="bg-gold text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center shrink-0"
                >
                  <PlusCircle size={18} className="mr-2" /> New Class Node
                </button>
              )}
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
                            <div className="flex-grow">
                              {isEditing ? (
                                <input 
                                  type="text" value={cls.name} 
                                  onChange={e => handleUpdateClass(cls.id, 'name', e.target.value)}
                                  className="bg-white border p-2 rounded-lg text-2xl font-black uppercase text-black mb-1 w-full"
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
                                  className="bg-white border p-2 rounded text-[11px] outline-none w-full mt-2"
                                  placeholder="Lead Teacher"
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
                               {(isPrincipal || isHOD) && (
                                 <>
                                   {isEditing ? (
                                     <button onClick={() => setEditingClassId(null)} className="p-4 bg-black text-gold rounded-2xl shadow-lg hover:scale-105 transition-all"><Save size={20}/></button>
                                   ) : (
                                     <button onClick={() => setEditingClassId(cls.id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"><Edit3 size={20}/></button>
                                   )}
                                   <button onClick={() => handleDeleteClass(cls.id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"><Trash2 size={20}/></button>
                                 </>
                               )}
                               <button onClick={() => setDrilldownClassId(cls.id)} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gold hover:text-black transition-all shadow-sm"><Users2 size={20}/></button>
                            </div>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStudentView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter leading-none">Performance Hub</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Individual Performance Analytics & bull; Term 1 2026
          </p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-xl border border-gray-200 font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-gold transition-colors">
          Export Institutional Report
        </button>
      </div>

      {renderTranscriptContent()}
    </div>
  );

  return (
    <div className="pb-12">
      {isStudent ? renderStudentView() : (isPrincipal || isTeacher || isHOD) ? renderPrincipalPerformanceHub() : (
        <div className="space-y-8 animate-in fade-in duration-500 text-center py-20">
           <p className="text-gray-400 uppercase font-black text-[12px] tracking-widest">Academic Records Locked by Institutional Protocol.</p>
        </div>
      )}
    </div>
  );
};

export default Performance;