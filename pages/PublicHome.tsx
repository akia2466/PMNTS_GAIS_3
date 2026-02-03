
import React from 'react';
import { METRICS, NEWS } from '../constants';
import { ChevronRight, Calendar, ArrowRight, Star } from 'lucide-react';
import { UserRole, ViewState } from '../types';

interface Props {
  setView: (v: ViewState) => void;
  handleLogin: (role: UserRole) => void;
}

const PublicHome: React.FC<Props> = ({ setView, handleLogin }) => {
  const events = [
    { day: '15', month: 'Feb', title: 'Parent-Teacher Conference', desc: 'Annual meeting to discuss student progress and academic goals' },
    { day: '1-5', month: 'Mar', title: 'Mid-Term Examinations', desc: 'First semester mid-term exams across all grade levels' },
    { day: '20', month: 'Mar', title: 'Annual Sports Day', desc: 'Inter-house athletics competition featuring track and field events' },
    { day: '10', month: 'Apr', title: 'Science Fair', desc: 'Students showcase innovative science projects and experiments' },
    { day: '5', month: 'May', title: 'Cultural Week', desc: 'Celebration of Papua New Guinea\'s diverse cultures and traditions' },
    { day: '15-25', month: 'Jun', title: 'Final Examinations', desc: 'End of semester examinations for all students' },
  ];

  const stories = [
    { title: 'National Math Olympiad Champions', date: 'December 2025', desc: 'Our students secured first place in the 2025 National Mathematics Olympiad, competing against teams from across the country.', img: 'https://picsum.photos/seed/math-win/600/400' },
    { title: 'Alumni Spotlight: Dr. Sarah Pato', date: 'November 2025', desc: 'Class of 2010 graduate Dr. Sarah Pato returns as keynote speaker. Now a leading medical researcher.', img: 'https://picsum.photos/seed/alumni/600/400' },
    { title: 'Community Service Initiative', date: 'October 2025', desc: 'Student volunteers spent 500+ hours teaching literacy skills to children in nearby communities.', img: 'https://picsum.photos/seed/service/600/400' },
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 scale-105"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://picsum.photos/seed/school-hero/1920/1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-gold font-heading font-extrabold uppercase tracking-[0.2em] mb-4 text-xl md:text-2xl animate-in slide-in-from-top duration-700">Port Moresby National High School</h2>
          <h1 className="text-white font-heading font-black text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-8 animate-in slide-in-from-bottom duration-700">A Tradition of <br/>Higher Standards.</h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-12">
            <button 
              onClick={() => setView('ABOUT')}
              className="group bg-gold text-black px-10 py-5 rounded-full font-bold text-lg flex items-center space-x-3 hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-gold/20"
            >
              <span>Read Principal's Message</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => handleLogin(UserRole.STUDENT)}
              className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              Student Portal Access
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-2">Scroll to explore</span>
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-black py-20 border-y border-[#B8860B]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {METRICS.map((metric, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl text-center group hover:border-gold/50 transition-all hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center text-black mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  {metric.icon}
                </div>
                <h3 className="text-white text-3xl font-black mb-1">{metric.value}</h3>
                <p className="text-gray-500 font-semibold uppercase tracking-widest text-[9px] leading-tight">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <p className="text-gold font-bold uppercase tracking-widest mb-4">Academic Excellence</p>
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">Diverse Pathways.</h2>
            </div>
            <button 
              onClick={() => setView('ACADEMICS')}
              className="mt-8 md:mt-0 text-black font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 border-gold pb-1 hover:text-gold transition-colors"
            >
              <span>View All Programs</span>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Regular Curriculum', desc: 'A holistic foundation for grades 11-12 covering core PNG education standards.', img: 'https://picsum.photos/seed/p1/600/800' },
              { title: 'Advanced Placement', desc: 'Accelerated programs for high-achieving students targeting international universities.', img: 'https://picsum.photos/seed/p2/600/800' },
              { title: 'Sports Excellence', desc: 'Professional training combined with academic rigor for aspiring student-athletes.', img: 'https://picsum.photos/seed/p3/600/800' },
            ].map((program, idx) => (
              <div key={idx} className="group cursor-pointer relative overflow-hidden rounded-[2.5rem] h-[500px] shadow-2xl">
                <img src={program.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter transform group-hover:-translate-y-2 transition-transform">{program.title}</h3>
                  <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm leading-relaxed">{program.desc}</p>
                  <div className="w-12 h-[2px] bg-gold group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <p className="text-gold font-bold uppercase tracking-widest mb-4">Institutional Timeline</p>
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">Upcoming Events</h2>
            </div>
            <button className="mt-8 md:mt-0 bg-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gold hover:text-black transition-all shadow-xl">
              View All Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <div key={idx} className="flex space-x-6 p-8 bg-white rounded-[2.5rem] border border-transparent hover:border-gold transition-all group shadow-sm">
                <div className="flex flex-col items-center justify-center min-w-[70px] h-[90px] bg-black text-white rounded-2xl group-hover:bg-gold group-hover:text-black transition-colors shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest">{event.month}</span>
                  <span className="text-2xl font-black">{event.day}</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-black uppercase mb-2 leading-tight group-hover:text-muted-gold transition-colors">{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 rounded-l-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-gold font-bold uppercase tracking-widest mb-4">Success Stories</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Stories Worth Telling</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {stories.map((story, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-80 overflow-hidden rounded-[2.5rem] mb-8 border border-white/10 shadow-2xl">
                  <img src={story.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute top-6 right-6 bg-gold text-black p-3 rounded-2xl shadow-xl">
                    <Star size={20} fill="black" />
                  </div>
                </div>
                <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-3">{story.date}</p>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{story.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 text-sm">{story.desc}</p>
                <button className="flex items-center space-x-2 text-white font-black text-[10px] uppercase tracking-widest hover:text-gold transition-colors border-b border-white/20 pb-1">
                  <span>Read Full Story</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section - Moved to bottom as requested */}
      <section className="py-24 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">Institutional News</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Stay updated with the latest happenings</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
              <div className="h-64 overflow-hidden relative">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-6 left-6 bg-gold text-black font-black text-[10px] uppercase px-4 py-1.5 rounded-full shadow-lg">
                  {item.category}
                </span>
              </div>
              <div className="p-8">
                <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-3">{item.date}</p>
                <h3 className="text-xl font-heading font-extrabold text-black uppercase mb-4 leading-tight group-hover:text-muted-gold transition-colors">{item.title}</h3>
                <p className="text-gray-500 mb-6 line-clamp-2 text-sm">{item.excerpt}</p>
                <button className="flex items-center space-x-2 text-black font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors">
                  <span>Read Article</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
