
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CollectionsProps {
  isSignedIn: boolean;
  savedProductIds: string[];
}

const Collections: React.FC<CollectionsProps> = ({ isSignedIn, savedProductIds }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  if (!isSignedIn) {
    navigate('/profile');
    return null;
  }

  const collections = [
    { name: 'Wishlist', count: savedProductIds.length, icon: 'favorite', description: 'Curated products for future purchase.' },
    { name: 'Skincare Routine', count: 0, icon: 'auto_fix_high', description: 'Your daily AM/PM beauty steps.' },
    { name: 'Holy Grails', count: 0, icon: 'star', description: 'Tested and loved essentials.' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto pb-12 no-scrollbar animate-in fade-in duration-500">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5 p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-text-primary active:scale-95 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <p className="text-soleil-gold-warm text-[9px] font-black uppercase tracking-widest">Your Collections</p>
        <button className="size-10 flex items-center justify-center rounded-full bg-soleil-gold/10 text-soleil-gold-warm active:scale-95 transition-all">
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      <main className="px-6 py-8 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-text-primary tracking-tight">The Beauty Vault</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/60">Organize your beauty journey with Soleil</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
          {['All', 'Favorites', 'Routines', 'Custom'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'sun-button-gradient text-white shadow-md' : 'bg-white border border-black/5 text-text-secondary'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Collections List */}
        <div className="grid gap-4">
          {collections.map((col) => (
            <div 
              key={col.name}
              className="bg-white border border-black/5 rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer group flex items-start gap-5"
            >
              <div className="size-16 rounded-2xl bg-background-dark border border-black/5 flex items-center justify-center text-text-secondary group-hover:text-soleil-gold-warm group-hover:bg-soleil-gold/5 transition-all shrink-0">
                <span className={`material-symbols-outlined text-3xl ${col.name === 'Wishlist' ? 'text-rose-400' : ''}`}>{col.icon}</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-black text-text-primary uppercase tracking-tight">{col.name}</h3>
                  <span className="text-[9px] font-black uppercase tracking-widest text-soleil-gold-warm bg-soleil-gold/5 px-2 py-0.5 rounded-full border border-soleil-gold/20">{col.count} Items</span>
                </div>
                <p className="text-[10px] text-text-secondary font-medium leading-relaxed line-clamp-2 pr-4">{col.description}</p>
                <div className="mt-4 flex items-center gap-2">
                   <span className="text-[8px] font-black uppercase tracking-widest text-text-secondary/40">Customise Collection</span>
                   <span className="material-symbols-outlined text-[12px] text-text-secondary/30">chevron_right</span>
                </div>
              </div>
            </div>
          ))}

          {/* New Collection CTA */}
          <button className="w-full bg-background-dark border-2 border-dashed border-black/10 rounded-[2rem] py-10 flex flex-col items-center justify-center text-text-secondary/40 hover:border-soleil-gold/40 hover:text-soleil-gold-warm transition-all group">
             <div className="size-12 rounded-full border border-dashed border-black/10 flex items-center justify-center mb-4 group-hover:border-soleil-gold/40">
                <span className="material-symbols-outlined text-2xl">create_new_folder</span>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">Create Custom List</p>
          </button>
        </div>
      </main>

      {/* Stats/Footer */}
      <div className="px-10 py-10 text-center space-y-4">
        <div className="h-[1px] w-8 bg-soleil-gold/20 mx-auto"></div>
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-text-secondary/30">Curated by Sarah Mitchell & Soleil</p>
      </div>
    </div>
  );
};

export default Collections;
