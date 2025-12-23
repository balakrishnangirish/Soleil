
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface SearchResultsProps {
  products: Product[];
  query: string;
  onAIChat?: (product: Product) => void;
  toggleSave?: (id: string) => void;
  savedProducts?: string[];
  isSignedIn: boolean;
}

const ProductSkeleton = () => (
  <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm animate-pulse">
    <div className="aspect-[4/5] bg-soleil-gold/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
    </div>
    <div className="p-4 space-y-3">
      <div className="h-2 w-12 bg-soleil-gold/10 rounded-full"></div>
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-soleil-gold/5 rounded-full"></div>
        <div className="h-3 w-2/3 bg-soleil-gold/5 rounded-full"></div>
      </div>
      <div className="flex justify-between items-center pt-1">
        <div className="h-3 w-10 bg-soleil-gold/10 rounded-full"></div>
        <div className="size-6 rounded-full bg-soleil-gold/10"></div>
      </div>
    </div>
  </div>
);

const SearchResults: React.FC<SearchResultsProps> = ({ 
  products, 
  query, 
  onAIChat, 
  toggleSave, 
  savedProducts = [],
  isSignedIn
}) => {
  const navigate = useNavigate();
  const [activeProductForCollection, setActiveProductForCollection] = useState<Product | null>(null);
  const [collections] = useState(['Wishlist', 'Skincare Routine', 'Holy Grails']);
  const [selectedCollection, setSelectedCollection] = useState('Wishlist');

  const handleSaveClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (!isSignedIn) {
      toggleSave?.(product.id);
      return;
    }
    setActiveProductForCollection(product);
  };

  const confirmSaveToCollection = () => {
    if (activeProductForCollection && toggleSave) {
      const isSaved = savedProducts.includes(activeProductForCollection.id);
      if (!isSaved) toggleSave(activeProductForCollection.id);
    }
    setActiveProductForCollection(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-48 bg-background-dark no-scrollbar">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center px-4 py-3 justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-text-primary border border-black/5 shadow-sm active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </button>
          <div className="flex flex-col items-center px-4 overflow-hidden">
            <p className="text-soleil-gold-warm text-[8px] font-black uppercase tracking-[0.3em] opacity-80">Conversational Boutique</p>
            <h1 className="text-text-primary font-bold text-xs truncate max-w-[180px] text-center">Current Recommendations</h1>
          </div>
          <div className="size-9"></div>
        </div>
      </div>

      <main className="flex-1 p-4">
        {products.length === 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
            <div className="text-center pt-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-black/5 shadow-sm">
                <div className="flex gap-1">
                   <div className="size-1.5 bg-soleil-gold rounded-full animate-bounce delay-75"></div>
                   <div className="size-1.5 bg-soleil-gold rounded-full animate-bounce delay-150"></div>
                   <div className="size-1.5 bg-soleil-gold rounded-full animate-bounce delay-225"></div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-soleil-gold-warm">Soleil is curating...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, idx) => {
                const isSaved = savedProducts.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col cursor-pointer rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-xl hover:border-soleil-gold/40 transition-all duration-500 animate-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div 
                      className="relative aspect-[4/5] bg-background-dark overflow-hidden"
                      onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        onError={(e) => {
                           (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      
                      <button 
                        onClick={(e) => handleSaveClick(e, product)}
                        className={`absolute top-2 left-2 size-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm hover:scale-110 active:scale-90 transition-all z-10 ${isSaved ? 'text-rose-500' : 'text-text-secondary'}`}
                      >
                        <span className={`material-symbols-outlined text-lg ${isSaved ? 'font-filled' : ''}`}>favorite</span>
                      </button>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAIChat?.(product);
                        }}
                        className="absolute top-2 right-2 size-8 rounded-full bg-white/90 backdrop-blur-sm border border-soleil-gold/40 flex items-center justify-center text-soleil-gold-warm shadow-sm hover:shadow-sun-glow hover:scale-110 active:scale-90 transition-all z-10"
                      >
                        <span className="material-symbols-outlined text-lg font-filled">auto_awesome</span>
                      </button>

                      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent pointer-events-none"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-soleil-gold-warm text-[8px] font-black uppercase tracking-[0.2em] truncate opacity-90">{product.brand}</p>
                          {product.rating && (
                            <div className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-soleil-gold text-[10px] font-filled">star</span>
                              <span className="text-[9px] font-black text-text-primary">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-text-primary text-xs font-bold leading-tight line-clamp-2 h-[2.2rem]">{product.name}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-text-primary text-[11px] font-black tracking-tight">{product.price}</span>
                          <div className="size-6 rounded-full sun-button-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sun-glow">
                            <span className="material-symbols-outlined text-white text-[14px]">chevron_right</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center space-y-4 pt-10">
              <div className="h-[1px] w-12 bg-soleil-gold/20 mx-auto"></div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary/50">Live feed synced with Soleil</p>
            </div>
          </div>
        )}
      </main>

      {activeProductForCollection && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
              <h3 className="text-text-primary font-black uppercase tracking-widest text-[11px]">Add to Collection</h3>
              <button onClick={() => setActiveProductForCollection(null)} className="size-8 rounded-full bg-black/5 flex items-center justify-center text-text-secondary">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                {collections.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${selectedCollection === col ? 'bg-soleil-gold/10 border-soleil-gold text-text-primary' : 'bg-background-dark border-black/5 text-text-secondary'}`}
                  >
                    <span className="text-xs font-bold">{col}</span>
                    {selectedCollection === col && (
                      <span className="material-symbols-outlined text-soleil-gold text-lg font-filled">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
              <button 
                onClick={confirmSaveToCollection}
                className="w-full bg-text-primary text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-sun-glow transition-all active:scale-95"
              >
                Save Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
