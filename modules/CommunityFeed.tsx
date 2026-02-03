
import React, { useState } from 'react';
import { User, Post } from '../types';
import { DUMMY_POSTS } from '../constants';
import { Heart, MessageSquare, Share2, Image as ImageIcon, FileText, Globe, Users, Book, TrendingUp, UserCheck, Shield, Check } from 'lucide-react';

interface Props {
  user: User;
}

const CommunityFeed: React.FC<Props> = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('Global');
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [composerText, setComposerText] = useState('');

  const filters = [
    { id: 'Global', label: 'School Community', icon: <Globe size={16} /> },
    { id: 'Grade', label: 'My Grade', icon: <Users size={16} /> },
    { id: 'Dept', label: 'My Class', icon: <Book size={16} /> },
  ];

  const handlePost = () => {
    if (!composerText.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      author: user.name,
      authorRole: user.role,
      content: composerText,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
    setComposerText('');
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Community Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'New Posts Today', value: '28', icon: <TrendingUp /> },
          { label: 'Trending Topics', value: '5', icon: <Globe /> },
          { label: 'Connected Peers', value: '24', icon: <UserCheck /> },
        ].map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4 group hover:border-gold transition-colors">
            <div className="p-3 bg-gray-50 rounded-2xl text-gold group-hover:rotate-12 transition-transform">{m.icon}</div>
            <div>
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mb-1">{m.label}</p>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Composer */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-start space-x-6 mb-6">
              <img src={user.avatar} className="w-14 h-14 rounded-2xl border-2 border-gold shadow-lg" alt="" />
              <textarea 
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                placeholder={`Share something with your ${activeFilter === 'Dept' ? 'classmates' : 'community'}...`}
                className="flex-grow bg-gray-50 border-2 border-transparent rounded-2xl p-5 text-sm font-semibold focus:ring-2 focus:ring-gold/30 focus:bg-white focus:border-gold outline-none min-h-[120px] resize-none transition-all"
              />
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all text-gray-500 font-black text-[10px] uppercase tracking-widest active:scale-95">
                  <ImageIcon size={18} className="text-gold" />
                  <span className="hidden sm:inline">Attach Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all text-gray-500 font-black text-[10px] uppercase tracking-widest active:scale-95">
                  <FileText size={18} className="text-blue-500" />
                  <span className="hidden sm:inline">Add File</span>
                </button>
              </div>
              <button 
                onClick={handlePost}
                disabled={!composerText.trim()}
                className="bg-black text-white px-10 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post to Feed
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-3 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm inline-flex">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center space-x-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all active:scale-95 ${
                  activeFilter === f.id ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
              >
                {f.icon}
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom duration-500 hover:border-gold/30 transition-colors">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img src={post.id.startsWith('p') ? `https://i.pravatar.cc/150?u=${post.id}` : user.avatar} className="w-12 h-12 rounded-xl shadow-md border border-gray-100" alt="" />
                      <div>
                        <h4 className="font-black text-black uppercase tracking-tight leading-none">{post.author}</h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center">
                          <span className="text-gold mr-1">{post.authorRole}</span> &bull; <span className="ml-1">{post.timestamp}</span>
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-200 hover:text-black transition-colors"><Globe size={18} /></button>
                  </div>
                  
                  <p className="text-gray-800 leading-relaxed mb-6 font-semibold text-sm">{post.content}</p>
                  
                  {post.image && (
                    <div className="rounded-[2rem] overflow-hidden mb-6 border border-gray-100 shadow-sm">
                      <img src={post.image} className="w-full h-auto object-cover max-h-[400px]" alt="Post content" />
                    </div>
                  )}

                  <div className="flex items-center space-x-8 border-t border-gray-50 pt-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-all group active:scale-125"
                    >
                      <Heart size={20} className="group-hover:fill-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{post.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-gold transition-all group">
                      <MessageSquare size={20} className="group-hover:fill-gold" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{post.comments} Comments</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-all ml-auto">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar info */}
        <div className="space-y-8">
          {/* Guidelines Section replaced Staff Directory */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-black p-3 rounded-2xl text-gold shadow-lg shadow-gold/20">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-black uppercase tracking-tighter">Community Guidelines</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Code of Conduct</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {[
                'Be respectful to all members',
                'No spam or promotional content',
                'Keep discussions relevant',
                'Report inappropriate content'
              ].map((rule, i) => (
                <div key={i} className="flex items-start space-x-4 group">
                  <div className="bg-gold/10 p-1.5 rounded-lg group-hover:bg-gold transition-colors">
                    <Check size={12} className="text-gold group-hover:text-black transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 leading-snug">{rule}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-gray-50 rounded-2xl border-l-4 border-gold">
              <p className="text-[10px] text-gray-500 font-bold italic">Failure to comply with these guidelines may result in temporary or permanent suspension from the institutional feed.</p>
            </div>
          </div>

          <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-xl border border-[#B8860B]">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center">
              <TrendingUp size={20} className="mr-3 text-gold" />
              Trending Now
            </h3>
            <div className="space-y-6">
              {[
                { tag: '#MockExams2024', count: 42 },
                { tag: '#STEMSymposium', count: 35 },
                { tag: '#SportsDay', count: 28 },
                { tag: '#Graduation', count: 15 }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-gold font-bold text-sm hover:underline tracking-tight">{item.tag}</span>
                  <span className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">{item.count} Active Posts</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 border border-white/10 hover:border-gold py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-all">Explore All Tags</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;
