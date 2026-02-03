
import React, { useState } from 'react';
import { UserRole, ViewState } from '../types';
import { LogIn, Github, Mail, ShieldCheck } from 'lucide-react';

interface Props {
  onLogin: (role: UserRole) => void;
  setView: (v: ViewState) => void;
}

const Login: React.FC<Props> = ({ onLogin, setView }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);

  return (
    <div className="min-h-[90vh] flex flex-col lg:flex-row bg-[#F8F8F8]">
      {/* Branding Side */}
      <div className="lg:w-1/2 bg-black text-white p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center font-bold text-black text-4xl">P</div>
            <h1 className="text-4xl font-heading font-black tracking-tight uppercase">POMNHS</h1>
          </div>
          <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-8">Access Your <br/><span className="text-gold">Digital Campus.</span></h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-md">Secure portal for students, faculty, and administration of Port Moresby National High School.</p>
        </div>

        <div className="relative z-10 flex items-center space-x-6">
          <ShieldCheck size={48} className="text-gold" />
          <div>
            <p className="text-lg font-bold">Secure Access Guaranteed</p>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Enterprise Encrypted Sessions</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-lg bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-2">Welcome Back</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-8">Please select your role and sign in</p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                UserRole.STUDENT, 
                UserRole.TEACHER, 
                UserRole.ADMIN, 
                UserRole.PRINCIPAL
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedRole === role ? 'bg-gold text-black shadow-lg shadow-gold/30' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Institutional Email</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none transition-all" 
                  placeholder="ID@pomnhs.edu.pg" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest px-4">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                <span className="text-gray-400 group-hover:text-black">Keep me signed in</span>
              </label>
              <button className="text-gold hover:underline">Forgot password?</button>
            </div>

            <button 
              onClick={() => onLogin(selectedRole)}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn size={20} />
              <span>Login to Dashboard</span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-gray-400">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all font-bold text-sm">
                <Github size={18} />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all font-bold text-sm">
                <Mail size={18} />
                <span>Outlook</span>
              </button>
            </div>

            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-8">
              Don't have an account? <button onClick={() => setView('REGISTER')} className="text-gold hover:underline">Register Institutional ID</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
