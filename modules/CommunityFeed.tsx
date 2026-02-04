
import React, { useState } from 'react';
import { User, Post } from '../types';
import { Heart, MessageSquare, Share2, Search, Filter, ChevronRight } from 'lucide-react';

interface Props {
  user: User;
}

const CommunityFeed: React.FC<Props> = ({ user }) => {
  const [composerText, setComposerText] = useState('');
  
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Institutional Network</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Broadcast transmissions to the POMNHS institutional community.</p>
      </div>

      {/* Community Options */}
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
