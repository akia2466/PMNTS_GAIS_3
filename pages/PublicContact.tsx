
import React from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Clock, Bus, Car, Info, Linkedin } from 'lucide-react';

const PublicContact: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Contact Form & Main Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-24 items-stretch">
            {/* Inquiry Form - Noticeable Border & noticeable edges */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="bg-white border-4 border-gray-50 rounded-[3.5rem] p-12 shadow-2xl flex-grow flex flex-col">
                <p className="text-gold font-bold uppercase tracking-widest mb-4">Official Admissions</p>
                <h1 className="text-6xl font-black text-black uppercase tracking-tighter mb-10 leading-none">Institutional Registry.</h1>
                <form className="space-y-6 flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                      <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold focus:border-gold outline-none shadow-sm transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                      <input type="email" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold focus:border-gold outline-none shadow-sm transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subject</label>
                    <select className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold focus:border-gold outline-none appearance-none shadow-sm transition-all">
                      <option>Admissions Inquiry</option>
                      <option>Academic Transcripts</option>
                      <option>Staff Recruitment</option>
                      <option>Administrative Support</option>
                    </select>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Your Message</label>
                    <textarea className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-gold focus:border-gold outline-none h-48 resize-none shadow-sm transition-all" placeholder="How can our administration assist you?"></textarea>
                  </div>
                  <button type="button" className="bg-black text-white w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-gold hover:text-black transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-4">
                    <Send size={20} />
                    <span>Submit to Registry</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Info and Office Hours */}
            <div className="lg:w-1/2 space-y-12 flex flex-col justify-between">
              <div className="bg-[#F8F8F8] p-12 rounded-[3.5rem] space-y-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
                <div className="flex items-start space-x-6 relative z-10">
                  <div className="bg-black p-4 rounded-2xl text-gold shadow-lg"><MapPin size={24} /></div>
                  <div>
                    <h3 className="text-xl font-black uppercase mb-1">Campus Location</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-4">Waigani Drive, Port Moresby</p>
                    <p className="text-gray-600 text-lg leading-relaxed">Wardstrip Rd, Waigani<br/>National Capital District<br/>Papua New Guinea</p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-gray-200 relative z-10">
                  <div className="flex items-start space-x-6">
                    <div className="bg-black p-4 rounded-2xl text-gold shadow-lg"><Clock size={24} /></div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-black uppercase mb-4">Office Hours</h3>
                      <div className="grid grid-cols-2 gap-y-3">
                        <span className="text-gray-400 font-bold text-[10px] uppercase">Monday - Friday</span>
                        <span className="text-black font-black text-xs text-right uppercase tracking-wider">8:00 AM - 4:00 PM</span>
                        <span className="text-gray-400 font-bold text-[10px] uppercase">Saturday</span>
                        <span className="text-black font-black text-xs text-right uppercase tracking-wider">9:00 AM - 12:00 PM</span>
                        <span className="text-gray-400 font-bold text-[10px] uppercase">Sunday</span>
                        <span className="text-red-500 font-black text-xs text-right uppercase tracking-wider">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Grid */}
              <div className="text-center bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100">
                <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-8">Connect With Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { icon: <Facebook />, label: 'Facebook', handle: '@PMNHS.Official' },
                    { icon: <Twitter />, label: '𝕏 (Twitter)', handle: '@PMNHS_Official' },
                    { icon: <Instagram />, label: 'Instagram', handle: '@pmnhs_official' }
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-gold transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-black text-gold rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        {s.icon}
                      </div>
                      <h4 className="font-black text-black uppercase text-xs mb-1 tracking-tight">{s.label}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{s.handle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Fixed display for location */}
      <section className="py-24 bg-[#F8F8F8] border-y border-gray-100">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">Institutional Presence</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Strategically located in Waigani, NCD</p>
        </div>
        <div className="container mx-auto px-4">
          <div className="h-[600px] w-full bg-white rounded-[4rem] overflow-hidden relative shadow-2xl group border-8 border-white">
            {/* Visual Fix: Using a seed that looks more like an urban map or aerial campus view */}
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105" 
                 style={{ backgroundImage: "url('https://picsum.photos/seed/waigani-port-moresby-aerial/1600/1200')" }}></div>
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/0" />
            
            {/* Map Pin Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex flex-col items-center animate-pulse">
                <div className="bg-black text-white px-8 py-3 rounded-2xl shadow-2xl border-2 border-gold font-black uppercase text-xs mb-3">
                  POMNHS CAMPUS
                </div>
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.6)] border-4 border-black">
                   <MapPin size={32} className="text-black" />
                </div>
                <div className="w-4 h-4 bg-gold rounded-full blur-[2px] mt-1" />
              </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20">
              <button className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center space-x-4 shadow-2xl border border-[#B8860B] hover:bg-gold hover:text-black transition-all">
                <MapPin size={20} />
                <span>Get Driving Directions</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here Section - White Container, Black text for title/subtitle */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-black">Getting Here</h2>
            <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">Transportation & Transit instructions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Bus className="text-gold" size={32} />, title: 'By Public Bus', desc: 'Regular services stop near the school gates. Routes 10, 15, and 22 are the most frequent connections.' },
              { icon: <Car className="text-gold" size={32} />, title: 'By Private Car', desc: 'Ample visitor parking available on campus. Follow Hohola Road and look for official school signage.' },
              { icon: <Info className="text-gold" size={32} />, title: 'School Shuttle', desc: 'Managed shuttle services operate from designated city pickup points during peak academic hours.' }
            ].map((method, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] text-center hover:border-gold transition-all group shadow-2xl">
                <div className="mb-8 flex justify-center group-hover:scale-110 transition-transform">{method.icon}</div>
                <h3 className="text-2xl font-black uppercase mb-6 tracking-tight text-white">{method.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicContact;
