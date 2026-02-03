
import React, { useState } from 'react';
import { User } from '../../types';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  UserX, 
  ChevronRight,
  Send,
  Plus
} from 'lucide-react';

interface Props {
  user: User;
}

const AttendanceRecord: React.FC<Props> = ({ user }) => {
  const [term, setTerm] = useState('Term 1');
  const [year, setYear] = useState('2026');

  const history = [
    { date: 'Jan 23, 2026', subject: 'Mathematics', status: 'Present', in: '7:55 AM', out: '3:10 PM', remarks: '-' },
    { date: 'Jan 22, 2026', subject: 'Science', status: 'Late', in: '8:15 AM', out: '3:05 PM', remarks: '15 minutes late' },
    { date: 'Jan 21, 2026', subject: 'Literature', status: 'Present', in: '7:50 AM', out: '3:00 PM', remarks: '-' },
    { date: 'Jan 20, 2026', subject: 'Social Science', status: 'Absent', in: '--', out: '--', remarks: 'Medical leave' },
    { date: 'Jan 19, 2026', subject: 'Mathematics', status: 'Present', in: '7:58 AM', out: '3:12 PM', remarks: '-' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Attendance Record</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Institutional presence and compliance history</p>
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
          <div className="bg-gold/10 px-4 py-2 rounded-xl flex items-center space-x-2">
            <Calendar size={14} className="text-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gold">Attendance Log</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black text-white p-10 rounded-[3rem] shadow-xl border border-[#B8860B] flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full group-hover:scale-110 transition-transform" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gold transition-colors relative z-10">Attendance Rate</h3>
          <div className="mt-8 flex items-end justify-between relative z-10">
            <span className="text-7xl font-black tracking-tighter">96%</span>
            <CheckCircle className="text-gold mb-2" size={40} />
          </div>
        </div>
        
        {[
          { label: 'Days Absent', value: '2', icon: <UserX />, color: 'text-red-500' },
          { label: 'Times Late', value: '3', icon: <Clock />, color: 'text-orange-500' },
          { label: 'Minutes Late', value: '45', icon: <AlertTriangle />, color: 'text-gold' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:border-gold transition-all group">
            <div className={`p-4 bg-gray-50 rounded-2xl w-fit ${m.color} shadow-sm group-hover:scale-110 transition-transform`}>{m.icon}</div>
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{m.label}</p>
              <h4 className="text-4xl font-black text-black tracking-tighter">{m.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Attendance Table */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tighter">Institutional Log</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Detailed Daily History - {term}, {year}</p>
            </div>
            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-black transition-colors">
              <Plus size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Subject</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Time In</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Time Out</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {history.map((log, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 text-[11px] font-black text-black uppercase tracking-tight">{log.date}</td>
                    <td className="px-8 py-5">
                      <span className="text-[11px] font-black text-gold uppercase tracking-tight">{log.subject}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        log.status === 'Present' ? 'bg-green-50 text-green-600 border-green-200' :
                        log.status === 'Late' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                        'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[10px] font-bold text-gray-600 tracking-widest">{log.in}</td>
                    <td className="px-8 py-5 text-[10px] font-bold text-gray-600 tracking-widest">{log.out}</td>
                    <td className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{log.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black border-t border-gray-50 transition-all flex items-center justify-center space-x-2 group hover:bg-gray-50">
            <span>Access Full Archive for Academic Year {year}</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Breakdown & Form Column */}
        <div className="space-y-8">
          {/* Subject Wise */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Subject Compliance</h3>
            <div className="space-y-8">
              {[
                { s: 'Mathematics', p: '98%', t: '2% Tardiness', color: 'bg-blue-500' },
                { s: 'Science', p: '95%', t: '5% Tardiness', color: 'bg-green-500' },
                { s: 'Literature', p: '96%', t: '1% Tardiness', color: 'bg-purple-500' },
                { s: 'Social Science', p: '94%', t: '4% Tardiness', color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em]">
                    <span className="text-black">{item.s}</span>
                    <span className="text-gold">{item.p} Rate</span>
                  </div>
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} shadow-sm shadow-gold/20`} style={{ width: item.p }} />
                  </div>
                  <div className="flex justify-end">
                     <p className="text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{item.t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Excuse Form */}
          <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-xl border border-zinc-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 relative z-10">Institutional Absence Protocol</h3>
            
            <form className="space-y-5 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Absence Type</label>
                <select className="w-full bg-white/10 border-0 rounded-2xl p-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-gold appearance-none cursor-pointer">
                  <option className="bg-zinc-900">Select reason type</option>
                  <option className="bg-zinc-900">Medical Reason</option>
                  <option className="bg-zinc-900">Family Emergency</option>
                  <option className="bg-zinc-900">Transportation Issue</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Date of Incident</label>
                <input type="date" className="w-full bg-white/10 border-0 rounded-2xl p-4 text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-gold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Detailed Reason</label>
                <textarea 
                  className="w-full bg-white/10 border-0 rounded-2xl p-5 text-[11px] font-semibold outline-none focus:ring-1 focus:ring-gold min-h-[120px] resize-none"
                  placeholder="Provide context for registry review..."
                ></textarea>
              </div>
              
              <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:bg-white/10 transition-colors">
                <Plus size={24} className="mx-auto text-gold mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Supporting Asset (PDF/IMG)</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="button" className="flex-grow bg-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all">Cancel</button>
                <button type="button" className="flex-grow bg-gold text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2">
                  <Send size={14} />
                  <span>Transmit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecord;
