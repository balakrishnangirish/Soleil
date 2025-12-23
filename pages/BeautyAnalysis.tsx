
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AnalysisData {
  skinType: string;
  skinConcern: string;
  hairType: string;
  hairConcern: string;
}

interface BeautyAnalysisProps {
  onComplete: (data: AnalysisData) => void;
}

const BeautyAnalysis: React.FC<BeautyAnalysisProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<AnalysisData>({
    skinType: '',
    skinConcern: '',
    hairType: '',
    hairConcern: ''
  });

  const steps = [
    {
      title: 'Skin Biology',
      question: 'Identify your skin type.',
      key: 'skinType',
      options: [
        { label: 'Oily', icon: 'water_drop', desc: 'Prone to shine and visible pores' },
        { label: 'Dry', icon: 'landscape', desc: 'Feels tight or flaky at times' },
        { label: 'Combination', icon: 'balance', desc: 'Oily T-zone, dry elsewhere' },
        { label: 'Sensitive', icon: 'flare', desc: 'Reacts easily to products' },
        { label: 'Normal', icon: 'check_circle', desc: 'Well-balanced and resilient' }
      ]
    },
    {
      title: 'Primary Concern',
      question: 'What is your main skin goal?',
      key: 'skinConcern',
      options: [
        { label: 'Anti-Aging', icon: 'history', desc: 'Focus on lines and firmness' },
        { label: 'Hydration', icon: 'opacity', desc: 'Intense moisture and glow' },
        { label: 'Texture', icon: 'texture', desc: 'Smoothness and pore control' },
        { label: 'Brightening', icon: 'light_mode', desc: 'Radiance and even tone' },
        { label: 'Clearance', icon: 'clean_hands', desc: 'Blemish and oil control' }
      ]
    },
    {
      title: 'Hair Profile',
      question: 'Define your hair texture.',
      key: 'hairType',
      options: [
        { label: 'Straight', icon: 'horizontal_rule', desc: 'Lies flat from root to tip' },
        { label: 'Wavy', icon: 'waves', desc: 'Natural soft curves or S-shape' },
        { label: 'Curly', icon: 'refresh', desc: 'Defined ringlets or spirals' },
        { label: 'Coily', icon: 'loop', desc: 'Tight coils or zig-zag patterns' }
      ]
    },
    {
      title: 'Hair Wellness',
      question: 'Your biggest hair challenge?',
      key: 'hairConcern',
      options: [
        { label: 'Repair', icon: 'build', desc: 'Addressing heat or color damage' },
        { label: 'Volume', icon: 'expand', desc: 'Adding lift to fine hair' },
        { label: 'Frizz', icon: 'cloud', desc: 'Smoothing and humidity control' },
        { label: 'Scalp Care', icon: 'health_and_safety', desc: 'Balance and soothing' },
        { label: 'Dryness', icon: 'sunny', desc: 'Restoring luster and softness' }
      ]
    }
  ];

  const currentStepData = steps[step - 1];

  const handleSelect = (value: string) => {
    setData(prev => ({ ...prev, [currentStepData.key]: value }));
    if (step < steps.length) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      finalizeAnalysis();
    }
  };

  const finalizeAnalysis = () => {
    setIsProcessing(true);
    // Simulate Gemini Deep Analysis
    setTimeout(() => {
      onComplete(data);
      setIsProcessing(false);
      navigate('/profile');
    }, 3500);
  };

  if (isProcessing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-background-dark text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-soleil-gold/30 rounded-full blur-[40px] animate-pulse scale-150"></div>
          <div className="supernova-aura-container relative size-40 rounded-full flex items-center justify-center bg-white shadow-sun-glow-lg border border-soleil-gold/20">
             <div className="supernova-aura-effect"></div>
             <span className="material-symbols-outlined text-6xl text-soleil-gold font-filled animate-spin duration-[3000ms]">auto_awesome</span>
          </div>
        </div>
        <div className="space-y-4 max-w-xs mx-auto">
           <h2 className="text-xl font-black uppercase tracking-[0.2em] text-text-primary animate-shimmer">Analyzing Profile</h2>
           <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
             Soleil is processing your unique biological markers to curate your elite beauty intelligence...
           </p>
        </div>
        <div className="flex gap-2">
           <div className="size-1 bg-soleil-gold/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
           <div className="size-1 bg-soleil-gold/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
           <div className="size-1 bg-soleil-gold/40 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto no-scrollbar pb-12 animate-in fade-in duration-500">
      {/* Header with Exit */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full bg-white border border-black/5 text-text-primary active:scale-95 transition-all shadow-sm hover:text-soleil-gold-warm"
        >
          <span className="material-symbols-outlined text-xl font-bold">close</span>
        </button>
        <p className="text-soleil-gold-warm text-[9px] font-black uppercase tracking-widest">Beauty Analysis</p>
        <div className="size-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-black/5 flex">
         <div 
           className="h-full sun-button-gradient transition-all duration-700 ease-out" 
           style={{ width: `${(step / steps.length) * 100}%` }}
         ></div>
      </div>

      <header className="px-6 py-10 space-y-2">
         <p className="text-soleil-gold-warm text-[10px] font-black uppercase tracking-[0.3em]">Step {step} of {steps.length}</p>
         <h1 className="text-2xl font-black text-text-primary tracking-tight leading-none">{currentStepData.title}</h1>
         <p className="text-sm font-bold text-text-secondary/60">{currentStepData.question}</p>
      </header>

      <main className="px-6 space-y-4">
         {currentStepData.options.map((opt) => (
           <button
             key={opt.label}
             onClick={() => handleSelect(opt.label)}
             className={`w-full group flex items-center gap-5 p-5 bg-white border border-black/5 rounded-3xl text-left transition-all active:scale-[0.98] hover:shadow-md hover:border-soleil-gold/30 ${data[currentStepData.key as keyof AnalysisData] === opt.label ? 'ring-2 ring-soleil-gold border-transparent' : ''}`}
           >
             <div className="size-14 rounded-2xl bg-background-dark border border-black/5 flex items-center justify-center text-text-secondary group-hover:text-soleil-gold-warm group-hover:bg-soleil-gold/5 transition-all">
                <span className="material-symbols-outlined text-2xl">{opt.icon}</span>
             </div>
             <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-text-primary mb-0.5">{opt.label}</p>
                <p className="text-[10px] text-text-secondary font-medium leading-tight">{opt.desc}</p>
             </div>
             <div className="size-6 rounded-full border border-black/5 flex items-center justify-center text-transparent group-hover:text-soleil-gold/40">
                <span className="material-symbols-outlined text-xs">chevron_right</span>
             </div>
           </button>
         ))}
      </main>

      {step > 1 && (
        <div className="px-6 mt-10">
           <button 
             onClick={() => setStep(step - 1)}
             className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary/40 hover:text-text-secondary transition-colors"
           >
             Previous Step
           </button>
        </div>
      )}
    </div>
  );
};

export default BeautyAnalysis;
