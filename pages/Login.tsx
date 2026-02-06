
import React, { useState } from 'react';
import { User, UserRole, ViewState } from '../types';
import { 
  ShieldCheck, 
  Loader2, 
  User as UserIcon, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Wallet, 
  UserPlus,
  Users,
  Zap,
  ShoppingBag
} from 'lucide-react';

interface Props {
  onLoginSuccess: (user: User) => void;
  setView: (v: ViewState) => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess, setView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const demoAccounts = [
    { role: UserRole.STUDENT, label: 'Student', icon: <UserIcon size={24} />, color: 'bg-blue-50 text-blue-600 border-blue-100', name: 'James Kari', email: 'james.k@pomnhs.edu.pg' },
    { role: UserRole.TEACHER, label: 'Teacher', icon: <GraduationCap size={24} />, color: 'bg-purple-50 text-purple-600 border-purple-100', name: 'Dr. Anna Vele', email: 'a.vele@pomnhs.edu.pg' },
    { role: UserRole.PATRON, label: 'Patron', icon: <GraduationCap size={24} />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100', name: 'Mr. David Patron', email: 'd.patron@pomnhs.edu.pg' },
    { role: UserRole.PRINCIPAL, label: 'Principal', icon: <Building2 size={24} />, color: 'bg-gold/10 text-gold border-gold/20', name: 'Dr. James Gere', email: 'principal@pomnhs.edu.pg' },
    { role: UserRole.HOD, label: 'HOD (Mathematics)', icon: <Briefcase size={24} />, color: 'bg-green-50 text-green-600 border-green-100', name: 'Ms. Sarah Smith', email: 's.smith@pomnhs.edu.pg' },
    { role: UserRole.BURSAR, label: 'Bursar', icon: <Wallet size={24} />, color: 'bg-orange-50 text-orange-600 border-orange-100', name: 'Bursar Office', email: 'accounts@pomnhs.edu.pg' },
    { role: UserRole.ADMISSIONS, label: 'Admissions', icon: <Users size={24} />, color: 'bg-cyan-50 text-cyan-600 border-cyan-100', name: 'Registrar', email: 'admissions@pomnhs.edu.pg' },
    { role: UserRole.ADMIN, label: 'IT Admin', icon: <ShieldCheck size={24} />, color: 'bg-zinc-100 text-zinc-900 border-zinc-200', name: 'Systems Admin', email: 'admin@pomnhs.edu.pg' },
    { role: UserRole.SUPER_USER, label: 'Super User', icon: <Zap size={24} />, color: 'bg-red-50 text-red-600 border-red-100', name: 'Chief Overseer', email: 'root@pomnhs.edu.pg' },
  ];

  const handleQuickLogin = (role: UserRole, name: string, email: string) => {
    setIsLoading(true);
    setSelectedRole(role);
    
    setTimeout(() => {
      onLoginSuccess({
        id: Math.floor(Math.random() * 10000).toString(),
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true`,
        isVerified: true
      });
      setIsLoading(false);
    }, 800);
  };

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
            <p className="text-lg font-bold">Institutional Access Point</p>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Select your role to continue</p>
          </div>
        </div>
      </div>

      {/* Role Selection Side */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24 overflow-y-auto max-h-screen">
        <div className="w-full max-w-2xl bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 my-10">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-2">Portal Sign In</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Select a demo profile to enter the dashboard</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                onClick={() => handleQuickLogin(acc.role, acc.name, acc.email)}
                disabled={isLoading}
                className={`p-8 rounded-3xl border transition-all text-center flex flex-col items-center group relative overflow-hidden ${acc.color} ${isLoading && selectedRole === acc.role ? 'ring-4 ring-gold' : 'hover:scale-105 active:scale-95'}`}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {isLoading && selectedRole === acc.role ? <Loader2 className="animate-spin" size={24} /> : acc.icon}
                </div>
                <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-1 leading-tight">{acc.label}</h4>
                <p className="text-[9px] opacity-60 font-bold uppercase truncate w-full">{acc.name}</p>
                
                {isLoading && selectedRole === acc.role && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                    <Loader2 className="animate-spin text-black" size={24} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">First time accessing the new portal?</p>
            <button 
              onClick={() => setView('REGISTER')}
              className="bg-zinc-100 text-black px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gold transition-all shadow-sm flex items-center mx-auto space-x-3"
            >
              <UserPlus size={16} />
              <span>Register Institutional ID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
