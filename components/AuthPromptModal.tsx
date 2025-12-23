
import React from 'react';

interface AuthPromptModalProps {
  onSignUp: () => void;
  onClose: () => void;
}

const AuthPromptModal: React.FC<AuthPromptModalProps> = ({ onSignUp, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col">
        {/* Animation Section */}
        <div className="relative h-64 bg-background-dark flex items-center justify-center overflow-hidden">
          {/* Collection Folders/Lists Background */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 space-y-2 opacity-20">
            <div className="h-8 bg-soleil-gold rounded-lg w-full"></div>
            <div className="h-8 bg-soleil-gold rounded-lg w-3/4 mx-auto"></div>
            <div className="h-8 bg-soleil-gold rounded-lg w-full"></div>
          </div>

          {/* Animating Product & Collection Box */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Target Collection Box */}
            <div className="collection-box relative size-24 bg-white border-2 border-soleil-gold rounded-2xl flex items-center justify-center shadow-lg mb-8">
               <span className="material-symbols-outlined text-soleil-gold text-4xl font-filled">folder_special</span>
               <div className="absolute -top-2 -right-2 bg-rose-500 text-white size-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg animate-pulse">
                 +1
               </div>
            </div>

            {/* Flying Product Image */}
            <div className="product-flyer absolute size-14 rounded-lg bg-white border border-black/5 shadow-md overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=100&auto=format&fit=crop" 
                className="size-10 object-contain"
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 opacity-0 heart-flash">
                 <span className="material-symbols-outlined text-rose-500 text-2xl font-filled">favorite</span>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes flyIn {
              0% { transform: translate(-80px, 120px) scale(1); opacity: 0; }
              20% { opacity: 1; }
              70% { transform: translate(0, 0) scale(0.5); opacity: 1; }
              80% { transform: translate(0, 0) scale(0.4); opacity: 0; }
              100% { transform: translate(-80px, 120px) scale(1); opacity: 0; }
            }
            @keyframes boxBounce {
              0%, 65% { transform: scale(1); border-color: #FFD700; }
              75% { transform: scale(1.1); border-color: #f43f5e; }
              100% { transform: scale(1); border-color: #FFD700; }
            }
            @keyframes heartFlash {
               0%, 60% { opacity: 0; }
               70% { opacity: 1; }
               80%, 100% { opacity: 0; }
            }
            .product-flyer {
              animation: flyIn 3s infinite ease-in-out;
            }
            .collection-box {
              animation: boxBounce 3s infinite ease-in-out;
            }
            .heart-flash {
              animation: heartFlash 3s infinite ease-in-out;
            }
          `}</style>
        </div>

        {/* Content Section */}
        <div className="p-10 flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-text-primary text-xl font-black uppercase tracking-tight leading-none">Unlock Collections</h2>
            <p className="text-text-secondary text-xs font-medium leading-relaxed px-4">
              Sign in to save your favorite beauty discoveries into custom routines and wishlists.
            </p>
          </div>

          <div className="w-full space-y-3">
            <button 
              onClick={onSignUp}
              className="w-full sun-button-gradient text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg hover:shadow-sun-glow-lg transition-all active:scale-95"
            >
              Sign Up to Save
            </button>
            <button 
              onClick={onClose}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
