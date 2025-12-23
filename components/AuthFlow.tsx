import React, { useState } from 'react';

interface AuthFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSSO = (provider: 'Google' | 'Apple') => {
    setName(provider === 'Google' ? 'Google User' : 'Apple User');
    setStep(2);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setName(inputValue.split('@')[0]);
    setStep(2);
  };

  const AppleLogo = () => (
    <svg className="size-5 fill-current" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-background-dark/98 backdrop-blur-2xl flex flex-col animate-in fade-in duration-500">
      <div className="p-6 flex justify-end">
        <button 
          onClick={onClose} 
          className="size-11 rounded-full bg-white flex items-center justify-center text-text-secondary hover:text-text-primary hover:shadow-sun-glow transition-all active:scale-90 border border-black/5"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <div className="flex-1 px-8 flex flex-col justify-center max-w-sm mx-auto w-full pb-16">
        {step === 1 && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4 text-center">
              <div className="relative mx-auto size-20">
                <div className="absolute inset-0 bg-soleil-gold/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative size-20 rounded-[1.75rem] bg-white border border-soleil-gold flex items-center justify-center shadow-sun-glow">
                  <span className="material-symbols-outlined text-soleil-gold text-3xl font-filled">face_5</span>
                </div>
              </div>
              <p className="text-text-secondary text-sm font-medium leading-relaxed opacity-80">
                Sign in to <span className="animate-shimmer font-bold">Soleil</span>
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Email or Phone"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-soleil-gold/50 focus:border-soleil-gold outline-none transition-all placeholder:text-text-secondary/40"
                />
              </div>
              <button 
                type="submit"
                className="w-full sun-button-gradient text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-sun-glow transition-all active:scale-[0.98]"
              >
                Continue
              </button>
            </form>

            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-black/5"></div>
              <span className="text-[10px] font-black text-text-secondary/40 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-black/5"></div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handleSSO('Google')}
                className="w-full group flex items-center justify-center gap-3 bg-white hover:shadow-sun-glow border border-black/5 py-4 rounded-2xl transition-all active:scale-[0.98]"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="size-5" alt="Google" />
                <span className="text-text-primary text-[11px] font-black uppercase tracking-[0.15em]">Google</span>
              </button>
              <button 
                onClick={() => handleSSO('Apple')}
                className="w-full group flex items-center justify-center gap-3 bg-white hover:shadow-sun-glow border border-black/5 py-4 rounded-2xl transition-all active:scale-[0.98]"
              >
                <AppleLogo />
                <span className="text-text-primary text-[11px] font-black uppercase tracking-[0.15em]">Apple</span>
              </button>
            </div>

            <div className="text-center px-4">
              <p className="text-[9px] text-text-secondary font-medium leading-relaxed opacity-50">
                Tailored beauty recommendations curated by your personal AI agent.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 text-center animate-in zoom-in-95 duration-700">
             <div className="relative mx-auto size-32">
                <div className="absolute inset-0 bg-soleil-gold/20 rounded-full animate-ping"></div>
                <div className="relative size-32 sun-button-gradient rounded-full flex items-center justify-center shadow-sun-glow-lg">
                   <span className="material-symbols-outlined text-white text-6xl font-filled">check_circle</span>
                </div>
             </div>
             
             <div className="space-y-4">
                <h1 className="text-text-primary text-4xl font-black tracking-tight leading-none uppercase">Profile Ready</h1>
                <p className="text-text-secondary text-base font-medium px-6 leading-relaxed">
                  Welcome, <span className="animate-shimmer font-bold">{name.split(' ')[0]}</span>. Your journey with Soleil starts now.
                </p>
             </div>

             <button 
                onClick={onComplete}
                className="w-full bg-text-primary text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-xl hover:shadow-sun-glow-lg active:scale-95 transition-all"
              >
                Explore Boutique
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;