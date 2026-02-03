
import React from 'react';
import { ViewState } from '../types';
import { UserPlus, ArrowLeft } from 'lucide-react';

interface Props {
  setView: (v: ViewState) => void;
}

const Register: React.FC<Props> = ({ setView }) => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#F8F8F8] p-8">
      <div className="w-full max-w-xl bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 relative">
        <button 
          onClick={() => setView('LOGIN')}
          className="absolute top-10 left-10 text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center font-bold text-black text-4xl mx-auto mb-6">P</div>
          <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-2">Institutional ID Registry</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Create your school network identity</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">First Name</label>
                <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Last Name</label>
                <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Institutional Email</label>
              <input type="email" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" placeholder="Required for verification" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Student/Staff ID No.</label>
              <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Create Password</label>
              <input type="password" className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" />
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setView('VERIFY')}
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl"
          >
            <UserPlus size={20} />
            <span>Request Activation</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
