
import React, { useState, useEffect } from 'react';
import { User, UserRole, ViewState } from './types';
import PublicHome from './pages/PublicHome';
import PublicAbout from './pages/PublicAbout';
import PublicAcademics from './pages/PublicAcademics';
import PublicStudents from './pages/PublicStudents';
import PublicContact from './pages/PublicContact';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import DashboardLayout from './components/DashboardLayout';
import MainDashboard from './pages/dashboards/MainDashboard';
import Messenger from './modules/Messenger';
import CommunityFeed from './modules/CommunityFeed';
import Vault from './modules/Vault';
import ScheduleModule from './modules/ScheduleModule';
import Performance from './pages/dashboards/Performance';
import AssignmentHub from './pages/dashboards/AssignmentHub';
import AttendanceRecord from './pages/dashboards/AttendanceRecord';
import Connections from './pages/dashboards/Connections';
import UserManagement from './pages/dashboards/UserManagement';
import { Menu, X, LogIn, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // Simulated system initialization
    const timer = setTimeout(() => {
      setIsAuthLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setView('DASHBOARD');
  };

  const handleLogin = (role: UserRole) => {
    setView('LOGIN');
  };

  const logout = () => {
    setUser(null);
    setView('HOME');
  };

  if (isAuthLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
        <Loader2 className="animate-spin text-gold mb-4" size={48} />
        <p className="text-gold font-bold uppercase tracking-widest text-[10px]">Portal Initializing...</p>
      </div>
    );
  }

  const renderPublicView = () => {
    switch (view) {
      case 'HOME': return <PublicHome setView={setView} handleLogin={handleLogin} />;
      case 'ABOUT': return <PublicAbout />;
      case 'ACADEMICS': return <PublicAcademics />;
      case 'STUDENTS': return <PublicStudents setView={setView} handleLogin={handleLogin} />;
      case 'CONTACT': return <PublicContact />;
      case 'LOGIN': return <Login onLoginSuccess={handleLoginSuccess} setView={setView} />;
      case 'REGISTER': return <Register setView={setView} setRegisteredEmail={setRegisteredEmail} />;
      case 'VERIFY': return <VerifyEmail setView={setView} email={registeredEmail} />;
      default: return <PublicHome setView={setView} handleLogin={handleLogin} />;
    }
  };

  if (view === 'DASHBOARD' && user) {
    return (
      <DashboardLayout 
        user={user} 
        activeTab={dashboardTab} 
        setActiveTab={setDashboardTab} 
        logout={logout}
      >
        {dashboardTab === 'overview' && <MainDashboard user={user} />}
        {dashboardTab === 'performance' && <Performance user={user} />}
        {dashboardTab === 'attendance' && <AttendanceRecord user={user} />}
        {dashboardTab === 'schedule' && <ScheduleModule user={user} />}
        {dashboardTab === 'assignments' && user.role !== UserRole.PRINCIPAL && <AssignmentHub user={user} />}
        {dashboardTab === 'files' && <Vault user={user} />}
        {dashboardTab === 'messenger' && <Messenger user={user} />}
        {dashboardTab === 'community' && <CommunityFeed user={user} />}
        {dashboardTab === 'connections' && <Connections user={user} />}
        {dashboardTab === 'users' && user.role === UserRole.PRINCIPAL && <UserManagement user={user} />}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-black text-white shadow-xl border-b border-[#B8860B]">
        {/* Header content unchanged for public view */}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('HOME')}>
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-bold text-black text-xl group-hover:scale-110 transition-transform shadow-lg shadow-gold/20">P</div>
            <div>
              <h1 className="text-xl font-heading font-extrabold tracking-tight leading-none uppercase">POMNHS</h1>
              <p className="text-[10px] text-gold font-semibold uppercase tracking-widest leading-none mt-1">Port Moresby National High</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center text-[11px] font-black uppercase tracking-widest">
            {['HOME', 'ABOUT', 'ACADEMICS', 'STUDENTS', 'CONTACT'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v as ViewState)}
                className={`transition-colors hover:text-gold relative ${view === v ? 'text-gold' : 'text-gray-300'}`}
              >
                {v}
                {view === v && <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gold rounded-full" />}
              </button>
            ))}
            <button 
              onClick={() => setView('LOGIN')}
              className="bg-gold text-black px-6 py-2 rounded-full font-black flex items-center space-x-2 hover:bg-white hover:text-black transition-all transform active:scale-95 shadow-lg shadow-gold/10"
            >
              <LogIn size={16} />
              <span>SIGN IN</span>
            </button>
          </nav>

          <button className="md:hidden text-gold p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-[#B8860B] py-4 px-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              {['HOME', 'ABOUT', 'ACADEMICS', 'STUDENTS', 'CONTACT'].map((v) => (
                <button 
                  key={v}
                  onClick={() => { setView(v as ViewState); setIsMobileMenuOpen(false); }}
                  className={`text-left text-lg font-heading py-2 tracking-widest uppercase font-black ${view === v ? 'text-gold' : 'text-white'}`}
                >
                  {v}
                </button>
              ))}
              <button 
                onClick={() => { setView('LOGIN'); setIsMobileMenuOpen(false); }}
                className="bg-gold text-black w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest"
              >
                SIGN IN
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {renderPublicView()}
      </main>

      <footer className="bg-black text-white pt-20 pb-10 border-t border-[#B8860B]">
        {/* Footer content unchanged */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center font-bold text-black text-2xl shadow-xl shadow-gold/10">P</div>
                <h2 className="text-2xl font-heading font-extrabold uppercase tracking-tight">Port Moresby National High</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Empowering the next generation of leaders through rigorous academic standards and institutional excellence. Located in the heart of Waigani, Port Moresby.
              </p>
            </div>
            <div>
              <h3 className="text-gold font-heading font-bold mb-8 uppercase tracking-widest text-[10px]">Quick Navigation</h3>
              <ul className="space-y-4 text-gray-300 font-black uppercase tracking-wider text-[10px]">
                <li><button onClick={() => setView('ABOUT')} className="hover:text-gold transition-colors">History & Legacy</button></li>
                <li><button onClick={() => setView('ACADEMICS')} className="hover:text-gold transition-colors">Academic Catalog</button></li>
                <li><button onClick={() => setView('STUDENTS')} className="hover:text-gold transition-colors">Student Life</button></li>
                <li><button onClick={() => setView('CONTACT')} className="hover:text-gold transition-colors">Administration</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-heading font-bold mb-8 uppercase tracking-widest text-[10px]">Institutional Contact</h3>
              <p className="text-gray-300 mb-2 font-bold uppercase tracking-wide text-xs">Waigani Campus</p>
              <p className="text-gray-400 mb-2 text-sm leading-relaxed">PO Box 1234, Waigani<br/>Port Moresby, NCD</p>
              <p className="text-gray-300 mb-2 font-black text-xs">+675 325 1000</p>
              <p className="text-gold font-black text-xs tracking-wider">info@pomnhs.edu.pg</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <p>&copy; 2024 Port Moresby National High School. Higher Standards.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-gold transition-all">Facebook</a>
              <a href="#" className="hover:text-gold transition-all">𝕏</a>
              <a href="#" className="hover:text-gold transition-all">LinkedIn</a>
              <a href="#" className="hover:text-gold transition-all">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
