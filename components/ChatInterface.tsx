
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendMessageToSoleil } from '../geminiService';
import { Gender, Product } from '../types';

interface Message {
  id: string;
  role: 'user' | 'soleil';
  text: string;
  products?: Product[];
  suggestions?: string[];
  timestamp: Date;
}

interface ChatInterfaceProps {
  gender: Gender;
  initialQuery?: string;
  productContext?: Product;
  onResultsUpdate?: (products: Product[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ gender, initialQuery, productContext, onResultsUpdate, isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeScreen = location.pathname === '/';
  const isProductPage = location.pathname.startsWith('/product/');

  // Handle external query triggers
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== '') {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setIsOpen(true);

    if (location.pathname !== '/search') {
      navigate('/search');
    }

    try {
      const response = await sendMessageToSoleil(text, gender);
      const soleilMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'soleil',
        text: response.message,
        products: response.products,
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, soleilMsg]);
      
      if (onResultsUpdate && response.products && response.products.length > 0) {
        onResultsUpdate(response.products);
      }
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'soleil',
        text: "I apologize, my stellar connection was briefly interrupted. Could you please repeat that?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button - Hidden on Home and Product Detail pages */}
      {!isOpen && !isHomeScreen && !isProductPage && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 size-16 sun-button-gradient rounded-full flex items-center justify-center text-white shadow-sun-glow hover:shadow-sun-glow-lg active:scale-90 transition-all z-[100]"
        >
          <span className="material-symbols-outlined text-3xl font-filled">chat_bubble</span>
        </button>
      )}

      {/* Chat Window - Constrained to 50% of screen height as requested */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 h-[50vh] z-[110] animate-in slide-in-from-bottom-10 duration-500">
          <div className="relative size-full bg-background-dark/95 backdrop-blur-xl flex flex-col rounded-t-[2.5rem] sm:rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl">
            {/* Minimal Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[120] size-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-text-secondary active:scale-90 hover:bg-black/5 transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Product Context Banner */}
            {productContext && (
              <div className="px-6 py-4 bg-soleil-gold/10 border-b border-soleil-gold/20 flex items-center gap-3 pt-12">
                 <img src={productContext.image} className="size-10 rounded-lg object-cover border border-black/5" alt="" />
                 <div className="flex-1 overflow-hidden">
                   <p className="text-[7px] font-black uppercase text-soleil-gold-warm tracking-widest">Context Active</p>
                   <p className="text-[10px] font-bold text-text-primary truncate">{productContext.brand} {productContext.name}</p>
                 </div>
                 <span className="material-symbols-outlined text-soleil-gold text-lg font-filled animate-pulse">auto_awesome</span>
              </div>
            )}

            {/* Messages */}
            <div 
              ref={scrollRef}
              className={`flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar ${!productContext ? 'pt-14' : 'pt-4'}`}
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-10 space-y-3 opacity-30">
                   <span className="material-symbols-outlined text-4xl text-soleil-gold">auto_awesome</span>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Consultation Room</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[90%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-text-primary text-white rounded-tr-none shadow-md' 
                      : 'bg-white border border-black/5 text-text-primary rounded-tl-none shadow-sm'
                  }`}>
                    <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.role === 'soleil' && msg.products && msg.products.length > 0 && (
                      <button 
                        onClick={() => navigate('/search')}
                        className="mt-4 flex items-center gap-3 px-4 py-3 bg-soleil-gold/5 border border-soleil-gold/20 rounded-xl hover:bg-soleil-gold/10 transition-all group w-full"
                      >
                        <span className="material-symbols-outlined text-soleil-gold text-lg">auto_awesome_motion</span>
                        <div className="flex flex-col items-start flex-1">
                          <span className="text-[8px] font-black uppercase tracking-[0.1em] text-soleil-gold-warm">Discovery View</span>
                          <span className="text-[9px] font-bold text-text-secondary/60">Explore matches</span>
                        </div>
                        <span className="material-symbols-outlined text-soleil-gold text-base transition-transform group-hover:translate-x-1">chevron_right</span>
                      </button>
                    )}

                    {msg.role === 'soleil' && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(s)}
                            className="text-[8px] font-black uppercase tracking-[0.05em] px-3 py-2 bg-background-dark border border-black/5 rounded-lg text-text-secondary hover:border-soleil-gold/50 hover:text-soleil-gold-warm transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-3 px-2">
                   <div className="flex gap-1">
                      <div className="size-1.5 bg-soleil-gold rounded-full animate-bounce delay-75"></div>
                      <div className="size-1.5 bg-soleil-gold rounded-full animate-bounce delay-150"></div>
                      <div className="size-1.5 bg-soleil-gold rounded-full animate-bounce delay-225"></div>
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-[0.3em] text-soleil-gold-warm/60">Soleil is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-black/5 shrink-0 pb-10 sm:pb-6">
              <div className="relative flex items-center bg-background-dark rounded-[1.25rem] px-5 py-1 border border-black/5 focus-within:border-soleil-gold/40 transition-all">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3.5 font-bold"
                />
                <button 
                  onClick={() => handleSend()}
                  className="size-10 sun-button-gradient rounded-xl flex items-center justify-center text-white active:scale-90 transition-all"
                >
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInterface;
