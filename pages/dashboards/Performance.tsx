
import React, { useState } from 'react';
import { User } from '../../types';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  Calendar
} from 'lucide-react';

interface Props {
  user: User;
}

const Performance: React.FC<Props> = ({ user }) => {
  const [term, setTerm] = useState('Term 1');
  const [year, setYear] = useState('2026');

  const subjectsData = [
    { 
      name: 'Mathematics', 
      grade: 'A-', 
      avg: '91%', 
      icon: 'M', 
      color: 'bg-blue-500',
      assessments: [
        { type: 'Midterm Exam', date: 'Jan 15', score: '92/100', percent: '92%', grade: 'A' },
        { type: 'Problem Set 5', date: 'Jan 10', score: '18/20', percent: '90%', grade: 'A' },
      ]
    },
    { 
      name: 'Science', 
      grade: 'B+', 
      avg: '85%', 
      icon: 'S', 
      color: 'bg-green-500',
      assessments: [
        { type: 'Lab Practical', date: 'Jan 18', score: '85/100', percent: '85%', grade: 'B+' },
        { type: 'Quiz 2', date: 'Jan 12', score: '17/20', percent: '85%', grade: 'B+' },
      ]
    },
    { 
      name: 'Literature', 
      grade: 'A', 
      avg: '92%', 
      icon: 'L', 
      color: 'bg-purple-500',
      assessments: [
        { type: 'Modern Poetry Analysis', date: 'Jan 20', score: '95/100', percent: '95%', grade: 'A' },
        { type: 'Shakespeare Exam', date: 'Jan 8', score: '88/100', percent: '88%', grade: 'B+' },
      ]
    },
    { 
      name: 'Social Science', 
      grade: 'B', 
      avg: '81%', 
      icon: 'S', 
      color: 'bg-orange-500',
      assessments: [
        { type: 'History Research Paper', date: 'Jan 22', score: '82/100', percent: '82%', grade: 'B' },
        { type: 'Geography Quiz', date: 'Jan 5', score: '16/20', percent: '80%', grade: 'B' },
      ]
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Academic Performance</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Detailed subject breakdown and assessment history</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <select 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-transparent border-0 text-[10px] font-black uppercase outline-none px-3 cursor-pointer"
          >
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <div className="w-[1px] h-6 bg-gray-100" />
          <select 
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="bg-transparent border-0 text-[10px] font-black uppercase outline-none px-3 cursor-pointer"
          >
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
            <option>Term 4</option>
          </select>
          <button className="bg-black text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center space-x-2 shadow-lg hover:bg-gold hover:text-black transition-all">
            <Download size={12} />
            <span>Transcript</span>
          </button>
        </div>
      </div>

      {/* Overall Metric */}
      <div className="bg-gold text-black p-10 rounded-[3rem] shadow-xl shadow-gold/20 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Overall Average Score</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-8xl font-black tracking-tighter">87%</span>
            <div className="bg-black/10 px-3 py-1 rounded-full flex items-center space-x-1 mb-4">
              <TrendingUp size={12} />
              <span className="text-[10px] font-black uppercase">+2.4%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
          {subjectsData.map((s, i) => (
            <div key={i} className="bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center space-x-4">
              <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center text-white font-black text-[10px]`}>{s.icon}</div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest opacity-60">{s.name}</p>
                <p className="text-sm font-black tracking-tight">{s.avg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-black uppercase tracking-tighter">Subject Performance - {term}, {year}</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter subjects..." 
              className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-6 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-gold/30 w-48 shadow-sm"
            />
          </div>
          <button className="bg-white p-2.5 rounded-xl text-gray-400 border border-gray-100 shadow-sm hover:text-black transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Restructured Assessment Sections */}
      <div className="space-y-8">
        {subjectsData.map((subj, idx) => (
          <div key={idx} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-6">
                <div className={`w-14 h-14 ${subj.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                  {subj.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-black text-black uppercase tracking-tight leading-none">{subj.name}</h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{term}, {year}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Subject Average</p>
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-black text-black tracking-tighter">{subj.avg}</span>
                  <div className="bg-black text-gold font-black text-[10px] px-3 py-1 rounded-lg uppercase">{subj.grade}</div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Assessment Type</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Score</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Percentage</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subj.assessments.map((ass, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{ass.type}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <Calendar size={12} className="mr-2" /> {ass.date}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-black">{ass.score}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] font-black text-black">{ass.percent}</span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div className={`h-full ${subj.color}`} style={{ width: ass.percent }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="bg-gray-50 border border-gray-100 text-black font-black text-[10px] px-3 py-1 rounded-lg uppercase">
                          {ass.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50/30 border-t border-gray-50 text-center">
              <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">View All Assessments for {subj.name}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
