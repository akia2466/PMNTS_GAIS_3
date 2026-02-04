
import React from 'react';
import { Mail, Phone, BookOpen, FlaskConical, Monitor, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const PublicAcademics: React.FC = () => {
  const departments = [
    { 
      name: 'Computer Science', 
      hod: 'Dr. Alan Turing', 
      desc: 'Focuses on the theory of computation and the design of computational systems. Offers programs in software engineering, data science, and artificial intelligence.',
      email: 'compsci@example.edu',
      ext: '101',
      img: 'https://picsum.photos/seed/deptcs/800/600'
    },
    { 
      name: 'Mathematics', 
      hod: 'Dr. Ada Lovelace', 
      desc: 'Dedicated to advancing mathematical knowledge and problem-solving skills. Specializes in pure and applied mathematics, statistics, and actuarial science.',
      email: 'math@example.edu',
      ext: '102',
      img: 'https://picsum.photos/seed/deptmath/800/600'
    },
    { 
      name: 'Natural Sciences', 
      hod: 'Dr. Marie Curie', 
      desc: 'Explores the natural world through physics, chemistry, and biology. Emphasizes experimental research and environmental sustainability.',
      email: 'science@example.edu',
      ext: '103',
      img: 'https://picsum.photos/seed/deptscience/800/600'
    },
    { 
      name: 'English & Literature', 
      hod: 'Dr. William Shakespeare', 
      desc: 'Cultivates language proficiency, literary analysis, and creative expression. Offers courses in composition, rhetoric, and world literature.',
      email: 'english@example.edu',
      ext: '104',
      img: 'https://picsum.photos/seed/depteng/800/600'
    },
    { 
      name: 'Social Studies', 
      hod: 'Dr. Nelson Mandela', 
      desc: 'Examines human society, culture, and institutions. Programs include history, geography, economics, and political science.',
      email: 'socialstudies@example.edu',
      ext: '105',
      img: 'https://picsum.photos/seed/deptsocial/800/600'
    },
    { 
      name: 'Fine Arts', 
      hod: 'Dr. Leonardo Da Vinci', 
      desc: 'Nurtures creativity and artistic expression through visual arts, music, and performing arts. Provides studio space and performance venues.',
      email: 'arts@example.edu',
      ext: '106',
      img: 'https://picsum.photos/seed/deptarts/800/600'
    },
  ];

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true&format=svg`;
  };

  const faculty = [
    { init: 'EV', name: 'Dr. Eleanor Vance', dept: 'Computer Science', email: 'e.vance@university.edu' },
    { init: 'MC', name: 'Dr. Michael Chen', dept: 'Mathematics', email: 'm.chen@university.edu' },
    { init: 'ST', name: 'Dr. Sarah Thompson', dept: 'Natural Sciences', email: 's.thompson@university.edu' },
    { init: 'JW', name: 'Dr. James Wilson', dept: 'English & Literature', email: 'j.wilson@university.edu' },
    { init: 'PG', name: 'Dr. Patricia Garcia', dept: 'Social Studies', email: 'p.garcia@university.edu' },
    { init: 'RM', name: 'Dr. Robert Martinez', dept: 'Fine Arts', email: 'r.martinez@university.edu' },
    { init: 'LA', name: 'Dr. Linda Anderson', dept: 'Natural Sciences', email: 'l.anderson@university.edu' },
    { init: 'DL', name: 'Dr. David Lee', dept: 'Social Studies', email: 'd.lee@university.edu' },
    { init: 'JB', name: 'Dr. Jennifer Brown', dept: 'Fine Arts', email: 'j.brown@university.edu' },
    { init: 'TW', name: 'Dr. Thomas White', dept: 'Computer Science', email: 't.white@university.edu' },
    { init: 'MR', name: 'Dr. Maria Rodriguez', dept: 'Natural Sciences', email: 'm.rodriguez@university.edu' },
    { init: 'CT', name: 'Dr. Christopher Taylor', dept: 'English & Literature', email: 'c.taylor@university.edu' },
  ];

  const resources = [
    { icon: <BookOpen className="text-gold" />, title: 'Library & Learning Center', desc: 'Modern library with over 15,000 books, digital resources, and study spaces. Open Mon-Sat, 7AM - 6PM.' },
    { icon: <FlaskConical className="text-gold" />, title: 'Science Laboratories', desc: 'Fully-equipped labs for Physics, Chemistry, and Biology. Hands-on experiments and research projects.' },
    { icon: <Monitor className="text-gold" />, title: 'Computer Labs', desc: 'Two computer labs with 60+ workstations, high-speed internet, and industry software.' },
  ];

  const scheduleEvents = [
    { d: '26', m: 'Oct', time: '09:00 AM', v: 'School Gymnasium', title: 'Annual School Science Fair', desc: 'Showcasing innovative science projects from students across all grades.' },
    { d: '15', m: 'Nov', time: '03:00 PM', v: 'Various Classrooms', title: 'Parent-Teacher Conference Day', desc: 'Meet with teachers to discuss student progress and academic goals.' },
    { d: '5', m: 'Dec', time: '07:00 PM', v: 'School Auditorium', title: 'Fall Music Concert', desc: 'Featuring performances by the school band, choir, and orchestra.' },
    { d: '1', m: 'Nov', time: '04:00 PM', v: 'School Sports Fields & Gym', title: 'Winter Sports Tryouts', desc: 'Tryouts for basketball, wrestling, and swimming teams.' },
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#F8F8F8]">
      {/* Header */}
      <section className="bg-black py-24 border-b border-[#B8860B]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-bold uppercase tracking-[0.3em] mb-4 text-sm">Curriculum Excellence</p>
          <h1 className="text-white text-6xl font-black uppercase tracking-tighter mb-6">Academic Catalog</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">Rigorous academic standards designed to prepare students for the global stage.</p>
        </div>
      </section>

      {/* Detailed Departments Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-4">Our Departments</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Connect with our specialized academic divisions</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {departments.map((dept, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-12 hover:shadow-2xl transition-all group overflow-hidden relative flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[5rem] group-hover:bg-gold/10 transition-colors" />
                <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-2">{dept.name}</h3>
                <p className="text-gold font-bold uppercase tracking-widest text-[10px] mb-6">Head of Department: {dept.hod}</p>
                <p className="text-gray-600 leading-relaxed mb-8 text-sm flex-grow">{dept.desc}</p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pb-8 border-b border-gray-50 mb-8">
                  <div className="flex items-center space-x-3 text-gray-500 hover:text-gold transition-colors cursor-pointer">
                    <Mail size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{dept.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-500">
                    <Phone size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Ext. {dept.ext}</span>
                  </div>
                </div>
                {/* Department Image below contacts */}
                <div className="h-48 rounded-2xl overflow-hidden border border-gray-50">
                  <img src={dept.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dept.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Program Overview */}
      <section className="py-24 bg-black text-white overflow-hidden relative border-y border-[#B8860B]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Regular Program</h2>
              <p className="text-gray-400 text-lg leading-relaxed">Our standard curriculum prepares students for the Papua New Guinea national examinations (Grade 10 & 12).</p>
              <ul className="space-y-6">
                {['Core subjects: Mathematics, English, Science, Social Studies', 'Continuous assessment and semester examinations', 'Professional career guidance and counseling'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-gold shadow-lg"><CheckCircle size={18}/></div>
                    <span className="text-lg font-bold text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900 p-12 rounded-[3.5rem] border border-zinc-800 space-y-10 shadow-2xl">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-gold">Advanced Placement</h2>
              <p className="text-gray-300 text-lg leading-relaxed">Accelerated track offering advanced coursework and international university preparation.</p>
              <ul className="space-y-6">
                {['Advanced Mathematics and Applied Sciences', 'Research methodology and university entrance prep', 'Comprehensive scholarship application support'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-black shadow-lg"><CheckCircle size={18}/></div>
                    <span className="text-lg font-bold text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Highlight */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2 grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-gold/5 -rotate-3 rounded-[3rem] -z-10" />
              <img src="https://picsum.photos/seed/lab1/400/400" className="rounded-3xl shadow-xl border border-gray-100" alt="" />
              <img src="https://picsum.photos/seed/lab2/400/400" className="rounded-3xl shadow-xl mt-12 border border-gray-100" alt="" />
            </div>
            <div className="md:w-1/2">
              <p className="text-gold font-bold uppercase tracking-widest mb-4">Science & Innovation</p>
              <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-8">World-Class Laboratories.</h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-10">Our labs are equipped with the latest diagnostic and analytical tools, facilitating advanced research in physics, chemistry, and biology.</p>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] border border-gray-100">
                <ul className="space-y-4">
                  {['High-Speed Fiber Connectivity', '3D Printing & Robotics Lab', 'Advanced Chemistry Centers'].map((f, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-gold rounded-md flex items-center justify-center text-black font-black text-xs">✓</div>
                      <span className="text-md font-bold text-gray-800 uppercase tracking-wide">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Resources */}
      <section className="py-24 bg-[#F8F8F8] border-y border-gray-100">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-4">Academic Resources</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Providing the tools for institutional success</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((res, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#F8F8F8] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors shadow-sm">
                {res.icon}
              </div>
              <h3 className="text-2xl font-black text-black uppercase mb-4 tracking-tight">{res.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{res.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Events Calendar */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Institutional Events</h2>
              <p className="text-gray-400">Join us for showcases and academic conferences</p>
            </div>
            <button className="mt-8 md:mt-0 bg-gold text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-gold/20">View Full Calendar</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scheduleEvents.map((ev, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] hover:border-gold transition-all group flex flex-col sm:flex-row sm:space-x-8 shadow-2xl">
                <div className="flex flex-col items-center justify-center min-w-[90px] h-[90px] bg-gold text-black rounded-3xl mb-6 sm:mb-0 group-hover:bg-white transition-colors">
                  <span className="text-[10px] font-black uppercase">{ev.m}</span>
                  <span className="text-3xl font-black">{ev.d}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-4 mb-2 text-[9px] font-black uppercase tracking-widest text-gold">
                    <span>{ev.time}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                    <span>{ev.v}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase mb-3 leading-tight group-hover:text-gold transition-colors">{ev.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">{ev.desc}</p>
                  <button className="flex items-center space-x-2 text-white font-black text-[9px] uppercase tracking-widest hover:text-gold transition-colors border-b border-white/10 pb-1">
                    <span>Register Now</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty & Staff Directory */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-4">Faculty & Staff</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Meet our dedicated educators</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((f, i) => (
            <div key={i} className="bg-[#F8F8F8] rounded-[2rem] border border-gray-100 hover:border-gold transition-all group text-center overflow-hidden flex flex-col shadow-sm">
              <div className="h-64 w-full overflow-hidden bg-gray-200">
                <img src={getAvatarUrl(f.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={f.name} />
              </div>
              <div className="p-8">
                <h4 className="text-base font-black uppercase mb-1 truncate">{f.name}</h4>
                <p className="text-gold font-bold uppercase text-[10px] mb-4 tracking-widest">{f.dept}</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-center space-x-2 text-gray-400 group-hover:text-black transition-colors">
                  <Mail size={14} />
                  <p className="text-[10px] font-black tracking-widest">{f.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicAcademics;
