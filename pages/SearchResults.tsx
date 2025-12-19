
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
    <div className="flex-1 flex flex-col overflow-y-auto pb-32 bg-background-dark">
      <div className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center px-4 pt-4 pb-4 justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card-dark text-white border border-white/10 shadow-sm"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-white font-bold text-lg truncate px-4">{query}</h1>
          <div className="size-10"></div>
        </div>
      </div>

      <main className="flex-1 p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-text-secondary text-sm font-medium tracking-wide uppercase">Bezig met personaliseren...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
             <p className="text-white/60 font-medium">{error}</p>
             <button onClick={() => navigate('/')} className="text-primary font-bold uppercase tracking-widest text-xs border border-primary/20 px-6 py-2 rounded-full">Terug naar Home</button>
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
