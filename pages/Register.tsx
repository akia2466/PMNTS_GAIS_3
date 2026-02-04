
import React, { useState } from 'react';
import { ViewState } from '../types';
import { UserPlus, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';

interface Props {
  setView: (v: ViewState) => void;
  setRegisteredEmail: (email: string) => void;
}

const Register: React.FC<Props> = ({ setView, setRegisteredEmail }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    idNumber: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestActivation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulated registration logic
    setTimeout(() => {
      if (formData.email === 'exists@example.com') {
        setError("Institutional ID already associated with another account.");
        setIsLoading(false);
      } else {
        setRegisteredEmail(formData.email);
        setView('VERIFY');
      }
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[90vh] flex flex-col lg:flex-row bg-[#F8F8F8]">
      {/* Visual Side */}
      <div className="lg:w-1/2 bg-black text-white p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gold/5 blur-[120px] rounded-full translate-y-1/2" />
        
        <div className="relative z-10">
          <button 
            onClick={() => setView('LOGIN')}
            className="flex items-center space-x-2 text-gold font-bold uppercase tracking-widest text-xs mb-12 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={16} />
            <span>Back to Portal Access</span>
          </button>
          <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center font-bold text-black text-4xl mb-8">P</div>
          <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-8">Institutional <br/><span className="text-gold">Registry.</span></h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-md">Authorized registration for current students, faculty, and administrative staff members.</p>
        </div>

        <div className="relative z-10 flex items-center space-x-6">
          <ShieldCheck size={48} className="text-gold" />
          <div>
            <p className="text-lg font-bold">Verification Protocol</p>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">ID matching against school database</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-xl bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-2">Create Portal ID</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-8">Enter your official details to proceed</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRequestActivation}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">First Name</label>
                <input 
                  required 
                  name="firstName"
                  type="text" 
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" 
                  placeholder="Official"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Last Name</label>
                <input 
                  required 
                  name="lastName"
                  type="text" 
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" 
                  placeholder="Surname"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Institutional Email</label>
              <input 
                required 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" 
                placeholder="id@pomnhs.edu.pg" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Student/Staff ID No.</label>
              <input 
                required 
                name="idNumber"
                type="text" 
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" 
                placeholder="XXXX-XXXX"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Access Password</label>
              <input 
                required 
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold outline-none" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <UserPlus size={20} />
              )}
              <span>{isLoading ? 'Verifying Credentials...' : 'Register Institutional ID'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
