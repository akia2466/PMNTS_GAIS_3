
import React from 'react';
import { ViewState } from '../types';
import { Mail, CheckCircle, ArrowRight, RefreshCcw } from 'lucide-react';

interface Props {
  setView: (v: ViewState) => void;
  email: string;
}

const VerifyEmail: React.FC<Props> = ({ setView, email }) => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#F8F8F8] p-8">
      <div className="w-full max-w-lg bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100 text-center">
        <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-10">
          <Mail size={48} className="animate-bounce" />
        </div>
        
        <h3 className="text-4xl font-black text-black uppercase tracking-tighter mb-4">Check Your Inbox</h3>
        <p className="text-gray-500 font-semibold mb-12">
          We've sent a verification link to <span className="text-black font-black">{email || 'your email'}</span>. 
          Please verify your email to access the institutional dashboard.
        </p>

        <div className="space-y-6">
          <button 
            onClick={() => setView('LOGIN')}
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl"
          >
            <span>Back to Sign In</span>
            <ArrowRight size={20} />
          </button>
          
          <button className="flex items-center justify-center space-x-2 text-gray-400 font-black uppercase tracking-widest text-[10px] mx-auto hover:text-black transition-colors">
            <RefreshCcw size={14} />
            <span>Resend Verification Email</span>
          </button>
        </div>

        <div className="mt-16 pt-10 border-t border-gray-50">
          <div className="flex items-center justify-center space-x-3 text-[10px] font-black uppercase tracking-widest text-green-500">
            <CheckCircle size={16} />
            <span>Institutional Security Protocol Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
