
import React from 'react';
import { UserRole, ViewState } from '../types';
import { 
  Users, GraduationCap, Heart, BookOpen, Globe, Lightbulb, CheckCircle, 
  ArrowRight, Star, ShieldCheck, Laptop, Search, Monitor
} from 'lucide-react';

interface Props {
  setView: (v: ViewState) => void;
  handleLogin: (role: UserRole) => void;
}

const PublicStudents: React.FC<Props> = ({ setView, handleLogin }) => {
  const clubs = [
    { cat: 'Academic Clubs', items: [
      { n: 'Science Club', i: <Lightbulb size={20}/>, d: 'Explore discoveries and conduct experiments' },
      { n: 'Math Olympiad', i: <BookOpen size={20}/>, d: 'Challenge yourself with advanced problems' },
      { n: 'Debate Club', i: <Users size={20}/>, d: 'Develop critical thinking and public speaking' }
    ]},
    { cat: 'Leadership & Service', items: [
      { n: 'Student Council', i: <ShieldCheck size={20}/>, d: 'Lead and represent the student body' },
      { n: 'Community Service', i: <Heart size={20}/>, d: 'Give back through volunteer work' },
      { n: 'Peer Mentorship', i: <Users size={20}/>, d: 'Guide and support younger students' }
    ]},
    { cat: 'Arts & Culture', items: [
      { n: 'Drama Society', i: <Star size={20}/>, d: 'Perform in plays and develop acting skills' },
      { n: 'Music Ensemble', i: <Star size={20}/>, d: 'Play instruments and perform as a group' },
      { n: 'Arts Club', i: <Star size={20}/>, d: 'Express yourself through various art forms' }
    ]},
    { cat: 'Special Interest', items: [
      { n: 'Cultural Club', i: <Globe size={20}/>, d: 'Celebrate and preserve PNG heritage' },
      { n: 'Technology Club', i: <Laptop size={20}/>, d: 'Learn coding, robotics, and tech innovations' },
      { n: 'Environmental Club', i: <Globe size={20}/>, d: 'Promote sustainability and awareness' }
    ]}
  ];

  const src = [
    { init: 'JK', name: 'Joshua Kila', role: 'Student President', quote: '"Leading our student body has taught me that unity and collaboration are the keys to achieving our shared goals. Together, we can make PMNHS an even better place for everyone."' },
    { init: 'GM', name: 'Grace Maru', role: 'Vice President', quote: '"I believe in empowering every student voice. My role is to ensure that all students feel heard, valued, and supported in their academic and personal growth journey."' },
    { init: 'DT', name: 'David Tau', role: 'Secretary', quote: '"Organization and transparency are crucial for effective student representation. I am committed to keeping our community informed and engaged with council activities."' }
  ];

  const features = [
    { icon: <CheckCircle className="text-gold" />, title: 'Academic Support', desc: 'Tutoring programs, study groups, and academic counseling to help every student succeed.', img: 'https://picsum.photos/seed/studsupport/600/400' },
    { icon: <Users className="text-gold" />, title: 'Student Clubs', desc: 'Over 20 clubs covering academics, arts, culture, and special interests.', img: 'https://picsum.photos/seed/studclubs/600/400' },
    { icon: <Star className="text-gold" />, title: 'Sports & Athletics', desc: 'Competitive teams in rugby, soccer, basketball, volleyball, and track.', img: 'https://picsum.photos/seed/studsports/600/400' },
    { icon: <Heart className="text-gold" />, title: 'Pastoral Care', desc: 'Dedicated counselors and support staff ensuring student wellbeing.', img: 'https://picsum.photos/seed/studcare/600/400' },
    { icon: <Globe className="text-gold" />, title: 'Cultural Events', desc: 'Celebrations of PNG\'s diverse cultures through festivals and activities.', img: 'https://picsum.photos/seed/studculture/600/400' },
    { icon: <GraduationCap className="text-gold" />, title: 'Career Guidance', desc: 'University prep and career counseling to plan your future path.', img: 'https://picsum.photos/seed/studcareer/600/400' }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#F8F8F8]">
      {/* Student Life Hero */}
      <section className="bg-black text-white py-24 border-b border-[#B8860B] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-gold font-bold uppercase tracking-[0.3em] mb-4 text-sm">Life at POMNHS</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-8 leading-none">Experience Vibrant <br/>Student Community.</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">Academic excellence meets personal growth, cultural celebration, and lifelong friendships.</p>
          
          <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-[3.5rem] border border-zinc-800 inline-flex flex-col md:flex-row items-center md:space-x-8">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-xs font-black uppercase tracking-widest text-gold mb-1">Portal Access</p>
              <p className="text-white text-sm font-bold">Ready to Access Your Student Portal?</p>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleLogin(UserRole.STUDENT)} className="bg-gold text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-gold/20 hover:scale-105 transition-all">Student Login</button>
              <button onClick={() => setView('REGISTER')} className="border border-white/20 text-white px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">Register Account</button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Life Features - With images at top as requested */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-[#F8F8F8] rounded-[3rem] border border-transparent hover:border-gold transition-all shadow-sm overflow-hidden flex flex-col group">
              <div className="h-48 w-full overflow-hidden">
                <img src={f.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={f.title} />
              </div>
              <div className="p-10 flex flex-col items-center text-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-2xl font-black text-black uppercase mb-4 tracking-tight">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clubs & Organizations */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Student Organizations</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Join a community of passionate students.</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {clubs.map((cat, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-gold font-black uppercase text-[11px] tracking-widest border-l-4 border-gold pl-4">{cat.cat}</h3>
              <div className="space-y-4">
                {cat.items.map((item, j) => (
                  <div key={j} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 hover:border-white/20 transition-all group">
                    <div className="flex items-center space-x-3 text-gold mb-3 group-hover:scale-105 transition-transform">
                      {item.i}<h4 className="font-black uppercase text-xs tracking-tight text-white">{item.n}</h4>
                    </div>
                    <p className="text-gray-500 text-[10px] leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Services */}
      <section className="py-24 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-4">Support Services</h2>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { t: 'Academic Counseling', d: 'Individual and group sessions to help students with course selection, study skills, and academic challenges.', m: 'Available Mon-Fri, 9AM-3PM' },
            { t: 'Pastoral Care', d: 'Confidential support for personal issues, mental health, and wellbeing from trained counselors.', m: 'By appointment' },
            { t: 'Library & Resources', d: 'Extensive collection of books, digital resources, and quiet study spaces for all students.', m: 'Open Mon-Sat, 7AM-6PM' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black uppercase mb-6">{s.t}</h3>
                <p className="text-gray-500 text-sm mb-10 leading-relaxed">{s.d}</p>
              </div>
              <div className="text-[10px] font-black uppercase text-gold bg-black px-6 py-2 rounded-full text-center tracking-widest">{s.m}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SRC Leadership */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-4">Student Council</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Your elected student leaders for 2026</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {src.map((member, i) => (
            <div key={i} className="bg-black text-white p-12 rounded-[3.5rem] relative group shadow-2xl border border-zinc-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
              <div className="w-20 h-20 bg-gold text-black rounded-[2rem] flex items-center justify-center font-black text-3xl mb-8 group-hover:scale-110 transition-transform shadow-xl shadow-gold/10">
                {member.init}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2 leading-none">{member.name}</h3>
              <p className="text-gold font-bold uppercase text-[10px] mb-8 tracking-widest">{member.role}</p>
              <p className="text-gray-400 text-lg leading-relaxed italic border-t border-zinc-800 pt-8">{member.quote}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicStudents;
