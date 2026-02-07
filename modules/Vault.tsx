import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  Folder, 
  FileText, 
  Search, 
  Download, 
  Plus, 
  HardDrive, 
  ChevronRight,
  Send,
  Upload,
  Activity,
  Filter,
  Layout,
  Edit2,
  Trash2,
  Share2,
  X,
  Check,
  FolderPlus,
  ArrowLeft,
  Move,
  Clock
} from 'lucide-react';

interface Props { user: User; }

interface FileAsset {
  id: string;
  name: string;
  size: string;
  type: string;
  folderId: string | null;
  uploadedAt: string;
  owner: string;
  sharedBy?: string;
}

interface FolderAsset {
  id: string;
  name: string;
  owner: string;
}

const Vault: React.FC<Props> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'MY_FILES' | 'SHARED'>('MY_FILES');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isEditingFolder, setIsEditingFolder] = useState<FolderAsset | null>(null);
  const [isSharingFile, setIsSharingFile] = useState<FileAsset | null>(null);
  const [isMovingFile, setIsMovingFile] = useState<FileAsset | null>(null);
  const [folderName, setFolderName] = useState('');

  // Mock State - Generic for all roles
  const [folders, setFolders] = useState<FolderAsset[]>([
    { id: 'f1', name: 'CORE RESOURCES', owner: user.id },
    { id: 'f2', name: 'ARCHIVE 2025', owner: user.id },
  ]);

  const [files, setFiles] = useState<FileAsset[]>([
    { id: 'a1', name: 'Academic_Handbook.pdf', size: '2.4 MB', type: 'pdf', folderId: 'f1', uploadedAt: 'JAN 24, 2026', owner: user.id },
    { id: 'a2', name: 'Final_Draft_Draft.docx', size: '1.1 MB', type: 'doc', folderId: null, uploadedAt: 'JAN 25, 2026', owner: user.id },
  ]);

  const [sharedFiles, setSharedFiles] = useState<FileAsset[]>([
    { id: 's1', name: 'Principal_Monthly_Address.pdf', size: '1.8 MB', type: 'pdf', folderId: null, uploadedAt: 'JAN 20, 2026', owner: 'ADMIN01', sharedBy: 'Institutional Admin' },
  ]);

  const currentFolder = activeFolderId ? folders.find(f => f.id === activeFolderId) : null;
  const filteredFolders = folders.filter(f => f.owner === user.id);
  const currentFiles = (viewMode === 'MY_FILES' ? files : sharedFiles).filter(f => f.folderId === activeFolderId);

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;
    const newFolder = { id: `f${Date.now()}`, name: folderName.toUpperCase(), owner: user.id };
    setFolders([...folders, newFolder]);
    setFolderName('');
    setIsAddingFolder(false);
  };

  const handleUpdateFolder = () => {
    if (!folderName.trim() || !isEditingFolder) return;
    setFolders(folders.map(f => f.id === isEditingFolder.id ? { ...f, name: folderName.toUpperCase() } : f));
    setFolderName('');
    setIsEditingFolder(null);
  };

  const handleDeleteFolder = (id: string) => {
    if (confirm('Delete this folder? Assets inside will be moved to root.')) {
      setFolders(folders.filter(f => f.id !== id));
      setFiles(files.map(f => f.folderId === id ? { ...f, folderId: null } : f));
      if (activeFolderId === id) setActiveFolderId(null);
    }
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('Permanently remove this asset?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  const handleMoveFile = (folderId: string | null) => {
    if (!isMovingFile) return;
    setFiles(files.map(f => f.id === isMovingFile.id ? { ...f, folderId } : f));
    setIsMovingFile(null);
  };

  const renderHero = () => (
    <div className="bg-black p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10 mb-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 rounded-bl-[12rem]" />
      <div className="relative z-10 flex flex-col items-start">
        <div className="flex items-center space-x-3 mb-5">
           <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black shadow-lg"><Layout size={20} /></div>
           <p className="text-gold font-black uppercase tracking-[0.2em] text-[9px]">Authorized Repository Access</p>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          Repository<br/><span className="text-gold">Registry</span>
        </h2>
        <div className="flex bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 backdrop-blur-xl">
          {['MY_FILES', 'SHARED'].map(target => (
            <button 
              key={target}
              onClick={() => { setViewMode(target as any); setActiveFolderId(null); }}
              className={`px-[38px] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === target ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-zinc-500 hover:text-white'}`}
            >
              {target === 'MY_FILES' ? 'My Registry' : 'Shared With Me'}
            </button>
          ))}
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-4 xl:gap-6">
        {[
          { label: 'ASSETS LOGGED', value: files.length + sharedFiles.length, icon: <FileText size={14} className="text-blue-400" /> },
          { label: 'STORAGE USED', value: '12%', icon: <HardDrive size={14} className="text-green-400" /> },
          { label: 'SHARED NODES', value: '12', icon: <Share2 size={14} className="text-gold" /> },
          { label: 'SYS HEALTH', value: '100%', icon: <Activity size={14} className="text-purple-400" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-36 flex flex-col items-start hover:bg-white/10 transition-colors group shadow-lg">
             <div className="mb-4 bg-white/5 p-2 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
             <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">{stat.value}</h4>
             <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {renderHero()}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center space-x-4">
          {activeFolderId && (
            <button onClick={() => setActiveFolderId(null)} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gold transition-all shadow-sm"><ArrowLeft size={20}/></button>
          )}
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-black flex items-center">
              {activeFolderId ? currentFolder?.name : viewMode === 'MY_FILES' ? 'Root Directory' : 'Shared Assets'}
            </h3>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Institutional Storage Node Registry</p>
          </div>
        </div>
        {viewMode === 'MY_FILES' && (
          <div className="flex items-center space-x-3">
            <button onClick={() => { setFolderName(''); setIsAddingFolder(true); }} className="bg-white border border-gray-200 text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-sm hover:border-gold transition-all flex items-center space-x-3">
              <FolderPlus size={18} />
              <span>NEW FOLDER</span>
            </button>
            <button className="bg-black text-gold px-[38px] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-gold hover:text-black transition-all flex items-center space-x-3">
              <Upload size={18} />
              <span>UPLOAD ASSET</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 space-y-10">
          {!activeFolderId && viewMode === 'MY_FILES' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredFolders.map(folder => (
                <div key={folder.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all group relative">
                  <div className="flex items-center justify-between mb-8">
                    <div onClick={() => setActiveFolderId(folder.id)} className="w-16 h-16 bg-black text-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                      <Folder size={32} fill="currentColor" />
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setFolderName(folder.name); setIsEditingFolder(folder); }} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gold"><Edit2 size={14}/></button>
                      <button onClick={() => handleDeleteFolder(folder.id)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  </div>
                  <h4 onClick={() => setActiveFolderId(folder.id)} className="font-black text-lg uppercase text-black tracking-tight mb-2 cursor-pointer group-hover:text-gold transition-colors">{folder.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{files.filter(f => f.folderId === folder.id).length} ASSETS LOGGED</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 bg-gray-50/20 flex items-center justify-between">
               <h3 className="text-xl font-black text-black uppercase tracking-tight">Assets / Registry</h3>
               <div className="flex space-x-2">
                  <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-300 hover:text-gold transition-colors"><Search size={16}/></button>
                  <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-300 hover:text-gold transition-colors"><Filter size={16}/></button>
               </div>
            </div>
            {currentFiles.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <FileText size={48} className="text-gray-100 mb-6" />
                <p className="text-gray-300 font-black uppercase text-[10px] tracking-widest italic">No assets detected in this node</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Asset Profile</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Size / Node</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Logged</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentFiles.map(file => (
                    <tr key={file.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-gold transition-all"><FileText size={18}/></div>
                          <div>
                            <p className="font-black text-xs text-black uppercase tracking-tight">{file.name}</p>
                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Type: {file.type.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-[10px] font-black text-black">
                        {file.size}
                        {file.sharedBy && <p className="text-[8px] font-bold text-gold uppercase mt-1">SHARED BY: {file.sharedBy}</p>}
                      </td>
                      <td className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase">{file.uploadedAt}</td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-gold transition-colors"><Download size={14}/></button>
                           {viewMode === 'MY_FILES' && (
                             <>
                               <button onClick={() => setIsMovingFile(file)} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-blue-500 transition-colors"><Move size={14}/></button>
                               <button onClick={() => setIsSharingFile(file)} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-gold transition-colors"><Share2 size={14}/></button>
                               <button onClick={() => handleDeleteFile(file.id)} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                             </>
                           )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-gold p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden group">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-8 leading-tight">Registry Metrics</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase text-black/50">Storage Capacity</span>
                  <span className="text-xs font-black text-black">124 MB / 1 GB</span>
                </div>
                <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-black transition-all duration-1000" style={{ width: '12%' }} />
                </div>
                <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-3">
                  <Activity size={18} />
                  <span>OPTIMIZE NODE</span>
                </button>
              </div>
           </div>
           <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-sm font-black text-black uppercase mb-8 tracking-widest border-l-4 border-gold pl-6">RECENT LOGS</h3>
             <div className="space-y-8">
               {[
                 { n: 'Registry_Sync.pdf', t: '12 MINS AGO' },
                 { n: 'Lesson_Draft.docx', t: '1 HOUR AGO' },
               ].map((log, i) => (
                 <div key={i} className="group cursor-pointer">
                    <h4 className="text-[10px] font-black uppercase text-black group-hover:text-gold transition-colors">{log.n}</h4>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-1 flex items-center"><Clock size={10} className="mr-1.5" /> {log.t}</p>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Modals - Unchanged logic, universally available */}
      {(isAddingFolder || isEditingFolder) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
               <h3 className="text-xl font-black uppercase tracking-tight">{isEditingFolder ? 'Edit Folder' : 'New Folder Registry'}</h3>
               <button onClick={() => { setIsAddingFolder(false); setIsEditingFolder(null); }} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20}/></button>
             </div>
             <div className="p-10 space-y-6">
                <input 
                  type="text" 
                  value={folderName} 
                  onChange={e => setFolderName(e.target.value)} 
                  placeholder="DESIGNATION NAME" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-black focus:ring-2 focus:ring-gold outline-none transition-all uppercase"
                />
             </div>
             <div className="p-8 bg-gray-50 flex justify-end space-x-4">
                <button onClick={() => { setIsAddingFolder(false); setIsEditingFolder(null); }} className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest">Discard</button>
                <button onClick={isEditingFolder ? handleUpdateFolder : handleCreateFolder} className="px-10 py-3 bg-black text-gold rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center space-x-2">
                  <Check size={16} />
                  <span>{isEditingFolder ? 'COMMIT CHANGES' : 'INITIALIZE NODE'}</span>
                </button>
             </div>
           </div>
        </div>
      )}

      {isSharingFile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
               <div>
                 <h3 className="text-xl font-black uppercase tracking-tight">Share Institutional Asset</h3>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Asset Node: {isSharingFile.name}</p>
               </div>
               <button onClick={() => setIsSharingFile(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20}/></button>
             </div>
             <div className="p-10 space-y-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-black ml-2">Target Registry Recipients</label>
                   <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-black uppercase outline-none focus:ring-2 focus:ring-gold">
                      <option>SELECT RECIPIENT NODE...</option>
                      <option>FACULTY MEMBERS</option>
                      <option>GRADE 12 (ALL)</option>
                      <option>ADMINISTRATIVE HUB</option>
                   </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-6 bg-gray-50 border border-gold rounded-2xl text-[10px] font-black uppercase flex items-center space-x-4"><Check size={16} className="text-gold" /><span>View Only Access</span></button>
                  <button className="p-6 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase flex items-center space-x-4 text-gray-400"><span>Full Auth Access</span></button>
                </div>
             </div>
             <div className="p-8 bg-gray-50 flex justify-end space-x-4">
                <button onClick={() => setIsSharingFile(null)} className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest">Discard</button>
                <button onClick={() => { alert('Asset transmitted successfully.'); setIsSharingFile(null); }} className="px-12 py-3 bg-black text-gold rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center space-x-3 shadow-xl">
                  <Send size={18} />
                  <span>TRANSMIT ASSET</span>
                </button>
             </div>
           </div>
        </div>
      )}

      {isMovingFile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
               <h3 className="text-xl font-black uppercase tracking-tight">Move Asset Node</h3>
               <button onClick={() => setIsMovingFile(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20}/></button>
             </div>
             <div className="p-10 space-y-4">
                <button onClick={() => handleMoveFile(null)} className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between hover:border-gold transition-all">
                   <span className="text-xs font-black uppercase text-black">ROOT DIRECTORY</span>
                   <ChevronRight size={16} className="text-gray-300"/>
                </button>
                {filteredFolders.map(folder => (
                  <button key={folder.id} onClick={() => handleMoveFile(folder.id)} className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between hover:border-gold transition-all">
                     <span className="text-xs font-black uppercase text-black">{folder.name}</span>
                     <ChevronRight size={16} className="text-gray-300"/>
                  </button>
                ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Vault;