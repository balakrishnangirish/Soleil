
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeautyProfile } from '../types';

interface ProfileProps {
  isSignedIn: boolean;
  setIsSignedIn: (v: boolean) => void;
  savedProductIds: string[];
  beautyProfile: BeautyProfile;
}

const Profile: React.FC<ProfileProps> = ({ isSignedIn, setIsSignedIn, savedProductIds, beautyProfile }) => {
  const navigate = useNavigate();
  const [showPassportTooltip, setShowPassportTooltip] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-background-dark animate-in fade-in duration-500">
        <div className="size-24 rounded-full bg-white border-2 border-soleil-gold/20 flex items-center justify-center mb-8">
           <span className="material-symbols-outlined text-4xl text-text-secondary/40">lock</span>
        </div>
        <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-2">Guest Access</h2>
        <p className="text-xs text-text-secondary mb-8 leading-relaxed px-6">
          Sign in to view your personalized beauty profile, saved collections, and AI insights.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="sun-button-gradient text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-lg"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  const collections = [
    { name: 'Wishlist', count: savedProductIds.length, icon: 'favorite' },
    { name: 'Skincare Routine', count: 0, icon: 'auto_fix_high' },
    { name: 'Holy Grails', count: 0, icon: 'star' },
  ];

  // Inferred data if the official analysis hasn't been completed
  const displayData = beautyProfile.isComplete ? {
    skinType: beautyProfile.skinType,
    skinConcern: beautyProfile.skinConcern,
    hairType: beautyProfile.hairType,
    hairConcern: beautyProfile.hairConcern,
    status: 'Verified Biology'
  } : {
    skinType: 'Normal / Combination',
    skinConcern: 'Radiance & Glow',
    hairType: 'Straight / Fine',
    hairConcern: 'Daily Maintenance',
    status: 'Inferred Intelligence'
  };

  const beautyPassportData = [
    { label: 'Skin Type', value: displayData.skinType, icon: 'water_drop' },
    { label: 'Skin Concern', value: displayData.skinConcern, icon: 'flare' },
    { label: 'Hair Type', value: displayData.hairType, icon: 'content_cut' },
    { label: 'Hair Concern', value: displayData.hairConcern, icon: 'texture' },
  ];

  const handleSignOut = () => {
    setIsSignedIn(false);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto pb-12 no-scrollbar animate-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5 p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-text-primary active:scale-95 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <p className="text-soleil-gold-warm text-[9px] font-black uppercase tracking-widest">User Profile</p>
        <button className="size-10 flex items-center justify-center rounded-full text-text-secondary">
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
      </div>

      <main className="px-6 py-8 space-y-10">
        {/* Identity Hero */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-soleil-gold/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative size-28 rounded-full border-2 border-soleil-gold p-1 overflow-hidden shadow-sun-glow-lg transition-transform duration-700 group-hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 bg-white rounded-full border border-black/5 flex items-center justify-center shadow-lg">
               <span className="material-symbols-outlined text-soleil-gold text-sm font-filled">verified</span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-text-primary tracking-tight">Sarah Mitchell</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-soleil-gold-warm">Elite Beauty Insider</p>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-primary">Collections</h3>
            <button 
              onClick={() => navigate('/collections')}
              className="text-[9px] font-black uppercase tracking-widest text-soleil-gold-warm hover:scale-105 active:scale-95 transition-all"
            >
              Manage All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
            {collections.map((col) => (
              <div 
                key={col.name} 
                onClick={() => navigate('/collections')}
                className="snap-start shrink-0 w-36 bg-white border border-black/5 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer group"
              >
                <div className="size-8 rounded-lg bg-background-dark border border-black/5 flex items-center justify-center mb-3 text-text-secondary group-hover:text-soleil-gold-warm group-hover:bg-soleil-gold/5 transition-colors">
                  <span className={`material-symbols-outlined text-base ${col.name === 'Wishlist' ? 'text-rose-400' : ''}`}>{col.icon}</span>
                </div>
                <p className="text-[10px] font-bold text-text-primary mb-0.5 truncate">{col.name}</p>
                <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary/50">{col.count} Items</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beauty Passport */}
        <div className="space-y-6 relative">
           <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-soleil-gold text-lg font-filled animate-pulse">auto_awesome</span>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-primary">Beauty Passport</h3>
                 </div>
                 <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border w-max ${beautyProfile.isComplete ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-soleil-gold/5 text-soleil-gold-warm border-soleil-gold/20'}`}>
                    {displayData.status}
                 </span>
              </div>
              <button 
                onClick={() => setShowPassportTooltip(!showPassportTooltip)}
                className="size-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-text-secondary/40"
              >
                <span className="material-symbols-outlined text-lg">info</span>
              </button>
           </div>

           {showPassportTooltip && (
             <div className="bg-white border border-soleil-gold/20 p-4 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-300 mb-2 border-l-4 border-l-soleil-gold">
                <p className="text-[10px] leading-relaxed text-text-secondary font-medium">
                  {beautyProfile.isComplete 
                    ? "Verified through your biology analysis. Recommendations are hyper-calibrated to your specific needs."
                    : "Inferred from your interactions with Soleil. For maximum accuracy, complete a detailed skin analysis."}
                </p>
             </div>
           )}

           <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {beautyPassportData.map((stat) => (
                  <div key={stat.label} className="bg-white/60 backdrop-blur-sm border border-black/5 rounded-2xl p-4 flex flex-col gap-2 group hover:border-soleil-gold/30 transition-colors">
                     <div className="size-8 rounded-full bg-background-dark flex items-center justify-center text-soleil-gold-warm shrink-0 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-base">{stat.icon}</span>
                     </div>
                     <div>
                        <p className="text-[7px] font-black uppercase tracking-widest text-text-secondary/60 mb-0.5">{stat.label}</p>
                        <p className="text-[10px] font-bold text-text-primary truncate">{stat.value}</p>
                     </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/analysis')}
                className={`w-full group relative overflow-hidden py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${beautyProfile.isComplete ? 'bg-white border border-black/5 text-soleil-gold-warm hover:bg-soleil-gold/5' : 'sun-button-gradient text-white shadow-lg shadow-soleil-gold/20'}`}
              >
                <span className="material-symbols-outlined text-lg animate-pulse">psychology</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {beautyProfile.isComplete ? 'Retake Biological Analysis' : 'Refine with Detailed Analysis'}
                </span>
              </button>
           </div>
        </div>

        {/* Account Actions */}
        <div className="pt-12 pb-6 flex flex-col items-center gap-6">
          <div className="h-px w-12 bg-black/5"></div>
          <button 
            onClick={handleSignOut}
            className="group flex items-center gap-3 px-10 py-4 rounded-2xl bg-white border border-black/5 text-text-secondary hover:text-soleil-gold-warm hover:border-soleil-gold/30 hover:bg-soleil-gold/5 transition-all active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-lg opacity-40 group-hover:opacity-100 transition-opacity">logout</span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Sign Out</span>
          </button>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-text-secondary/20">Version 2.4.0 (Soleil Pro)</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
