import React, { useState } from 'react';
import { User, Post, UserRole } from '../types';
import { Heart, MessageSquare, Share2, Search, Filter, ChevronRight, Layout, ChevronDown, TrendingUp, Users2, Trophy, Activity, Award } from 'lucide-react';

interface Props {
  user: User;
}

const CommunityFeed: React.FC<Props> = ({ user }) => {
  const [composerText, setComposerText] = useState('');
  const [viewMode, setViewMode] = useState<'FEED' | 'GROUPS'>('FEED');
  
  const isStudent = user.role === UserRole.STUDENT;

  const communityCards = [
    { title: 'Class Community', subtitle: 'Class 12A', members: 42, posts: 8, active: 12, bg: 'bg-blue-50' },
    { title: 'Grade Community', subtitle: 'Grade 12', members: 93, posts: 15, active: 24, bg: 'bg-purple-50' },
    { title: 'School Community', subtitle: 'All Students & Staff', members: 2184, posts: 47, active: 156, bg: 'bg-emerald-50' },
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: 'User',
      authorRole: 'Grade 12 Student',
      content: 'Excited to join the new semester! Looking for study partners for Math.',
      timestamp: '28/01/2026',
      likes: 0,
      comments: 0,
    },
    {
      id: '2',
      author: 'User',
      authorRole: 'Grade 12 Student',
      content: 'Post about class community updates.',
      timestamp: '27/01/2026',
      likes: 0,
      comments: 0,
    }
  ];

  const renderStudentHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-start mb-8 md:mb-0">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg">
              <Layout size={20} />
           </div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Community Hub Registry</p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Community<br/>
          <span className="text-gold">Network</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="relative inline-block group">
              <select className="appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-2.5 pr-10 text-[9px] font-black uppercase outline-none cursor-pointer focus:ring-1 focus:ring-gold shadow-sm backdrop-blur-md hover:bg-white/20 transition-all">
                <option className="bg-black">All Groups</option>
                <option className="bg-black">Class 12A</option>
                <option className="bg-black">Academic</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gold" />
            </div>
            <button className="bg-white/10 text-white px-8 py-2.5 rounded-xl border border-white/20 font-black text-[9px] uppercase tracking-widest shadow-sm backdrop-blur-md hover:bg-gold hover:text-black transition-all">
              Discover Groups
            </button>
         </div>
        
        {/* Toggle Controls */}
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {['FEED', 'GROUPS'].map(target => (
            <button 
              key={target}
              onClick={() => setViewMode(target as any)}
              className={`px-10 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === target 
                  ? 'bg-gold text-black shadow-lg shadow-gold/20' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - Stat Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {[
          { label: 'JOINED GROUPS', value: '4', icon: <Users2 size={14} className="text-blue-400" /> },
          { label: 'NEW POSTS', value: '15', icon: <TrendingUp size={14} className="text-green-400" /> },
          { label: 'INTERACTION', value: '89%', icon: <Activity size={14} className="text-gold" /> },
          { label: 'REPUTATION', value: 'Top 5%', icon: <Award size={14} className="text-purple-400" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {isStudent ? renderStudentHero() : (
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Institutional Network</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Broadcast transmissions to the POMNHS institutional community.</p>
        </div>
      )}

      {/* Community Options */}
      {!isStudent && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityCards.map((card, i) => (
            <div key={i} className={`${card.bg} p-8 rounded-[3rem] border border-transparent shadow-sm flex flex-col group hover:border-gold transition-all`}>
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-1">{card.title}</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">{card.subtitle}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase">Members</p>
                  <p className="text-lg font-black text-black">{card.members}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase">Posts Today</p>
                  <p className="text-lg font-black text-black">{card.posts}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase">Active Now</p>
                  <p className="text-lg font-black text-gold">{card.active}</p>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 italic mb-6">Share and discuss with your classmates</p>
              <button className="bg-black text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gold hover:text-black transition-all shadow-lg">
                <span>View Posts</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-black uppercase tracking-tight">Community Feed</h3>
            <button className="text-[10px] font-black text-gold uppercase tracking-widest flex items-center hover:underline">
              <Filter size={12} className="mr-2" />
              Clear Filter
            </button>
          </div>

          {/* Posting Interface */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-14 h-14 bg-black text-gold rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0">YO</div>
              <div className="flex-grow">
                <div className="mb-4">
                  <label className="text-[9px] font-black uppercase text-gray-400 block mb-2">Post to:</label>
                  <select className="bg-gray-50 border-0 rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none shadow-inner focus:ring-1 focus:ring-gold">
                    <option>Student Community</option>
                    <option>Class Community</option>
                  </select>
                </div>
                <textarea 
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  placeholder="Share your thoughts with the community..."
                  className="w-full bg-gray-50 border-0 rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-gold outline-none min-h-[120px] resize-none shadow-inner"
                />
              </div>
            </div>
            <div className="flex justify-end pt-6 border-t border-gray-50">
              <button disabled={!composerText.trim()} className="bg-black text-white px-10 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all shadow-xl disabled:opacity-50">Post</button>
            </div>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search posts..." className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold focus:ring-1 focus:ring-gold shadow-sm" />
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-4 mb-6">
                   <div className="w-12 h-12 bg-black text-gold rounded-xl flex items-center justify-center font-black">U</div>
                   <div>
                      <h4 className="font-black text-black uppercase text-sm">{post.author}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{post.authorRole} &bull; {post.timestamp}</p>
                   </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                   <span className="text-[8px] font-black uppercase text-gold block mb-2">{post.id === '1' ? 'student Community' : 'class Community'}</span>
                   <p className="text-gray-800 leading-relaxed font-bold text-sm">{post.content}</p>
                </div>
                <div className="flex items-center space-x-8 pt-6 border-t border-gray-50">
                   <span className="text-[10px] font-black uppercase text-gray-400 flex items-center cursor-pointer hover:text-gold"><Heart size={16} className="mr-2" /> {post.likes}</span>
                   <span className="text-[10px] font-black uppercase text-gray-400 flex items-center cursor-pointer hover:text-gold"><MessageSquare size={16} className="mr-2" /> {post.comments}</span>
                   <span className="text-[10px] font-black uppercase text-gray-400 flex items-center cursor-pointer hover:text-gold"><Share2 size={16} className="mr-2" /> Share</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-black uppercase mb-6 tracking-widest border-l-4 border-gold pl-4">Your Communities</h3>
            <div className="space-y-6">
              {[
                { n: 'Class Community', s: '42 members • 8 new posts' },
                { n: 'Grade Community', s: '93 members • 15 new posts' },
                { n: 'School Community', s: '2184 members • 47 new posts' },
              ].map((c, i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="text-[11px] font-black uppercase text-black group-hover:text-gold transition-colors">{c.n}</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{c.s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-xl border border-gold">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-4 border-gold pl-4">Community Guidelines</h3>
            <div className="space-y-4">
              {[
                'Be respectful to all members',
                'No spam or promotional content',
                'Keep discussions relevant',
                'Report inappropriate content'
              ].map((rule, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;
