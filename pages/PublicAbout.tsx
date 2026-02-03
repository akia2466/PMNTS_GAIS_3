
import React from 'react';
import { Award, ShieldCheck, Users, Lightbulb, Globe, History } from 'lucide-react';

const PublicAbout: React.FC = () => {
  const leaders = [
    { initials: 'JK', name: 'Dr. John Kila', role: 'Principal', quote: '"Excellence in education is not just about test scores, but about nurturing well-rounded individuals who will shape our nation\'s future."' },
    { initials: 'MT', name: 'Mary Tau', role: 'Vice Principal (Academic)', quote: '"Every student has unique talents waiting to be discovered. Our role is to provide the platform for them to shine."' },
    { initials: 'PN', name: 'Peter Nambui', role: 'Vice Principal (Administration)', quote: '"A well-organized school is a thriving school. We ensure every resource supports our students\' success."' },
    { initials: 'SK', name: 'Sarah Kore', role: 'Director of Student Services', quote: '"Student wellbeing is at the heart of everything we do. When students feel supported, they achieve greatness."' },
  ];

  const values = [
    { icon: <Award className="text-gold" size={32} />, title: 'Excellence', desc: 'Striving for the highest standards in all endeavors' },
    { icon: <ShieldCheck className="text-gold" size={32} />, title: 'Integrity', desc: 'Upholding honesty and strong moral principles' },
    { icon: <Users className="text-gold" size={32} />, title: 'Respect', desc: 'Valuing diversity and treating all with dignity' },
    { icon: <Lightbulb className="text-gold" size={32} />, title: 'Innovation', desc: 'Embracing creativity and continuous improvement' },
    { icon: <Globe className="text-gold" size={32} />, title: 'Community', desc: 'Building strong relationships and social responsibility' },
  ];

  const galleryItems = [
    { title: 'Main Entrance', desc: 'The iconic main gate welcoming students and visitors.', img: 'https://picsum.photos/seed/gate/800/600' },
    { title: 'University Library', desc: 'Students studying in the modern and spacious library reading room.', img: 'https://picsum.photos/seed/library/800/600' },
    { title: 'Chemistry Lab 305', desc: 'Advanced chemistry lab equipped for cutting-edge research.', img: 'https://picsum.photos/seed/chemlab/800/600' },
    { title: 'North Hall Dormitory', desc: 'A comfortable and well-lit student dormitory room.', img: 'https://picsum.photos/seed/dorm/800/600' },
    { title: 'Athletic Complex', desc: 'The school\'s multi-purpose athletic field under a clear sky.', img: 'https://picsum.photos/seed/field/800/600' },
    { title: 'Central Campus Quad', desc: 'Students relaxing and socializing on the central campus quad.', img: 'https://picsum.photos/seed/quad/800/600' },
    { title: 'Fine Arts Studio', desc: 'Creative space in the Fine Arts building, bustling with student artists.', img: 'https://picsum.photos/seed/studio/800/600' },
    { title: 'Lecture Hall A', desc: 'A modern lecture hall ready for an engaging class.', img: 'https://picsum.photos/seed/lecture/800/600' },
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#F8F8F8]">
      {/* Principal's Message */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold rounded-[3rem] opacity-20 group-hover:opacity-30 transition-opacity" />
              <img 
                src="https://picsum.photos/seed/principal/800/1000" 
                className="relative rounded-[2.5rem] shadow-2xl w-full h-[600px] object-cover"
                alt="Principal"
              />
              <div className="absolute bottom-10 -right-10 bg-black text-white p-10 rounded-3xl shadow-2xl hidden md:block max-w-xs border border-[#B8860B]">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">Dr. James Gere</h3>
                <p className="text-gold font-bold uppercase tracking-widest text-[10px]">School Principal Since 2012</p>
              </div>
            </div>
            <div>
              <p className="text-gold font-bold uppercase tracking-widest mb-6">Institutional Leadership</p>
              <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-8">A Message from the Principal</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>Welcome to Port Moresby National High School. Our institution has stood as a beacon of academic excellence for over four decades, nurturing the minds of Papua New Guinea's future leaders.</p>
                <p>Our philosophy is simple: we believe in the pursuit of perfection through discipline, innovation, and an unwavering commitment to institutional integrity.</p>
                <p>As we move into a digital-first era, POMNHS continues to integrate modern technology while maintaining the traditional academic rigors that have made us the premier high school in the nation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision/Mission Grid */}
      <section className="py-24 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-16 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-4xl font-black text-black uppercase tracking-tighter mb-8">Our Vision</h3>
            <p className="text-gray-500 text-xl leading-relaxed">To be a globally recognized center of academic excellence that produces innovative leaders who contribute meaningfully to the socio-economic development of the world.</p>
          </div>
          <div className="bg-black text-white p-16 rounded-[3rem] shadow-xl border border-[#B8860B]">
            <h3 className="text-4xl font-black text-gold uppercase tracking-tighter mb-8">Our Mission</h3>
            <p className="text-gray-300 text-xl leading-relaxed">To provide a rigorous, holistic education that fosters critical thinking, moral integrity, and a lifelong passion for learning through high institutional standards.</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-3 mb-6 bg-gold/10 px-6 py-2 rounded-full border border-gold/20">
                <History className="text-gold" size={20} />
                <span className="text-gold font-black uppercase tracking-widest text-[10px]">Institutional Timeline</span>
              </div>
              <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-8">Our History</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify">
                <p>Port Moresby National High School was established in 1950, making it one of the oldest and most prestigious secondary schools in Papua New Guinea. Founded during the Australian administration period, the school began with just 50 students and a handful of dedicated teachers in temporary buildings.</p>
                <p>Over the decades, PMNHS has grown exponentially, both in size and reputation. The school played a crucial role in educating Papua New Guinea's first generation of post-independence leaders, including several members of parliament, judges, and prominent business leaders.</p>
                <p>In 1975, coinciding with Papua New Guinea's independence, the school underwent significant expansion, adding modern science laboratories, a comprehensive library, and sports facilities. The 1990s saw further development with the introduction of computer laboratories and enhanced academic programs.</p>
                <p>Today, PMNHS serves over 2,000 students from across Papua New Guinea and continues its tradition of academic excellence while embracing modern educational methodologies and technology. The school has produced countless graduates who have gone on to make significant contributions to Papua New Guinea and the international community.</p>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/hist1/400/500" className="rounded-3xl shadow-xl w-full h-[400px] object-cover mt-12" alt="History 1" />
              <img src="https://picsum.photos/seed/hist2/400/500" className="rounded-3xl shadow-xl w-full h-[400px] object-cover" alt="History 2" />
            </div>
          </div>
        </div>
      </section>

      {/* School Leadership Team */}
      <section className="py-24 bg-[#F8F8F8] border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-black mb-4">Leadership Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">Decades of combined experience in education</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-8 rounded-[3rem] hover:border-gold transition-all group shadow-sm">
                <div className="w-16 h-16 bg-black text-gold rounded-2xl flex items-center justify-center font-black text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  {leader.initials}
                </div>
                <h3 className="text-xl font-black uppercase mb-1 text-center text-black">{leader.name}</h3>
                <p className="text-gold font-bold uppercase tracking-widest text-[10px] text-center mb-6">{leader.role}</p>
                <p className="text-gray-500 text-sm text-center italic leading-relaxed">{leader.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Timeline */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-20">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-black">Our Legacy Timeline</h2>
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Enhanced Vertical Line visibility */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[6px] bg-gold shadow-[0_0_20px_rgba(255,215,0,0.5)] hidden md:block" />
          
          <div className="space-y-24 relative z-10">
            {[
              { year: '1982', title: 'Foundation', desc: 'Opened as the premier national high school in the capital region.' },
              { year: '1995', title: 'Science Excellence', desc: 'Introduced advanced laboratory facilities and research programs.' },
              { year: '2015', title: 'Digital Transformation', desc: 'Full campus Wi-Fi and digital learning systems launched.' },
              { year: '2024', title: 'The Modern Era', desc: 'New Computer Science hub and international academic partnerships.' }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-5/12 text-center md:text-left">
                  <h3 className="text-4xl font-black text-black mb-4">{item.year}</h3>
                  <h4 className="text-xl font-heading font-extrabold text-gold uppercase tracking-widest mb-4">{item.title}</h4>
                  <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-14 h-14 bg-black rounded-full border-4 border-gold z-20 hidden md:flex items-center justify-center text-gold font-bold text-lg shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  {idx + 1}
                </div>
                <div className="md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - Restored Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-gold mb-4">Core Values</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">The principles that guide our institutional conduct</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 text-center hover:border-gold transition-all shadow-xl">
              <div className="mb-6 flex justify-center">{v.icon}</div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-white">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-24 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-black mb-4">Explore Our Campus</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">World-class facilities for academic and physical growth</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, i) => (
            <div key={i} className="group relative h-80 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 cursor-pointer">
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h4 className="text-gold font-black uppercase tracking-tight text-xl mb-2">{item.title}</h4>
                <p className="text-white/80 text-sm leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicAbout;
