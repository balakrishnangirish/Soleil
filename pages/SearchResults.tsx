
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchProducts } from '../geminiService';
import { Gender, Product } from '../types';

interface SearchResultsProps {
  gender: Gender;
  toggleSave: (id: string) => void;
  savedProducts: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ gender, toggleSave, savedProducts }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query, gender);
        if (results.products.length === 0) {
          setError("Geen resultaten gevonden. Probeer een andere term.");
        } else {
          setProducts(results.products);
        }
      } catch (err: any) {
        setError("Er is een fout opgetreden. Probeer het opnieuw.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query, gender]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-12 bg-background-dark no-scrollbar">
      <div className="sticky top-0 z-40 bg-background-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center px-4 py-3 justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card-dark text-white border border-white/10 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </button>
          <h1 className="text-white font-bold text-sm truncate px-4 opacity-80 uppercase tracking-widest">{query}</h1>
          <div className="size-9"></div>
        </div>
      </div>

      <main className="flex-1 p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="size-20 rounded-full border border-soleil-gold/30 animate-ping absolute inset-0 opacity-20"></div>
              <div className="size-20 rounded-full bg-surface-dark border border-soleil-gold/20 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=200&auto=format&fit=crop" 
                  className="size-14 object-cover rounded-full opacity-80 animate-pulse"
                  alt="Loading Soleil"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-soleil-gold text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">Your personal AI beauty agent</p>
              <p className="text-text-secondary text-[9px] font-black tracking-[0.1em] uppercase opacity-60">Consulting your beauty profile...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
             <p className="text-white/60 font-medium text-sm">{error}</p>
             <button onClick={() => navigate('/')} className="text-primary font-black uppercase tracking-widest text-[10px] border border-primary/20 px-6 py-2 rounded-full">Terug naar Home</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col cursor-pointer rounded-2xl overflow-hidden bg-card-dark border border-white/5"
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
              >
                <div className="relative aspect-[4/5]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                       (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                  
                  {/* Unified Information Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col gap-0.5">
                    <p className="text-primary text-[9px] font-black uppercase tracking-[0.1em] truncate">{product.brand}</p>
                    <p className="text-white text-xs font-bold leading-tight line-clamp-2 min-h-[2.2rem]">{product.name}</p>
                    <div className="mt-1 flex items-center">
                      <span className="bg-white text-background-dark text-[10px] font-black px-1.5 py-0.5 rounded-sm shadow-sm">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  {/* Favorite Button Overlay */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(product.id); }}
                    className={`absolute top-2 right-2 size-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 ${
                      savedProducts.includes(product.id) ? 'text-primary' : 'text-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${savedProducts.includes(product.id) ? 'font-filled' : ''}`}>
                      favorite
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
