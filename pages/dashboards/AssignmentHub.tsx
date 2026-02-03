
import React from 'react';
import { User } from '../../types';
import { 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  FileText, 
  Send,
  Briefcase,
  ClipboardCheck
} from 'lucide-react';

interface Props {
  user: User;
}

const AssignmentHub: React.FC<Props> = ({ user }) => {
  const subjects = [
    { name: 'Mathematics', received: 3, submitted: 2, icon: 'M', color: 'bg-blue-500' },
    { name: 'Science', received: 4, submitted: 3, icon: 'S', color: 'bg-green-500' },
    { name: 'Literature', received: 2, submitted: 2, icon: 'L', color: 'bg-purple-500' },
    { name: 'Social Science', received: 3, submitted: 1, icon: 'S', color: 'bg-orange-500' },
  ];

  const pending = [
    { title: 'Biology Lab Report Guidelines', subject: 'Science', teacher: 'Mr. Yawi', due: 'Jan 30, 2026', status: 'pending' },
    { title: 'Calculus Problem Set 6', subject: 'Mathematics', teacher: 'Mr. Chen', due: 'Feb 5, 2026', status: 'pending' },
    { title: 'History Presentation Template', subject: 'Social Science', teacher: 'Ms. Johnson', due: 'Feb 10, 2026', status: 'pending' },
    { title: 'Chemistry Data Analysis Sheet', subject: 'Science', teacher: 'Mr. Yawi', due: 'Jan 28, 2026', status: 'pending' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Assignments Hub</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Institutional Task Registry & Academic Submissions</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center space-x-4 px-4">
            <div className="text-center border-r border-gray-100 pr-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Pending</p>
              <p className="text-2xl font-black text-red-500 leading-none">4</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Due Today</p>
              <p className="text-2xl font-black text-black leading-none uppercase">1</p>
            </div>
          </div>
          <button className="bg-black text-white px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center space-x-2 shadow-lg hover:bg-gold hover:text-black transition-all">
            <Briefcase size={12} />
            <span>Task Log</span>
          </button>
        </div>
      </div>

      {/* Metrics Row - Matches Performance Page Scaling */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {subjects.map((s, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:border-gold transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-10">
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <Briefcase size={20} className="text-gray-200 group-hover:text-gold" />
            </div>
            <h4 className="text-sm font-black uppercase tracking-tight text-black mb-6 leading-none">{s.name}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 text-center group-hover:bg-black transition-colors">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-gray-500">Received</p>
                <p className="font-black text-3xl tracking-tighter group-hover:text-gold">{s.received}</p>
              </div>
              <div className="bg-gold/5 rounded-2xl p-4 text-center group-hover:bg-gold transition-colors">
                <p className="text-[8px] font-black text-gold uppercase tracking-widest mb-2 group-hover:text-black/60">Submitted</p>
                <p className="font-black text-3xl tracking-tighter text-gold group-hover:text-black">{s.submitted}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Files from Teachers */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-black uppercase tracking-tighter">Academic Assets from Faculty</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pending Educational Materials</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    className="bg-gray-50 border-0 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-gold/30 w-48 shadow-inner"
                  />
                </div>
                <button className="bg-gray-50 p-3 rounded-2xl text-gray-400 hover:text-black border border-gray-100 shadow-sm transition-colors"><Filter size={18}/></button>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {pending.map((task, idx) => (
                <div key={idx} className="p-10 hover:bg-gray-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-10 group">
                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-gray-50 rounded-2xl text-gold group-hover:scale-110 transition-transform shadow-sm group-hover:bg-black group-hover:text-gold">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg uppercase tracking-tight text-black group-hover:text-muted-gold transition-colors leading-tight">{task.title}</h4>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 flex items-center">
                        <span className="text-gold">{task.subject}</span>
                        <span className="mx-2 opacity-30">|</span>
                        <span>From: {task.teacher}</span>
                      </p>
                      <div className="mt-4 flex items-center space-x-4">
                        <span className="bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-500/20">
                          {task.status}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center">
                          <Clock size={12} className="mr-2" /> Due: {task.due}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all shadow-xl group-hover:translate-y-[-2px]">
                      Download
                    </button>
                    <button className="w-full sm:w-auto bg-gold text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-xl group-hover:translate-y-[-2px]">
                      Transmit Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submitted History */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-8">Submission Archive</h3>
            <div className="space-y-4">
              {[
                { name: 'Algebra Problem Set 4.pdf', info: 'Submitted to: Mr. Chen • Jan 20, 2026', status: 'Submitted' },
                { name: 'Science Lab Report 2.pdf', info: 'Submitted to: Mr. Yawi • Jan 18, 2026', status: 'Submitted' },
              ].map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-gold/30 hover:bg-white transition-all shadow-sm group">
                  <div className="flex items-center space-x-6">
                    <div className="p-3 bg-white rounded-xl text-green-500 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-tight text-black group-hover:text-gold transition-colors">{sub.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 opacity-80">{sub.info}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-green-500 tracking-[0.2em] bg-green-50 px-4 py-1 rounded-full">{sub.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
          <div className="bg-black text-white p-10 rounded-[3rem] shadow-xl border border-[#B8860B] flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold opacity-5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 relative z-10">Transmit <br/><span className="text-gold">Assignment</span></h3>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Recipient Department</label>
                <select className="w-full bg-white/10 border-2 border-white/5 rounded-2xl p-5 text-[11px] font-black uppercase outline-none focus:ring-1 focus:ring-gold appearance-none cursor-pointer transition-all hover:bg-white/20">
                  <option className="bg-black">Select Teacher</option>
                  <option className="bg-black">Mr. Chen (Mathematics)</option>
                  <option className="bg-black">Mr. Yawi (Science)</option>
                  <option className="bg-black">Ms. Johnson (English)</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Institutional Asset</label>
                <div className="w-full h-48 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 cursor-pointer hover:border-gold/50 hover:bg-white/5 transition-all group/upload shadow-inner">
                  <Upload size={40} className="text-gold mb-4 group-hover/upload:scale-110 transition-transform" />
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 leading-relaxed">Drop Academic File <br/> or <span className="text-gold">Select From Device</span></p>
                </div>
              </div>

              <button className="w-full bg-gold text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-xl shadow-gold/20 flex items-center justify-center space-x-3 active:scale-95 group/btn">
                <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                <span>Transmit To Registry</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full pointer-events-none" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center relative z-10">
              <ClipboardCheck size={18} className="mr-3 text-gold" /> Registry Protocol
            </h4>
            <ul className="space-y-6 text-[11px] font-bold text-gray-600 relative z-10">
              <li className="flex items-start space-x-4 group">
                <div className="w-6 h-6 bg-gold/10 rounded-lg flex items-center justify-center text-gold text-[10px] shrink-0 font-black group-hover:bg-gold group-hover:text-black transition-colors">01</div>
                <span className="leading-relaxed">Ensure files are in institutional standards (PDF or DOCX).</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-6 h-6 bg-gold/10 rounded-lg flex items-center justify-center text-gold text-[10px] shrink-0 font-black group-hover:bg-gold group-hover:text-black transition-colors">02</div>
                <span className="leading-relaxed">Maximum institutional payload capacity is 25MB per transmit.</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-6 h-6 bg-gold/10 rounded-lg flex items-center justify-center text-gold text-[10px] shrink-0 font-black group-hover:bg-gold group-hover:text-black transition-colors">03</div>
                <span className="leading-relaxed">Filename protocol: [Subject]_[TaskID]_[StudentName].</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentHub;
